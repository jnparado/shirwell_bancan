type Props = {
  className?: string;
  /** Show “Bancan” under the wordmark. */
  showSubtitle?: boolean;
};

/** Scalable Shirwell wordmark — replaces third-party corporate logos in the UI. */
export function ShirwellWordmark({ className = "", showSubtitle = false }: Props) {
  return (
    <svg
      viewBox={showSubtitle ? "0 0 220 52" : "0 0 220 36"}
      className={className}
      role="img"
      aria-label="Shirwell Bancan"
    >
      <title>Shirwell Bancan</title>
      <text
        x="0"
        y="28"
        fill="#FFC107"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Shirwell
      </text>
      {showSubtitle ? (
        <text
          x="2"
          y="46"
          fill="#a1a1aa"
          fontFamily="system-ui, sans-serif"
          fontSize="11"
          fontWeight="500"
          letterSpacing="0.14em"
        >
          BANCAN
        </text>
      ) : null}
    </svg>
  );
}
