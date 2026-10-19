/**
 * MONEY TIME — דף נחיתה לקורס הדיגיטלי של רחלי חדד.
 *
 * בנוי על אותה שפה עיצובית של דף הכנס „עושים אהבה עם הפחד מכסף” ב-Lovable:
 * הטוקנים (paper / ink / gold / mist) והמחלקות (paper-wash, lp-body,
 * lp-marker, lp-reveal, font-display) כבר מוגדרים שם ב-src/styles.css.
 *
 * הטקסט מגיע מהמסמך „MONEY TIME: טקסט לדף הנחיתה”. כל מה שמסומן שם
 * [להשלים] מוצג כאן ברכיב <Todo> — לא להמציא במקומו תוכן, המלצות או
 * מדיניות החזר. להחליף רק בטקסט אמיתי שרחלי אישרה.
 */
import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  Brain,
  Check,
  Gift,
  Hand,
  Infinity as InfinityIcon,
  PlayCircle,
  Smartphone,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./money-time.css";

import heroAsset from "@/assets/racheli-header.png.asset.json";
import logoAsset from "@/assets/logo-turquoise.png.asset.json";

const HERO_PHOTO = heroAsset.url;
const LOGO = logoAsset.url;

/** [להשלים] קישור לעמוד התשלום. עד שיש קישור, הכפתור מוביל לסקשן המחיר. */
const CHECKOUT_URL = "#join";

export const MONEY_TIME_TITLE =
  "MONEY TIME | הקורס של רחלי חדד לניהול כסף, 17 שיעורים מעשיים";
export const MONEY_TIME_DESCRIPTION =
  "בגיל 25 הרווחתי מעל 200,000 ש\"ח בחודש, ובכל זאת הגעתי לכמעט 2 מיליון ש\"ח חובות. ב-MONEY TIME אלמד אותך את חוקי הכסף שאף אחד לא לימד אותי.";

/* ---------- content ---------- */

const PAINS = [
  "הכסף נכנס, אבל אין לך מושג לאן הוא הולך",
  "כל חודש מתחיל בהבטחה „הפעם יהיה אחרת”, ונגמר באותו מינוס",
  "לפתוח את אפליקציית הבנק זה רגע של כאב בטן",
  "מבחוץ הכול נראה בסדר, ואף אחד לא יודע כמה זה מעיק",
  "יש ריבים בבית סביב כסף, או שתיקות שאומרות הכול",
  "כל קנייה מגיעה עם אשמה, וכל חופשה נדחית ל„שנה הבאה”",
  "ובראש כל הזמן רצה המחשבה: „אם רק ארוויח קצת יותר, זה יסתדר”",
];

const TODAY: ReactNode[] = [
  <Todo key="debt" inline>
    ניסוח מדויק על החובות, למשל „פרעתי X תוך Y שנים”
  </Todo>,
  "סגרתי את המינוס של 150,000 ש\"ח",
  "הקמתי 2 חברות בע\"מ חדשות",
  "יש לי השקעות ונכסים",
  "ואנחנו טסים כמשפחה בלי לספור כל שקל",
];

const CHANGES = [
  "לדעת בכל רגע כמה נכנס, כמה יוצא ולאן",
  "לסגור חודש בפלוס, ולא רק בתקווה",
  "תכנית ברורה ליציאה מהמינוס, צעד אחר צעד",
  "כסף שנחסך כל חודש, גם לחירום וגם לחופשה",
  "לקנות בלי אשמה, כי יש תקציב שמאפשר את זה",
  "לפתוח את אפליקציית הבנק בלי לחץ",
  "להפסיק לחכות ל„עוד קצת הכנסה” שתפתור הכול",
];

const PARTS: { n: string; t: string; b: ReactNode }[] = [
  {
    n: "01",
    t: "למה הכסף בורח",
    b: "הפסיכולוגיה של הכסף, הדפוסים שהבאנו מהבית, ולמה הכנסה גבוהה לא פותרת כלום",
  },
  {
    n: "02",
    t: "לעשות סדר",
    b: "שיטת הצנצנות: איך מחלקים כל שקל שנכנס, כך שכל הוצאה מכוסה מראש",
  },
  {
    n: "03",
    t: "לצאת מהמינוס",
    b: <Todo inline>מה בדיוק נלמד כאן</Todo>,
  },
  {
    n: "04",
    t: "לבנות ולשמור",
    b: "ההבדל בין להתעשר לבין להישאר עם הכסף, ואיך בונים ביטחון כלכלי לאורך זמן",
  },
];

const BONUSES: { t: string; b?: string }[] = [
  { t: "סדנה מעשית", b: "התנהלות כלכלית נכונה" },
  { t: "7 צורות של עושר", b: "כי עושר הוא לא רק מספר בבנק" },
  { t: "ניפוץ אמונות מגבילות", b: "המשפטים בראש שעוצרים אותך מלהחזיק כסף" },
  { t: "החוקים הרוחניים והחומריים של הכסף" },
  { t: "גישה לתמיד", b: "כולל כל העדכונים העתידיים" },
];

const FIT_YES = [
  "מרוויח/ה, אבל הכסף לא נשאר",
  "נמצא/ת במינוס קבוע ורוצה לצאת ממנו סופית",
  "עצמאי/ת או בעל/ת עסק עם הכנסות לא קבועות",
  "רוצה להתחיל לחסוך ולא יודע/ת מאיפה",
];

const FIT_NO = [
  "מחפש/ת דרך להתעשר מהר",
  "צריך/ה ייעוץ השקעות, ייעוץ משפטי או ליווי בהליך חדלות פירעון",
  "לא מוכן/ה להקדיש זמן ליישום",
];

const FAQ: { q: string; a: ReactNode }[] = [
  { q: "אני בחובות כבדים. זה יעזור לי?", a: <Todo>תשובה</Todo> },
  {
    q: "ההכנסה שלי לא קבועה. זה רלוונטי?",
    a: "בדיוק בשביל זה. השיטה נבנתה על ידי מי שחוותה הכנסות של 200,000 ש\"ח בחודש וגם חודשים בלי כלום.",
  },
  { q: "כמה זמן זה דורש?", a: <Todo>X דקות בשבוע</Todo> },
  {
    q: "אני לא מסתדר/ת עם מספרים.",
    a: (
      <>
        לא צריך. <Todo inline>המשך התשובה</Todo>
      </>
    ),
  },
  { q: "לכמה זמן יש גישה?", a: "לתמיד, כולל עדכונים." },
];

/* ---------- ornaments & primitives ---------- */

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 10"
      className={`h-[10px] w-full max-w-[240px] ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g stroke="hsl(var(--gold))" strokeOpacity="0.55" fill="hsl(var(--gold))">
        <line x1="6" y1="5" x2="234" y2="5" strokeWidth="1" />
        <circle cx="4" cy="5" r="2.6" stroke="none" />
        <circle cx="120" cy="5" r="2.6" stroke="none" />
        <circle cx="236" cy="5" r="2.6" stroke="none" />
      </g>
    </svg>
  );
}

function ArcScatter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`pointer-events-none absolute h-[320px] w-[320px] ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="hsl(var(--gold))" strokeOpacity="0.5" strokeWidth="1.1">
        <circle cx="160" cy="160" r="140" />
        <circle cx="160" cy="160" r="104" />
        <circle cx="160" cy="160" r="68" strokeDasharray="3 9" />
      </g>
      <g fill="hsl(var(--gold))" fillOpacity="0.5">
        <circle cx="24" cy="70" r="3" />
        <circle cx="292" cy="52" r="2.4" />
        <circle cx="46" cy="286" r="2.6" />
        <circle cx="300" cy="240" r="3.2" />
        <circle cx="170" cy="12" r="2.2" />
      </g>
    </svg>
  );
}

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

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--gold-deep))] ${className}`}>
      {children}
    </p>
  );
}

function PillCta({
  children,
  href = "#join",
  className = "",
  withArrow = false,
  tone = "ink",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  withArrow?: boolean;
  tone?: "ink" | "gold";
}) {
  const toneClass =
    tone === "gold"
      ? "bg-gold-grad text-ink hover:brightness-105"
      : "bg-ink text-paper hover:bg-ink/90 shadow-[0_10px_24px_-14px_hsl(var(--ink))]";
  return (
    <a
      href={href}
      className={`lp-focus group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[16px] font-semibold transition-colors ${toneClass} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      )}
    </a>
  );
}

/** סימון ויזואלי לתוכן שחסר במסמך המקור. להסיר כשהטקסט האמיתי מגיע. */
function Todo({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      className={`rounded-lg border border-dashed border-[hsl(var(--gold-soft))] bg-[hsl(var(--gold-light)/0.18)] font-semibold text-ink-2 ${
        inline ? "inline px-2 py-0.5 text-[0.9em]" : "block px-4 py-3 text-[15px]"
      }`}
    >
      [להשלים] {children}
    </Tag>
  );
}

function SectionHead({
  eyebrow,
  children,
  center = false,
}: {
  eyebrow: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-4 text-ink [font-size:clamp(28px,4.4vw,46px)] [line-height:1.2] [text-wrap:balance]">
        {children}
      </h2>
      <GoldRule className={`mt-6 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

/* ---------- header ---------- */

function Header() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 [&.is-scrolled]:border-gold/40 [&.is-scrolled]:bg-[hsl(var(--paper)/0.9)] [&.is-scrolled]:backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <img
          src={LOGO}
          alt="רחלי חדד · מכפילה עסקים · בונה אימפריות"
          loading="eager"
          className="h-10 w-auto md:h-14"
        />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-ink-2 opacity-0 transition-opacity duration-300 group-[.is-scrolled]/header:opacity-100 lg:block">
            MONEY TIME · 17 שיעורים · גישה לתמיד
          </span>
          <PillCta className="!px-5 !py-2 !text-[14px]">להצטרפות</PillCta>
        </div>
      </div>
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="paper-wash relative overflow-hidden pt-24 lg:min-h-[100dvh] lg:pt-28">
      <img
        src={HERO_PHOTO}
        alt="רחלי חדד"
        width={1920}
        height={1080}
        className="order-2 h-64 w-full object-cover object-[30%_top] sm:h-80 lg:absolute lg:inset-0 lg:order-none lg:h-full lg:object-cover lg:object-left"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(to_top,hsl(var(--paper)),hsl(var(--paper)/0.15),transparent)] sm:h-80 lg:inset-0 lg:h-full lg:bg-[linear-gradient(270deg,hsl(var(--paper))_0%,hsl(var(--paper))_33%,hsl(var(--paper)/0.82)_46%,hsl(var(--paper)/0.3)_62%,transparent_78%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-12 sm:px-6 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pb-20">
        <Reveal className="max-w-xl">
          <span className="inline-flex rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper">
            קורס דיגיטלי · 17 שיעורים מעשיים
          </span>

          <p
            dir="ltr"
            className="font-display mt-6 text-right text-ink [font-size:clamp(44px,6.4vw,78px)] [line-height:0.95] tracking-tight"
          >
            MONEY <span className="text-gold-grad">TIME</span>
          </p>

          <GoldRule className="my-6" />

          <h1 className="font-display text-ink [font-size:clamp(26px,3.2vw,36px)] [line-height:1.25] [text-wrap:balance]">
            מרוויחים, עובדים קשה,{" "}
            <span className="lp-underline">ובסוף החודש הכסף פשוט נעלם?</span>
          </h1>

          <p className="lp-body mt-5 max-w-lg text-ink-2">
            בגיל 25 הרווחתי מעל <span className="lp-marker">200,000 ש״ח בחודש</span>, ובכל
            זאת הגעתי לכמעט 2 מיליון ש״ח חובות. ב-MONEY TIME אלמד אותך את חוקי הכסף שאף
            אחד לא לימד אותי, כדי שלא תצטרך/י ללמוד אותם בדרך הקשה.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4">
            <PillCta withArrow>אני רוצה לקחת שליטה על הכסף שלי</PillCta>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-2">
              {[
                { icon: PlayCircle, t: "17 שיעורים מעשיים" },
                { icon: InfinityIcon, t: "גישה לתמיד" },
                { icon: Smartphone, t: "צפייה מהנייד" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon className="size-4 text-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pain() {
  return (
    <section className="paper-wash-alt px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="רגע של כנות">אם זה מרגיש מוכר, הדף הזה בשבילך</SectionHead>
        </Reveal>

        <ul className="mt-10 space-y-3">
          {PAINS.map((p, i) => (
            <Reveal key={p} delay={i * 60}>
              <li className="flex items-start gap-4 rounded-2xl border border-gold/35 bg-[hsl(var(--paper)/0.8)] px-5 py-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-mist text-ink">
                  <Check className="size-4" aria-hidden />
                </span>
                <span className="lp-body text-ink">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="font-display mt-12 text-center text-gold-grad [font-size:clamp(24px,3.6vw,34px)] [line-height:1.3]">
            אני מכירה את כל אחד מהמשפטים האלה. מבפנים.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="paper-wash relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <ArcScatter className="-top-24 -left-28 opacity-60" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="הסיפור שלי">
            הרווחתי 200,000 ש״ח בחודש. <span className="text-gold-grad">וזה לא הציל אותי.</span>
          </SectionHead>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-gold/40 bg-[hsl(var(--mist)/0.55)] p-7 text-center sm:p-9">
              <p className="text-sm font-semibold text-ink-2">בגיל 25, בכל חודש</p>
              <p className="font-display mt-2 whitespace-nowrap text-ink [font-size:clamp(34px,5vw,54px)] [line-height:1]">
                200,000+ ₪
              </p>
              <p className="mt-2 text-[15px] text-ink-2">הכנסה · עסק עם 16 עובדים</p>
            </div>
            <div className="rounded-[2rem] bg-ink p-7 text-center text-paper sm:p-9">
              <p className="text-sm font-semibold text-paper/75">כמה שנים אחר כך, כמעט</p>
              <p className="font-display mt-2 whitespace-nowrap text-gold-grad-light [font-size:clamp(34px,5vw,54px)] [line-height:1]">
                2,000,000 ₪
              </p>
              <p className="mt-2 text-[15px] text-paper/75">חובות · ומינוס של כ-150,000 ש״ח</p>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal>
            <div className="space-y-5 text-[18px] leading-[1.9] text-ink-2">
              <p>בגיל 25 הכנסתי מעל 200,000 ש״ח בחודש.</p>
              <p>
                לא נולדתי למשפחה עשירה, לא קיבלתי ירושה ולא זכיתי בלוטו. בניתי עסק עם 16
                עובדים, לקוחות, והכסף נכנס.
              </p>
              <p>מבחוץ נראיתי כמו מישהי שפיצחה את המשחק. וגם אני חשבתי ככה.</p>
            </div>
          </Reveal>

          <Reveal>
            <p className="font-display my-10 text-ink [font-size:clamp(28px,4.6vw,44px)] [line-height:1.2]">
              עד שהבנק סגר לי <span className="text-gold-grad">את הברז.</span>
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-5 text-[18px] leading-[1.9] text-ink-2">
              <p>
                כמה שנים אחר כך מצאתי את עצמי עם כמעט 2,000,000 ש״ח חובות ומינוס של
                כ-150,000 ש״ח.
              </p>
              <p>
                הכסף נכנס, אבל אף פעם לא ידעתי כמה ממנו באמת שלי. הוצאתי לפי מה שנכנס, לא
                לפי מה שנשאר. וכשההכנסות ירדו, לא היה שום דבר שיחזיק אותי.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <blockquote className="mt-10 rounded-[2rem] border border-gold/40 bg-[hsl(var(--paper)/0.85)] p-7 shadow-[0_18px_40px_-32px_hsl(var(--ink))] sm:p-9">
              <p className="text-[16px] font-semibold text-gold">
                שם הבנתי את הלקח הכי יקר בחיים שלי:
              </p>
              <p className="font-display mt-3 text-ink [font-size:clamp(24px,3.6vw,34px)] [line-height:1.3]">
                הכנסה גבוהה היא לא ביטחון כלכלי.
              </p>
              <p className="lp-body mt-3 text-ink-2">
                מי שלא יודע לנהל 10,000 ש״ח, לא ידע לנהל גם 200,000.
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <p className="lp-body mt-8 font-semibold text-ink">
              התחלתי מאפס. למדתי, טעיתי, תיקנתי, ובניתי שיטה.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Today() {
  return (
    <section className="paper-wash-alt px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Reveal>
            <SectionHead eyebrow="התוצאה">איפה אני היום</SectionHead>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {TODAY.map((t, i) => (
              <Reveal key={i} delay={i * 70}>
                <li className="flex items-start gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-paper">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="lp-body text-ink">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120}>
          <div className="grid aspect-[4/5] w-full place-items-center rounded-[2rem] border-2 border-dashed border-[hsl(var(--gold-soft)/0.7)] bg-[hsl(var(--paper)/0.7)] p-8 text-center">
            <Todo>מקום לתמונה או צילום מסך מושחר כהוכחה</Todo>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="font-display mx-auto mt-16 max-w-3xl text-center text-ink [font-size:clamp(22px,3.4vw,32px)] [line-height:1.35] [text-wrap:balance]">
          לא קרה לי נס. למדתי חוקים.{" "}
          <span className="text-gold-grad">ואת החוקים האלה אפשר ללמוד.</span>
        </p>
      </Reveal>
    </section>
  );
}

function Solution() {
  return (
    <section className="paper-wash relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <ArcScatter className="-bottom-32 -right-24 opacity-60" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="הפתרון" center>
            MONEY TIME: השיטה שהוציאה אותי מ-2 מיליון ש״ח חובות
          </SectionHead>
          <p className="lp-body mx-auto mt-6 max-w-2xl text-center text-ink-2">
            זה לא עוד קורס שמבטיח „למגנט שפע”. זו שיטה מעשית שמשלבת בין שני דברים שאי אפשר
            בלי אחד מהם:
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Brain,
              t: "הראש",
              b: "להבין למה הכסף בורח לך, ומה בהתנהלות שלך גורם לזה לקרות שוב ושוב.",
            },
            {
              icon: Hand,
              t: "הידיים",
              b: "כלים פשוטים לניהול הכסף, שעובדים גם כשההכנסה עולה, יורדת או לא קבועה.",
            },
          ].map(({ icon: Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="h-full rounded-[2rem] border border-gold/40 bg-[hsl(var(--paper)/0.85)] p-8 shadow-[0_18px_40px_-32px_hsl(var(--ink))] sm:p-10">
                <span className="grid size-14 place-items-center rounded-2xl bg-mist text-ink">
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="font-display mt-5 text-[28px] text-ink">{t}</h3>
                <p className="lp-body mt-2 text-ink-2">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Changes() {
  return (
    <section className="bg-ink px-4 py-20 text-paper sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow className="text-center !text-[hsl(var(--gold-light))]">מה ישתנה</Eyebrow>
          <h2 className="font-display mt-4 text-center text-paper [font-size:clamp(28px,4.4vw,46px)] [line-height:1.2]">
            איך החיים נראים אחרי <span className="text-gold-grad-light">MONEY TIME</span>
          </h2>
          <GoldRule className="mx-auto mt-6" />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {CHANGES.map((c, i) => (
            <Reveal
              key={c}
              delay={i * 60}
              className={i === CHANGES.length - 1 ? "sm:col-span-2" : ""}
            >
              <li className="flex h-full items-start gap-4 rounded-2xl border border-paper/15 bg-paper/5 px-5 py-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gold-grad text-ink">
                  <Check className="size-4" aria-hidden />
                </span>
                <span className="lp-body text-paper">{c}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section className="paper-wash-alt px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="מה בקורס">מה לומדים</SectionHead>
          <p className="lp-body mt-6 text-ink-2">
            17 שיעורים קצרים וממוקדים, כל אחד עם תרגיל ליישום מיידי.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PARTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div className="h-full rounded-[2rem] border border-gold/40 bg-[hsl(var(--paper)/0.85)] p-7 shadow-[0_18px_40px_-32px_hsl(var(--ink))]">
                <span className="font-display block text-[40px] leading-none text-gold/45">
                  {p.n}
                </span>
                <p className="mt-3 text-sm font-semibold text-gold">חלק {i + 1}</p>
                <h3 className="font-display mt-1 text-[22px] text-ink">{p.t}</h3>
                <p className="lp-body mt-2 text-ink-2">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6">
            <Todo>לעדכן לפי השיעורים בפועל</Todo>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bonuses() {
  return (
    <section className="paper-wash relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="בונוסים" center>
            ובנוסף תקבל/י:
          </SectionHead>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {BONUSES.map((b, i) => (
            <Reveal
              key={b.t}
              delay={i * 70}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <div className="flex h-full gap-4 rounded-[1.5rem] border border-gold/40 bg-[hsl(var(--mist)/0.5)] p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper text-gold ring-1 ring-gold/40">
                  {b.t === "גישה לתמיד" ? (
                    <InfinityIcon className="size-5" aria-hidden />
                  ) : (
                    <Gift className="size-5" aria-hidden />
                  )}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-ink">{b.t}</h3>
                  {b.b && <p className="mt-1 text-[16px] leading-relaxed text-ink-2">{b.b}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section className="paper-wash-alt px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="למי זה מתאים" center>
            בואו נוודא שזה בשבילך
          </SectionHead>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-gold/40 bg-[hsl(var(--paper)/0.9)] p-7 sm:p-9">
              <h3 className="font-display text-[22px] text-ink">מתאים למי ש:</h3>
              <ul className="mt-5 space-y-4">
                {FIT_YES.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-paper">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="lp-body text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-[2rem] border border-ink/15 bg-[hsl(var(--paper)/0.55)] p-7 sm:p-9">
              <h3 className="font-display text-[22px] text-ink-2">לא מתאים למי ש:</h3>
              <ul className="mt-5 space-y-4">
                {FIT_NO.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-[hsl(var(--gold-soft))] text-[hsl(var(--gold-deep))]">
                      <X className="size-3.5" aria-hidden />
                    </span>
                    <span className="lp-body text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="paper-wash px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHead eyebrow="המלצות" center>
            מה אומרים מי שכבר בפנים
          </SectionHead>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure
                key={n}
                className="grid min-h-[200px] place-items-center rounded-[2rem] border-2 border-dashed border-[hsl(var(--gold-soft)/0.6)] bg-[hsl(var(--paper)/0.7)] p-6 text-center"
              >
                <Todo>המלצה אמיתית {n}: שם + תוצאה</Todo>
              </figure>
            ))}
          </div>
          <p className="lp-fine mt-4 text-center text-ink-2/70">
            2-3 המלצות אמיתיות בלבד, באישור הממליצים. לפחות אחת של גבר.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Price() {
  return (
    <section
      id="join"
      className="paper-wash-alt relative overflow-x-clip px-4 py-20 [scroll-margin-top:96px] sm:px-6 lg:py-28"
    >
      <ArcScatter className="-top-28 -right-24 opacity-60" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="השקעה" center>
            כמה עולה להמשיך ככה?
          </SectionHead>
          <p className="lp-body mx-auto mt-6 max-w-2xl text-center text-ink-2">
            תחשבו כמה כסף ברח בשנה האחרונה בלי שבכלל הרגשתם. כמה ריבית שולמה על המינוס. כמה
            חופשות נדחו.
          </p>
          <p className="lp-body mx-auto mt-3 max-w-2xl text-center font-semibold text-ink">
            MONEY TIME עולה פחות מחודש אחד של ריבית על מינוס ממוצע.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 overflow-hidden rounded-[2.25rem] border border-gold/50 bg-[hsl(var(--paper)/0.95)] shadow-[0_30px_70px_-45px_hsl(var(--ink))]">
            <div className="bg-ink px-7 py-5 text-center">
              <p dir="ltr" className="font-display text-[26px] text-paper">
                MONEY <span className="text-gold-grad-light">TIME</span>
              </p>
            </div>
            <div className="px-6 py-10 text-center sm:px-12">
              <p className="font-display text-ink [font-size:clamp(56px,10vw,88px)] [line-height:1]">
                497 <span className="text-[0.45em]">ש״ח</span>
              </p>
              <p className="mt-3 text-[17px] text-ink-2">או 3 תשלומים של 166 ש״ח</p>

              <ul className="mx-auto mt-8 grid max-w-md gap-2.5 text-right">
                {[
                  "17 שיעורים מעשיים עם תרגיל ליישום",
                  "סדנה מעשית + 3 בונוסים",
                  "גישה לתמיד, כולל עדכונים",
                  "צפייה מכל מכשיר",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[16px] text-ink">
                    <Check className="size-4 shrink-0 text-gold" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>

              <PillCta href={CHECKOUT_URL} withArrow className="mt-9 w-full sm:w-auto">
                אני מצטרף/ת ל-MONEY TIME
              </PillCta>
              <p className="lp-fine mt-3 text-ink-2">גישה מיידית לקורס מיד אחרי התשלום</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="paper-wash px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="שאלות נפוצות" center>
            רגע לפני שמחליטים
          </SectionHead>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {FAQ.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`q${i}`}
                className="rounded-2xl border border-gold/40 bg-[hsl(var(--paper)/0.85)] px-6"
              >
                <AccordionTrigger className="py-5 text-right text-[17px] font-bold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="lp-body pb-5 text-ink-2">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-center text-paper sm:px-6 lg:py-32">
      <ArcScatter className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2.2] opacity-25" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-paper [font-size:clamp(30px,5vw,54px)] [line-height:1.15] [text-wrap:balance]">
            הלקח הזה עלה לי <span className="text-gold-grad-light">כמעט 2 מיליון ש״ח</span>
          </h2>
          <GoldRule className="mx-auto my-8" />
          <p className="text-[19px] leading-[1.85] text-paper/85">
            כסף לא נשאר אצל מי שמרוויח הרבה. הוא נשאר אצל מי שיודע מה לעשות איתו.
          </p>
          <p className="mt-3 text-[19px] leading-[1.85] text-paper/85">
            אפשר ללמוד את זה בדרך הקשה, כמו שאני למדתי.{" "}
            <strong className="text-paper">ואפשר להתחיל היום.</strong>
          </p>
          <PillCta href={CHECKOUT_URL} tone="gold" withArrow className="mt-10">
            אני רוצה להתחיל עכשיו
          </PillCta>
          <p className="lp-fine mx-auto mt-10 max-w-lg italic text-paper/55">
            הקורס מבוסס על ניסיון אישי ואינו מהווה ייעוץ פיננסי, ייעוץ השקעות או ייעוץ משפטי.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/40 bg-paper px-4 py-8 sm:px-6">
      <div className="lp-fine mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-ink-2 sm:flex-row sm:text-right">
        <p>© 2026 רחלי חדד · כל הזכויות שמורות | עיצוב ובנייה: שקמה אושרי אריה</p>
        <nav className="flex gap-4">
          <a href="/privacy" className="lp-focus hover:text-ink">
            מדיניות פרטיות
          </a>
          <a href="/accessibility" className="lp-focus hover:text-ink">
            הצהרת נגישות
          </a>
        </nav>
      </div>
    </footer>
  );
}

/** כפתור הצטרפות דביק במובייל, מופיע אחרי ההירו. */
function MobileStickyCta() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const join = document.getElementById("join");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atJoin = join ? join.getBoundingClientRect().top < window.innerHeight : false;
      el.classList.toggle("translate-y-full", !pastHero || atJoin);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-gold/40 bg-[hsl(var(--paper)/0.95)] px-4 py-3 backdrop-blur-xl transition-transform duration-300 md:hidden"
    >
      <PillCta className="w-full !py-3">להצטרפות · 497 ש״ח</PillCta>
    </div>
  );
}

export default function MoneyTimePage() {
  return (
    <div
      dir="rtl"
      lang="he"
      className="mt-page min-h-[100dvh] overflow-x-hidden bg-paper font-[Rubik,system-ui,sans-serif] text-ink"
    >
      <Header />
      <main>
        <Hero />
        <Pain />
        <Story />
        <Today />
        <Solution />
        <Changes />
        <Curriculum />
        <Bonuses />
        <Fit />
        <Testimonials />
        <Price />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
