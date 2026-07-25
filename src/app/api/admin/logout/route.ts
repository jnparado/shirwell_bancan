import { NextResponse } from "next/server";
import { STATIC_ADMIN_COOKIE } from "@/config/static-admin";
import { staticAdminCookieOptions } from "@/lib/auth/static-admin";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(STATIC_ADMIN_COOKIE, "", { ...staticAdminCookieOptions(0), maxAge: 0 });
  return response;
}
