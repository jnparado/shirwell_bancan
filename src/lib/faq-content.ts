import { SUPPORT_EMAIL } from "@/config/contact";
import { SITE_NAME } from "@/lib/seo";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Who is Shirwell Bancan?",
    answer: `${SITE_NAME} is a singer, songwriter, and producer with more than 45 years of original music. This website is the official place to stream songs, read news, and learn about CDs, vinyl, and related products published by Shirwell Entertainment.`,
  },
  {
    question: "Is the music on this site original?",
    answer:
      "Yes. Tracks in the Music player are owned and published by Shirwell Entertainment unless otherwise credited. The Music Owner page describes copyright and licensing. We do not host pirated or third-party catalogue streams.",
  },
  {
    question: "How do I listen to Shirwell music?",
    answer:
      "Open the Music page and press play on any track. You can queue songs in the built-in player. Premium subscribers receive additional access described on the Premium page.",
  },
  {
    question: "What is the Black Horse album?",
    answer:
      "Black Horse is a limited-edition anthology CD and vinyl release collecting fifteen songs from across Shirwell’s career. Visit the CD’s page for artwork for every track and the Discography page for track-by-track notes.",
  },
  {
    question: "Can I buy CDs or merchandise?",
    answer:
      "Physical products are listed on the Products and CD’s pages. When the store is in coming-soon mode, you can browse photos and estimated prices but checkout may be disabled until inventory is ready.",
  },
  {
    question: "Do you sell flowers?",
    answer:
      "Shirwell Entertainment partners with Nati Roses for weddings, funerals, and events around Sydney. See the Flowers and Flower orders pages for varieties and ordering information.",
  },
  {
    question: "How does Premium work?",
    answer:
      "Premium offers unlimited streaming, early access to selected releases, and member benefits described on the Premium page. Web subscriptions may use Stripe; mobile apps may use Apple In-App Purchase when available.",
  },
  {
    question: "Why does this site show advertisements?",
    answer:
      "We use Google AdSense on content pages to help fund hosting and independent music production. Ads appear only on pages with substantial editorial content (music, articles, about, discography). Login, checkout, and account pages do not show ads. You can manage cookie and ad consent from Privacy and cookie settings in the footer.",
  },
  {
    question: "How do I contact Shirwell Entertainment?",
    answer: `Email ${SUPPORT_EMAIL} or use the Contact and Support pages. We respond to booking enquiries, order questions, and technical help for this website.`,
  },
  {
    question: "Where can I read news and updates?",
    answer:
      "The Newsletter section publishes full articles with text and images — studio news, release notes, and tour updates. Each issue is a standalone page you can bookmark or share.",
  },
];
