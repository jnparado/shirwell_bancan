/** Opens Google Funding Choices consent again (EEA/UK/CH). */
export function showGoogleConsentRevocation(): void {
  if (typeof window === "undefined") return;

  type GoogleFc = {
    callbackQueue?: Array<(() => void) | Record<string, () => void>>;
    showRevocationMessage?: () => void;
  };

  const fc = (window as Window & { googlefc?: GoogleFc }).googlefc;
  if (fc?.showRevocationMessage) {
    fc.callbackQueue = fc.callbackQueue || [];
    fc.callbackQueue.push(fc.showRevocationMessage);
    return;
  }

  fc?.callbackQueue?.push({
    CONSENT_API_READY: () => {
      fc.showRevocationMessage?.();
    },
  });
}
