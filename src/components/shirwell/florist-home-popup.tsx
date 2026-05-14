"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const NATI_ROSES_URL =
  "https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH";

const AUTO_DISMISS_MS = 60_000;
const EXIT_MS = 380;

type Phase = "hidden" | "visible" | "leaving";

export function FloristHomePopup() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goLeaving = useCallback(() => {
    setPhase((p) => {
      if (p === "hidden" || p === "leaving") return p;
      return "leaving";
    });
  }, []);

  const dismiss = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    goLeaving();
  }, [goLeaving]);

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase("visible"));
    });
    hideTimerRef.current = setTimeout(goLeaving, AUTO_DISMISS_MS);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [goLeaving]);

  useEffect(() => {
    if (phase !== "leaving") return;
    exitTimerRef.current = setTimeout(() => setPhase("hidden"), EXIT_MS);
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "visible" && phase !== "leaving") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "visible") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, dismiss]);

  if (phase === "hidden") return null;

  const open = phase === "visible";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center p-4 pb-28 sm:items-center sm:p-6 sm:pb-6 ${
        open ? "bg-black/55 backdrop-blur-[2px]" : "bg-black/0 backdrop-blur-none"
      } transition-[background-color,backdrop-filter] duration-300 ease-out`}
      role="presentation"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="florist-popup-title"
        className={`relative max-h-[min(78vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#FFC107]/25 bg-gradient-to-b from-[#1a1510] via-[#14110e] to-black/95 p-5 shadow-[0_0_60px_rgba(255,193,7,0.15)] sm:p-7 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-[0.97] opacity-0"
        } transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:border-[#FFC107]/35 hover:bg-white/10 hover:text-[#FFC107]"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <p
          id="florist-popup-title"
          className="pr-10 font-serif text-lg font-semibold text-[#FFC107] sm:text-xl"
        >
          Nati Roses & Shirwell
        </p>
        <p className="mt-1 text-xs text-zinc-500">This notice closes automatically in about one minute.</p>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-200 sm:text-[15px]">
          <p>
            If you need a florist for weddings funerals special occasions contact the link
            nati Roses. Shirwell has been dealing with them for over 40 years highly
            recommends At middle Dural NSW just 45 to 50 minutes drive with no traffic from
            Sydney the heart To the beautiful Farm nati family.
          </p>
          <p>
            Or you can just call{" "}
            <a
              href="tel:+61296511375"
              className="font-semibold text-[#FFD54F] underline decoration-[#FFC107]/40 underline-offset-2"
            >
              02 9651 1375
            </a>{" "}
            Professional florists ready to go this link:{" "}
            <a
              href={NATI_ROSES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-medium text-[#FFC107] underline underline-offset-2 hover:text-[#FFD54F]"
            >
              {NATI_ROSES_URL}
            </a>
          </p>
          <p>
            For weddings Aventis and funeral. Shirwell if you like to get his cheap bunches
            of roses $10 or $20 Friday at Double Bay cosmopolitan next to fruit shop 5pm or
            round the Bay you see him. Saturday at Sidney horse races at 3pm on to finish
            times Other day you see him around castle Hill shops About 5pm
          </p>
        </div>
      </div>
    </div>
  );
}
