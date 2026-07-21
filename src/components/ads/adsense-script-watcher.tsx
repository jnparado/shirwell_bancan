"use client";

import { useEffect } from "react";
import { notifyAdSenseLoaded, watchAdSenseScriptTag } from "@/lib/adsense-runtime";

/** Bridges head `<script>` load events to ad unit fill logic. */
export function AdSenseScriptWatcher() {
  useEffect(() => {
    const cleanup = watchAdSenseScriptTag();
    // Script may already be complete before this effect runs.
    notifyAdSenseLoaded();
    return cleanup;
  }, []);

  return null;
}
