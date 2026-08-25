import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * דף נחיתה — קשרים ושת״פים · רחלי חדד
 *
 * All four images live in `public/lp/` and are referenced by absolute path.
 * Until a file is uploaded, its <ImageSlot> shows the expected filename, so an
 * empty slot is always self-describing rather than a broken image:
 *
 *   /lp/lobby.png          אולם הכניסה עם חמש הקשתות · 16:9
 *   /lp/racheli-yellow.png דמות בחליפה צהובה · רקע שקוף · לאורך
 *   /lp/racheli-pink.png   פורטרט בבלייזר ורוד · ריבועי · רקע שקוף
 *   /lp/gold-money.png     רקע הזהב שמאחורי שני הכרטיסים · 16:9
 */

/* ------------------------------------------------------------------ */
/* תוכן                                                                */
/* ------------------------------------------------------------------ */

const CTA = { label: "כן, אני רוצה להיכנס להדרכה החינמית", short: "להרשמה בחינם", href: "#register" };

const HERO = {
  title: ["הדרך להביא ערימות של", "לקוחות, כסף והזדמנויות דרך", "קשרים ושת״פים"],
  gold: "בלי להוציא עוד שקל על פרסום",
  banner: "הכסף האמיתי נמצא בקשרים העסקיים ובשת״פים שתבנו",
  meta: "השתתפות ללא עלות | בהרשמה מראש | מספר המקומות מוגבל",
};

const INTRO = {
  title: ["מועדון העסקים של רחלי חדד", "פותח את שעריו ליום אחד"],
  sub: "אתם מוזמנים להיכנס להדרכה שלא תשכחו",
  body: [
    { text: "בדרך כלל ההדרכות, הכלים והאסטרטגיות שאנחנו מלמדות בתוך המועדון" },
    { text: "שמורים לחברי המועדון בלבד.", strong: true },
    { text: "הפעם החלטנו לעשות משהו אחר:" },
    { text: "לפתוח את הדלתות ולאפשר גם לכם לקבל טעימה אמיתית ממה שקורה בפנים.", strong: true },
    { text: "אנחנו מזמינות אתכם להדרכה מיוחדת ופתוחה," },
    { text: "ללא עלות", strong: true, tail: ", בנושא שיכול לשנות את הדרך שבה אתם מגדילים את העסק." },
  ] as { text: string; strong?: boolean; tail?: string }[],
};

const WAYS = {
  title: ["יש שתי דרכים לגדול", "אפשר לעבוד קשה. ואפשר לעבוד נכון."],
  cards: [
    {
      number: "1",
      title: "הדרך הארוכה",
      body: "לרדוף אחרי עוד לקוח, ועוד לקוח, ועוד אחד. כל חודש מתחילים מאפס, וכל לקוח חדש עולה עוד כסף בפרסום.",
      bullets: ["התקציב לפרסום רק גדל", "כל עסקה נסגרת בכוח", "החשיפה נעצרת ברגע שמפסיקים לשלם"],
    },
    {
      number: "2",
      title: "הדרך של הקשרים",
      body: "ליצור את החיבורים הנכונים – כאלה שפותחים בפניכם קהלים חדשים, הזדמנויות חדשות ודלתות שלא הייתם מגיעים אליהן לבד.",
      bullets: ["חשיפה לקהל שכבר בנוי ובוטח", "שני הצדדים מרוויחים, ולכן זה מחזיק", "חיבור אחד ממשיך להחזיר שנים"],
    },
  ],
};

const CURRICULUM = {
  title: "בהדרכה רחלי חדד תחשוף",
  items: [
    { number: "01", title: "לזהות את האנשים הנכונים", body: "מי בדיוק יכול לקדם את העסק שלכם ואיך מזהים אותם לפני כולם." },
    { number: "02", title: "ליצור קשר מאפס", body: "איך פונים ובונים קשר עסקי גם עם אנשים שעדיין לא מכירים אתכם." },
    { number: "03", title: "לבנות שת״פ שמחזיק", body: "המבנה של שיתוף פעולה שבו שני הצדדים באמת מרוויחים ולכן הוא ממשיך." },
    { number: "04", title: "להפוך חיבור לחשיפה", body: "איך חיבור אחד הופך לקהל חדש שלם ולשורה של הזדמנויות עסקיות." },
    { number: "05", title: "לבנות רשת שעובדת בשבילכם", body: "איך בונים סביבכם רשת קשרים שהופכת למנוע צמיחה משמעותי בעסק." },
  ],
};

/** TODO: לאמת מול Figma — תומלל מצילום ברזולוציה נמוכה. */
const ABOUT = {
  title: ["מי אני?", "ואיך אני יכולה", "לעזור לך?"],
  badges: [
    { value: "3 עסקים", label: "6 ספרות בחודש" },
    { value: "1,000+", label: "למדו את השיטה" },
  ],
  body: [
    { lead: "התחלתי בגיל 20", text: " בלי רקע עסקי, בלי עורף פיננסי, עברתי פשיטת רגל, ומשם בניתי הכל מחדש." },
    { lead: "היום אני מנהלת 3 עסקים", text: " שמכניסים 6 ספרות בחודש, ב-4 ימי עבודה בשבוע, תוך כדי טיולים בעולם." },
    { lead: "בדרך לימדתי למעלה מ-1,000 בעלי עסקים ומשפחות", text: " איך לבנות עסק שמכניס יותר, ואיך לפתוח דלתות דרך קשרים ושת״פים." },
  ],
  closer: "וזה בדיוק מה שאני מלמדת בהדרכה.",
};

const FORM = {
  title: "שמרו לי מקום בהדרכה",
  fields: [
    { name: "name", label: "שם מלא", type: "text", autoComplete: "name" },
    { name: "phone", label: "טלפון", type: "tel", autoComplete: "tel" },
    { name: "email", label: "אימייל", type: "email", autoComplete: "email" },
  ],
  submit: "שמרו לי מקום",
  note: "השתתפות ללא עלות | בהרשמה מראש | מספר המקומות מוגבל — נשלח לכם את הקישור והתזכורת במייל",
};

const QUOTE = ["חיבור אחד יכול לשנות", "את כל השנה הבאה שלכם"];

/* ------------------------------------------------------------------ */
/* עזרים                                                               */
/* ------------------------------------------------------------------ */

/**
 * A reserved space for an image. The caption underneath names the file that
 * belongs here, so the slot stays readable while the asset is missing.
 */
function ImageSlot({
  src,
  alt,
  note,
  className = "",
  imgClassName = "",
  captionAtTop = false,
}: {
  src: string;
  alt: string;
  note: string;
  className?: string;
  imgClassName?: string;
  captionAtTop?: boolean;
}) {
  const file = src.split("/").pop();
  return (
    <div className={`relative overflow-hidden bg-sand-lt ${className}`}>
      <div
        className={`absolute inset-0 grid justify-center gap-1 px-4 text-center text-forest ${
          captionAtTop ? "content-start pt-6 sm:pt-10" : "content-center"
        }`}
      >
        <b className="text-sm sm:text-base">{file}</b>
        <span className="text-xs opacity-70 sm:text-sm">{note}</span>
      </div>
      <img
        src={src}
        alt={alt}
        onError={(e) => e.currentTarget.remove()}
        className={`relative h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

const NODES: [number, number][] = [
  [40, 118], [132, 62], [214, 150], [296, 40], [352, 128], [440, 78],
  [508, 160], [596, 52], [664, 132], [744, 68], [812, 152], [900, 46],
  [962, 124], [1048, 74], [1120, 158], [1204, 56], [1272, 136], [1360, 88],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
  [0, 2], [1, 4], [3, 5], [4, 6], [5, 8], [7, 9], [8, 10], [9, 12], [11, 13],
  [12, 14], [13, 16], [15, 17],
];

/** Fixed points, so server and client render identical markup. */
function NetworkGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1400 200" preserveAspectRatio="none" className={className} aria-hidden focusable="false">
      <g stroke="hsl(var(--forest))" strokeWidth="1" opacity="0.28">
        {EDGES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
        ))}
      </g>
      <g fill="hsl(var(--forest))" opacity="0.42">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* הדף                                                                 */
/* ------------------------------------------------------------------ */

export default function ConnectionsLanding() {
  return (
    <div dir="rtl" className="min-h-[100dvh] w-full bg-white font-sans text-forest-dp">
      {/* 1 — hero */}
      <section className="relative bg-forest px-4 pb-10 pt-20 text-center sm:px-8 sm:pt-24 lg:pb-16">
        <Button asChild size="sm" className="absolute left-4 top-5 rounded-full bg-sand font-bold text-forest-dp hover:bg-sand/90 sm:left-8 sm:top-7">
          <a href={CTA.href}>
            {CTA.short}
            <ArrowLeft className="size-4" aria-hidden />
          </a>
        </Button>

        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-[clamp(1.75rem,4.4vw,3.25rem)] font-black leading-[1.25] text-white">
            {HERO.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
            <span className="mt-1 block text-[1.1em] text-sand">{HERO.gold}</span>
          </h1>

          <p className="mt-10 rounded-full bg-sand px-6 py-4 text-[clamp(1rem,1.9vw,1.3rem)] font-medium text-forest-dp sm:mt-12 sm:px-10">
            {HERO.banner}
          </p>

          <p className="mt-6 text-sm italic text-parchment/70 sm:text-base">{HERO.meta}</p>
        </div>
      </section>

      {/* 2 — photo band. The cut-out overlaps past the bottom edge into the parchment. */}
      <section className="bg-forest">
        <div className="relative">
          <ImageSlot
            src="/lp/lobby.png"
            alt="רחלי חדד באולם כניסה מוזהב. מאחוריה חמש קשתות ועל כל אחת שלט: לקוחות, שיתוף פעולה, קהל חדש, עסקאות וקהילה"
            note="אולם הכניסה עם חמש הקשתות · 16:9 · רוחב מלא"
            className="aspect-[16/9] w-full"
            captionAtTop
          />
          <ImageSlot
            src="/lp/racheli-yellow.png"
            alt=""
            note="רקע שקוף"
            className="pointer-events-none absolute bottom-[-14%] left-1/2 z-10 h-[116%] w-auto aspect-[2/3] -translate-x-1/2 border-2 border-dashed border-forest-lt bg-parchment/90"
            imgClassName="object-contain"
          />
        </div>
        <div className="bg-parchment">
          <NetworkGraphic className="h-[clamp(6rem,10vw,12rem)] w-full" />
        </div>
      </section>

      {/* 3 — club intro */}
      <section className="bg-parchment px-4 pb-16 text-center sm:px-8 lg:pb-28">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-black leading-[1.3] text-forest">
            {INTRO.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>

          <p className="mt-5 text-[clamp(1.05rem,2.2vw,1.5rem)] text-forest-dp">{INTRO.sub}</p>

          <div className="mt-8 grid gap-2 text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed text-forest-dp/90">
            {INTRO.body.map((line) => (
              <p key={line.text}>
                {line.strong ? <strong className="font-bold">{line.text}</strong> : line.text}
                {line.tail}
              </p>
            ))}
          </div>

          <Button asChild size="lg" className="mt-10 rounded-full bg-forest px-8 font-bold text-parchment hover:bg-forest-dp">
            <a href={CTA.href}>
              {CTA.label}
              <ArrowLeft className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </section>

      {/* 4 — two ways */}
      <section className="bg-white px-4 py-16 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center text-[clamp(1.6rem,3.8vw,3rem)] font-black leading-[1.3] text-forest">
            {WAYS.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
            {WAYS.cards.map((card) => (
              <article
                key={card.number}
                style={{ backgroundImage: "url(/lp/gold-money.png)" }}
                className="relative h-full overflow-hidden rounded-[2rem] bg-cover bg-center p-8 sm:p-10 lg:min-h-[26rem]"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(170_27%_60%/0.9)] via-[hsl(172_31%_43%/0.92)] to-[hsl(172_44%_31%/0.95)]" />
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.3),transparent_60%)]" />

                <div className="relative">
                  <span aria-hidden className="block text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-none text-gold-lt/85">
                    {card.number}
                  </span>
                  <h3 className="mt-6 text-[clamp(1.15rem,2.2vw,1.5rem)] font-black text-white">{card.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/90">{card.body}</p>
                  <ul className="mt-7 grid gap-2.5">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-white/90">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-white/80" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — curriculum, three across then two centred */}
      <section className="bg-white px-4 pb-16 sm:px-8 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-[clamp(1.6rem,3.8vw,3rem)] font-black leading-[1.3] text-forest">
            {CURRICULUM.title}
          </h2>

          <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8">
            {CURRICULUM.items.map((item, i) => (
              <article
                key={item.number}
                className={`relative h-full rounded-3xl border border-sand-lt bg-white px-6 pb-7 pt-12 text-center shadow-[0_2px_18px_hsl(var(--forest)/0.07)] lg:col-span-2 ${
                  i === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <span aria-hidden className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest" />
                <h3 className="text-[clamp(1.05rem,1.9vw,1.25rem)] font-black text-forest">
                  {item.number} • {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-forest-dp/80">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — about */}
      <section className="bg-forest px-4 py-16 sm:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.6rem,3.6vw,3rem)] font-black leading-[1.3] text-white">
              {ABOUT.title.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>
            <div className="mt-8 grid gap-5 leading-relaxed text-parchment/85">
              {ABOUT.body.map((para) => (
                <p key={para.lead}>
                  <strong className="font-bold text-sand">{para.lead}</strong>
                  {para.text}
                </p>
              ))}
              <p className="font-bold text-white">{ABOUT.closer}</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <ImageSlot
              src="/lp/racheli-pink.png"
              alt="רחלי חדד"
              note="פורטרט · ריבועי · רקע שקוף"
              className="aspect-square rounded-b-[2rem] rounded-t-full bg-sand/25"
            />
            {ABOUT.badges.map((badge, i) => (
              <span
                key={badge.label}
                className={`absolute -left-2 rounded-2xl bg-white px-4 py-2 text-center shadow-lg sm:-left-8 ${
                  i === 0 ? "top-8" : "bottom-10"
                }`}
              >
                <span className="block text-xs font-bold text-forest-lt">{badge.value}</span>
                <span className="block text-sm font-black text-forest">{badge.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — registration */}
      <section id="register" className="scroll-mt-8 bg-white px-4 pb-16 sm:px-8 lg:pb-28">
        <div className="mx-auto w-full max-w-3xl rounded-[2.5rem] bg-parchment px-6 py-12 sm:px-12 lg:py-16">
          <h2 className="text-center text-[clamp(1.6rem,3.6vw,3rem)] font-black leading-tight text-forest">
            {FORM.title}
          </h2>

          <form className="mx-auto mt-10 grid max-w-xl gap-4">
            {FORM.fields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-1.5 block text-sm font-bold text-forest">{field.label}</span>
                <Input type={field.type} name={field.name} autoComplete={field.autoComplete} required className="border-sand-lt bg-white" />
              </label>
            ))}
            <Button type="submit" size="lg" className="mt-2 w-full rounded-full bg-forest font-bold text-parchment hover:bg-forest-dp">
              {FORM.submit}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-forest-dp/70">{FORM.note}</p>
        </div>
      </section>

      {/* 8 — closing */}
      <section className="relative overflow-hidden bg-forest px-4 pb-24 pt-16 text-center sm:px-8 lg:pb-36 lg:pt-28">
        <blockquote className="relative mx-auto w-full max-w-4xl">
          <span aria-hidden className="mb-1 block text-right text-[clamp(3rem,6vw,4.5rem)] leading-none text-sand/50">
            &rdquo;
          </span>
          <p className="text-[clamp(1.6rem,3.6vw,3rem)] font-black leading-[1.3] text-white">{QUOTE[0]}</p>
          <p className="mt-1 text-[clamp(1.25rem,2.8vw,2.25rem)] font-light leading-[1.3] text-parchment/90">{QUOTE[1]}</p>
        </blockquote>
        <NetworkGraphic className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-40 sm:h-36" />
      </section>
    </div>
  );
}
