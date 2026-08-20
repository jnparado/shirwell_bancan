"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SiteSearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-6 flex w-full max-w-xl items-stretch justify-center"
    >
      <label htmlFor="site-search" className="sr-only">
        Search Shirwell
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs, albums, pages…"
        className="min-w-0 flex-1 rounded-l-xl border border-r-0 border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#FFC107]/40 focus:outline-none focus:ring-1 focus:ring-[#FFC107]/30"
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Search"
        className="inline-flex shrink-0 items-center justify-center rounded-r-xl border border-[#FFC107]/35 bg-[#FFC107] px-4 py-3 text-stone-950 transition hover:bg-[#e6ae06]"
      >
        <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
      </button>
    </form>
  );
}
