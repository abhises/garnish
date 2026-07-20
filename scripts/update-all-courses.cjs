const fs = require('fs');
const cheerio = require('cheerio');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const p = new Pool({connectionString: process.env.DATABASE_URL});
  
  const res = await p.query('SELECT DISTINCT slug FROM courses WHERE tenant = $1', ['www']);
  const slugs = res.rows.map(r => r.slug);
  console.log(`Found ${slugs.length} unique courses to sync...`);

  for (const slug of slugs) {
    try {
      let liveSlug = slug.endsWith('-course') ? `${slug}-london` : `${slug}-course-london`;
      if (slug === 'logic-course') liveSlug = 'logic-pro-x-course-london';
      if (slug === 'mixing-mastering-course') liveSlug = 'mixing-and-mastering-course-london';
      if (slug === 'ableton-production') liveSlug = 'ableton-live-course-london';
      if (slug === 'electronic-music-dj-course') liveSlug = 'dj-course-london';
      if (slug === 'electronic-sound-art') liveSlug = 'arturia-course-london';
      
      const url = `https://www.garnishmusicproduction.com/courses/${liveSlug}/`;
      
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`❌ Failed to fetch ${url} (Status ${response.status})`);
        continue;
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Try to find the main content block
      let content = $('.vc_col-sm-9 .vc_column-inner > .wpb_wrapper').first().html() || 
                    $('.vc_col-sm-12 .vc_column-inner > .wpb_wrapper').first().html() ||
                    $('.mkd-column1 .wpb_wrapper').first().html() ||
                    $('.mkd-full-section-inner').html();
      
      if (!content) {
        console.log(`⚠️ No content found for ${slug}`);
        continue;
      }

      const $content = cheerio.load(content);
      $content('.mkd-title-image').remove();
      const cleanContent = $content.html().trim();
      
      // Only update if it actually grabbed significant content (not just a 200 character fallback)
      if (cleanContent.length > 800) {
        const updateRes = await p.query(
          `UPDATE courses SET description = $1 WHERE slug = $2`,
          [cleanContent, slug]
        );
        console.log(`✅ Updated ${slug} (${cleanContent.length} bytes)`);
      } else {
        console.log(`⚠️ Content too short for ${slug} (${cleanContent.length} chars)`);
      }
    } catch (err) {
      console.log(`❌ Error on ${slug}: ${err.message}`);
    }
  }
  
  await p.end();
  console.log('Finished updating all courses!');
})();
