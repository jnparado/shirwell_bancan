package com.shirwell.music

import android.app.Activity
import com.google.android.ump.ConsentRequestParameters
import com.google.android.ump.UserMessagingPlatform

/**
 * Google UMP — run before MobileAds.initialize.
 * @see docs/admob-ump-native.md
 */
object AdMobConsentHelper {

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

  /** Settings → Privacy and cookie settings (AdMob revocation link requirement). */
  fun showPrivacyOptions(activity: Activity, onDismiss: () -> Unit = {}) {
    UserMessagingPlatform.showPrivacyOptionsForm(activity) { onDismiss() }
  }
}
