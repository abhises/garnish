import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import pkg from 'pg';
const { Pool } = pkg;

(async () => {
  const pgUri = process.env.DATABASE_URI || process.env.DATABASE_URL || '';
  console.log('Connecting via raw pg to:', pgUri.replace(/:[^:@]+@/, ':***@'));
  const pool = new Pool({ connectionString: pgUri });
  try {
    const res = await pool.query('SELECT count(*), max(id) FROM courses');
    console.log('PG Raw SQL count and max id:', res.rows[0]);
    
    const rows = await pool.query('SELECT id, slug, tenant, title FROM courses WHERE id >= 290 ORDER BY id ASC');
    console.log('Rows >= 290 in Postgres:', rows.rows);

    const ableton = await pool.query("SELECT id, slug, tenant, title FROM courses WHERE slug = 'ableton-live-course-london'");
    console.log('Ableton rows in Postgres:', ableton.rows);
  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
  process.exit(0);
})();
