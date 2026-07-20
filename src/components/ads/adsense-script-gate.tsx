"use client";

import { usePathname } from "next/navigation";
import { AdSenseScript } from "./adsense-script";
import { isAdSenseAllowedPath } from "@/config/ads";

/** Loads AdSense script only on content pages (not auth, profile, legal, privacy). */
export function AdSenseScriptGate() {
  const pathname = usePathname();
  if (!isAdSenseAllowedPath(pathname)) return null;
  return <AdSenseScript />;
}
