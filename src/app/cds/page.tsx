import type { Metadata } from "next";
import Image from "next/image";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CD's",
  description:
    "Black Horse — limited edition vinyl from Shirwell Bancan. 45 years of original songs on one timeless album.",
  alternates: { canonical: "/cds" },
  openGraph: {
    title: `CD's | ${SITE_NAME}`,
    description:
      "Black Horse — limited edition vinyl from Shirwell Bancan. 45 years of original songs.",
    url: "/cds",
    images: [{ url: "/cds/black-horse-vinyl-promo.png", alt: "Black Horse vinyl album" }],
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
        <p className="mt-4 text-balance text-base leading-relaxed text-zinc-300 sm:text-lg">
          cDs vinyl records coffee from the jungles and other unique products on
          the premium be patient
        </p>

        <div className="relative mx-auto mt-10 aspect-[682/1024] w-full max-w-md overflow-hidden rounded-2xl border border-[#FFC107]/20 bg-black/40 shadow-[0_0_60px_rgba(255,193,7,0.12)]">
          <Image
            src="/cds/black-horse-vinyl-promo.png"
            alt="Shirwell Bancan — Black Horse limited edition vinyl album"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 448px"
            priority
          />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

