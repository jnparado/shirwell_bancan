import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Google AdSense site tag — same as AdSense console snippet:
 * `adsbygoogle.js?client=ca-pub-…` with async + crossorigin in `<head>`.
 */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <Script
      id="adsense-js"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      strategy="beforeInteractive"
      crossOrigin="anonymous"
    />
  );
}
