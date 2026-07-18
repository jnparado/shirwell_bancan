/** Set `SITE_DOWN=false` in Vercel to bring the site back online. */
export function isSiteDown(): boolean {
  if (process.env.SITE_DOWN === "false") return false;
  return process.env.SITE_DOWN === "true" || process.env.MAINTENANCE_MODE === "true";
}

export function siteDownHtml(): string {
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Shirwell Bancan — Site temporarily unavailable</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(ellipse 90% 60% at 50% -8%, rgba(255,193,7,0.18), transparent 58%), #0a0806;
      color: #e4e4e7;
    }
    main {
      max-width: 28rem;
      width: 100%;
      border: 1px solid rgba(255,193,7,0.2);
      border-radius: 1rem;
      background: rgba(0,0,0,0.45);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 0 48px rgba(255,193,7,0.08);
    }
    .code {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255,193,7,0.7);
    }
    h1 {
      margin-top: 0.5rem;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.75rem;
      font-weight: 600;
      color: #ffc107;
    }
    p {
      margin-top: 1rem;
      font-size: 0.9375rem;
      line-height: 1.6;
      color: #d4d4d8;
    }
  </style>
</head>
<body>
  <main>
    <p class="code">503 — Temporarily unavailable</p>
    <h1>Shirwell Bancan</h1>
    <p>The website is temporarily down for maintenance. Please check back soon.</p>
  </main>
</body>
</html>`;
}
