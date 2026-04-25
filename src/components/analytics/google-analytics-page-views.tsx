"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsConfigured } from "@/config/analytics";

function GoogleAnalyticsPageViewsInner() {
  const pathname = usePathname();
  const isFirstPath = useRef(true);

  useEffect(() => {
    const gtag = window.gtag;
    if (typeof gtag !== "function") return;
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    gtag("config", GA_MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}

/** Client-side route changes only (first page_view from gtag snippet in `<head>`). */
export function GoogleAnalyticsPageViews() {
  if (!isGoogleAnalyticsConfigured()) {
    return null;
  }
  return <GoogleAnalyticsPageViewsInner />;
}
