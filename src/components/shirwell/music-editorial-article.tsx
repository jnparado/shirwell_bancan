import Link from "next/link";
import {
  BLACK_HORSE_DEEP_DIVE,
  MUSIC_LISTENING_GUIDE,
  MUSIC_PLAYER_INTRO,
} from "@/lib/editorial-content";
import { DISCOGRAPHY_ENTRIES } from "@/lib/discography";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { ArticleParagraphsWithInArticleAd } from "@/components/ads/article-paragraphs-with-in-article-ad";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type Props = {
  songCount: number;
};

/** Visible editorial article below the music player — crawlers and readers. */
export function MusicEditorialArticle({ songCount }: Props) {
  return (
    <section
      className="relative z-10 border-t border-white/[0.08] bg-[#0a0908] px-4 py-10 sm:px-6 sm:py-14"
      aria-labelledby="music-editorial-heading"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h2
            id="music-editorial-heading"
            className="font-serif text-2xl font-bold tracking-tight text-[#FFC107] sm:text-3xl"
          >
            {MUSIC_PLAYER_INTRO.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {songCount} tracks in the public catalogue · updated as new masters are approved
          </p>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <ArticleParagraphsWithInArticleAd
              paragraphs={MUSIC_PLAYER_INTRO.paragraphs}
              instanceId="music-intro"
            />
          </div>
        </article>

        <article className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
            {MUSIC_LISTENING_GUIDE.title}
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            {MUSIC_LISTENING_GUIDE.items.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
            {BLACK_HORSE_DEEP_DIVE.title}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <ArticleParagraphsWithInArticleAd
              paragraphs={BLACK_HORSE_DEEP_DIVE.paragraphs}
              instanceId="music-black-horse"
            />
          </div>
          <p className="mt-5 text-sm text-zinc-400">
            <Link href="/discography" className="text-[#FFC107] hover:underline">
              Full discography with track notes
            </Link>
            {" · "}
            <Link href="/listening-guide" className="text-[#FFC107] hover:underline">
              Listening guide
            </Link>
            {" · "}
            <Link href="/cds" className="text-[#FFC107] hover:underline">
              CD &amp; vinyl artwork
            </Link>
            {" · "}
            <Link href="/about" className="text-[#FFC107] hover:underline">
              About Shirwell Bancan
            </Link>
          </p>
        </article>

        <article className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
            Catalogue highlights
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            Selected tracks from the Black Horse anthology — tap a title on the player above
            to listen.
          </p>
          <ul className="mt-5 space-y-4">
            {DISCOGRAPHY_ENTRIES.slice(0, 8).map((entry) => (
              <li
                key={entry.slug}
                className="border-t border-white/[0.06] pt-4 first:border-0 first:pt-0"
              >
                <h3 className="font-serif text-base font-semibold text-zinc-100">
                  {entry.title}
                  {entry.year ? (
                    <span className="ml-2 text-sm font-normal text-zinc-500">
                      ({entry.year})
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/discography" className="font-medium text-[#FFC107] hover:underline">
              Read all {DISCOGRAPHY_ENTRIES.length} track notes →
            </Link>
          </p>
        </article>

        <ContentPageAds className="px-0 py-2" />
      </div>
    </section>
  );
}
