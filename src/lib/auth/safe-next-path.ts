/**
 * After email or OAuth sign-in, only allow in-app relative paths (no open redirects).
 */
export function safeNextPath(raw: string | null | undefined): string {
  if (raw == null) return "/";
  const v = raw.trim();
  if (v === "") return "/";
  try {
    const decoded = decodeURIComponent(v);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return "/";
    if (decoded.includes("://")) return "/";
    return decoded;
  } catch {
    return "/";
  }
}
