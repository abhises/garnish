const cheerio = require('cheerio');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const p = new Pool({connectionString: process.env.DATABASE_URL});
  try {
    const slug = 'composition';
    const url = `https://www.garnishmusicproduction.com/courses/${slug}/`;
    
    console.log(`Fetching ${url}...`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    let content = $('.vc_col-sm-9 .vc_column-inner > .wpb_wrapper').first().html() || 
                  $('.vc_col-sm-12 .vc_column-inner > .wpb_wrapper').first().html() ||
                  $('.mkd-column1 .wpb_wrapper').first().html() ||
                  $('.mkd-full-section-inner').html();
    
    if (content) {
      const $content = cheerio.load(content);
      $content('.mkd-title-image').remove();
      const cleanContent = $content.html().trim();
      
      const res = await p.query(
        "UPDATE courses SET description = $1 WHERE slug = 'composition'", 
        [cleanContent]
      );
      console.log(`✅ Updated composition (${cleanContent.length} bytes) across ${res.rowCount} rows`);
    } else {
      console.log('⚠️ No content found');
    }
  } catch (e) {
    console.error(e);
  } finally {
    p.end();
  }
})();
