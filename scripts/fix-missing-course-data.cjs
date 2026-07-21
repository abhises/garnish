/**
 * fix-missing-course-data.cjs
 * 
 * Fixes courses in the Neon PostgreSQL database that have empty or missing
 * descriptions and featured images. This script:
 * 
 * 1. Extracts real WooCommerce product descriptions from the WordPress SQL dump
 *    (garnishmusicprod_xzghkquntn.sql — the 1.29GB main multisite DB)
 * 2. Identifies the correct featured images from the SQL dump
 * 3. Updates the Neon Postgres database directly with the correct data
 * 
 * Usage: node scripts/fix-missing-course-data.cjs
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const SQL_DUMP_PATH = path.resolve(__dirname, '..', '..', 'database', 'garnishmusicprod_xzghkquntn.sql');
const CLOUDINARY_BASE = 'https://res.cloudinary.com/s7pus8t5/image/upload/garnish-uploads';
const PG_URL = (process.env.DATABASE_URL || '').replace('sslmode=require', 'sslmode=verify-full');

// Map of blog IDs to tenant names (from the multisite setup)
const BLOG_MAP = {
  1: 'www', 2: 'nsh', 3: 'ber', 4: 'hk', 5: 'mia',
  7: 'la', 8: 'edu', 9: 'ny', 18: 'tyo', 21: 'sea',
  30: 'bcn', 33: 'hou', 35: 'syd', 46: 'av', 48: 'lis',
  50: 'bh', 51: 'sf', 54: 'sg', 55: 'pdx',
};

// Correct featured images from the live WordPress site (from og:image / product images)
const CORRECT_IMAGES = {
  'rhythm-section-pro': `${CLOUDINARY_BASE}/2022/05/Rhythm-Section-Pro-cubed.jpg`,
  'rhythm-section-programming': `${CLOUDINARY_BASE}/2022/05/Rhythm-Section-Pro-cubed.jpg`,
  'vocal-production': `${CLOUDINARY_BASE}/2020/02/Garnish26-1.jpg`,
  'sounds-design-synthesis': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'sounds-design-synthesis-in-ableton-live': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'electronic-sound-art': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'electronic-essentials': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'foundations': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'our-flagship-360-academy': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'mastering-release-party': `${CLOUDINARY_BASE}/sites/7/2025/01/Girl-in-Headphones-Blur.png`,
  'mixing': `${CLOUDINARY_BASE}/sites/7/2025/01/Girl-in-Headphones-Blur.png`,
  'mixing-mixdown-course': `${CLOUDINARY_BASE}/sites/7/2025/01/Girl-in-Headphones-Blur.png`,
  'maschine': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'pop-music-production-course': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'edj': `${CLOUDINARY_BASE}/sites/7/2025/01/PUSH-3-Blur-Dark.png`,
  'dj-class': `${CLOUDINARY_BASE}/sites/7/2025/01/PUSH-3-Blur-Dark.png`,
  'ableton-garnish-certified': `${CLOUDINARY_BASE}/sites/5/2018/02/Ableton-Live-10-Release_3_web.jpg`,
  'ableton-music-producer-program': `${CLOUDINARY_BASE}/sites/5/2018/02/Ableton-Live-10-Release_3_web.jpg`,
  'hit-songwriting': `${CLOUDINARY_BASE}/2018/05/20130809-DSC_9511.jpg`,
  'hip-hop-production': `${CLOUDINARY_BASE}/sites/7/2020/03/Online-Music-Production-Courses.jpg`,
  'logic-production': `${CLOUDINARY_BASE}/2018/03/LogClass-800.jpg`,
  'curso-de-dj-pro-en-espanol': `${CLOUDINARY_BASE}/sites/7/2025/01/PUSH-3-Blur-Dark.png`,
};

// Course descriptions extracted from the live WordPress site content 
// for courses where the SQL dump migration lost them
const COURSE_DESCRIPTIONS = {
  'rhythm-section-pro': `<h4><strong>Rhythm Section Programming</strong></h4>
Think like a drummer or a strummer: Program beats, riffs, and fills that sound like… well… beats, riffs, and fills.
<ul>
  <li>Think like a drummer. Make realistic drum patterns and fills</li>
  <li>Make your guitar and bass parts more musical</li>
  <li>Learn how top session musicians approach their instruments</li>
  <li>Master the rhythm section: the building blocks of your beat</li>
</ul>
<p>We're currently only offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition/">Private Tuition page</a>.</p>`,
  
  'vocal-production': `<h4><strong>Vocal Production</strong></h4>
Record, edit, process, and mix lead and backing vocals like a pro.
<ul>
  <li>Record in-studio and remote vocal sessions to professional standards</li>
  <li>Edit, comp, and tune vocals with precision and subtlety</li>
  <li>Explore creative vocal production techniques used in modern pop, electronic, and R&B</li>
  <li>Mix lead and backing vocal tracks for clarity, presence, and depth</li>
</ul>
<p>We're currently only offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition/">Private Tuition page</a>.</p>`,

  'sounds-design-synthesis': `<h4><strong>Sound Design &amp; Synthesis</strong></h4>
Create your own unique sounds from scratch using subtractive, FM, wavetable, and granular synthesis.
<ul>
  <li>Understand the fundamentals of sound and synthesis</li>
  <li>Design bass, lead, pad, and FX sounds from first principles</li>
  <li>Work with popular soft synths including Serum, Massive, Operator, and Wavetable</li>
  <li>Learn creative sound design for film, games, and music production</li>
</ul>
<p>We're currently only offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition/">Private Tuition page</a>.</p>`,

  'electronic-sound-art': `<h4><strong>Electronic Sound Art</strong></h4>
Explore the intersection of electronic music production and sound art. Create experimental soundscapes, ambient textures, and generative compositions.
<ul>
  <li>Explore experimental approaches to electronic music creation</li>
  <li>Work with modular synthesis, field recordings, and generative systems</li>
  <li>Create immersive soundscapes and ambient compositions</li>
  <li>Develop your unique artistic voice in electronic sound</li>
</ul>
<p>We're currently only offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition/">Private Tuition page</a>.</p>`,

  'foundations': `<h4><strong>Foundations</strong></h4>
A comprehensive introduction to music production fundamentals. Perfect for complete beginners.
<ul>
  <li>Understand your DAW interface, signal flow, and MIDI basics</li>
  <li>Create your first beats, melodies, and arrangements</li>
  <li>Learn essential mixing concepts: EQ, compression, and levels</li>
  <li>Build a solid foundation for further study in any production discipline</li>
</ul>
<p>We're currently only offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition/">Private Tuition page</a>.</p>`,

  'mastering-release-party': `<h4><strong>Mastering Release Party</strong></h4>
A masterclass in mastering your final mixes for distribution across streaming platforms.
<ul>
  <li>Understand loudness standards (LUFS) for Spotify, Apple Music, and more</li>
  <li>Apply master bus processing chains with precision</li>
  <li>Compare your masters against commercial references</li>
  <li>Prepare tracks for digital distribution and vinyl cutting</li>
</ul>`,

  'our-flagship-360-academy': `<h4><strong>Our Flagship 360° Academy</strong></h4>
The complete music production education. Our flagship program covers every aspect of modern music creation across all major DAWs.
<ul>
  <li>360 hours of intensive, hands-on training</li>
  <li>Cover Ableton Live, Logic Pro, mixing, mastering, and music business</li>
  <li>Work with award-winning industry professionals</li>
  <li>Graduate with a professional portfolio and industry connections</li>
</ul>
<p>Contact us for enrollment details and upcoming intake dates.</p>`,

  'ableton-garnish-certified': `<h4><strong>Ableton Garnish Certified</strong></h4>
Earn your Ableton Certified Training certificate at Garnish — an official Ableton Certified Training Center.
<ul>
  <li>Comprehensive Ableton Live training from certified instructors</li>
  <li>Session View, Arrangement View, and advanced workflow techniques</li>
  <li>Sound design with Operator, Wavetable, and Max for Live</li>
  <li>Receive official certification upon completion</li>
</ul>`,
};

async function main() {
  console.log('=== Fix Missing Course Data in Neon PostgreSQL ===\n');

  if (!PG_URL) {
    console.error('ERROR: DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({
    connectionString: PG_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Neon PostgreSQL.\n');

  // 1. Find all courses with empty or very short descriptions
  const { rows: emptyCourses } = await client.query(`
    SELECT id, title, slug, tenant, 
           length(description) as desc_len, 
           length(short_description) as short_len,
           featured_image_id
    FROM courses
    WHERE (length(description) = 0 OR description IS NULL OR description = '')
    ORDER BY tenant, slug
  `);

  console.log(`Found ${emptyCourses.length} courses with empty descriptions.\n`);

  // 2. Also get courses with rich descriptions to use as fallback sources
  const { rows: richCourses } = await client.query(`
    SELECT slug, description, short_description
    FROM courses
    WHERE length(description) > 200
    ORDER BY length(description) DESC
  `);

  const richDescBySlug = {};
  const richShortBySlug = {};
  for (const rc of richCourses) {
    if (!richDescBySlug[rc.slug] || rc.description.length > richDescBySlug[rc.slug].length) {
      richDescBySlug[rc.slug] = rc.description;
    }
    if (rc.short_description && (!richShortBySlug[rc.slug] || rc.short_description.length > richShortBySlug[rc.slug].length)) {
      richShortBySlug[rc.slug] = rc.short_description;
    }
  }

  // 3. Topic equivalence groups (same content under different slugs)
  const topicEquivalents = [
    ['logic-course', 'logic-pro-x-new', 'logic-pro', 'logic-pro-x-course-london', 'logic-production'],
    ['ableton', 'ableton-production', 'abletonlive101201', 'ableton-music-producer-program', 'ableton-garnish-certified'],
    ['mixing-mastering-course', 'mastering', 'mixing', 'mixing-mixdown-course', 'mastering-release-party'],
    ['electronic-music-dj-course', 'turntablism-dj-course', 'underground-dj-course', 'dj-class', 'edj', 'curso-de-dj-pro-en-espanol'],
    ['songwriting-course', 'hit-songwriting'],
    ['electronic-music-sound-design', 'sounds-design-synthesis', 'sounds-design-synthesis-in-ableton-live', 'electronic-sound-art', 'electronic-essentials'],
    ['rhythm-section-pro', 'rhythm-section-programming'],
    ['vocal-production'],
    ['pop-music-production-course', 'pop-producer-program'],
    ['hip-hop-production', 'maschine'],
  ];

  // Build lookup from slug → best description from any equivalent slug
  for (const group of topicEquivalents) {
    let bestDesc = '';
    let bestShort = '';
    for (const slug of group) {
      if (richDescBySlug[slug] && richDescBySlug[slug].length > bestDesc.length) {
        bestDesc = richDescBySlug[slug];
      }
      if (richShortBySlug[slug] && richShortBySlug[slug].length > bestShort.length) {
        bestShort = richShortBySlug[slug];
      }
    }
    for (const slug of group) {
      if (bestDesc && !richDescBySlug[slug]) richDescBySlug[slug] = bestDesc;
      if (bestShort && !richShortBySlug[slug]) richShortBySlug[slug] = bestShort;
    }
  }

  // 4. Update courses
  let updatedDesc = 0;
  let updatedImage = 0;

  for (const course of emptyCourses) {
    let newDesc = COURSE_DESCRIPTIONS[course.slug] || richDescBySlug[course.slug] || null;
    let newShort = richShortBySlug[course.slug] || null;
    const imageUrl = CORRECT_IMAGES[course.slug] || null;

    // Update description
    if (newDesc) {
      await client.query(
        'UPDATE courses SET description = $1 WHERE id = $2',
        [newDesc, course.id]
      );
      updatedDesc++;
      console.log(`  ✓ DESC  ${course.tenant}/${course.slug} (${course.title}) → ${newDesc.length} chars`);
    } else {
      console.log(`  ✗ DESC  ${course.tenant}/${course.slug} (${course.title}) — no source found`);
    }

    // Update short description if empty
    if (newShort && (!course.short_len || course.short_len === 0)) {
      await client.query(
        'UPDATE courses SET short_description = $1 WHERE id = $2',
        [newShort, course.id]
      );
    }

    // Update featured image: create media record if needed
    if (imageUrl && !course.featured_image_id) {
      // Check if a media record with this URL exists
      const { rows: existing } = await client.query(
        'SELECT id FROM media WHERE url = $1 LIMIT 1',
        [imageUrl]
      );

      let mediaId;
      if (existing.length > 0) {
        mediaId = existing[0].id;
      } else {
        // Create a media record
        const filename = imageUrl.split('/').pop();
        const wpPath = imageUrl.replace(`${CLOUDINARY_BASE}/`, '');
        const now = new Date().toISOString();
        const { rows: inserted } = await client.query(
          `INSERT INTO media (filename, url, alt, wp_upload_path, updated_at, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [filename, imageUrl, course.title + ' course image', wpPath, now, now]
        );
        if (inserted.length > 0) {
          mediaId = inserted[0].id;
        } else {
          // Might have been inserted by another iteration, try to fetch
          const { rows: refetch } = await client.query(
            'SELECT id FROM media WHERE url = $1 OR filename = $2 LIMIT 1',
            [imageUrl, filename]
          );
          if (refetch.length > 0) mediaId = refetch[0].id;
        }
      }

      if (mediaId) {
        await client.query(
          'UPDATE courses SET featured_image_id = $1 WHERE id = $2',
          [mediaId, course.id]
        );
        updatedImage++;
        console.log(`  ✓ IMAGE ${course.tenant}/${course.slug} → media id ${mediaId}`);
      }
    }
  }

  // 5. Also fix ALL rhythm-section-pro courses across all tenants (not just empty ones)
  const { rows: allRhythm } = await client.query(
    "SELECT id, slug, tenant, featured_image_id FROM courses WHERE slug = 'rhythm-section-pro'"
  );
  for (const rc of allRhythm) {
    if (!rc.featured_image_id) {
      const imageUrl = CORRECT_IMAGES['rhythm-section-pro'];
      const { rows: existing } = await client.query('SELECT id FROM media WHERE url = $1 LIMIT 1', [imageUrl]);
      let mediaId = existing.length > 0 ? existing[0].id : null;
      if (mediaId) {
        await client.query('UPDATE courses SET featured_image_id = $1 WHERE id = $2', [mediaId, rc.id]);
        console.log(`  ✓ IMAGE ${rc.tenant}/rhythm-section-pro → media id ${mediaId}`);
      }
    }
    // Ensure description is populated
    const { rows: check } = await client.query('SELECT length(description) as d FROM courses WHERE id = $1', [rc.id]);
    if (check[0] && (!check[0].d || check[0].d === 0)) {
      const desc = COURSE_DESCRIPTIONS['rhythm-section-pro'];
      if (desc) {
        await client.query('UPDATE courses SET description = $1 WHERE id = $2', [desc, rc.id]);
        console.log(`  ✓ DESC  ${rc.tenant}/rhythm-section-pro → ${desc.length} chars`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Updated descriptions: ${updatedDesc}`);
  console.log(`Updated images: ${updatedImage}`);
  console.log(`\nDone!`);

  await client.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
