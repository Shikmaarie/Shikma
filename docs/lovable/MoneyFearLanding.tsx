import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import heroImage from "@/assets/racheli-header.jpg";
import posterImage from "@/assets/money-fear-poster.jpg";
import proofImage from "@/assets/proof-whatsapp-1.jpg";

/**
 * „עושים אהבה עם הפחד מכסף” — the landing page for the free two-day online
 * summit, 4-5 October.
 *
 * The palette, the watercolour ground and the line-art furniture all come from
 * the campaign creative, so the page a visitor lands on looks like the ad that
 * sent them here. Tokens live in index.css.
 */

const REGISTER_ANCHOR = "#register";

/* ------------------------------------------------------------------ */
/* Copy — everything the page says, in one place                        */
/* ------------------------------------------------------------------ */

const copy = {
  dates: "4-5 באוקטובר",
  format: "יומיים | כנס אונליין חינמי",
  cta: { label: "לשמור לי מקום, חינם", short: "להרשמה חינם" },
  hero: {
    badge: "כנס אונליין חינמי · 4-5 באוקטובר",
    kicker: "הפסיכולוגיה הסמויה",
    kickerAccent: "של הכסף",
    title: [
      { text: "מ־2,000,000 ₪ חוב", accent: false },
      { text: "לחופש כלכלי", accent: true },
    ],
    lead: {
      marker: "מה באמת מנהל",
      middle: " את כמות הכסף שאתם מרוויחים ",
      underline: "בלי שאתם בכלל מודעים לזה?",
    },
    sub: "תנו לי יומיים ואגלה לכם את החוקים הסמויים שמנהלים את מערכת היחסים שלכם עם כסף.",
    facts: ["4-5 באוקטובר", "יומיים", "אונליין", "ללא עלות"],
  },
  story: {
    eyebrow: "מאיפה אני מגיעה",
    denials: ["לא נולדתי למשפחה עשירה.", "לא קיבלתי ירושה.", "ולא זכיתי בלוטו."],
    paragraphs: [
      "גדלתי עם הרבה מאוד פחד סביב כסף, ובשלב מסוים אפילו מצאתי את עצמי עם 2,000,000 ₪ חוב.",
      "אני הייתי במקום שאתם נמצאים בו. עשיתי את הטעויות, שילמתי עליהן מחיר כבד, ואז הבנתי את המשחק. עכשיו אני רוצה לקצר לכם את הדרך.",
    ],
    question: "אז איך עברתי משם לחופש כלכלי, השקעות ומיליונים?",
    answer: "את הסיפור המלא אני הולכת לפתוח בכנס האונליין החינמי.",
  },
  why: {
    eyebrow: "למה זה חשוב לי",
    quote:
      "הדבר הכי גדול שכסף נתן לי הוא לא כסף. הוא נתן לי אפשרות להראות לילדים שלי עולם אחר.",
    intro: "עולם שבו כסף הוא",
    notList: ["לא פחד.", "לא חובות.", "לא מריבות.", "ולא משהו שצריך לברוח ממנו."],
    turn: "אלא כלי ליצירת חופש.",
    close: "וזה בדיוק מה שאני רוצה להעביר לכם.",
  },
  agenda: {
    eyebrow: "מה יהיה בכנס",
    quote: "אני לא הולכת ללמד אתכם איך להתעשר",
    lead: "אני הולכת לספר לכם איך אנחנו עברנו מ־2,000,000 ₪ חוב לחופש כלכלי.",
    items: [
      {
        n: "01",
        title: "מה השתנה בדרך",
        body: "נקודות המפנה האמיתיות, לא הסיפור המצונזר.",
      },
      {
        n: "02",
        title: "מה הפסקנו לעשות",
        body: "ההרגלים וההחלטות שעלו לנו הכי הרבה כסף.",
      },
      {
        n: "03",
        title: "מה התחלנו לעשות",
        body: "המהלכים שהזיזו את המחט, בסדר שבו עשינו אותם.",
      },
      {
        n: "04",
        title: "אילו אמונות היינו צריכים לשבור",
        body: "האמונות על כסף שהחזיקו אותנו בחוב.",
      },
    ],
    outro: "מה למדתי בדרך על כסף, פחד, עושר והחלטות שאף אחד לא לימד אותי בבית.",
    promise:
      "תנו לי יומיים ואקח אתכם למסע ששינה את מערכת היחסים שלי עם כסף. ואולי ישנה גם את שלכם.",
  },
  proof: {
    eyebrow: "ממשתתפות בכנס",
    title: "מה כותבים אחרי",
    note: "צילום מסך מהודעה שהתקבלה אחרי הכנס. פרטי השולחת אינם מופיעים בתמונה.",
    alt: "הודעת וואטסאפ ממשתתפת בכנס",
  },
  register: {
    eyebrow: "הרשמה",
    sub: "4-5 באוקטובר | יומיים | כנס אונליין חינמי",
    body: "משאירים פרטים ואני שולחת לכם את קישור הכניסה ואת השעות המדויקות.",
  },
  footer: {
    rights: "© 2026 רחלי חדד · כל הזכויות שמורות | עיצוב ובנייה: שקמה אושרי אריה",
    links: [
      { label: "תקנון ותנאי שימוש", href: "/legal/terms" },
      { label: "מדיניות פרטיות", href: "/legal/privacy" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Primitives                                                           */
/* ------------------------------------------------------------------ */

/** Scroll-triggered entrance that starts from a visible state under
 *  reduced-motion, and never leaves content stranded at opacity 0. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** The four-point star from the brand lockup. Not a generic lucide icon. */
function BrandStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The creative's divider: a gold hairline with a dot at each end and centre. */
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 8"
      preserveAspectRatio="none"
      className={`h-2 w-full max-w-60 text-gold-ink ${className}`}
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="4"
        x2="232"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="4" cy="4" r="3.5" fill="currentColor" />
      <circle cx="120" cy="4" r="3.5" fill="currentColor" />
      <circle cx="236" cy="4" r="3.5" fill="currentColor" />
    </svg>
  );
}

/** Concentric arcs and a scatter of dots — the creative's corner motif. */
function ArcScatter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`text-gold-ink ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5">
        <circle cx="160" cy="160" r="150" />
        <circle cx="160" cy="160" r="126" />
        <circle cx="160" cy="160" r="98" strokeDasharray="3 9" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="290" cy="96" r="4" />
        <circle cx="262" cy="52" r="2.5" />
        <circle cx="228" cy="24" r="3.5" />
        <circle cx="300" cy="150" r="2.5" />
        <circle cx="180" cy="12" r="2" />
      </g>
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold tracking-[0.28em] text-gold-ink">
      {children}
    </span>
  );
}

function Cta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={REGISTER_ANCHOR}
      className={`group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-bold text-paper shadow-[0_18px_36px_-20px_hsl(var(--ink)/0.95)] transition hover:bg-flame-dp ${className}`}
    >
      {children}
      <ArrowLeft
        className="size-5 transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}

/**
 * The RavPage signup form.
 *
 * A <script> tag written in JSX never executes, so it is mounted from an
 * effect. The guard matters: StrictMode runs effects twice in development and
 * without it the form is injected twice.
 */
function RavPageForm() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || el.dataset.loaded === "true") return;
    el.dataset.loaded = "true";

    const script = document.createElement("script");
    script.src =
      "//form2.ravpage.co.il/b78f889d4baad9d8bc0c76623a3a35ad6A9DC44D?__loveable__=true";
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.async = true;
    el.appendChild(script);
  }, []);

  return <div ref={host} className="min-h-[320px]" />;
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */

function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-ink/25 bg-paper/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="רחלי חדד">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-full bg-ink"
            aria-hidden="true"
          >
            <BrandStar className="size-5 text-gold-ink" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="lp-display text-lg text-ink">רחלי חדד</span>
            <span className="mt-1.5 hidden text-[10px] tracking-[0.14em] text-ink-2 sm:block">
              מכפילה עסקים · בונה אימפריות
            </span>
          </span>
        </a>

        <div className="flex items-center gap-4">
          {/* Over the hero photo this line has nothing to sit on, so it
              appears only once the header has its cream ground. */}
          <span
            className={`hidden text-xs font-medium tracking-wide text-ink-2 transition-opacity duration-300 md:inline ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!scrolled}
          >
            {copy.dates} · {copy.format}
          </span>
          <a
            href={REGISTER_ANCHOR}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper shadow-[0_10px_26px_-14px_hsl(var(--ink)/0.9)] transition hover:bg-flame-dp sm:px-7"
          >
            {copy.cta.short}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="paper-wash relative overflow-hidden px-5 pt-28 sm:px-8 lg:px-0 lg:pt-0">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl lg:min-h-[44rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-bold tracking-[0.1em] text-paper">
              {copy.hero.badge}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <p className="lp-display mt-7 text-2xl leading-tight text-ink sm:text-3xl">
              {copy.hero.kicker}{" "}
              <span className="text-flame">{copy.hero.kickerAccent}</span>
            </p>
          </Reveal>

          <h1 className="lp-display mt-3 text-[2.4rem] leading-[1.07] sm:text-5xl lg:whitespace-nowrap lg:text-[3.1rem] xl:text-[3.5rem]">
            {copy.hero.title.map((line, i) => (
              <Reveal key={line.text} delay={120 + i * 80}>
                <span className="block">
                  <span className={line.accent ? "text-flame" : "text-ink"}>
                    {line.text}
                  </span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={260}>
            <GoldRule className="my-7" />
          </Reveal>

          <Reveal delay={320}>
            <p className="max-w-xl text-balance text-lg font-semibold leading-loose text-ink">
              <span className="box-decoration-clone rounded-md bg-mist px-2 py-0.5">
                {copy.hero.lead.marker}
              </span>
              {copy.hero.lead.middle}
              <span className="underline decoration-flame decoration-[3px] underline-offset-[6px]">
                {copy.hero.lead.underline}
              </span>
            </p>
          </Reveal>

          <Reveal delay={380}>
            <p className="lp-body mt-5 max-w-xl text-ink-2">{copy.hero.sub}</p>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Cta>{copy.cta.label}</Cta>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-ink-2">
                {copy.hero.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <span
                      className="size-1.5 rounded-full bg-gold-ink"
                      aria-hidden="true"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* One image, two roles: it stacks under the copy on a phone, and from
          `lg` up it becomes the full-bleed backdrop with the headline sitting
          in the empty half of the frame. */}
      <div className="relative -mx-5 mt-10 sm:-mx-8 lg:absolute lg:inset-0 lg:m-0">
        <img
          src={heroImage}
          alt="רחלי חדד"
          width={1672}
          height={941}
          className="h-64 w-full object-cover object-[30%_top] sm:h-80 lg:h-full lg:object-[left_center]"
        />
        <span className="hero-scrim absolute inset-0" aria-hidden="true" />
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="paper-wash-alt relative px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{copy.story.eyebrow}</Eyebrow>
        </Reveal>

        <ul className="mt-7 flex flex-col gap-3">
          {copy.story.denials.map((line, i) => (
            <Reveal key={line} delay={i * 60}>
              <li className="lp-display text-2xl text-ink sm:text-4xl">{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <GoldRule className="my-9" />
        </Reveal>

        {copy.story.paragraphs.map((paragraph, i) => (
          <Reveal key={paragraph} delay={240 + i * 60}>
            <p className="lp-body mt-6 text-ink-2">{paragraph}</p>
          </Reveal>
        ))}

        <Reveal delay={400}>
          <div className="mt-12 rounded-4xl border border-gold-ink/30 bg-mist/55 p-8 sm:p-10">
            <p className="lp-display text-2xl leading-snug text-flame sm:text-3xl">
              {copy.story.question}
            </p>
            <p className="lp-body mt-4 text-ink">{copy.story.answer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="paper-wash relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <ArcScatter className="pointer-events-none absolute -left-32 bottom-0 size-[26rem] opacity-50" />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <Eyebrow>{copy.why.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <blockquote className="lp-display mt-7 text-3xl leading-[1.25] text-ink sm:text-5xl">
            {copy.why.quote}
          </blockquote>
        </Reveal>

        <Reveal delay={140}>
          <GoldRule className="mx-auto my-10" />
        </Reveal>

        <Reveal delay={180}>
          <p className="lp-body font-semibold text-ink-2">{copy.why.intro}</p>
        </Reveal>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-3">
          {copy.why.notList.map((item, i) => (
            <Reveal key={item} delay={220 + i * 60}>
              <li className="lp-body rounded-full border border-ink/10 bg-paper/80 px-5 py-2.5 text-ink-2 line-through decoration-flame decoration-2">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={500}>
          <p className="lp-display mt-10 text-3xl text-flame sm:text-4xl">
            {copy.why.turn}
          </p>
        </Reveal>

        <Reveal delay={580}>
          <p className="lp-body mt-6 text-ink-2">{copy.why.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Agenda() {
  return (
    <section className="paper-wash-alt relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <Eyebrow>{copy.agenda.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="lp-display mt-7 max-w-3xl text-3xl leading-tight text-ink sm:text-5xl">
            <span className="text-flame" aria-hidden="true">
              „
            </span>
            {copy.agenda.quote}
            <span className="text-flame" aria-hidden="true">
              ”
            </span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="lp-body mt-6 max-w-2xl text-ink-2">{copy.agenda.lead}</p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {copy.agenda.items.map((item, i) => (
            <Reveal key={item.n} delay={100 + i * 80} className="h-full">
              <li className="flex h-full flex-col rounded-4xl border border-gold-ink/20 bg-paper/85 p-8 shadow-[0_30px_60px_-50px_hsl(var(--ink)/0.6)]">
                <span className="lp-display text-4xl text-gold-ink/45" aria-hidden="true">
                  {item.n}
                </span>
                <h3 className="lp-display mt-4 text-xl text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="lp-body mt-3 text-ink-2">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={400}>
          <p className="lp-body mt-12 max-w-3xl text-ink-2">{copy.agenda.outro}</p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-10 flex flex-col gap-8 rounded-4xl border border-gold-ink/30 bg-mist/55 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="lp-display max-w-xl text-xl leading-snug text-ink sm:text-2xl">
              {copy.agenda.promise}
            </p>
            <Cta className="shrink-0">{copy.cta.short}</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{copy.proof.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="lp-display mt-5 text-3xl text-ink sm:text-5xl">
              {copy.proof.title}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <GoldRule className="mt-8" />
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Reveal delay={100} className="w-full max-w-md">
            <figure className="overflow-hidden rounded-4xl border border-gold-ink/25 bg-paper/85 p-3 shadow-[0_30px_60px_-50px_hsl(var(--ink)/0.6)]">
              <img
                src={proofImage}
                alt={copy.proof.alt}
                width={938}
                height={637}
                loading="lazy"
                className="w-full rounded-3xl"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="lp-fine mt-8 text-center text-ink-2/70">{copy.proof.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section
      id="register"
      className="paper-wash-alt relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
    >
      <ArcScatter className="pointer-events-none absolute -right-28 top-10 size-[26rem] opacity-50" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <img
            src={posterImage}
            alt="הקריאייטיב של הכנס: הפסיכולוגיה הסמויה של הכסף, כנס אונליין חינמי"
            width={1086}
            height={1448}
            loading="lazy"
            className="mx-auto w-full max-w-sm rounded-4xl ring-1 ring-gold-ink/25 shadow-[0_40px_80px_-50px_hsl(var(--ink)/0.65)] lg:max-w-none"
          />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{copy.register.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="lp-display mt-5 flex flex-wrap items-center gap-x-3 text-3xl leading-tight text-ink sm:text-4xl">
              עושים אהבה
              <Heart className="size-7 fill-flame text-flame sm:size-8" aria-hidden="true" />
              עם הפחד מכסף
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base font-bold text-flame-dp">
              {copy.register.sub}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="lp-body mt-3 text-ink-2">{copy.register.body}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 rounded-4xl border border-gold-ink/25 bg-paper/90 p-7 shadow-[0_30px_60px_-45px_hsl(var(--ink)/0.55)] sm:p-9">
              <RavPageForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-gold-ink/25 bg-paper px-5 py-10 sm:px-8">
      <div className="lp-fine mx-auto flex w-full max-w-5xl flex-col gap-4 text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footer.rights}</p>
        <div className="flex flex-wrap gap-6">
          {copy.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-flame-dp"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function MoneyFearLanding() {
  return (
    <div dir="rtl" lang="he" className="lp-root min-h-[100dvh]">
      <LandingHeader />
      <main>
        <Hero />
        <Story />
        <Why />
        <Agenda />
        <Proof />
        <Register />
      </main>
      <LandingFooter />
    </div>
  );
}
