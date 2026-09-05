# Mobile store compliance — Play, App Store, AdMob, OAuth

Copy-paste reference for **Shirwell Music** native apps. Canonical config lives in `src/config/mobile-app.ts` and `src/lib/admob.ts`.

Production site: `https://shirwell-bancan.vercel.app`

---

## Shared URLs (all consoles)

| Field | Value |
|-------|--------|
| App / product name (stores) | **Shirwell Music** |
| OAuth consent app name | **Shirwell** (must match home page) |
| Home page | `https://shirwell-bancan.vercel.app/home` |
| Privacy policy | `https://shirwell-bancan.vercel.app/privacy` |
| Terms | `https://shirwell-bancan.vercel.app/terms` |
| Cookie / ad consent revocation | `https://shirwell-bancan.vercel.app/privacy/cookie-settings` |
| Support email | `shirwellentertainment@gmail.com` |
| Developer website (AdMob / app-ads.txt) | `https://shirwell-bancan.vercel.app` |

---

## Google OAuth consent screen (mobile + web)

**Google Cloud Console → APIs & Services → OAuth consent screen**

| Field | Value |
|-------|--------|
| App name | `Shirwell` |
| User support email | `shirwellentertainment@gmail.com` |
| App logo | Shirwell brand asset |
| Application home page | `https://shirwell-bancan.vercel.app/home` |
| Application privacy policy link | `https://shirwell-bancan.vercel.app/privacy` |
| Application terms of service link | `https://shirwell-bancan.vercel.app/terms` |
| Authorized domains | `shirwell-bancan.vercel.app` (+ custom domain if added) |

**Supabase → Authentication → URL Configuration**

Redirect URLs (add both):

```
https://shirwell-bancan.vercel.app/auth/callback
shirwell://auth/callback
```

Site URL: `https://shirwell-bancan.vercel.app` (no trailing slash)

**Android App Links:** deploy with `ANDROID_APP_LINK_SHA256` set → `/.well-known/assetlinks.json`

**iOS Universal Links:** deploy with `APPLE_TEAM_ID` set → `/.well-known/apple-app-site-association`

Native templates: `mobile/android/AndroidManifest.xml`, `mobile/ios/Info.plist.snippet`

---

## Google Play Console

### App identity

| Field | Value |
|-------|--------|
| App name | Shirwell Music |
| Package name | `com.shirwell.music` |
| Category | Music & Audio (or Entertainment) |

### Store listing

| Field | Value |
|-------|--------|
| Privacy policy URL | `https://shirwell-bancan.vercel.app/privacy` |
| Website | `https://shirwell-bancan.vercel.app/home` |
| Email | `shirwellentertainment@gmail.com` |

### App content → Advertising ID

Answer **Yes** — the app uses Google AdMob.

- **Does your app use advertising ID?** Yes  
- **Why?** Advertising or marketing, Analytics  
- Declare **`com.google.android.gms.permission.AD_ID`** in manifest (see `mobile/android/AndroidManifest.xml`)

### Data safety form

Use `MOBILE_DATA_TYPES` in `src/config/mobile-app.ts`. Summary:

| Data type | Collected | Shared | Purpose |
|-----------|-----------|--------|---------|
| Device or other IDs (Advertising ID / GAID) | Yes | Yes (Google AdMob) | Advertising, analytics |
| Email address | Yes | No | Account sign-in |

Privacy policy must describe GAID — see **Advertising ID / IDFA** section on `/privacy`.

### App signing → Digital Asset Links

1. Play Console → **App integrity** → **App signing** → copy **SHA-256 certificate fingerprint**
2. Set `ANDROID_APP_LINK_SHA256` in Vercel (colon-separated, e.g. `AA:BB:CC:...`)
3. Redeploy; confirm `https://shirwell-bancan.vercel.app/.well-known/assetlinks.json` returns JSON (not `[]` 404)

---

## App Store Connect

### App Information

| Field | Value |
|-------|--------|
| Name | Shirwell Music |
| Bundle ID | `com.shirwell.music` |
| Primary category | Music |
| Privacy Policy URL | `https://shirwell-bancan.vercel.app/privacy` |

### App Privacy (nutrition labels)

| Data type | Linked to user | Used for tracking | Purpose |
|-----------|----------------|-------------------|---------|
| Email Address | Yes | No | App Functionality |
| Device ID (IDFA) | No* | Yes | Third-Party Advertising |

\* IDFA is not linked to identity unless you pass it with account data — default AdMob usage is not linked.

**Privacy practices text:** copy `MOBILE_ADVERTISING_ID_DISCLOSURE` from `src/config/mobile-app.ts`.

### App Tracking Transparency (ATT)

Required before accessing IDFA for personalized ads.

**Info.plist key:** `NSUserTrackingUsageDescription`

Default string (also in `IOS_TRACKING_USAGE_DESCRIPTION`):

> Shirwell uses your device advertising identifier to show relevant ads and measure ad performance. You can change this anytime in Settings.

Request tracking **after** UMP consent flow, before loading personalized ads.

### Associated Domains

Xcode → Signing & Capabilities → **Associated Domains**:

```
applinks:shirwell-bancan.vercel.app
```

Set `APPLE_TEAM_ID` in Vercel; verify `/.well-known/apple-app-site-association`.

---

## Google AdMob

### App registration

| Platform | App name | Package / bundle |
|----------|----------|------------------|
| Android | Shirwell Music | `com.shirwell.music` |
| iOS | Shirwell Music | `com.shirwell.music` |

**App ID:** `ca-app-pub-2495432679632375~1624956947` (`ADMOB_APP_ID`)

**Ad units:**

| Platform | Type | ID |
|----------|------|-----|
| Android | Banner | `ca-app-pub-2495432679632375/1240791400` |
| iOS | Banner | `ca-app-pub-2495432679632375/5537125026` |
| Mediation | (optional) | `ca-app-pub-2495432679632375/4899465892` |

### app-ads.txt

Already served at `https://shirwell-bancan.vercel.app/app-ads.txt`. AdMob crawls your **developer website** domain — keep `NEXT_PUBLIC_SITE_URL` aligned.

If the developer website is `shirwel.com` but that domain is still Hostinger-parked (`robots.txt` = `Disallow: /`), AdMob will report “robots.txt prevented us from crawling.” Point DNS to Vercel first, or temporarily use `https://shirwell-bancan.vercel.app` as the developer website.

### Privacy & messaging (UMP)

1. AdMob → **Privacy & messaging** → **European regulations** → create message for your app
2. Implement UMP in native code: `mobile/android/AdMobConsentHelper.kt`, `mobile/ios/AdMobConsentHelper.swift`
3. **Revocation link:** `https://shirwell-bancan.vercel.app/privacy/cookie-settings`  
   Title: **Privacy and cookie settings**  
   Native app: call `showPrivacyOptions` (see `docs/admob-ump-native.md`)

### Advertising ID declaration (AdMob console)

When asked about **Advertising ID / IDFA**:

- **Android:** Yes — GAID via AdMob SDK  
- **iOS:** Yes — IDFA when user allows tracking (ATT)  
- Purpose: deliver and measure ads  
- Users can reset/limit in device settings (documented in privacy policy)

---

## Environment variables

Add to `.env` / Vercel:

```bash
# Package / bundle (must match Play & App Store)
ANDROID_PACKAGE_NAME=com.shirwell.music
IOS_BUNDLE_ID=com.shirwell.music
MOBILE_AUTH_SCHEME=shirwell

# Deep link verification (set before store review)
ANDROID_APP_LINK_SHA256=
APPLE_TEAM_ID=

# Optional overrides
NEXT_PUBLIC_MOBILE_PRIVACY_URL=https://shirwell-bancan.vercel.app/privacy
NEXT_PUBLIC_MOBILE_TERMS_URL=https://shirwell-bancan.vercel.app/terms
NEXT_PUBLIC_MOBILE_HOME_URL=https://shirwell-bancan.vercel.app/home
NEXT_PUBLIC_SUPPORT_EMAIL=shirwellentertainment@gmail.com

# AdMob (native only)
ADMOB_APP_ID=ca-app-pub-2495432679632375~1624956947
ADMOB_ANDROID_BANNER_AD_UNIT_ID=ca-app-pub-2495432679632375/1240791400
ADMOB_IOS_BANNER_AD_UNIT_ID=ca-app-pub-2495432679632375/5537125026
```

---

## Checklist before submission

- [ ] Privacy policy live with **Advertising ID / IDFA** section  
- [ ] OAuth home page shows **Shirwell** and app purpose (`/home`)  
- [ ] Supabase redirect URLs include `shirwell://auth/callback`  
- [ ] UMP consent runs before first ad request  
- [ ] ATT prompt on iOS (if using personalized ads)  
- [ ] In-app **Privacy and cookie settings** menu item  
- [ ] `assetlinks.json` + `apple-app-site-association` return 200 after env set  
- [ ] AdMob app linked to Play / App Store listing when published  

Native code templates: [`mobile/README.md`](../mobile/README.md)
