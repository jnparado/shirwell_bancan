# AdSense ads for AMP

Google AMP ads only run on valid AMP HTML pages — not on the regular Next.js React site.

This repo serves AMP newsletter articles at `/newsletter/[id]/amp` with:

1. **Auto ads for AMP** — `<amp-auto-ads>` (AdSense → Auto ads for AMP)
2. **Manual display unit** — `<amp-ad>` slot `1200415498` (AdSense → Code generator → AMP)

## AMP URLs (live after deploy)

| Issue | Canonical | AMP (auto ads) |
|-------|-----------|----------------|
| May 22, 2024 | `/newsletter/2024-05-22` | `/newsletter/2024-05-22/amp` |
| May 23, 2024 | `/newsletter/2024-05-23` | `/newsletter/2024-05-23/amp` |
| May 24, 2024 | `/newsletter/2024-05-24` | `/newsletter/2024-05-24/amp` |

Example: `https://shirwell-bancan.vercel.app/newsletter/2024-05-22/amp`

## What is installed

**Auto ads — in `<head>` + after `<body>`:**

```html
<script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
<amp-auto-ads type="adsense" data-ad-client="ca-pub-2495432679632375"></amp-auto-ads>
```

**Manual display unit — in `<head>` + in article body:**

```html
<script async custom-element="amp-ad"
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">
</script>
<amp-ad width="100vw" height="320"
     type="adsense"
     data-ad-client="ca-pub-2495432679632375"
     data-ad-slot="1200415498"
     data-auto-format="rspv"
     data-full-width="">
  <div overflow=""></div>
</amp-ad>
```

Publisher ID and slot come from `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_SLOT_AMP` (`src/config/ads-amp.ts`).

Canonical pages link to AMP via `<link rel="amphtml">` in metadata.

## Env

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375
# NEXT_PUBLIC_ADSENSE_AMP_ENABLED=true   # default on when client id is set
```

## Validate

1. Deploy to Vercel.
2. Open an AMP URL (table above).
3. Use [AMP Validator](https://validator.ampproject.org/) — paste the AMP URL.
4. In AdSense, confirm Auto ads for AMP is enabled for your account.
5. Ads may take up to an hour to appear.

## Regular site (non-AMP)

`/home`, `/music`, etc. use **manual display ad units** + AdSense script (`src/components/ads/`), not AMP auto ads.

Code: `src/lib/amp-newsletter-html.ts`, `src/config/ads-amp.ts`
