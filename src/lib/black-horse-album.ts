/** Black Horse — limited edition album track listing for CD / vinyl pages. */

export type BlackHorseTrack = {
  slug: string;
  trackNumber: number;
  title: string;
  year: number | null;
  image: string;
};

export const BLACK_HORSE_ALBUM_TITLE = "Black Horse";
export const BLACK_HORSE_ALBUM_SUBTITLE =
  "The Greatest Songs He Wrote in 45 Years";
export const BLACK_HORSE_VINYL_PROMO = "/cds/black-horse-vinyl-promo.png";
export const BLACK_HORSE_CD_ART_DIR = "/cds/black-horse";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Canonical album order — matches bundled catalogue on /music. */
const BLACK_HORSE_TRACKS_RAW: { title: string; year: number | null }[] = [
  { title: "Kissing", year: 2024 },
  { title: "I Want to Run Away", year: 2025 },
  { title: "Come on babe (Version 2 — louder)", year: 1979 },
  { title: "Black Horse", year: 1990 },
  { title: "Never Be The Same", year: 2026 },
  { title: "Hay girls guy voice", year: 2026 },
  { title: "Glorious Days (Echoes of the Don)", year: 2026 },
  { title: "Glorious Days (Girls Singing Two)", year: 2026 },
  { title: "Glorious Days (Male Vocal)", year: 2026 },
  { title: "Baby Gonna Rock", year: 1980 },
  { title: "Crazy 1", year: 2026 },
  { title: "Without YourLove", year: 2026 },
  { title: "1000 Minutes Apart", year: 2026 },
  { title: "Lily the Dancing Machine", year: 2019 },
  { title: "Dancing Machine (Turbo Club Mix)", year: 2025 },
];

export const BLACK_HORSE_TRACKS: BlackHorseTrack[] =
  BLACK_HORSE_TRACKS_RAW.map((track, index) => {
    const slug = slugify(track.title);
    return {
      slug,
      trackNumber: index + 1,
      title: track.title,
      year: track.year,
      image: `${BLACK_HORSE_CD_ART_DIR}/${slug}.svg`,
    };
  });

export function getBlackHorseTrack(slug: string): BlackHorseTrack | undefined {
  return BLACK_HORSE_TRACKS.find((t) => t.slug === slug);
}
