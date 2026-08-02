import supabase from '../supabase/client.js';

async function main() {
  if (!supabase) {
    console.log('Supabase client not configured (SUPABASE_URL or SERVICE_ROLE_KEY missing).');
    process.exit(0);
  }

  try {
    const { data: companies, error: cErr } = await supabase.from('companies').select('*').limit(5);
    if (cErr) console.log('companies error:', cErr.message || cErr);
    else console.log('companies:', companies);

    const { data: searches, error: sErr } = await supabase
      .from('search_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (sErr) console.log('search_history error:', sErr.message || sErr);
    else console.log('search_history:', searches);
  } catch (err) {
    console.error('unexpected error:', err);
  }

  process.exit(0);
}

main();
