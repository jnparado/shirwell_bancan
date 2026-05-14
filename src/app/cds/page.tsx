import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CD's",
  description: "CD's from Shirwell Bancan.",
  alternates: { canonical: "/cds" },
  openGraph: {
    title: `CD's | ${SITE_NAME}`,
    description: "CD's from Shirwell Bancan.",
    url: "/cds",
  },
};

export default function CdsPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          CD&apos;s
        </h1>
        <p className="mt-8 text-balance text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl md:text-4xl md:leading-tight">
          cDs vinyl records coffee from the jungles and other unique products on
          the premium be patient
        </p>
      </main>
      <BottomNav />
    </div>
  );
}

