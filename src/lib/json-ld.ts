/** Safe JSON-LD serialization for inline script tags (XSS + hydration-stable). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
