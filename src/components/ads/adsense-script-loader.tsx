"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";
import { notifyAdSenseLoaded } from "@/lib/adsense-runtime";

/**
 * Loads the AdSense library once site-wide. Ad *units* are still gated to content
 * paths — this ensures the script is ready after client navigations from /auth, etc.
 */
export function AdSenseScriptLoader() {
  if (!isAdsenseConfigured()) return null;

  return (
    <Script
      id="adsense-by-google"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={notifyAdSenseLoaded}
    />
  );
}
