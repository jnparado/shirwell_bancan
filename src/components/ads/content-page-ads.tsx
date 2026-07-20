import { AdSenseBoxUnit, AdSenseEnterprisesUnit } from "@/components/ads/adsense-unit";

type Props = {
  className?: string;
  labelClassName?: string;
  enterprisesClassName?: string;
  boxClassName?: string;
};

/** Standard Enterprises + box ad strip for content pages. */
export function ContentPageAds({
  className = "px-4 py-6 sm:px-6",
  labelClassName = "mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-500",
  enterprisesClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
  boxClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
}: Props) {
  return (
    <div className={className}>
      <p className={labelClassName}>Advertisement</p>
      <AdSenseEnterprisesUnit className={enterprisesClassName} />
      <div className="mt-3">
        <AdSenseBoxUnit className={boxClassName} />
      </div>
    </div>
  );
}
