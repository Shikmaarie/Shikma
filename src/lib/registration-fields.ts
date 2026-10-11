/**
 * Field definitions shared by the browser form and the server.
 *
 * Kept free of Node imports on purpose — the client bundle pulls this in,
 * while `@/lib/registrations` (storage, .xlsx) stays server-only.
 */

export const GRADES = [
  "גן",
  "טרום חובה",
  "חובה",
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "יא",
  "יב",
] as const;

export const GENDERS = ["זכר", "נקבה"] as const;

export type Grade = (typeof GRADES)[number];
export type Gender = (typeof GENDERS)[number];

export type ChildInput = {
  childName: string;
  gender: string;
  grade: string;
  school: string;
};

export type RegistrationInput = {
  parentName: string;
  phone: string;
  children: ChildInput[];
};

export const MAX_CHILDREN_PER_SUBMISSION = 12;

export function isGrade(value: string): value is Grade {
  return (GRADES as readonly string[]).includes(value);
}

export function isGender(value: string): value is Gender {
  return (GENDERS as readonly string[]).includes(value);
}

export function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

/** Returns the canonical 0XXXXXXXXX form, or "" when the number can't be one. */
export function normalizePhone(value: unknown): string {
  if (typeof value !== "string") return "";
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("972")) digits = `0${digits.slice(3)}`;
  if (!digits.startsWith("0")) return "";
  // Mobile numbers are 10 digits, landlines 9.
  if (/^0[57]\d{8}$/.test(digits)) return digits;
  if (/^0[23489]\d{7}$/.test(digits)) return digits;
  return "";
}

export function formatPhone(phone: string): string {
  if (/^0[57]\d{8}$/.test(phone)) {
    return `${phone.slice(0, 3)}-${phone.slice(3)}`;
  }
  if (/^0\d{8}$/.test(phone)) return `${phone.slice(0, 2)}-${phone.slice(2)}`;
  return phone;
}
