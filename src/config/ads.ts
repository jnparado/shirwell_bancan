/**
 * Google AdSense display ad slots (web).
 *
 * Create units in AdSense → Ads → By ad unit → **Display ads**.
 * Env (all optional — defaults use your live unit 4465041934):
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375
 *   NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY=4465041934      # responsive display
 *   NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=4465041934    # 300×250 rectangle
 *   NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL=4465041934   # horizontal banner
 *
 * Legacy env names (still supported): ADSENSE_SLOT_BANNER, _ENTERPRISES, _BOX
 */

/** Shirwell Bancan publisher id — public in the AdSense snippet. */
export const DEFAULT_ADSENSE_CLIENT_ID = "ca-pub-2495432679632375";

/** Default display ad unit from AdSense console. */
export const DEFAULT_ADSENSE_DISPLAY_SLOT = "4465041934";

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || DEFAULT_ADSENSE_CLIENT_ID;

const legacyBanner =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER_AD?.trim() ||
  "";

/** Full-width responsive display ad. */
export const ADSENSE_SLOT_DISPLAY =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY?.trim() ||
  legacyBanner ||
  DEFAULT_ADSENSE_DISPLAY_SLOT;

/** 300×250 medium rectangle display ad. */
export const ADSENSE_SLOT_RECTANGLE =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX_AD?.trim() ||
  legacyBanner ||
  DEFAULT_ADSENSE_DISPLAY_SLOT;

/** Horizontal display banner (leaderboard-style). */
export const ADSENSE_SLOT_HORIZONTAL =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_ENTERPRISES?.trim() ||
  legacyBanner ||
  DEFAULT_ADSENSE_DISPLAY_SLOT;

/** @deprecated Use ADSENSE_SLOT_DISPLAY */
export const ADSENSE_SLOT_BANNER = legacyBanner || ADSENSE_SLOT_DISPLAY;

/** @deprecated Use ADSENSE_SLOT_HORIZONTAL */
export const ADSENSE_SLOT_ENTERPRISES = ADSENSE_SLOT_HORIZONTAL;

/** @deprecated Use ADSENSE_SLOT_RECTANGLE */
export const ADSENSE_SLOT_BOX = ADSENSE_SLOT_RECTANGLE;

/** IAB medium rectangle — standard display size. */
export const ADSENSE_RECTANGLE_WIDTH = 300;
export const ADSENSE_RECTANGLE_HEIGHT = 250;

/** @deprecated Use ADSENSE_RECTANGLE_* */
export const ADSENSE_BOX_WIDTH = ADSENSE_RECTANGLE_WIDTH;
export const ADSENSE_BOX_HEIGHT = ADSENSE_RECTANGLE_HEIGHT;

export function isAdsenseConfigured(): boolean {
  return Boolean(
    ADSENSE_CLIENT_ID &&
      ADSENSE_CLIENT_ID.startsWith("ca-pub-") &&
      ADSENSE_CLIENT_ID.length > 12,
  );
}

export function isAdsenseUnitConfigured(): boolean {
  return (
    isAdsenseConfigured() &&
    Boolean(ADSENSE_SLOT_DISPLAY || ADSENSE_SLOT_RECTANGLE || ADSENSE_SLOT_HORIZONTAL)
  );
}

/** Test ads until AdSense approves the site (`NEXT_PUBLIC_ADSENSE_APPROVED=true`). */
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
 * AdSense Program Policies: do not serve ads on screens without publisher content.
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
