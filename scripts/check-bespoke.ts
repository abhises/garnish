import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });
  
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'bespoke-private-tuition' } },
  });
  console.log('Pages:', pages.docs.map(d => ({ id: d.id, slug: d.slug, title: d.title })));
  
  const courses = await payload.find({
    collection: 'courses',
    where: { slug: { equals: 'bespoke-private-tuition' } },
  });
  console.log('Courses:', courses.docs.map(d => ({ id: d.id, slug: d.slug, title: d.title })));
}

run().catch(console.error);
