import { NextResponse, type NextRequest } from "next/server";
import { isSiteDown, siteDownHtml } from "@/lib/site-down";

function bypassSiteDown(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png"
  );
}

/** Return HTTP 501 when OAuth consent is opened without authorization_id. */
function isMissingOAuthAuthorizationId(request: NextRequest): boolean {
  if (request.nextUrl.pathname !== "/oauth/consent") return false;
  return !request.nextUrl.searchParams.get("authorization_id")?.trim();
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isSiteDown() && !bypassSiteDown(pathname)) {
    return new NextResponse(siteDownHtml(), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Retry-After": "3600",
      },
    });
  }

  if (!isMissingOAuthAuthorizationId(request)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.status = 501;
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image).*)",
  ],
};
