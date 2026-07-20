"use client";

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
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
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
        className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#FFC107]/40 focus:outline-none focus:ring-1 focus:ring-[#FFC107]/30"
        autoComplete="off"
      />
      <button
        type="submit"
        className="rounded-xl border border-[#FFC107]/35 bg-[#FFC107] px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06]"
      >
        Search
      </button>
    </form>
  );
}
