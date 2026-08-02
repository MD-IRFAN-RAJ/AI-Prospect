import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

// Expose a Supabase client when URL + service role key are provided.
export const supabaseClient: SupabaseClient | null =
  env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
    : null;

export default supabaseClient;
