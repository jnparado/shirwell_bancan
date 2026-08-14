import UIKit
import UserMessagingPlatform

/// Google UMP — call before GADMobileAds.sharedInstance().start(...)
/// @see docs/admob-ump-native.md
enum AdMobConsentHelper {

  static func requestConsent(from viewController: UIViewController, completion: @escaping () -> Void) {
    let params = RequestParameters()
    ConsentInformation.shared.requestConsentInfoUpdate(with: params) { _ in
      ConsentForm.loadAndPresentIfRequired(from: viewController) { _ in
        if ConsentInformation.shared.canRequestAds {
          completion()
        }
      }
    }
  }

  /// Settings → Privacy and cookie settings (AdMob revocation link requirement).
  static func showPrivacyOptions(from viewController: UIViewController) {
    ConsentForm.presentPrivacyOptionsForm(from: viewController) { _ in }
  }
}
