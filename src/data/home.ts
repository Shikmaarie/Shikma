/**
 * Copy for the home page, laid out in the seven-band structure.
 *
 * Sources, so future edits stay honest:
 *  - Hero copy, the three free guides, the community block and the success
 *    line are Racheli's own, lifted from the live rachelihadad.co.il.
 *  - The stat block follows the verified figures in CLAUDE.md (18 years,
 *    3 businesses, 1,000+ mentored, a 4-day week) rather than the numbers
 *    currently on the live site, which disagree. Racheli decides which set
 *    is right; change them here, nowhere else.
 *  - No family names appear in the greeting. See CLAUDE.md.
 */

/** An image the design calls for but that we don't hold a file for yet.
 *  Give it a `src` under /public and the placeholder disappears. */
export type Slot = {
  src?: string;
  alt: string;
  /** Intrinsic size from the design — keeps the box honest before the file lands. */
  width: number;
  height: number;
};

export const homeHero = {
  eyebrow: "מנטורית עסקית מובילה",
  /** Four lines, the way the wordmark tagline breaks. Gold on the last two. */
  title: [
    { text: "מכפילה", gold: false },
    { text: "עסקים", gold: false },
    { text: "בונה", gold: true },
    { text: "אימפריות", gold: true },
  ],
  sub: "לחיים שאתם באמת רוצים",
  portrait: {
    alt: "רחלי חדד",
    width: 672,
    height: 840,
  } satisfies Slot,
  stats: [
    { value: "18", suffix: "שנים", label: "של ניסיון מהשטח" },
    { value: "3", suffix: "עסקים", label: "ב-6 ספרות בחודש" },
    { value: "1,000+", suffix: "מלווים", label: "בעלי עסקים ומשפחות" },
    { value: "4", suffix: "ימים", label: "שבוע עבודה מלא" },
  ],
  kicker: "מאות אנשים כבר שברו תקרות זכוכית עם השיטה שלי — עכשיו תורכם!",
} as const;

export const giftsIntro = {
  badge: "ללא עלות",
  title: "קבלו ממני מתנות מיוחדות",
  sub: "שלושה חומרים שאני נותנת במלואם, בלי תשלום ובלי תנאים — הם הבסיס לכל מה שאני מלמדת.",
} as const;

export type Gift = {
  badge: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: Slot;
};

export const gifts: Gift[] = [
  {
    badge: "להורדה בחינם",
    title: "שיעורים על כסף שאף אחד לא לימד אותי",
    body: "המדריך שיגלה לכם את האמת על כסף, חובות וחיסכון — מה שלא לימדו אתכם בבית הספר.",
    cta: { label: "להורדת המדריך", href: "/books" },
    image: {
      alt: "מדריך: שיעורים על כסף שאף אחד לא לימד אותי",
      width: 320,
      height: 531,
    },
  },
  {
    badge: "להורדה בחינם",
    title: 'סדרת הסרטונים "סוד המיליון"',
    body: "איך להפוך את העסק שלכם לשיטה שמשכפלת הצלחה ורווחים — הסוד נמצא בשיטה, לא בעבודה הקשה.",
    cta: { label: "לצפייה בסדרה", href: "/programs" },
    image: {
      alt: 'סדרת הסרטונים "סוד המיליון"',
      width: 448,
      height: 252,
    },
  },
  {
    badge: "מתנה נוספת",
    title: "לצאת לעצמאות — המדריך",
    body: "כל מה שצריך לדעת כדי לעשות את הצעד משכירות לעצמאות בביטחון ובהצלחה.",
    cta: { label: "להורדת המדריך", href: "/books" },
    image: {
      alt: "מדריך: לצאת לעצמאות",
      width: 448,
      height: 300,
    },
  },
];

export const videoFeature = {
  eyebrow: "צפו לפני שמתחילים",
  title: "השיטה, בעשר דקות",
  body: "לפני שאתם קונים עוד קורס או מנסים עוד טקטיקת שיווק — תנו לי עשר דקות להסביר למה רוב העסקים תקועים במקום שבו הם תקועים, ומה באמת מזיז את המחט.",
  /** Paste the YouTube id here (the part after `v=`) and the embed goes live. */
  youtubeId: "",
  poster: {
    alt: "רחלי חדד מסבירה את השיטה",
    width: 640,
    height: 360,
  } satisfies Slot,
} as const;

export const greeting = {
  eyebrow: "שלום וברכה",
  title: "נעים להכיר, רחלי חדד",
  paragraphs: [
    "התחלתי בגיל 20 בלי שום רקע, בלי עורף פיננסי ובמינוס עמוק — עד לפשיטת רגל כואבת. משם בניתי הכול מחדש.",
    // שמות בני המשפחה הושמטו בכוונה — לא לפרסם ללא אישור מפורש של רחלי.
    "היום אני מנהלת שלוש חברות ב-4 ימי עבודה בשבוע, מטיילת בעולם עם המשפחה שלי, ומלווה למעלה מ-1,000 בעלי עסקים ומשפחות בדרך לחופש כלכלי אמיתי.",
    "אין לי סבלנות לתירוצים או לסיסמאות ריקות. אני מלמדת את מה שעובד במציאות — ואת זה בדיוק תקבלו כאן.",
  ],
  signOff: "רחלי חדד",
  cta: { label: "לסיפור המלא", href: "/about" },
  portrait: {
    alt: "רחלי חדד",
    width: 660,
    height: 365,
  } satisfies Slot,
} as const;

export const successStories = {
  eyebrow: "סיפורי הצלחה",
  title: "הם כבר שברו את התקרה",
  sub: "למעלה מ-1,000 בעלי עסקים ומשפחות עברו תהליך והגיעו ליציבות, לרווחיות ולחופש כלכלי.",
  cta: { label: "לכל ההמלצות", href: "/about" },
} as const;

export const communityCta = {
  eyebrow: "בלי עלות, בלי התחייבות",
  title: "הצטרפו לקהילה בחינם",
  body: "קהילה של מומחים בעסקים. הישארו מעודכנים בנושאים הכי חמים וקבלו מתנות שוות.",
  cta: { label: "הצטרפו לקהילה", href: "" }, // filled from site.whatsapp
  secondary: { label: "לתוכניות הליווי", href: "/programs" },
  image: {
    alt: "רחלי חדד",
    width: 800,
    height: 792,
  } satisfies Slot,
} as const;
