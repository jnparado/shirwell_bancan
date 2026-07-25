import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";
import {
  STATIC_ADMIN_COOKIE,
  STATIC_ADMIN_EMAIL,
  STATIC_ADMIN_SESSION,
} from "@/config/static-admin";

export { STATIC_ADMIN_SESSION };

export const STATIC_ADMIN_USER = {
  id: "00000000-0000-0000-0000-000000000001",
  aud: "authenticated",
  role: "authenticated",
  email: STATIC_ADMIN_EMAIL,
  created_at: new Date(0).toISOString(),
  user_metadata: { full_name: "Admin" },
  app_metadata: { provider: "static", providers: ["static"] },
} as User;

export async function hasStaticAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(STATIC_ADMIN_COOKIE)?.value === STATIC_ADMIN_SESSION;
}

export function staticAdminCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
