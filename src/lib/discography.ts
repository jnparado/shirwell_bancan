import {
  BLACK_HORSE_ALBUM_SUBTITLE,
  BLACK_HORSE_ALBUM_TITLE,
  BLACK_HORSE_TRACKS,
} from "@/lib/black-horse-album";
import { SITE_NAME } from "@/lib/seo";

export type DiscographyEntry = {
  slug: string;
  title: string;
  year: number | null;
  description: string;
};

/** Track notes for the Black Horse anthology and streaming catalogue. */
const TRACK_DESCRIPTIONS: Record<string, string> = {
  kissing:
    "A recent studio single with intimate vocals and a mid-tempo groove — one of the first tracks fans hear when exploring the current Shirwell player.",
  "i-want-to-run-away":
    "An emotional rock ballad about distance and longing, recorded with layered guitars and a driving chorus built for live sing-alongs.",
  "come-on-babe-version-2-louder":
    "A remastered 1979-era rock track pushed louder for modern playback; it shows how early Shirwell demos evolved into stage favourites.",
  "black-horse":
    "The title track that inspired the anthology artwork — theatrical, bold, and tied to the rearing-horse visual on the vinyl jacket.",
  "never-be-the-same":
    "A contemporary production blending classic Shirwell melody writing with updated drum and vocal stacks.",
  "hay-girls-guy-voice":
    "A playful vocal experiment switching perspectives; popular on playlists that showcase Shirwell’s range beyond ballads.",
  "glorious-days-echoes-of-the-don":
    "Part of the Glorious Days suite — panoramic vocals and narrative lyrics inspired by travel and history.",
  "glorious-days-girls-singing-two":
    "A choir-forward arrangement highlighting backing vocal arrangements Shirwell uses in concert.",
  "glorious-days-male-vocal":
    "The male-lead variant of the Glorious Days theme, emphasising raw vocal tone and simpler instrumentation.",
  "baby-gonna-rock":
    "1980s-style rock energy — fast drums, shout-along hooks, and a staple of high-tempo set lists.",
  "crazy-1":
    "A recent uptempo track with edgy guitar lines; demonstrates ongoing studio work alongside legacy material.",
  "without-yourlove":
    "A melodic love song with classic Shirwell phrasing — slower tempo, strong chorus, suited to acoustic encores.",
  "1000-minutes-apart":
    "Written around the theme of time zones and separation; pairs well with I Want to Run Away in live medleys.",
  "lily-the-dancing-machine":
    "Named for a characterful dance persona — rock turbo mix energy aimed at club and stage crossover.",
  "dancing-machine-turbo-club-mix":
    "Extended dance mix with emphasised rhythm section; the counterpart to the rock version for DJ and event use.",
};

export const DISCOGRAPHY_INTRO = `${SITE_NAME} has published original music for more than 45 years. The ${BLACK_HORSE_ALBUM_TITLE} anthology — ${BLACK_HORSE_ALBUM_SUBTITLE} — collects fifteen representative tracks. Each entry below includes release context and a short note on the song. Stream every track on the Music player; see CD artwork on the CD's page.`;

export const DISCOGRAPHY_ENTRIES: DiscographyEntry[] = BLACK_HORSE_TRACKS.map(
  (track) => ({
    slug: track.slug,
    title: track.title,
    year: track.year,
    description:
      TRACK_DESCRIPTIONS[track.slug] ??
      `Album track ${track.trackNumber} on ${BLACK_HORSE_ALBUM_TITLE}. Stream on Music and view CD art on the CD's page.`,
  }),
);

export function getDiscographyEntry(slug: string): DiscographyEntry | undefined {
  return DISCOGRAPHY_ENTRIES.find((e) => e.slug === slug);
}
