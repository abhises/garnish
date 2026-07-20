import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function deleteCourse() {
  const payload = await getPayload({ config: configPromise });
  const res = await payload.find({ collection: 'courses', where: { slug: { equals: 'electronic-music-production' } } });
  
  if (res.docs.length > 0) {
    console.log(`Found ${res.docs.length} courses with slug 'electronic-music-production'. Deleting...`);
    for (const doc of res.docs) {
      await payload.delete({ collection: 'courses', id: doc.id });
      console.log(`Deleted course ID: ${doc.id}`);
    }
    console.log('Successfully removed from Payload DB. It will now fall back to the live WordPress site.');
  } else {
    console.log('Course not found in Payload. It is already falling back to WordPress!');
  }
}

deleteCourse().catch(console.error);
