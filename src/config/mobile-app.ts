import { APP_NAME, PRODUCTION_SITE_URL } from "@/lib/seo";
import {
  ADMOB_ANDROID_BANNER_AD_UNIT_ID,
  ADMOB_APP_ID,
  ADMOB_IOS_BANNER_AD_UNIT_ID,
  getAdmobConsentRevocationUrl,
} from "@/lib/admob";

/** Store listing name (Play / App Store). */
export const MOBILE_APP_STORE_NAME = "Shirwell Music";

/** Must match Google OAuth consent screen app name. */
export const MOBILE_OAUTH_APP_NAME = APP_NAME;

/** Android applicationId / Play package name. */
export const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME?.trim() || "com.shirwell.music";

/** iOS bundle identifier. */
export const IOS_BUNDLE_ID =
  process.env.IOS_BUNDLE_ID?.trim() || "com.shirwell.music";

/** Custom URL scheme for OAuth deep links (Supabase redirect allow list). */
export const MOBILE_AUTH_SCHEME =
  process.env.MOBILE_AUTH_SCHEME?.trim() || "shirwell";

export const MOBILE_AUTH_CALLBACK_PATH = "auth/callback";

export function getMobileAuthCallbackUrl(): string {
  return `${MOBILE_AUTH_SCHEME}://${MOBILE_AUTH_CALLBACK_PATH}`;
}

/** Web OAuth callback (same Supabase project — add to Auth → URL Configuration). */
export function getWebAuthCallbackUrl(siteOrigin?: string): string {
  const base =
    siteOrigin?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    PRODUCTION_SITE_URL;
  return `${base}/auth/callback`;
}

export const MOBILE_PRIVACY_POLICY_URL =
  process.env.NEXT_PUBLIC_MOBILE_PRIVACY_URL?.trim() ||
  `${PRODUCTION_SITE_URL}/privacy`;

export const MOBILE_TERMS_URL =
  process.env.NEXT_PUBLIC_MOBILE_TERMS_URL?.trim() ||
  `${PRODUCTION_SITE_URL}/terms`;

export const MOBILE_HOME_URL =
  process.env.NEXT_PUBLIC_MOBILE_HOME_URL?.trim() ||
  `${PRODUCTION_SITE_URL}/home`;

/** Play Console / App Store — user-facing support email. */
export const MOBILE_SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "shirwellentertainment@gmail.com";

/** iOS App Tracking Transparency — required if AdMob uses IDFA for personalized ads. */
export const IOS_TRACKING_USAGE_DESCRIPTION =
  "Shirwell uses your device advertising identifier to show relevant ads and measure ad performance. You can change this anytime in Settings.";

/** Play Data safety / App Store privacy — advertising identifiers. */
export const MOBILE_DATA_TYPES = {
  advertisingId: {
    collected: true,
    sharedWithThirdParties: true,
    purpose: "Advertising and analytics (Google AdMob)",
    optional: false,
    platforms: ["android", "ios"] as const,
  },
  email: {
    collected: true,
    sharedWithThirdParties: false,
    purpose: "Account sign-in and support",
    optional: false,
    platforms: ["web", "android", "ios"] as const,
  },
} as const;

/** Copy for privacy policy — Advertising ID / IDFA. */
export const MOBILE_ADVERTISING_ID_DISCLOSURE = `The ${MOBILE_APP_STORE_NAME} app uses Google AdMob, which may access the Android Advertising ID (GAID) and, on iOS, the Identifier for Advertisers (IDFA) if you allow tracking. These identifiers help deliver and measure ads. You can limit ad tracking in your device settings (Android: Settings → Google → Ads; iOS: Settings → Privacy → Tracking).`;

/** AdMob + store IDs for native templates. */
export const MOBILE_ADMOB = {
  appId: ADMOB_APP_ID,
  androidBannerUnitId: ADMOB_ANDROID_BANNER_AD_UNIT_ID,
  iosBannerUnitId: ADMOB_IOS_BANNER_AD_UNIT_ID,
  consentRevocationUrl: getAdmobConsentRevocationUrl(),
} as const;

/** SHA-256 cert fingerprint for Android App Links (`assetlinks.json`). */
export const ANDROID_APP_LINK_SHA256 =
  process.env.ANDROID_APP_LINK_SHA256?.trim() || "";

export function isAndroidAppLinksConfigured(): boolean {
  return Boolean(ANDROID_PACKAGE_NAME && ANDROID_APP_LINK_SHA256);
}

/** Apple Developer Team ID — Universal Links (`apple-app-site-association`). */
export const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID?.trim() || "";

export function isAppleUniversalLinksConfigured(): boolean {
  return Boolean(IOS_BUNDLE_ID && APPLE_TEAM_ID);
}

/** Play Store / App Store listing URLs (set when apps are published). */
export const ANDROID_PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL?.trim() || "";

export const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_APPLE_APP_STORE_URL?.trim() || "";
