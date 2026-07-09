import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
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
          className="group relative mx-auto mb-8 block aspect-[3/4] w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border border-emerald-500/25 bg-black/30 shadow-[0_0_48px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/45 hover:shadow-[0_0_64px_rgba(16,185,129,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:max-w-sm"
          aria-label="Open Nati Roses florist website"
        >
          <Image
            src="/home/princess-roses-balloons.png"
            alt="Shirwell talent with yellow roses — Nati Roses"
            fill
            className="object-cover object-[center_12%] transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 384px"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute bottom-4 left-4 right-4 text-center text-xs font-medium uppercase tracking-widest text-emerald-200/95 transition group-hover:text-emerald-50">
            Nati Roses — open florist site
          </span>
        </Link>

        <article className={`${glassCard} space-y-6 p-5 text-base leading-relaxed text-zinc-300 sm:p-6`}>
          <p>
            If you need a florist for weddings funerals special occasions contact the
            link nati Roses.shirwell has been dealing with them for over 40 years
            highly recommends At middle Dural NSW just 45 to 50 minutes drive with no
            traffic from Sydney the heart To the beautiful Farm nati family.
          </p>

          <p>
            Or you can just call{" "}
            <a
              href="tel:+61296511375"
              className="font-semibold text-[#FFC107] underline underline-offset-2"
            >
              0296511375
            </a>{" "}
            Professional florists ready to go this link :{" "}
            <a
              href={NATI_ROSES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-[#FFC107] underline underline-offset-2"
            >
              {NATI_ROSES_URL}
            </a>
          </p>

          <p>
            For weddings Aventis and funeral .Shirwell if you like to get his cheap
            bunches of roses $10 or $ 20 Friday at Double Bay cosmopolitan next to
            fruit shop 5pm or round the Bay you see him. Saturday at Sidney horse
            races at 3pm on to finish times Other day you see him around castle Hill
            shops About 5pm
          </p>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
