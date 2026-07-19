"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  GOOGLE_ADS_PAGE_VIEW_CURRENCY,
  GOOGLE_ADS_PAGE_VIEW_SEND_TO,
  GOOGLE_ADS_PAGE_VIEW_VALUE,
  isGoogleAdsPageViewConversionConfigured,
} from "@/config/google-ads";

function firePageViewConversion() {
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "conversion", {
    send_to: GOOGLE_ADS_PAGE_VIEW_SEND_TO,
    value: GOOGLE_ADS_PAGE_VIEW_VALUE,
    currency: GOOGLE_ADS_PAGE_VIEW_CURRENCY,
  });
}

function GoogleAdsPageViewConversionInner() {
  const pathname = usePathname();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    firePageViewConversion();
  }, [pathname]);

  return null;
}

/** Fires page view conversion on client navigations (first load handled in `<head>`). */
export function GoogleAdsPageViewConversion() {
  if (!isGoogleAdsPageViewConversionConfigured()) return null;
  return <GoogleAdsPageViewConversionInner />;
}
