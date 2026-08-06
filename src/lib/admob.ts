/**
 * Google AdMob — **native iOS/Android apps only** (not this Next.js website).
 *
 * Website ads use AdSense (`src/config/ads.ts`). AdMob IDs below are for the Shirwell
 * mobile app (or a future Capacitor/React Native wrapper).
 *
 * @see https://github.com/capacitor-community/admob
 * @see https://developers.google.com/admob/android/quick-start
 * @see https://developers.google.com/admob/ios/quick-start
 *
 * Web verification: `/app-ads.txt` on your developer website (already deployed).
 * Native UMP SDK: see docs/admob-ump-native.md
 */

export const ADMOB_WEB_NOTE =
  "Use AdSense on web; use these AdMob IDs in the native iOS/Android app only.";

/** AdMob app ID — from AdMob → Apps → App settings. */
export const DEFAULT_ADMOB_APP_ID = "ca-app-pub-2495432679632375~1624956947";

/** Banner ad unit — from AdMob → Ad units. */
export const DEFAULT_ADMOB_BANNER_AD_UNIT_ID =
  "ca-app-pub-2495432679632375/5537125026";

export const ADMOB_APP_ID =
  process.env.ADMOB_APP_ID?.trim() || DEFAULT_ADMOB_APP_ID;

export const ADMOB_BANNER_AD_UNIT_ID =
  process.env.ADMOB_BANNER_AD_UNIT_ID?.trim() ||
  process.env.ADMOB_AD_UNIT_ID?.trim() ||
  DEFAULT_ADMOB_BANNER_AD_UNIT_ID;

/** @deprecated Prefer ADMOB_BANNER_AD_UNIT_ID */
export const ADMOB_AD_UNIT_ID = ADMOB_BANNER_AD_UNIT_ID;

export const ADMOB_APP_OPEN_AD_UNIT_ID =
  process.env.ADMOB_APP_OPEN_AD_UNIT_ID?.trim() ?? "";

export function isAdmobConfigured(): boolean {
  return Boolean(
    ADMOB_APP_ID &&
      ADMOB_APP_ID.includes("~") &&
      (ADMOB_BANNER_AD_UNIT_ID || ADMOB_APP_OPEN_AD_UNIT_ID),
  );
}

/** Copy-paste blocks for native project setup. */
export const ADMOB_NATIVE_SETUP = {
  ios: {
    infoPlistKey: "GADApplicationIdentifier",
    infoPlistValue: ADMOB_APP_ID,
    bannerAdUnitId: ADMOB_BANNER_AD_UNIT_ID,
  },
  android: {
    manifestMetaDataName: "com.google.android.gms.ads.APPLICATION_ID",
    manifestMetaDataValue: ADMOB_APP_ID,
    bannerAdUnitId: ADMOB_BANNER_AD_UNIT_ID,
  },
} as const;
