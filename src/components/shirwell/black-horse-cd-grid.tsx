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
      <div className="relative mx-auto aspect-[682/1024] w-full max-w-md overflow-hidden rounded-2xl border border-[#FFC107]/20 bg-black/40 shadow-[0_0_60px_rgba(255,193,7,0.12)]">
        <Image
          src={BLACK_HORSE_VINYL_PROMO}
          alt={`Shirwell Bancan — ${BLACK_HORSE_ALBUM_TITLE} limited edition vinyl album`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 448px"
          priority
        />
      </div>

      <div className={`${glassCard} p-6 sm:p-8`}>
        <h2 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
          {BLACK_HORSE_ALBUM_TITLE} — album on CD
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{BLACK_HORSE_ALBUM_SUBTITLE}</p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
          Each track from the <em>Black Horse</em> collection has its own CD artwork —
          gold-and-black limited edition design matching the vinyl release. Stream any
          song on the{" "}
          <Link href="/music" className="font-semibold text-[#FFC107] hover:underline">
            music player
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {BLACK_HORSE_TRACKS.map((track) => (
          <Link
            key={track.slug}
            href="/music"
            className={`${glassCard} group overflow-hidden transition hover:border-[#FFC107]/30 hover:bg-[rgba(255,255,255,0.07)]`}
          >
            <div className="relative aspect-square w-full bg-black/50 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={track.image}
                alt={`${track.title} — Black Horse CD ${track.trackNumber}`}
                className="h-full w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                width={512}
                height={512}
              />
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
    </section>
  );
}
