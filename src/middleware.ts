import { NextResponse, type NextRequest } from "next/server";

/** Paths crawlers must reach without any auth logic. */
function isCrawlerPublicPath(pathname: string): boolean {
  return (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/app-ads.txt" ||
    pathname.startsWith("/googled") ||
    pathname.endsWith(".html")
  );
}

/** Only refresh Supabase sessions on routes that need auth. */
function needsSessionRefresh(pathname: string): boolean {
  return (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/oauth") ||
    pathname.startsWith("/api/")
  );
}

/**
 * Sets `x-pathname` for the root layout (AdSense path checks).
 * Supabase session refresh runs only on auth-related routes so public pages
 * never hit Edge Realtime/WebSocket issues (MIDDLEWARE_INVOCATION_FAILED).
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    let response = NextResponse.next({ request });
    response.headers.set("x-pathname", pathname);

    if (isCrawlerPublicPath(pathname) || !needsSessionRefresh(pathname)) {
      return response;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
    if (!url || !key) return response;

    const { createServerClient } = await import("@supabase/ssr");
    const { supabaseEdgeClientOptions } = await import(
      "@/lib/supabase/edge-client-options"
    );

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
    response.headers.set("x-pathname", pathname);
    return response;
  } catch (error) {
    console.error("[middleware] failed:", error);
    const response = NextResponse.next({ request });
    response.headers.set("x-pathname", pathname);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|html|xml|txt|webmanifest)$).*)",
  ],
};
