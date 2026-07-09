"use client";

import { useEffect, useRef, useState } from "react";

export function HomePromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div
        className={`home-promo-card mx-auto max-w-6xl rounded-2xl border border-white/[0.06] bg-black/35 px-5 py-8 backdrop-blur-xl sm:px-10 sm:py-10 ${
          visible ? "home-promo-visible" : ""
        }`}
      >
        <p className="home-promo-line home-promo-line-1 text-center text-base leading-relaxed text-white/90 sm:text-lg">
          Celebrate the season with new releases from Shirwell Bancan. Fresh tracks land
          through the year—listen to the featured set above, then explore more as new
          songs arrive.
        </p>
        <p className="home-promo-line home-promo-line-2 mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-zinc-400">
          Live and studio dates are announced here first. Thank you for supporting
          independent songwriters and the stories behind every verse.
        </p>
      </div>
    </section>
  );
}
