# AdSense — low value content & getting ads live

## What happened

Google AdSense rejected **shirwell-bancan.vercel.app** for **Low value content**. Review is rate-limited — you can request again from **25 Aug 2026** (per the AdSense console).

Until the site status is **Ready**, Google will not serve **live** paid ads on your domain.

## What we fixed in the repo

1. **Full newsletter articles** — each `/newsletter/[date]` issue now has multiple paragraphs of original text (not just an image + one-line summary).
2. **`/discography`** — track-by-track notes for the Black Horse album (15 entries).
3. **`/faq`** — ten Q&A sections with FAQ schema for crawlers.
4. **Expanded `/about`** — career timeline and links to discography.
5. **Test ads on production** — until `NEXT_PUBLIC_ADSENSE_APPROVED=true`, ad units use `data-adtest="on"` so you can verify placement (Google sample ads).

## Env (Vercel)

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=4465041934
NEXT_PUBLIC_ADSENSE_SLOT_ENTERPRISES=4465041934
NEXT_PUBLIC_ADSENSE_SLOT_BOX=4465041934
# Leave unset or false until AdSense shows Ready:
# NEXT_PUBLIC_ADSENSE_APPROVED=true
```

Redeploy after changing env vars.

## Verify ads after deploy

1. Open **https://shirwell-bancan.vercel.app/music** or **/discography** (content pages with ad units).
2. Accept the cookie/consent banner if shown.
3. You should see **Google test ads** (labelled as test) in the “Advertisement” slots.
4. Confirm **https://shirwell-bancan.vercel.app/ads.txt** returns your publisher line.

## Before re-applying (25 Aug 2026)

- [ ] Deploy the content updates above.
- [ ] AdSense → **Sites** → confirm ownership still verified.
- [ ] Browse as a reviewer would: `/home`, `/about`, `/discography`, `/newsletter`, `/newsletter/2024-05-22`, `/faq`, `/music`, `/cds`.
- [ ] Ensure each page has **substantial original text**, not only players, login, or “coming soon” placeholders.
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
