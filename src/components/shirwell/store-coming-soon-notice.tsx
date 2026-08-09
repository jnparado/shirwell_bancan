import {
  STORE_COMING_SOON_HEADLINE,
  STORE_COMING_SOON_LABEL,
  STORE_PRICE_ESTIMATE_NOTE,
  isStoreComingSoon,
} from "@/config/store";

const glassCard =
  "rounded-xl border border-[#FFC107]/20 bg-[rgba(255,193,7,0.08)] backdrop-blur-md";

type StoreComingSoonNoticeProps = {
  className?: string;
  /** Shorter copy for product detail */
  variant?: "banner" | "compact";
};

export function StoreComingSoonNotice({
  className = "",
  variant = "banner",
}: StoreComingSoonNoticeProps) {
  if (!isStoreComingSoon()) return null;

  if (variant === "compact") {
    return (
      <div
        className={`rounded-lg border border-[#FFC107]/25 bg-black/30 px-4 py-3 text-sm text-zinc-200 ${className}`}
        role="status"
      >
        <p className="font-semibold text-[#FFC107]">{STORE_COMING_SOON_LABEL}</p>
        <p className="mt-1 text-zinc-400">{STORE_PRICE_ESTIMATE_NOTE}</p>
      </div>
    );
  }

  return (
    <aside
      className={`${glassCard} p-5 sm:p-6 ${className}`}
      role="status"
      aria-label="Store notice"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#FFC107]">
        {STORE_COMING_SOON_LABEL}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-200 sm:text-[15px]">
        {STORE_COMING_SOON_HEADLINE}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{STORE_PRICE_ESTIMATE_NOTE}</p>
    </aside>
  );
}
