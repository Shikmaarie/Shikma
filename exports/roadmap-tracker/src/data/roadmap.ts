// Content of "מפת הדרכים שלי | לצאת לעצמאות", taken verbatim from the
// program document. Edit wording here, never inside components.

export type MetricTarget =
  | { kind: "program"; label: string } // fixed program target, e.g. "1,000 ₪"
  | { kind: "suggested"; label: string } // recommendation only
  | { kind: "personal" }; // participant sets her own target

export interface Metric {
  id: string;
  label: string;
  target: MetricTarget;
  currency?: boolean;
}

export interface RoadmapMonth {
  number: number;
  title: string;
  milestone: string; // short label for the overview table
  overviewTarget: string;
  desiredOutcome: string;
  milestones: { id: string; label: string }[];
  targetColumnLabel: string;
  metrics: Metric[];
}

export const programName = "לצאת לעצמאות";
export const roadmapTitle = "מפת הדרכים שלי";
export const roadmapSubtitle = "מפת עבודה למלוות: אבני דרך, יעדים מספריים, ראיות וניצחונות";

export const startingPoints = [
  { id: "no_idea", label: "ללא רעיון" },
  { id: "few_directions", label: "כמה כיוונים" },
  { id: "existing_idea", label: "רעיון קיים" },
  { id: "active_business", label: "עסק פעיל" },
] as const;
export type StartingPointId = (typeof startingPoints)[number]["id"];

export const howToUse =
  "בכל חודש מסמנים וי רק על פעולה שבוצעה, ממלאים את המדדים במספרים ומתעדים ראיה קצרה. משווים קודם כול לנקודת הפתיחה של המשתתפת. יעדי ההכנסה והקהילה הם יעדי התוכנית לשאיפה, ולא הבטחה לתוצאה אישית.";

export const definitions = [
  { term: "הכנסה", text: "סכום כסף שהתקבל בפועל בחודש" },
  { term: "קהילה", text: "מספר אנשים רלוונטיים בקהילה או ברשימת תפוצה בסוף החודש (לא סך עוקבים אקראיים)" },
  { term: "פידבק", text: "משוב מתועד מאדם שהתנסה בפיילוט" },
  { term: "עדות", text: "אישור מפורש להשתמש במשוב לצורכי שיווק" },
];

export const personalGoalsNote =
  "לכל משתתפת נקבעים גם יעדים אישיים בהתאם לשלב שלה. לא מדלגות על בדיקת צורך אמיתי רק כדי להגיע ליעד הכנסה.";

export const evidencePrompt = "קישור / צילום מסך / תיעוד פיילוט / עדות / פירוט הכנסה";

export const reflectionFields = [
  { id: "win", label: "הניצחון המרכזי שאני חוגגת" },
  { id: "gap_learning", label: "מה למדתי מהפער בין היעד לתוצאה" },
  { id: "next_goal", label: "היעד המדיד שלי לחודש הבא" },
  { id: "first_step", label: "הצעד הראשון ומועד הביצוע" },
  { id: "support_needed", label: "התמיכה שאני צריכה מהמלווה" },
] as const;
export type ReflectionId = (typeof reflectionFields)[number]["id"];

const suggested = (label: string): MetricTarget => ({ kind: "suggested", label: `${label} (המלצה)` });
const program = (label: string): MetricTarget => ({ kind: "program", label });
const personal: MetricTarget = { kind: "personal" };

export const months: RoadmapMonth[] = [
  {
    number: 1,
    title: "מזהה כיוון עסקי",
    milestone: "רעיון ראשון וכיוון לבדיקה",
    overviewTarget: "שיחות גילוי ובחירת כיוון",
    desiredOutcome: "כיוון אחד שאפשר לבדוק, גם אם הוא עדיין לא סופי.",
    milestones: [
      { id: "m1a", label: "השלמתי שאלון פתיחה וזיהיתי לפחות שלוש יכולות או חוזקות" },
      { id: "m1b", label: "העליתי שני כיוונים אפשריים או דייקתי כיוון עסקי קיים" },
      { id: "m1c", label: "הגדרתי קהל אפשרי ובעיה שאני רוצה לבדוק" },
      { id: "m1d", label: "שוחחתי עם אנשים רלוונטיים והקשבתי לצרכים שלהם" },
    ],
    targetColumnLabel: "יעד מוצע / תוכנית",
    metrics: [
      { id: "discovery_calls", label: "שיחות גילוי עם אנשים", target: suggested("3 לפחות") },
      { id: "directions_tested", label: "כיוונים שנבחנו", target: suggested("2") },
      { id: "direction_chosen", label: "כיוון שנבחר לבדיקה", target: program("1") },
    ],
  },
  {
    number: 2,
    title: "בונה ומפעילה פיילוט",
    milestone: "פיילוט עם קבוצה קטנה",
    overviewTarget: "משתתפי פיילוט, משובים ועדויות",
    desiredOutcome: "ניסיון אמיתי עם קבוצה קטנה, משוב והחלטה מה לשפר.",
    milestones: [
      { id: "m2a", label: "הגדרתי מה הפיילוט מציע ולמי" },
      { id: "m2b", label: "הזמנתי קבוצה קטנה והפעלתי פיילוט בפועל" },
      { id: "m2c", label: "אספתי משובים כתובים או מתועדים ממשתתפות הפיילוט" },
      { id: "m2d", label: "ביקשתי רשות להשתמש בעדויות, ותיעדתי מה צריך לשנות" },
    ],
    targetColumnLabel: "יעד מוצע / תוכנית",
    metrics: [
      { id: "pilot_participants", label: "משתתפים בפיילוט", target: suggested("3–5") },
      { id: "feedback_documented", label: "משובים מתועדים", target: suggested("3 לפחות") },
      { id: "testimonials_approved", label: "עדויות באישור לשימוש", target: suggested("1–2") },
      { id: "improvements_defined", label: "שיפורים שהוגדרו", target: suggested("2") },
    ],
  },
  {
    number: 3,
    title: "מוצר ראשון ויציאה לשוק",
    milestone: "מוצר ראשון ושיווק",
    overviewTarget: "1,000 ₪ הכנסה; 100 אנשים בקהילה",
    desiredOutcome: "הצעה שנמכרת או נבדקת מול קהל, עם תחילת בניית קהילה.",
    milestones: [
      { id: "m3a", label: "גיבשתי מוצר או שירות ראשון עם תוצאה ברורה" },
      { id: "m3b", label: "הצגתי את ההצעה לאנשים רלוונטיים" },
      { id: "m3c", label: "פרסמתי תוכן והתחלתי ליצור שיחות עם הקהל" },
      { id: "m3d", label: "תיעדתי הכנסות, פניות והצעות שנשלחו" },
    ],
    targetColumnLabel: "יעד התוכנית",
    metrics: [
      { id: "income", label: "הכנסה חודשית", target: program("1,000 ₪"), currency: true },
      { id: "community", label: "אנשים בקהילה", target: program("100") },
      { id: "inquiries", label: "פניות מתעניינות", target: personal },
      { id: "paying_clients", label: "לקוחות משלמים", target: personal },
    ],
  },
  {
    number: 4,
    title: "שגרת שיווק ומכירה",
    milestone: "שגרת שיווק ומכירה",
    overviewTarget: "3,000 ₪ הכנסה; 150 אנשים בקהילה",
    desiredOutcome: "פעילות שיווקית עקבית, שיחות מכירה ושיפור ההצעה.",
    milestones: [
      { id: "m4a", label: "קבעתי שגרת תוכן או שיווק שבועית וביצעתי אותה" },
      { id: "m4b", label: "יצרתי שיחות עם לקוחות פוטנציאליים" },
      { id: "m4c", label: "ניהלתי מעקב אחר פניות, הצעות ומכירות" },
      { id: "m4d", label: "שיפרתי מסר או הצעה על בסיס תגובות מהשוק" },
    ],
    targetColumnLabel: "יעד התוכנית",
    metrics: [
      { id: "income", label: "הכנסה חודשית", target: program("3,000 ₪"), currency: true },
      { id: "community", label: "אנשים בקהילה", target: program("150") },
      { id: "sales_calls", label: "שיחות מכירה", target: personal },
      { id: "paying_clients", label: "לקוחות משלמים", target: personal },
    ],
  },
  {
    number: 5,
    title: "מרחיבה מכירות וקשרים",
    milestone: "הרחבת מכירות וקשרים",
    overviewTarget: "5,000 ₪ הכנסה; 150 אנשים בקהילה",
    desiredOutcome: "הגדלת הכנסות, חיזוק קהילה ויצירת שיתופי פעולה.",
    milestones: [
      { id: "m5a", label: "חזרתי על פעולות שיווק שהביאו פניות או מכירות" },
      { id: "m5b", label: "יצרתי קשרים מקצועיים ובחנתי שיתופי פעולה" },
      { id: "m5c", label: "ביצעתי מעקב אחר יחס פניות למכירות" },
      { id: "m5d", label: "בדקתי איך לשפר את חוויית הלקוח ולהשיג המלצות" },
    ],
    targetColumnLabel: "יעד התוכנית",
    metrics: [
      { id: "income", label: "הכנסה חודשית", target: program("5,000 ₪"), currency: true },
      { id: "community", label: "אנשים בקהילה", target: program("150") },
      { id: "collaborations", label: "שיתופי פעולה או פגישות", target: personal },
      { id: "new_testimonials", label: "המלצות או עדויות חדשות", target: personal },
    ],
  },
  {
    number: 6,
    title: "בונה המשך צמיחה",
    milestone: "המשך צמיחה",
    overviewTarget: "מוצר נוסף או משפך שיווקי; יעד אישי מדיד",
    desiredOutcome: "עסק עם תהליך עבודה ברור ותוכנית המשך שאפשר לבצע.",
    milestones: [
      { id: "m6a", label: "ניתחתי מה עבד ומה לא עבד בחמשת החודשים" },
      { id: "m6b", label: "בחרתי מוצר נוסף או שיפרתי משפך שיווקי קיים" },
      { id: "m6c", label: "בניתי שגרת עבודה ומעקב אחר נתונים" },
      { id: "m6d", label: "הגדרתי יעדי הכנסה, לקוחות וקהילה ל־90 הימים הבאים" },
    ],
    targetColumnLabel: "יעד אישי",
    metrics: [
      { id: "income", label: "הכנסה חודשית", target: personal, currency: true },
      { id: "paying_clients", label: "לקוחות משלמים", target: personal },
      { id: "community", label: "אנשים בקהילה", target: personal },
      { id: "new_funnel", label: "מוצר / משפך חדש או משופר", target: program("1") },
    ],
  },
];
