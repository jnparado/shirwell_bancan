import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabasePublicApiKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

/**
 * Per-request Supabase client for Server Components / Route Handlers.
 * Reads the user session from cookies (same storage as `createBrowserClient` in the browser).
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient | null> {
  const url = getSupabaseUrl();
  const key = getSupabasePublicApiKey();
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          /* Server Components cannot always set cookies; middleware refreshes the session. */
        }
      },
    },
  });
}

/** Server-only client for trusted writes (webhooks, verified IAP sync). Never expose to the browser. */
export function createServiceRoleSupabaseClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
