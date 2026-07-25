import {
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  BUSINESS_WEBSITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PAGE_PATH,
  hasSupportPhone,
  formatSupportPhoneDisplay,
} from "@/config/contact";

export function AdminStoreSettingsPanel() {
  return (
    <dl className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.03]">
      {[
        { term: "Business name", value: BUSINESS_NAME },
        { term: "Website", value: BUSINESS_WEBSITE_URL },
        { term: "Support email", value: SUPPORT_EMAIL },
        { term: "Support page", value: BUSINESS_WEBSITE_URL + SUPPORT_PAGE_PATH },
        { term: "Location", value: BUSINESS_LOCATION },
        {
          term: "Support phone",
          value: hasSupportPhone() ? formatSupportPhoneDisplay() : "Not configured (NEXT_PUBLIC_SUPPORT_PHONE)",
        },
      ].map((row) => (
        <div key={row.term} className="grid gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-zinc-400">{row.term}</dt>
          <dd className="text-sm text-zinc-100 sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
