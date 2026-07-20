const fs = require('fs');
const cheerio = require('cheerio');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const html = fs.readFileSync('/tmp/live_song.html', 'utf8');
  const $ = cheerio.load(html);
  
  const content = $('.vc_col-sm-9 .vc_column-inner > .wpb_wrapper').first().html();

  const $content = cheerio.load(content || '');
  $content('.mkd-title-image').remove();
  const cleanContent = $content.html().trim();

  if (cleanContent.length > 500) {
    console.log(`Extracted ${cleanContent.length} bytes of HTML content. Update DB...`);
    
    const p = new Pool({connectionString: process.env.DATABASE_URL});
    const res = await p.query(
      `UPDATE courses SET description = $1 WHERE slug = 'songwriting-course'`,
      [cleanContent]
    );
    console.log(`Updated ${res.rowCount} rows in DB!`);
    await p.end();
  } else {
    console.log('Could not extract enough HTML content: ' + cleanContent.length);
  }
})();
