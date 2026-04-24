"use client";

export function SiteMarks() {
  const year = new Date().getFullYear();

  return (
    <div className="pointer-events-none fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[60] select-none md:right-4">
      <div className="rounded-md border border-[#FFC107]/20 bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wide text-[#FFC107]/90 shadow-[0_0_24px_rgba(255,193,7,0.08)] backdrop-blur">
        (C) {year} Shirwell™
      </div>
    </div>
  );
}

