import {
  GOOGLE_CONSENT_READY_EVENT,
  isGoogleUmpWebEnabled,
} from "@/config/google-consent";

declare global {
  interface Window {
    __shirwellGoogleConsentReady?: boolean;
    __shirwellMarkConsentReady?: () => void;
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void>>;
    };
  }
}

export function isGoogleConsentReady(): boolean {
  if (typeof window === "undefined") return false;
  if (!isGoogleUmpWebEnabled()) return true;
  return Boolean(window.__shirwellGoogleConsentReady);
}

/** Wait for Funding Choices CONSENT_DATA_READY (or fallback timeout from head script). */
export function whenGoogleConsentReady(onReady: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (!isGoogleUmpWebEnabled() || isGoogleConsentReady()) {
    onReady();
    return () => {};
  }

  let cancelled = false;
  const run = () => {
    if (!cancelled && isGoogleConsentReady()) onReady();
  };

  window.addEventListener(GOOGLE_CONSENT_READY_EVENT, run);

  const poll = window.setInterval(() => {
    if (isGoogleConsentReady()) {
      window.clearInterval(poll);
      run();
    }
  }, 200);

  return () => {
    cancelled = true;
    window.clearInterval(poll);
    window.removeEventListener(GOOGLE_CONSENT_READY_EVENT, run);
  };
}
