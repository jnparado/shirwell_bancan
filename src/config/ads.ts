/**
 * Google AdSense (this Next.js site — web, including mobile browsers)
 *
 * Env:
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 *   NEXT_PUBLIC_ADSENSE_SLOT_ENTERPRISES=1200415498   (Enterprises display unit)
 *   NEXT_PUBLIC_ADSENSE_SLOT_BOX=1844130903   (360×300 display unit)
 *   NEXT_PUBLIC_ADSENSE_SLOT_BANNER=1234567890   (optional override)
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

/** Primary display slot from env — other units fall back to this when unset. */
export const ADSENSE_SLOT_BANNER =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER?.trim() || "";

/** Display unit — full-width responsive (Enterprises-style). */
export const ADSENSE_SLOT_ENTERPRISES =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_ENTERPRISES?.trim() ||
  ADSENSE_SLOT_BANNER ||
  "1200415498";

/** Fixed 360×300 display unit. */
export const ADSENSE_SLOT_BOX =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX_AD?.trim() ||
  ADSENSE_SLOT_BANNER ||
  "1844130903";

export const ADSENSE_BOX_WIDTH = 360;
export const ADSENSE_BOX_HEIGHT = 300;

export function isAdsenseConfigured(): boolean {
  return Boolean(
    ADSENSE_CLIENT_ID &&
      ADSENSE_CLIENT_ID.startsWith("ca-pub-") &&
      ADSENSE_CLIENT_ID.length > 12
  );
}

export function isAdsenseUnitConfigured(): boolean {
  return (
    isAdsenseConfigured() &&
    Boolean(ADSENSE_SLOT_BANNER || ADSENSE_SLOT_ENTERPRISES || ADSENSE_SLOT_BOX)
  );
}

/** Test ads in dev, when NEXT_PUBLIC_ADSENSE_TEST=true, or until the site is approved in AdSense. */
export function isAdsenseSiteApproved(): boolean {
  return process.env.NEXT_PUBLIC_ADSENSE_APPROVED?.trim() === "true";
}

export function isAdsenseTestMode(): boolean {
  const testFlag = process.env.NEXT_PUBLIC_ADSENSE_TEST?.trim();
  if (testFlag === "true") return true;
  if (testFlag === "false") return false;
  if (!isAdsenseSiteApproved()) return true;
  return process.env.NODE_ENV === "development";
}

/**
 * AdSense Program Policies: do not serve ads on screens without publisher content,
 * under construction, or used mainly for navigation / alerts / auth.
 * @see https://support.google.com/adsense/answer/1346295
 */
const ADSENSE_ALLOWED_EXACT = new Set([
  "/",
  "/home",
  "/music",
  "/about",
  "/discography",
  "/faq",
  "/music-owner",
  "/products",
  "/cds",
  "/flowers",
  "/flower",
  "/newsletter",
  "/search",
]);

/** Content sections under these paths may show ads (e.g. /products/honey, /newsletter/2024-05-22). */
const ADSENSE_ALLOWED_PREFIXES = ["/newsletter", "/products"];

export function normalizePathname(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function isAdSenseAllowedPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (ADSENSE_ALLOWED_EXACT.has(path)) return true;
  return ADSENSE_ALLOWED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
