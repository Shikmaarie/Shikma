// ---------------------------------------------------------------------------
// שלב 2: מרכיב את צילום הדף על מסך לפטופ בתוך סצנה ממותגת,
// מרנדר פריים-פריים ומקודד ל-MP4 אנכי (1080×1920).
//
//   node tools/reel/render.mjs [--png]
//
// --png     : פריימים חסרי אבדן במקום JPEG. איטי משמעותית.
// --preview : פריים בודד לבדיקת קומפוזיציה.
//
// פלט: tools/reel/out/reel.mp4
// ---------------------------------------------------------------------------

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { config } from "./config.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "out");
// ברירת מחדל: פריימים ב-JPEG. פי כמה מהר מ-PNG, וההבדל לא נראה
// אחרי שאינסטגרם מקודדת מחדש. --png נותן פריימים חסרי אבדן.
const lossless = process.argv.includes("--png");
// --preview [שנייה] : שומר פריים בודד כ-PNG במקום לרנדר סרטון שלם.
const previewIdx = process.argv.indexOf("--preview");
const preview = previewIdx !== -1;
const previewAt = preview ? Number(process.argv[previewIdx + 1] || 0) : 0;

// גודל המסך בתוך מסגרת הלפטופ — חייב להתאים ל-stage.html
const SCREEN_W = 1008;
const SCREEN_H = Math.round(SCREEN_W * 0.625); // 16:10

// ---------------------------------------------------------------------------
// איתור ffmpeg: חבילת npm -> משתנה סביבה -> PATH -> החבילה של playwright
// ---------------------------------------------------------------------------
async function findFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const mod = await import("ffmpeg-static");
    if (mod.default) return mod.default;
  } catch {}
  const pw = "/opt/pw-browsers";
  if (existsSync(pw)) {
    const dir = readdirSync(pw).find((d) => d.startsWith("ffmpeg-"));
    if (dir) {
      const p = resolve(pw, dir, "ffmpeg-linux");
      if (existsSync(p)) return p;
    }
  }
  return "ffmpeg";
}

const easeInOut = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// ---------------------------------------------------------------------------
// נקודות העצירה: מפזרים יעדים לאורך הדף ומצמידים כל אחד לתחילת סקשן קרוב,
// כדי שהגלילה תיעצר על בלוק שלם ולא באמצע פסקה.
// ---------------------------------------------------------------------------
function buildStops(meta, maxScrollCss, count) {
  const tops = (meta.sectionTops || []).filter((y) => y > 40);
  const out = [0];
  for (let i = 1; i <= count; i++) {
    const target = (maxScrollCss * i) / count;
    let best = target;
    let bestD = Infinity;
    for (const y of tops) {
      const d = Math.abs(y - target);
      if (d < bestD && d < maxScrollCss / (count * 1.6)) {
        bestD = d;
        best = y;
      }
    }
    out.push(clamp(best, 0, maxScrollCss));
  }
  // ההצמדה יכולה לייצר כפילויות; שומרים על סדר עולה וייחודי
  const uniq = [];
  for (const y of out) {
    if (!uniq.length || y > uniq[uniq.length - 1] + 30) uniq.push(y);
  }
  if (uniq[uniq.length - 1] < maxScrollCss - 40) uniq.push(maxScrollCss);
  return uniq;
}

function stateAt(t, D, positions) {
  const { intro, outro, travelRatio } = config;
  const bodyDur = D - intro - outro;
  const legs = positions.length - 1;
  const segDur = bodyDur / Math.max(1, legs);
  const travel = segDur * travelRatio;

  let scroll = positions[0];
  if (t >= intro) {
    const bt = Math.min(t - intro, bodyDur);
    const i = Math.min(legs - 1, Math.floor(bt / segDur));
    const local = bt - i * segDur;
    const p = clamp(local / travel, 0, 1);
    scroll = lerp(positions[i], positions[i + 1], easeInOut(p));
  }

  const introP = clamp(t / intro, 0, 1);
  const overall = clamp(t / D, 0, 1);

  return {
    scroll: Math.round(scroll * 100) / 100,
    // פתיחה: מתקרבים מ-1.06 ל-1.0, ואז דחיפה איטית מאוד עד 1.045
    camScale:
      lerp(1.06, 1.0, easeInOut(introP)) + 0.045 * easeInOut(overall),
    camY: Math.sin(overall * Math.PI * 2) * 6,
    intro: easeInOut(introP),
    sweep: easeInOut(clamp(t / (intro * 1.15), 0, 1)),
    drift: overall,
  };
}

// ---------------------------------------------------------------------------

const meta = JSON.parse(await readFile(resolve(outDir, "page.json"), "utf8"));

const pageScale = SCREEN_W / meta.pageWidth;
const maxScroll = Math.max(0, meta.pageHeight * pageScale - SCREEN_H);
const maxScrollCss = maxScroll / pageScale;

const positions = buildStops(meta, maxScrollCss, config.stops).map(
  (y) => y * pageScale,
);

const D = config.duration;
const total = Math.round(D * config.fps);

console.log(
  `דף ${meta.pageWidth}×${meta.pageHeight} · ${positions.length - 1} מקטעי גלילה · ` +
    `${total} פריימים · ${D}s`,
);

await mkdir(outDir, { recursive: true });

// אם הדפדפן מותקן מחוץ ל-playwright (למשל בסביבת CI), אפשר להצביע עליו:
//   CHROMIUM_PATH=/path/to/chrome node capture.mjs
const launchOpts = process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH }
  : {};

const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({
  viewport: { width: config.width, height: config.height },
  deviceScaleFactor: 1,
});

await page.addInitScript(
  (reel) => {
    window.__REEL = reel;
  },
  { pageSrc: "out/page.png", overlay: config.overlay },
);

await page.goto(pathToFileURL(resolve(here, "stage.html")).href, {
  waitUntil: "load",
});
await page.evaluate(
  ([w, h]) => window.setScreenSize(w, h),
  [SCREEN_W, SCREEN_H],
);
await page.waitForFunction(() => window.imageReady(), null, { timeout: 30_000 });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(400);

if (preview) {
  await page.evaluate((s) => window.setFrame(s), stateAt(previewAt, D, positions));
  const file = resolve(outDir, `preview-${previewAt}s.png`);
  await page.screenshot({ path: file });
  await browser.close();
  console.log(`נשמר: ${file}`);
  process.exit(0);
}

const ffmpegPath = await findFfmpeg();
const outFile = resolve(outDir, "reel.mp4");

const ff = spawn(ffmpegPath, [
  "-y",
  "-f", "image2pipe",
  "-framerate", String(config.fps),
  "-i", "-",
  "-c:v", "libx264",
  "-profile:v", "high",
  "-pix_fmt", "yuv420p",
  "-crf", "18",
  "-preset", "medium",
  "-movflags", "+faststart",
  "-r", String(config.fps),
  outFile,
]);

let ffErr = "";
ff.stderr.on("data", (d) => (ffErr += d.toString()));
ff.on("error", (e) => {
  console.error(`\nלא נמצא ffmpeg (${ffmpegPath}). התקינו ffmpeg או הריצו:`);
  console.error("  npm i -D ffmpeg-static   (בתוך tools/reel)");
  throw e;
});

const write = (buf) =>
  new Promise((res) => (ff.stdin.write(buf) ? res() : ff.stdin.once("drain", res)));

const shotOpts = lossless ? { type: "png" } : { type: "jpeg", quality: 96 };

for (let f = 0; f < total; f++) {
  const t = f / config.fps;
  await page.evaluate((s) => window.setFrame(s), stateAt(t, D, positions));
  await write(await page.screenshot(shotOpts));
  if (f % 30 === 0 || f === total - 1) {
    process.stdout.write(`\rפריים ${f + 1}/${total}`);
  }
}

ff.stdin.end();
await new Promise((res, rej) =>
  ff.on("close", (code) =>
    code === 0 ? res() : rej(new Error(`ffmpeg יצא עם ${code}\n${ffErr.slice(-1500)}`)),
  ),
);
await browser.close();

console.log(`\nנשמר: ${outFile}`);
