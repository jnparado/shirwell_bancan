/**
 * Google AdMob — **not used in this Next.js web app.**
 *
 * AdMob serves **native** iOS/Android apps (and some hybrid WebViews with the Mobile Ads SDK).
 * For traffic in **Safari, Chrome, in-app browsers**, use **AdSense** (`src/config/ads.ts`).
 *
 * If you ship a Capacitor / React Native shell around this site, add AdMob there, e.g.:
 *   • https://github.com/capacitor-community/admob
 *   • Flutter: google_mobile_ads
 *
 * Keep AdMob app IDs and SDK keys **out** of `NEXT_PUBLIC_*` unless you truly need them in client JS.
 */

export const ADMOB_WEB_NOTE =
  "Use AdSense on web; add AdMob only in a native or Capacitor client.";

/**
 * Store your AdMob identifiers here for the native wrapper to consume (Android/iOS).
 * These are not secrets, but we still avoid exposing them to client JS by default.
 */
export const ADMOB_APP_ID = process.env.ADMOB_APP_ID ?? "";

/** Example: ca-app-pub-XXXXXXXXXXXXXXX/NNNNNNNNNN */
export const ADMOB_APP_OPEN_AD_UNIT_ID =
  process.env.ADMOB_APP_OPEN_AD_UNIT_ID ?? "";

/** Example: ca-app-pub-XXXXXXXXXXXXXXX/NNNNNNNNNN */
export const ADMOB_AD_UNIT_ID = process.env.ADMOB_AD_UNIT_ID ?? "";

export function isAdmobConfigured(): boolean {
  return Boolean(ADMOB_APP_ID && (ADMOB_APP_OPEN_AD_UNIT_ID || ADMOB_AD_UNIT_ID));
}
