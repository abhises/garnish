const sqlite3 = require('sqlite3');
const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const DB_PATH = path.resolve(__dirname, '../garnish-local.db');
const rawPgUrl = process.env.DATABASE_URL || process.env.DATABASE_URI || '';
const PG_URL = rawPgUrl.replace('sslmode=require', 'sslmode=verify-full');

const DAVE_GARNISH_SHORT_DESC = `Dave Garnish was DJing on Don FM at age sixteen while studying music at the BRIT School in London, with the guitar being his first instrument. In 1995, he set up Blah Parties in a joiner’s factory on Pitfield Street performing as Alf Garnish, playing a pivotal role in shaping the cultural scene of Shoreditch, London.`;

const DAVE_GARNISH_DESC = `<p>Dave Garnish gained admission to the <a href="https://en.wikipedia.org/wiki/BRIT_School" target="_blank" rel="noopener noreferrer">BRIT School</a> via audition on guitar. At that time he was also at the forefront of London’s pirate radio scene, most notably <a href="https://en.wikipedia.org/wiki/Don_FM" target="_blank" rel="noopener noreferrer">Don FM</a>. In 1995, he established Blah Parties in a joiner’s factory on Pitfield Street, playing a pivotal role in shaping the cultural scene of Shoreditch, London.</p>

<p>His journey into the world of sound engineering commenced when <a href="https://en.wikipedia.org/wiki/George_Martin" target="_blank" rel="noopener noreferrer">Sir George Martin</a> recruited him to work at <a href="http://www.airstudios.com/the-studios/" target="_blank" rel="noopener noreferrer">Air Lyndhurst Hall</a>. Progressing through the ranks, he transitioned to the EMI Studios Group, comprising <a href="https://en.wikipedia.org/wiki/Townhouse_Studios" target="_blank" rel="noopener noreferrer">The Townhouse</a>, Abbey Road, and <a href="https://en.wikipedia.org/wiki/Olympic_Studios" target="_blank" rel="noopener noreferrer">Olympic Studios</a>, where he worked with artists such as Janet Jackson, Madonna, Björk, All Saints, and Massive Attack. His work extended to collaborating with producers ranging from Andrew Lloyd Webber to Nellee Hooper. In 2001, Dave signed a songwriting publishing deal with Universal Music UK.</p>

<blockquote class="my-8 p-6 sm:p-8 border-l-4 border-amber-500 bg-amber-50/70 rounded-r-2xl shadow-sm text-slate-800 italic leading-relaxed">
  <p class="text-base sm:text-lg mb-4">“Dave Garnish was our in-house engineer, producer, then writer at Universal for a number of years. The quality of his work was always outstanding. He’s smart, with an extensive knowledge of different types of music, and I’m sure this will rub off on his education project”</p>
  <footer class="text-sm font-bold not-italic text-slate-900">— <a href="https://www.google.com/search?q=Mike+McCormack+Universal+Music" target="_blank" rel="noopener noreferrer" class="underline decoration-amber-500 hover:text-amber-700">Mike McCormack</a> – MD/President Universal Music UK</footer>
</blockquote>

<div class="my-8">
  <img src="/uploads/sites/8/2016/09/Dave-Air-Teenager-Calc-Test-1.jpeg" alt="Dave Garnish at Air Lyndhurst Hall" class="rounded-2xl shadow-md border border-slate-100 max-w-full h-auto mb-3" />
  <p class="text-xs text-slate-400 italic text-center sm:text-left">Dave Garnish during his early engineering years at Air Lyndhurst Hall.</p>
</div>

<div class="mt-8 pt-6 border-t border-slate-100">
  <a href="https://www.ableton.com/en/certified-training/garnish-music-production-school/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all hover:-translate-y-0.5">
    <span>Ableton Certified Training Center</span>
    <span>→</span>
  </a>
</div>`;

async function seed() {
  console.log('=== Seeding Dave Garnish into SQLite and Postgres ===');

  // 1. Seed SQLite
  const sqliteDb = new sqlite3.Database(DB_PATH);
  const runSqlite = (sql, params = []) => new Promise((resolve, reject) => {
    sqliteDb.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
  const getSqlite = (sql, params = []) => new Promise((resolve, reject) => {
    sqliteDb.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  try {
    const tenants = ['edu', 'www', 'la', 'bcn', 'ber', 'ny', 'mia', 'syd'];
    for (const tenant of tenants) {
      const existing = await getSqlite('SELECT id FROM courses WHERE slug = ? AND tenant = ?', ['dave-garnish', tenant]);
      if (!existing) {
        await runSqlite(`
          INSERT INTO courses (title, slug, tenant, short_description, description, duration, price, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `, ['Dave Garnish', 'dave-garnish', tenant, DAVE_GARNISH_SHORT_DESC, DAVE_GARNISH_DESC, 'Founder & Director', 'Instructor Biography']);
        console.log(`[SQLite] Created course dave-garnish for tenant '${tenant}'`);
      } else {
        await runSqlite(`
          UPDATE courses SET title = ?, short_description = ?, description = ?, duration = ?, price = ?, updated_at = datetime('now')
          WHERE id = ?
        `, ['Dave Garnish', DAVE_GARNISH_SHORT_DESC, DAVE_GARNISH_DESC, 'Founder & Director', 'Instructor Biography', existing.id]);
        console.log(`[SQLite] Updated course dave-garnish for tenant '${tenant}' (id: ${existing.id})`);
      }
    }
  } catch (err) {
    console.error('Error seeding SQLite:', err.message);
  } finally {
    sqliteDb.close();
  }

  // 2. Seed Neon Postgres
  if (PG_URL) {
    const client = new Client({ connectionString: PG_URL });
    await client.connect();
    console.log('Connected to Neon PostgreSQL for seeding.');

    try {
      const tenants = ['edu', 'www', 'la', 'bcn', 'ber', 'ny', 'mia', 'syd'];
      for (const tenant of tenants) {
        const res = await client.query('SELECT id FROM courses WHERE slug = $1 AND tenant = $2', ['dave-garnish', tenant]);
        if (res.rows.length === 0) {
          await client.query(`
            INSERT INTO courses (title, slug, tenant, short_description, description, duration, price, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
          `, ['Dave Garnish', 'dave-garnish', tenant, DAVE_GARNISH_SHORT_DESC, DAVE_GARNISH_DESC, 'Founder & Director', 'Instructor Biography']);
          console.log(`[Postgres] Created course dave-garnish for tenant '${tenant}'`);
        } else {
          await client.query(`
            UPDATE courses SET title = $1, short_description = $2, description = $3, duration = $4, price = $5, updated_at = NOW()
            WHERE id = $6
          `, ['Dave Garnish', DAVE_GARNISH_SHORT_DESC, DAVE_GARNISH_DESC, 'Founder & Director', 'Instructor Biography', res.rows[0].id]);
          console.log(`[Postgres] Updated course dave-garnish for tenant '${tenant}' (id: ${res.rows[0].id})`);
        }
      }
    } catch (err) {
      console.error('Error seeding Postgres:', err.message);
    } finally {
      await client.end();
    }
  }

  console.log('=== Seeding Complete ===');
}

seed();
