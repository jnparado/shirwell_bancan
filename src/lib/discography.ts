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
    "A recent studio single with intimate vocals and a mid-tempo groove — one of the first tracks fans hear when exploring the current Shirwell player. Written as a contemporary love song with layered harmonies and a restrained drum pattern that leaves space for the vocal.",
  "i-want-to-run-away":
    "An emotional rock ballad about distance and longing, recorded with layered guitars and a driving chorus built for live sing-alongs. The arrangement builds from a quiet verse into a full-band release — a set-list favourite for theatres.",
  "come-on-babe-version-2-louder":
    "A remastered 1979-era rock track pushed louder for modern playback; it shows how early Shirwell demos evolved into stage favourites. The Version 2 mix preserves the original energy while adding clarity for streaming and vinyl.",
  "black-horse":
    "The title track that inspired the anthology artwork — theatrical, bold, and tied to the rearing-horse visual on the vinyl jacket. Lyrics reference showmanship and the courage it takes to perform night after night on the road.",
  "never-be-the-same":
    "A contemporary production blending classic Shirwell melody writing with updated drum and vocal stacks. The theme explores change after loss — personal enough to feel confessional, universal enough for audience sing-alongs.",
  "hay-girls-guy-voice":
    "A playful vocal experiment switching perspectives between backing singers and lead; popular on playlists that showcase Shirwell’s range beyond ballads. Useful for demonstrating how the same band arrangement can shift tone with vocal casting.",
  "glorious-days-echoes-of-the-don":
    "Part of the Glorious Days suite — panoramic vocals and narrative lyrics inspired by travel and history. The Echoes of the Don mix emphasises wide stereo imaging and folk-rock instrumentation.",
  "glorious-days-girls-singing-two":
    "A choir-forward arrangement highlighting backing vocal arrangements Shirwell uses in concert. Two female leads trade lines before joining on the chorus — recorded to capture the live room sound.",
  "glorious-days-male-vocal":
    "The male-lead variant of the Glorious Days theme, emphasising raw vocal tone and simpler instrumentation. Listeners comparing the three Glorious Days mixes can hear how arrangement choices change the emotional colour of the same song.",
  "baby-gonna-rock":
    "1980s-style rock energy — fast drums, shout-along hooks, and a staple of high-tempo set lists. Guitar-forward mixing and a short intro designed to wake up a crowd after a ballad.",
  "crazy-1":
    "A recent uptempo track with edgy guitar lines; demonstrates ongoing studio work alongside legacy material. The title reflects the chaotic joy of live rock — not a cover of any external hit.",
  "without-yourlove":
    "A melodic love song with classic Shirwell phrasing — slower tempo, strong chorus, suited to acoustic encores. Often paired with I Want to Run Away in medleys about separation and reconciliation.",
  "1000-minutes-apart":
    "Written around the theme of time zones and separation; pairs well with I Want to Run Away in live medleys. The lyric counts minutes between phone calls — a pre-smartphone image that still resonates with touring couples.",
  "lily-the-dancing-machine":
    "Named for a characterful dance persona — rock turbo mix energy aimed at club and stage crossover. Percussion emphasises four-on-the-floor drive while guitars keep a rock edge.",
  "dancing-machine-turbo-club-mix":
    "Extended dance mix with emphasised rhythm section; the counterpart to the rock version for DJ and event use. Longer intro and outro for mixing in club sets while retaining Shirwell’s original melody and lyrics.",
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
