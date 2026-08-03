-- 004_update_companies_outreach.sql
-- Add outreach cache and AI summary columns to companies

ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS ai_headline text,
ADD COLUMN IF NOT EXISTS ai_best_angle text,
ADD COLUMN IF NOT EXISTS ai_confidence integer,
ADD COLUMN IF NOT EXISTS email_subject text,
ADD COLUMN IF NOT EXISTS email_body text,
ADD COLUMN IF NOT EXISTS linkedin_message text;
