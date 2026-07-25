/**
 * TEMPORARY static admin login — remove before production launch.
 * Replace with Supabase role-based admin (`profiles.role = 'admin'`).
 */
export const STATIC_ADMIN_EMAIL = "admin@gmail.com";
export const STATIC_ADMIN_PASSWORD = "12345";

export const STATIC_ADMIN_COOKIE = "shirwell_static_admin";
export const STATIC_ADMIN_SESSION = "static-admin-session-v1";

export function isStaticAdminCredential(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === STATIC_ADMIN_EMAIL.toLowerCase() &&
    password === STATIC_ADMIN_PASSWORD
  );
}
