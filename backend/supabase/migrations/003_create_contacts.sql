-- 003_create_contacts.sql
-- Create contacts table referencing companies

CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  designation text,
  linkedin text,
  email text,
  confidence integer,
  created_at timestamptz DEFAULT now()
);
