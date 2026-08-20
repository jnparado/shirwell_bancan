# Shirwell native mobile app (Android & iOS)

Reference templates for **Google Play Console**, **App Store Connect**, **AdMob**, and **Google OAuth** compliance. Copy values from `src/config/mobile-app.ts` and `.env` — do not hard-code secrets in native projects.

## Quick links

| Topic | Doc |
|-------|-----|
| Play / App Store / AdMob / OAuth form values | [docs/mobile-store-compliance.md](../docs/mobile-store-compliance.md) |
| AdMob UMP (consent before ads) | [docs/admob-ump-native.md](../docs/admob-ump-native.md) |
| AdMob paid banners (Capacitor) | [docs/admob-paid-ads.md](../docs/admob-paid-ads.md) |
| Mobile Ads SDK versions | [docs/google-mobile-ads-sdk-install.md](../docs/google-mobile-ads-sdk-install.md) |

## Directory layout

```
mobile/
  android/          AndroidManifest, Gradle, Kotlin consent + banner helpers
  ios/              Info.plist, Podfile, Swift consent + banner helpers
```

These are **snippets**, not a full Gradle/Xcode project. Wire them into your Capacitor, React Native, or native shell.

## Environment (Vercel + local)

Set in `.env` / Vercel before deploying web verification files:

```bash
ANDROID_PACKAGE_NAME=com.shirwell.music
IOS_BUNDLE_ID=com.shirwell.music
MOBILE_AUTH_SCHEME=shirwell
ANDROID_APP_LINK_SHA256=AA:BB:...   # release keystore SHA-256 from Play App Signing
APPLE_TEAM_ID=XXXXXXXXXX            # Apple Developer → Membership
NEXT_PUBLIC_SITE_URL=https://shirwell-bancan.vercel.app
```

After deploy, verify:

- `https://YOUR-DOMAIN/.well-known/assetlinks.json` (404 until `ANDROID_APP_LINK_SHA256` is set)
- `https://YOUR-DOMAIN/.well-known/apple-app-site-association` (404 until `APPLE_TEAM_ID` is set)

## Supabase Auth redirects

Add to **Supabase → Authentication → URL Configuration → Redirect URLs**:

```
https://shirwell-bancan.vercel.app/auth/callback
shirwell://auth/callback
```

## OAuth deep link

Custom scheme: `shirwell://auth/callback` (see `getMobileAuthCallbackUrl()` in `src/config/mobile-app.ts`).

Android also supports App Links to `https://YOUR-DOMAIN/auth/callback` when `assetlinks.json` is live.
