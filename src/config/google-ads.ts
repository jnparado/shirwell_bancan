/**
 * Google Ads conversion tag (gtag.js) — ID from Google Ads → Tools → Conversions.
 *
 * Env: NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
 */
export const GOOGLE_ADS_CONVERSION_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-17677751901";

export function isGoogleAdsConfigured(): boolean {
  return Boolean(
    GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CONVERSION_ID.startsWith("AW-"),
  );
}
