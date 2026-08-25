/*
 * Regenerates the injected blocks in code.js.
 *
 * The plugin must not carry its own copy of the landing page's text — that
 * drifts the moment someone edits the site. The copy is read out of
 * src/data/partnerships.ts and src/data/site.ts at build time, and the
 * portrait is embedded from public/brand so the plugin needs no network
 * access at all.
 *
 *   node figma-plugin/build.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

/** Evaluate an `export const X = {...} as const;` data module as plain data. */
async function readDataModule(relPath, exportName) {
  const src = readFileSync(join(root, relPath), "utf8")
    .replace(/^export const/gm, "const")
    .replace(/ as const/g, "");
  const mod = `${src}\nexport default ${exportName};`;
  const url = "data:text/javascript;base64," + Buffer.from(mod, "utf8").toString("base64");
  return (await import(url)).default;
}

function inject(source, block, body) {
  const start = `/* ==== GENERATED:${block} ==== */`;
  const end = `/* ==== /GENERATED:${block} ==== */`;
  const from = source.indexOf(start);
  const to = source.indexOf(end);
  if (from === -1 || to === -1) throw new Error(`missing ${block} markers in code.js`);
  return source.slice(0, from + start.length) + "\n" + body + "\n" + source.slice(to);
}

const partnerships = await readDataModule("src/data/partnerships.ts", "partnerships");

/*
 * site.ts also exports types and typed consts, which the strip-and-import
 * trick above cannot survive. The plugin needs three scalars from it, so pull
 * exactly those and fail loudly if the shape ever moves.
 */
const siteSrc = readFileSync(join(root, "src/data/site.ts"), "utf8");
const scalar = (key) => {
  const m = siteSrc.match(new RegExp(`\\b${key}:\\s*"([^"]*)"`));
  if (!m) throw new Error(`site.ts: could not read ${key}`);
  return m[1];
};
const rolePartsRaw = siteSrc.match(/roleParts:\s*\[([^\]]*)\]/);
if (!rolePartsRaw) throw new Error("site.ts: could not read roleParts");
const site = {
  name: scalar("name"),
  email: scalar("email"),
  roleParts: [...rolePartsRaw[1].matchAll(/"([^"]*)"/g)].map((m) => m[1]),
};
if (site.roleParts.length !== 2) throw new Error("site.ts: expected two roleParts");

const portrait = readFileSync(join(root, "figma-plugin/portrait.jpg")).toString("base64");

const codePath = join(here, "code.js");
let code = readFileSync(codePath, "utf8");

code = inject(code, "COPY", `var COPY = ${JSON.stringify(partnerships, null, 0)};`);
code = inject(code, "SITE", `var SITE = ${JSON.stringify(site, null, 0)};`);
code = inject(code, "PORTRAIT", `var PORTRAIT_B64 = "${portrait}";`);

writeFileSync(codePath, code);
console.log(
  `code.js updated — copy ${JSON.stringify(partnerships).length}B, portrait ${Math.round(portrait.length / 1024)}KB base64`,
);
