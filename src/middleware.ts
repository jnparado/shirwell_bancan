import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseEdgeClientOptions } from "@/lib/supabase/edge-client-options";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";

/**
 * Keeps Supabase Auth cookies fresh and forwards them on the response.
 * Without this, server `getUser()` can miss or drop sessions.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next({ request });
  response.headers.set("x-pathname", pathname);

  try {
    const url = getSupabaseUrl();
    const key = getSupabasePublicApiKey();
    if (!url || !key) return response;

    const supabase = createServerClient(url, key, {
      ...supabaseEdgeClientOptions,
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          response.headers.set("x-pathname", pathname);
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.getUser();
  } catch (error) {
    console.error("[middleware] Supabase session refresh failed:", error);
  }

  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
