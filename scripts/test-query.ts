import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const PG_URL = (process.env.DATABASE_URL || '').replace('sslmode=require', 'sslmode=verify-full');

async function run() {
  const pgClient = new Client({ connectionString: PG_URL });
  await pgClient.connect();
  const pages = await pgClient.query(`SELECT * FROM pages WHERE slug = 'electronic-music-production'`);
  console.log('PAGES:', pages.rows);
  const courses = await pgClient.query(`SELECT * FROM courses WHERE slug = 'electronic-music-production'`);
  console.log('COURSES:', courses.rows);
  await pgClient.end();
}
run();
