/**
 * Google Ads conversion tag (gtag.js) — ID from Google Ads → Tools → Conversions.
 *
 * Env:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_PAGE_VIEW_SEND_TO=AW-XXXXXXXXX/YYYYYYYYYY
 */
export const GOOGLE_ADS_CONVERSION_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-17677751901";

/** Page view conversion — Google Ads → Conversions → Page view event snippet. */
export const GOOGLE_ADS_PAGE_VIEW_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGE_VIEW_SEND_TO?.trim() ||
  "AW-17677751901/Mu5ZCOaWsNIcEN2stO1B";

export const GOOGLE_ADS_PAGE_VIEW_VALUE = 1.0;
export const GOOGLE_ADS_PAGE_VIEW_CURRENCY = "AUD";

export function isGoogleAdsConfigured(): boolean {
  return Boolean(
    GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CONVERSION_ID.startsWith("AW-"),
  );
}

export function isGoogleAdsPageViewConversionConfigured(): boolean {
  return Boolean(
    isGoogleAdsConfigured() &&
      GOOGLE_ADS_PAGE_VIEW_SEND_TO.includes("/"),
  );
}
