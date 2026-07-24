"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAdSenseAllowedPath, isAdsenseConfigured } from "@/config/ads";
import {
  fillUnfilledAdSlots,
  scheduleAdFillRetries,
  whenAdSenseReady,
} from "@/lib/adsense-runtime";

/**
 * After navigation / hydration, call `(adsbygoogle).push({})` once per unfilled
 * `<ins class="adsbygoogle">` on the page. Required for Next.js client routing.
 */
export function AdSenseRouteFill() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdsenseConfigured() || !isAdSenseAllowedPath(pathname)) return;

    const fill = () => fillUnfilledAdSlots(document);

    let rafId = 0;
    const stopReady = whenAdSenseReady(() => {
      rafId = window.requestAnimationFrame(fill);
    });
    const stopRetries = scheduleAdFillRetries(fill);

    return () => {
      stopReady();
      stopRetries();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
