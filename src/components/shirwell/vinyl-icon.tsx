export function VinylIcon({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 ring-2 ring-zinc-600/80 ${className ?? ""}`}
      aria-hidden
    >
      <div className="absolute h-8 w-8 rounded-full border border-zinc-600/60" />
      <div className="h-4 w-4 rounded-full bg-[#FFC107] shadow-[0_0_10px_rgba(255,193,7,0.45)]" />
    </div>
  );
}
