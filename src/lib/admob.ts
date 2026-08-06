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
 * Mobile Ads SDK install: see docs/google-mobile-ads-sdk-install.md
 */

export const ADMOB_WEB_NOTE =
  "Use AdSense on web; use these AdMob IDs in the native iOS/Android app only.";

/** AdMob app ID — from AdMob → Apps → App settings. */
export const DEFAULT_ADMOB_APP_ID = "ca-app-pub-2495432679632375~1624956947";

/** Banner ad unit — from AdMob → Ad units. */
export const DEFAULT_ADMOB_BANNER_AD_UNIT_ID =
  "ca-app-pub-2495432679632375/5537125026";

/** Ad unit for mediation / ad unit deployment (AdMob console). */
export const DEFAULT_ADMOB_MEDIATION_AD_UNIT_ID =
  "ca-app-pub-2495432679632375/4899465892";

/**
 * Latest Google Mobile Ads SDK versions for native apps (AdMob ad unit deployment).
 * Update when AdMob console prompts for a newer SDK.
 * @see docs/google-mobile-ads-sdk-install.md
 */
export const GOOGLE_MOBILE_ADS_SDK = {
  android: {
    playServicesAds: "25.4.0",
    userMessagingPlatform: "3.2.0",
  },
  ios: {
    googleMobileAdsSdk: "13.7.0",
  },
} as const;

/** Gradle dependencies block for Android app module. */
export const ANDROID_ADMOB_GRADLE_DEPENDENCIES = `implementation 'com.google.android.gms:play-services-ads:${GOOGLE_MOBILE_ADS_SDK.android.playServicesAds}'
implementation 'com.google.android.ump:user-messaging-platform:${GOOGLE_MOBILE_ADS_SDK.android.userMessagingPlatform}'`;

/** CocoaPods lines for iOS. */
export const IOS_ADMOB_PODFILE_LINES = `pod 'Google-Mobile-Ads-SDK', '~> ${GOOGLE_MOBILE_ADS_SDK.ios.googleMobileAdsSdk}'
pod 'GoogleUserMessagingPlatform'`;

export const ADMOB_APP_ID =
  process.env.ADMOB_APP_ID?.trim() || DEFAULT_ADMOB_APP_ID;

export const ADMOB_BANNER_AD_UNIT_ID =
  process.env.ADMOB_BANNER_AD_UNIT_ID?.trim() ||
  process.env.ADMOB_AD_UNIT_ID?.trim() ||
  DEFAULT_ADMOB_BANNER_AD_UNIT_ID;

/** Map this ID on third-party mediation platforms (AdMob → Implementation instructions). */
export const ADMOB_MEDIATION_AD_UNIT_ID =
  process.env.ADMOB_MEDIATION_AD_UNIT_ID?.trim() ||
  DEFAULT_ADMOB_MEDIATION_AD_UNIT_ID;

/** @deprecated Prefer ADMOB_BANNER_AD_UNIT_ID */
export const ADMOB_AD_UNIT_ID = ADMOB_BANNER_AD_UNIT_ID;

export const ADMOB_APP_OPEN_AD_UNIT_ID =
  process.env.ADMOB_APP_OPEN_AD_UNIT_ID?.trim() ?? "";

export function isAdmobConfigured(): boolean {
  return Boolean(
    ADMOB_APP_ID &&
      ADMOB_APP_ID.includes("~") &&
      (ADMOB_BANNER_AD_UNIT_ID ||
        ADMOB_MEDIATION_AD_UNIT_ID ||
        ADMOB_APP_OPEN_AD_UNIT_ID),
  );
}

/** Web URL for AdMob “revocation link” (Privacy & messaging → ad unit deployment). */
export { ADMOB_CONSENT_REVOCATION_PATH, getAdmobConsentRevocationUrl } from "@/config/google-consent";

/** Copy-paste blocks for native project setup. */
export const ADMOB_NATIVE_SETUP = {
  ios: {
    infoPlistKey: "GADApplicationIdentifier",
    infoPlistValue: ADMOB_APP_ID,
    bannerAdUnitId: ADMOB_BANNER_AD_UNIT_ID,
    mediationAdUnitId: ADMOB_MEDIATION_AD_UNIT_ID,
    podfileLines: IOS_ADMOB_PODFILE_LINES,
    sdk: GOOGLE_MOBILE_ADS_SDK.ios,
  },
  android: {
    manifestMetaDataName: "com.google.android.gms.ads.APPLICATION_ID",
    manifestMetaDataValue: ADMOB_APP_ID,
    bannerAdUnitId: ADMOB_BANNER_AD_UNIT_ID,
    mediationAdUnitId: ADMOB_MEDIATION_AD_UNIT_ID,
    gradleDependencies: ANDROID_ADMOB_GRADLE_DEPENDENCIES,
    sdk: GOOGLE_MOBILE_ADS_SDK.android,
  },
} as const;
