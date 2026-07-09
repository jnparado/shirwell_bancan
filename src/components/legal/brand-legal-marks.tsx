type BrandLegalMarksProps = {
  className?: string;
  /** Optional year shown with © (e.g. © 2025) */
  year?: number;
  size?: "sm" | "md";
  /** overlay = on images; inline = fixed corner stack */
  variant?: "overlay" | "inline";
};

/**
 * Shirwell brand marks — TM bottom-right, © directly below (standard poster layout).
 */
export function BrandLegalMarks({
  className = "",
  year,
  size = "sm",
  variant = "overlay",
}: BrandLegalMarksProps) {
  const textClass =
    size === "md"
      ? "text-[11px] sm:text-xs"
      : "text-[9px] sm:text-[10px]";

  const positionClass =
    variant === "overlay"
      ? "absolute bottom-2 right-2 z-10"
      : "relative flex flex-col items-end";

  return (
    <div
      className={`pointer-events-none leading-none text-white ${textClass} ${positionClass} ${className}`}
      aria-hidden
    >
      <span className="font-bold tracking-[0.14em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        TM
      </span>
      <span
        className="mt-1 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        title="Copyright"
      >
        ©{year != null ? ` ${year}` : ""}
      </span>
    </div>
  );
}
