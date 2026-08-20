import {
  ADSENSE_CLIENT_ID,
  isAdsenseConfigured,
  isAdsenseTestMode,
} from "@/config/ads";

/** AMP auto-ads library — AdSense → Auto ads for AMP. */
export const AMP_AUTO_ADS_SCRIPT =
  "https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js";

/** AMP manual ad unit — AdSense → Code generator → AMP. */
export const AMP_AD_SCRIPT = "https://cdn.ampproject.org/v0/amp-ad-0.1.js";

/** Responsive display unit from AdSense AMP code generator. */
export const DEFAULT_ADSENSE_AMP_SLOT = "1200415498";

export const ADSENSE_AMP_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_AMP?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_AMP_SLOT?.trim() ||
  DEFAULT_ADSENSE_AMP_SLOT;

export function isAmpAutoAdsEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ADSENSE_AMP_ENABLED?.trim()?.toLowerCase();
  if (flag === "false") return false;
  return isAdsenseConfigured();
}

export function getAmpAutoAdsClientId(): string {
  return ADSENSE_CLIENT_ID;
}

/** `<amp-auto-ads>` tag immediately after `<body>` (AdSense console snippet). */
export function getAmpAutoAdsBodyTag(clientId: string = getAmpAutoAdsClientId()): string {
  return `<amp-auto-ads type="adsense" data-ad-client="${escapeHtmlAttr(clientId)}"></amp-auto-ads>`;
}

/** Head script — load once per AMP document. */
export function getAmpAutoAdsHeadScript(): string {
  return `<script async custom-element="amp-auto-ads" src="${AMP_AUTO_ADS_SCRIPT}"></script>`;
}

export function isAmpDisplayAdEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ADSENSE_AMP_ENABLED?.trim()?.toLowerCase();
  if (flag === "false") return false;
  return isAdsenseConfigured() && Boolean(ADSENSE_AMP_SLOT);
}

/** Head script for manual `<amp-ad>` units — load once per AMP document. */
export function getAmpAdHeadScript(): string {
  return `<script async custom-element="amp-ad" src="${AMP_AD_SCRIPT}"></script>`;
}

/** Responsive AMP display unit (AdSense code generator snippet). */
export function getAmpDisplayAdUnit(
  clientId: string = getAmpAutoAdsClientId(),
  slot: string = ADSENSE_AMP_SLOT,
): string {
  const testAttr = isAdsenseTestMode() ? ' data-adtest="on"' : "";
  return `<amp-ad width="100vw" height="320"
     type="adsense"
     data-ad-client="${escapeHtmlAttr(clientId)}"
     data-ad-slot="${escapeHtmlAttr(slot)}"
     data-auto-format="rspv"
     data-full-width=""${testAttr}>
  <div overflow=""></div>
</amp-ad>`;
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
