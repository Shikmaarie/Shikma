import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

// כפתור ותפריט נגישות. מבוסס על הווידג'ט מדף ה-DNA של העושר,
// עם תוספת עצירת אנימציות (בדף הזה יש הרבה תנועה). הסגנון ב-src/a11y.css.

const STORAGE_KEY = "a11y-settings-v1";

type Settings = {
  fontScale: number;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  stopMotion: boolean;
};

const defaults: Settings = {
  fontScale: 1,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  stopMotion: false,
};

function apply(s: Settings) {
  const root = document.documentElement;
  root.style.fontSize = s.fontScale === 1 ? "" : `${s.fontScale * 100}%`;
  root.classList.toggle("a11y-contrast", s.highContrast);
  root.classList.toggle("a11y-links", s.highlightLinks);
  root.classList.toggle("a11y-readable", s.readableFont);
  root.classList.toggle("a11y-still", s.stopMotion);
}

function A11yIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

const TOGGLES: { key: Exclude<keyof Settings, "fontScale">; label: string }[] = [
  { key: "highContrast", label: "ניגודיות גבוהה" },
  { key: "highlightLinks", label: "הדגשת קישורים" },
  { key: "readableFont", label: "גופן קריא" },
  { key: "stopMotion", label: "עצירת אנימציות" },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<Settings>(defaults);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = { ...defaults, ...JSON.parse(raw) };
        setS(saved);
        apply(saved);
      }
    } catch {
      /* אין גישה ל-localStorage: נשארים עם ברירת המחדל */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const update = (next: Settings) => {
    setS(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ההגדרה תחול עד רענון הדף */
    }
  };

  const scale = (d: number) =>
    update({ ...s, fontScale: Math.round(Math.min(1.6, Math.max(0.8, s.fontScale + d)) * 10) / 10 });

  return (
    <div className="a11y" dir="rtl">
      <button
        ref={btnRef}
        type="button"
        className="a11y__btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        <A11yIcon />
      </button>

      {open && (
        <div ref={panelRef} id="a11y-panel" className="a11y__panel" role="dialog" aria-label="תפריט נגישות">
          <div className="a11y__head">
            <h2>נגישות</h2>
            <button type="button" className="a11y__x" onClick={() => setOpen(false)} aria-label="סגירת תפריט הנגישות">
              ✕
            </button>
          </div>

          <div className="a11y__row">
            <span>גודל טקסט</span>
            <div className="a11y__steps">
              <button type="button" onClick={() => scale(-0.1)} aria-label="הקטנת טקסט">−</button>
              <output aria-live="polite">{Math.round(s.fontScale * 100)}%</output>
              <button type="button" onClick={() => scale(0.1)} aria-label="הגדלת טקסט">+</button>
            </div>
          </div>

          {TOGGLES.map((t) => (
            <button
              key={t.key}
              type="button"
              className="a11y__toggle"
              aria-pressed={s[t.key]}
              onClick={() => update({ ...s, [t.key]: !s[t.key] })}
            >
              {t.label}
            </button>
          ))}

          <button type="button" className="a11y__reset" onClick={() => update(defaults)}>
            איפוס הגדרות
          </button>
          <Link to="/accessibility" className="a11y__link" onClick={() => setOpen(false)}>
            להצהרת הנגישות
          </Link>
        </div>
      )}
    </div>
  );
}
