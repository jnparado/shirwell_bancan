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
    "If you are new to Shirwell Bancan, start with Kissing and Never Be The Same for contemporary production, then step back to Come on Babe (Version 2 — louder) and Baby Gonna Rock for the live-band energy that built the stage reputation. The Discography page explains each track in plain language.",
  ],
} as const;

export const LISTENING_GUIDE = {
  title: "How to explore the Shirwell catalogue",
  intro: `This guide helps first-time listeners and long-time fans navigate ${SITE_NAME}'s original music — where to start, how the Black Horse anthology fits together, and which pages on this site add context behind the songs.`,
  sections: [
    {
      heading: "Start on the Music player",
      paragraphs: [
        "Open the Music page and press play on any track in the queue. Every song is an original master published by Shirwell Entertainment — not a syndicated feed or third-party playlist. Shuffle works for discovery; repeat is useful when you are learning lyrics or comparing mixes.",
        "Featured cards on the Home page sample the same catalogue. They are entry points, not a separate service. When you hear something you like, open Discography for release years, themes, and notes on how the song fits the Black Horse sequence.",
      ],
    },
    {
      heading: "Recommended first listens",
      paragraphs: [
        "For contemporary ballads: Kissing and I Want to Run Away. For rock energy: Baby Gonna Rock and Come on Babe (Version 2 — louder). For narrative songwriting: Glorious Days (Echoes of the Don). For dance and club mixes: Lily the Dancing Machine and the Dancing Machine Turbo Club Mix.",
        "The three Glorious Days vocal arrangements — Echoes of the Don, Girls Singing Two, and Male Vocal — are deliberately included so you can compare how arrangement and voice change the same theme. That kind of detail is documented on Discography, not hidden in metadata.",
      ],
    },
    {
      heading: "Physical releases vs streaming",
      paragraphs: [
        "Black Horse exists as a limited vinyl run and as a CD package with per-track artwork panels. Streaming is the everyday format; vinyl and CD are for collectors who want the poster art and a permanent copy of the fifteen-song sequence.",
        "Read the CD's page for jacket photography and individual disc art. Read the Newsletter issues from May 2024 for studio and pressing notes written at release time.",
      ],
    },
    {
      heading: "Going deeper",
      paragraphs: [
        "About covers Shirwell's career timeline and recording philosophy. FAQ answers common questions about Premium, ads on this site, and how to contact the team. Newsletter articles are full text — shareable URLs with photography, not image-only posts.",
        "Questions about copyright or licensing belong on Music Owner. Booking and press enquiries go to Contact. This site is maintained by the artist and team; every article is written for listeners who want context, not keyword filler.",
      ],
    },
  ],
} as const;

export const PREMIUM_EDITORIAL = {
  title: "What Shirwell Premium includes",
  paragraphs: [
    `${SITE_NAME} Premium supports independent music production — studio time, mastering, and keeping this official site online. Subscribers get unlimited streaming on the web player, early access to selected masters as they are cleared, and member pricing on bundled offers when tours pass through New South Wales.`,
    "Web checkout on this page uses Stripe when configured. iPhone and iPad subscriptions may use Apple In-App Purchase inside the Shirwell Music app; Android and desktop may use Subscribe with Google when Publisher Center paywall products are live. One account works across web and mobile when you sign in with the same email.",
    "Premium is optional. Every public track on the Music page remains free to stream without a subscription. We describe ads on content pages in FAQ and Privacy — login, checkout, and account screens never show AdSense units.",
    "Cancel anytime from the Stripe customer portal or your app store subscription settings. If you subscribed on iOS, use Restore purchases in the app while signed in. Billing questions go to Support or Contact.",
  ],
} as const;

export const CDS_VINYL_GUIDE = {
  title: "Collecting Black Horse on vinyl and CD",
  paragraphs: [
    "The Black Horse package is a one-time anthology — fifteen songs chosen to represent 45 years of writing, not a chronological box set. The cover photograph shows Shirwell on a rearing horse against gold curtains; that image also appears on posters and stage backdrops fans recognise from live shows.",
    "Each CD panel on this page matches a track on the album. Collectors often frame the poster; streamers use the same art as player thumbnails. When a vinyl batch sells out, the digital masters and artwork remain here as part of the permanent catalogue record.",
    "Jungle coffee, honey, and sunglasses on the Products page are lifestyle items inspired by tour travel — separate from the music release but part of the same Shirwell Entertainment brand. Wholesale or regional shipping questions should email the address on Contact.",
  ],
} as const;

export const CONTACT_EDITORIAL = {
  title: "Bookings, licensing, and press",
  paragraphs: [
    "Shirwell Bancan accepts theatre shows, private events, and smaller club dates when the calendar allows. Include your venue, proposed date, expected audience size, and whether you need a full band or an acoustic set. We reply from shirwellentertainment@gmail.com within a few business days.",
    "Licensing and sync requests for original masters are handled by Shirwell Entertainment. Start with Music Owner for ownership statements, then email with the project type — film, advertisement, cover recording, or public performance outside normal venue licences.",
    "Press and photography enquiries should note your publication and deadline. High-resolution poster art from the About page may be approved for review copies when credited to Shirwell Bancan and linked to this official site.",
  ],
} as const;

export const SUPPORT_GUIDES = {
  title: "Common help topics",
  sections: [
    {
      heading: "Music will not play",
      text: "Confirm you accepted cookie consent if prompted — streaming does not require it, but some browsers block autoplay until interaction. Tap play on a song card, check volume, and try Wi‑Fi if mobile data is unstable. Clear the tab and reload /music if the queue looks empty.",
    },
    {
      heading: "Sign-in and accounts",
      text: "Use the same email for web and mobile. Password reset flows through Supabase Auth — check spam for the reset message. OAuth with Google or Apple must return to this domain; mobile apps use shirwell://auth/callback as configured in Supabase.",
    },
    {
      heading: "Premium and billing",
      text: "Web subscriptions: open Premium and use Manage billing when Stripe portal is enabled. Apple subscriptions: Settings → Subscriptions on your iPhone, or Restore purchases in the app. Charge questions should include the email on your account and the approximate purchase date.",
    },
    {
      heading: "Store and flowers",
      text: "When the store shows coming soon, browse photos and estimated prices but checkout may be disabled. Flower orders for weddings and events go through Nati Roses — see Flowers and Flower orders for phone numbers and varietal notes.",
    },
    {
      heading: "Advertising and privacy",
      text: "We show Google AdSense on content pages with substantial editorial text — music articles, discography, newsletter, about. Manage cookies from Privacy and cookie settings in the footer. Account, cart, and login pages do not carry ad tags.",
    },
  ],
} as const;

export const NEWSLETTER_INDEX_INTRO = {
  paragraphs: [
    "Each issue below opens as a full article with multiple paragraphs of original reporting — studio news, release notes, tour updates, and community stories from Shirwell Bancan and Shirwell Entertainment. Photography accompanies the text; nothing here is syndicated from third-party feeds or auto-generated summaries.",
    "Bookmark individual issues or share their URLs. AMP versions exist for readers on accelerated mobile pages. For track context behind the songs mentioned in these articles, use Discography and the Music player.",
  ],
} as const;
