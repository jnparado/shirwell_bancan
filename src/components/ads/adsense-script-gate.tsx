"use client";

import { usePathname } from "next/navigation";
import { isAdSenseAllowedPath } from "@/config/ads";
import { AdSenseScript } from "./adsense-script";

/** Loads AdSense only on allowed marketing pages (uses client pathname — no middleware). */
export function AdSenseScriptGate() {
  const pathname = usePathname();
  if (!isAdSenseAllowedPath(pathname)) return null;
  return <AdSenseScript />;
}
