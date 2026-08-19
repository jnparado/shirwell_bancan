import {
  AdSenseDisplayHorizontal,
  AdSenseDisplayRectangle,
  AdSenseDisplayResponsive,
  AdSenseLabel,
} from "@/components/ads/adsense-unit";

type Props = {
  className?: string;
  labelClassName?: string;
  horizontalClassName?: string;
  rectangleClassName?: string;
  /** standard = one strip; both = top and bottom on long pages */
  placement?: "standard" | "both";
  /** Include a full-width responsive display unit above the horizontal strip */
  showResponsive?: boolean;
};

function DisplayAdStrip({
  instancePrefix,
  horizontalClassName,
  rectangleClassName,
  showResponsive = false,
}: {
  instancePrefix: string;
  horizontalClassName: string;
  rectangleClassName: string;
  showResponsive?: boolean;
}) {
  return (
    <>
      <AdSenseLabel />
      {showResponsive ? (
        <AdSenseDisplayResponsive
          instanceId={`${instancePrefix}-responsive`}
          className={horizontalClassName}
        />
      ) : null}
      <AdSenseDisplayHorizontal
        instanceId={`${instancePrefix}-horizontal`}
        className={showResponsive ? `mt-3 ${horizontalClassName}` : horizontalClassName}
      />
      <div className="mt-3">
        <AdSenseDisplayRectangle
          instanceId={`${instancePrefix}-rectangle`}
          className={rectangleClassName}
        />
      </div>
    </>
  );
}

/** Standard display ad strip: horizontal banner + 300×250 rectangle. */
export function ContentPageAds({
  className = "px-4 py-6 sm:px-6",
  horizontalClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
  rectangleClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
  placement = "standard",
  showResponsive = false,
}: Props) {
  return (
    <>
      <div className={className}>
        <DisplayAdStrip
          instancePrefix="display"
          horizontalClassName={horizontalClassName}
          rectangleClassName={rectangleClassName}
          showResponsive={showResponsive}
        />
      </div>
      {placement === "both" ? (
        <div className={className}>
          <DisplayAdStrip
            instancePrefix="display-bottom"
            horizontalClassName={horizontalClassName}
            rectangleClassName={rectangleClassName}
          />
        </div>
      ) : null}
    </>
  );
}

/** Compact horizontal display ad above the fold. */
export function ContentPageAdTop({
  className = "px-4 py-4 sm:px-6",
  horizontalClassName = "rounded-xl border border-white/[0.06] bg-black/20 p-2",
}: Pick<Props, "className" | "horizontalClassName">) {
  return (
    <div className={className}>
      <AdSenseLabel />
      <AdSenseDisplayHorizontal
        instanceId="display-above-fold"
        className={horizontalClassName}
      />
    </div>
  );
}

/** Single responsive display unit — sidebar or in-feed. */
export function ContentPageDisplayResponsive({
  className = "px-4 py-4 sm:px-6",
  instanceId = "display-responsive",
}: {
  className?: string;
  instanceId?: string;
}) {
  return (
    <div className={className}>
      <AdSenseLabel />
      <AdSenseDisplayResponsive instanceId={instanceId} />
    </div>
  );
}
