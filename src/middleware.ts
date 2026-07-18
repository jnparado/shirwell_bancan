import { NextResponse, type NextRequest } from "next/server";

/** Return HTTP 501 when OAuth consent is opened without authorization_id. */
function isMissingOAuthAuthorizationId(request: NextRequest): boolean {
  if (request.nextUrl.pathname !== "/oauth/consent") return false;
  return !request.nextUrl.searchParams.get("authorization_id")?.trim();
}

export function middleware(request: NextRequest) {
  if (!isMissingOAuthAuthorizationId(request)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.status = 501;
  return response;
}

export const config = {
  matcher: ["/oauth/consent"],
};
