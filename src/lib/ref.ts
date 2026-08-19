/**
 * Referral tracking.
 *
 * A partner link looks like https://rachelihadad.co.il/?ref=inbal. The value is
 * captured on whichever page the visitor lands on, kept in localStorage so it
 * survives refreshes and internal navigation, and sent along with the checkout
 * so it reaches the Cardcom transaction — which is what turns "she registered
 * through Inbal" into "this sale is Inbal's".
 *
 * First touch wins: a visitor who arrives through one partner and later through
 * another stays with the first, so two partners can never bill for one buyer.
 */

const STORAGE_KEY = "rh_ref";

/**
 * Runs on the server too — the browser does not get to decide what reaches
 * Cardcom's reports. Anything that is not a short, plain slug is dropped.
 */
export function sanitizeRef(value: unknown): string {
  if (typeof value !== "string") return "";
  const slug = value.trim().toLowerCase();
  return /^[a-z0-9_-]{1,40}$/.test(slug) ? slug : "";
}

/** Stores the referral on first arrival and returns whichever one now holds. */
export function captureRef(): string {
  if (typeof window === "undefined") return "";

  const fromUrl = sanitizeRef(
    new URLSearchParams(window.location.search).get("ref"),
  );
  const stored = readStored();

  if (stored) return stored;
  if (fromUrl) write(fromUrl);
  return fromUrl;
}

/** The referral to attach to a purchase, or "" when there is none. */
export function getRef(): string {
  if (typeof window === "undefined") return "";
  return (
    readStored() ||
    sanitizeRef(new URLSearchParams(window.location.search).get("ref"))
  );
}

// Storage throws in private modes and when cookies are blocked. A visitor whose
// browser refuses to remember the referral still gets attributed on the page
// they landed on, which is better than failing the checkout over it.
function readStored(): string {
  try {
    return sanitizeRef(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return "";
  }
}

function write(ref: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, ref);
  } catch {
    /* ignore */
  }
}
