/** Routes that render the fixed bottom tab bar. */
export function hasBottomNav(pathname: string): boolean {
  if (pathname === "/music") return false;
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/auth/login" ||
    pathname.startsWith("/auth/")
  )
    return false;
  if (pathname.startsWith("/oauth")) return false;
  return true;
}
