import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { NewsletterPageContent } from "@/components/shirwell/newsletter-page-content";
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
    <div className="flex min-h-full flex-1 flex-col pb-28">
      <MarketingHeader />
      <NewsletterPageContent />
      <BottomNav />
    </div>
  );
}

