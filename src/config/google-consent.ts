import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Google Privacy & messaging (web) — Funding Choices + Consent Mode v2.
 * Native iOS/Android apps use the UMP SDK (see docs/admob-ump-native.md).
 *
 * Create your EU message: AdSense → Privacy & messaging → European regulations.
 */

export const GOOGLE_CONSENT_READY_EVENT = "shirwell:google-consent-ready";

/** Numeric publisher id (from ca-pub-2495432679632375). */
export function getGooglePublisherId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_PUBLISHER_ID?.trim();
  if (fromEnv) return fromEnv;
  return ADSENSE_CLIENT_ID.replace(/^ca-pub-/i, "");
}

/** Web UMP / Funding Choices — on by default when AdSense is configured. */
export function isGoogleUmpWebEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_GOOGLE_UMP_ENABLED?.trim();
  if (flag === "false" || flag === "0") return false;
  return isAdsenseConfigured() && getGooglePublisherId().length > 0;
}

export function getFundingChoicesScriptUrl(): string {
  return `https://fundingchoicesmessages.google.com/i/pub-${getGooglePublisherId()}?ers=1`;
}

/** Path for consent revocation page (AdMob / Funding Choices). */
export const ADMOB_CONSENT_REVOCATION_PATH = "/privacy/cookie-settings";

export function getAdmobConsentRevocationUrl(siteOrigin?: string): string {
  const base =
    siteOrigin?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    "https://shirwell-bancan.vercel.app";
  return `${base}${ADMOB_CONSENT_REVOCATION_PATH}`;
}
