import 'dotenv/config';
import fs from 'node:fs/promises';
import { Client } from 'pg';

async function run() {
  const conn = process.env.DIRECT_URL || process.env.SUPABASE_URL;
  if (!conn) {
    console.error('No DIRECT_URL or SUPABASE_URL found in environment. Aborting.');
    process.exit(1);
  }

  const files = [
    'supabase/migrations/001_create_companies.sql',
    'supabase/migrations/002_create_search_history.sql',
    'supabase/migrations/003_create_contacts.sql',
    'supabase/migrations/004_update_companies_outreach.sql',
    'supabase/migrations/005_add_company_details.sql',
    'supabase/migrations/006_create_visitors.sql',
  ];

  const client = new Client({ connectionString: conn });
  try {
    await client.connect();
    for (const file of files) {
      const sql = await fs.readFile(file, 'utf8');
      console.log('Applying', file);
      await client.query(sql);
    }
    console.log('Migrations applied successfully.');
  } catch (err) {
    console.error('Migration error:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();
