import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";

/**
 * Keeps Supabase Auth cookies fresh and forwards them on the response.
 * Without this, server `getUser()` can miss or drop sessions.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = getSupabaseUrl();
  const key = getSupabasePublicApiKey();
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
