type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  trend?: string;
};

export function AdminStatCard({ label, value, hint, trend }: AdminStatCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.04)] p-4 backdrop-blur-md">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-2 font-serif text-3xl text-[var(--shirwell-gold)]">{value}</p>
      {hint ? <p className="mt-1 text-sm text-zinc-400">{hint}</p> : null}
      {trend ? <p className="mt-2 text-xs text-emerald-400/90">{trend}</p> : null}
    </div>
  );
}
