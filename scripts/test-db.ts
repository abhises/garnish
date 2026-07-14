import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

(async () => {
  try {
    const payload = await getPayload({ config: configPromise });
    if ((payload.db as any).pool) {
      const resInfo = await (payload.db as any).pool.query('SELECT current_database(), current_schema()');
      console.log('test-db Info:', resInfo.rows[0]);
      const res = await (payload.db as any).pool.query('SELECT count(*), max(id) FROM courses');
      console.log('test-db SQL Count & Max:', res.rows[0]);
      const resAbleton = await (payload.db as any).pool.query("SELECT id, slug, tenant, title FROM courses WHERE slug = 'ableton-live-course-london'");
      console.log('test-db Ableton rows:', resAbleton.rows);
    } else if ((payload.db as any).drizzle) {
      const resInfo: any = await (payload.db as any).drizzle.execute('SELECT current_database(), current_schema()');
      console.log('test-db Info:', resInfo.rows || resInfo);
      const res: any = await (payload.db as any).drizzle.execute('SELECT count(*), max(id) FROM courses');
      console.log('test-db SQL Count & Max:', res.rows || res);
      const resAbleton: any = await (payload.db as any).drizzle.execute("SELECT id, slug, tenant, title FROM courses WHERE slug = 'ableton-live-course-london'");
      console.log('test-db Ableton rows:', resAbleton.rows || resAbleton);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
