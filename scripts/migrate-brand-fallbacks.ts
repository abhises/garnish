import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import path from 'path';

export function parseWPBakeryToBlocks(rawContent: string, tenant: string) {
  const blocks: any[] = [];
  if (!rawContent) return blocks;

  // If we detect complex WPBakery layout shortcodes, preserve them natively
  // We place them in RichText, where the Next.js frontend will use parseWPBakery to render them to Tailwind
  blocks.push({
    blockType: 'richText',
    htmlContent: rawContent,
    containerWidth: 'full',
  });

  return blocks;
}

const brandFallbackSlugs = [
  'bespoke-private-tuition',
];

async function run() {
  const payload = await getPayload({ config: configPromise });

  for (const slug of brandFallbackSlugs) {
    console.log(`\nProcessing slug: ${slug}`);
    try {
      const wpResponse = await fetch(`https://www.garnishmusicproduction.com/wp-json/wp/v2/pages?slug=${slug}&_embed=1`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Migration Script)'
        }
      });
      
      if (!wpResponse.ok) {
        console.log(`Failed to fetch ${slug} from WP API.`);
        continue;
      }
      
      const wpData = await wpResponse.json();
      if (!wpData || wpData.length === 0) {
        console.log(`Slug ${slug} not found on live WordPress site.`);
        continue;
      }
      
      const wpPage = wpData[0];
      const imageUrl = wpPage._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      let mediaId = null;

      // Scrape actual SEO meta title from the live HTML page
      let seoTitle = wpPage.title.rendered;
      try {
        const htmlResponse = await fetch(`https://www.garnishmusicproduction.com/${slug}/`);
        if (htmlResponse.ok) {
          const htmlText = await htmlResponse.text();
          const titleMatch = htmlText.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            seoTitle = titleMatch[1].replace(/&#8211;/g, '-').replace(/&amp;/g, '&').trim();
          }
        }
      } catch (e) {
        console.log(`Could not scrape SEO title for ${slug}`);
      }

      if (imageUrl) {
        console.log(`  Downloading image for ${slug}: ${imageUrl}`);
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = path.basename(imageUrl);
        const mimeType = 'image/jpeg'; // Simplification

        const existingMedia = await payload.find({
          collection: 'media',
          where: { filename: { equals: filename } },
        });

        if (existingMedia.totalDocs > 0) {
          mediaId = existingMedia.docs[0].id;
        } else {
          const mediaDoc = await payload.create({
            collection: 'media',
            data: {
              alt: wpPage.title.rendered,
              tenant: 'www',
            },
            file: {
              data: buffer,
              name: filename,
              mimetype: mimeType,
              size: buffer.length,
            },
          });
          mediaId = mediaDoc.id;
        }
      }

      const existingPage = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
      });

      const blocks = parseWPBakeryToBlocks(wpPage.content.rendered, 'www');

      if (existingPage.totalDocs > 0) {
        await payload.update({
          collection: 'pages',
          id: existingPage.docs[0].id,
          data: {
            title: wpPage.title.rendered,
            layout: blocks,
            featuredImage: mediaId || undefined,
            seo: {
              metaTitle: seoTitle,
            },
          },
        });
        console.log(`  Updated page: ${slug}`);
      } else {
        await payload.create({
          collection: 'pages',
          data: {
            title: wpPage.title.rendered,
            slug: slug,
            tenant: 'www' as any,
            layout: blocks,
            featuredImage: mediaId || undefined,
            seo: {
              metaTitle: seoTitle,
            },
          },
        });
        console.log(`  Created page: ${slug}`);
      }
    } catch (err) {
      console.error(`  Error processing ${slug}:`, err);
    }
  }
}

run().catch(console.error);
