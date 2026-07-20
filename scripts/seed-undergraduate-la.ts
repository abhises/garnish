import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import { parseWPBakeryToBlocks } from './migrate-wp-to-payload';

async function seedUndergraduate() {
  const payload = await getPayload({ config: configPromise });

  const res = await fetch('https://la.garnishmusicproduction.com/wp-json/wp/v2/pages?slug=undergraduate-business-and-music');
  const pages = await res.json();
  const wpPage = pages[0];

  const title = wpPage.title.rendered;
  const rawContent = wpPage.content.rendered;
  
  // Parse WPBakery layouts into clean Payload blocks (handles 40000 char limits via chunking)
  const layout = parseWPBakeryToBlocks(rawContent, 'la');

  const dataToSave = {
    title,
    slug: 'undergraduate-business-and-music',
    tenant: 'la' as any,
    layout,
    seo: {
      metaTitle: 'F1 Visa Music & Business Degrees in Los Angeles | IAULA',
      metaDescription: 'International students: Study music production & business in LA. Earn an ASBA/BBA degree from IAU & Garnish. Spring deadline: March 22. Enrolling now!',
    },
  };

  const existing = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'undergraduate-business-and-music' } },
        { tenant: { equals: 'la' } },
      ],
    },
  });

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: dataToSave as any,
    });
    console.log('Updated existing page in DB.');
  } else {
    await payload.create({
      collection: 'pages',
      data: dataToSave as any,
    });
    console.log('Created new page in DB.');
  }
  process.exit(0);
}
seedUndergraduate();
