import Link from "next/link";
import {
  APP_NAME,
  APP_PURPOSE_DESCRIPTION,
  APP_PURPOSE_FEATURES,
  SITE_NAME,
} from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

/**
 * Visible “what is this app?” copy for Google OAuth / app verification crawlers.
 * Place near the top of `/home`.
 */
export function AppPurposeSection() {
  return (
    <section
      id="app-purpose"
      className="border-b border-white/[0.06] bg-black/30 px-4 py-10 sm:px-6 sm:py-12"
      aria-labelledby="app-purpose-heading"
    >
      <div className={`mx-auto max-w-6xl ${glassCard} p-6 sm:p-8`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#FFC107]/90">
          About this application
        </p>
        <h2
          id="app-purpose-heading"
          className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#FFC107] sm:text-3xl"
        >
          {APP_NAME}
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-400">
          Official web app for {SITE_NAME}
        </p>
        <p className="mt-5 text-base leading-relaxed text-zinc-200 sm:text-lg">
          {APP_PURPOSE_DESCRIPTION}
        </p>
        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          What you can do with {APP_NAME}
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
          {APP_PURPOSE_FEATURES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          Sign-in uses your {APP_NAME} account (email and password). We use account data
          only to run the app — see our{" "}
          <Link href="/privacy" className="text-[#FFC107] underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy/cookie-settings"
            className="text-[#FFC107] underline-offset-2 hover:underline"
          >
            cookie settings
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
