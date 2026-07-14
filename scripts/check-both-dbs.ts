import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { getPayload } from 'payload';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Courses } from '../src/collections/Courses';
import { Users } from '../src/collections/Users';
import { Pages } from '../src/collections/Pages';
import { Posts } from '../src/collections/Posts';
import { Media } from '../src/collections/Media';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

(async () => {
  const pgUri = process.env.DATABASE_URI || '';
  console.log('Testing PG URI:', pgUri.replace(/:[^:@]+@/, ':***@'));
  
  const pgConfig = buildConfig({
    admin: { user: 'users' },
    editor: lexicalEditor({}),
    collections: [Users, Pages, Posts, Courses, Media],
    secret: 'test-secret',
    db: postgresAdapter({
      pool: { connectionString: pgUri },
      push: false,
    }),
    sharp,
  });

  const sqliteConfig = buildConfig({
    admin: { user: 'users' },
    editor: lexicalEditor({}),
    collections: [Users, Pages, Posts, Courses, Media],
    secret: 'test-secret',
    db: sqliteAdapter({
      client: { url: 'file:./garnish-local.db' },
    }),
    sharp,
  });

  try {
    console.log('--- Checking SQLite ---');
    const sqlitePayload = await getPayload({ config: sqliteConfig });
    const sqliteCourses = await sqlitePayload.find({ collection: 'courses', limit: 1 });
    const sqliteAbleton = await sqlitePayload.find({ collection: 'courses', where: { slug: { equals: 'ableton-live-course-london' } } });
    console.log(`SQLite total courses: ${sqliteCourses.totalDocs}`);
    console.log(`SQLite ableton-live-course-london courses: ${sqliteAbleton.totalDocs}`);
  } catch (err: any) {
    console.error('SQLite error:', err.message);
  }

  try {
    console.log('\n--- Checking Postgres ---');
    const pgPayload = await getPayload({ config: pgConfig });
    const pgCourses = await pgPayload.find({ collection: 'courses', limit: 1 });
    const pgAbleton = await pgPayload.find({ collection: 'courses', where: { slug: { equals: 'ableton-live-course-london' } } });
    console.log(`Postgres total courses: ${pgCourses.totalDocs}`);
    console.log(`Postgres ableton-live-course-london courses: ${pgAbleton.totalDocs}`);
  } catch (err: any) {
    console.error('Postgres error:', err.message);
  }

  process.exit(0);
})();
