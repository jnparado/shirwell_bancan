import { isMusicAppRoute, isMusicPlayerRoute } from "@/lib/music-app";

/** Routes that render the fixed bottom tab bar. */
export function hasBottomNav(pathname: string): boolean {
  if (isMusicPlayerRoute(pathname)) return false;
  if (pathname === "/auth/login" || pathname.startsWith("/auth/")) return false;
  if (pathname.startsWith("/oauth")) return false;
  return true;
}

export { isMusicAppRoute, isMusicPlayerRoute };
