/**
 * The parent registration sheet.
 *
 * One row per child, exactly like the original workbook
 * ("טבלת רישום ילדים ונוער מגילאי גן עד יב'"): a parent fills in their own
 * name and phone once, and adds a line for every child.
 *
 * Storage has two backends, picked from the environment:
 *   • Vercel KV / Upstash Redis (production) — appends are atomic, so two
 *     parents submitting at the same second can't overwrite each other.
 *   • A local file (development, self-hosting) — a JSON Lines log plus an
 *     .xlsx that is rewritten after every submission.
 */
import { buildXlsx, type XlsxColumn } from "@/lib/xlsx";

import {
  clean,
  formatPhone,
  isGender,
  isGrade,
  normalizePhone,
  MAX_CHILDREN_PER_SUBMISSION,
  type Gender,
  type Grade,
  type RegistrationInput,
} from "@/lib/registration-fields";

export * from "@/lib/registration-fields";

/** One stored row — a single child. */
export type Registration = {
  id: string;
  submittedAt: string;
  parentName: string;
  phone: string;
  childName: string;
  gender: Gender;
  grade: Grade;
  school: string;
};

/* ------------------------------------------------------------------ *
 * Column layout — matches the source workbook, column A first
 * ------------------------------------------------------------------ */

export const COLUMNS: XlsxColumn[] = [
  { header: "טלפון ההורה", width: 16 },
  { header: "שם אחד ההורים", width: 20 },
  { header: "שם הגן או בית הספר", width: 26 },
  { header: "כיתה", width: 10 },
  { header: "מין", width: 8 },
  { header: "שם ושם משפחה של הילד/ה", width: 26 },
  { header: "תאריך ההרשמה", width: 18 },
];

export function toRow(entry: Registration): string[] {
  return [
    formatPhone(entry.phone),
    entry.parentName,
    entry.school,
    entry.grade,
    entry.gender,
    entry.childName,
    formatDate(entry.submittedAt),
  ];
}

export function buildRegistrationsWorkbook(entries: Registration[]): Buffer {
  return buildXlsx({
    sheetName: "רישום",
    columns: COLUMNS,
    rows: entries.map(toRow),
  });
}

/* ------------------------------------------------------------------ *
 * Validation — the browser runs the same rules, the server decides
 * ------------------------------------------------------------------ */

export type Validated =
  | { ok: true; entries: Registration[] }
  | { ok: false; error: string };

export function validate(input: RegistrationInput): Validated {
  const parentName = clean(input.parentName);
  if (parentName.length < 2 || parentName.length > 60) {
    return { ok: false, error: "יש למלא את שם ההורה." };
  }

  const phone = normalizePhone(input.phone);
  if (!phone) {
    return { ok: false, error: "מספר הטלפון אינו תקין. לדוגמה: 050-1234567" };
  }

  const children = Array.isArray(input.children) ? input.children : [];
  if (children.length === 0) {
    return { ok: false, error: "יש להוסיף לפחות ילד/ה אחד/ת." };
  }
  if (children.length > MAX_CHILDREN_PER_SUBMISSION) {
    return {
      ok: false,
      error: `אפשר לרשום עד ${MAX_CHILDREN_PER_SUBMISSION} ילדים בטופס אחד.`,
    };
  }

  const submittedAt = new Date().toISOString();
  const entries: Registration[] = [];
  const seen = new Set<string>();

  for (const [i, child] of children.entries()) {
    const position = children.length > 1 ? ` (ילד/ה ${i + 1})` : "";
    const childName = clean(child?.childName);
    if (childName.length < 2 || childName.length > 60) {
      return { ok: false, error: `יש למלא את שם הילד/ה${position}.` };
    }
    if (!childName.includes(" ")) {
      return {
        ok: false,
        error: `יש לכתוב שם פרטי ושם משפחה של הילד/ה${position}.`,
      };
    }

    const gender = clean(child?.gender);
    if (!isGender(gender)) {
      return { ok: false, error: `יש לבחור מין${position}.` };
    }

    const grade = clean(child?.grade);
    if (!isGrade(grade)) {
      return { ok: false, error: `יש לבחור כיתה${position}.` };
    }

    const school = clean(child?.school);
    if (school.length < 2 || school.length > 80) {
      return {
        ok: false,
        error: `יש למלא את שם הגן או בית הספר${position}.`,
      };
    }

    const key = `${childName}|${grade}`;
    if (seen.has(key)) {
      return {
        ok: false,
        error: `"${childName}" מופיע/ה פעמיים באותה כיתה בטופס.`,
      };
    }
    seen.add(key);

    entries.push({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt,
      parentName,
      phone,
      childName,
      gender,
      grade,
      school,
    });
  }

  return { ok: true, entries };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(date);
}

/* ------------------------------------------------------------------ *
 * Storage
 * ------------------------------------------------------------------ */

const KV_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
const KV_KEY = process.env.REGISTRATIONS_KV_KEY || "registrations";

const LOCAL_DIR = process.env.REGISTRATIONS_DIR || "data";
const LOCAL_LOG = "registrations.jsonl";
export const LOCAL_XLSX = "registrations.xlsx";

export function storageBackend(): "kv" | "file" {
  return KV_URL && KV_TOKEN ? "kv" : "file";
}

export async function appendRegistrations(
  entries: Registration[],
): Promise<void> {
  if (storageBackend() === "kv") {
    await kv("rpush", [KV_KEY, ...entries.map((e) => JSON.stringify(e))]);
    return;
  }
  await appendToFile(entries);
}

export async function listRegistrations(): Promise<Registration[]> {
  if (storageBackend() === "kv") {
    const result = await kv<string[]>("lrange", [KV_KEY, "0", "-1"]);
    return result.flatMap(parseLine);
  }
  return readFromFile();
}

async function kv<T>(command: string, args: string[]): Promise<T> {
  const response = await fetch(KV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`KV ${command} failed: ${response.status}`);
  }
  const body = (await response.json()) as { result?: T; error?: string };
  if (body.error) throw new Error(`KV ${command} failed: ${body.error}`);
  return body.result as T;
}

function parseLine(line: string): Registration[] {
  try {
    const parsed = JSON.parse(line) as Registration;
    return parsed && parsed.childName ? [parsed] : [];
  } catch {
    return [];
  }
}

async function appendToFile(entries: Registration[]): Promise<void> {
  const { mkdir, appendFile, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  await mkdir(LOCAL_DIR, { recursive: true });
  await appendFile(
    join(LOCAL_DIR, LOCAL_LOG),
    entries.map((e) => `${JSON.stringify(e)}\n`).join(""),
    "utf8",
  );
  // Keep a real, always-current .xlsx next to the log.
  const all = await readFromFile();
  await writeFile(join(LOCAL_DIR, LOCAL_XLSX), buildRegistrationsWorkbook(all));
}

async function readFromFile(): Promise<Registration[]> {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  try {
    const text = await readFile(join(LOCAL_DIR, LOCAL_LOG), "utf8");
    return text.split("\n").filter(Boolean).flatMap(parseLine);
  } catch {
    return [];
  }
}
