package com.shirwell.music

import android.app.Activity
import android.os.Bundle
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.MobileAds

/**
 * Entry activity — request UMP consent before initializing AdMob.
 * Banner unit: ADMOB_ANDROID_BANNER_AD_UNIT_ID (1240791400)
 */
class MainActivity : Activity() {

  private lateinit var adView: AdView

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    adView = findViewById(R.id.adView)
    adView.adUnitId = "ca-app-pub-2495432679632375/1240791400"

    AdMobConsentHelper.requestConsent(this) {
      MobileAds.initialize(this) {
        adView.loadAd(AdRequest.Builder().build())
      }
    }

    // Forward OAuth deep link to your WebView / Supabase client:
    // intent?.data → shirwell://auth/callback or https://.../auth/callback
  }

  override fun onPause() {
    adView.pause()
    super.onPause()
  }

  override fun onResume() {
    super.onResume()
    adView.resume()
  }

  override fun onDestroy() {
    adView.destroy()
    super.onDestroy()
  }
}
