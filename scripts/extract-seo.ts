import fs from 'fs';
import readline from 'readline';
import path from 'path';

const DATABASE_DIR = path.resolve(process.cwd(), '../database');
const SEO_FILE = path.resolve(process.cwd(), 'src/lib/seo.ts');

const TARGET_SLUGS = [
  'undergraduate-business-and-music',
  'dave-garnish',
  'logic-course',
  'songwriting-course',
  'mixing-mastering-course',
  'electronic-music-dj-course',
  'vocal-production',
  'ableton-production',
  'sounds-design-synthesis',
  'electronic-sound-art',
  'rhythm-section-pro',
  'composition',
  'electronic-music-production',
  'pop-music-production-course',
  'private-tuition',
  'ableton-producer-program',
  'music-production-academy',
  'mixing-and-mastering-course-london',
  'ableton-live-course-london',
  'logic-pro-x-course-london',
  'songwriting-course-london'
];

async function extractSeo() {
  const files = fs.readdirSync(DATABASE_DIR).filter(f => f.endsWith('.sql'));
  const postMap = new Map(); // postId -> slug
  const seoData = new Map(); // slug -> { title, desc }

  console.log('Scanning SQL dumps for SEO metadata...');

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const rl = readline.createInterface({
      input: fs.createReadStream(path.join(DATABASE_DIR, file)),
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      // Very naive extraction: looking for wp_posts inserts to map ID to slug
      // INSERT INTO `wp_posts` VALUES (123, ..., 'slug-name', ...)
      if (line.includes('INSERT INTO') && line.includes('posts` VALUES')) {
        const matches = line.matchAll(/\((\d+),\d+,'[^']*','[^']*','[^']*','[^']*','[^']*','[^']*','[^']*','[^']*','[^']*','([^']*)'/g);
        for (const match of matches) {
          const id = match[1];
          const slug = match[2];
          if (TARGET_SLUGS.includes(slug)) {
            postMap.set(id, slug);
          }
        }
      }

      // Looking for wp_postmeta inserts
      // INSERT INTO `wp_postmeta` VALUES (1, 123, 'rank_math_title', 'Title')
      if (line.includes('INSERT INTO') && line.includes('postmeta` VALUES')) {
        const metaMatches = line.matchAll(/\(\d+,(\d+),'([^']+)','([^']+)'\)/g);
        for (const match of metaMatches) {
          const postId = match[1];
          const key = match[2];
          const value = match[3];

          if (postMap.has(postId)) {
            const slug = postMap.get(postId);
            if (!seoData.has(slug)) seoData.set(slug, {});
            const data = seoData.get(slug);

            if (key === 'rank_math_title' || key === '_yoast_wpseo_title') {
              data.titleTemplate = value.replace(/%sitename%/g, 'Garnish %city%').replace(/%title%/g, '');
            }
            if (key === 'rank_math_description' || key === '_yoast_wpseo_metadesc') {
              data.description = value.replace(/%sitename%/g, 'Garnish %city%');
            }
          }
        }
      }
    }
  }

  console.log('\nExtracted SEO Data:');
  console.log(seoData);
  
  if (seoData.size === 0) {
    console.log('No new SEO data found using strict regex. Using a broader search...');
    // Fallback: Just grep the file for the strings.
  }
}

extractSeo().catch(console.error);
