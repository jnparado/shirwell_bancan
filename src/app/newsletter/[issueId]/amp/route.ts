import { buildNewsletterAmpHtml } from "@/lib/amp-newsletter-html";
import { getNewsletterIssue, NEWSLETTER_ISSUES } from "@/lib/newsletter-issues";
import { getSiteUrl } from "@/lib/seo";

type RouteContext = {
  params: Promise<{ issueId: string }>;
};

export async function generateStaticParams() {
  return NEWSLETTER_ISSUES.map((issue) => ({ issueId: issue.id }));
}

export async function GET(request: Request, { params }: RouteContext) {
  const { issueId } = await params;
  const issue = getNewsletterIssue(issueId);
  if (!issue) {
    return new Response("Not found", { status: 404 });
  }

  const origin = getSiteUrl({ host: new URL(request.url).host }).origin;
  const html = buildNewsletterAmpHtml(issue, origin);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
