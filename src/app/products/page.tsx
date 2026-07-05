import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shirwell Bancan products — limited edition Black Horse vinyl, jungle coffee, roses, and more from the official store.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products | ${SITE_NAME}`,
    description:
      "Explore Shirwell Bancan products including vinyl, coffee, and unique releases.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Products
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
          Shirwell Bancan&apos;s official product line brings together music, coffee,
          flowers, and one-of-a-kind items collected over decades on the road. New
          releases and premium items are added here as they become available.
        </p>

        <article className={`${glassCard} mt-10 overflow-hidden`}>
          <div className="relative aspect-[682/1024] w-full max-h-[420px] bg-black/40">
            <Image
              src="/cds/black-horse-vinyl-promo.png"
              alt="Black Horse — limited edition vinyl album by Shirwell Bancan"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-[#FFC107]">
              Black Horse — limited edition vinyl
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              The greatest songs Shirwell wrote across 45 years, pressed to vinyl in a
              limited run. Each album features the full Black Horse artwork — Shirwell
              on horseback, gold stage curtains, and the signature Shirwell Bancan sound
              that fans have followed for decades.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              See full details and artwork on the{" "}
              <Link href="/cds" className="font-semibold text-[#FFC107] underline-offset-2 hover:underline">
                CD&apos;s &amp; vinyl page
              </Link>
              .
            </p>
          </div>
        </article>

        <section className={`${glassCard} mt-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            More coming soon
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <li>
              <span className="font-semibold text-zinc-200">Jungle coffee</span> — unique
              roasts sourced from Shirwell&apos;s travels.
            </li>
            <li>
              <span className="font-semibold text-zinc-200">Roses &amp; flowers</span> —{" "}
              <Link href="/flowers" className="text-[#FFC107] underline-offset-2 hover:underline">
                order through Nati Roses
              </Link>{" "}
              for weddings, funerals, and special occasions.
            </li>
            <li>
              <span className="font-semibold text-zinc-200">Premium releases</span> — exclusive
              tracks and merchandise for subscribers. Check back as the catalog grows.
            </li>
          </ul>
          <p className="mt-6 text-sm text-zinc-400">
            While new products roll out, stream Shirwell&apos;s music on{" "}
            <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
              the music player
            </Link>{" "}
            or browse featured songs on{" "}
            <Link href="/home" className="text-[#FFC107] underline-offset-2 hover:underline">
              Home
            </Link>
            .
          </p>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
