import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SiteSearchForm } from "@/components/search/site-search-form";
import { getSongs } from "@/lib/songs";
import { searchSite } from "@/lib/site-search";
import { SITE_NAME } from "@/lib/seo";

export const revalidate = 300;

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Search",
  description: `Search Shirwell Bancan songs, albums, flowers, and pages on ${SITE_NAME}.`,
  alternates: { canonical: "/search" },
  openGraph: {
    title: `Search | ${SITE_NAME}`,
    description: `Find music, vinyl, flowers, and news from Shirwell Bancan.`,
    url: "/search",
  },
  robots: { index: true, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const songs = await getSongs();
  const { pages, songs: matchedSongs } = searchSite(query, songs);
  const hasQuery = query.length > 0;

  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Search Shirwell
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
          Find Shirwell Bancan songs, albums, flowers, newsletters, and official pages
          across {SITE_NAME}.
        </p>

        <SiteSearchForm initialQuery={query} />

        {hasQuery ? (
          <section className={`${glassCard} mt-8 p-6 sm:p-8`} aria-live="polite">
            <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
              Results for &ldquo;{query}&rdquo;
            </h2>
            {pages.length === 0 && matchedSongs.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                No matches found. Try a song title, &ldquo;vinyl&rdquo;, &ldquo;flowers&rdquo;,
                or browse the quick links below.
              </p>
            ) : null}

            {matchedSongs.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Songs
                </h3>
                <ul className="mt-3 space-y-3">
                  {matchedSongs.map((song) => (
                    <li
                      key={song.id}
                      className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-zinc-200">
                        {song.title ?? "Untitled"}
                      </span>
                      <Link
                        href="/music"
                        className="shrink-0 text-xs font-semibold text-[#FFC107] underline-offset-2 hover:underline"
                      >
                        Play
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pages.length > 0 ? (
              <div className={matchedSongs.length > 0 ? "mt-8" : "mt-6"}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Pages
                </h3>
                <ul className="mt-3 space-y-3">
                  {pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="block rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3 transition hover:border-[#FFC107]/30"
                      >
                        <span className="text-sm font-semibold text-[#FFC107]">
                          {page.title}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-400">
                          {page.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

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
              { href: "/contact", label: "Contact" },
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

        {!hasQuery ? (
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
              {songs.slice(0, 8).map((song) => (
                <li
                  key={song.id}
                  className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-medium text-zinc-200">{song.title}</span>
                  <span className="shrink-0 text-xs text-zinc-500">{song.year ?? "—"}</span>
                </li>
              ))}
            </ul>
            {songs.length > 8 ? (
              <p className="mt-4 text-sm text-zinc-500">
                And {songs.length - 8} more on the home page and music player.
              </p>
            ) : null}
          </section>
        ) : null}
      </main>
      <BottomNav />
    </div>
  );
}
