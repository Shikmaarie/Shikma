/** מסגרת משותפת לעמודי מדיניות הפרטיות והצהרת הנגישות של MONEY TIME. */
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

const SHIKMA_URL = "https://celebrated-duckanoo-c56f2b.netlify.app/#contact";

export default function LegalLayout({
  title,
  updated,
  current,
  children,
}: {
  title: string;
  updated: string;
  current: "privacy" | "accessibility";
  children: ReactNode;
}) {
  return (
    <div dir="rtl" lang="he" className="paper-wash min-h-[100dvh] font-[Rubik,system-ui,sans-serif] text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-[hsl(var(--night)/0.94)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="lp-focus leading-none" aria-label="חזרה לעמוד MONEY TIME">
            <span className="font-display block text-[22px] text-paper md:text-[26px]">רחלי חדד</span>
            <span className="mt-1 block text-[11px] tracking-wide text-gold md:text-[12px]">
              מכפילה עסקים · בונה אימפריות
            </span>
          </Link>
          <Link
            to="/"
            className="lp-focus bg-gold-grad rounded-full px-5 py-2 text-[14px] font-semibold text-ink"
          >
            חזרה לעמוד הקורס
          </Link>
        </div>
      </header>

      <main className="px-4 pb-16 pt-32 sm:px-6 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="lp-fine text-ink-2">עודכן לאחרונה: {updated}</p>
          <h1 className="font-display mt-3 text-3xl text-ink md:text-4xl">{title}</h1>
          <div className="lp-body mt-8 space-y-8 text-ink-2">{children}</div>
        </div>
      </main>

      <footer className="border-t border-gold/25 bg-night px-4 py-8 sm:px-6">
        <div className="lp-fine mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-paper/60 sm:flex-row sm:text-right">
          <p>
            © 2026 רחלי חדד · כל הזכויות שמורות | עיצוב ובנייה:{" "}
            <a
              href={SHIKMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-focus underline decoration-gold/60 underline-offset-4 hover:text-paper"
            >
              שקמה אושרי אריה
            </a>
          </p>
          <nav className="flex gap-4">
            <Link to="/" className="lp-focus hover:text-paper">
              עמוד הקורס
            </Link>
            {current === "privacy" ? (
              <span className="text-paper">מדיניות פרטיות</span>
            ) : (
              <Link to="/privacy" className="lp-focus hover:text-paper">
                מדיניות פרטיות
              </Link>
            )}
            {current === "accessibility" ? (
              <span className="text-paper">הצהרת נגישות</span>
            ) : (
              <Link to="/accessibility" className="lp-focus hover:text-paper">
                הצהרת נגישות
              </Link>
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}
