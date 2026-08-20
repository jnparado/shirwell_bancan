import { BUSINESS_NAME, SUPPORT_EMAIL } from "@/config/contact";
import {
  getAmpAdHeadScript,
  getAmpAutoAdsBodyTag,
  getAmpAutoAdsHeadScript,
  getAmpDisplayAdUnit,
  isAmpAutoAdsEnabled,
  isAmpDisplayAdEnabled,
} from "@/config/ads-amp";
import type { NewsletterIssue } from "@/lib/newsletter-issues";
import { SITE_NAME } from "@/lib/seo";

const AMP_BOILERPLATE = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`;

const AMP_CUSTOM_CSS = `<style amp-custom>
body{font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#e4e4e7;background:#0a0908;margin:0;padding:0 16px 32px}
a{color:#ffc107}
header,article,footer{max-width:42rem;margin:0 auto}
h1{font-size:1.75rem;color:#ffc107;margin:0.5rem 0 1rem}
.meta{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#71717a}
p{margin:0 0 1rem;font-size:0.95rem}
.footer-note{font-size:0.85rem;color:#a1a1aa;border-top:1px solid rgba(255,255,255,0.08);padding-top:1rem;margin-top:1.5rem}
.ad-slot{margin:1.25rem 0}
</style>`;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Valid AMP HTML for a newsletter issue with AdSense AMP ads. */
export function buildNewsletterAmpHtml(issue: NewsletterIssue, siteOrigin: string): string {
  const canonical = `${siteOrigin}/newsletter/${issue.id}`;
  const imageUrl = `${siteOrigin}${issue.src}`;
  const ampAutoAdsHead = isAmpAutoAdsEnabled() ? getAmpAutoAdsHeadScript() : "";
  const ampDisplayAdHead = isAmpDisplayAdEnabled() ? getAmpAdHeadScript() : "";
  const ampAutoAdsBody = isAmpAutoAdsEnabled() ? getAmpAutoAdsBodyTag() : "";
  const ampDisplayAd = isAmpDisplayAdEnabled()
    ? `<div class="ad-slot">${getAmpDisplayAdUnit()}</div>`
    : "";
  const bodyParagraphs = issue.body
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n          ");

  return `<!doctype html>
<html ⚡ lang="en-AU">
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    ${ampAutoAdsHead}
    ${ampDisplayAdHead}
    <title>${escapeHtml(issue.headline)} | ${escapeHtml(SITE_NAME)}</title>
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
    <meta name="description" content="${escapeHtml(issue.summary)}" />
    ${AMP_BOILERPLATE}
    ${AMP_CUSTOM_CSS}
  </head>
  <body>
    ${ampAutoAdsBody}
    <header>
      <p class="meta">${escapeHtml(issue.dateLabel)} · Newsletter</p>
      <h1>${escapeHtml(issue.headline)}</h1>
      <p>${escapeHtml(issue.summary)}</p>
    </header>
    ${ampDisplayAd}
    <article>
      ${bodyParagraphs}
      <amp-img
        src="${escapeHtml(imageUrl)}"
        alt="${escapeHtml(issue.alt)}"
        width="800"
        height="1000"
        layout="responsive"
      ></amp-img>
      <p class="meta">By ${escapeHtml(SITE_NAME)} · ${escapeHtml(BUSINESS_NAME)}</p>
    </article>
    <footer class="footer-note">
      <p>
        Read the full version:
        <a href="${escapeHtml(canonical)}">${escapeHtml(canonical)}</a>
      </p>
      <p>
        Questions:
        <a href="mailto:${escapeHtml(SUPPORT_EMAIL)}">${escapeHtml(SUPPORT_EMAIL)}</a>
      </p>
    </footer>
  </body>
</html>`;
}
