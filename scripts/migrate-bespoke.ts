import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import fs from 'fs';
import path from 'path';

export function parseWPBakeryToBlocks(rawContent: string, tenant: string) {
  const blocks: any[] = [];
  if (!rawContent) return blocks;

  if (rawContent.includes('[vc_row') || rawContent.includes('[vc_column')) {
    const headingMatch = rawContent.match(/\[vc_custom_heading[^\]]*text="([^"]+)"/i) ||
                         rawContent.match(/\[vc_custom_heading[^\]]*\]([^\[]+)\[\/vc_custom_heading\]/i);
    
    if (headingMatch && headingMatch[1]) {
      blocks.push({
        blockType: 'hero',
        badge: `Garnish ${tenant.toUpperCase()}`,
        heading: headingMatch[1].trim(),
        subheading: 'World-Class Music Production Education',
        buttons: [
          { label: 'Explore Programs', url: '/programs', style: 'primary' },
          { label: 'Contact Us', url: '/contact', style: 'secondary' },
        ],
      });
    }

    const cleanedHtml = rawContent
      .replace(/\[vc_[^\]]*\]/g, '')
      .replace(/\[\/vc_[^\]]*\]/g, '')
      .replace(/\[[a-z_]+[^\]]*\]/g, '')
      .replace(/\[\/[a-z_]+\]/g, '')
      .trim();

    if (cleanedHtml.length > 20) {
      blocks.push({
        blockType: 'richText',
        htmlContent: cleanedHtml,
        containerWidth: 'prose',
      });
    }

    if (rawContent.includes('course') || rawContent.includes('program')) {
      blocks.push({
        blockType: 'courseGrid',
        heading: 'Featured Programs',
        columns: '3',
      });
    }
  } else {
    blocks.push({
      blockType: 'richText',
      htmlContent: rawContent,
      containerWidth: 'prose',
    });
  }

  return blocks;
}

async function run() {
  const payload = await getPayload({ config: configPromise });
  const data = JSON.parse(fs.readFileSync('./scripts/bespoke.json', 'utf-8'));
  const wpPage = data[0];

  const imageUrl = wpPage._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  let mediaId = null;

  if (imageUrl) {
    console.log('Downloading image:', imageUrl);
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = path.basename(imageUrl);
    const mimeType = 'image/jpeg';

    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
    });

    if (existingMedia.totalDocs > 0) {
      mediaId = existingMedia.docs[0].id;
      console.log('Using existing media ID:', mediaId);
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
      console.log('Created media ID:', mediaId);
    }
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'bespoke-private-tuition' } },
  });

  const blocks = parseWPBakeryToBlocks(wpPage.content.rendered, 'www');

  if (existingPage.totalDocs > 0) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: {
        layout: blocks,
        featuredImage: mediaId || undefined,
      },
    });
    console.log('Updated bespoke-private-tuition page.');
  } else {
    await payload.create({
      collection: 'pages',
      data: {
        title: wpPage.title.rendered,
        slug: 'bespoke-private-tuition',
        tenant: 'www' as any,
        layout: blocks,
        featuredImage: mediaId || undefined,
        seo: {
          metaTitle: wpPage.title.rendered,
        },
      },
    });
    console.log('Created bespoke-private-tuition page.');
  }
}

run().catch(console.error);
