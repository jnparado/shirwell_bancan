import {
  AdSenseBoxUnit,
  AdSenseEnterprisesUnit,
  AdSenseLabel,
} from "@/components/ads/adsense-unit";

type Props = {
  className?: string;
  labelClassName?: string;
  enterprisesClassName?: string;
  boxClassName?: string;
  /** standard = one full strip; both = strip at top and bottom of long pages */
  placement?: "standard" | "both";
};

function AdStrip({
  instancePrefix,
  enterprisesClassName,
  boxClassName,
}: {
  instancePrefix: string;
  enterprisesClassName: string;
  boxClassName: string;
}) {
  return (
    <>
      <AdSenseLabel />
      <AdSenseEnterprisesUnit
        instanceId={`${instancePrefix}-enterprises`}
        className={enterprisesClassName}
        format="horizontal"
      />
      <div className="mt-3">
        <AdSenseBoxUnit
          instanceId={`${instancePrefix}-box`}
          className={boxClassName}
        />
      </div>
    </>
  );
}

/** Standard Enterprises + box ad strip for content pages. */
export function ContentPageAds({
  className = "px-4 py-6 sm:px-6",
  enterprisesClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
  boxClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
  placement = "standard",
}: Props) {
  return (
    <>
      <div className={className}>
        <AdStrip
          instancePrefix="content"
          enterprisesClassName={enterprisesClassName}
          boxClassName={boxClassName}
        />
      </div>
      {placement === "both" ? (
        <div className={className}>
          <AdStrip
            instancePrefix="content-bottom"
            enterprisesClassName={enterprisesClassName}
            boxClassName={boxClassName}
          />
        </div>
      ) : null}
    </>
  );
}

/** Compact banner above the fold on high-traffic pages. */
export function ContentPageAdTop({
  className = "px-4 py-4 sm:px-6",
  enterprisesClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
}: Pick<Props, "className" | "enterprisesClassName">) {
  return (
    <div className={className}>
      <AdSenseLabel />
      <AdSenseEnterprisesUnit
        instanceId="above-fold"
        className={enterprisesClassName}
        format="horizontal"
      />
    </div>
  );
}
