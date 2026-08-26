"use client";

import { useEffect } from "react";
import { notifyAdSenseLoaded, watchAdSenseScriptTag, isAdSenseScriptReady } from "@/lib/adsense-runtime";

/**
 * Watches the head `<script>` (AdSenseHeadScript) and notifies the runtime
 * when adsbygoogle.js is ready. Does not inject a second copy of the library.
 */
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
