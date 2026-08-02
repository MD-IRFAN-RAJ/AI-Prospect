Supabase migrations
===================

This folder contains simple SQL migration files for the backend.

Apply the migrations using one of these methods:

- Supabase CLI:

  ```bash
  supabase db remote set <your-db-connection-string>
  psql "$SUPABASE_DB_URL" -f supabase/migrations/001_create_companies.sql
  psql "$SUPABASE_DB_URL" -f supabase/migrations/002_create_search_history.sql
  ```

- Or use a Postgres client / `psql` directly with your Supabase connection string.

Notes:
- The files assume `pgcrypto` extension (for `gen_random_uuid()`) is available. If not, use `uuid_generate_v4()` or change the default to `uuid_generate_v4()` after enabling the `uuid-ossp` extension.
