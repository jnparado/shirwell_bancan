This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# shirwell_bancan

## Google AdSense (earn money)

This project already includes:

- `src/components/ads/adsense-script.tsx`: loads the AdSense script site-wide
- `src/components/ads/adsense-unit.tsx`: a reusable ad unit component
- `src/app/ads.txt/route.ts`: serves `https://your-domain.com/ads.txt` (required by AdSense)

### Configure

1. Copy `.env.example` → `.env.local`
2. Set:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2495432679632375`
   - (Optional) `NEXT_PUBLIC_ADSENSE_SLOT_BANNER=...` (your Ad Unit “slot id” number)

### Verify

- Visit `/ads.txt` on your deployed domain and confirm it returns a line like:
  `google.com, pub-2495432679632375, DIRECT, f08c47fec0942fa0`
- Deploy, then check the page source includes `adsbygoogle.js?client=ca-pub-...`

