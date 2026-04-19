import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search",
  description: `Find music and content on ${SITE_NAME}. Search is expanding soon.`,
  alternates: { canonical: "/search" },
  openGraph: {
    title: `Search | ${SITE_NAME}`,
    description: `Find music and pages on ${SITE_NAME}.`,
    url: "/search",
  },
  robots: { index: true, follow: true },
};

export default function SearchPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-28">
      <MarketingHeader />
      <p className="mx-auto mt-12 max-w-6xl px-4 text-center text-zinc-400 sm:px-6">
        Search is coming soon.
      </p>
      <BottomNav />
    </div>
  );
}
