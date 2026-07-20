/** Official contact email — used across support, privacy, and AdSense trust pages. */
export const SUPPORT_EMAIL = "shirwellentertainment@gmail.com";

export const BUSINESS_NAME = "Shirwell Entertainment";

/** Public business location for contact / publisher trust signals. */
export const BUSINESS_LOCATION = "New South Wales, Australia";

export function supportMailto(subject?: string): string {
  if (!subject) return `mailto:${SUPPORT_EMAIL}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
