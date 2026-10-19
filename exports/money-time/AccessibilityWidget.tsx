/**
 * כפתור ותפריט נגישות. הועתק מדף הכנס ”עושים אהבה עם הפחד מכסף” של רחלי
 * והותאם לפלטת MONEY TIME (זהב במקום קורל). המחלקות a11y-* על <html> מוגדרות
 * ב-src/styles.css.
 */
import { useEffect, useState } from "react";

type Settings = {
  fontScale: number;
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  motion: boolean;
  readable: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 0,
  contrast: false,
  grayscale: false,
  links: false,
  motion: false,
  readable: false,
};

const STORAGE_KEY = "a11y-settings";

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = settings.fontScale ? `${100 + settings.fontScale * 10}%` : "";
    root.classList.toggle("a11y-contrast", settings.contrast);
    root.classList.toggle("a11y-grayscale", settings.grayscale);
    root.classList.toggle("a11y-links", settings.links);
    root.classList.toggle("a11y-no-motion", settings.motion);
    root.classList.toggle("a11y-readable", settings.readable);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (key: Exclude<keyof Settings, "fontScale">) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const item = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`lp-focus w-full rounded-xl border px-3 py-2 text-right text-[15px] transition-colors ${
        active
          ? "border-[hsl(var(--gold-deep))] bg-[hsl(var(--gold-light)/0.3)] text-ink"
          : "border-gold/40 bg-paper text-ink-2 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* בנייד הכפתור יושב מעל פס ההצטרפות הדביק שבתחתית המסך */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="פתיחת תפריט נגישות"
        className="lp-focus fixed bottom-24 left-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-night text-[hsl(var(--gold-light))] shadow-[0_10px_30px_-14px_hsl(var(--night))] transition-transform hover:scale-105 md:bottom-4 md:h-14 md:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" fill="currentColor">
          <circle cx="12" cy="4" r="2" />
          <path d="M20 7.5c-2.5.9-5.2 1.3-8 1.3S6.5 8.4 4 7.5L3.4 9.4c1.9.7 3.9 1.1 5.9 1.3v2.1L7.1 20l2 .6 2.1-6.4h1.6l2.1 6.4 2-.6-2.2-7.2v-2.1c2-.2 4-.6 5.9-1.3L20 7.5Z" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="fixed bottom-40 left-4 z-[60] w-64 rounded-2xl border border-gold/40 bg-paper p-4 shadow-[0_24px_60px_-30px_hsl(var(--night))] md:bottom-20"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">נגישות</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט נגישות"
              className="lp-focus rounded-md px-2 text-ink-2 hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSettings((s) => ({ ...s, fontScale: Math.min(4, s.fontScale + 1) }))}
                aria-label="הגדלת גודל הטקסט"
                className="lp-focus flex-1 rounded-xl border border-gold/40 bg-paper py-2 text-ink-2 hover:text-ink"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setSettings((s) => ({ ...s, fontScale: Math.max(0, s.fontScale - 1) }))}
                aria-label="הקטנת גודל הטקסט"
                className="lp-focus flex-1 rounded-xl border border-gold/40 bg-paper py-2 text-ink-2 hover:text-ink"
              >
                A-
              </button>
            </div>
            {item("ניגודיות גבוהה", settings.contrast, () => toggle("contrast"))}
            {item("גווני אפור", settings.grayscale, () => toggle("grayscale"))}
            {item("הדגשת קישורים", settings.links, () => toggle("links"))}
            {item("עצירת אנימציות", settings.motion, () => toggle("motion"))}
            {item("גופן קריא", settings.readable, () => toggle("readable"))}
            <button
              type="button"
              onClick={() => setSettings(DEFAULTS)}
              className="lp-focus w-full rounded-xl border border-gold/40 bg-mist/60 py-2 text-[15px] text-ink hover:bg-mist"
            >
              איפוס הגדרות
            </button>
            <a
              href="/accessibility"
              className="lp-focus lp-fine block pt-1 text-center text-ink-2 underline decoration-gold underline-offset-4 hover:text-ink"
            >
              הצהרת נגישות
            </a>
          </div>
        </div>
      )}
    </>
  );
}
