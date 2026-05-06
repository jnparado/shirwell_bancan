/**
 * Google Tag Manager
 *
 * Env: NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

export function isGtmConfigured(): boolean {
  return Boolean(GTM_ID && GTM_ID.startsWith("GTM-"));
}

