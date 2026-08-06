export type ProductCategory = "mentoring" | "course" | "event" | "book" | "club";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  /** Price in ILS, VAT included. */
  price: number;
  /** Optional strike-through anchor price. */
  compareAt?: number;
  /** Max instalments offered on the Cardcom page. */
  maxPayments: number;
  /** Recurring products are sold as a subscription starter payment. */
  recurring?: { period: "month"; amount: number };
  badge?: string;
  featured?: boolean;
  /** Set false where the figure needs confirmation from Racheli before launch. */
  priceConfirmed: boolean;
  summary: string;
  includes: string[];
  forWho: string[];
  accent: "gold" | "rose" | "orchid";
};

export const products: Product[] = [
  {
    slug: "masters-club-trial",
    name: "מועדון מאסטריות בעסקים",
    tagline: "שבועיים התנסות · ללא התחייבות",
    category: "club",
    price: 10,
    maxPayments: 1,
    recurring: { period: "month", amount: 297 },
    badge: "הכי קל להתחיל",
    featured: true,
    priceConfirmed: true,
    summary:
      "הדלת הקטנה לעולם שלי. הקלטה יומית קצרה שמכוונת לך את הראש, קהילה של בעלות עסקים שלא נותנת לך להישאר במקום, והשיטה שמייצרת מיליונים בשנה — בגרסה שאפשר להתחיל איתה מחר בבוקר.",
    includes: [
      "הקלטה יומית ממני — מיקוד, אנרגיה ומוטיבציה",
      "גישה מלאה לקהילת המאסטריות",
      "מפגש חי חודשי עם שאלות ותשובות",
      "ארכיון ההקלטות והמפגשים",
      "ביטול בכל עת — בלי התחייבות",
    ],
    forWho: [
      "מי שרוצה לטעום את השיטה לפני החלטה גדולה",
      "בעלות עסק שצריכות מסגרת יומית שמחזיקה אותן",
      "מי שנמצאת לבד מול העסק ורוצה קהילה",
    ],
    accent: "gold",
  },
  {
    slug: "premium-mentoring",
    name: "ליווי פרימיום",
    tagline: "קבוצה סגורה · 5 בעלות עסקים בלבד",
    category: "mentoring",
    price: 14500,
    maxPayments: 10,
    badge: "מקומות מוגבלים",
    featured: true,
    priceConfirmed: true,
    summary:
      "התוכנית הכי ממוקדת שאני מעבירה, לחמש בעלות עסקים בלבד בכל מחזור. עבודה צמודה על המודל העסקי, התמחור, המיצוב והראש — עד שהמספרים בעסק נראים אחרת.",
    includes: [
      "ליווי אישי צמוד לאורך כל התוכנית",
      "פגישה שבועית עם מנטורית אישית",
      "גישה למעל 80 הדרכות וסמינרים",
      "בנייה מחדש של המודל העסקי והתמחור",
      "קבוצת ווטסאפ סגורה עם מענה ישיר",
      "פריסה של עד 10 תשלומים",
    ],
    forWho: [
      "בעלות עסק פעיל שרוצות לפרוץ תקרת זכוכית",
      "מי שמוכנה לעבוד ברצינות ולא מחפשת קסמים",
      "מי שרוצה יחס אישי ולא כיתה של 200 איש",
    ],
    accent: "gold",
  },
  {
    slug: "dna-of-business",
    name: "DNA של עסק",
    tagline: "סמינר דו-שנתי · התוכנית המובילה",
    category: "mentoring",
    price: 29000,
    maxPayments: 12,
    badge: "התוכנית המובילה",
    featured: true,
    priceConfirmed: false,
    summary:
      "שנתיים שמשנות מהשורש את ה-DNA הכלכלי שלך. לא עוד קורס שמלמד טקטיקה — תהליך עומק שמחליף את מערכת ההפעלה שקובעת כמה מותר לך להרוויח, ובונה סביבה עסק שמחזיק את זה.",
    includes: [
      "סמינר דו-שנתי מלא",
      "גישה למעל 80 הדרכות",
      "מנטורית אישית בפגישה שבועית",
      "סמינרים זוגיים שנתיים",
      "כל העדכונים והתכנים החדשים לאורך התוכנית",
    ],
    forWho: [
      "מי שרוצה שינוי עומק ולא שיפור נקודתי",
      "בעלות עסק שמוכנות להתחייב לתהליך ארוך",
      "מי שהגיעה לתקרה וחוזרת אליה שוב ושוב",
    ],
    accent: "orchid",
  },
  {
    slug: "money-time",
    name: "Money Time",
    tagline: "קורס דיגיטלי · בקצב שלך",
    category: "course",
    price: 1490,
    compareAt: 1990,
    maxPayments: 6,
    priceConfirmed: false,
    summary:
      "קורס דיגיטלי מלא על ניהול כסף, תכנון פיננסי והעצמה כלכלית. הכל מוקלט, בגישה מיידית, לצפייה בקצב שלך — עם תרגילים מעשיים אחרי כל שיעור.",
    includes: [
      "גישה מיידית לכל השיעורים",
      "חוברת עבודה להורדה",
      "תרגילים מעשיים אחרי כל מודול",
      "גישה לצמיתות כולל עדכונים",
    ],
    forWho: [
      "מי שרוצה סדר בכסף לפני שהיא מגדילה אותו",
      "מי שמעדיפה ללמוד לבד ובקצב שלה",
      "מי שרוצה נקודת כניסה במחיר נגיש",
    ],
    accent: "rose",
  },
  {
    slug: "money-fear-event",
    name: "עושים אהבה עם הפחד מכסף",
    tagline: "כנס דו-יומי · אונליין",
    category: "event",
    price: 890,
    maxPayments: 3,
    badge: "מספר מקומות מוגבל",
    priceConfirmed: false,
    summary:
      "יומיים של עבודת עומק לשחרור פחדים, טראומות וחסמים סביב כסף. זה החלק שאף אחד לא מלמד — ובלעדיו כל טקטיקה עסקית נשברת.",
    includes: [
      "יומיים מלאים בהנחייתי",
      "עבודת עומק חווייתית בקבוצה",
      "הקלטות הכנס לצפייה חוזרת",
      "ערכת תרגול להמשך",
    ],
    forWho: [
      "מי שהכסף מפחיד אותה גם כשהוא נכנס",
      "מי שמרוויחה ולא מצליחה להחזיק",
      "מי שמזהה דפוס שחוזר על עצמו",
    ],
    accent: "orchid",
  },
  {
    slug: "seven-steps",
    name: "7 הצעדים לעסק רווחי",
    tagline: "מדריך דיגיטלי",
    category: "course",
    price: 97,
    maxPayments: 1,
    badge: "כניסה מהירה",
    priceConfirmed: false,
    summary:
      "המפה המקוצרת. שבעה צעדים מדויקים שכל בעלת עסק צריכה לעבור בדרך לעסק רווחי — בלי תיאוריה ובלי מילוי מקום.",
    includes: [
      "מדריך דיגיטלי מלא להורדה",
      "שבעה שיעורי וידאו קצרים",
      "דף עבודה לכל צעד",
    ],
    forWho: [
      "מי שרוצה להתחיל בקטן",
      "מי שצריכה סדר ראשוני בעסק",
      "מי שעדיין מתלבטת ורוצה להכיר את הגישה",
    ],
    accent: "gold",
  },
  {
    slug: "first-100k-book",
    name: "ה-100K הראשון שלי",
    tagline: "ספר דיגיטלי + מסלול מלווה",
    category: "book",
    price: 149,
    maxPayments: 1,
    priceConfirmed: false,
    summary:
      "הדרך אל 100,000 השקלים הראשונים באונליין, כפי שהיא באמת נראית — כולל הטעויות שעלו לי ביוקר וכל מה שהייתי עושה אחרת היום.",
    includes: [
      "הספר הדיגיטלי המלא",
      "מסלול מלווה במייל",
      "תבניות מוכנות לשימוש",
    ],
    forWho: [
      "מי שרוצה להבין את המספרים לפני שהיא רצה",
      "מי שבונה עסק אונליין מאפס",
    ],
    accent: "rose",
  },
  {
    slug: "money-challenge",
    name: "אתגר הכסף",
    tagline: "אתגר מונחה · 21 יום",
    category: "event",
    price: 297,
    maxPayments: 2,
    priceConfirmed: false,
    summary:
      "21 יום, משימה ביום, שינוי אמיתי ביחס שלך לכסף. אתגר מונחה עם קבוצה, מעקב ומענה — למי שרוצה תזוזה מהירה.",
    includes: [
      "משימה יומית לאורך 21 יום",
      "קבוצת אתגר מלווה",
      "שלושה מפגשים חיים",
      "הקלטות לצפייה חוזרת",
    ],
    forWho: [
      "מי שצריכה דחיפה קצרה וממוקדת",
      "מי שאוהבת לעבוד במסגרת של קבוצה",
    ],
    accent: "gold",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categoryLabels: Record<ProductCategory, string> = {
  mentoring: "ליווי אישי",
  course: "קורסים דיגיטליים",
  event: "כנסים ואתגרים",
  book: "ספרים",
  club: "מועדון",
};

export const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(n);
