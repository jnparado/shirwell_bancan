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
  "Auth is not configured for this deployment. In your host (e.g. Vercel → Settings → Environment Variables), add NEXT_PUBLIC_SUPABASE_URL plus either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY for the Production environment, save, then trigger a new deployment (Redeploy).";

export function getSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
}
