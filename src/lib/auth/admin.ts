import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  hasStaticAdminSession,
  STATIC_ADMIN_USER,
} from "@/lib/auth/static-admin";

export const ADMIN_ROLES = new Set(["admin", "superadmin"]);

export function isAdminRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return ADMIN_ROLES.has(role.trim().toLowerCase());
}

export type AdminSession = {
  user: User;
  role: string;
  supabase: SupabaseClient | null;
  isStaticAdmin: boolean;
};

function adminLoginPath(nextPath: string): string {
  return `/admin/login?next=${encodeURIComponent(nextPath)}`;
}

/** Redirects to admin login when the current user is not an admin. */
export async function requireAdmin(nextPath = "/admin"): Promise<AdminSession> {
  if (await hasStaticAdminSession()) {
    return {
      user: STATIC_ADMIN_USER,
      role: "admin",
      supabase: await createServerSupabaseClient(),
      isStaticAdmin: true,
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect(adminLoginPath(nextPath));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(adminLoginPath(nextPath));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role?.trim() || "user";
  if (!isAdminRole(role)) {
    redirect(adminLoginPath(nextPath));
  }

  return { user, role, supabase, isStaticAdmin: false };
}

/** Used by /admin/login — skip redirect when already signed in. */
export async function getAdminSessionIfAny(): Promise<AdminSession | null> {
  if (await hasStaticAdminSession()) {
    return {
      user: STATIC_ADMIN_USER,
      role: "admin",
      supabase: await createServerSupabaseClient(),
      isStaticAdmin: true,
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role?.trim() || "user";
  if (!isAdminRole(role)) return null;

  return { user, role, supabase, isStaticAdmin: false };
}
