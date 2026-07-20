declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const ADSENSE_LOADED_EVENT = "shirwell:adsense-loaded";

/** Fired from the AdSense script `onLoad` handler. */
export function notifyAdSenseLoaded(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ADSENSE_LOADED_EVENT));
}

export function isAdSenseScriptReady(): boolean {
  return typeof window !== "undefined" && Array.isArray(window.adsbygoogle);
}

export function pushAdSlot(): void {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    /* AdSense throws if called twice on the same slot */
  }
}

/**
 * Run `fill` once the AdSense script is available (handles race on first paint).
 * Returns a cleanup function.
 */
export function whenAdSenseReady(fill: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (isAdSenseScriptReady()) {
    fill();
    return () => {};
  }

  let cancelled = false;
  const run = () => {
    if (!cancelled) fill();
  };

  window.addEventListener(ADSENSE_LOADED_EVENT, run, { once: true });

  let attempts = 0;
  const poll = window.setInterval(() => {
    attempts += 1;
    if (isAdSenseScriptReady()) {
      window.clearInterval(poll);
      run();
    } else if (attempts >= 40) {
      window.clearInterval(poll);
    }
  }, 150);

  return () => {
    cancelled = true;
    window.clearInterval(poll);
    window.removeEventListener(ADSENSE_LOADED_EVENT, run);
  };
}
