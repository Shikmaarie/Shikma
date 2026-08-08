export type ProductCategory = "business" | "wealth" | "club" | "books";

/**
 * How a product is acquired:
 *  - "purchase"    — has a published price, goes through the cart and Cardcom.
 *  - "application" — high-ticket mentoring with no public price; the CTA opens
 *                    a fit call instead of a checkout. Add a `price` and flip
 *                    to "purchase" once a figure is approved.
 *  - "free"        — lead magnet; registration only, never enters the cart.
 */
export type ProductMode = "purchase" | "application" | "free";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  mode: ProductMode;
  /** Price in ILS incl. VAT. Required for `mode: "purchase"`. */
  price?: number;
  /** Strike-through anchor price. */
  compareAt?: number;
  /** Max instalments offered on the Cardcom page. */
  maxPayments: number;
  /** Charged after an introductory period. */
  recurring?: { period: "month"; amount: number };
  /** Shown under the price, e.g. shipping or renewal wording. */
  priceNote?: string;
  badge?: string;
  featured?: boolean;
  summary: string;
  /** Longer body shown on the category page, when the summary isn't enough. */
  detail?: string;
  includes: string[];
  forWho: string[];
  accent: "gold" | "rose" | "orchid";
};

export const products: Product[] = [
  /* ---------------- Business programs ---------------- */
  {
    slug: "platinum-business",
    name: "Platinum Business",
    tagline: "תוכנית עילית שנתית · 12 חודשים",
    category: "business",
    mode: "application",
    maxPayments: 12,
    badge: "התוכנית המובילה",
    featured: true,
    summary:
      "התוכנית לבעלי ובעלות עסקים שכבר מרוויחים 15,000 ₪ ומעלה בחודש ורוצים לפרוץ לשש ספרות בחודש. שנה שלמה של בנייה שיטתית — מזהות מנכ״ל ועד סקייל.",
    detail:
      "התוכנית בנויה מ-4 רבעונים: זהות מנכ״ל · מנהיגות ועובדים · שיווק מתקדם ומכירות פרימיום · סקייל, AI וניהול עסק כחברה.",
    includes: [
      "4 רבעונים מובנים לאורך 12 חודשים",
      "זהות מנכ״ל — המעבר מבעל מקצוע למנהל חברה",
      "מנהיגות, גיוס וניהול עובדים",
      "שיווק מתקדם ומכירות פרימיום",
      "סקייל, בינה מלאכותית וניהול עסק כחברה",
      "מפגשי מאסטרמיינד",
      "גישה לכל תוכניות הפרימיום",
      "ליווי צמוד שלי לאורך כל השנה",
    ],
    forWho: [
      "בעלי עסקים שמרוויחים 15,000 ₪ ומעלה בחודש",
      "מי שרוצה לפרוץ ל-100,000 ₪ ומעלה בחודש",
      "מי שמוכן לנהל חברה ולא רק לעבוד בעסק",
    ],
    accent: "gold",
  },
  {
    slug: "dna-of-business",
    name: "ה-DNA של העסק",
    tagline: "תוכנית הדגל · 8 חודשים · 4 סמינרי עומק",
    category: "business",
    mode: "application",
    maxPayments: 10,
    featured: true,
    summary:
      "תוכנית הדגל שלי, לבעלי עסקים שמרגישים תקועים, עובדים קשה מדי ורוצים סוף סוף לבנות בסיס יציב שמחזיק את הצמיחה.",
    detail:
      "שמונה חודשים שבנויים מארבעה סמינרי עומק, כל אחד מהם שכבה נוספת בבסיס העסק.",
    includes: [
      "בריאה — מערכת ההפעלה של האדם והיקום",
      "השפעה — שיווק בולט ופסיכולוגיה סוחפת",
      "סגירה — מכירות באמון מלא, בלי תסריטים לוחצים",
      "100X — אפקטיביות שמכפילה תוצאות בפחות זמן",
    ],
    forWho: [
      "בעלי עסקים שמרגישים תקועים למרות עבודה קשה",
      "מי שהעסק שלו רץ בלי בסיס יציב מתחתיו",
      "מי שרוצה לשנות את השורש ולא רק את הטקטיקה",
    ],
    accent: "orchid",
  },
  {
    slug: "independence",
    name: "לצאת לעצמאות",
    tagline: "6 חודשי ליווי · משכירות לעסק אונליין",
    category: "business",
    mode: "application",
    maxPayments: 10,
    badge: "נקודת הכניסה",
    featured: true,
    summary:
      "לשכירים ושכירות שמרגישים תקרת זכוכית ורוצים לבנות עסק אונליין אמיתי מאפס — כולל כל התשתית הדיגיטלית, לא רק התיאוריה.",
    detail:
      "שישה חודשי ליווי מובנים שמעבירים אתכם מחשיבה של שכירים לזהות של בעלי עסק.",
    includes: [
      "20 הדרכות זום",
      "8 מפגשי מנטורינג אישי",
      "ליווי סושיאל ומעצבת גרפית",
      "בניית דף נחיתה",
      "הקמת מערכת סליקה",
      "בניית המוצר הראשון שלכם",
    ],
    forWho: [
      "שכירים שמרגישים תקרת זכוכית",
      "מי שרוצה לבנות עסק אונליין מאפס",
      "מי שצריך גם את הראש וגם את התשתית הטכנית",
    ],
    accent: "gold",
  },

  /* ---------------- Wealth & mindset ---------------- */
  {
    slug: "dna-of-wealth",
    name: "ה-DNA של העושר",
    tagline: "מסע זוגי ומשפחתי · 240 יום · 4 סמינרים",
    category: "wealth",
    mode: "application",
    maxPayments: 12,
    badge: "מסע שנתי",
    featured: true,
    summary:
      "מסע זוגי ומשפחתי שנתי בן 4 סמינרים היברידיים — פרונטלי וזום — שנועד לחלץ אתכם מהישרדות כלכלית ולבנות חופש לדורות קדימה.",
    // אורית גביר הופיעה כאן בטעות כאורחת מומחית — היא לקוחה של רחלי.
    // לא להחזיר אותה לרשימה הזו.
    includes: [
      "4 סמינרים היברידיים לאורך 240 יום",
      "ליווי שבועי צמוד",
      "נוי שגב — דרמה-תרפיסטית לשחרור דפוסים",
      "נילי שטיין — כלכלנית ומשקיעת נדל״ן",
    ],
    forWho: [
      "זוגות שרוצים לשנות את התמונה הכלכלית ביחד",
      "משפחות שרוצות לבנות שפה משותפת סביב כסף",
      "מי שרוצה לעצור את הדפוס לפני שהוא עובר לילדים",
    ],
    accent: "orchid",
  },
  {
    slug: "money-fear-event",
    name: "עושים אהבה עם הפחד מכסף",
    tagline: "כנס עומק פרונטלי · יומיים · מכון וינגייט",
    category: "wealth",
    mode: "application",
    maxPayments: 6,
    summary:
      "כנס עומק פרונטלי בן יומיים במכון וינגייט, לגברים, נשים ובני נוער מגיל 15. יומיים שמגיעים לשורש של הטראומה הכלכלית — וגם מפרקים אותה.",
    detail: "נקרא גם „נשמה עשירה”.",
    includes: [
      "יומיים פרונטליים במכון וינגייט",
      "זיהוי שורש הטראומה הכלכלית",
      "פירוק ה„כיווץ” מול חשבון הבנק",
      "לתמחר ולדרוש את מה שמגיע לכם",
      "בניית שפה משפחתית משותפת סביב שפע",
    ],
    forWho: [
      "גברים, נשים ובני נוער מגיל 15",
      "מי שמתכווץ בכל פעם שהוא פותח את חשבון הבנק",
      "משפחות שרוצות לעבור את זה יחד",
    ],
    accent: "rose",
  },
  {
    slug: "money-challenge",
    name: "אתגר הכסף והשפע",
    tagline: "6 ימים · קבוצת וואטסאפ סגורה",
    category: "wealth",
    mode: "purchase",
    price: 29,
    maxPayments: 1,
    badge: "הכי קל להתחיל",
    featured: true,
    summary:
      "אתגר דיגיטלי ממוקד בן 6 ימים בקבוצת וואטסאפ סגורה, בעלות סמלית. שיעור ביום, משימה ביום, ותזוזה אמיתית ביחס שלכם לכסף.",
    includes: [
      "שיעור יומי לניפוץ אמונות מגבילות",
      "ניהול תזרים ויציאה מהמינוס",
      "קבוצת וואטסאפ סגורה ומלווה",
      "בונוס: צ׳ק-ליסט הרגלי הכסף של העשירים",
      "בונוס: מדיטציית שפע",
    ],
    forWho: [
      "מי שרוצה להתחיל בלי להתחייב לתהליך ארוך",
      "מי שנמצא במינוס ורוצה לצאת ממנו",
      "מי שמעדיף לעבוד במסגרת של קבוצה",
    ],
    accent: "gold",
  },

  /* ---------------- Club ---------------- */
  {
    slug: "business-club",
    name: "מועדון העסקים",
    tagline: "מנוי חודשי · ללא התחייבות",
    category: "club",
    mode: "purchase",
    price: 37,
    recurring: { period: "month", amount: 187 },
    priceNote: "לחודש הראשון, ואז 187 ₪ בהוראת קבע. אפשר לבטל מתי שרוצים.",
    maxPayments: 1,
    badge: "מחיר השקה",
    featured: true,
    summary:
      "המסגרת שמחזיקה אתכם בתנועה. זום שבועי חי איתי, פודקאסטים קצרים פעמיים בשבוע, וקהילה פעילה שלא נותנת לכם ללכת עם זה לבד — בפחות מ-1.20 ₪ ליום.",
    includes: [
      "זום שבועי חי וממוקד איתי",
      "פודקאסטים קצרים פעמיים בשבוע",
      "קהילה פעילה ומענה קבוצתי צמוד",
      "שיווק, מכירות, מיינדסט, AI, ניהול זמן וחוקי יקום",
      "ללא התחייבות — ביטול בכל עת",
    ],
    forWho: [
      "מי שהיומן שלו מלא והעסק מנהל אותו",
      "מי שצריך מסגרת שבועית שמחזיקה",
      "מי שרוצה להתחיל בעלות נמוכה",
    ],
    accent: "rose",
  },

  /* ---------------- Books & guides ---------------- */
  {
    slug: "first-100k-book",
    name: "ה-100K הראשון שלי",
    tagline: "ספר מודפס · הספר חינם, משלוח בלבד",
    category: "books",
    mode: "purchase",
    price: 45,
    priceNote: "הספר עצמו חינם — זהו תשלום דמי המשלוח בלבד.",
    maxPayments: 1,
    badge: "רב-מכר",
    featured: true,
    summary:
      "הספר שמשלב את הסיפור האישי שלי עם מודלים עסקיים ותובנות לפריצת דרך. הספר עצמו חינם — משלמים רק דמי משלוח.",
    detail:
      "זמין גם באמזון לרכישה בינלאומית ומשלוח מהיר לכל העולם, כולל ארבעת הפרקים המרכזיים: נולדתי מלכה · בוחרת באומץ · עשירים מקימים רשתות · אני גם וגם וגם.",
    includes: [
      "הספר המודפס המלא",
      "הסיפור האישי שלי — בלי גרסה מצוחצחת",
      "מודלים עסקיים מעשיים",
      "תובנות לפריצת דרך",
    ],
    forWho: [
      "מי שרוצה להכיר את הגישה לפני שהוא נכנס עמוק",
      "מי שבונה את ה-100K הראשון שלו",
    ],
    accent: "gold",
  },
  {
    slug: "inspiration-notebook",
    name: "מחברת השראה",
    tagline: "תוספת לספר",
    category: "books",
    mode: "purchase",
    price: 25,
    maxPayments: 1,
    summary:
      "מחברת ההשראה שנלווית לספר — לרשום בה את מה שעולה תוך כדי הקריאה, ולחזור אליו.",
    includes: ["מחברת השראה מודפסת", "נשלחת יחד עם הספר"],
    forWho: ["מי שמזמין את הספר ורוצה לעבוד איתו, לא רק לקרוא אותו"],
    accent: "rose",
  },
  {
    slug: "seven-steps",
    name: "המדריך לחופש כלכלי אמיתי ב-7 צעדים",
    tagline: "מדריך דיגיטלי · גישה מיידית",
    category: "books",
    mode: "purchase",
    price: 49,
    compareAt: 197,
    maxPayments: 1,
    badge: "מבצע",
    featured: true,
    summary:
      "מדריך דיגיטלי ממוקד שמעביר אתכם מחרדה והימנעות מול הבנק — לשליטה פיננסית מלאה. שבעה צעדים, בסדר הנכון.",
    includes: [
      "מודעות — להסתכל על המספרים בלי לברוח",
      "מיפוי מלא של התמונה הכלכלית",
      "יציאה ממינוס",
      "בניית תקציב נושם",
      "חיסכון אוטומטי",
      "בניית נכסים",
    ],
    forWho: [
      "מי שנמנע מלפתוח את אפליקציית הבנק",
      "מי שרוצה סדר בכסף הפרטי לפני שהוא מגדיל אותו",
    ],
    accent: "gold",
  },
  {
    slug: "multiplier-formula",
    name: "נוסחת ההכפלה",
    tagline: "מדריך מעשי · מוגבל ל-50 עותקים",
    category: "books",
    mode: "purchase",
    price: 50,
    maxPayments: 1,
    badge: "מוגבל ל-50 עותקים",
    summary:
      "מדריך מעשי להכפלת הכנסות, זמן ושקט נפשי בעסק — עם ארבעה בונוסים שכל אחד מהם עומד בפני עצמו.",
    includes: [
      "המדריך המלא להכפלת הכנסות וזמן",
      "בונוס: מדריך 5 הדליים",
      "בונוס: מעבר מ„איך” ל„מי”",
      "בונוס: מכירות — מתחנונים לסלקציה",
      "בונוס: 100 כותרות למייל",
    ],
    forWho: [
      "מי שכבר מרוויח ורוצה להכפיל בלי להכפיל שעות",
      "מי שמרגיש שהוא עושה הכל לבד",
    ],
    accent: "orchid",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (category: ProductCategory) =>
  products.filter((p) => p.category === category);

/** Only these can enter the cart. */
export const purchasable = products.filter((p) => p.mode === "purchase");

export const categoryLabels: Record<ProductCategory, string> = {
  business: "תוכניות עסקיות",
  wealth: "שפע ומיינדסט",
  club: "מועדון עסקים",
  books: "ספרים ומדריכים",
};

export const categoryHrefs: Record<ProductCategory, string> = {
  business: "/programs",
  wealth: "/wealth",
  club: "/club",
  books: "/books",
};

export const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(n);
