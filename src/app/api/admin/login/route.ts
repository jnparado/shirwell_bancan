import { NextResponse } from "next/server";
import { isStaticAdminCredential, STATIC_ADMIN_COOKIE } from "@/config/static-admin";
import {
  staticAdminCookieOptions,
  STATIC_ADMIN_SESSION,
} from "@/lib/auth/static-admin";

export async function POST(request: Request) {
  let email = "";
  let password = "";

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isStaticAdminCredential(email, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STATIC_ADMIN_COOKIE, STATIC_ADMIN_SESSION, staticAdminCookieOptions());
  return response;
}
