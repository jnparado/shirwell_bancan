import Image from "next/image";
import Link from "next/link";
import {
  BLACK_HORSE_ALBUM_SUBTITLE,
  BLACK_HORSE_ALBUM_TITLE,
  BLACK_HORSE_TRACKS,
  BLACK_HORSE_VINYL_PROMO,
} from "@/lib/black-horse-album";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export function BlackHorseCdGrid() {
  return (
    <section className="mt-12 space-y-8">
      <article className={`${glassCard} overflow-hidden`}>
        <div className="grid gap-0 lg:grid-cols-[minmax(0,300px)_1fr] xl:grid-cols-[minmax(0,340px)_1fr]">
          <div className="relative mx-auto aspect-[682/1024] w-full max-w-[300px] bg-black/50 lg:mx-0 lg:max-w-none">
            <Image
              src={BLACK_HORSE_VINYL_PROMO}
              alt={`Shirwell Bancan — ${BLACK_HORSE_ALBUM_TITLE} limited edition vinyl album`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 300px, 340px"
              priority
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Shirwell Bancan
              </p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-[#FFC107] sm:text-4xl">
                {BLACK_HORSE_ALBUM_TITLE}
              </h2>
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                {BLACK_HORSE_ALBUM_SUBTITLE}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              Limited edition vinyl and CD — gold-and-black artwork with Shirwell on
              horseback and gold stage curtains. Every track shares the same Black Horse
              album artwork from the release.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/products/black-horse-vinyl"
                className="inline-flex items-center rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06]"
              >
                Buy vinyl — A$100
              </Link>
              <Link
                href="/music"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]"
              >
                Stream album
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div>
        <h3 className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
          Album tracks
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          {BLACK_HORSE_TRACKS.length} songs — tap a track to open the music player.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {BLACK_HORSE_TRACKS.map((track) => (
            <Link
              key={track.slug}
              href="/music"
              className={`${glassCard} group overflow-hidden transition hover:border-[#FFC107]/30 hover:bg-[rgba(255,255,255,0.07)]`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-black/60">
                <Image
                  src={BLACK_HORSE_VINYL_PROMO}
                  alt={`${track.title} — ${BLACK_HORSE_ALBUM_TITLE} album artwork`}
                  fill
                  className="object-contain p-1 transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute left-2 top-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-[#FFC107]">
                  {String(track.trackNumber).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-1 p-3 sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Track {String(track.trackNumber).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-sm font-semibold leading-snug text-[#FFC107] sm:text-[15px]">
                  {track.title}
                </h3>
                {track.year ? (
                  <p className="text-xs text-zinc-500">{track.year}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
