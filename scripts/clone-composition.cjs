require('dotenv').config({ path: '.env.local' });
const { getPayload } = require('payload');
const config = require('@payloadcms/next/utilities').config;
// Actually we can just run the query with pg, let me see exactly what was wrong with the query.
const { Pool } = require('pg');

(async () => {
  const p = new Pool({connectionString: process.env.DATABASE_URL});
  try {
    const laRow = await p.query("SELECT * FROM courses WHERE slug = 'composition' AND tenant = 'la'");
    if (laRow.rows.length > 0) {
      const d = laRow.rows[0];
      await p.query(
        "INSERT INTO courses (title, slug, tenant, wp_post_id, short_description, description, price, created_at, updated_at) VALUES ($1, $2, 'www', $3, $4, $5, $6, NOW(), NOW())", 
        [d.title, d.slug, d.wp_post_id, d.short_description || '', d.description || '', d.price || '']
      );
      console.log('Cloned composition to www');
    } else {
      console.log('composition not found in la');
    }
  } catch (e) {
    console.error(e);
  } finally {
    p.end();
  }
})();
