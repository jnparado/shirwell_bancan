import Link from "next/link";
import {
  BUSINESS_NAME,
  BUSINESS_WEBSITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PAGE_PATH,
  SUPPORT_PHONE,
  formatSupportPhoneDisplay,
  hasSupportPhone,
  supportMailto,
  supportTelHref,
} from "@/config/contact";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type CustomerSupportBlockProps = {
  showCopyFields?: boolean;
};

export function CustomerSupportBlock({ showCopyFields = false }: CustomerSupportBlockProps) {
  const supportUrl = absoluteUrl(SUPPORT_PAGE_PATH);
  const telHref = supportTelHref();
  const phoneDisplay = formatSupportPhoneDisplay();

  return (
    <section className={`${glassCard} p-5 sm:p-6`}>
      <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Customer support</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
        {BUSINESS_NAME} ({SITE_NAME}) — help with the website, music player, newsletter,
        subscriptions, and the Shirwell Music app.
      </p>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-zinc-500">Website</dt>
          <dd className="mt-1">
            <a
              href={BUSINESS_WEBSITE_URL}
              className="break-all text-[#FFC107] underline-offset-2 hover:underline"
            >
              {BUSINESS_WEBSITE_URL}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-500">Customer support URL</dt>
          <dd className="mt-1">
            <Link
              href={SUPPORT_PAGE_PATH}
              className="break-all text-[#FFC107] underline-offset-2 hover:underline"
            >
              {supportUrl}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-500">Email</dt>
          <dd className="mt-1">
            <a
              href={supportMailto("Shirwell support")}
              className="break-all text-[#FFC107] underline-offset-2 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-500">Phone</dt>
          <dd className="mt-1 text-zinc-300">
            {hasSupportPhone() && telHref ? (
              <a href={telHref} className="text-[#FFC107] underline-offset-2 hover:underline">
                {phoneDisplay}
              </a>
            ) : (
              <span className="text-zinc-400">
                Email {SUPPORT_EMAIL} — phone support line coming soon.
              </span>
            )}
          </dd>
        </div>
      </dl>

      {showCopyFields ? (
        <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-4 font-mono text-xs text-zinc-500">
          <p>Publisher Center — copy these values:</p>
          <p className="break-all">Website: {BUSINESS_WEBSITE_URL}</p>
          <p className="break-all">Support URL: {supportUrl}</p>
          <p className="break-all">Email: {SUPPORT_EMAIL}</p>
          <p className="break-all">
            Phone: {hasSupportPhone() ? SUPPORT_PHONE : "(set NEXT_PUBLIC_SUPPORT_PHONE)"}
          </p>
        </div>
      ) : null}
    </section>
  );
}

export function getCustomerSupportJsonLd(): Record<string, unknown> {
  const contactPoint: Record<string, unknown> = {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SUPPORT_EMAIL,
    url: absoluteUrl(SUPPORT_PAGE_PATH),
    areaServed: "AU",
    availableLanguage: ["English"],
  };

  if (hasSupportPhone()) {
    contactPoint.telephone = SUPPORT_PHONE;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: BUSINESS_WEBSITE_URL,
    contactPoint,
  };
}
