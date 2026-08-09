import { GOOGLE_SITE_VERIFICATION_TOKEN } from "@/lib/seo";

/** Explicit `<meta>` for Search Console / AdSense crawlers (in addition to `metadata.verification`). */
export function GoogleSiteVerificationMeta() {
  if (!GOOGLE_SITE_VERIFICATION_TOKEN) return null;

  return (
    <meta
      name="google-site-verification"
      content={GOOGLE_SITE_VERIFICATION_TOKEN}
    />
  );
}
