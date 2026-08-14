import UIKit
import GoogleMobileAds

/// Example banner setup after UMP consent.
/// Banner unit: ADMOB_IOS_BANNER_AD_UNIT_ID
final class BannerAdViewController: UIViewController, BannerViewDelegate {

  private var bannerView: BannerView!

  override func viewDidLoad() {
    super.viewDidLoad()

    AdMobConsentHelper.requestConsent(from: self) { [weak self] in
      guard let self else { return }
      GADMobileAds.sharedInstance().start(completionHandler: nil)
      self.loadBanner()
    }
  }

  private func loadBanner() {
    bannerView = BannerView(adSize: AdSizeBanner)
    bannerView.adUnitID = "ca-app-pub-2495432679632375/5537125026"
    bannerView.rootViewController = self
    bannerView.delegate = self
    view.addSubview(bannerView)
    bannerView.load(Request())
  }
}
