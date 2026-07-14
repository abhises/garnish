import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    let dbInfo = null;
    let rawSqlCount = null;
    let rawSqlMaxId = null;
    try {
      if ((payload.db as any).pool) {
        const resInfo = await (payload.db as any).pool.query('SELECT current_database(), current_schema()');
        dbInfo = {
          db: resInfo.rows[0].current_database,
          schema: resInfo.rows[0].current_schema,
          options: (payload.db as any).pool.options?.connectionString,
        };
        const res = await (payload.db as any).pool.query('SELECT count(*), max(id) FROM courses');
        rawSqlCount = res.rows[0].count;
        rawSqlMaxId = res.rows[0].max;
      }
    } catch (sqlErr: any) {
      console.error('SQL error:', sqlErr.message);
    }

    return NextResponse.json({
      dbInfo,
      rawSqlCount,
      rawSqlMaxId,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stack: err.stack }, { status: 500 });
  }
}
