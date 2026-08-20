/**
 * Capacitor shell — loads the live Shirwell site in a WebView and shows
 * native AdMob paid banners via @capacitor-community/admob.
 *
 * Build: npx cap sync → open android/ or ios/ in Android Studio / Xcode
 */
const config = {
  appId: process.env.ANDROID_PACKAGE_NAME || "com.shirwell.music",
  appName: "Shirwell Music",
  webDir: "public",
  server: {
    url:
      process.env.CAPACITOR_SERVER_URL?.trim() ||
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "https://shirwell-bancan.vercel.app",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
  ios: {
    contentInset: "automatic",
  },
};

export default config;
