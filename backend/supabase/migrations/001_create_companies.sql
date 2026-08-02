-- 001_create_companies.sql
-- Run this SQL against your Supabase Postgres to create the companies table

CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  website text,
  industry text,
  summary text,
  created_at timestamptz DEFAULT now()
);
