import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/** Loads `adsbygoogle.js` once site-wide (required for AdSense). */
export function AdSenseScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
