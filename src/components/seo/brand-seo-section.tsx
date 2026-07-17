import Link from "next/link";
import { BRAND_FAQ, HOME_PATH, SITE_NAME, SITE_NAME_SHORT } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

/** Visible keyword-rich content + FAQ for Google (matches FAQPage JSON-LD). */
export function BrandSeoSection() {
  return (
    <section
      id="about-shirwell"
      className="border-t border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16"
      aria-labelledby="brand-seo-heading"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <div className={`${glassCard} p-6 sm:p-8`}>
          <h2
            id="brand-seo-heading"
            className="font-serif text-2xl font-bold tracking-tight text-[#FFC107] sm:text-3xl"
          >
            Shirwell Bancan — Official Shirwell Music
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Welcome to the official <strong className="text-zinc-100">{SITE_NAME}</strong>{" "}
            website — the home of <strong className="text-zinc-100">Shirwell music</strong>.
            Search for <strong className="text-zinc-100">Shirwell</strong>,{" "}
            <strong className="text-zinc-100">Shirwell Bancan</strong>, or{" "}
            <strong className="text-zinc-100">Shirwell music</strong> and you&apos;ll find
            original songs, the streaming player, and 45 years of music from{" "}
            {SITE_NAME_SHORT}.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Stream Shirwell Bancan songs on the{" "}
            <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
              Shirwell music player
            </Link>
            , read the{" "}
            <Link href="/about" className="text-[#FFC107] underline-offset-2 hover:underline">
              About Shirwell Bancan
            </Link>{" "}
            story, or explore featured tracks on the{" "}
            <Link href={HOME_PATH} className="text-[#FFC107] underline-offset-2 hover:underline">
              Shirwell home page
            </Link>
            .
          </p>
        </div>

        <div className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
            Frequently asked questions about Shirwell
          </h2>
          <dl className="mt-6 space-y-6">
            {BRAND_FAQ.map(({ question, answer }) => (
              <div key={question} className="border-t border-white/[0.06] pt-6 first:border-0 first:pt-0">
                <dt className="font-serif text-base font-semibold text-zinc-100 sm:text-lg">
                  {question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
