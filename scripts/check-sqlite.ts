// node:sqlite is experimental in Node.js v22 — no @types yet.
// Use createRequire to load it in this ESM-based project.
import { createRequire } from 'node:module';
const _require = createRequire(import.meta.url);
const { DatabaseSync } = _require('node:sqlite') as {
  DatabaseSync: new (path: string) => {
    prepare: (sql: string) => { get: () => unknown; all: () => unknown[] };
    close: () => void;
  };
};

const db = new DatabaseSync('garnish-local.db');
try {
  const rowCount = db.prepare('SELECT count(*) as count, max(id) as maxId FROM courses').get();
  console.log('SQLite direct count & max id:', rowCount);

  const ableton = db.prepare("SELECT id, slug, tenant, title FROM courses WHERE slug = 'ableton-live-course-london'").all();
  console.log('SQLite direct ableton rows:', ableton);
} finally {
  db.close();
}
