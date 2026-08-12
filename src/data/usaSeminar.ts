/**
 * "עושים אהבה עם הפחד מכסף" — the two-day US seminar, autumn 2026.
 *
 * All copy for /usa lives here. Nothing in the components is hard-coded.
 *
 * PRICES ARE IN USD, and deliberately kept as display strings rather than
 * catalogue products: the store in `products.ts` is priced in ILS and settles
 * through Cardcom, so putting "35" into that catalogue would charge ₪35 rather
 * than $35.
 *
 * There is no US payment link yet, so no money changes hands on this page.
 * Every CTA scrolls to the in-page registration form, which reserves a seat and
 * hands the lead to Racheli's team to collect payment. The copy says so out
 * loud — a "$35" button that silently charges nothing would be misleading.
 */

export const usaSeminar = {
  eyebrow: "רחלי חדד מגיעה לארצות הברית",
  flag: "🇺🇸",
  title: "עושים אהבה עם הפחד מכסף",
  lede: "סמינר פרונטלי של יומיים שישנה את הדרך שבה אתם חושבים, מרגישים ומתנהלים עם כסף.",
  year: "ארה״ב 2026",

  /** Anchor of the in-page registration form. Every CTA on the page points here. */
  registerHref: "#register",

  cta: {
    hero: "אני רוצה להיות שם — $35",
    final: "אני רוצה לשריין מקום — $35",
    sticky: "לשריון מקום",
  },
  urgency: "מכירה מוקדמת · מספר המקומות מוגבל",
} as const;

/* ------------------------------------------------------------------ */
/* Cities                                                              */
/* ------------------------------------------------------------------ */

export type SeminarCity = {
  id: string;
  name: string;
  /** Latin name for the display lockup — rendered LTR inside the RTL page. */
  latin: string;
  dates: string;
  /** ISO dates for the Event structured data. */
  start: string;
  end: string;
  locality: string;
  region: string;
};

export const cities: SeminarCity[] = [
  {
    id: "miami",
    name: "מיאמי",
    latin: "MIAMI",
    dates: "27–28 באוקטובר 2026",
    start: "2026-10-27",
    end: "2026-10-28",
    locality: "Miami",
    region: "FL",
  },
  {
    id: "los-angeles",
    name: "לוס אנג׳לס",
    latin: "LOS ANGELES",
    dates: "2–3 בנובמבר 2026",
    start: "2026-11-02",
    end: "2026-11-03",
    locality: "Los Angeles",
    region: "CA",
  },
];

export const citiesSection = {
  title: "מיאמי או לוס אנג׳לס?",
  sub: "שתי ערים, אותו תהליך. בחרו את התאריך שמתאים לכם.",
  note: "מספר המקומות מוגבל.",
  cta: "לשריון מקום",
} as const;

/* ------------------------------------------------------------------ */
/* The problem                                                         */
/* ------------------------------------------------------------------ */

export const problem = {
  title: "כסף לא חייב להפחיד אתכם.",
  intro: "אבל אם בכל פעם שאתם:",
  triggers: [
    "פותחים את חשבון הבנק",
    "מתמחרים את עצמכם",
    "מבקשים העלאה",
    "מקבלים החלטה עסקית",
    "חושבים על העתיד הכלכלי שלכם",
  ],
  turn: "אתם מרגישים כיווץ, לחץ או פחד —",
  reveal: "כנראה שהבעיה שלכם היא לא רק כסף.",
  punch: "היא מערכת היחסים שלכם איתו.",
  close: "ובמשך יומיים אנחנו הולכים לפתוח אותה.",
} as const;

/* ------------------------------------------------------------------ */
/* The promise                                                         */
/* ------------------------------------------------------------------ */

export const imagine = {
  eyebrow: "תחשבו איך זה ירגיש",
  title: "אחרי היומיים האלה",
  items: [
    "לפתוח את חשבון הבנק בלי שהלב יקפוץ.",
    "להגיד מחיר בלי להתנצל.",
    "להסתכל על הזדמנות בלי לחשוב מיד „אין לי”.",
    "לדבר עם הילדים על כסף בלי פחד.",
    "להרוויח יותר בלי להרגיש שאתם כל הזמן במרדף.",
    "לקבל החלטות כלכליות ממקום של ביטחון — ולא של הישרדות.",
  ],
  outro: ["זה לא חלום.", "זה מתחיל בדרך שבה אתם מנהלים את מערכת היחסים שלכם עם כסף."],
} as const;

/* ------------------------------------------------------------------ */
/* Agenda                                                              */
/* ------------------------------------------------------------------ */

export const agenda = {
  eyebrow: "התוכנית",
  title: "מה נעשה ביומיים האלה?",
  steps: [
    {
      title: "נזהה את האמונות והדפוסים",
      body: "את מה שמנהל אתכם מאחורי הקלעים — הרבה לפני שהחלטה כלכלית בכלל מגיעה לשולחן.",
    },
    {
      title: "נשבור את הסיפורים",
      body: "את הסיפורים שסיפרתם לעצמכם על כסף, ושהפכו עם השנים לעובדות.",
    },
    {
      title: "נבין את ההתנהלות",
      body: "למה אתם מתנהלים מול כסף בדיוק כמו שאתם מתנהלים — ומאיפה זה הגיע.",
    },
    {
      title: "נעבוד על הליבה",
      body: "ערך, קבלה, תמחור, פחד וקבלת החלטות. חמישה שרירים שמייצרים את כל השאר.",
    },
    {
      title: "נצא עם כלים",
      body: "כלים ותרגילים שאפשר לקחת ישר לחיים ולעסק — כבר ביום שאחרי.",
    },
  ],
  punch: ["לא עוד הרצאה.", "לא עוד מוטיבציה.", "עבודה אמיתית."],
} as const;

/* ------------------------------------------------------------------ */
/* Racheli's story                                                     */
/* ------------------------------------------------------------------ */

export const story = {
  eyebrow: "למה דווקא אני",
  title: "הסיפור שלי התחיל במקום אחר לגמרי.",
  paragraphs: [
    "בגיל 24 הייתי בחובות של מיליוני שקלים. פחדתי מכסף. פחדתי מהבנקים. פחדתי מהעתיד.",
    "ושנה לאחר מכן עשיתי את המיליון הראשון שלי.",
    // „שלושה ימים” לפי טיוטת הסמינר, באישור מפורש.
    // שימו לב: שאר האתר (hero.sub, aboutTeaser, aboutPage) ורשימת העובדות
    // המאומתות ב-CLAUDE.md אומרים 4 ימי עבודה. הפער הזה מודע וממתין להכרעת רחלי.
    "מאז בניתי עסקים, השקעות ואורח חיים שמאפשר לי לעבוד כשלושה ימים בשבוע ולחיות את החיים שאני רוצה.",
    "והיום אני רוצה לפתוח בפניכם את מה שלמדתי בדרך.",
  ],
  milestones: [
    { value: "24", label: "הגיל שבו הייתי במיליוני שקלים חוב" },
    { value: "12", label: "חודשים עד המיליון הראשון" },
    { value: "1,000+", label: "בעלי עסקים ומשפחות שליוויתי מאז" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Voices                                                              */
/* ------------------------------------------------------------------ */

/**
 * Real quotes from past participants, supplied by Racheli.
 * Do not add invented testimonials here — see CLAUDE.md.
 */
export const voices = {
  eyebrow: "מי שכבר היו",
  title: "ומה אומרים מי שכבר עברו את היומיים האלה?",
  quotes: [
    {
      name: "Keren",
      quote:
        "קיבלתי בהירות לגבי האמונות המגבילות שלי לגבי כסף וכלים ברורים לעבודה עצמית.",
    },
    {
      name: "Atalia",
      quote:
        "יצאתי עם המון תובנות... ובעיקר עם כלים שהציתו אצלי את ניצוץ הלהבה של המעבר להגשמה.",
    },
    {
      name: "Dana",
      quote:
        "יצאתי עם ים משפטים ותובנות... לחלוטין שינית אצלי דפוסי חשיבה והתנהלות.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* What's included                                                     */
/* ------------------------------------------------------------------ */

export const included = {
  eyebrow: "מה תקבלו",
  title: "כל מה שכלול בשני הימים",
  items: [
    "יומיים של סמינר פרונטלי",
    "תרגילים ועבודה אישית",
    "חוברת עבודה",
    "כלים להתבוננות והתנהלות אחרת מול כסף",
    "קהילה של ישראלים שעוברים את התהליך יחד",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Tickets                                                             */
/* ------------------------------------------------------------------ */

export type Ticket = {
  id: string;
  name: string;
  /** Display price in USD. `null` = not published yet — never invent one. */
  price: string | null;
  priceNote: string;
  perks: string[];
  cta: string;
  featured?: boolean;
  accent: "gold" | "coral" | "peri";
};

export const ticketsSection = {
  eyebrow: "כרטיסים",
  title: "בחרו את המקום שלכם",
  sub: "מחירי מכירה מוקדמת, כל עוד יש מקומות.",
} as const;

export const tickets: Ticket[] = [
  {
    id: "regular",
    name: "כרטיס רגיל",
    price: "$35",
    priceNote: "לאדם אחד",
    perks: ["כניסה ליומיים המלאים", "חוברת עבודה", "כל התרגילים והעבודה האישית"],
    cta: "אני בפנים",
    accent: "gold",
  },
  {
    id: "vip",
    name: "VIP",
    // רחלי עדיין לא פרסמה מחיר ל-VIP („$_” במסמך המקור). לא להמציא מחיר —
    // ראו את הכלל ב-CLAUDE.md. להוסיף כאן מחרוזת ברגע שהמחיר מאושר.
    price: null,
    priceNote: "מספר מקומות מצומצם",
    perks: [
      "מקום קרוב לבמה",
      "הדרכה מיוחדת לפני הסמינר",
      "חוברת עבודה",
      "כל מה שכלול בכרטיס הרגיל",
    ],
    cta: "אני רוצה VIP",
    featured: true,
    accent: "peri",
  },
  {
    id: "duo",
    name: "כרטיס זוגי",
    price: "$65",
    priceNote: "שני אנשים · יומיים",
    perks: ["כניסה ליומיים לשני משתתפים", "שתי חוברות עבודה", "לבוא ולעבור את זה ביחד"],
    cta: "אני רוצה לבוא בזוג",
    accent: "coral",
  },
];

/* ------------------------------------------------------------------ */
/* Registration                                                        */
/* ------------------------------------------------------------------ */

export const register = {
  eyebrow: "שריון מקום",
  title: "שומרים לכם כיסא",
  sub: "משאירים פרטים, ואנחנו חוזרים אליכם עם אישור המקום והשלמת התשלום.",
  /** Said plainly, because the buttons show a dollar price. */
  note: "הטופס לא גובה תשלום. הוא משריין את המקום שלכם, ומישהי מהצוות תיצור איתכם קשר להשלמת ההרשמה.",
  fields: {
    fullName: "שם מלא",
    email: "אימייל",
    phone: "טלפון",
    city: "באיזו עיר?",
    ticket: "איזה כרטיס?",
    notes: "משהו שכדאי שנדע? (לא חובה)",
  },
  submit: "שריינו לי מקום",
  submitting: "שולח…",
  success: {
    title: "המקום שלכם נשמר 🎉",
    body: "קיבלנו את הפרטים. ניצור אתכם קשר בימים הקרובים עם אישור המקום והשלמת התשלום.",
  },
  genericError: "משהו השתבש בשליחה. נסו שוב בעוד רגע.",
} as const;

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

export const closing = {
  lines: ["אולי הגיע הזמן להפסיק לפחד מכסף.", "ולהתחיל להשתמש בו ככלי לחופש."],
} as const;
