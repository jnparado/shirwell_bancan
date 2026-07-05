/**
 * Google AdSense (this Next.js site — web, including mobile browsers)
 *
 * Env:
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 *   NEXT_PUBLIC_ADSENSE_SLOT_BANNER=1234567890   (optional; display ad unit slot ID)
 *
 * Create units in AdSense → Ads → By ad unit → Display. Approve your site first.
 *
 * ---
 * Google AdMob is for native iOS/Android apps (or WebView shells with the Mobile Ads SDK).
 * It does not run inside a normal Next.js page. Options:
 *   • Use AdSense here for all web traffic (including phone browsers).
 *   • If you wrap this site in Capacitor/React Native, add @capacitor-community/admob
 *     or the native AdMob SDK there — separate from this codebase.
 */

/** Shirwell Bancan publisher id — public in the AdSense snippet. */
export const DEFAULT_ADSENSE_CLIENT_ID = "ca-pub-2495432679632375";

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || DEFAULT_ADSENSE_CLIENT_ID;

export const ADSENSE_SLOT_BANNER =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER ?? "";

export function isAdsenseConfigured(): boolean {
  return Boolean(
    ADSENSE_CLIENT_ID &&
      ADSENSE_CLIENT_ID.startsWith("ca-pub-") &&
      ADSENSE_CLIENT_ID.length > 12
  );
}

export function isAdsenseUnitConfigured(): boolean {
  return isAdsenseConfigured() && ADSENSE_SLOT_BANNER.length > 0;
}

/**
 * AdSense Program Policies: do not serve ads on screens without publisher content,
 * under construction, or used mainly for navigation / alerts / auth.
 * @see https://support.google.com/adsense/answer/1346295
 */
const ADSENSE_ALLOWED_PATHS = new Set([
  "/",
  "/home",
  "/music",
  "/flowers",
  "/flower",
  "/newsletter",
  "/cds",
]);

export function normalizePathname(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function isAdSenseAllowedPath(pathname: string): boolean {
  return ADSENSE_ALLOWED_PATHS.has(normalizePathname(pathname));
}
