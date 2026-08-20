"use client";

import { useEffect } from "react";
import { initAdMobNativePaidAds } from "@/lib/admob-capacitor";

/**
 * Loads paid AdMob display ads in the Capacitor iOS/Android shell.
 * No-op in normal mobile/desktop browsers (AdSense handles web).
 */
export function AdMobNativeProvider() {
  useEffect(() => {
    void initAdMobNativePaidAds();
  }, []);

  return null;
}
