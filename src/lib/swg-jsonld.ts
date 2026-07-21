import {
  SWG_OPEN_ACCESS_PRODUCT_ID,
  SWG_PREMIUM_PRODUCT_ID,
} from "@/config/swg";
import type { NewsletterIssue } from "@/lib/newsletter-issues";
import { newsletterIssueDatePublished } from "@/lib/newsletter-issues";
import {
  absoluteUrl,
  SITE_LOGO_PATH,
  SITE_NAME,
} from "@/lib/seo";

/** Schema.org NewsArticle JSON-LD required for Reader Revenue Manager / SwG CMS sync. */
export function getNewsArticleJsonLd(
  issue: NewsletterIssue,
  path: string,
): Record<string, unknown> {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: issue.headline,
    description: issue.summary,
    datePublished: newsletterIssueDatePublished(issue.id),
    dateModified: newsletterIssueDatePublished(issue.id),
    image: [absoluteUrl(issue.src)],
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE_LOGO_PATH),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    isPartOf: {
      "@type": ["CreativeWork", "Product"],
      name: SITE_NAME,
      productID: SWG_OPEN_ACCESS_PRODUCT_ID,
    },
  };
}

/** Index page — lists open-access NewsArticle issues for the publication. */
export function getNewsletterIndexJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Newsletter`,
    description: "News, releases, and stories from Shirwell Bancan.",
    url: absoluteUrl("/newsletter"),
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    isPartOf: {
      "@type": ["CreativeWork", "Product"],
      name: SITE_NAME,
      productID: SWG_OPEN_ACCESS_PRODUCT_ID,
    },
  };
}

/** Premium offer page — paywalled product id for Subscribe with Google / RRM. */
export function getPremiumOfferJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_NAME} Premium`,
    description:
      "Unlimited streaming, early releases, and member perks for Shirwell Premium subscribers.",
    url: absoluteUrl("/premium"),
    inLanguage: "en-AU",
    isAccessibleForFree: false,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE_LOGO_PATH),
      },
    },
    isPartOf: {
      "@type": ["CreativeWork", "Product"],
      name: `${SITE_NAME} Premium`,
      productID: SWG_PREMIUM_PRODUCT_ID,
    },
  };
}
