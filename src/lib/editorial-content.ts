import { BLACK_HORSE_ALBUM_TITLE } from "@/lib/black-horse-album";
import { BUSINESS_LOCATION, SUPPORT_EMAIL } from "@/config/contact";
import { APP_NAME, SITE_NAME } from "@/lib/seo";

/** Long-form copy for AdSense / quality guidelines — original, page-specific text. */

export const MUSIC_PLAYER_INTRO = {
  title: "Stream Shirwell Bancan — official music catalogue",
  paragraphs: [
    `${SITE_NAME} has spent more than 45 years writing, recording, and performing original music — not covers, not licensed third-party tracks. The player above streams approved masters from Shirwell Entertainment, the independent label that publishes every song on this site.`,
    `The catalogue spans rock, ballads, and dance mixes: recent singles such as Kissing and Never Be The Same sit alongside career landmarks like Come on Babe (Version 2 — louder), Baby Gonna Rock, and the Black Horse title track. Premium subscribers receive early access to selected releases; everyone else can press play on the full public queue.`,
    `Each recording is produced or overseen by Shirwell in the studio and on stage. When AI tools assisted a mix or arrangement, that credit appears on the track. For track-by-track background — release years, themes, and album context — read the Discography guide linked below.`,
  ],
} as const;

export const MUSIC_LISTENING_GUIDE = {
  title: "How to use the Shirwell music player",
  items: [
    "Tap any song in the queue list to switch tracks, or use shuffle and repeat for long listening sessions.",
    "Featured songs on the Home page pull from the same catalogue — they are a sample, not a separate playlist service.",
    "Physical releases such as the Black Horse vinyl and CD art panels are documented on the CD's page; streaming and physical formats share the same songwriting.",
    "Copyright and ownership are explained on the Music Owner page. Licensing enquiries go to the Contact page.",
  ],
} as const;

export const ARTIST_STORY = {
  title: `The ${SITE_NAME} story`,
  paragraphs: [
    `Based in ${BUSINESS_LOCATION}, Shirwell Bancan began writing songs in the late 1970s — club dates, demo tapes, and the slow work of finding a voice that could carry both quiet ballads and full-band rock. Over four decades that voice became unmistakable: storytelling lyrics, gold-curtain showmanship on stage, and a catalogue that grew one original song at a time.`,
    `Independent ownership mattered from the start. Shirwell Entertainment publishes the masters you hear here, sells limited vinyl when press runs are available, and partners with local businesses such as Nati Roses for flowers and event work on tour. ${APP_NAME} is the web home for that ecosystem — stream, read the newsletter, browse products, and manage an account from one place.`,
    `Whether you discovered Shirwell through a live show, a rose stand near Double Bay, or a search for original Australian music, welcome. This site is maintained by the artist and team — not a generic streaming aggregator — and every article, FAQ answer, and discography note is written for listeners who want context behind the songs.`,
  ],
} as const;

export const STORE_EDITORIAL = {
  title: "The Shirwell official store",
  paragraphs: [
    `Products on this page are curated by Shirwell Entertainment — music releases, foods from travel, and lifestyle items that connect to Shirwell Bancan's brand. When the shop is in coming-soon mode, photos and estimated prices let you preview what will ship; final pricing depends on production quality and batch size.`,
    `The Black Horse limited-edition vinyl is the flagship music product: fifteen songs representing 45 years of writing, with poster artwork showing Shirwell on horseback against gold stage curtains. Honey, chocolate, and gold-frame sunglasses are sample lifestyle products inspired by tour life — jungle coffee stories, backstage gifting, and the gold-and-black visual identity fans recognise from posters and stage lighting.`,
    `Orders, when open, are fulfilled by Shirwell Entertainment. Questions about availability, shipping within Australia, or wholesale requests should be sent to ${SUPPORT_EMAIL}. For music-only purchases, also see CDs & vinyl and the streaming player.`,
  ],
} as const;

export const FLOWERS_EDITORIAL = {
  title: "Flowers and Shirwell on the road",
  paragraphs: [
    `Before streaming apps, Shirwell Bancan sold rose bunches at Sydney markets between tour dates — a way to connect with neighbourhoods and fund the next studio session. That tradition continues through a decades-long partnership with Nati Roses in Middle Dural, NSW, whose team handles weddings, funerals, and custom event florals with professional care.`,
    `Premium members occasionally receive bundled offers when tours pass through New South Wales. Everyday buyers can call Nati Roses directly or visit their website for large orders; the Flower orders page lists Shirwell's informal $10–$20 bunches when pop-up stalls are scheduled near Double Bay or race-day locations.`,
    `Flowers are part of the same small business that publishes the music on this site — not a drop-shipped generic catalogue. Read the newsletter issue on community and the road for more context on how touring, business, and local partnerships fit together.`,
  ],
  sections: [
    {
      heading: "Weddings and events",
      text: "Nati Roses designs bridal bouquets, ceremony arches, and reception centrepieces. Mention Shirwell Entertainment when booking if you arrived from this site — the teams have worked together for more than 40 years.",
    },
    {
      heading: "Memorials and sympathy flowers",
      text: "Hand-tied rose bunches and custom wreaths can be ordered by phone. Same-day options depend on grower availability; call (02) 9651 1375 during business hours for guidance.",
    },
    {
      heading: "Pop-up rose bunches",
      text: "Shirwell still sells affordable bunches at select Sydney locations — often Friday evenings near Double Bay and Saturday race-day spots. Schedules vary with tour travel; check the Flower page for current notes.",
    },
  ],
} as const;

export const RECORDING_PHILOSOPHY = {
  title: "Songwriting and recording",
  paragraphs: [
    "Shirwell writes lyrics first — narrative scenes, heartbreak, travel, and humour — then builds arrangements around the vocal. Early demos were captured on tape; modern masters retain live drums and real instruments where possible, with selective digital tools for mixing and, when noted on a track, AI-assisted production.",
    `The Black Horse anthology was curated to show range: intimate ballads (I Want to Run Away, Without YourLove), rock anthems (Baby Gonna Rock, Come on Babe), and club mixes (Dancing Machine Turbo Club Mix). Glorious Days exists in three vocal arrangements — Echoes of the Don, Girls Singing Two, and Male Vocal — so listeners can compare how the same theme shifts with different voices.`,
    "New material continues to release through this site and the newsletter. Discography pages and issue articles document each wave of work so the catalogue stays understandable as it grows.",
  ],
} as const;

export const BLACK_HORSE_DEEP_DIVE = {
  title: `${BLACK_HORSE_ALBUM_TITLE} — album overview`,
  paragraphs: [
    "Black Horse is both a song and a visual symbol: Shirwell on a rearing horse, guitar raised, gold curtains behind him. The limited-edition vinyl and CD package uses that image as a statement — 45 years of originals collected for listeners who want a physical artefact, not only a stream.",
    "The fifteen-track sequence moves from recent radio-friendly cuts to deep-catalogue rock. Collectors use the CD's page to view per-track artwork; streamers use the player and Discography for context. Neither format replaces the other — they serve different ways of enjoying the same songwriting.",
  ],
} as const;
