-- 006_create_visitors.sql
-- Create visitors table to store unique IP addresses
CREATE TABLE IF NOT EXISTS public.visitors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Disable Row Level Security (RLS) so that the backend anon client can write and read
ALTER TABLE public.visitors DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to all roles
GRANT ALL ON public.visitors TO anon, authenticated, postgres, service_role;
