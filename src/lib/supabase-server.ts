import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://osbakaorpnogxgheownx.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYmFrYW9ycG5vZ3hnaGVvd254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDAyNDMsImV4cCI6MjA5MTA3NjI0M30.UIS_eYrO5MNxyKqb-vPEepdncJ42BpUdh9aL883S4as";

export function createSupabaseServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
