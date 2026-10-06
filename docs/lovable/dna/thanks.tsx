/* =======================================================================
   src/routes/thanks.tsx — דף התודה שאחרי ההרשמה
   -----------------------------------------------------------------------
   העמוד הזה הוא לא "תודה ושלום". הוא השלב שמחליט כמה נרשמים באמת יגיעו,
   ולכן יש בו פעולה אחת ראשית בלבד: ההצטרפות לקבוצת הוואטסאפ, שם נשלח
   הלינק לזום ביום הכנס. כל השאר משני לו.
   ======================================================================= */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, MessageCircle, CalendarPlus, Video, Clock } from "lucide-react";

import logoGoldAsset from "@/assets/logo-gold.webp.asset.json";

const LOGO = logoGoldAsset.url;

const TITLE = "ההרשמה הושלמה | ה־DNA של העושר";
const DESCRIPTION = "המקום שלך לכנס שמור. השלב הבא: הצטרפות לקבוצת הוואטסאפ של הכנס.";

// קבוצת הוואטסאפ של הכנס. זהו הקישור מהגרסה הקודמת של העמוד.
// אם נפתחת קבוצה חדשה לכנס הזה, זה המקום היחיד שצריך לעדכן.
const WHATSAPP_GROUP =
  "https://chat.whatsapp.com/JDrsE8PmrPVJZACMbefRqo?s=cl&p=i&mlu=4&ilr=4";

/* שלושת הימים, בשעון UTC. אוקטובר 2026 הוא עדיין שעון קיץ בישראל
   (UTC+3), ולכן 9:30-12:30 מקומי הם 06:30-09:30 ב-UTC. כתיבה ב-UTC
   חוסכת VTIMEZONE ולא משתנה לפי אזור הזמן של מי שמוריד. */
const DAYS = [
  { n: 1, t: "הקוד הסמוי של הכסף", start: "20261013T063000Z", end: "20261013T093000Z" },
  { n: 2, t: "מלכודת ההכנסה", start: "20261014T063000Z", end: "20261014T093000Z" },
  { n: 3, t: "מפת העושר", start: "20261015T063000Z", end: "20261015T093000Z" },
];

export const Route = createFileRoute("/thanks")({
  component: ThanksPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // דף תודה לא אמור להופיע בגוגל. מי שמגיע אליו ישירות לא נרשם.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/thanks" }],
  }),
});

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`lp-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* אירוע Lead לפיקסל של מטא. בלי אירוע בנקודה הזו הקמפיין לא יודע
   מי נרשם ולא יכול לבצע אופטימיזציה. נורה פעם אחת בלבד בכל טעינה. */
function useLeadPixel() {
  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    try {
      w.fbq?.("track", "Lead");
    } catch {
      /* הפיקסל לעולם לא יפיל את העמוד */
    }
  }, []);
}

function buildIcs() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const esc = (v: string) => v.replace(/([,;\\])/g, "\\$1");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Racheli Hadad//DNA of Wealth//HE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  DAYS.forEach((d) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:dna-of-wealth-day-${d.n}@rachelihadad.co.il`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${d.start}`,
      `DTEND:${d.end}`,
      `SUMMARY:${esc(`ה־DNA של העושר · יום ${d.n}: ${d.t}`)}`,
      `DESCRIPTION:${esc("הכנס מתקיים בזום. הלינק נשלח בקבוצת הוואטסאפ של הכנס ביום הכנס.")}`,
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  // RFC 5545 דורש CRLF. ללא זה חלק מלקוחות היומן פשוט לא פותחים את הקובץ.
  return lines.join("\r\n");
}

function AddToCalendar() {
  const [busy, setBusy] = useState(false);
  const download = () => {
    setBusy(true);
    try {
      const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dna-of-wealth.ics";
      document.body.appendChild(a);
      a.click();
      a.remove();
      // משחררים את ה-Blob רק אחרי שהדפדפן הספיק להתחיל את ההורדה.
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button
      type="button"
      onClick={download}
      disabled={busy}
      className="lp-focus inline-flex items-center justify-center gap-2.5 rounded-full border border-tq/35 px-7 py-3.5 text-[16px] font-bold text-tq transition hover:bg-tq/5"
    >
      <CalendarPlus className="size-5" aria-hidden />
      הוסיפו את שלושת הימים ליומן
    </button>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[hsl(var(--void)/0.9)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-2.5 sm:px-6">
        <Link to="/" className="lp-focus">
          <img
            src={LOGO}
            alt="רחלי חדד · מכפילה עסקים · בונה אימפריות"
            loading="eager"
            className="h-10 w-auto md:h-12"
          />
        </Link>
      </div>
    </header>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="rounded-[20px] border border-hairline bg-sheet-2 px-6 py-7 text-center">
      <span className="mb-2 block text-[13px] font-bold tracking-[0.18em] text-gold">{n}</span>
      <h3 className="lp-display text-ink [font-size:clamp(19px,3.4vw,23px)]">{title}</h3>
      <p className="mt-2.5 text-[17px] leading-[1.7] text-body">{body}</p>
    </li>
  );
}

function ThanksPage() {
  useLeadPixel();

  return (
    <div className="min-h-screen overflow-x-hidden bg-void font-[Assistant,system-ui,sans-serif] text-body">
      <Header />

      <main className="px-2 pb-16 pt-24 sm:px-0 sm:pt-28">
        <div className="mx-auto max-w-[44rem] rounded-[20px] bg-sheet p-1.5 shadow-[0_50px_110px_-60px_hsl(0_0%_0%/0.9)] sm:rounded-[30px] sm:p-2.5">
          {/* ----- האישור ----- */}
          <div className="px-5 py-10 text-center sm:px-[30px] sm:py-[52px]">
            <Reveal>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-sheet-2 ring-1 ring-tq/20 md:size-24">
                <Check className="size-10 text-tq md:size-12" strokeWidth={2.5} aria-hidden />
              </div>
            </Reveal>

            <Reveal delay={110}>
              <h1 className="lp-display mt-7 text-ink [font-size:clamp(28px,5.8vw,44px)]">
                ההרשמה הושלמה.
                <br />
                <span className="lp-grad">המקום שלך שמור.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-hairline bg-sheet-2 px-[22px] py-[11px] text-[15px] text-body">
                <span className="inline-flex items-center gap-1.5">
                  <Video className="size-4 text-tq" aria-hidden />
                  בזום
                </span>
                <span className="size-[5px] rounded-full bg-gold" aria-hidden />
                <span>13–15 באוקטובר</span>
                <span className="size-[5px] rounded-full bg-gold" aria-hidden />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-tq" aria-hidden />
                  9:30-12:30
                </span>
              </div>
            </Reveal>
          </div>

          {/* ----- הפעולה האחת שחשובה ----- */}
          <div className="border-t border-hairline">
            <div className="lp-dark m-3.5 rounded-[22px] bg-night px-6 py-8 text-center sm:px-7">
              <Reveal>
                <h2 className="lp-display text-sheet [font-size:clamp(21px,4.2vw,26px)]">
                  נשאר דבר אחד: <span className="lp-grad">הצטרפו לקבוצה</span>
                </h2>
                <p className="mt-2 text-[17px] leading-relaxed text-[hsl(196_11%_74%)]">
                  הלינק לזום נשלח בקבוצת הוואטסאפ של הכנס, ביום הכנס. בלי הקבוצה לא תקבלו אותו.
                </p>
                <a
                  href={WHATSAPP_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-focus group mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-bl from-tq-soft to-[hsl(170_44%_76%)] px-8 py-4 text-[17px] font-extrabold text-[hsl(188_71%_9%)] shadow-[0_16px_34px_-14px_hsl(var(--tq-soft)/0.75)] transition hover:brightness-110"
                >
                  <MessageCircle className="size-5" aria-hidden />
                  להצטרפות לקבוצת הוואטסאפ
                </a>
                <p className="lp-fine mt-3 text-[hsl(192_11%_66%)]">
                  בקבוצה יישלחו הלינק, התזכורות וההקלטות.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ----- מה קורה מכאן ----- */}
          <div className="border-t border-hairline px-5 py-9 text-center sm:px-[30px] sm:py-[46px]">
            <Reveal>
              <p className="text-[13px] font-bold tracking-[0.2em] text-gold">מה קורה מכאן</p>
              <h2 className="lp-display mt-3.5 text-ink [font-size:clamp(28px,5.8vw,44px)]">
                שלושה צעדים, שתי דקות
              </h2>
              <ol className="mt-6 grid list-none gap-3.5 p-0 md:grid-cols-3">
                <Step
                  n="01"
                  title="הצטרפו לקבוצה"
                  body="זה הערוץ היחיד שבו נשלח הלינק לזום. הכפתור למעלה."
                />
                <Step
                  n="02"
                  title="שריינו את הזמן"
                  body="שלושה בוקרים, 9:30 עד 12:30. הכניסו אותם ליומן עכשיו."
                />
                <Step
                  n="03"
                  title="הגיעו עם שאלה"
                  body="לא כדי לשמוע על כסף, אלא כדי להסתכל על המספרים שלכם אחרת."
                />
              </ol>
              <div className="mt-7">
                <AddToCalendar />
              </div>
            </Reveal>
          </div>

          {/* ----- הערות ----- */}
          <div className="border-t border-hairline px-5 py-9 text-center sm:px-[30px] sm:py-[46px]">
            <Reveal>
              <p className="lp-body-text text-body">
                לא יכולים להשתתף בשידור חי? אין בעיה. ההקלטה נשלחת לנרשמים בלבד, דרך קבוצת
                הוואטסאפ.
              </p>
              <p className="lp-fine mt-4 text-muted-ink">
                לא רואים את ההודעות מהקבוצה? בדקו שהיא לא מושתקת, ושמספר הטלפון שהשארתם בטופס
                הוא זה שמחובר לוואטסאפ שלכם.
              </p>
              <div className="mt-7">
                <Link
                  to="/"
                  className="lp-focus lp-fine inline-flex items-center gap-1 text-muted-ink underline decoration-gold underline-offset-4 transition-colors hover:text-ink"
                >
                  חזרה לדף הכנס
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <footer className="px-[18px] py-[34px] text-center text-[14px] leading-[1.8] text-[hsl(200_6%_52%)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row sm:text-right">
          <p>© 2026 רחלי חדד · כל הזכויות שמורות | עיצוב ובנייה: שקמה אושרי אריה</p>
          <nav className="flex gap-4">
            <Link to="/privacy" className="lp-focus hover:text-white">
              מדיניות פרטיות
            </Link>
            <Link to="/accessibility" className="lp-focus hover:text-white">
              הצהרת נגישות
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
