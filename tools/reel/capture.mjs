// ---------------------------------------------------------------------------
// שלב 1: פותח את דף הנחיתה בדפדפן אמיתי, מגלגל אותו כדי לעורר lazy-load
// ואנימציות כניסה, ומצלם צילום מסך מלא + רשימת נקודות עצירה.
//
//   node tools/reel/capture.mjs [url]
//
// פלט: tools/reel/out/page.png  +  tools/reel/out/page.json
// ---------------------------------------------------------------------------

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "out");
const url = process.argv[2] || config.url;

// אם הדפדפן מותקן מחוץ ל-playwright (למשל בסביבת CI), אפשר להצביע עליו:
//   CHROMIUM_PATH=/path/to/chrome node capture.mjs
const launchOpts = process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH }
  : {};

const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({
  viewport: { width: config.viewportWidth, height: config.viewportHeight },
  deviceScaleFactor: config.deviceScaleFactor,
  locale: "he-IL",
});

console.log(`טוען ${url} ...`);
await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });

// גלילה איטית עד הסוף ובחזרה למעלה: מפעילה lazy-load ואנימציות scroll-reveal,
// כך שהצילום המלא יתפוס את הדף כשהוא כבר "ער".
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 700));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});

await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(800);

// אלמנטים דביקים מצטלמים שוב ושוב לאורך צילום מלא. מסתירים אותם.
if (config.hideFixed) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") el.style.visibility = "hidden";
    }
  });
}

// נקודות עצירה: הבלוקים הגדולים בדף. משמשות כדי שהגלילה בסרטון
// תיעצר על סקשנים ולא באמצע פסקה.
const meta = await page.evaluate(() => {
  const seen = new Set();
  const tops = [];
  const candidates = document.querySelectorAll(
    "section, main > div, main > article, body > div > section, [data-section]",
  );
  for (const el of candidates) {
    const r = el.getBoundingClientRect();
    if (r.height < 280) continue;
    const top = Math.round(r.top + window.scrollY);
    const key = Math.round(top / 40);
    if (seen.has(key)) continue;
    seen.add(key);
    tops.push(top);
  }
  return {
    pageWidth: document.documentElement.clientWidth,
    pageHeight: Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ),
    title: document.title,
    sectionTops: tops.sort((a, b) => a - b),
  };
});

await mkdir(outDir, { recursive: true });
await page.screenshot({ path: resolve(outDir, "page.png"), fullPage: true });
await writeFile(
  resolve(outDir, "page.json"),
  JSON.stringify({ url, ...meta }, null, 2),
);
await browser.close();

console.log(
  `נשמר: out/page.png  (${meta.pageWidth}×${meta.pageHeight} CSS px, ` +
    `${meta.sectionTops.length} סקשנים)`,
);
