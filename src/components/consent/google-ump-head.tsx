import { isGoogleUmpWebEnabled } from "@/config/google-consent";

/** Consent + Funding Choices load via `ThirdPartyScripts` (client-only). */
export function GoogleUmpHead() {
  if (!isGoogleUmpWebEnabled()) return null;
  return null;
}
