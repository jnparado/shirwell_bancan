import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { BrandPhotoFrame } from "@/components/legal/brand-photo-frame";
import { SITE_NAME } from "@/lib/seo";

const NATI_ROSES_URL =
  "https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Flower",
  description:
    "Shirwell Bancan recommends Nati Roses for weddings, funerals, and special occasions.",
  alternates: { canonical: "/flower" },
  openGraph: {
    title: `Flower | ${SITE_NAME}`,
    description:
      "Contact Nati Roses for weddings, funerals, and special occasions. Middle Dural NSW.",
    url: "/flower",
    images: [
      {
        url: "/home/princess-flower-shop.png",
        alt: "Princess — Shirwell flower shop",
      },
    ],
  },
};

export default function FlowerPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 text-pretty sm:py-10">
        <Link
          href={NATI_ROSES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto mb-8 block aspect-[3/4] w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border border-emerald-500/25 bg-zinc-900/70 shadow-[0_0_48px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/45 hover:shadow-[0_0_64px_rgba(16,185,129,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:max-w-sm"
          aria-label="Open Nati Roses florist website"
        >
          <BrandPhotoFrame
            src="/home/princess-flower-shop.png"
            alt="Princess — Shirwell flower shop"
            sizes="(max-width: 640px) 100vw, 384px"
            priority
            frameClassName="h-full w-full"
            imageClassName="transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute bottom-4 left-4 right-4 text-center text-xs font-medium uppercase tracking-widest text-emerald-200/95 transition group-hover:text-emerald-50">
            Nati Roses — open florist site
          </span>
        </Link>

        <article className={`${glassCard} space-y-6 p-5 text-base leading-relaxed text-zinc-300 sm:p-6`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Flowers &amp; roses
          </h1>
          <p>
            For weddings, funerals, and special occasions, Shirwell Bancan recommends{" "}
            <strong className="text-zinc-100">Nati Roses</strong> — a professional florist
            Shirwell has trusted for more than 40 years. The Nati family operates from
            Middle Dural, NSW, about 45–50 minutes from Sydney when traffic is light,
            in the heart of their beautiful farm country.
          </p>

          <p>
            Call{" "}
            <a
              href="tel:+61296511375"
              className="font-semibold text-[#FFC107] underline underline-offset-2"
            >
              (02) 9651 1375
            </a>{" "}
            or visit{" "}
            <a
              href={NATI_ROSES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-[#FFC107] underline underline-offset-2"
            >
              Nati Roses online
            </a>{" "}
            for custom arrangements and event florals.
          </p>

          <p>
            Shirwell also sells affordable rose bunches ($10–$20) at select Sydney
            locations — including Friday evenings near Double Bay and Saturday race-day
            spots. Follow Shirwell on social media or visit the{" "}
            <Link href="/flowers" className="font-semibold text-[#FFC107] underline-offset-2 hover:underline">
              Flowers
            </Link>{" "}
            page for more.
          </p>
        </article>

        <ContentPageAds className="mt-8 px-0 py-6" />
      </main>
      <BottomNav />
    </div>
  );
}
