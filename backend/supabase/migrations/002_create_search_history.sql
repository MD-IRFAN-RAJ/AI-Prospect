-- 002_create_search_history.sql
-- Run this SQL against your Supabase Postgres to create the search_history table

CREATE TABLE IF NOT EXISTS public.search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  created_at timestamptz DEFAULT now()
);
