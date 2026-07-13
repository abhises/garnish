import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import sqlite3 from 'sqlite3';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.CLOUDINARY_URL && (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
  console.error('Missing Cloudinary configuration in .env.local');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const DB_PATH = path.resolve(process.cwd(), 'garnish-local.db');
const CONCURRENCY = 4; // Lowered slightly to save terminal memory overhead

const SOURCE_DIRS = [
  { name: 'media', path: path.resolve(process.cwd(), 'public/media') },
  { name: 'uploads', path: path.resolve(process.cwd(), 'public/uploads') }
];

// Iterative (non-recursive) file scanner to 100% guarantee no call-stack issues on huge directories
function getFilesIterative(sourceDirs: typeof SOURCE_DIRS): { filePath: string; cloudinaryFolderPrefix: string; relativeFolder: string; filename: string }[] {
  const results: { filePath: string; cloudinaryFolderPrefix: string; relativeFolder: string; filename: string }[] = [];

  for (const dirConfig of sourceDirs) {
    if (!fs.existsSync(dirConfig.path)) continue;
    console.log(`Scanning: ${dirConfig.path}`);

    const baseDir = dirConfig.path;
    const queue = [baseDir];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const currentDir = queue.shift()!;

      try {
        const realPath = fs.realpathSync(currentDir);
        if (visited.has(realPath)) continue;
        visited.add(realPath);

        const list = fs.readdirSync(currentDir);
        for (const file of list) {
          const filePath = path.join(currentDir, file);
          const stat = fs.lstatSync(filePath);

          if (stat.isSymbolicLink()) continue;

          if (stat.isDirectory()) {
            queue.push(filePath);
          } else if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].includes(ext)) {
              const relativePath = path.relative(baseDir, currentDir);
              results.push({
                filePath,
                cloudinaryFolderPrefix: `garnish-${dirConfig.name}`,
                relativeFolder: relativePath,
                filename: file
              });
            }
          }
        }
      } catch (e) {
        console.warn(`Skipping path due to an error: ${currentDir}`);
      }
    }
  }
  return results;
}

async function runMigration() {
  console.log('=== Starting Cloudinary Batch Media Upload ===');

  // 1. Scan folders using the non-recursive while-loop strategy
  const filesMetadata = getFilesIterative(SOURCE_DIRS);
  console.log(`Found a total of ${filesMetadata.length} image files across folders.`);

  if (filesMetadata.length === 0) {
    console.log('No images found to process.');
    return;
  }

  const db = new sqlite3.Database(DB_PATH);

  const getMediaRow = (filename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM media WHERE filename = ?', [filename], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  const upsertMediaUrl = (filename: string, secureUrl: string, relativeFolder: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT id FROM media WHERE filename = ?', [filename], (err, row) => {
        if (err) return reject(err);
        if (row) {
          db.run('UPDATE media SET url = ? WHERE filename = ?', [secureUrl, filename], (err) => {
            if (err) reject(err);
            else resolve();
          });
        } else {
          // wpUploadPath format e.g. "2020/03/image.jpg"
          const wpUploadPath = relativeFolder ? relativeFolder.replace(/\\/g, '/') + '/' + filename : filename;
          db.run(
            'INSERT INTO media (filename, url, alt, wp_upload_path, updated_at, created_at) VALUES (?, ?, ?, ?, strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\'), strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\'))',
            [filename, secureUrl, filename, wpUploadPath],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        }
      });
    });
  };

  let processedCount = 0;
  let uploadedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // 2. High performance worker-pool runner instead of chunked Promise.all loops
  let fileIndex = 0;
  async function worker() {
    while (fileIndex < filesMetadata.length) {
      const currentIdx = fileIndex++;
      const meta = filesMetadata[currentIdx];
      if (!meta) {
        break;
      }

      const { filePath, cloudinaryFolderPrefix, relativeFolder, filename } = meta;

      try {
        const row = await getMediaRow(filename);
        if (row && row.url && row.url.includes('res.cloudinary.com')) {
          skippedCount++;
          continue;
        }

        const cloudinaryFolder = relativeFolder
          ? path.join(cloudinaryFolderPrefix, relativeFolder).replace(/\\/g, '/')
          : cloudinaryFolderPrefix;

        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudinaryFolder,
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        });

        if (result && result.secure_url) {
          uploadedCount++;
          await upsertMediaUrl(filename, result.secure_url, relativeFolder);
        }
      } catch (err: any) {
        errorCount++;
        console.error(`Failed processing ${filename}:`, err?.message || err);
      } finally {
        processedCount++;
        if (processedCount % 50 === 0 || processedCount === filesMetadata.length) {
          console.log(`Progress: [${processedCount} / ${filesMetadata.length}] | Uploaded: ${uploadedCount} | Skipped: ${skippedCount} | Errors: ${errorCount}`);
        }
      }
    }
  }

  // Fire up our parallel workers
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  db.close();
  console.log('=== Cloudinary Batch Upload Completed ===');
  console.log(`Total processed: ${processedCount} | Uploaded: ${uploadedCount} | Skipped: ${skippedCount} | Errors: ${errorCount}`);
}

runMigration().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});