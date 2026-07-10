// scripts/download-hero-images.ts
// Download and register all campus homepage hero images locally into public/media and garnish-local.db

import fs from 'fs';
import path from 'path';
import { createClient } from '@libsql/client';

const SITES_HERO_MAP: Record<string, { url: string; city: string }> = {
  www: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2025/02/20130809-DSC_9526-garnish@me.com_.jpg', city: 'London' },
  la: { url: 'https://la.garnishmusicproduction.com/wp-content/uploads/sites/7/2022/05/bg-2-with-border.jpg', city: 'Los Angeles' },
  ny: { url: 'https://ny.garnishmusicproduction.com/wp-content/uploads/sites/9/2025/07/Music-production-classes.jpg', city: 'New York' },
  nsh: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2018/04/Ableton-Live-10-production-course-2.jpg', city: 'Nashville' },
  ber: { url: 'https://ber.garnishmusicproduction.com/wp-content/uploads/sites/3/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Berlin' },
  hk: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2018/04/Ableton-Live-10-production-course-2.jpg', city: 'Hong Kong' },
  mia: { url: 'https://mia.garnishmusicproduction.com/wp-content/uploads/sites/5/2025/05/Music-production-classes.jpg', city: 'Miami' },
  edu: { url: 'https://edu.garnishmusicproduction.com/wp-content/uploads/sites/8/2025/05/Music-production-classes.jpg', city: 'Global Hub' },
  tyo: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2018/04/Ableton-Live-10-production-course-2.jpg', city: 'Tokyo' },
  sea: { url: 'https://sea.garnishmusicproduction.com/wp-content/uploads/sites/21/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Seattle' },
  bcn: { url: 'http://bcn.garnishmusicproduction.com/wp-content/uploads/sites/30/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Barcelona' },
  hou: { url: 'http://mrb.garnishmusicproduction.com/wp-content/uploads/sites/33/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Houston' },
  syd: { url: 'http://syd.garnishmusicproduction.com/wp-content/uploads/sites/35/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Sydney' },
  av: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2025/02/20130809-DSC_9526-garnish@me.com_.jpg', city: 'Audio/Visual' },
  lis: { url: 'http://lis.garnishmusicproduction.com/wp-content/uploads/sites/48/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Lisbon' },
  sf: { url: 'https://sf.garnishmusicproduction.com/wp-content/uploads/sites/51/2025/05/Music-production-classes.jpg', city: 'San Francisco' },
  sg: { url: 'https://www.garnishmusicproduction.com/wp-content/uploads/2018/04/Ableton-Live-10-production-course-2.jpg', city: 'Singapore' },
  pdx: { url: 'http://mrb.garnishmusicproduction.com/wp-content/uploads/sites/55/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Portland' },
  mrb: { url: 'http://mrb.garnishmusicproduction.com/wp-content/uploads/sites/55/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Marbella' },
  bh: { url: 'http://bh.garnishmusicproduction.com/wp-content/uploads/sites/50/2021/10/Ableton-Live-10-Release_3_web.jpg', city: 'Bournemouth' },
};

async function main() {
  const mediaDir = path.join(process.cwd(), 'public', 'media');
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  const dbPath = path.join(process.cwd(), 'garnish-local.db');
  const client = createClient({ url: `file:${dbPath}` });

  console.log('--- Downloading & Registering Campus Hero Images Locally ---');

  for (const [subdomain, data] of Object.entries(SITES_HERO_MAP)) {
    try {
      const ext = path.extname(new URL(data.url).pathname) || '.jpg';
      const filename = `studio-hero-${subdomain}${ext}`;
      const filePath = path.join(mediaDir, filename);

      console.log(`[${subdomain}] Fetching ${data.url}...`);
      const res = await fetch(data.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GarnishLocalMigrator/1.0',
        },
      });

      if (!res.ok) {
        console.warn(`[${subdomain}] Failed to fetch ${data.url} (Status ${res.status}). Skipping or using fallback.`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      const filesize = buffer.length;
      const mimeType = ext.toLowerCase() === '.png' ? 'image/png' : ext.toLowerCase() === '.webp' ? 'image/webp' : 'image/jpeg';
      const now = new Date().toISOString();
      const alt = `Garnish Music Production Studio ${data.city}`;
      const url = `/api/media/file/${filename}`;

      // Check if record exists
      const existing = await client.execute({
        sql: 'SELECT id FROM media WHERE filename = ?',
        args: [filename]
      });

      if (existing.rows.length > 0) {
        await client.execute({
          sql: 'UPDATE media SET alt = ?, tenant = ?, url = ?, mime_type = ?, filesize = ?, updated_at = ? WHERE filename = ?',
          args: [alt, subdomain, url, mimeType, filesize, now, filename]
        });
        console.log(`[${subdomain}] Updated media record DB ID ${existing.rows[0].id} -> /media/${filename}`);
      } else {
        await client.execute({
          sql: `INSERT INTO media (alt, tenant, wp_upload_path, updated_at, created_at, url, filename, mime_type, filesize, width, height, focal_x, focal_y)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [alt, subdomain, `local-hero/${filename}`, now, now, url, filename, mimeType, filesize, 1920, 1080, 50, 50]
        });
        console.log(`[${subdomain}] Inserted new media record -> /media/${filename}`);
      }
    } catch (err: any) {
      console.error(`[${subdomain}] Error downloading/registering hero image:`, err.message);
    }
  }

  console.log('\n--- Done downloading all campus hero images locally! ---');
}

main().catch(console.error);
