import { NextResponse, type NextRequest } from "next/server";

/** OAuth consent without authorization_id → dedicated 501 error screen. */
function isMissingOAuthAuthorizationId(request: NextRequest): boolean {
  if (request.nextUrl.pathname !== "/oauth/consent") return false;
  return !request.nextUrl.searchParams.get("authorization_id")?.trim();
}

export function middleware(request: NextRequest) {
  if (!isMissingOAuthAuthorizationId(request)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/errors/501";
  url.searchParams.set("param", "authorization_id");
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/oauth/consent"],
};
