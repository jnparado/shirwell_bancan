/**
 * Resolve Supabase project URL and **public** API key (anon JWT or `sb_publishable_…`).
 *
 * - In the browser, only `NEXT_PUBLIC_*` vars exist unless `/api/public-env` is used.
 * - On the server / in Route Handlers, non-public fallbacks can be set for the public-env route.
 */
export function getSupabaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ??
    process.env.SUPABASE_URL?.trim() ??
    ""
  );
}

export function getSupabasePublicApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ??
    process.env.SUPABASE_ANON_KEY?.trim() ??
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ??
    ""
  );
}

/** Shown when URL + public key are missing in the browser or in `/api/public-env`. */
export const SUPABASE_AUTH_SETUP_MESSAGE =
  "Auth is not configured. In your host (e.g. Vercel → Environment Variables), set NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, then redeploy.";
