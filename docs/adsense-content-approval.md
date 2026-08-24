# AdSense — low value content & getting ads live

## What happened

Google AdSense rejected **shirwell-bancan.vercel.app** for **Low value content**. Review is rate-limited — request again from **25 Aug 2026** (per the AdSense console).

Until the site status is **Ready**, Google will not serve **live** paid ads on your domain.

## Content quality updates (for reviewers)

| Page | What was added |
|------|----------------|
| `/home` | Editorial block moved **above** ad slots — About, FAQ, artist story, Black Horse deep-dive |
| `/music` | Full editorial article below the player — catalogue intro, listening guide, Black Horse overview |
| `/listening-guide` | **New** — curated path through the catalogue (first listens, vinyl vs stream) |
| `/about` | Artist story, recording philosophy, career timeline, links to discography |
| `/discography` | Longer per-track notes (15 entries) |
| `/newsletter` | Index with article excerpts + **5 full issues** (multi-paragraph bodies) |
| `/newsletter/*` | Full article pages + AMP mirrors |
| `/products` | Store editorial + full product stories |
| `/flowers` | History, weddings, memorials, pop-up bunches |
| `/faq` | **16** detailed Q&A items with FAQ schema |
| `/premium` | Editorial explaining benefits (not checkout-only) |
| `/support` | Topic guides (playback, accounts, billing, ads) |
| `/contact` | Bookings, licensing, press guidance |
| `/cds` | Vinyl/CD collecting guide + release story |

Shared copy lives in `src/lib/editorial-content.ts`.

## What AdSense reviewers should see

1. **Original text** — every content URL has multiple paragraphs written for this site.
2. **No image-only articles** — newsletter issues include full bodies, not just PNG cards.
3. **No ad-only screens** — ads on `/home`, `/music`, `/discography`, etc.; never on `/login`, `/profile`, `/products/cart`.
4. **Clear navigation** — header links to Discography, FAQ, Newsletter; footer links to editorial pages.
5. **Sitemap** — `/sitemap.xml` lists public editorial URLs including `/listening-guide`.

### Recommended reviewer path

1. `/about` — artist story and timeline  
2. `/discography` — 15 track notes  
3. `/newsletter/2024-05-22` — full studio article  
4. `/listening-guide` — catalogue guide  
5. `/faq` — policies and ads disclosure  
6. `/music` — scroll to editorial below player  

## Env (Vercel)

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375
NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY=4465041934
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=4465041934
NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL=4465041934
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=6607155384
# Leave unset or false until AdSense shows Ready:
# NEXT_PUBLIC_ADSENSE_APPROVED=true
```

Redeploy after changing env vars.

## Verify ads after deploy

1. Open **https://shirwell-bancan.vercel.app/discography** or **/listening-guide**.
2. Accept the cookie/consent banner if shown.
3. You should see **Google test ads** (`data-adtest="on"`) in “Advertisement” slots.
4. Confirm **https://shirwell-bancan.vercel.app/ads.txt** returns your publisher line.

## Before re-applying (25 Aug 2026)

- [ ] Deploy the latest content updates and `pnpm-lock.yaml` fix.
- [ ] AdSense → **Sites** → confirm ownership still verified (ads.txt **Authorized**).
- [ ] Browse as a reviewer: `/home`, `/about`, `/discography`, `/listening-guide`, `/newsletter`, `/newsletter/2024-05-22`, `/faq`, `/music`.
- [ ] Each page has **substantial original text**, not only players, login, or “coming soon” placeholders.
- [ ] Complete **Payments** profile in AdSense if not done.
- [ ] Request review only after deploy is live (not localhost).

## After approval

Set in Vercel:

```bash
NEXT_PUBLIC_ADSENSE_APPROVED=true
```

Redeploy — live ads replace test ads automatically.

## Ad placement rules

Ads only load on paths in `src/config/ads.ts` (`isAdSenseAllowedPath`). Auth, profile, cart, and admin pages are excluded per [AdSense policy](https://support.google.com/adsense/answer/1346295).
