import {
  GOOGLE_CONSENT_READY_EVENT,
  isGoogleUmpWebEnabled,
} from "@/config/google-consent";
import { isGoogleConsentReady, whenGoogleConsentReady } from "@/lib/google-consent-runtime";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __shirwellGoogleConsentReady?: boolean;
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
    if (ins.dataset.adRequested === "1") return;
    pushAdSlot();
    ins.dataset.adRequested = "1";
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
 * Run `fill` once AdSense is loaded and (when enabled) Funding Choices consent is ready.
 */
export function whenAdSenseReady(fill: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  const tryFill = () => {
    if (cancelled) return;
    if (!isAdSenseScriptReady()) return;
    if (isGoogleUmpWebEnabled() && !isGoogleConsentReady()) return;
    fill();
  };

  const stopConsent = whenGoogleConsentReady(tryFill);

  if (isAdSenseScriptReady()) {
    tryFill();
  }

  const run = () => tryFill();

  window.addEventListener(ADSENSE_LOADED_EVENT, run, { once: true });
  window.addEventListener(GOOGLE_CONSENT_READY_EVENT, run);

  let attempts = 0;
  const poll = window.setInterval(() => {
    attempts += 1;
    tryFill();
    if (attempts >= 80) window.clearInterval(poll);
  }, 150);

  const observer = new MutationObserver(() => tryFill());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  return () => {
    cancelled = true;
    stopConsent();
    window.clearInterval(poll);
    observer.disconnect();
    window.removeEventListener(ADSENSE_LOADED_EVENT, run);
    window.removeEventListener(GOOGLE_CONSENT_READY_EVENT, run);
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
