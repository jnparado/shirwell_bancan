"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOT_BANNER,
  isAdsenseConfigured,
} from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdSenseUnitProps {
  /** Defaults to `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` */
  slot?: string;
  className?: string;
  format?: AdFormat;
  minHeight?: number;
}

/**
 * Responsive display unit. Set `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` or pass `slot`.
 */
export function AdSenseUnit({
  slot: slotProp,
  className = "",
  format = "auto",
  minHeight = 100,
}: AdSenseUnitProps) {
  const slot = slotProp ?? ADSENSE_SLOT_BANNER;
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || !isAdsenseConfigured()) return;
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [slot]);

  if (!isAdsenseConfigured() || !slot) return null;

  return (
    <div
      className={`mx-auto w-full max-w-4xl overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
