/** Shared newsletter issue data — used for RRM / Subscribe with Google article pages. */
export type NewsletterIssue = {
  id: string;
  dateLabel: string;
  headline: string;
  summary: string;
  src: string;
  alt: string;
};

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: "2024-05-22",
    dateLabel: "May 22, 2024",
    headline: "New music and live updates",
    summary:
      "Shirwell Bancan shares news from the studio, upcoming performances, and highlights from the official Shirwell music catalogue.",
    src: "/newsletters/2024-05-22.png",
    alt: "Shirwell Newsletter — May 22, 2024",
  },
  {
    id: "2024-05-23",
    dateLabel: "May 23, 2024",
    headline: "Black Horse and vinyl release",
    summary:
      "Details on the Black Horse limited-edition vinyl, album artwork, and how to explore physical releases alongside streaming on Shirwell Music.",
    src: "/newsletters/2024-05-23.png",
    alt: "Shirwell Newsletter — May 23, 2024",
  },
  {
    id: "2024-05-24",
    dateLabel: "May 24, 2024",
    headline: "Flowers, community, and the road",
    summary:
      "Notes from Shirwell on Nati Roses, local rose bunches around Sydney, and stories from decades on tour.",
    src: "/newsletters/2024-05-24.png",
    alt: "Shirwell Newsletter — May 24, 2024",
  },
];

export function getNewsletterIssue(id: string): NewsletterIssue | undefined {
  return NEWSLETTER_ISSUES.find((issue) => issue.id === id);
}

/** ISO 8601 date for schema.org from issue id (YYYY-MM-DD). */
export function newsletterIssueDatePublished(id: string): string {
  return `${id}T08:00:00+10:00`;
}
