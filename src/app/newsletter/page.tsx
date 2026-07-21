import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { NewsletterPageContent } from "@/components/shirwell/newsletter-page-content";
import { getNewsletterIndexJsonLd } from "@/lib/swg-jsonld";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Newsletter",
  description: `Shirwell Newsletter — updates, stories, and announcements from ${SITE_NAME}.`,
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: `Newsletter | ${SITE_NAME}`,
    description: `Read newsletter issues from ${SITE_NAME}.`,
    url: "/newsletter",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getNewsletterIndexJsonLd()),
        }}
      />
      <div className="page-shell">
        <MarketingHeader />
        <NewsletterPageContent />
        <BottomNav />
      </div>
    </>
  );
}
