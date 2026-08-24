/** Full newsletter article bodies — AdSense requires substantive text, not image-only pages. */
export type NewsletterIssue = {
  id: string;
  dateLabel: string;
  headline: string;
  summary: string;
  /** Full article paragraphs (plain text). */
  body: string[];
  src: string;
  alt: string;
};

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: "2024-05-22",
    dateLabel: "May 22, 2024",
    headline: "New music and live updates",
    summary:
      "Shirwell Bancan shares news from the studio, upcoming performances, and highlights from the official Shirwell music catalogue.",
    body: [
      "This week in the Shirwell studio we finished mixing two tracks that will appear on the streaming player and on the Black Horse physical release. One is a refreshed vocal take on a song fans first heard decades ago; the other is a brand-new arrangement built around live drums and a full backing choir.",
      "Shirwell Bancan has spent more than 45 years writing original music — not covers, not syndicated playlists, but songs that started as handwritten lyrics and late-night demos. The official Shirwell Music player on this site is the primary way to hear that catalogue: every track is owned and published by Shirwell Entertainment, and new uploads are added as masters are approved.",
      "Live work is picking up again after a long stretch focused on studio time. We are booking smaller theatre shows and private events where the set list mixes classic ballads with rock-forward numbers like Baby Gonna Rock and Lily the Dancing Machine. If you are planning an event and want Shirwell on stage, use the Contact page — we reply from shirwellentertainment@gmail.com.",
      "For listeners who want more than streaming, the CD and vinyl section documents the Black Horse limited edition: fifteen tracks chosen to represent the arc of Shirwell’s songwriting, each with its own CD artwork panel. Physical copies are produced in short runs; when a batch sells out, the artwork and track notes remain here as part of the permanent catalogue record.",
      "Thank you for reading and for supporting independent music. The next issue will cover the Black Horse vinyl artwork and how the album title track became the visual centrepiece of the release.",
      "If you are new here, start with three tracks that show the range of the catalogue: Kissing for contemporary production, Come on Babe (Version 2 — louder) for classic rock energy, and Glorious Days (Echoes of the Don) for narrative songwriting. Each has a written note on the Discography page explaining when it was written and why it was chosen for the Black Horse sequence.",
      "We publish these articles as plain text plus photography so listeners can read offline or share a link without needing an account. Subscription tools through Google Reader Revenue Manager are optional extras — the words and music stand on their own.",
    ],
    src: "/newsletters/2024-05-22.png",
    alt: "Shirwell Newsletter — May 22, 2024",
  },
  {
    id: "2024-05-23",
    dateLabel: "May 23, 2024",
    headline: "Black Horse and vinyl release",
    summary:
      "Details on the Black Horse limited-edition vinyl, album artwork, and how to explore physical releases alongside streaming on Shirwell Music.",
    body: [
      "Black Horse is the title of Shirwell Bancan’s curated anthology album — The Greatest Songs He Wrote in 45 Years. The name comes from the stage photograph that wraps the vinyl jacket: Shirwell on a rearing black horse, guitar lifted against gold curtains, capturing the showmanship that defines his live act.",
      "The track list is deliberate, not a chronological dump. It opens with recent favourites such as Kissing and I Want to Run Away, moves through era-defining rock like Come on Babe (Version 2 — louder) and Baby Gonna Rock, and closes with dance-floor cuts including Lily the Dancing Machine and the Turbo Club Mix of Dancing Machine. Each song on the CD page has its own artwork tile so collectors can see how the visual identity changes track by track.",
      "The vinyl run is limited. We press a finite number of LPs with the full-size poster art; when they are gone, the digital masters and CD art remain available here for reference and streaming. If you already own a copy, thank you — independent releases like this are funded directly by listeners rather than label advances.",
      "Streaming and physical formats complement each other. Use the Music player for everyday listening; use the CD’s page to study the production history, release years, and art direction. Premium subscribers get early access to selected masters and bonus material as it is cleared for release.",
      "Questions about shipping, regional availability, or wholesale orders should go through Contact. We do not sell through third-party marketplaces unless explicitly announced in a future issue.",
      "Art direction for Black Horse was handled in-house: gold typography, high-contrast photography, and per-track CD panels that mirror the mood of each song. Collectors often frame the poster; streamers use the same art as player thumbnails. Both audiences are welcome.",
      "Track notes for every album cut — including Hay girls guy voice and the three Glorious Days arrangements — are maintained on the Discography page and updated when new commentary is available from the studio.",
    ],
    src: "/newsletters/2024-05-23.png",
    alt: "Shirwell Newsletter — May 23, 2024",
  },
  {
    id: "2024-05-24",
    dateLabel: "May 24, 2024",
    headline: "Flowers, community, and the road",
    summary:
      "Notes from Shirwell on Nati Roses, local rose bunches around Sydney, and stories from decades on tour.",
    body: [
      "Music tours and flower seasons overlap more than you might expect. Shirwell Bancan has long worked with Nati Roses — a Sydney-area grower — to supply roses for weddings, memorials, and backstage thank-you bunches. The Flowers section of this site explains varietals, pricing guidance, and how Premium members access bundled offers when tours pass through New South Wales.",
      "Princess, who appears on the home page, helps coordinate dance teams for concerts and handles business consulting while Shirwell is on the road. That partnership keeps the entertainment side and the practical side of a touring life in balance: rehearsals, accounting, and the occasional rose delivery before a show.",
      "Community matters. Shirwell’s newsletter is not recycled press releases; it is written for people who stream the songs, collect the vinyl, and show up at gigs. We mention flowers because they are part of the same small business — Shirwell Entertainment — that publishes the music you hear on this site.",
      "If you are ordering roses for an event, start on the Flower orders page for availability notes. If you are here primarily for music, visit the Discography page for track-by-track background on the Black Horse album and the wider catalogue.",
      "More tour dates and studio updates will follow in the next issue. Until then, stream on Music, browse the CD art on the CD’s page, and reach out if you have a story to share from a Shirwell show.",
      "Nati Roses operates from Middle Dural — about 45 to 50 minutes from central Sydney when traffic is light. Couples planning weddings often combine a Shirwell performance enquiry with a floral consult; mention both when you write so we can coordinate calendars.",
      "Affordable pop-up rose bunches ($10–$20) remain a grassroots tradition. Schedules are announced informally when Shirwell is in town; the Flower page carries the latest guidance so you are not chasing rumours on social media.",
    ],
    src: "/newsletters/2024-05-24.png",
    alt: "Shirwell Newsletter — May 24, 2024",
  },
  {
    id: "2024-05-25",
    dateLabel: "May 25, 2024",
    headline: "Studio diary — mixing and mastering",
    summary:
      "Behind the scenes on vocal stacks, live drums, and why Shirwell still prints lyric sheets before every session.",
    body: [
      "A good week in the studio starts with lyrics on paper. Shirwell Bancan still prints sheets before every session — not because the technology demands it, but because the physical page slows the voice down enough to hear whether a line earns its rhyme. This issue walks through two masters nearing release: one is a refreshed vocal on a catalogue favourite; the other is a new arrangement built around live drums and a choir overdub recorded in a single afternoon.",
      "Mixing is where the showmanship meets the science. Shirwell pushes rock tracks like Baby Gonna Rock louder than the first demos — Version 2 is literally named for that decision — while ballads such as Without YourLove keep space around the vocal so the story stays intelligible on phone speakers. When AI tools assisted a mix, the credit appears on the track; transparency matters for listeners comparing old and new masters.",
      "Mastering for vinyl is a separate pass from streaming. The Black Horse LP was cut with the rearing-horse poster in mind — gold tones in the artwork inspired warmer mid-range choices on the lacquer. CD and digital masters share the same song sequence but not always the same limiter settings; that is why collectors and streamers are both served without pretending one file fits every format.",
      "If you are learning production by listening, compare the three Glorious Days mixes on Discography. Echoes of the Don emphasises folk-rock width; Girls Singing Two highlights backing vocals; Male Vocal strips to a simpler band picture. Same lyric theme, three emotional colours — a mini-lesson in arrangement without leaving the Shirwell catalogue.",
      "Studio time is funded by listeners — streaming, vinyl, live tickets, and Premium subscriptions. Thank you to everyone who emailed feedback after the last issue. The next newsletter will cover set-list planning for theatre dates and how Princess coordinates travel logistics while Shirwell is on stage.",
      "Until then, stream on Music, read track notes on Discography, and reply to this series via Contact if you have a question about a specific song’s history.",
    ],
    src: "/about/shirwell-bancan-poster.png",
    alt: "Shirwell studio diary — May 25, 2024",
  },
  {
    id: "2024-05-26",
    dateLabel: "May 26, 2024",
    headline: "Listening guide — where to start",
    summary:
      "A curated path through 45 years of originals for first-time listeners and returning fans.",
    body: [
      "People ask where to start with Shirwell Bancan because the catalogue spans decades, not because the music is scattered across unrelated projects. Everything on this site is published by Shirwell Entertainment — one songwriter, one team, one official player. This issue is a listening guide you can follow in an afternoon.",
      "Step one: open Music and play Kissing, then Never Be The Same. You will hear contemporary production and stacked vocals that represent the current studio direction. Step two: jump to Come on Babe (Version 2 — louder) and Baby Gonna Rock for the rock show that built the live reputation. Step three: finish with I Want to Run Away if you want a ballad that works at home or in a theatre seat.",
      "Step four — optional deep dive — is the Glorious Days trio on Discography. Listen to Echoes of the Don, then Girls Singing Two, then Male Vocal in that order. Notice how the lyric stays constant while instrumentation and vocal casting change the mood. That exercise is free on the web player and documented in writing on the Listening guide page.",
      "Physical collectors should pair streaming with the CD's page. Each track has its own artwork tile; the vinyl poster ties the whole sequence together with the Black Horse photograph. Neither format is ‘more official’ — they are different doors into the same songwriting.",
      "Premium subscribers will see early masters when cleared; everyone else still has the full public queue described on the Premium page. Ads on content pages help fund hosting; they never appear on login or checkout screens.",
      "Share this issue with someone who has not heard Shirwell yet. Independent music survives through word of mouth as much as algorithms — and the official site is the place where context and music stay together.",
    ],
    src: "/newsletters/2024-05-22.png",
    alt: "Shirwell listening guide — May 26, 2024",
  },
];

export function getNewsletterIssue(id: string): NewsletterIssue | undefined {
  return NEWSLETTER_ISSUES.find((issue) => issue.id === id);
}

/** ISO 8601 date for schema.org from issue id (YYYY-MM-DD). */
export function newsletterIssueDatePublished(id: string): string {
  return `${id}T08:00:00+10:00`;
}
