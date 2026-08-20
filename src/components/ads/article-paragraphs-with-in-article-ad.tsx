"use client";

import {
  AdSenseInArticle,
  AdSenseLabel,
} from "@/components/ads/adsense-unit";

type Props = {
  paragraphs: readonly string[];
  /** Insert the in-article unit after this many paragraphs (AdSense recommends 2). */
  insertAfter?: number;
  paragraphClassName?: string;
  adClassName?: string;
  instanceId?: string;
};

/** Renders article paragraphs with an in-article ad ~2 paragraphs into the text. */
export function ArticleParagraphsWithInArticleAd({
  paragraphs,
  insertAfter = 2,
  paragraphClassName = "",
  adClassName = "my-6 rounded-xl border border-white/[0.06] bg-black/20 p-2",
  instanceId,
}: Props) {
  const splitAt = Math.min(insertAfter, paragraphs.length);
  const before = paragraphs.slice(0, splitAt);
  const after = paragraphs.slice(splitAt);
  const showAd = paragraphs.length >= insertAfter;

  return (
    <>
      {before.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
      {showAd ? (
        <div className={adClassName}>
          <AdSenseLabel />
          <AdSenseInArticle instanceId={instanceId ?? "in-article"} />
        </div>
      ) : null}
      {after.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
