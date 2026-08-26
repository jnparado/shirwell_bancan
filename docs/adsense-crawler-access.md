# AdSense / AdMob crawler access (login information)

Google’s **Crawler access** form expects a classic **HTML POST login**, not Supabase’s client-side `/login` flow. This repo exposes a dedicated endpoint for that.

## Setup

1. Create a **dedicated Supabase user** (email + password) used only for crawling — not your personal account.
2. Set on Vercel (and locally if testing):

   ```env
   ADSENSE_CRAWLER_EMAIL=crawler@yourdomain.com
   ADSENSE_CRAWLER_PASSWORD=long-random-password
   # optional; default is /profile
   ADSENSE_CRAWLER_RESTRICTED_PATH=/profile
   ```

3. Deploy, then open `GET /adsense/crawler-login` and submit the same credentials once to confirm you land on the restricted path while signed in.

## AdMob / AdSense console form

Use the same origin as in **Search Console** / **AdMob app settings** (e.g. production or preview URL).

| Field | Example value |
| --- | --- |
| **Restricted directory or URL** | `https://shirwell-bancan.vercel.app/profile` |
| **Login URL** | `https://shirwell-bancan.vercel.app/adsense/crawler-login` |
| **Login method** | **POST** |
| **Login parameter** `username` | Same as `ADSENSE_CRAWLER_EMAIL` |
| **Login parameter** `password` | Same as `ADSENSE_CRAWLER_PASSWORD` |

Implementation:

- **GET** `/adsense/crawler-login` — simple HTML form (`username`, `password`).
- **POST** `/adsense/crawler-login` — `application/x-www-form-urlencoded` or `multipart/form-data`; validates against env when set; signs in via Supabase; redirects to the restricted path with session cookies.

Config helpers: `src/config/adsense-crawler.ts`.

## Do you need this?

Shirwell serves AdSense on **public** routes only (`src/config/ads.ts`). If you are not placing ad tags behind login, you can **leave crawler access empty** in AdMob. Add crawler login only if Google asks for access to a password-protected URL that contains ad code.

## Crawl check (ads.txt / robots / sitemap)

After deploy, open:

`https://shirwell-bancan.vercel.app/adsense/crawl`

Confirm `crawl.adsTxt.ok` is `true`, then in AdSense → Sites → **Check for updates**.

Also set `NEXT_PUBLIC_SITE_URL=https://shirwell-bancan.vercel.app` on Vercel so `robots.txt` does not point crawlers at a dead custom domain.
