import { Bell, Lock } from "lucide-react";

export function ShirwellHeader() {
  return (
    <header className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFC107]/12 ring-2 ring-[#FFC107]/35">
          <span className="font-serif text-lg font-semibold text-[#FFC107]">S</span>
        </div>
        <h1 className="font-serif text-2xl font-semibold tracking-wide text-[#FFC107]">
          Shirwell
        </h1>
      </div>
      <div className="flex items-center gap-5 text-zinc-200">
        <button
          type="button"
          className="rounded-full p-1.5 hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="rounded-full p-1.5 hover:bg-white/5"
          aria-label="Lock"
        >
          <Lock className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
