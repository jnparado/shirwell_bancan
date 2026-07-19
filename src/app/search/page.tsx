import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { getSongs } from "@/lib/songs";
import { SITE_NAME } from "@/lib/seo";

export const revalidate = 300;

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Search",
  description: `Browse Shirwell Bancan songs, albums, flowers, and pages on ${SITE_NAME}.`,
  alternates: { canonical: "/search" },
  openGraph: {
    title: `Search | ${SITE_NAME}`,
    description: `Find music, vinyl, flowers, and news from Shirwell Bancan.`,
    url: "/search",
  },
  robots: { index: true, follow: true },
};

export default async function SearchPage() {
  const songs = await getSongs();
  const featured = songs.slice(0, 8);

  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Browse Shirwell
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
          Full site search is on the way. Until then, use the links below to find
          Shirwell Bancan&apos;s music, vinyl, flowers, newsletters, and official pages.
        </p>

        <section className={`${glassCard} mt-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            Quick links
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: "/home", label: "Home & featured songs" },
              { href: "/music", label: "Music player" },
              { href: "/cds", label: "CD's & vinyl" },
              { href: "/flowers", label: "Flowers" },
              { href: "/newsletter", label: "Newsletter" },
              { href: "/products", label: "Products" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-[#FFC107]/20 bg-black/30 px-4 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className={`${glassCard} mt-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            Songs on {SITE_NAME}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Press play from Home or open the full{" "}
            <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
              music player
            </Link>
            .
          </p>
          <ul className="mt-5 space-y-3">
            {featured.map((song) => (
              <li
                key={song.id}
                className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm font-medium text-zinc-200">{song.title}</span>
                <span className="shrink-0 text-xs text-zinc-500">{song.year ?? "—"}</span>
              </li>
            ))}
          </ul>
          {songs.length > featured.length ? (
            <p className="mt-4 text-sm text-zinc-500">
              And {songs.length - featured.length} more on the home page and music player.
            </p>
          ) : null}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
