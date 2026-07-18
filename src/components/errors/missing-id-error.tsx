import Link from "next/link";

const card =
  "rounded-2xl border border-[#FFC107]/20 bg-[rgba(0,0,0,0.45)] p-6 shadow-[0_0_48px_rgba(255,193,7,0.08)] backdrop-blur-xl";

type Props = {
  /** Query or path parameter that was expected, e.g. `authorization_id`. */
  param?: string;
  title?: string;
  description?: string;
};

export function MissingIdError({
  param = "id",
  title = "Missing ID",
  description,
}: Props) {
  const body =
    description ??
    `This request is missing a required ${param} parameter. Check the link you followed and try again.`;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16">
      <div className={card}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC107]/70">
          Error 501
        </p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-[#FFC107]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">{body}</p>
        <p className="mt-3 font-mono text-xs text-zinc-500">missing {param}</p>
        <Link
          href="/home"
          className="mt-8 inline-flex text-sm font-semibold text-[#FFC107] underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
