import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  const conn = process.env.DIRECT_URL || process.env.SUPABASE_URL;
  if (!conn) {
    console.error('No DIRECT_URL or SUPABASE_URL found in environment. Aborting.');
    process.exit(1);
  }

  const client = new Client({ connectionString: conn });
  try {
    await client.connect();

    const res = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('companies', 'search_history');
    `);

    const found = res.rows.map((r: any) => r.table_name);
    console.log('Found tables:', found);

    if (!found.includes('companies')) console.warn('companies table not found');
    if (!found.includes('search_history')) console.warn('search_history table not found');
  } catch (err) {
    console.error('Error checking schema:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
