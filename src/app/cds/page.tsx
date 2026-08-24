import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { BlackHorseCdGrid } from "@/components/shirwell/black-horse-cd-grid";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import {
  BLACK_HORSE_ALBUM_TITLE,
  BLACK_HORSE_VINYL_PROMO,
} from "@/lib/black-horse-album";
import { CDS_VINYL_GUIDE } from "@/lib/editorial-content";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CD's",
  description:
    "Black Horse — limited edition CD and vinyl from Shirwell Bancan. Every album track with original CD artwork.",
  alternates: { canonical: "/cds" },
  openGraph: {
    title: `CD's | ${SITE_NAME}`,
    description:
      "Black Horse — limited edition CD and vinyl. Browse CD artwork for every song on the album.",
    url: "/cds",
    images: [{ url: BLACK_HORSE_VINYL_PROMO, alt: "Black Horse vinyl album" }],
  },
};

export default function CdsPage() {
  return (
    <div className="page-shell relative">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          CD&apos;s
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-zinc-300 sm:text-lg">
          Official CDs and vinyl from Shirwell Bancan — including the limited-edition{" "}
          <em>{BLACK_HORSE_ALBUM_TITLE}</em> album, celebrating 45 years of original
          Shirwell music. Browse CD artwork for every track below.
        </p>

        <ContentPageAdTop className="mt-8 px-0 py-4" />

        <BlackHorseCdGrid />

        <article className="mt-12 space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
          <h2 className="font-serif text-2xl font-semibold text-[#FFC107]">
            {CDS_VINYL_GUIDE.title}
          </h2>
          {CDS_VINYL_GUIDE.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </article>

        <article className="mt-10 space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
          <h2 className="font-serif text-2xl font-semibold text-[#FFC107]">
            About the release
          </h2>
          <p>
            <span className="font-semibold text-zinc-100">Shirwell Bancan</span> celebrates
            45 years of original songwriting with <em>{BLACK_HORSE_ALBUM_TITLE}</em> — a
            curated collection of the greatest songs he wrote across his career, on premium
            vinyl and CD.
          </p>
          <p>
            The album artwork captures Shirwell on a rearing black horse, guitar raised against
            gold stage curtains — the same theatrical spirit fans know from live shows. Each
            limited-edition copy is part of a one-time release celebrating decades of independent
            music.
          </p>
          <p>
            Companion products such as jungle coffee from Shirwell&apos;s travels are listed on
            the{" "}
            <Link href="/products" className="font-semibold text-[#FFC107] underline-offset-2 hover:underline">
              Products
            </Link>{" "}
            page.
          </p>
        </article>

        <ContentPageAds className="px-0 py-6" placement="both" />
      </main>
      <BottomNav />
    </div>
  );
}
