import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Google-recommended async script in `<head>`.
 * `data-ad-client` enables Auto ads (anchor, vignette, side rail) when turned on in AdSense.
 */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <Script
      id="adsense-js"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      strategy="beforeInteractive"
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_CLIENT_ID}
    />
  );
}
