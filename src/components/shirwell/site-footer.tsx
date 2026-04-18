import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";

/** Matches marketing header — Shirwell gold luxury */
const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

const titleGold = "font-serif font-semibold text-[#FFC107]";

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const social = [
  { label: "Facebook", href: "https://facebook.com", Icon: IconFacebook },
  { label: "Instagram", href: "https://instagram.com", Icon: IconInstagram },
  { label: "X", href: "https://x.com", Icon: IconX },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#FFC107]/15 bg-black/50 pb-[calc(5.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:pb-12">
      {/* Premium — dark glass strip + inner glass cards */}
      <div className="border-b border-[#FFC107]/10 bg-[rgba(255,255,255,0.02)] px-4 py-8 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className={`${glassCard} flex max-w-xl flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5`}>
            <span
              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${glassCard} ring-1 ring-[#FFC107]/25`}
            >
              <Crown className="h-6 w-6 text-[#FFC107]" strokeWidth={1.5} />
            </span>
            <div className="text-left">
              <h2 className={`${titleGold} text-xl sm:text-2xl`}>
                Unlock Premium Access
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                Unlimited streaming, early releases, and member pricing on flowers and
                special bundles.
              </p>
            </div>
          </div>
          <Link
            href="/#featured"
            className={`${glassCard} shrink-0 rounded-full border-[#FFC107]/35 px-6 py-3.5 text-center text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/55 hover:bg-[rgba(255,255,255,0.08)] sm:self-center`}
          >
            Explore Plans
          </Link>
        </div>
      </div>

      <div className="px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-6">
            {/* Brand — glass card */}
            <div className="lg:col-span-3">
              <div
                className={`${glassCard} relative aspect-square w-full max-w-[220px] overflow-hidden shadow-[0_0_40px_rgba(255,193,7,0.06)]`}
              >
                <Image
                  src="/shirwell-logo.png"
                  alt="Shirwell — Shirwell Bancan"
                  fill
                  className="object-cover object-center"
                  sizes="220px"
                />
              </div>
            </div>

            {/* Story — glass card */}
            <div className={`${glassCard} lg:col-span-6`}>
              <p className="p-5 text-sm leading-relaxed text-zinc-300 sm:p-6 sm:text-[15px]">
                Bunches 💐 of Roses only $10. larger bunches $20 jumbo roses a little
                more 💐. Shirwell be wrapping up selling roses, he&apos;ll be moving on
                to his dream full time music blowing the world out with his unique
                approach to music popularity is growing quickly in the world as his
                app taking off all ages love his music, so catch up
              </p>
            </div>

            {/* Social — glass card */}
            <div className={`${glassCard} flex flex-col gap-4 p-5 lg:col-span-3 lg:items-stretch`}>
              <p className={`${titleGold} text-xs uppercase tracking-wider`}>Follow</p>
              <div className="flex flex-wrap items-center gap-3">
                {social.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${glassCard} flex h-11 w-11 items-center justify-center rounded-full border-[#FFC107]/15 p-0 text-zinc-300 transition hover:border-[#FFC107]/40 hover:text-[#FFC107]`}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columns — each a glass card */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className={`${glassCard} p-5 sm:p-6`}>
              <h3 className={`${titleGold} text-sm uppercase tracking-wider`}>Shop</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    href="/flowers"
                    className={`${glassCard} block rounded-lg px-3 py-2 text-zinc-300 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]`}
                  >
                    Flowers
                  </Link>
                </li>
                <li
                  className={`${glassCard} cursor-not-allowed rounded-lg px-3 py-2 text-[#FFC107]/40`}
                >
                  Bundles
                </li>
              </ul>
            </div>
            <div className={`${glassCard} p-5 sm:p-6`}>
              <h3 className={`${titleGold} text-sm uppercase tracking-wider`}>
                Support
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    href="/search"
                    className={`${glassCard} block rounded-lg px-3 py-2 text-zinc-300 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]`}
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@shirwell.example"
                    className={`${glassCard} block rounded-lg px-3 py-2 text-zinc-300 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${glassCard} p-5 sm:p-6`}>
              <h3 className={`${titleGold} text-sm uppercase tracking-wider`}>
                Company
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className={`${glassCard} block rounded-lg px-3 py-2 text-zinc-300 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]`}
                  >
                    About Us
                  </Link>
                </li>
                <li
                  className={`${glassCard} cursor-not-allowed rounded-lg px-3 py-2 text-[#FFC107]/40`}
                >
                  Careers
                </li>
                <li
                  className={`${glassCard} cursor-not-allowed rounded-lg px-3 py-2 text-[#FFC107]/40`}
                >
                  Press
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Shirwell Bancan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
