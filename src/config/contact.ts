/** Official contact email — used across support, privacy, and AdSense trust pages. */
export const SUPPORT_EMAIL = "shirwellentertainment@gmail.com";

export const BUSINESS_NAME = "Shirwell Entertainment";

/** Public business location for contact / publisher trust signals. */
export const BUSINESS_LOCATION = "New South Wales, Australia";

/** Main public website — paste into Google Publisher Center “Your business's website”. */
export const BUSINESS_WEBSITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://shirwel.com";

/** Customer support page path — full URL is used in Publisher Center. */
export const SUPPORT_PAGE_PATH = "/support";

/**
 * Customer support phone (E.164), e.g. +61412345678.
 * Set NEXT_PUBLIC_SUPPORT_PHONE in Vercel for Google RRM / Merchant Center forms.
 */
export const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE?.trim() || "";

export function supportMailto(subject?: string): string {
  if (!subject) return `mailto:${SUPPORT_EMAIL}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function supportTelHref(): string | null {
  if (!SUPPORT_PHONE) return null;
  const digits = SUPPORT_PHONE.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

/** Human-readable AU-style phone for display, e.g. +61 412 345 678. */
export function formatSupportPhoneDisplay(phone: string = SUPPORT_PHONE): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned) return "";

  if (cleaned.startsWith("+61") && cleaned.length >= 11) {
    const rest = cleaned.slice(3);
    if (rest.length === 9) {
      return `+61 ${rest.slice(0, 1)} ${rest.slice(1, 5)} ${rest.slice(5)}`;
    }
  }

  return phone.trim();
}

export function hasSupportPhone(): boolean {
  return SUPPORT_PHONE.length >= 8;
}
