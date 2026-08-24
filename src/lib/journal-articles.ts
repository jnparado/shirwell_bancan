import { BUSINESS_NAME, BUSINESS_LOCATION, SUPPORT_EMAIL } from "@/config/contact";
import { SITE_NAME } from "@/lib/seo";

export type JournalArticle = {
  slug: string;
  title: string;
  dateLabel: string;
  dateIso: string;
  summary: string;
  body: string[];
};

/** Long-form original essays — written for readers, not keyword lists. */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "how-shirwell-writes-a-song",
    title: "How Shirwell writes a song",
    dateLabel: "March 4, 2024",
    dateIso: "2024-03-04",
    summary:
      "Lyrics on paper first, then melody, then the band — the working method behind 45 years of original Shirwell Bancan songs.",
    body: [
      `I still start on paper. Not a laptop, not a voice memo that gets lost in a phone. A printed or handwritten sheet forces me to hear whether a line earns the next rhyme. That habit began in the late 1970s in ${BUSINESS_LOCATION} and it has not changed, even as the studio moved from tape to digital masters.`,
      `A Shirwell song usually begins as a scene: two people in a car, a stage curtain, a phone call counted in minutes. I write the story until it can stand without the band. Only then do I look for a melody that can carry it in a theatre and on a phone speaker. If the lyric needs the drums to make sense, the lyric is not finished.`,
      `Ballads such as I Want to Run Away and Without YourLove keep space around the vocal. Rock numbers such as Baby Gonna Rock and Come on Babe (Version 2 — louder) are built to wake a room after a quiet song. Dance mixes such as Lily the Dancing Machine keep the original melody and words; the rhythm section is what changes, not the authorship.`,
      `I do not write covers. Every track on the official player is published by ${BUSINESS_NAME}. When an arrangement uses extra tools — a choir overdub, a louder remaster, or, when noted, AI-assisted production — that credit belongs on the track, not hidden in a footnote.`,
      `The Black Horse anthology is a map of this method, not a dump of every demo. Fifteen songs were chosen so a new listener can hear range in one sitting: contemporary production, 1979-era rock, narrative suites, and club mixes. Discography notes explain why each cut is there.`,
      `If you want to follow the work, start on Music, then read the track notes. Questions about licensing go to ${SUPPORT_EMAIL}. The songs are personal and professionally protected; listening here is welcome, copying is not.`,
    ],
  },
  {
    slug: "come-on-babe-from-1979-to-version-2",
    title: "Come on Babe: from 1979 demo to Version 2 (louder)",
    dateLabel: "March 18, 2024",
    dateIso: "2024-03-18",
    summary:
      "Why the louder remaster exists, what the original session sounded like, and how live crowds changed the mix.",
    body: [
      `Come on Babe began as a club-date rocker. The 1979-era demo had live drums, a shorter intro, and a vocal that sat a little back in the tape. On stage the crowd sang the hook louder than the playback. That gap is why Version 2 exists: not a rewrite of the song, a mix that matches how the room actually behaved.`,
      `Louder does not mean crushed. The Version 2 master keeps the original energy and adds clarity for streaming and vinyl. Guitar parts that used to disappear on cassette now sit in front of the drums without wiping the vocal. If you compare the two in your head — even if only Version 2 is on the player — you are hearing a decision about live sound, not a fashion trend.`,
      `I still use that track to open high-tempo sets after a ballad. The intro is short on purpose: it is a wake-up, not a fade-in. Baby Gonna Rock often follows it. Together they show the rock half of a catalogue that also holds Kissing and Never Be The Same.`,
      `Collectors who own Black Horse hear Version 2 in the album sequence, not as a bonus hidden at the end. That placement is deliberate. The anthology is supposed to move from recent radio-friendly cuts into era-defining rock, then out toward dance-floor material. Come on Babe is a hinge in that story.`,
      `Studio notes from later sessions mention the same rule: if a remaster changes the emotional colour of a song, name it. Version 2 — louder is the name on the tin so listeners are not tricked into thinking it is a new composition.`,
      `Play it on Music. Read the Discography entry. If you ran a club in the early years and remember the original tape, write to ${SUPPORT_EMAIL} — those memories help us date photographs and set lists.`,
    ],
  },
  {
    slug: "black-horse-photograph-and-the-album",
    title: "The Black Horse photograph and why it became the album",
    dateLabel: "April 2, 2024",
    dateIso: "2024-04-02",
    summary:
      "Gold curtains, a rearing horse, and a guitar: how one image named an anthology of fifteen originals.",
    body: [
      `The Black Horse title is not a marketing slogan invented after the fact. The photograph — Shirwell on a rearing horse, guitar raised, gold stage curtains behind — was already how people described the live act. When we curated fifteen songs from 45 years of writing, that picture was the honest cover, not a costume.`,
      `Vinyl needs a jacket you can hold. Streaming needs a thumbnail. The same art does both jobs: collectors frame the poster; the player uses a crop of the same circle of light. Neither format is more official. They are different doors into the same songwriting.`,
      `Each CD panel on the CD's page matches a track. That is not decoration. Mood changes from Kissing to Baby Gonna Rock to the Turbo Club Mix, and the art is supposed to follow. If you only stream, you still get the sequence; if you buy vinyl, you get the physical statement that this was a one-time anthology, not an infinite playlist.`,
      `Limited pressings matter for an independent label. ${BUSINESS_NAME} funds studio time from listeners, not from a major-label advance. When a vinyl batch sells out, the digital masters stay on this site. The songs do not disappear because the cardboard did.`,
      `People sometimes ask whether Black Horse is a concept album. It is a career map. Recent singles sit near early rock so you can hear what stayed constant: narrative lyrics, a voice built for theatres, and arrangements that still use real drums where we can.`,
      `Stand in front of the poster on About, then play the title track. The visual and the song are meant to argue the same point: showmanship is part of the writing, not a layer added in post.`,
    ],
  },
  {
    slug: "glorious-days-three-voices",
    title: "Glorious Days: three voices, one theme",
    dateLabel: "April 15, 2024",
    dateIso: "2024-04-15",
    summary:
      "Echoes of the Don, Girls Singing Two, and Male Vocal — how arrangement changes the colour of the same story.",
    body: [
      `Glorious Days is a suite, not a single mix with extra files. Echoes of the Don opens the stereo field and leans folk-rock. Girls Singing Two puts two female leads in conversation before the chorus. Male Vocal strips the picture so the lyric sits closer to a band in a room.`,
      `I keep all three on the player because the lesson is the point. Same theme, different emotional colour. Listeners who only hear one mix miss how casting and instrumentation rewrite a song without rewriting the words. Discography describes each mix in plain language so you do not need a producer credit sheet.`,
      `Choir-forward work is expensive in time, not only money. Girls Singing Two was recorded to capture live-room bleed, not a perfectly isolated stack. That choice is audible: you hear air around the voices. Echoes of the Don uses width instead of extra singers. Male Vocal is the control experiment.`,
      `On stage we rarely play all three back to back. Theatre sets pick the mix that matches the room. A seated audience often gets Echoes of the Don. A celebration set may get Girls Singing Two. The male-lead cut works when the band is already loud and we need the story to cut through.`,
      `If you are learning arrangement, this is the homework: play the three mixes in that order on a decent speaker, not only earbuds. Notice where the drums sit, where the harmony enters, and whether the last chorus still needs a key change. Then read the track notes.`,
      `Questions about using any Glorious Days mix in a film or advert require written permission. Start on Music Owner, then email ${SUPPORT_EMAIL} with the project type and duration.`,
    ],
  },
  {
    slug: "touring-new-south-wales",
    title: "Touring New South Wales: theatres, clubs, and the calendar",
    dateLabel: "May 1, 2024",
    dateIso: "2024-05-01",
    summary:
      "How Shirwell books smaller rooms, what to send for a date, and why the set list changes with the building.",
    body: [
      `I book theatre shows, private events, and club dates when the calendar allows. ${BUSINESS_LOCATION} is home, but the work is travel: load-in times, parking for a van, and whether the room wants an acoustic set or a full band. Email is better than a vague social message. Include venue, proposed date, expected audience size, and which format you want.`,
      `A theatre set mixes ballads and rock so people who came for Kissing still get Baby Gonna Rock. A private event may want a shorter list and a quieter encore. Club dates need shorter intros and fewer suite experiments. Glorious Days in three mixes is a studio gift; live, we pick one.`,
      `Princess coordinates dance teams and covers business while I am on the road — rehearsals, invoices, and the practical half of a touring life. That is not a slogan. Independent music fails when the stage looks professional and the books do not.`,
      `Flowers overlap with tours more than outsiders expect. Nati Roses in Middle Dural has worked with us for decades on weddings, memorials, and backstage bunches. Couples sometimes combine a performance enquiry with a floral consult. Mention both so calendars can actually meet.`,
      `We do not publish a fake national tour grid. Dates appear in the newsletter when they are real. If a promoter needs a rider, start with Contact. If you only want to listen, the player is the show that is always on.`,
      `Thank you to rooms that still book original Australian music. The catalogue on this site is the set list in slow motion: same songs, documented so a new audience can catch up before the lights go down.`,
    ],
  },
  {
    slug: "independent-label-shirwell-entertainment",
    title: "Why Shirwell Entertainment stays independent",
    dateLabel: "May 8, 2024",
    dateIso: "2024-05-08",
    summary:
      "Masters, vinyl runs, and this website — how an independent label publishes original music without a major-label advance.",
    body: [
      `${BUSINESS_NAME} publishes the masters you hear here. That sentence is the business model. We do not license a third-party catalogue to fill a player. We do not scrape other artists. Ownership is listed on Music Owner because listeners deserve to know who is responsible for the work.`,
      `Independence means we choose the sequence on Black Horse, the louder Come on Babe mix, and when a new master is cleared for Premium early access. It also means cash flow is slower. Vinyl is a batch, not an infinite warehouse. Honey, sunglasses, and coffee on the Products page are tour-life items, not a drop-shipped mall.`,
      `This website is the office, the archive, and the radio. Newsletter articles are written here, not syndicated. Discography is maintained here. Support answers playback and billing here. Ads on content pages help pay hosting; login and checkout never carry ad tags. That split is policy, not a loophole.`,
      `Premium is optional. Public tracks stay free to stream. Subscriptions support studio time and keeping the archive online. Cancel from Stripe or the app store. We would rather a listener stream for free than pretend a paywall is the music.`,
      `Licensing still goes through us. Sync, covers, adverts, and public performance outside ordinary venue licences need written permission. Email ${SUPPORT_EMAIL}. We reply with the project type in mind, not a generic form letter.`,
      `If you are an artist asking how to stay independent: write more than you post, keep the masters, and put the story next to the songs. A player without notes looks like a widget. Notes without songs look like a brochure. This site is both on purpose.`,
    ],
  },
  {
    slug: "mixing-ballads-and-rock",
    title: "Mixing ballads and rock in the same catalogue",
    dateLabel: "June 3, 2024",
    dateIso: "2024-06-03",
    summary:
      "Phone speakers, theatre PA, and vinyl — how Shirwell mixes quiet songs and loud songs without pretending they are the same.",
    body: [
      `A ballad that is mixed like a rock song loses the story. A rock song mixed like a ballad disappears in a club. I treat them as different jobs that share a singer. Without YourLove needs room around the vocal. Baby Gonna Rock needs drums that announce the downbeat in the first bar.`,
      `Phone speakers lie. They hide low guitar and exaggerate sibilance. We check masters on small speakers and on a decent monitor. Streaming limiters are not the same as vinyl lacquers. Black Horse was cut with warmer mids because the jacket art is gold and the physical format forgives less digital crunch.`,
      `Version 2 of Come on Babe is the rock lesson: louder for the room, still the same composition. Kissing is the contemporary lesson: stacked vocals, mid-tempo groove, drums that leave space. Never Be The Same sits between them — change after loss, radio-friendly without throwing away phrasing.`,
      `Live, the engineer does not get a second mix. Set lists put a ballad before a rocker so the crowd’s ears reset. 1000 Minutes Apart and I Want to Run Away can share a medley about distance. Lily the Dancing Machine is for when the floor wants four-on-the-floor without abandoning the original lyric.`,
      `AI-assisted production, when it happens, is labelled on the track. Listeners comparing old and new masters should not have to guess. Transparency is part of quality. Hidden process is how catalogues turn into mystery meat.`,
      `Use Discography as the mixing diary. Use Music as the proof. If a mix bothers you on a particular device, say which song and which device when you write to Support — that is more useful than a one-star shrug.`,
    ],
  },
  {
    slug: "vinyl-pressing-and-the-black-horse-run",
    title: "Pressing Black Horse: what a limited vinyl run actually involves",
    dateLabel: "June 20, 2024",
    dateIso: "2024-06-20",
    summary:
      "Lacquers, jackets, and why a sold-out batch does not delete the songs from the official player.",
    body: [
      `A limited vinyl run is a manufacturing decision. We press a finite number of LPs with the full-size poster art. When they are gone, they are gone. The digital masters remain. Collectors are not required to stream, and streamers are not required to collect. Both are valid ways to hear the same fifteen songs.`,
      `Cutting a lacquer is not the same as bouncing a WAV. Low end that feels fine in headphones can make the needle jump. We adjust. That is why the vinyl master and the streaming master can differ without either being a fake. The songwriting is identical.`,
      `Jackets scuff in transit. We pack for Australia first. Wholesale or regional shipping questions should go through Contact, not a marketplace rumour. We do not sell through third-party stores unless a newsletter issue says so.`,
      `CD panels exist because the anthology is visual as well as musical. Each track’s art is a chapter heading. If you only know the player thumbnails, visit the CD's page once. You will understand the sequence faster.`,
      `Independent pressings are funded by listeners. Thank you if you already own a copy. If you missed the batch, the archive on this site is still the catalogue of record: notes, artwork, and streams.`,
      `Next runs, if any, will be announced in the newsletter with quantities. We will not pretend unlimited stock exists to keep a shop looking busy.`,
    ],
  },
  {
    slug: "nati-roses-and-the-road",
    title: "Nati Roses, pop-up bunches, and music on the same books",
    dateLabel: "July 9, 2024",
    dateIso: "2024-07-09",
    summary:
      "Forty years with a Middle Dural grower — weddings, memorials, and $10–$20 bunches that funded the next session.",
    body: [
      `Before streaming apps, I sold rose bunches at Sydney markets between tour dates. It connected neighbourhoods and paid for studio hours. That work continues through Nati Roses in Middle Dural — professional florals for weddings, funerals, and events, about 45 to 50 minutes from central Sydney when traffic is light.`,
      `This is not a generic affiliate page. The partnership is decades old. Mention ${BUSINESS_NAME} when you book if you arrived from this site so both calendars can talk. Call (02) 9651 1375 during business hours for large orders. Same-day sympathy flowers depend on grower availability; the phone is more honest than a web form at midnight.`,
      `Pop-up bunches at $10–$20 remain a grassroots habit when I am in town — often Friday evenings near Double Bay and Saturday race-day spots. Schedules follow travel, not a corporate calendar. The Flower orders page carries current notes so you are not chasing rumours.`,
      `Premium members sometimes see bundled offers when tours pass through New South Wales. Everyday buyers still deal with Nati directly. Music and flowers share a small-business spine: invoices, vans, and showing up.`,
      `Princess appears on the home page because she is part of that spine — dance leadership, accounting, consulting while I travel. Outstanding people are rare. Credit them in public.`,
      `Read the May 24 newsletter issue for more community context. Order flowers on Flowers. Stream on Music. They are the same life, documented instead of split into unrelated brands.`,
    ],
  },
  {
    slug: "set-lists-theatres-and-encores",
    title: "Building a theatre set list from a 45-year catalogue",
    dateLabel: "July 22, 2024",
    dateIso: "2024-07-22",
    summary:
      "Openers, hinges, encores — how live order differs from the Black Horse album sequence.",
    body: [
      `An album sequence is for the living room. A set list is for bodies in seats. Black Horse opens with recent favourites and travels toward dance cuts. Live, I often start with a recognisable mid-tempo song so late arrivals still hear a complete thought, then move to rock, then a ballad, then a closer that lets people stand.`,
      `Kissing and Never Be The Same work as contemporary openers. Come on Babe and Baby Gonna Rock are hinges: they change the temperature of the room. I Want to Run Away is an encore that still makes sense if half the audience came for flowers-and-music family stories rather than club mixes.`,
      `Lily the Dancing Machine and the Turbo Club Mix are for rooms that want to move. We do not force them on a seated memorial-adjacent private event. That is respect, not a lack of catalogue.`,
      `Hay girls guy voice is a palette cleanser — a reminder that the catalogue includes humour and vocal casting, not only heartbreak. Glorious Days is chosen as one mix, not three, unless the theatre specifically wants a suite.`,
      `If you are booking, tell us the room: seated theatre, standing club, or private dinner. The set list is a letter to that room. Contact with those details saves everyone a rewrite the week of the show.`,
      `After a gig, the player is how people catch the songs they missed. Point them to Discography, not only a social clip. Clips vanish. Notes stay.`,
    ],
  },
  {
    slug: "streaming-masters-and-credits",
    title: "What you hear on the official player — and what the credits mean",
    dateLabel: "August 5, 2024",
    dateIso: "2024-08-05",
    summary:
      "Approved masters, Premium early access, and why AI or choir credits belong on the track.",
    body: [
      `The Music page streams approved masters from ${BUSINESS_NAME}. If a song is in the queue, it is cleared to be there. Featured cards on Home sample the same catalogue. There is no second secret playlist of other people’s recordings.`,
      `Premium early access is for selected masters as they are cleared — not a different artist. Public tracks remain free. If a mix is still in the studio, it is not on the player yet. That delay is quality control.`,
      `Credits matter. Choir, louder remaster, or AI-assisted production should be visible. Listeners comparing eras deserve honesty. Hidden tools are how “original” becomes a blurry word.`,
      `Lyrics appear in the player when we have a cleared sheet. If a song shows a placeholder, we have not finished the rights and layout work for that text. Do not assume the song is unfinished; the paperwork might be.`,
      `Search on this site looks through song titles, page descriptions, and journal articles. It is a map of our own material, not a web-wide engine. Use it to find Discography notes and newsletter issues.`,
      `Playback problems: tap play after the page loads, check volume, try Wi-Fi. Support documents the boring checks because they fix most tickets. For licensing, skip Support and go to Music Owner plus ${SUPPORT_EMAIL}.`,
    ],
  },
  {
    slug: "reading-the-catalogue-like-a-book",
    title: "Read the catalogue like a book, then press play",
    dateLabel: "August 12, 2024",
    dateIso: "2024-08-12",
    summary:
      "A map of this site for new listeners: About, journal, discography, newsletter, then the player.",
    body: [
      `A player without context looks like every other widget on the internet. ${SITE_NAME} is a songwriter with a documented catalogue. Start on About for the timeline. Read a journal essay for how a song or tour actually works. Open Discography for the fifteen Black Horse notes. Then press play.`,
      `Newsletter issues are dated articles — studio weeks, vinyl, flowers, listening paths — not image-only cards. Journal essays are longer and stay up as a library. Together they are the publisher side of the site. The player is the radio.`,
      `FAQ answers Premium, ads, bookings, and ownership without making you hunt. Privacy and cookie settings explain advertising consent. Login and cart pages do not show ads. Content pages do, labelled Advertisement, after enough text to be a page.`,
      `CDs and vinyl are physical chapters. Products photography is a catalogue of tour-life items with estimated prices until a batch ships. It is not an empty shop pretending to be open. Flowers are a real partnership with Nati Roses.`,
      `If you only have ten minutes: Kissing, Come on Babe (Version 2 — louder), I Want to Run Away. If you have an hour: the Listening guide, then Glorious Days three ways, then Black Horse in album order.`,
      `Share article URLs, not only a screenshot of the player. The words are the proof that this is a site with original content — the standard Google asks of publishers, and the standard we hold for our own audience.`,
    ],
  },
];

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}
