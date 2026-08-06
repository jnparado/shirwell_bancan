# Install Google Mobile Ads SDK (AdMob ad unit deployment)

AdMob **ad unit deployment** requires the **Google Mobile Ads SDK** in your **native iOS or Android app**. This Next.js website uses **AdSense** only; it cannot install the Mobile Ads SDK via `pnpm`.

Use the IDs from `src/lib/admob.ts` / `.env`:

| Setting | Value |
|--------|--------|
| App ID | `ca-app-pub-2495432679632375~1624956947` |
| Banner ad unit | `ca-app-pub-2495432679632375/5537125026` |
| Mediation / deployment ad unit | `ca-app-pub-2495432679632375/4899465892` |

**Latest SDK versions (Aug 2026)** — also defined in `src/lib/admob.ts` as `GOOGLE_MOBILE_ADS_SDK`:

- **Android:** `play-services-ads:25.4.0`
- **Android UMP:** `user-messaging-platform:3.2.0`
- **iOS:** `Google-Mobile-Ads-SDK` **13.7.0**

After updating SDKs in your app, redeploy the app to the store (or internal test track). AdMob “ad unit deployment” in the console clears once Google detects the new SDK serving that ad unit.

---

## Android

### 1. Gradle (app `build.gradle.kts` or `build.gradle`)

```gradle
dependencies {
    implementation("com.google.android.gms:play-services-ads:25.4.0")
    implementation("com.google.android.ump:user-messaging-platform:3.2.0")
}
```

Project-level: use **Android Gradle Plugin 8+** and **minSdk 23+** (required for Mobile Ads SDK v24+).

### 2. `AndroidManifest.xml`

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-2495432679632375~1624956947"/>
```

### 3. Initialize + consent + load banner

```kotlin
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.AdRequest

// After UMP consent (see admob-ump-native.md):
MobileAds.initialize(this) {}
val adView = AdView(this)
adView.adUnitId = "ca-app-pub-2495432679632375/5537125026"
adView.loadAd(AdRequest.Builder().build())
```

Sync Gradle, run on a device, trigger a test ad. In AdMob → your ad unit → confirm deployment status updates (can take hours).

---

## iOS

### 1. CocoaPods (`Podfile`)

```ruby
platform :ios, '13.0'
pod 'Google-Mobile-Ads-SDK', '~> 13.7.0'
pod 'GoogleUserMessagingPlatform'
```

Then:

```bash
pod install --repo-update
```

Open the `.xcworkspace`, not `.xcodeproj`.

### 2. `Info.plist`

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-2495432679632375~1624956947</string>
<key>SKAdNetworkItems</key>
<array>
  <!-- Add SKAdNetwork IDs from AdMob docs when you enable iOS 14+ attribution -->
</array>
```

### 3. Initialize + load banner

```swift
import GoogleMobileAds

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    GADMobileAds.sharedInstance().start(completionHandler: nil)
    return true
  }
}
```

Use banner unit `ca-app-pub-2495432679632375/5537125026` on your `GADBannerView`.

---

## Capacitor (optional wrapper around this site)

If the Shirwell app is Capacitor-based, add the community plugin and align native SDK versions:

```bash
npm install @capacitor-community/admob
npx cap sync
```

Then set the same app ID and ad unit in the plugin config and bump native Gradle/Pods to the versions above. See [capacitor-community/admob](https://github.com/capacitor-community/admob).

---

## Web (this repo)

- **AdSense** script + ad slots — not Mobile Ads SDK.
- **`/app-ads.txt`** — required for AdMob app ↔ website linking.

Consent on web: `src/components/consent/google-ump-head.tsx`.

---

## Links

- [Android quick start](https://developers.google.com/admob/android/quick-start)
- [iOS quick start](https://developers.google.com/admob/ios/quick-start)
- [Android release notes](https://developers.google.com/admob/android/rel-notes)
- [iOS release notes](https://developers.google.com/admob/ios/rel-notes)
- [UMP native setup](./admob-ump-native.md)
