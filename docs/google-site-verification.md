# Verify site ownership (Search Console / AdSense / AdMob developer URL)

Home page URL in Google products: **https://shirwell-bancan.vercel.app/home**

## 1. Search Console (do this first)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a **URL prefix** property: `https://shirwell-bancan.vercel.app` (not Domain — `*.vercel.app` DNS is not available).
3. Choose **HTML tag** verification.
4. Token must match `GOOGLE_SITE_VERIFICATION` in Vercel env (current: `YXnOZtZE3DI66I3y8cSj8Eu3iBGccXzKSN2PggjeESI`).
5. Deploy, then open **View source** on https://shirwell-bancan.vercel.app/home and confirm:
   ```html
   <meta name="google-site-verification" content="YXnOZtZE3DI66I3y8cSj8Eu3iBGccXzKSN2PggjeESI" />
   ```
6. Click **Verify** in Search Console.

## 2. AdSense / Publisher Center

- In AdSense → **Sites**, use the same URL and choose **“I’ve already verified using Search Console”** when offered.
- If Google shows a **new** meta token, update `GOOGLE_SITE_VERIFICATION` on Vercel and redeploy, then verify again.
- Keep **https://shirwell-bancan.vercel.app/ads.txt** and **/app-ads.txt** reachable (already in `public/`).

## 3. Vercel environment variables

Set for **Production**:

| Variable | Value |
|----------|--------|
| `GOOGLE_SITE_VERIFICATION` | `YXnOZtZE3DI66I3y8cSj8Eu3iBGccXzKSN2PggjeESI` |
| `NEXT_PUBLIC_SITE_URL` | `https://shirwell-bancan.vercel.app` |

Redeploy after changing env vars.

## OAuth consent screen (Google Cloud)

- **App name** in Google Cloud → OAuth consent screen should be **`Shirwell`** (matches `APP_NAME` on `/home`).
- **Home page URL** for verification: `https://shirwell-bancan.vercel.app/home`
- The home page includes an **About this application** section (`#app-purpose`) describing what the app does.

If Google still flags a name mismatch, set OAuth **App name** to exactly **`Shirwell`** (capital S) or update Cloud Console to match the visible hero title on `/home`.


- Google may have issued a **different** token in AdSense than Search Console — copy the exact token from the product you are verifying and update env.
- Wait a few minutes after deploy; use “Verify” again (not DNS on `vercel.app`).
- Optional legacy HTML files in `public/google*.html` — use only if Search Console asks for that specific filename.
