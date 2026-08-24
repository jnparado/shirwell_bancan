# AdSense — policy checklist (low value content)

Google listed these for `shirwell-bancan.vercel.app`:

1. [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
2. [Minimum content requirements](https://blog.google/products/adsense/how-to-address-insufficient-content/)
3. [Unique high-quality content and good UX](https://support.google.com/adsense/answer/7299563)
4. [Thin content (Search spam policies)](https://developers.google.com/search/docs/essentials/spam-policies#thin-content)
5. [Webmaster quality guidelines](https://developers.google.com/search/docs/essentials)

This repo is mapped to those rules below. Status stays **Needs attention** until Google re-reviews (from **25 Aug 2026**). Live paid ads still require **Ready** plus `NEXT_PUBLIC_ADSENSE_APPROVED=true`.

## 1. AdSense Program Policies

| Rule | What we do |
|------|------------|
| Ads only on pages with publisher content | `src/config/ads.ts` — no ads on login, profile, admin, `/products/cart`, empty search |
| Label ads clearly | Units use “Advertisement” (`AdSenseLabel`) |
| Do not encourage clicks | No “click our sponsors” copy |
| Do not put ads on checkout | Cart excluded from `isAdSenseAllowedPath` |
| Consent | Funding Choices / cookie settings before live fill |
| crawlers can read content | `robots.ts` allows `*` plus `AdsBot-Google` and `Mediapartners-Google` |

Home used to stack **five** ad placements around song cards. It now has **one** strip after the editorial block so ads are not the page.

## 2. Minimum content (not under construction)

Google rejects sites that look unfinished or are mostly images/players.

| Change | Why |
|--------|-----|
| **Journal** — 12 original essays | Volume of unique text reviewers can crawl |
| 5 newsletter issues with full bodies | Not image-only cards |
| Discography + listening guide + about | Catalogue context |
| Store copy is **catalogue preview**, not “coming soon” | “Coming soon” reads as under construction |

## 3. Unique high-quality content and UX

| Change | Why |
|--------|-----|
| First-person studio/tour essays | Original knowledge, not scraped blogs |
| Header/footer: Journal, Discography, FAQ, Newsletter | Clear navigation |
| Editorial on `/home` **above** the remaining ad | Reviewers see text first |
| About, Contact, Privacy, Terms, Support | Trust pages Google expects |

## 4. Thin content

Avoided: doorway pages, keyword stuffing, ads-only screens, affiliate pages with no original text.

Flowers and products include **written stories**. Journal essays are the long-form library. Search without a query does **not** show ads.

## 5. Webmaster quality

- Sitemap includes `/journal` and every essay (`src/lib/sitemap-xml.ts`)
- Canonical URLs on article pages
- Article JSON-LD on journal posts
- No cloaking; same HTML for users and crawlers

### Reviewer path

1. `/about`
2. `/journal` then any essay (e.g. `/journal/how-shirwell-writes-a-song`)
3. `/discography`
4. `/newsletter/2024-05-22`
5. `/listening-guide`
6. `/faq`
7. `/music` — scroll to editorial under the player

## Env

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375
# Leave unset until AdSense shows Ready:
# NEXT_PUBLIC_ADSENSE_APPROVED=true
```

Deploy, then request review after **25 Aug 2026**.
