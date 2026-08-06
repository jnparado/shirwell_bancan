# AdMob UMP SDK (native iOS & Android)

The **User Messaging Platform (UMP) SDK** runs in your **Shirwell Music native app**, not in this Next.js website. The website uses **Funding Choices + Consent Mode** (`src/components/consent/google-ump-head.tsx`).

IDs are in `src/lib/admob.ts` and `.env`:

- `ADMOB_APP_ID=ca-app-pub-2495432679632375~1624956947`
- `ADMOB_BANNER_AD_UNIT_ID=ca-app-pub-2495432679632375/5537125026`

Create the GDPR / EEA message in **AdMob → Privacy & messaging → European regulations**, then wire the SDK below.

## Android (Kotlin)

**`build.gradle` (app module):**

```gradle
dependencies {
  implementation 'com.google.android.gms:play-services-ads:24.0.0'
  implementation 'com.google.android.ump:user-messaging-platform:3.1.0'
}
```

**`AndroidManifest.xml`:**

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-2495432679632375~1624956947"/>
```

**Request consent before loading ads:**

```kotlin
import com.google.android.ump.ConsentInformation
import com.google.android.ump.ConsentRequestParameters
import com.google.android.ump.UserMessagingPlatform

fun requestConsent(activity: Activity, onReady: () -> Unit) {
  val params = ConsentRequestParameters.Builder().build()
  val consentInfo = UserMessagingPlatform.getConsentInformation(activity)
  consentInfo.requestConsentInfoUpdate(
    activity,
    params,
    {
      UserMessagingPlatform.loadAndShowConsentFormIfRequired(activity) { _ ->
        if (consentInfo.canRequestAds()) onReady()
      }
    },
    { onReady() },
  )
}
```

Call `requestConsent` on launch, then initialize Mobile Ads and show banners with unit `ca-app-pub-2495432679632375/5537125026`.

## iOS (Swift)

**Podfile:**

```ruby
pod 'Google-Mobile-Ads-SDK'
pod 'GoogleUserMessagingPlatform'
```

**Info.plist:**

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-2495432679632375~1624956947</string>
```

**Request consent:**

```swift
import UserMessagingPlatform

func requestConsent(from vc: UIViewController, completion: @escaping () -> Void) {
  let params = RequestParameters()
  ConsentInformation.shared.requestConsentInfoUpdate(with: params) { error in
    ConsentForm.loadAndPresentIfRequired(from: vc) { _ in
      if ConsentInformation.shared.canRequestAds {
        completion()
      }
    }
  }
}
```

## Web verification

Publish `app-ads.txt` on your developer website (already at `/app-ads.txt` in this repo).

## References

- [UMP SDK Android](https://developers.google.com/admob/android/privacy)
- [UMP SDK iOS](https://developers.google.com/admob/ios/privacy)
- [Privacy & messaging (AdMob)](https://support.google.com/admob/answer/10107507)
