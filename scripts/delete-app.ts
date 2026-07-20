import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function checkDelete() {
  const payload = await getPayload({ config: configPromise });
  const res = await payload.find({ collection: 'courses', where: { slug: { equals: 'ableton-producer-program' } } });
  
  console.log(`Found ${res.docs.length} courses with slug 'ableton-producer-program'.`);
  for (const doc of res.docs) {
    await payload.delete({ collection: 'courses', id: doc.id });
    console.log(`Deleted course ID: ${doc.id}`);
  }
}

checkDelete().catch(console.error);
