/* =======================================================================
   src/routes/index.tsx — ה־DNA של העושר
   -----------------------------------------------------------------------
   עיצוב חדש: מסגרת שחורה עם יריעת קריאה בהירה שצפה במרכז, טיפוגרפיית
   Assistant, הטורקיז של המותג, כותרות עם מעבר צבע, פס אמינות, FAQ.

   מה נשמר אחד לאחד מהגרסה הקודמת ואסור לגעת בו:
   - RavPageForm, RavPageInlineFallback, logFormLoad, pickField
     (ה-iframe, ה-document.write, הגיבוי המקומי, ושמירת הלידים ל-Supabase)
   - ה-head של ה-route
   - הקישורים לפרטיות ולנגישות בפוטר
   הפיקסל של מטא יושב ב-__root.tsx ולא נוגעים בו.
   ======================================================================= */

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

import heroBgAsset from "@/assets/hero-bg.webp.asset.json";
import logoGoldAsset from "@/assets/logo-gold.webp.asset.json";
import familyAsset from "@/assets/family-photo.png.asset.json";
import proof1 from "@/assets/proof-1.jpg.asset.json";
import proof4 from "@/assets/proof-4.webp.asset.json";
import proof5 from "@/assets/proof-5.webp.asset.json";
import proof6 from "@/assets/proof-6.webp.asset.json";
import proof7 from "@/assets/proof-7.webp.asset.json";
import proof2 from "@/assets/proof-2.jpg.asset.json";
import proof3 from "@/assets/proof-3.jpg.asset.json";

const HERO_BG = heroBgAsset.url;
const LOGO = logoGoldAsset.url;
// רחלי אישרה במפורש את פרסום התמונה המשפחתית הזו.
// בלעדיה אסור לפרסם תמונות שרואים בהן פני ילדים.
const FAMILY_PHOTO = familyAsset.url;
// ארבע העדויות החדשות ראשונות: הן מהכנס הזה ומזכירות
// את שלושת הימים במפורש. שלוש האחרונות הן מכנס קודם.
const PROOFS = [
  { src: proof4.url, width: 900, height: 1079 },
  { src: proof5.url, width: 900, height: 716 },
  { src: proof6.url, width: 900, height: 949 },
  { src: proof7.url, width: 900, height: 1145 },
  { src: proof1.url, width: 1096, height: 473 },
  { src: proof2.url, width: 1114, height: 528 },
  { src: proof3.url, width: 1146, height: 730 },
];

const TITLE = "ה־DNA של העושר | כנס אונליין חינמי, 13–15 באוקטובר";
const DESCRIPTION =
  "מהכנסות של מעל 200,000 ₪ בחודש לכמעט 2,000,000 ₪ חובות, ומשם לחופש כלכלי והשקעות. 3 ימים LIVE וללא עלות, 13–15 באוקטובר, על חוקי הכסף שמפרידים בין אנשים שמרוויחים כסף לאנשים שבונים עושר.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/* =========================== עזרי תצוגה =========================== */

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

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[13px] font-bold tracking-[0.2em] ${
        dark ? "text-gold-lt [text-shadow:0_2px_18px_hsl(var(--void)/0.92),0_0_5px_hsl(var(--void)/0.8)]" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

/* שני טפסי הרשמה בדף, אחד למעלה ואחד למטה. */
const FORM_IDS = ["register", "register-bottom"];

/* כל כפתור מוביל לטופס הקרוב אליו, מלמעלה או מלמטה. קישור קבוע
   ל-#register היה שולח מישהי שנמצאת בתחתית הדף לגלול חזרה עד למעלה. */
function scrollToNearestForm(e: MouseEvent<HTMLAnchorElement>) {
  const forms = FORM_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => el !== null,
  );
  // בלי טפסים נשארת התנהגות העוגן הרגילה של הדפדפן
  if (!forms.length) return;
  e.preventDefault();
  const y = window.scrollY;
  const dist = (el: HTMLElement) =>
    Math.abs(el.getBoundingClientRect().top + window.scrollY - y);
  const target = forms.reduce((best, el) => (dist(el) < dist(best) ? el : best));
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* כפתור. על הכהה המנטה היא המילוי והטקסט כהה, אחרת הכפתור נבלע.
   על היריעה הבהירה היחס מתהפך. */
function Cta({
  children,
  full = false,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  full?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const look = dark
    ? "bg-gradient-to-bl from-tq-soft to-[hsl(170_44%_76%)] text-[hsl(188_71%_9%)] shadow-[0_16px_34px_-14px_hsl(var(--tq-soft)/0.75)]"
    : "bg-gradient-to-bl from-tq via-[hsl(184_62%_28%)] to-tq-mid text-sheet border border-tq-soft/45 shadow-[0_16px_34px_-14px_hsl(var(--tq-soft)/0.5)]";
  return (
    <a
      href="#register"
      onClick={scrollToNearestForm}
      className={`lp-focus group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[17px] font-extrabold transition hover:brightness-110 ${look} ${
        full ? "flex w-full" : ""
      } ${className}`}
    >
      {children}
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
    </a>
  );
}

/* גוש על היריעה הבהירה */
function Block({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="border-t border-hairline px-5 py-9 text-center first:border-t-0 sm:px-[30px] sm:py-[46px] [scroll-margin-top:80px]"
    >
      {children}
    </div>
  );
}

/* קובייה כהה בתוך היריעה — המהלך שמחזיק את הקצב של הדף */
function DarkInset({
  title,
  line,
  cta,
  note,
}: {
  title: string;
  line: string;
  cta: string;
  note?: string;
}) {
  return (
    <div className="lp-dark m-3.5 rounded-[22px] bg-night px-6 py-8 text-center sm:px-7">
      <h3 className="lp-display text-sheet [font-size:clamp(21px,4.2vw,26px)]">{title}</h3>
      <p className="mt-2 text-[17px] leading-relaxed text-[hsl(196_11%_74%)]">{line}</p>
      <div className="mt-5">
        <Cta full dark>
          {cta}
        </Cta>
      </div>
      {note && <p className="lp-fine mt-3 text-[hsl(192_11%_66%)]">{note}</p>}
    </div>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="lp-display mt-3.5 text-ink [font-size:clamp(28px,5.8vw,44px)]">{children}</h2>
  );
}

function Key({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-semibold text-ink [font-size:clamp(19px,3.8vw,25px)] [line-height:1.6] [letter-spacing:-0.01em] ${className}`}>
      {children}
    </p>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`lp-body-text text-body ${className}`}>{children}</p>;
}

function Pills({ items, strike = false, srPrefix = "" }: { items: string[]; strike?: boolean; srPrefix?: string }) {
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-2">
      {items.map((t) => (
        <li
          key={t}
          className={
            strike
              ? "flex items-center gap-2 rounded-full border-2 border-tq/50 bg-sheet-2 px-3.5 py-2 text-[14px] font-medium text-ink"
              : "rounded-full border border-hairline bg-sheet-2 px-4 py-2 text-[14px] text-body"
          }
        >
          {strike && srPrefix && <span className="sr-only">{srPrefix}</span>}
          {strike && <X className="size-4 shrink-0 text-tq" strokeWidth={3} aria-hidden />}
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ====================== טופס רב מסר — ללא שינוי ====================== */

function pickField(data: Record<string, string>, keys: string[]) {
  for (const [k, v] of Object.entries(data)) {
    const key = k.toLowerCase();
    if (keys.some((needle) => key.includes(needle)) && v.trim()) return v.trim();
  }
  return null;
}

const RAVPAGE_ID = "334ac1b21f70066f112e53f16f5f925d6A9E5569";

// Inside an iframe document.write is safe, so we load the real form —
// the ?__loveable__=true variant renders a different, duplicated form.
const RAVPAGE_SRC_IFRAME = `https://form2.ravpage.co.il/${RAVPAGE_ID}`;

// The inline fallback injects into our own page, where the script's
// document.write would wipe it. Only there we keep Lovable's variant.
const RAVPAGE_SRC_INLINE = `https://form2.ravpage.co.il/${RAVPAGE_ID}?__loveable__=true`;

// Best-effort, anonymous form-load telemetry. Never blocks or breaks the form.
// יש בדף שני טפסים, והדגלים האלה הם ברמת המודול, ולכן רק הראשון שמדווח
// נרשם. זה מכוון: ספירה כפולה הייתה שוברת את ההשוואה לנתונים שכבר נאספו.
let formLoadLogged = false;
let localFormLogged = false;

function logFormLoad(status: "ready" | "error" | "local_form", durationMs?: number) {
  try {
    if (status === "local_form") {
      if (localFormLogged) return;
      localFormLogged = true;
    } else {
      if (formLoadLogged) return;
      formLoadLogged = true;
    }
    void supabase
      .from("form_load_events")
      .insert({
        status,
        duration_ms: typeof durationMs === "number" ? Math.round(durationMs) : null,
        viewport_width: typeof window !== "undefined" ? window.innerWidth : null,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      })
      .then(
        () => undefined,
        () => undefined,
      );
  } catch {
    /* ignore */
  }
}

function RavPageInlineFallback() {
  const host = useRef<HTMLDivElement>(null);
  const [showLocalForm, setShowLocalForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || el.dataset["loaded"]) return;
    el.dataset["loaded"] = "true";
    const s = document.createElement("script");
    s.src = RAVPAGE_SRC_INLINE;
    s.type = "text/javascript";
    s.charset = "UTF-8";
    s.async = true;
    s.onerror = () => {
      logFormLoad("local_form");
      setShowLocalForm(true);
    };
    el.appendChild(s);

    const check = window.setTimeout(() => {
      const hasUsableForm = Boolean(
        el.querySelector(
          'form input:not([type="hidden"]), form textarea, form select, form button, form input[type="submit"]',
        ),
      );
      if (!hasUsableForm) {
        logFormLoad("local_form");
        setShowLocalForm(true);
      }
    }, 3000);

    return () => window.clearTimeout(check);
  }, []);

  const submitLocalForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("full_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const { error } = await supabase.from("registrations").insert({
      full_name: fullName,
      email,
      phone,
      raw: { full_name: fullName, email, phone, consent: true },
      source: "site-fallback",
    });

    if (error) {
      setSubmitError(true);
      setIsSubmitting(false);
      return;
    }
    setDone(true);
  };

  const field =
    "mt-1.5 block h-12 w-full rounded-lg border border-hairline bg-sheet px-4 text-[16px] text-ink outline-none focus:border-tq focus:ring-2 focus:ring-tq-soft/40";

  return (
    <div className="min-h-[320px]">
      {!showLocalForm && <div ref={host} className="rp-embed min-h-[320px]" />}
      {showLocalForm && !done && (
        <form onSubmit={submitLocalForm} className="space-y-4" aria-label="טופס הרשמה חלופי">
          <label className="block text-[16px] font-semibold text-ink">
            שם מלא
            <input name="full_name" autoComplete="name" required className={field} />
          </label>
          <label className="block text-[16px] font-semibold text-ink">
            טלפון
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} />
          </label>
          <label className="block text-[16px] font-semibold text-ink">
            אימייל
            <input name="email" type="email" inputMode="email" autoComplete="email" required className={field} />
          </label>
          {submitError && (
            <p role="alert" className="text-[14px] font-semibold text-tq">
              ההרשמה לא נשמרה. נסו שוב בעוד רגע.
            </p>
          )}
          <label className="flex items-start gap-2.5 text-[14px] leading-snug text-body">
            <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[hsl(var(--tq))]" />
            <span>אני מאשר/ת קבלת עדכונים על הכנס ותכנים שיווקיים במייל ובוואטסאפ.</span>
          </label>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-tq text-[16px] font-semibold text-sheet hover:bg-tq-mid"
          >
            {isSubmitting ? "שומרת מקום..." : "לשמור לי מקום, חינם"}
          </Button>
        </form>
      )}
      {done && (
        <div className="rounded-2xl border border-hairline bg-sheet-2 p-6 text-center">
          <p className="lp-display text-[20px] text-ink">קיבלנו את הפרטים שלך</p>
          <Body className="mt-2">
            הטופס הרגיל לא נטען אצלך, ולכן ההרשמה שלך תושלם ידנית. נשלח לך את קישור הכניסה לכנס
            למייל שהשארת.
          </Body>
          <Body className="mt-3">רוצה לוודא שזה נקלט? שלחי הודעה בוואטסאפ ונאשר לך מיד.</Body>
        </div>
      )}
    </div>
  );
}

function RavPageForm() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(420);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const doc = frame.contentDocument;
    if (!doc) {
      logFormLoad("error");
      setState("error");
      return;
    }
    const startedAt = Date.now();
    let activeSource = RAVPAGE_SRC_IFRAME;
    let submitted = false;
    let emptyChecksAfterReady = 0;
    let submitSignalLogged = false;
    let isReady = false;

    const writeForm = (src: string) => {
      const d = frame.contentDocument;
      if (!d) return;
      activeSource = src;
      emptyChecksAfterReady = 0;
      d.open();
      d.write(
        `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8">` +
          `<meta name="viewport" content="width=device-width, initial-scale=1">` +
          `<base target="_blank">` +
          `<style>html,body{margin:0;padding:0;background:transparent;overflow-x:hidden}` +
          `body,body *{max-width:100%!important;box-sizing:border-box}` +
          `img{height:auto}</style></head><body>` +
          `<script type="text/javascript" src="${src}" charset="UTF-8"><\/script>` +
          `</body></html>`,
      );
      d.close();
      d.addEventListener("submit", onSubmit, true);
    };

    const sync = () => {
      const body = frame.contentDocument?.body;
      if (!body) return;
      const hasUsableForm = Boolean(
        body.querySelector(
          'form input:not([type="hidden"]), form textarea, form select, form button, form input[type="submit"]',
        ),
      );
      const h = Math.max(body.scrollHeight, body.getBoundingClientRect().height);
      if (hasUsableForm && h > 80) {
        emptyChecksAfterReady = 0;
        setHeight(h + 24);
        isReady = true;
        logFormLoad("ready", Date.now() - startedAt);
        setState("ready");
      } else {
        emptyChecksAfterReady += 1;
        // הטופס היה קיים ונעלם: רב־מסר החליף אותו בהודעת תודה.
        // זה האות היחיד להרשמה בפועל שיש לנו, כי אירוע submit לא נורה אף פעם.
        if (isReady && !submitSignalLogged) {
          submitSignalLogged = true;
          void supabase
            .from("form_load_events")
            .insert({
              status: "form_gone_after_ready",
              viewport_width: typeof window !== "undefined" ? window.innerWidth : null,
              user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
            })
            .then(
              () => undefined,
              () => undefined,
            );
        }
        if (
          !isReady &&
          !submitted &&
          activeSource === RAVPAGE_SRC_INLINE &&
          emptyChecksAfterReady >= 34
        ) {
          logFormLoad("error");
          setState("error");
        }
      }
    };

    // Poll fast while loading, then back off once the form is ready so we stop
    // forcing layout seven times a second for the rest of the visit.
    let tick = window.setTimeout(function run() {
      sync();
      tick = window.setTimeout(run, isReady ? 750 : 150);
    }, 150);

    // נוטשים את הטעינה הראשונה רק אם באמת לא הגיע כלום.
    // d.open() זורק לפח תשובה שעדיין בדרך.
    const hasAnyContent = () => {
      const d = frame.contentDocument;
      if (!d?.body) return false;
      return d.body.querySelector("form, input, iframe, div, table") !== null;
    };

    const retry = window.setTimeout(() => {
      if (isReady || hasAnyContent()) return;
      writeForm(RAVPAGE_SRC_INLINE);
    }, 2500);

    const timeout = window.setTimeout(() => {
      if (isReady) return;
      logFormLoad("error");
      setState("error");
    }, 9000);

    // שימי לב: המאזין הזה לא נורה אף פעם בפרודקשן. אפס רשומות ב-registrations
    // הגיעו ממנו. כנראה רב־מסר שולח ב-AJAX, או שה-<base target="_blank">
    // מוציא את ההגשה מהמסמך. להשאיר כגיבוי, אבל לא לסמוך עליו כמדד.
    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      submitted = true;

      const raw: Record<string, string> = {};
      form
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          "input, textarea, select",
        )
        .forEach((field) => {
          const type = (field as HTMLInputElement).type;
          if (type === "hidden" || type === "submit" || type === "button") return;
          if (type === "checkbox" || type === "radio") {
            if (!(field as HTMLInputElement).checked) return;
          }
          const key = field.name || field.id;
          if (!key || !field.value) return;
          raw[key] = field.value;
        });

      if (!Object.keys(raw).length) return;

      void supabase.from("registrations").insert({
        full_name: pickField(raw, ["name", "fname", "שם"]),
        email: pickField(raw, ["mail", "אימייל", "מייל"]),
        phone: pickField(raw, ["phone", "tel", "mobile", "טלפון", "נייד"]),
        raw,
      });
    };

    writeForm(RAVPAGE_SRC_IFRAME);

    return () => {
      window.clearTimeout(tick);
      window.clearTimeout(retry);
      window.clearTimeout(timeout);
      frame.contentDocument?.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return (
    <div className="relative w-full min-w-0">
      {state === "loading" && (
        <div className="absolute inset-x-0 top-0 z-10 px-1" aria-live="polite">
          <div className="rounded-xl border border-hairline bg-sheet-2 px-4 py-5 text-center">
            <p className="text-[15px] font-semibold text-ink">טוען את טופס ההרשמה…</p>
            <p className="mt-1 text-[14px] text-muted-ink">שם מלא · טלפון · אימייל</p>
          </div>
        </div>
      )}
      <iframe
        ref={frameRef}
        title="טופס הרשמה"
        style={{
          width: "100%",
          border: "none",
          display: "block",
          height: state === "error" ? 0 : state === "ready" ? height : 260,
          overflow: state === "error" ? "hidden" : "visible",
          opacity: 1,
          position: "static",
          pointerEvents: "auto",
          transition: "height .2s ease",
        }}
        scrolling="no"
      />
      {state === "error" && <RavPageInlineFallback />}
    </div>
  );
}

/* =========================== הדר וסרגל =========================== */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[hsl(var(--void)/0.9)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <a
          href="#register"
          onClick={scrollToNearestForm}
          className="lp-focus rounded-full border border-white/25 px-5 py-2 text-[14px] font-bold text-white transition hover:bg-white/10"
        >
          להרשמה ללא עלות
        </a>
        <img
          src={LOGO}
          alt="רחלי חדד · מכפילה עסקים · בונה אימפריות"
          loading="eager"
          className="h-10 w-auto md:h-12"
        />
      </div>
    </header>
  );
}

function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // מתחבא כשטופס כלשהו כבר על המסך, לא רק הראשון
      const formVisible = FORM_IDS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight * 0.6 && r.bottom > 0;
      });
      setShow(window.scrollY > 420 && !formVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`lp-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[hsl(var(--void)/0.96)] px-3.5 pt-2.5 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      {/* הסרגל הדביק מלווה את כל הדף ולא סקשן מסוים, ולכן הניסוח שלו
          נשאר ניטרלי בכוונה. */}
      <Cta full dark>
        לשמור לי מקום · ללא עלות
      </Cta>
    </div>
  );
}

/* =========================== ההירו =========================== */

const WHATSAPP_LINE =
  "אחרי ההרשמה תועברו לקבוצת הוואטסאפ של הכנס. הלינק לזום נשלח שם ביום הכנס.";

function Hero() {
  return (
    <section className="lp-dark relative isolate flex min-h-[840px] items-end overflow-hidden px-[18px] pb-9 pt-28 sm:min-h-[860px] sm:px-7 sm:pb-12 sm:pt-32 lg:min-h-[88vh] lg:items-center lg:px-10 lg:pb-[72px] lg:pt-[150px]">
      <img
        src={HERO_BG}
        alt="רחלי חדד"
        width={1672}
        height={941}
        loading="eager"
        className="lp-hero-bg absolute inset-0 -z-20 size-full object-cover"
      />
      <span className="lp-scrim" aria-hidden />

      <div className="relative mx-auto w-full max-w-[44rem] text-center lg:ms-0 lg:me-auto lg:max-w-[34rem] lg:text-right">
        <Eyebrow dark>במיוחד למי שרוצים שהכסף שלהם יתחיל לבנות להם עושר</Eyebrow>

        <h1 className="lp-display mt-2.5 text-balance text-white [font-size:clamp(28px,6.2vw,46px)] [text-shadow:0_0_44px_hsl(188_73%_15%/0.55)]">
          איך עוברים ממצב של
          <br />
          ״לדעת להרוויח כסף״
          <br />
          למצב של
          <br />
          <span className="lp-grad">״לדעת לבנות ממנו עושר״</span>
        </h1>

        <p className="mt-3.5 text-[clamp(18px,3.6vw,22px)] font-bold text-white">
          ה־DNA של העושר · כנס עומק בן 3 ימים
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-tq-soft/50 bg-[hsl(var(--void)/0.5)] px-[22px] py-[11px] text-[15px] text-white">
          <span>בזום</span>
          <span className="size-[5px] rounded-full bg-tq-soft" aria-hidden />
          <span>13–15 באוקטובר</span>
          <span className="size-[5px] rounded-full bg-tq-soft" aria-hidden />
                    <span className="font-bold text-tq-soft">ללא עלות</span>
        </div>

        <div className="mt-6">
          <Cta dark>כן, אני רוצה לבנות עושר</Cta>
        </div>

        <p className="lp-fine mx-auto mt-3.5 max-w-[30rem] text-[hsl(190_14%_80%)] [text-shadow:0_1px_10px_hsl(var(--void)/0.9)] lg:mx-0">
          {WHATSAPP_LINE}
        </p>
      </div>
    </section>
  );
}

/* פס אמינות. שלושה מספרים מאומתים בשורה אחת, מיד מתחת לכפתור הראשון.
   הוא יושב מחוץ להירו בכוונה: בתוכו הוא דחף את הכותרת אל הפנים של רחלי.
   נשאר שלוש עמודות גם במובייל — המספר הוא העוגן, ושבירה לעמודה אחת
   הורסת את הסריקה המהירה שבגללה הפס קיים. */
function TrustBar() {
  const items = [
    { n: "18", t: "שנות ניסיון", ltr: false },
    { n: "1,000+", t: "בעלי עסקים ומשפחות שלמדו", ltr: true },
    { n: "3", t: "עסקים בשש ספרות בחודש", ltr: false },
  ];
  return (
    <div className="bg-void px-4 pb-[30px] pt-1">
      <div className="mx-auto grid max-w-[34rem] grid-cols-3 overflow-hidden rounded-[18px] border border-tq-soft/[0.28] bg-[hsl(var(--void)/0.46)] backdrop-blur-sm">
        {items.map((it) => (
          <div
            key={it.n}
            className="flex flex-col px-2.5 py-[18px] text-center [&:not(:first-child)]:border-r [&:not(:first-child)]:border-tq-soft/[0.22]"
          >
            <b
              dir={it.ltr ? "ltr" : undefined}
              className="block text-[clamp(23px,5.4vw,30px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-tq-soft"
            >
              {it.n}
            </b>
            <span className="mt-1.5 block text-[12.5px] leading-[1.45] text-[hsl(196_11%_74%)]">
              {it.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================== התוכן =========================== */

const DAYS = [
  {
    n: "יום 1",
    t: "הקוד הסמוי של הכסף",
    b: "למה אתם עושים עם כסף את מה שאתם עושים, גם כשאתם יודעים שזה לא משרת אתכם. נפצח את ה־DNA שקיבלתם בבית, טיפוסי הכסף, האמונות והדפוסים שמנהלים אתכם בלי שתשימו לב.",
  },
  {
    n: "יום 2",
    t: "מלכודת ההכנסה",
    b: "למה יותר כסף לא בהכרח הופך אתכם לעשירים יותר. נחשוף את ההבדל בין הכנסה לעושר, נבין לאן הכסף באמת הולך ומה מפריד בין אנשים שמרוויחים כסף לאנשים שבונים ממנו הון.",
  },
  {
    n: "יום 3",
    t: "מפת העושר",
    b: "איך הופכים את הכסף של היום לחופש של מחר. נחבר את ארבעת השרירים — לייצר, לנהל, לשמור ולהצמיח — ונבנה את מפת ה־DNA הכלכלית שתראה לכם איפה אתם היום ומה חסר כדי להתקדם.",
  },
];

const FOR_WHO = [
  "למי שרוצה הרבה כסף ולא מרגיש צורך להתנצל על זה.",
  "למי שמרוויח יפה אבל מרגיש שהמספרים עדיין לא משקפים את כל השנים שהוא עובד.",
  "למי שרוצה להתחיל לבנות נכסים והשקעות מתוך בסיס ולא מתוך FOMO.",
  "למי שרוצה לקחת אחריות על העתיד הכלכלי שלו ולא להשאיר אותו רק למדינה, לבנק או לאיש מקצוע.",
  "למי שרוצה שהילדים שלו ילמדו שפה אחרת לגמרי סביב כסף.",
  "למי שההכנסה שלו גדלה, אבל העושר שלו לא גדל יחד איתה.",
];

/* ה-FAQ. ארבע השאלות שמסירות את רוב ההתנגדויות.
   היתה כאן גם שאלה חמישית, "ינסו למכור לי משהו?", שהוסרה
   לפי בקשה. לא להחזיר אותה בלי אישור מפורש. */
const FAQ = [
  {
    q: "אם לא אוכל להיות בשידור חי, יש הקלטה?",
    a: "כן. ההקלטה נשלחת לנרשמים בלבד, דרך קבוצת הוואטסאפ של הכנס. גם אם אתם יודעים מראש שלא תוכלו להגיע לכל הימים, כדאי להירשם.",
  },
  {
    q: "כמה זמן זה לוקח בפועל?",
    a: "שלושה מפגשים, אחד בכל יום, בזום. שעת המפגש תישלח בקבוצת הוואטסאפ של הכנס.",
  },
  {
    q: "זה מתאים לי אם אני שכיר, או רק לבעלי עסקים?",
    a: "הכנס עוסק במה שקורה לכסף אחרי שהוא נכנס, ולא באיך להרוויח אותו. לכן הוא רלוונטי גם לשכירים, גם לעצמאים וגם לבעלי עסקים. אם נכנס אליכם כסף כל חודש, זה רלוונטי לכם.",
  },
  {
    q: "צריך ידע מוקדם בכלכלה או בהשקעות?",
    a: "לא. מתחילים מההתחלה. מי שכבר משקיע ימצא כאן את השכבה שמתחת להשקעות, זו שמחליטה אם הכסף בכלל מגיע לשם.",
  },
];

function Sheet() {
  return (
    <div className="mx-2 max-w-[44rem] rounded-[20px] bg-sheet p-1.5 shadow-[0_50px_110px_-60px_hsl(0_0%_0%/0.9)] sm:mx-auto sm:rounded-[30px] sm:p-2.5">
      {/* ----- הרשמה, למעלה. הטופס עצמו ולא כפתור, כדי שאפשר יהיה
               להירשם בלי לגלול את כל הדף ----- */}
      <Block id="register">
        <Reveal>
          <Eyebrow>הרשמה</Eyebrow>
          <H2>ה־DNA של העושר</H2>
          <p className="lp-fine mt-3.5 text-muted-ink">
            13–15 באוקטובר · בזום · ללא עלות
          </p>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-hairline bg-sheet-2 p-4 sm:p-7">
            <RavPageForm />
          </div>
        </Reveal>
      </Block>

      {/* ----- מאיפה אני מגיעה ----- */}
      <Block>
        <Reveal>
          <Eyebrow>מאיפה אני מגיעה</Eyebrow>
          <Body className="mt-4">
            גם אם היום אתם מרוויחים יפה אבל מרגישים שלא נשאר מספיק, גם אם עדיין אין לכם סכומים
            גדולים להשקיע, וגם אם אף אחד מעולם לא לימד אתכם איך כסף באמת עובד.
          </Body>
          <Body className="mt-4">
            אחרי שעברתי בעצמי מהכנסות של מעל 200,000 ₪ בחודש לכמעט 2,000,000 ₪ חובות, ומשם לחופש
            כלכלי, השקעות וחיים שבהם כסף נותן לי יותר בחירה, זיקקתי את חוקי הכסף שהלוואי שמישהו היה
            מלמד אותי לפני שהתחלתי להרוויח הרבה.
          </Body>
        </Reveal>
      </Block>

      {/* ----- עדויות. בלי מסגרת ריבועית, לבקשתה ----- */}
      <Block>
        <Reveal>
          <Eyebrow>ממשתתפות בכנס</Eyebrow>
          <H2>מה כותבים אחרי</H2>
          <div className="mt-6 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
            {PROOFS.map((p) => (
              <figure key={p.src} className="m-0 break-inside-avoid">
                <img
                  src={p.src}
                  alt="הודעת תודה ממשתתפת בכנס"
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </figure>
            ))}
          </div>
          <p className="lp-fine mt-4 text-muted-ink">
            ואולי ב-3 הימים האלה יהיה משפט כזה גם בשבילכם.
          </p>
        </Reveal>
      </Block>

      {/* ----- אם: ----- */}
      <Block>
        <Reveal>
          <Eyebrow>אם זה מדבר אליכם</Eyebrow>
          <H2>אם:</H2>
          <ul className="mt-6 flex list-none flex-col gap-[18px] p-0">
            {[
              "אתם מרוויחים כסף, אבל בסוף החודש שואלים את עצמכם ״לאן לעזאזל הכול הלך?״",
              "ההכנסה שלכם גדלה עם השנים, אבל אתם לא בטוחים שהעושר שלכם גדל יחד איתה.",
              "אתם יודעים שאתם ״צריכים״ לחסוך, להשקיע ולבנות נכסים, אבל איכשהו זה תמיד נדחה לשלב הבא.",
              "נמאס לכם שהביטחון הכלכלי שלכם תלוי רק בשאלה כמה תכניסו בחודש הבא.",
              "אתם רוצים להגיע למצב שבו כסף נותן לכם יותר זמן, חופש, בחירה ואפשרויות.",
              "אתם רוצים שהילדים שלכם יגדלו בבית שבו כסף הוא לא פחד, לחץ או מריבות, אלא כלי לבניית חיים.",
            ].map((t) => (
              <li key={t} className="flex justify-center gap-3 text-center">
                <span
                  className="mt-[15px] size-[7px] shrink-0 rounded-full bg-gold ring-4 ring-gold/[0.16]"
                  aria-hidden
                />
                <span className="lp-body-text text-body">{t}</span>
              </li>
            ))}
          </ul>
          <Key className="mt-7">
            <span className="lp-grad">אז כנראה שהגיע הזמן ללמוד את החלק במשחק שאף אחד לא לימד אותנו.</span>
          </Key>
        </Reveal>
      </Block>

      {/* הכפתור אחרי סקשן הכאב מנסח את הכאב */}
      <DarkInset
        title="3 ימים ללא עלות"
        line="13–15 באוקטובר · בזום"
        cta="אני רוצה לדעת לאן הכסף שלי הולך"
        note="הלינק לזום נשלח בקבוצת הוואטסאפ של הכנס ביום הכנס."
      />

      {/* ----- מה רובנו מפספסים ----- */}
      <Block>
        <Reveal>
          <Eyebrow>מה רובנו מפספסים</Eyebrow>
          <H2>
            לימדו אותנו איך להרוויח כסף
            <br />
            <span className="lp-grad">לא לימדו אותנו איך לבנות עושר</span>
          </H2>
          <ul className="mt-5 flex list-none flex-col gap-1.5 p-0">
            {["למדנו לעבוד.", "למדנו מקצוע.", "חלקנו למדנו למכור.", "לפתוח עסק.", "להגדיל הכנסה."].map((t) => (
              <li key={t} className="lp-body-text text-body">
                {t}
              </li>
            ))}
          </ul>
          <Key className="my-7">אבל אף אחד כמעט לא לימד אותנו מה לעשות אחרי שהכסף נכנס</Key>
          <ul className="flex list-none flex-col gap-1.5 p-0">
            {[
              "איך לנהל אותו.",
              "איך לשמור אותו.",
              "איך להצמיח אותו.",
              "איך להפוך חלק מהכסף של היום לעתיד של מחר.",
            ].map((t) => (
              <li key={t} className="lp-body-text text-body">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Block>

      {/* ----- ה־DNA ----- */}
      <Block>
        <Reveal>
          <Eyebrow>אני קוראת לזה</Eyebrow>
          <H2>ה־DNA של העושר</H2>
          <Body className="mt-4">והוא בנוי מארבע מיומנויות:</Body>
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2 md:grid-cols-4">
            {[
              ["01", "לייצר"],
              ["02", "לנהל"],
              ["03", "לשמור"],
              ["04", "להצמיח"],
            ].map(([n, t]) => (
              <div key={n} className="rounded-[20px] border border-hairline bg-sheet-2 px-6 py-7">
                <span className="mb-2 block text-[13px] font-bold tracking-[0.18em] text-gold">{n}</span>
                <h3 className="lp-display text-ink [font-size:clamp(19px,3.4vw,23px)]">{t}</h3>
              </div>
            ))}
          </div>
          <Body className="mt-6">
            והקטע המטורף? אפשר להיות מעולים בראשונה ועדיין להישאר גרועים במשחק העושר. אני יודעת,
            כי זה בדיוק מה שקרה לי.
          </Body>
        </Reveal>
      </Block>

      {/* ----- הסיפור ----- */}
      <Block>
        <Reveal>
          <Eyebrow>מה קרה לי</Eyebrow>
          <H2>בגיל 25 הכנסתי מעל 200,000 ₪ בחודש</H2>
          <Body className="mt-4">
            לא נולדתי למשפחה עשירה, לא קיבלתי ירושה ולא זכיתי בלוטו. היו לי 16 עובדים, עסק, לקוחות,
            כסף נכנס. ומבחוץ הייתי נראית כמו מישהי שפיצחה את המשחק. וגם אני חשבתי ככה.
          </Body>
          <Key className="my-7">
            <span className="lp-grad">עד שהבנק סגר לי את הברז</span>
          </Key>
          <Body>
            כמה שנים אחר כך מצאתי את עצמי עם כמעט 2,000,000 ₪ חובות ומינוס של בערך 150,000 ₪.
          </Body>
          <div className="mt-6 rounded-[20px] border border-hairline bg-sheet-2 px-6 py-7">
            <h3 className="lp-display text-ink [font-size:clamp(19px,3.4vw,23px)]">
              הייתי טובה בלעשות כסף
              <br />
              לא ידעתי להיות עשירה
            </h3>
          </div>
        </Reveal>
      </Block>

      {/* ----- מה קרה אחר כך ----- */}
      <Block>
        <Reveal>
          <Eyebrow>ומה קרה אחר כך</Eyebrow>
          <H2>אבל החוב לא היה סוף הסיפור</H2>
          <Body className="mt-4">
            הוא היה הרגע שבו התחלתי ללמוד את המשחק מחדש. לא ״איך לעשות עוד כסף״, אלא: איך אנשים
            שבונים עושר חושבים על כסף? מה הם עושים כשהוא נכנס? מה הם לא עושים? מה הם שומרים? מתי הם
            משקיעים? איך הם בונים ביטחון?
          </Body>
          <Key className="my-7">
            <span className="lp-grad">ואיך הם הופכים כסף לחופש?</span>
          </Key>
          <Body>
            ומשם התחלנו לבנות מחדש. היום כסף מאפשר לי לטייל עם המשפחה שלי, לבחור איפה אנחנו חיים,
            לעבוד פחות ימים בשבוע, ללמוד מאנשים בכל העולם, להשקיע, לתת, ולקבל החלטות מתוך הרבה יותר
            בחירה.
          </Body>
        </Reveal>
      </Block>

      {/* ----- שלושת הימים ----- */}
      <Block>
        <Reveal>
          <Eyebrow>מה יהיה ב-3 הימים</Eyebrow>
          <H2>
            <span className="text-tq">״</span>אני לא הולכת ללמד אתכם איך להתעשר
            <span className="text-tq">״</span>
          </H2>
          <Body className="mt-4">
            אני הולכת לספר לכם איך אנחנו עברנו מ־2,000,000 ₪ חוב לחופש כלכלי.
          </Body>
          <div className="mt-6 grid gap-3.5 md:grid-cols-3">
            {DAYS.map((c, i) => (
              <Reveal key={c.n} delay={i * 70}>
                <div className="h-full rounded-[20px] border border-hairline bg-sheet-2 px-6 py-7">
                  <span className="mb-2 block text-[13px] font-bold tracking-[0.18em] text-gold">
                    {c.n}
                  </span>
                  <h3 className="lp-display text-tq [font-size:clamp(19px,3.4vw,23px)]">{c.t}</h3>
                  <p className="mt-2.5 text-[17px] leading-[1.7] text-body">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Block>

      {/* הכפתור אחרי שלושת הימים מנסח את התוצאה */}
      <DarkInset
        title="תנו לי 3 ימים"
        line="3 ימים שבהם אני פותחת איתכם את חוקי הכסף ששינו את החיים הכלכליים שלי, כדי שתזהו איזה חלק ב־DNA הכלכלי שלכם כבר חזק ואיזה חלק עולה לכם הרבה יותר כסף ממה שאתם חושבים."
        cta="אני רוצה את מפת העושר שלי"
        note="בזום · הלינק נשלח בקבוצת הוואטסאפ של הכנס"
      />

      {/* ----- ועכשיו אליכם ----- */}
      <Block>
        <Reveal>
          <Eyebrow>ועכשיו אליכם</Eyebrow>
          <H2>אני לא מספרת לכם את זה כדי שתרצו את החיים שלי</H2>
          <Body className="mt-4">אני מספרת לכם את זה כי אני רוצה שתשאלו:</Body>
          <Key className="my-7">
            אילו חיים אתם הייתם בונים <span className="lp-grad">אם כסף היה נותן לכם יותר בחירה?</span>
          </Key>
          <Pills
            items={[
              "אולי הייתם עובדים פחות.",
              "אולי מטיילים יותר.",
              "אולי עוזרים להורים.",
              "אולי קונים בית.",
              "אולי משקיעים.",
              "אולי נותנים לילדים נקודת פתיחה אחרת.",
            ]}
          />
          {/* בלי מסגרת ריבועית ובלי קופסה מסביב, כמו שאר התמונות בדף */}
          <figure className="m-0 mt-7">
            <img
              src={FAMILY_PHOTO}
              alt="רחלי חדד עם משפחתה בטיול בחו״ל"
              width={1086}
              height={1448}
              loading="lazy"
              className="mx-auto block h-auto w-full max-w-[22rem] rounded-[20px]"
            />
          </figure>
          <Key className="mt-7">
            חופש כלכלי הוא לא רק מספר בחשבון. הוא כמה מההחלטות בחיים שלכם אתם באמת חופשיים לקבל
          </Key>
        </Reveal>
      </Block>

      {/* ----- למי זה מתאים ולמי לא ----- */}
      <Block>
        <Reveal>
          <Eyebrow>למי זה מתאים ולמי לא</Eyebrow>
          <H2>למי שרוצה לא רק להרוויח יותר, אלא להיות עשיר יותר</H2>
          <ul className="mt-6 grid list-none gap-2.5 p-0">
            {FOR_WHO.map((t) => (
              <li key={t} className="lp-body-text flex items-start justify-center gap-2.5 text-center text-body">
                <span
                  className="mt-[9px] grid size-5 shrink-0 place-items-center rounded-full bg-sheet-2 text-[12px] font-bold text-tq"
                  aria-hidden
                >
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Key className="mt-7">
            אני לא רוצה שעוד 10 שנים יעברו ורק אז אגלה שידעתי להרוויח, אבל לא ידעתי לבנות עושר
          </Key>
          <div className="mt-7 rounded-[20px] border border-hairline bg-sheet-2 px-6 py-7">
            <h3 className="lp-display mb-3.5 text-ink [font-size:clamp(19px,3.4vw,23px)]">
              למי זה לא מתאים?
            </h3>
            <Pills
              strike
              srPrefix="לא מתאים: "
              items={[
                "מניה שתעשה פי 10 עד יום חמישי",
                "״טריק להתעשר״ בלי לשנות כלום",
                "מי שלא מוכן להסתכל על המספרים שלו",
                "מי שמעדיף שמישהו אחר יהיה אחראי על העתיד הכלכלי שלו",
              ]}
            />
          </div>
        </Reveal>
      </Block>

      {/* ----- בקשה אחת ----- */}
      <Block>
        <Reveal>
          <Eyebrow>בקשה אחת לפני שנרשמים</Eyebrow>
          <Key>
            אל תגיעו כדי ״לשמוע על כסף״. תגיעו עם שאלה:{" "}
            <span className="lp-grad">מה אם הדרך שבה לימדו אותי לחשוב על כסף היא לא הדרך היחידה?</span>
          </Key>
        </Reveal>
      </Block>

      {/* ----- FAQ ----- */}
      <Block>
        <Reveal>
          <Eyebrow>לפני שנרשמים</Eyebrow>
          <H2>שאלות שחוזרות</H2>
          <div className="lp-faq mt-6 border-t border-hairline">
            {FAQ.map((item, i) => (
              <details key={item.q} open={i === 0} className="border-b border-hairline">
                <summary className="flex cursor-pointer items-start justify-center gap-3 py-[18px] text-center text-[18px] font-extrabold leading-[1.5] text-ink">
                  {item.q}
                </summary>
                <div className="pb-[18px] text-[17px] leading-[1.8] text-body">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </Block>

      {/* ----- הרשמה, למטה ----- */}
      <Block id="register-bottom">
        <Reveal>
          <Eyebrow>הרשמה</Eyebrow>
          <H2>ה־DNA של העושר</H2>
          <Body className="mt-3">
            3 ימים לפצח את חוקי הכסף שמפרידים בין אנשים שמרוויחים כסף לאנשים שבונים עושר.
          </Body>
          <Key className="mt-7">יכול להיות שאתם לא גרועים בכסף</Key>
          <Key className="mt-2.5 [font-size:clamp(20px,4vw,26px)]">
            יכול להיות שפשוט לימדו אתכם <span className="lp-grad">רק 25% מהמשחק</span>
          </Key>
          <p className="mt-3.5 font-bold text-ink">בואו ללמוד את השאר.</p>
          <p className="lp-fine mt-3.5 text-muted-ink">
            13–15 באוקטובר · בזום. אחרי ההרשמה תועברו לקבוצת הוואטסאפ של הכנס, ושם
            יישלח הלינק ביום הכנס. ההקלטה נשלחת לנרשמים בלבד.
          </p>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-hairline bg-sheet-2 p-4 sm:p-7">
            <RavPageForm />
          </div>
        </Reveal>
      </Block>

      {/* ----- רגע לפני שיוצאים ----- */}
      <Block>
        <Reveal>
          <Eyebrow>רגע לפני שאתם יוצאים</Eyebrow>
          <Pills
            items={[
              "״אני כבר יודע/ת מספיק על כסף.״",
              "״אני אטפל בזה מתישהו.״",
              "״כרגע אין לי זמן.״",
              "״מצבי דווקא בסדר.״",
            ]}
          />
          <H2>
            האם הדרך שבה אתם מתנהלים היום עם כסף יכולה להביא אתכם לחיים שאתם רוצים{" "}
            <span className="lp-grad">בעוד 10 שנים?</span>
          </H2>
          <Body className="mt-4">
            אם התשובה היא אפילו ״אני לא בטוח/ה״, בואו. ההשתתפות ללא עלות.
          </Body>
          <div className="mt-6">
            <Cta>שמרו לי מקום בכנס</Cta>
          </div>
        </Reveal>
      </Block>
    </div>
  );
}

function Footer() {
  return (
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
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-void pb-[84px] font-[Assistant,system-ui,sans-serif] text-body lg:pb-0">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Sheet />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
