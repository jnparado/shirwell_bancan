#!/usr/bin/env node
/**
 * Generates Black Horse CD cover SVGs — one per album track.
 * Run: node scripts/generate-black-horse-cd-covers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/cds/black-horse");

const tracks = [
  { slug: "kissing", trackNumber: 1, title: "Kissing", year: 2024 },
  { slug: "i-want-to-run-away", trackNumber: 2, title: "I Want to Run Away", year: 2025 },
  {
    slug: "come-on-babe-version-2-louder",
    trackNumber: 3,
    title: "Come on babe (Version 2 — louder)",
    year: 1979,
  },
  { slug: "black-horse", trackNumber: 4, title: "Black Horse", year: 1990 },
  { slug: "never-be-the-same", trackNumber: 5, title: "Never Be The Same", year: 2026 },
  { slug: "hay-girls-guy-voice", trackNumber: 6, title: "Hay girls guy voice", year: 2026 },
  {
    slug: "glorious-days-echoes-of-the-don",
    trackNumber: 7,
    title: "Glorious Days (Echoes of the Don)",
    year: 2026,
  },
  {
    slug: "glorious-days-girls-singing-two",
    trackNumber: 8,
    title: "Glorious Days (Girls Singing Two)",
    year: 2026,
  },
  {
    slug: "glorious-days-male-vocal",
    trackNumber: 9,
    title: "Glorious Days (Male Vocal)",
    year: 2026,
  },
  { slug: "baby-gonna-rock", trackNumber: 10, title: "Baby Gonna Rock", year: 1980 },
  { slug: "crazy-1", trackNumber: 11, title: "Crazy 1", year: 2026 },
  { slug: "without-yourlove", trackNumber: 12, title: "Without YourLove", year: 2026 },
  { slug: "1000-minutes-apart", trackNumber: 13, title: "1000 Minutes Apart", year: 2026 },
  {
    slug: "lily-the-dancing-machine",
    trackNumber: 14,
    title: "Lily the Dancing Machine",
    year: 2019,
  },
  {
    slug: "dancing-machine-turbo-club-mix",
    trackNumber: 15,
    title: "Dancing Machine (Turbo Club Mix)",
    year: 2025,
  },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxChars = 22) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function buildSvg({ trackNumber, title, year }) {
  const lines = wrapTitle(title);
  const titleY = lines.length === 1 ? 248 : lines.length === 2 ? 232 : 218;
  const titleLines = lines
    .map((line, i) => {
      const y = titleY + i * 34;
      const size = line.length > 24 ? 22 : line.length > 18 ? 26 : 30;
      return `<text x="200" y="${y}" text-anchor="middle" fill="#FFC107" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(title)} — Black Horse CD">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="45%" stop-color="#0a0806"/>
      <stop offset="100%" stop-color="#120e06"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffe082"/>
      <stop offset="50%" stop-color="#FFC107"/>
      <stop offset="100%" stop-color="#b8860b"/>
    </linearGradient>
    <radialGradient id="disc" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2218"/>
      <stop offset="70%" stop-color="#111"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="400" rx="12" fill="url(#bg)"/>
  <rect x="8" y="8" width="384" height="384" rx="8" fill="none" stroke="url(#gold)" stroke-width="2.5" opacity="0.85"/>
  <rect x="16" y="16" width="368" height="368" rx="6" fill="none" stroke="#FFC107" stroke-width="0.75" opacity="0.35"/>
  ${Array.from({ length: 18 }, (_, i) => {
    const x = 30 + (i * 19) % 340;
    const y = 24 + ((i * 37) % 360);
    const r = 0.6 + (i % 3) * 0.4;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFC107" opacity="${0.15 + (i % 5) * 0.08}"/>`;
  }).join("\n  ")}
  <text x="200" y="52" text-anchor="middle" fill="#d4af37" font-family="Georgia, serif" font-size="13" letter-spacing="3">SHIRWELL BANCAN</text>
  <text x="200" y="88" text-anchor="middle" fill="url(#gold)" font-family="Georgia, serif" font-size="28" font-weight="700" letter-spacing="2" filter="url(#glow)">BLACK HORSE</text>
  <text x="200" y="112" text-anchor="middle" fill="#a89878" font-family="Arial, sans-serif" font-size="9" letter-spacing="1.5">LIMITED EDITION CD</text>
  <rect x="40" y="128" width="320" height="2" fill="#FFC107" opacity="0.25"/>
  <circle cx="200" cy="168" r="28" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <text x="200" y="176" text-anchor="middle" fill="#FFC107" font-family="Arial, sans-serif" font-size="22" font-weight="700">${String(trackNumber).padStart(2, "0")}</text>
  ${titleLines}
  <text x="200" y="318" text-anchor="middle" fill="#8a7a62" font-family="Arial, sans-serif" font-size="11">${year ? `Written ${year}` : "Shirwell Bancan"}</text>
  <circle cx="200" cy="352" r="34" fill="url(#disc)" stroke="#333" stroke-width="1"/>
  <circle cx="200" cy="352" r="10" fill="#0a0806" stroke="#555" stroke-width="1"/>
  <circle cx="200" cy="352" r="3" fill="#222"/>
  <text x="200" y="396" text-anchor="middle" fill="#6b5d48" font-family="Arial, sans-serif" font-size="8" letter-spacing="1">45 YEARS · ONE TIMELESS ALBUM</text>
</svg>
`;
}

fs.mkdirSync(outDir, { recursive: true });

for (const track of tracks) {
  const file = path.join(outDir, `${track.slug}.svg`);
  fs.writeFileSync(file, buildSvg(track), "utf8");
  console.log("wrote", file);
}

console.log(`Generated ${tracks.length} CD covers in public/cds/black-horse/`);
