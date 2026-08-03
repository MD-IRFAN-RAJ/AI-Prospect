-- 005_add_company_details.sql
-- Add market_status, scale, annual_revenue, hq_region, suggested_budget, and growth_trajectory columns to companies

ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS market_status text,
ADD COLUMN IF NOT EXISTS scale text,
ADD COLUMN IF NOT EXISTS annual_revenue text,
ADD COLUMN IF NOT EXISTS hq_region text,
ADD COLUMN IF NOT EXISTS suggested_budget text,
ADD COLUMN IF NOT EXISTS growth_trajectory text;
