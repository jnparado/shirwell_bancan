declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const ADSENSE_LOADED_EVENT = "shirwell:adsense-loaded";

const RETRY_DELAYS_MS = [400, 1200, 3000, 6000, 12000];

/** Fired when the AdSense library finishes loading. */
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

/** Push once for every `<ins.adsbygoogle>` that has not been filled yet. */
export function fillUnfilledAdSlots(root: ParentNode = document): number {
  if (typeof window === "undefined" || !isAdSenseScriptReady()) return 0;

  const slots = root.querySelectorAll<HTMLElement>(
    "ins.adsbygoogle:not([data-ad-status])",
  );

  let filled = 0;
  slots.forEach((ins) => {
    if (ins.dataset.adFilled === "1") return;
    pushAdSlot();
    ins.dataset.adFilled = "1";
    filled += 1;
  });

  return filled;
}

/** Schedule several fill attempts — helps slow networks and post-hydration routes. */
export function scheduleAdFillRetries(
  fill: () => void,
  delaysMs: number[] = RETRY_DELAYS_MS,
): () => void {
  if (typeof window === "undefined") return () => {};

  const timers = delaysMs.map((delay) => window.setTimeout(fill, delay));
  return () => {
    timers.forEach((id) => window.clearTimeout(id));
  };
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
    } else if (attempts >= 80) {
      window.clearInterval(poll);
    }
  }, 150);

  const observer = new MutationObserver(() => {
    if (isAdSenseScriptReady()) {
      observer.disconnect();
      run();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  return () => {
    cancelled = true;
    window.clearInterval(poll);
    observer.disconnect();
    window.removeEventListener(ADSENSE_LOADED_EVENT, run);
  };
}

/** Attach onLoad when the head script is added dynamically (fallback). */
export function watchAdSenseScriptTag(): () => void {
  if (typeof window === "undefined") return () => {};

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
  );
  if (existing) {
    if (existing.dataset.loaded === "1" || isAdSenseScriptReady()) {
      notifyAdSenseLoaded();
    } else {
      existing.addEventListener(
        "load",
        () => {
          existing.dataset.loaded = "1";
          notifyAdSenseLoaded();
        },
        { once: true },
      );
    }
  }

  return () => {};
}
