"use client";

import { useEffect } from "react";
import { notifyAdSenseLoaded, watchAdSenseScriptTag, isAdSenseScriptReady } from "@/lib/adsense-runtime";

/** Bridges head `<script>` load events to ad unit fill logic. */
export function AdSenseScriptWatcher() {
  useEffect(() => {
    const cleanup = watchAdSenseScriptTag();
    if (isAdSenseScriptReady()) {
      notifyAdSenseLoaded();
    }
    return cleanup;
  }, []);

  return null;
}
