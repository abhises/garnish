import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import sqlite3 from 'sqlite3';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Configure Cloudinary from environment variables
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

const MEDIA_DIR = path.resolve(process.cwd(), 'public/media');
const DB_PATH = path.resolve(process.cwd(), 'garnish-local.db');

const CONCURRENCY = 6; // Concurrent uploads

async function runMigration() {
  console.log('=== Starting Cloudinary Batch Media Upload ===');
  console.log(`Media directory: ${MEDIA_DIR}`);
  console.log(`Database: ${DB_PATH}`);

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error('Media directory not found!');
    return;
  }

  const files = fs.readdirSync(MEDIA_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].includes(ext);
  });

  console.log(`Found ${files.length} image files in public/media/.`);

  // Open SQLite database connection
  const db = new sqlite3.Database(DB_PATH);

  const getMediaRow = (filename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM media WHERE filename = ?', [filename], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  const updateMediaUrl = (filename: string, secureUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE media SET url = ? WHERE filename = ?', [secureUrl, filename], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  let processedCount = 0;
  let uploadedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Process chunked concurrency
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const chunk = files.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (file) => {
        const filePath = path.join(MEDIA_DIR, file);
        try {
          // Check if DB record exists and is already pointing to Cloudinary
          const row = await getMediaRow(file);
          if (row && row.url && row.url.includes('res.cloudinary.com')) {
            skippedCount++;
            processedCount++;
            return;
          }

          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(filePath, {
            folder: 'garnish-media',
            use_filename: true,
            unique_filename: false,
            overwrite: false,
          });

          if (result && result.secure_url) {
            uploadedCount++;
            await updateMediaUrl(file, result.secure_url);
          }
        } catch (err: any) {
          errorCount++;
          console.error(`Failed to upload ${file}:`, err?.message || err);
        } finally {
          processedCount++;
          if (processedCount % 50 === 0 || processedCount === files.length) {
            console.log(`Progress: [${processedCount} / ${files.length}] | Uploaded: ${uploadedCount} | Skipped: ${skippedCount} | Errors: ${errorCount}`);
          }
        }
      })
    );
  }

  db.close();
  console.log('=== Cloudinary Batch Upload & DB Update Completed ===');
  console.log(`Total processed: ${processedCount}`);
  console.log(`Newly uploaded to Cloudinary: ${uploadedCount}`);
  console.log(`Already on Cloudinary (Skipped): ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
}

runMigration().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
