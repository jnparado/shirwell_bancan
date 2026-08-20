# AdMob paid display ads (native app)

AdMob serves **paid display ads** in the **Shirwell Music native app** (Capacitor). It does **not** run inside a normal mobile browser or on the Vercel website — that uses **AdSense**.

| Platform | Ad product | Paid ads when |
|----------|------------|---------------|
| Web (Chrome, Safari) | AdSense display | Site status **Ready** in AdSense |
| Native app (Capacitor) | AdMob banner | App registered in AdMob + stores |

Your AdSense **Low value content** rejection does **not** block AdMob paid ads in the native app.

## How it works

1. `capacitor.config.ts` loads `https://shirwell-bancan.vercel.app` in a WebView.
2. `AdMobNativeProvider` in the site layout initializes `@capacitor-community/admob`.
3. UMP consent runs, then an **adaptive banner** shows at the bottom (Android `1240791400`, iOS `5537125026`).
4. AdSense `<ins>` units are **hidden** in the native shell to avoid duplicate ads.

## Env (.env / native build)

```bash
ADMOB_APP_ID=ca-app-pub-2495432679632375~1624956947
ADMOB_ANDROID_BANNER_AD_UNIT_ID=ca-app-pub-2495432679632375/1240791400
ADMOB_IOS_BANNER_AD_UNIT_ID=ca-app-pub-2495432679632375/5537125026
ADMOB_PAID_ADS=true
ADMOB_TEST_MODE=false
CAPACITOR_SERVER_URL=https://shirwell-bancan.vercel.app
```

For development only: `ADMOB_TEST_MODE=true`

## Build the native shell

```bash
npm install
npx cap add android   # first time only
npx cap add ios       # first time only
npm run cap:sync
```

Open `android/` in Android Studio or `ios/` in Xcode. Ensure:

- **Android:** `AndroidManifest.xml` has AdMob app ID meta-data (see `mobile/android/`)
- **iOS:** `Info.plist` has `GADApplicationIdentifier` (see `mobile/ios/`)

Deploy the app to Play / App Store and link it in AdMob → Apps.

## Verification

- `/app-ads.txt` on your domain (already deployed)
- AdMob → Privacy & messaging → European regulations message
- iOS: App Tracking Transparency prompt (required for personalized ads)

## Code

- `src/lib/admob-capacitor.ts` — init + paid banner
- `src/components/ads/admob-native-provider.tsx` — layout hook
- `src/lib/admob.ts` — IDs and `ADMOB_PAID_ADS` flag
