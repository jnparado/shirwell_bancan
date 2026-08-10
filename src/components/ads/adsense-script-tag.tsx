"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";
import { fillUnfilledAdSlots, notifyAdSenseLoaded } from "@/lib/adsense-runtime";

/** AdSense library — external `src` only (no inline body → no hydration mismatch). */
export function AdSenseScriptTag() {
  if (!isAdsenseConfigured()) return null;

  return (
    <Script
      id="adsense-lib"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        notifyAdSenseLoaded();
        fillUnfilledAdSlots(document);
      }}
      onError={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("shirwell:adsense-load-failed"));
        }
      }}
    />
  );
}
