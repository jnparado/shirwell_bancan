import { serializeJsonLd } from "@/lib/json-ld";

type JsonLdScriptProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Inline schema.org JSON-LD — suppressHydrationWarning avoids dev false-positives. */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
