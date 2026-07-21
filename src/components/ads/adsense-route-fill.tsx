"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAdSenseAllowedPath, isAdsenseConfigured } from "@/config/ads";
import { fillUnfilledAdSlots, whenAdSenseReady } from "@/lib/adsense-runtime";

/**
 * After navigation / hydration, call `(adsbygoogle).push({})` once per unfilled
 * `<ins class="adsbygoogle">` on the page. Required for Next.js client routing.
 */
export function AdSenseRouteFill() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdsenseConfigured() || !isAdSenseAllowedPath(pathname)) return;

    let rafId = 0;
    const stopReady = whenAdSenseReady(() => {
      rafId = window.requestAnimationFrame(() => {
        fillUnfilledAdSlots();
      });
    });

    return () => {
      stopReady();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
