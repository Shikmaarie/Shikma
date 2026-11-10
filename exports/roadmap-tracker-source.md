# Roadmap tracker source bundle

Each section is one file. Create each file at the given path with exactly this content.

## FILE: src/index.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Racheli's palette: deep teal + gold, on a warm light surface for long forms.
   Values sampled from the brand swatch sheet; verify against the brand book. */
@layer base {
  :root {
    --background: 40 33% 97%;
    --foreground: 187 70% 9%;
    --card: 0 0% 100%;
    --card-foreground: 187 70% 9%;
    --primary: 186 66% 19%;
    --primary-foreground: 37 28% 94%;
    --secondary: 37 28% 91%;
    --secondary-foreground: 186 66% 19%;
    --muted: 40 20% 93%;
    --muted-foreground: 186 15% 38%;
    --accent: 36 55% 62%;
    --accent-foreground: 187 70% 9%;
    --gold: 36 55% 62%;
    --gold-light: 40 66% 78%;
    --gold-deep: 35 38% 50%;
    --success: 168 45% 34%;
    --success-foreground: 0 0% 100%;
    --warning: 6 70% 56%;
    --warning-foreground: 0 0% 100%;
    --destructive: 0 72% 48%;
    --destructive-foreground: 0 0% 100%;
    --border: 37 22% 85%;
    --input: 37 22% 80%;
    --ring: 186 66% 19%;
    --bubble: 120 45% 88%;
    --radius: 0.875rem;
  }
}

@layer base {
  * { @apply border-border; }
  html { -webkit-text-size-adjust: 100%; }
  body { @apply bg-background text-foreground font-sans antialiased; }
}

/* Numbers and ₪ amounts stay LTR inside RTL text */
.ltr-nums { direction: ltr; unicode-bidi: isolate; }

@keyframes confetti-fall {
  0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(var(--drift), 105vh, 0) rotate(var(--spin)); opacity: 0.9; }
}
@keyframes pop-in {
  0% { transform: scale(0.85); opacity: 0; }
  60% { transform: scale(1.04); opacity: 1; }
  100% { transform: scale(1); }
}
.animate-pop-in { animation: pop-in 0.45s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .confetti-piece { display: none; }
  .animate-pop-in { animation: none; }
}
````

## FILE: tailwind.config.ts
````ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "Arial", "system-ui", "sans-serif"],
        display: ['"Open Sans"', "Arial", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        bubble: "hsl(var(--bubble))",
        gold: { DEFAULT: "hsl(var(--gold))", light: "hsl(var(--gold-light))", deep: "hsl(var(--gold-deep))" },
        success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))" },
        warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [animate],
} satisfies Config;
````

## FILE: src/lib/utils.ts
````ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
````

## FILE: src/data/roadmap.ts
````ts
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
````

## FILE: src/data/copy.ts
````ts
// Version B: lighter, warmer wording for the participant form.
// Program content (milestones, targets, definitions) stays in roadmap.ts.

export const greeting = (firstName: string) => `היי ${firstName}, איזה כיף שאת כאן`;
export const greetingSub = "זו המפה שלך לחצי השנה הקרובה. כל חודש נפתח צעד חדש, ואת ממלאת רק את מה שקרה באמת.";

export const startingPointQuestion = "מאיפה את יוצאת לדרך?";
export const guideTitle = "רגע לפני שמתחילות";
export const overviewTitle = "המסע שלך";
export const lockedHint = "מחכה לך בהמשך";

export const steps = [
  {
    id: "milestones",
    title: "מה כבר קרה החודש?",
    hint: "מסמנות רק מה שבאמת עשית. גם צעד קטן נחשב.",
  },
  {
    id: "metrics",
    title: "בואי נספור",
    hint: "מספרים פשוטים, בלי לייפות. היעדים הם כיוון, לא מבחן.",
  },
  {
    id: "evidence",
    title: "יש הוכחה? מעולה",
    hint: "קישור, צילום מסך, משוב שקיבלת או פירוט הכנסה. משהו קטן שמראה שזה קרה.",
  },
  {
    id: "summary",
    title: "רגע של סיכום",
    hint: "את זה ממלאות לפני או אחרי השיחה עם המלווה. כמה מילים מספיקות.",
  },
] as const;
export type StepId = (typeof steps)[number]["id"];

export const reflectionLabels: Record<string, string> = {
  win: "על מה את הכי גאה החודש?",
  gap_learning: "מה למדת מהפער בין היעד למה שקרה?",
  next_goal: "מה היעד המדיד שלך לחודש הבא?",
  first_step: "מה הצעד הראשון, ועד מתי?",
  support_needed: "במה המלווה יכולה לעזור לך?",
};
export const followUpLabel = "מתי נפגשות שוב?";

export const evidencePlaceholder = "הדביקי קישור או כתבי בכמה מילים מה יש לך";
export const attachLabel = "צירוף תמונה או קובץ";
export const personalTargetPlaceholder = "היעד שלך";

export const next = "ממשיכות";
export const back = "חזרה";
export const submit = "שולחת למלווה";
export const autosave = "הכול נשמר לבד, אפשר לעצור ולחזור מתי שרוצים.";

/** Encouragement that follows the month's progress. */
export const cheer = (pct: number) =>
  pct === 0
    ? "כל דרך מתחילה בצעד אחד. בואי נתחיל."
    : pct < 40
      ? "יצאת לדרך. ממשיכות."
      : pct < 75
        ? "יותר מחצי הדרך. את בתנופה."
        : pct < 100
          ? "כמעט שם. עוד קצת."
          : "החודש מלא. איזה יופי.";

export const allMilestonesDone = "כל אבני הדרך של החודש מסומנות!";

export const submittedTitle = "שלחת! איזה כיף";
export const submittedBody = "המלווה שלך תעבור על זה, ותדברו על זה יחד בשיחת הסיכום.";
export const approvedTitle = "החודש אושר";
export const approvedBody = "עוד אבן דרך מאחורייך. כשהחודש הבא ייפתח הוא יחכה לך כאן.";
export const returnedTitle = "המלווה ביקשה להשלים כמה דברים";
export const mentorNoteTitle = "מילה מהמלווה";
````

## FILE: src/data/icons.ts
````ts
import {
  CalendarHeart,
  Coins,
  Compass,
  FlaskConical,
  Footprints,
  Handshake,
  HeartHandshake,
  Lightbulb,
  ListChecks,
  Megaphone,
  MessageCircleHeart,
  MessagesSquare,
  PackagePlus,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const monthIcons: Record<number, LucideIcon> = {
  1: Compass,
  2: FlaskConical,
  3: Rocket,
  4: Megaphone,
  5: Handshake,
  6: TrendingUp,
};

export const metricIcons: Record<string, LucideIcon> = {
  discovery_calls: MessagesSquare,
  directions_tested: Lightbulb,
  direction_chosen: Target,
  pilot_participants: Users,
  feedback_documented: MessageCircleHeart,
  testimonials_approved: Star,
  improvements_defined: Wrench,
  income: Coins,
  community: Users,
  inquiries: MessagesSquare,
  paying_clients: UserCheck,
  sales_calls: MessagesSquare,
  collaborations: Handshake,
  new_testimonials: Star,
  new_funnel: PackagePlus,
};

export const reflectionIcons: Record<string, LucideIcon> = {
  win: Trophy,
  gap_learning: Lightbulb,
  next_goal: Target,
  first_step: Footprints,
  support_needed: HeartHandshake,
  next_follow_up: CalendarHeart,
};

export const stepIcons = { milestones: ListChecks, metrics: TrendingUp, evidence: Sparkles, summary: MessageCircleHeart };
````

## FILE: src/data/workbooks.ts
````ts
// Monthly workbooks ("מחברת עבודה"). One per month; the text is taken from the
// program's workbook documents. A month without a workbook yet shows a
// "coming soon" state. Edit wording here, never inside components.

import type { LucideIcon } from "lucide-react";
import { BookHeart, Footprints, Gem, Rocket, Send, Sparkles, UserRoundSearch, Users } from "lucide-react";

export type WorkbookField =
  | { kind: "text"; id: string; label: string; rows?: number }
  /** A sentence with blanks; `parts` are the fixed text between the blanks. */
  | { kind: "fillin"; id: string; label: string; parts: string[] }
  | { kind: "yesno"; id: string }
  | { kind: "invites"; id: string }
  | { kind: "message"; id: string }
  | { kind: "quotes"; id: string };

export interface WorkbookSection {
  id: string;
  number: number;
  title: string;
  icon: LucideIcon;
  intro?: string;
  note?: string;
  fields: WorkbookField[];
}

export interface Workbook {
  month: number;
  title: string;
  subtitle: string;
  goal: string;
  /** "המסלול שלנו": each step lights up when its sections have content. */
  path: { label: string; sectionIds: string[] }[];
  sections: WorkbookSection[];
}

/** Outreach draft. {pilot_name} etc. are filled from the pilot section. */
export const outreachTemplate =
  "היי, אני בונה עכשיו פיילוט ראשון ל{pilot_name}, שמיועד ל{pilot_for} ומתמקד ב{pilot_problem}. אני מחפשת 3–4 משתתפות להתנסות ללא עלות, כדי לבדוק את התהליך ולדייק אותו. חשבתי עלייך כי [למה חשבת דווקא עליה]. זה יכול להיות רלוונטי עבורך? אם כן, אשמח לספר מה זה כולל.";

export const inviteStatuses = [
  { id: "todo", label: "עוד לא פניתי" },
  { id: "sent", label: "פניתי" },
  { id: "yes", label: "אמרה כן" },
  { id: "no", label: "לא הפעם" },
] as const;
export type InviteStatus = (typeof inviteStatuses)[number]["id"];

export const workbooks: Workbook[] = [
  {
    month: 1,
    title: "מתחילות לזוז",
    subtitle: "מהגאונות שלי לפיילוט הראשון",
    goal: "לצאת עם קהל יעד ספציפי, סיפור אישי, הצעת פיילוט ראשונה ורשימת נשים שאפשר לפנות אליהן.",
    path: [
      { label: "אני", sectionIds: ["genius"] },
      { label: "הסיפור שלי", sectionIds: ["story"] },
      { label: "הלקוחה שלי", sectionIds: ["client"] },
      { label: "הבעיה שלה", sectionIds: ["fit"] },
      { label: "הפיילוט שלי", sectionIds: ["pilot"] },
      { label: "בדיקה בשטח", sectionIds: ["invites", "outreach", "move"] },
    ],
    sections: [
      {
        id: "genius",
        number: 1,
        title: "אזור הגאונות שלי",
        icon: Gem,
        fields: [
          { kind: "text", id: "good_at", label: "במה אני טובה? אילו יכולות, ניסיון או חוזקות חוזרים אצלי?" },
          { kind: "text", id: "love_doing", label: "מה אני אוהבת לעשות, ומה אנשים כבר מבקשים ממני?" },
          { kind: "text", id: "real_help", label: "באיזו בעיה אני יודעת לעזור באופן אמיתי?" },
          {
            kind: "fillin",
            id: "my_sentence",
            label: "המשפט שלי",
            parts: ["אני טובה במיוחד ב", "ועוזרת ל", "באמצעות", "."],
          },
        ],
      },
      {
        id: "story",
        number: 2,
        title: "הסיפור שמאחורי העסק",
        icon: BookHeart,
        fields: [
          { kind: "text", id: "why_this", label: "למה בחרתי דווקא בכיוון העסקי הזה?" },
          { kind: "text", id: "connection", label: "איזה ניסיון אישי או מקצועי מחבר אותי לבעיה של הלקוחות שלי?" },
          { kind: "text", id: "beyond_service", label: "מה הייתי רוצה שלקוחה תבין עליי מעבר לשירות עצמו?" },
        ],
      },
      {
        id: "client",
        number: 3,
        title: "מי בדיוק הלקוחה שלי?",
        icon: UserRoundSearch,
        intro: "לא מספיק לכתוב נשים או בעלות עסקים. נסי לתאר אדם שאפשר לזהות ולפגוש במציאות.",
        fields: [
          { kind: "text", id: "client_stage", label: "באיזה שלב בחיים או בעסק היא נמצאת?" },
          { kind: "text", id: "client_problem", label: "מה הבעיה הספציפית שהיא מתמודדת איתה כרגע?" },
          { kind: "text", id: "client_result", label: "איזו תוצאה היא רוצה להשיג?" },
          { kind: "text", id: "client_values", label: "מה חשוב לה בדרך העבודה עם אשת מקצוע?" },
        ],
      },
      {
        id: "fit",
        number: 4,
        title: "מי כן ומי לא?",
        icon: Users,
        note: "מי לא אינו שיפוט על אנשים, אלא בדיקת התאמה בין הצורך, היכולת שלי וגבולות השירות.",
        fields: [
          { kind: "yesno", id: "yes_no" },
          {
            kind: "fillin",
            id: "focused_definition",
            label: "הגדרה ממוקדת",
            parts: ["אני רוצה לעזור ל", "שנמצאת ב", "ומתמודדת עם", "כדי להגיע ל", "."],
          },
          { kind: "text", id: "recognizable", label: "האם חברה בקבוצה תוכל לזהות אישה אמיתית שמתאימה לתיאור הזה? מה צריך לדייק?" },
        ],
      },
      {
        id: "pilot",
        number: 5,
        title: "בונות פיילוט ראשון",
        icon: Rocket,
        intro: "פיילוט חינמי ומוגדר ל־3–4 משתתפות מתאימות. המטרה היא לבדוק את השירות, ללמוד ולקבל משוב. מגדירות מראש מה כלול ומה לא.",
        fields: [
          { kind: "text", id: "pilot_name", label: "שם זמני לפיילוט", rows: 1 },
          { kind: "text", id: "pilot_for", label: "למי בדיוק הוא מיועד?", rows: 1 },
          { kind: "text", id: "pilot_problem", label: "איזו בעיה אחת הוא בא לפתור?", rows: 1 },
          { kind: "text", id: "pilot_gets", label: "מה המשתתפת תקבל בפועל?" },
          { kind: "text", id: "pilot_scope", label: "מה משך הפיילוט, כמה מפגשים ומה הגבולות שלו?" },
          { kind: "text", id: "pilot_result", label: "איזו תוצאה או התקדמות נרצה לבחון?" },
          { kind: "text", id: "pilot_feedback", label: "איזה משוב אבקש בסיום, ואיך אדע מה לשפר?" },
        ],
      },
      {
        id: "invites",
        number: 6,
        title: "את מי אני מזמינה?",
        icon: Sparkles,
        intro: "חפשי נשים מתאימות מתוך הקבוצה, המועדון או המעגלים שלך. לא חייבים למלא ארבעה שמות מיד, אבל כן לצאת עם כיוון לפנייה.",
        note: "הרשימה גלויה גם למלווה שלך. מספיק שם פרטי או מקום לחיפוש.",
        fields: [{ kind: "invites", id: "invite_list" }],
      },
      {
        id: "outreach",
        number: 7,
        title: "הפנייה הראשונה שלי",
        icon: Send,
        intro: "הטיוטה מתמלאת לבד מהתשובות שלך על הפיילוט. התאימי אותה למי שאת פונה אליה.",
        fields: [{ kind: "message", id: "my_message" }],
      },
      {
        id: "move",
        number: 8,
        title: "מתחילות לזוז: החלטה ל־24 השעות הקרובות",
        icon: Footprints,
        fields: [
          { kind: "text", id: "first_action", label: "הפעולה הראשונה שאני עושה" },
          { kind: "text", id: "who_when", label: "למי אני פונה ומתי?", rows: 1 },
          { kind: "text", id: "want_to_learn", label: "מה אני רוצה ללמוד מהפעולה הזאת?" },
          { kind: "quotes", id: "quotes" },
        ],
      },
    ],
  },
];

export const quotesIntro =
  "אחרי הפיילוט שמרי את המשפטים האמיתיים שהמשתתפות אומרות: מה כאב להן לפני, מה רצו להשיג, מה עזר להן ומה עדיין חסר. עדויות לשיווק מפרסמים רק באישורן.";

export const getWorkbook = (month: number) => workbooks.find((w) => w.month === month);
````

## FILE: src/lib/tracker-store.ts
````ts
// Data layer for the roadmap tracker.
//
// PREVIEW ONLY: this implementation keeps everything in localStorage so the
// design can be reviewed without a backend. In Lovable it is replaced by
// Lovable Cloud (Supabase) tables with the same shapes — see README-LOVABLE.md.
// Components only talk to `useTracker()`, so swapping the backend does not
// touch the UI.

import { useCallback, useEffect, useState } from "react";
import type { ReflectionId, StartingPointId } from "@/data/roadmap";
import { getWorkbook, type InviteStatus } from "@/data/workbooks";

export type EntryStatus = "draft" | "submitted" | "returned" | "approved";

export interface Mentor {
  id: string;
  name: string;
}

export type Role = "participant" | "mentor" | "admin";

/**
 * PREVIEW ONLY: demo accounts. In Lovable these are real Lovable Cloud users
 * (Google sign-in or email + password) with a role in `user_roles`.
 */
export interface Account {
  username: string;
  password: string;
  role: Role;
  name: string;
  participantId?: string;
  mentorId?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  mentorId: string;
  startingPoint: StartingPointId | null;
  /** Highest month the participant can see and fill. Opened by the program manager. */
  openMonth: number;
}

export interface EvidenceFile {
  name: string;
  url?: string;
}

export interface MonthEntry {
  participantId: string;
  month: number;
  status: EntryStatus;
  milestones: Record<string, boolean>;
  actuals: Record<string, string>;
  personalTargets: Record<string, string>;
  evidence: string;
  evidenceFiles: EvidenceFile[];
  reflection: Partial<Record<ReflectionId, string>>;
  nextFollowUp: string;
  mentorNote: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  updatedAt: string;
}

export interface Invite {
  name: string;
  why: string;
  when: string;
  status: InviteStatus;
}

export interface Quote {
  text: string;
  consent: boolean;
}

export interface WorkbookEntry {
  participantId: string;
  month: number;
  answers: Record<string, string>;
  /** Fill-in sentences: one string per blank. */
  blanks: Record<string, string[]>;
  yes: string[];
  no: string[];
  invites: Invite[];
  message: string;
  quotes: Quote[];
  /** Photos of a workbook filled on paper. */
  photos: EvidenceFile[];
  updatedAt: string;
}

interface TrackerState {
  mentors: Mentor[];
  participants: Participant[];
  entries: MonthEntry[];
  workbooks: WorkbookEntry[];
  accounts: Account[];
}

const STORAGE_KEY = "roadmap-tracker-preview-v2";
const SESSION_KEY = "roadmap-tracker-preview-session";

export const emptyEntry = (participantId: string, month: number): MonthEntry => ({
  participantId,
  month,
  status: "draft",
  milestones: {},
  actuals: {},
  personalTargets: {},
  evidence: "",
  evidenceFiles: [],
  reflection: {},
  nextFollowUp: "",
  mentorNote: "",
  submittedAt: null,
  reviewedAt: null,
  updatedAt: new Date().toISOString(),
});

export const emptyWorkbook = (participantId: string, month: number): WorkbookEntry => ({
  participantId,
  month,
  answers: {},
  blanks: {},
  yes: [],
  no: [],
  invites: [],
  message: "",
  quotes: [],
  photos: [],
  updatedAt: new Date(0).toISOString(),
});

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5).toISOString();

// Placeholder demo data. Not real people.
const seed = (): TrackerState => {
  const now = new Date().toISOString();
  return {
    mentors: [
      { id: "mentor-1", name: "מלווה א׳" },
      { id: "mentor-2", name: "מלווה ב׳" },
    ],
    participants: [
      { id: "p1", name: "משתתפת לדוגמה 1", email: "student1@example.com", mentorId: "mentor-1", startingPoint: "few_directions", openMonth: 1 },
      { id: "p2", name: "משתתפת לדוגמה 2", email: "student2@example.com", mentorId: "mentor-1", startingPoint: "existing_idea", openMonth: 1 },
      { id: "p3", name: "משתתפת לדוגמה 3", email: "student3@example.com", mentorId: "mentor-1", startingPoint: null, openMonth: 1 },
      { id: "p4", name: "משתתפת לדוגמה 4", email: "student4@example.com", mentorId: "mentor-2", startingPoint: "active_business", openMonth: 1 },
      { id: "p5", name: "משתתפת לדוגמה 5", email: "student5@example.com", mentorId: "mentor-2", startingPoint: "no_idea", openMonth: 1 },
    ],
    entries: [
      {
        ...emptyEntry("p2", 1),
        status: "submitted",
        milestones: { m1a: true, m1b: true, m1c: true, m1d: true },
        actuals: { discovery_calls: "5", directions_tested: "2", direction_chosen: "1" },
        evidence: "סיכום של 5 שיחות גילוי בתיקייה המשותפת",
        reflection: {
          win: "סגרתי כיוון אחד שאני באמת רוצה לבדוק",
          gap_learning: "תכננתי 3 שיחות ועשיתי 5, כשקובעים מראש זה קורה",
          next_goal: "פיילוט עם 4 משתתפות",
          first_step: "לנסח הזמנה לפיילוט עד יום שלישי",
          support_needed: "עזרה בתמחור הפיילוט",
        },
        submittedAt: now,
        updatedAt: daysAgo(1),
      },
      {
        ...emptyEntry("p4", 1),
        status: "approved",
        milestones: { m1a: true, m1b: true, m1c: true, m1d: true },
        actuals: { discovery_calls: "3", directions_tested: "1", direction_chosen: "1" },
        evidence: "קישור לסיכומי שיחות",
        reflection: { win: "דייקתי את הקהל של העסק הקיים" },
        mentorNote: "עבודה מצוינת, ממשיכות לפיילוט",
        submittedAt: now,
        reviewedAt: now,
        updatedAt: daysAgo(3),
      },
      {
        ...emptyEntry("p1", 1),
        milestones: { m1a: true, m1b: true },
        actuals: { discovery_calls: "1" },
        updatedAt: daysAgo(0),
      },
      { ...emptyEntry("p5", 1), milestones: { m1a: true }, updatedAt: daysAgo(9) },
    ],
    workbooks: [
      {
        ...emptyWorkbook("p1", 1),
        answers: {
          good_at: "להקשיב, לסדר מחשבות ולהפוך בלגן לתוכנית",
          love_doing: "לשבת עם מישהי מול לוח ולבנות לה שבוע",
          pilot_name: "שבוע מסודר",
          pilot_for: "אמהות עצמאיות בתחילת הדרך",
          pilot_problem: "ניהול זמן בין הבית לעסק",
        },
        blanks: { my_sentence: ["סדר וארגון", "אמהות עצמאיות", "תכנון שבועי פשוט"] },
        yes: ["אמהות עם עסק קטן מהבית", "מי שמוכנה להתמיד שבועיים"],
        no: ["מי שמחפשת ייעוץ עסקי כללי"],
        invites: [
          { name: "מהקבוצה של התוכנית", why: "דיברה על עומס בבית", when: "עד יום חמישי", status: "sent" },
          { name: "מהמועדון", why: "התחילה עסק לפני חודש", when: "השבוע", status: "yes" },
        ],
        quotes: [{ text: "סוף סוף הבנתי מאיפה להתחיל את השבוע", consent: true }],
        updatedAt: daysAgo(0),
      },
      {
        ...emptyWorkbook("p2", 1),
        answers: { good_at: "צילום מוצרים", why_this: "אני מצלמת כבר עשר שנים כתחביב" },
        updatedAt: daysAgo(2),
      },
    ],
    accounts: [
      { username: "student", password: "123456", role: "participant", name: "משתתפת לדוגמה 1", participantId: "p1" },
      { username: "mentor", password: "123456", role: "mentor", name: "מלווה א׳", mentorId: "mentor-1" },
      { username: "admin", password: "123456", role: "admin", name: "מנהלת התוכנית" },
    ],
  };
};

const load = (): TrackerState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TrackerState;
      if (parsed.workbooks && parsed.accounts) return parsed;
    }
  } catch {
    /* storage unavailable: fall back to seed */
  }
  return seed();
};

let state: TrackerState | null = null;
const listeners = new Set<() => void>();

const getState = () => (state ??= load());

const commit = (next: TrackerState) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* preview keeps working in memory */
  }
  listeners.forEach((l) => l());
};

const upsertEntry = (s: TrackerState, participantId: string, month: number, patch: Partial<MonthEntry>) => {
  const existing = s.entries.find((e) => e.participantId === participantId && e.month === month);
  const merged = { ...(existing ?? emptyEntry(participantId, month)), ...patch, updatedAt: new Date().toISOString() };
  return {
    ...s,
    entries: existing ? s.entries.map((e) => (e === existing ? merged : e)) : [...s.entries, merged],
  };
};

const upsertWorkbook = (s: TrackerState, participantId: string, month: number, patch: Partial<WorkbookEntry>) => {
  const existing = s.workbooks.find((w) => w.participantId === participantId && w.month === month);
  const merged = { ...(existing ?? emptyWorkbook(participantId, month)), ...patch, updatedAt: new Date().toISOString() };
  return {
    ...s,
    workbooks: existing ? s.workbooks.map((w) => (w === existing ? merged : w)) : [...s.workbooks, merged],
  };
};

// ---- Session (preview login) ----------------------------------------------

export interface Session {
  role: Role;
  name: string;
  participantId?: string;
  mentorId?: string;
  via: "google" | "password";
}

const sessionListeners = new Set<() => void>();
let session: Session | null | undefined;

const readSession = (): Session | null => {
  if (session !== undefined) return session;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    session = raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    session = null;
  }
  return session;
};

const writeSession = (next: Session | null) => {
  session = next;
  try {
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* in-memory only */
  }
  sessionListeners.forEach((l) => l());
};

export function useSession() {
  const [current, setCurrent] = useState(readSession);
  useEffect(() => {
    const l = () => setCurrent(readSession());
    sessionListeners.add(l);
    return () => {
      sessionListeners.delete(l);
    };
  }, []);

  return {
    session: current,
    /** Returns an error message, or null on success. */
    signInWithPassword: (username: string, password: string): string | null => {
      const account = getState().accounts.find((a) => a.username === username.trim().toLowerCase());
      if (!account || account.password !== password) return "שם המשתמש או הסיסמה לא נכונים. נסי שוב.";
      writeSession({ role: account.role, name: account.name, participantId: account.participantId, mentorId: account.mentorId, via: "password" });
      return null;
    },
    /** PREVIEW: simulates Google sign-in as the demo participant. */
    signInWithGoogle: () => {
      const account = getState().accounts.find((a) => a.role === "participant")!;
      writeSession({ role: "participant", name: account.name, participantId: account.participantId, via: "google" });
    },
    signOut: () => writeSession(null),
  };
}

export function useTracker() {
  const [snapshot, setSnapshot] = useState(getState);

  useEffect(() => {
    const l = () => setSnapshot(getState());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const getEntry = useCallback(
    (participantId: string, month: number) =>
      snapshot.entries.find((e) => e.participantId === participantId && e.month === month) ??
      emptyEntry(participantId, month),
    [snapshot],
  );

  const getWorkbookEntry = useCallback(
    (participantId: string, month: number) =>
      snapshot.workbooks.find((w) => w.participantId === participantId && w.month === month) ??
      emptyWorkbook(participantId, month),
    [snapshot],
  );

  return {
    ...snapshot,
    getEntry,
    getWorkbookEntry,
    saveWorkbook: (participantId: string, month: number, patch: Partial<WorkbookEntry>) =>
      commit(upsertWorkbook(getState(), participantId, month, patch)),
    saveEntry: (participantId: string, month: number, patch: Partial<MonthEntry>) =>
      commit(upsertEntry(getState(), participantId, month, patch)),
    submitEntry: (participantId: string, month: number) =>
      commit(upsertEntry(getState(), participantId, month, { status: "submitted", submittedAt: new Date().toISOString() })),
    reviewEntry: (participantId: string, month: number, decision: "approved" | "returned", mentorNote: string) =>
      commit(
        upsertEntry(getState(), participantId, month, {
          status: decision,
          mentorNote,
          reviewedAt: new Date().toISOString(),
        }),
      ),
    setStartingPoint: (participantId: string, startingPoint: StartingPointId) => {
      const s = getState();
      commit({ ...s, participants: s.participants.map((p) => (p.id === participantId ? { ...p, startingPoint } : p)) });
    },
    setOpenMonth: (participantId: string, openMonth: number) => {
      const s = getState();
      commit({ ...s, participants: s.participants.map((p) => (p.id === participantId ? { ...p, openMonth } : p)) });
    },
    openMonthForAll: (openMonth: number) => {
      const s = getState();
      commit({ ...s, participants: s.participants.map((p) => ({ ...p, openMonth: Math.max(p.openMonth, openMonth) })) });
    },
    addParticipant: (name: string, email: string, mentorId: string) => {
      const s = getState();
      const id = `p${Date.now()}`;
      const openMonth = Math.max(1, ...s.participants.map((p) => p.openMonth));
      commit({ ...s, participants: [...s.participants, { id, name, email, mentorId, startingPoint: null, openMonth }] });
    },
    resetDemo: () => commit(seed()),
  };
}

export type Tracker = ReturnType<typeof useTracker>;

/** Share of milestones checked + metrics filled, 0–100. */
export function entryProgress(entry: MonthEntry, milestoneIds: string[], metricIds: string[]) {
  const total = milestoneIds.length + metricIds.length;
  if (!total) return 0;
  const done =
    milestoneIds.filter((id) => entry.milestones[id]).length +
    metricIds.filter((id) => (entry.actuals[id] ?? "").trim() !== "").length;
  return Math.round((done / total) * 100);
}

/** Share of workbook questions answered, 0–100. Lists count once they have a row. */
export function workbookProgress(w: WorkbookEntry) {
  const book = getWorkbook(w.month);
  if (!book) return 0;
  const fields = book.sections.flatMap((s) => s.fields);
  const filled = fields.filter((f) => {
    switch (f.kind) {
      case "text":
        return (w.answers[f.id] ?? "").trim() !== "";
      case "fillin":
        return (w.blanks[f.id] ?? []).some((b) => b.trim() !== "");
      case "yesno":
        return w.yes.length + w.no.length > 0;
      case "invites":
        return w.invites.length > 0;
      case "message":
        return w.message.trim() !== "";
      case "quotes":
        return w.quotes.length > 0;
    }
  }).length;
  return fields.length ? Math.round((filled / fields.length) * 100) : 0;
}

/** Latest time anything of the participant's was saved. */
export function lastActivity(state: Pick<TrackerState, "entries" | "workbooks">, participantId: string) {
  const times = [...state.entries, ...state.workbooks]
    .filter((x) => x.participantId === participantId)
    .map((x) => new Date(x.updatedAt).getTime())
    .filter((t) => t > 0);
  return times.length ? new Date(Math.max(...times)) : null;
}

/** Suggestions for month metrics, counted from everything in the participant's workbooks. */
export function metricHints(workbooks: WorkbookEntry[], participantId: string) {
  const mine = workbooks.filter((w) => w.participantId === participantId);
  const yes = mine.reduce((n, w) => n + w.invites.filter((i) => i.status === "yes").length, 0);
  const consented = mine.reduce((n, w) => n + w.quotes.filter((q) => q.consent && q.text.trim()).length, 0);
  const hints: Record<string, { value: number; label: string }> = {};
  if (yes) hints.pilot_participants = { value: yes, label: "לפי רשימת ההזמנות, אמרו כן" };
  if (consented) {
    hints.testimonials_approved = { value: consented, label: "משפטים עם אישור במחברת" };
    hints.new_testimonials = { value: consented, label: "משפטים עם אישור במחברת" };
  }
  return hints;
}
````

## FILE: src/components/roadmap/BrandStar.tsx
````tsx
// Racheli's four-pointed star brand mark.
export const BrandStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="currentColor" />
  </svg>
);
````

## FILE: src/components/roadmap/StatusBadge.tsx
````tsx
import { CheckCircle2, Clock, PencilLine, Undo2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EntryStatus } from "@/lib/tracker-store";

const config: Record<EntryStatus, { label: string; variant: "secondary" | "gold" | "warning" | "success"; Icon: typeof Clock }> = {
  draft: { label: "בעבודה", variant: "secondary", Icon: PencilLine },
  submitted: { label: "ממתין לאישור המלווה", variant: "gold", Icon: Clock },
  returned: { label: "הוחזר להשלמה", variant: "warning", Icon: Undo2 },
  approved: { label: "אושר", variant: "success", Icon: CheckCircle2 },
};

export const StatusBadge = ({ status, short }: { status: EntryStatus; short?: boolean }) => {
  const { label, variant, Icon } = config[status];
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {short && status === "submitted" ? "ממתין לאישור" : label}
    </Badge>
  );
};
````

## FILE: src/components/roadmap/ProgressRing.tsx
````tsx
import { cn } from "@/lib/utils";

export const ProgressRing = ({ value, size = 64, className }: { value: number; size?: number; className?: string }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="7" className="stroke-secondary" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={cn("transition-[stroke-dashoffset] duration-700 ease-out", value === 100 ? "stroke-success" : "stroke-gold")}
        />
      </svg>
      <span className="ltr-nums absolute inset-0 flex items-center justify-center text-sm font-bold">{value}%</span>
    </div>
  );
};
````

## FILE: src/components/roadmap/Confetti.tsx
````tsx
import { useMemo } from "react";

const colors = ["hsl(var(--gold))", "hsl(var(--gold-light))", "hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))"];

/** One short burst of brand-coloured confetti. Hidden with reduced motion. */
export const Confetti = ({ burst }: { burst: number }) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.4,
        size: 6 + Math.random() * 6,
        drift: `${(Math.random() - 0.5) * 30}vw`,
        spin: `${Math.random() * 720}deg`,
        color: colors[i % colors.length],
        round: i % 3 === 0,
      })),
    // a new burst re-rolls the pieces
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  );
  if (!burst) return null;
  return (
    <div key={burst} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-0 block"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.45,
              background: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
              "--drift": p.drift,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
````

## FILE: src/components/roadmap/RoadmapOverview.tsx
````tsx
import { Check, Lock } from "lucide-react";
import { lockedHint } from "@/data/copy";
import { monthIcons } from "@/data/icons";
import { months } from "@/data/roadmap";
import type { MonthEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface Props {
  openMonth: number;
  selectedMonth: number;
  getEntry: (month: number) => MonthEntry;
  onSelect: (month: number) => void;
}

/**
 * The six-month path. Every month's title and program target are visible so the
 * participant sees where she is heading; only opened months can be entered.
 */
export const RoadmapOverview = ({ openMonth, selectedMonth, getEntry, onSelect }: Props) => (
  <nav aria-label="חודשי התוכנית">
    <ol className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
      {months.map((m) => {
        const locked = m.number > openMonth;
        const entry = getEntry(m.number);
        const approved = entry.status === "approved";
        const selected = m.number === selectedMonth;
        const Icon = monthIcons[m.number];
        return (
          <li key={m.number} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <button
              type="button"
              disabled={locked}
              onClick={() => onSelect(m.number)}
              aria-current={selected ? "step" : undefined}
              className={cn(
                "group flex h-full w-full flex-col gap-2 rounded-2xl border p-3 text-right transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                locked && "cursor-not-allowed border-dashed bg-muted/60 text-muted-foreground",
                !locked && "bg-card hover:-translate-y-0.5 hover:border-gold hover:shadow-md",
                selected && "border-primary bg-primary text-primary-foreground shadow-md hover:shadow-md",
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-enabled:group-hover:scale-110",
                    selected ? "bg-gold text-accent-foreground" : approved ? "bg-success text-success-foreground" : "bg-secondary text-primary",
                    locked && "bg-transparent",
                  )}
                >
                  {locked ? <Lock className="h-4 w-4" aria-hidden /> : approved ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
                </span>
                <span className={cn("text-xs font-medium", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>חודש {m.number}</span>
              </span>
              <span className="text-sm font-bold leading-snug">{m.title}</span>
              <span className={cn("text-xs leading-snug", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {m.overviewTarget}
              </span>
              <span className="mt-auto pt-1">
                {locked ? (
                  <span className="text-xs">{lockedHint}</span>
                ) : (
                  !selected && <StatusBadge status={entry.status} short />
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);
````

## FILE: src/components/roadmap/MonthForm.tsx
````tsx
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, FileText, Paperclip, PartyPopper, Send, Target, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as copy from "@/data/copy";
import { metricIcons, monthIcons, reflectionIcons, stepIcons } from "@/data/icons";
import { reflectionFields, type Metric, type RoadmapMonth } from "@/data/roadmap";
import { entryProgress, type MonthEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";
import { Confetti } from "./Confetti";
import { ProgressRing } from "./ProgressRing";
import { StatusBadge } from "./StatusBadge";

interface Props {
  month: RoadmapMonth;
  entry: MonthEntry;
  /** Mentor view: every section at once, nothing editable. */
  readOnly?: boolean;
  onChange?: (patch: Partial<MonthEntry>) => void;
  onSubmit?: () => void;
  /** Numbers the workbook already knows, shown as a suggestion under a metric. */
  hints?: Record<string, { value: number; label: string }>;
}

const firstNumber = (s: string | undefined) => {
  const m = (s ?? "").replace(/,/g, "").match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
};

/** Target reached when both the target and the actual are plain numbers. */
const reachedTarget = (metric: Metric, entry: MonthEntry) => {
  const target =
    metric.target.kind === "personal" ? firstNumber(entry.personalTargets[metric.id]) : firstNumber(metric.target.label);
  const actual = firstNumber(entry.actuals[metric.id]);
  return target !== null && target > 0 && actual !== null && actual >= target;
};

export const MonthForm = ({ month, entry, readOnly, onChange, onSubmit, hints }: Props) => {
  const [step, setStep] = useState(0);
  const [burst, setBurst] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const goTo = (i: number) => {
    setStep(i);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const locked = readOnly || entry.status === "submitted" || entry.status === "approved";
  const set = (patch: Partial<MonthEntry>) => !locked && onChange?.(patch);
  const celebrate = () => setBurst((b) => b + 1);

  const MonthIcon = monthIcons[month.number];
  const progress = entryProgress(entry, month.milestones.map((m) => m.id), month.metrics.map((m) => m.id));
  const checkedCount = month.milestones.filter((m) => entry.milestones[m.id]).length;

  const stepDone: Record<copy.StepId, boolean> = {
    milestones: checkedCount > 0,
    metrics: month.metrics.every((m) => (entry.actuals[m.id] ?? "").trim() !== ""),
    evidence: entry.evidence.trim() !== "" || entry.evidenceFiles.length > 0,
    summary: (entry.reflection.win ?? "").trim() !== "",
  };

  const toggleMilestone = (id: string) => {
    const next = { ...entry.milestones, [id]: !entry.milestones[id] };
    set({ milestones: next });
    if (!locked && month.milestones.every((m) => next[m.id])) celebrate();
  };

  const sections: Record<copy.StepId, React.ReactNode> = {
    milestones: (
      <div className="space-y-3">
        <ul className="grid gap-3">
          {month.milestones.map((m) => {
            const on = !!entry.milestones[m.id];
            return (
              <li key={m.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  disabled={locked}
                  onClick={() => toggleMilestone(m.id)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-right transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default",
                    on ? "border-success bg-success/10" : "border-border bg-card enabled:hover:-translate-y-0.5 enabled:hover:border-gold enabled:hover:shadow-md",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      on ? "scale-110 border-success bg-success text-success-foreground" : "border-input text-transparent group-enabled:group-hover:border-gold",
                    )}
                  >
                    <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className={cn("text-base leading-relaxed", on && "font-semibold")}>{m.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {checkedCount === month.milestones.length && (
          <p className="animate-pop-in flex items-center justify-center gap-2 rounded-xl bg-gold-light/60 p-3 text-sm font-bold">
            <PartyPopper className="h-5 w-5 text-gold-deep" aria-hidden />
            {copy.allMilestonesDone}
          </p>
        )}
      </div>
    ),

    metrics: (
      <ul className="grid gap-3 sm:grid-cols-2">
        {month.metrics.map((metric) => {
          const Icon = metricIcons[metric.id] ?? Target;
          const id = `act-${month.number}-${metric.id}`;
          const hit = reachedTarget(metric, entry);
          return (
            <li key={metric.id} className={cn("flex flex-col gap-3 rounded-xl border-2 bg-card p-4 transition-colors", hit ? "border-success" : "border-border")}>
              <div className="flex items-start gap-3">
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", hit ? "bg-success text-success-foreground" : "bg-secondary text-primary")}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <Label htmlFor={id} className="block font-bold">
                    {metric.label}
                  </Label>
                  {metric.target.kind !== "personal" && (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gold-light/60 px-2 py-0.5 text-xs font-medium">
                      <Target className="h-3 w-3" aria-hidden />
                      {metric.target.kind === "program" ? "יעד: " : "מומלץ: "}
                      {metric.target.label.replace(" (המלצה)", "")}
                    </span>
                  )}
                </div>
              </div>
              <div className={cn("grid gap-2", metric.target.kind === "personal" && "grid-cols-2")}>
                {metric.target.kind === "personal" && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">{copy.personalTargetPlaceholder}</span>
                    <Input
                      aria-label={`היעד שלך: ${metric.label}`}
                      inputMode="numeric"
                      placeholder="?"
                      value={entry.personalTargets[metric.id] ?? ""}
                      disabled={locked}
                      onChange={(e) => set({ personalTargets: { ...entry.personalTargets, [metric.id]: e.target.value } })}
                      className="h-11 text-center text-lg"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  {metric.target.kind === "personal" && <span className="text-xs text-muted-foreground">בפועל</span>}
                  <div className="relative">
                    <Input
                      id={id}
                      inputMode="numeric"
                      placeholder={metric.target.kind === "personal" ? "0" : "כמה בפועל?"}
                      value={entry.actuals[metric.id] ?? ""}
                      disabled={locked}
                      onChange={(e) => set({ actuals: { ...entry.actuals, [metric.id]: e.target.value } })}
                      className="h-11 text-center text-lg font-bold"
                    />
                    {metric.currency && <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">₪</span>}
                  </div>
                </div>
              </div>
              {hints?.[metric.id] && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-secondary/70 px-3 py-2 text-xs">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
                    {hints[metric.id].label}: <span className="ltr-nums font-bold">{hints[metric.id].value}</span>
                  </span>
                  {!locked && String(hints[metric.id].value) !== (entry.actuals[metric.id] ?? "") && (
                    <button
                      type="button"
                      onClick={() => set({ actuals: { ...entry.actuals, [metric.id]: String(hints[metric.id].value) } })}
                      className="font-bold text-primary hover:underline"
                    >
                      להעביר למדד
                    </button>
                  )}
                </div>
              )}
              {hit && (
                <p className="animate-pop-in flex items-center gap-1.5 text-sm font-bold text-success">
                  <Trophy className="h-4 w-4" aria-hidden />
                  הגעת ליעד!
                </p>
              )}
            </li>
          );
        })}
      </ul>
    ),

    evidence: (
      <div className="space-y-3">
        <Textarea
          id={`ev-${month.number}`}
          aria-label="ראיות להצלחה"
          rows={4}
          placeholder={copy.evidencePlaceholder}
          value={entry.evidence}
          disabled={locked}
          onChange={(e) => set({ evidence: e.target.value })}
          className="rounded-xl text-base"
        />
        {!locked && (
          <>
            <input
              ref={fileInput}
              type="file"
              multiple
              accept="image/*,application/pdf"
              className="sr-only"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []).map((f) => ({ name: f.name }));
                set({ evidenceFiles: [...entry.evidenceFiles, ...files] });
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gold/70 bg-gold-light/20 p-6 text-sm font-semibold transition-colors hover:border-gold hover:bg-gold-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-accent-foreground">
                <Paperclip className="h-5 w-5" aria-hidden />
              </span>
              {copy.attachLabel}
              <span className="text-xs font-normal text-muted-foreground">צילום מסך, PDF או תמונה</span>
            </button>
          </>
        )}
        {entry.evidenceFiles.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {entry.evidenceFiles.map((f, i) => (
              <li key={`${f.name}-${i}`} className="animate-pop-in inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs">
                <FileText className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
                <span className="max-w-[12rem] truncate">{f.name}</span>
                {!locked && (
                  <button
                    type="button"
                    aria-label={`הסרת ${f.name}`}
                    onClick={() => set({ evidenceFiles: entry.evidenceFiles.filter((_, j) => j !== i) })}
                    className="rounded-full p-0.5 hover:bg-secondary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    ),

    summary: (
      <div className="grid gap-4 md:grid-cols-2">
        {reflectionFields.map((f, i) => {
          const Icon = reflectionIcons[f.id];
          const id = `rf-${month.number}-${f.id}`;
          return (
            <div key={f.id} className={cn("space-y-2 rounded-xl border bg-card p-4", i === 0 && "border-gold bg-gold-light/25 md:col-span-2")}>
              <Label htmlFor={id} className="flex items-center gap-2 text-base font-bold">
                <Icon className={cn("h-5 w-5", i === 0 ? "text-gold-deep" : "text-primary")} aria-hidden />
                {copy.reflectionLabels[f.id]}
              </Label>
              <Textarea
                id={id}
                rows={2}
                value={entry.reflection[f.id] ?? ""}
                disabled={locked}
                onChange={(e) => set({ reflection: { ...entry.reflection, [f.id]: e.target.value } })}
                className="border-0 bg-secondary/50"
              />
            </div>
          );
        })}
        <div className="space-y-2 rounded-xl border bg-card p-4">
          <Label htmlFor={`fu-${month.number}`} className="flex items-center gap-2 text-base font-bold">
            {(() => {
              const Icon = reflectionIcons.next_follow_up;
              return <Icon className="h-5 w-5 text-primary" aria-hidden />;
            })()}
            {copy.followUpLabel}
          </Label>
          <Input
            id={`fu-${month.number}`}
            type="date"
            value={entry.nextFollowUp}
            disabled={locked}
            onChange={(e) => set({ nextFollowUp: e.target.value })}
            className="border-0 bg-secondary/50"
          />
        </div>
      </div>
    ),
  };

  const StepHeading = ({ i }: { i: number }) => {
    const s = copy.steps[i];
    const Icon = stepIcons[s.id];
    return (
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h4 className="text-xl font-extrabold text-primary">{s.title}</h4>
          <p className="text-sm text-muted-foreground">{s.hint}</p>
        </div>
      </div>
    );
  };

  const isLast = step === copy.steps.length - 1;

  return (
    <Card className="scroll-mt-14 overflow-hidden rounded-2xl" ref={top}>
      <Confetti burst={burst} />

      {/* Month header */}
      <div className="flex flex-col gap-4 border-b bg-gradient-to-l from-secondary/80 to-card p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-accent-foreground shadow-sm">
          <MonthIcon className="h-7 w-7" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gold-deep">חודש {month.number}</span>
            <StatusBadge status={entry.status} />
          </div>
          <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{month.title}</h3>
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
            המטרה של החודש: {month.desiredOutcome}
          </p>
        </div>
        {!readOnly && (
          <div className="flex items-center gap-3 sm:flex-col sm:gap-1 sm:text-center">
            <ProgressRing value={progress} />
            <p className="max-w-[10rem] text-xs font-medium text-muted-foreground">{copy.cheer(progress)}</p>
          </div>
        )}
      </div>

      <CardContent className="space-y-6 p-5 sm:p-6">
        {/* Status messages */}
        {!readOnly && entry.status === "submitted" && (
          <div className="animate-pop-in flex items-center gap-4 rounded-2xl bg-gold-light/50 p-5">
            <PartyPopper className="h-10 w-10 shrink-0 text-gold-deep" aria-hidden />
            <div>
              <p className="text-lg font-extrabold">{copy.submittedTitle}</p>
              <p className="text-sm">{copy.submittedBody}</p>
            </div>
          </div>
        )}
        {!readOnly && entry.status === "approved" && (
          <div className="animate-pop-in flex items-center gap-4 rounded-2xl bg-success/15 p-5">
            <Trophy className="h-10 w-10 shrink-0 text-success" aria-hidden />
            <div>
              <p className="text-lg font-extrabold">{copy.approvedTitle}</p>
              <p className="text-sm">{copy.approvedBody}</p>
            </div>
          </div>
        )}
        {entry.mentorNote && (
          <div className={cn("rounded-2xl p-4 text-sm", entry.status === "returned" ? "bg-warning/10" : "bg-secondary")}>
            <p className="mb-1 font-bold">{entry.status === "returned" ? copy.returnedTitle : copy.mentorNoteTitle}</p>
            <p className="whitespace-pre-line">{entry.mentorNote}</p>
          </div>
        )}

        {readOnly ? (
          copy.steps.map((s, i) => (
            <section key={s.id} className="space-y-4">
              <StepHeading i={i} />
              {sections[s.id]}
            </section>
          ))
        ) : (
          <>
            {/* Step tabs */}
            <ol className="grid grid-cols-4 gap-2" aria-label="שלבי החודש">
              {copy.steps.map((s, i) => {
                const Icon = stepIcons[s.id];
                const done = stepDone[s.id];
                const current = i === step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "flex w-full flex-col items-center gap-1.5 rounded-xl p-2 text-center text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        current ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "relative flex h-9 w-9 items-center justify-center rounded-full",
                          current ? "bg-primary-foreground/15" : done ? "bg-success text-success-foreground" : "bg-secondary text-primary",
                        )}
                      >
                        {done && !current ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
                      </span>
                      <span className="hidden leading-tight sm:block">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <section key={step} className="animate-in fade-in slide-in-from-bottom-2 space-y-5 duration-300">
              <StepHeading i={step} />
              {sections[copy.steps[step].id]}
            </section>

            <footer className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{copy.autosave}</p>
              <div className="flex gap-2">
                {step > 0 && (
                  <Button variant="outline" size="lg" onClick={() => goTo(step - 1)}>
                    <ArrowRight />
                    {copy.back}
                  </Button>
                )}
                {!isLast ? (
                  <Button size="lg" className="flex-1 sm:flex-none" onClick={() => goTo(step + 1)}>
                    {copy.next}
                    <ArrowLeft />
                  </Button>
                ) : (
                  !locked && (
                    <Button
                      variant="gold"
                      size="lg"
                      className="flex-1 sm:flex-none"
                      onClick={() => {
                        onSubmit?.();
                        celebrate();
                      }}
                    >
                      <Send />
                      {copy.submit}
                    </Button>
                  )
                )}
              </div>
            </footer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
````

## FILE: src/components/roadmap/WorkbookView.tsx
````tsx
import { useRef, useState } from "react";
import { BookOpen, Camera, Check, ChevronDown, Copy, FileText, Plus, ThumbsDown, ThumbsUp, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getWorkbook, inviteStatuses, outreachTemplate, quotesIntro, type WorkbookField, type WorkbookSection } from "@/data/workbooks";
import { workbookProgress, type Invite, type WorkbookEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";

interface Props {
  month: number;
  entry: WorkbookEntry;
  readOnly?: boolean;
  onChange?: (patch: Partial<WorkbookEntry>) => void;
}

const sectionHasContent = (section: WorkbookSection, w: WorkbookEntry) =>
  section.fields.some((f) => {
    switch (f.kind) {
      case "text":
        return (w.answers[f.id] ?? "").trim() !== "";
      case "fillin":
        return (w.blanks[f.id] ?? []).some((b) => b.trim() !== "");
      case "yesno":
        return w.yes.length + w.no.length > 0;
      case "invites":
        return w.invites.length > 0;
      case "message":
        return w.message.trim() !== "";
      case "quotes":
        return w.quotes.length > 0;
    }
  });

/** The outreach draft, with the pilot answers filled in or blanks where missing. */
export const buildOutreach = (w: WorkbookEntry) =>
  outreachTemplate.replace(/\{(\w+)\}/g, (_, id: string) => (w.answers[id] ?? "").trim() || "____");

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/** A one-column list of short lines with add and remove. */
const LineList = ({
  items,
  onChange,
  readOnly,
  placeholder,
  idPrefix,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  readOnly?: boolean;
  placeholder: string;
  idPrefix: string;
}) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <Input
          id={`${idPrefix}-${i}`}
          aria-label={placeholder}
          value={item}
          disabled={readOnly}
          onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
          className="h-10 rounded-lg bg-card"
        />
        {!readOnly && (
          <button type="button" aria-label="הסרה" onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    ))}
    {!readOnly && (
      <button type="button" onClick={() => onChange([...items, ""])} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <Plus className="h-4 w-4" aria-hidden />
        הוספה
      </button>
    )}
    {readOnly && items.length === 0 && <p className="text-sm text-muted-foreground">עדיין ריק</p>}
  </div>
);

export const WorkbookView = ({ month, entry, readOnly, onChange }: Props) => {
  const book = getWorkbook(month);
  const [open, setOpen] = useState<string | null>(book?.sections[0]?.id ?? null);
  const [copied, setCopied] = useState<string | null>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<WorkbookEntry>) => !readOnly && onChange?.(patch);

  if (!book) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
            <BookOpen className="h-7 w-7" aria-hidden />
          </span>
          <p className="text-lg font-bold">מחברת העבודה של חודש {month} תעלה כאן לפני המפגש</p>
          <p className="max-w-sm text-sm text-muted-foreground">בינתיים אפשר להמשיך במפת החודש.</p>
        </CardContent>
      </Card>
    );
  }

  const progress = workbookProgress(entry);
  const flash = async (key: string, text: string) => {
    if (await copyText(text)) {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    }
  };

  const renderField = (f: WorkbookField) => {
    const id = `wb-${month}-${f.id}`;
    switch (f.kind) {
      case "text":
        return (
          <div key={f.id} className="space-y-1.5">
            <Label htmlFor={id} className="text-base font-semibold">
              {f.label}
            </Label>
            {f.rows === 1 ? (
              <Input id={id} value={entry.answers[f.id] ?? ""} disabled={readOnly} onChange={(e) => set({ answers: { ...entry.answers, [f.id]: e.target.value } })} className="h-11 rounded-lg bg-card" />
            ) : (
              <Textarea id={id} rows={f.rows ?? 2} value={entry.answers[f.id] ?? ""} disabled={readOnly} onChange={(e) => set({ answers: { ...entry.answers, [f.id]: e.target.value } })} className="rounded-lg bg-card" />
            )}
          </div>
        );

      case "fillin": {
        const values = entry.blanks[f.id] ?? [];
        return (
          <div key={f.id} className="space-y-2 rounded-xl bg-gold-light/30 p-4">
            <p className="text-sm font-bold text-gold-deep">{f.label}</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-base leading-loose sm:text-lg">
              {f.parts.map((part, i) => (
                <span key={i} className="contents">
                  <span className="font-medium">{part}</span>
                  {i < f.parts.length - 1 && (
                    <Input
                      aria-label={`${f.label}, השלמה ${i + 1}`}
                      value={values[i] ?? ""}
                      disabled={readOnly}
                      placeholder="..."
                      onChange={(e) => {
                        const next = [...values];
                        next[i] = e.target.value;
                        set({ blanks: { ...entry.blanks, [f.id]: next } });
                      }}
                      className="h-9 w-full rounded-none border-0 border-b-2 border-gold bg-transparent px-1 text-base font-semibold focus-visible:ring-0 focus-visible:border-primary sm:w-48"
                    />
                  )}
                </span>
              ))}
            </p>
          </div>
        );
      }

      case "yesno":
        return (
          <div key={f.id} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-3 rounded-xl bg-success/10 p-4">
              <p className="flex items-center gap-2 font-bold text-success">
                <ThumbsUp className="h-4 w-4" aria-hidden />
                מי כן מתאימה לפיילוט שלי
              </p>
              <LineList idPrefix={`${id}-yes`} items={entry.yes} readOnly={readOnly} placeholder="מי כן מתאימה" onChange={(yes) => set({ yes })} />
            </div>
            <div className="space-y-3 rounded-xl bg-secondary p-4">
              <p className="flex items-center gap-2 font-bold text-muted-foreground">
                <ThumbsDown className="h-4 w-4" aria-hidden />
                מי לא מתאימה לפיילוט שלי
              </p>
              <LineList idPrefix={`${id}-no`} items={entry.no} readOnly={readOnly} placeholder="מי לא מתאימה" onChange={(no) => set({ no })} />
            </div>
          </div>
        );

      case "invites": {
        const update = (i: number, patch: Partial<Invite>) => set({ invites: entry.invites.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
        const yesCount = entry.invites.filter((x) => x.status === "yes").length;
        return (
          <div key={f.id} className="space-y-3">
            {entry.invites.length > 0 && (
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="ltr-nums rounded-full bg-success px-2.5 py-0.5 text-success-foreground">{yesCount}</span>
                אמרו כן מתוך {entry.invites.length}
              </p>
            )}
            <ul className="space-y-3">
              {entry.invites.map((inv, i) => (
                <li key={i} className="space-y-3 rounded-xl border bg-card p-4">
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Input aria-label="שם או מקום לחיפוש" placeholder="שם / מקום לחיפוש" value={inv.name} disabled={readOnly} onChange={(e) => update(i, { name: e.target.value })} className="rounded-lg" />
                    <Input aria-label="למה מתאימה" placeholder="למה מתאימה?" value={inv.why} disabled={readOnly} onChange={(e) => update(i, { why: e.target.value })} className="rounded-lg" />
                    <Input aria-label="מתי אפנה" placeholder="מתי אפנה?" value={inv.when} disabled={readOnly} onChange={(e) => update(i, { when: e.target.value })} className="rounded-lg" />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {inviteStatuses.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        disabled={readOnly}
                        aria-pressed={inv.status === st.id}
                        onClick={() => update(i, { status: st.id })}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold transition-colors disabled:cursor-default",
                          inv.status === st.id
                            ? st.id === "yes"
                              ? "border-success bg-success text-success-foreground"
                              : st.id === "no"
                                ? "border-muted-foreground bg-muted-foreground text-background"
                                : "border-primary bg-primary text-primary-foreground"
                            : "bg-card enabled:hover:border-primary",
                        )}
                      >
                        {st.label}
                      </button>
                    ))}
                    {!readOnly && (
                      <button type="button" aria-label="הסרת השורה" onClick={() => set({ invites: entry.invites.filter((_, j) => j !== i) })} className="mr-auto rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {!readOnly && (
              <Button variant="outline" onClick={() => set({ invites: [...entry.invites, { name: "", why: "", when: "", status: "todo" }] })} className="rounded-xl">
                <Plus />
                הוספת אישה לרשימה
              </Button>
            )}
            {readOnly && entry.invites.length === 0 && <p className="text-sm text-muted-foreground">עדיין ריק</p>}
          </div>
        );
      }

      case "message": {
        const draft = buildOutreach(entry);
        return (
          <div key={f.id} className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-sm font-bold text-gold-deep">
                <Wand2 className="h-4 w-4" aria-hidden />
                הטיוטה שלך, מתוך התשובות על הפיילוט
              </p>
              <div className="relative max-w-xl rounded-2xl rounded-tr-sm bg-bubble p-4 text-[15px] leading-relaxed text-foreground shadow-sm">
                {draft.split(/(____|\[[^\]]+\])/).map((chunk, i) =>
                  chunk === "____" || chunk.startsWith("[") ? (
                    <mark key={i} className="rounded bg-gold-light px-1 text-foreground">
                      {chunk}
                    </mark>
                  ) : (
                    <span key={i}>{chunk}</span>
                  ),
                )}
              </div>
              {!readOnly && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => flash("draft", draft)}>
                    {copied === "draft" ? <Check /> : <Copy />}
                    {copied === "draft" ? "הועתק" : "העתקת הטיוטה"}
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full" onClick={() => set({ message: draft })}>
                    <Wand2 />
                    להתחיל מהטיוטה
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={id} className="text-base font-semibold">
                הנוסח האישי שלי
              </Label>
              <Textarea id={id} rows={5} value={entry.message} disabled={readOnly} onChange={(e) => set({ message: e.target.value })} className="rounded-lg bg-card" />
              {!readOnly && entry.message.trim() && (
                <Button size="sm" className="rounded-full" onClick={() => flash("mine", entry.message)}>
                  {copied === "mine" ? <Check /> : <Copy />}
                  {copied === "mine" ? "הועתק, אפשר להדביק בוואטסאפ" : "העתקה לשליחה"}
                </Button>
              )}
            </div>
          </div>
        );
      }

      case "quotes":
        return (
          <div key={f.id} className="space-y-3 rounded-xl border-2 border-dashed border-gold/60 p-4">
            <p className="font-bold">שומרות חומר לשיווק העתידי</p>
            <p className="text-sm text-muted-foreground">{quotesIntro}</p>
            <ul className="space-y-2">
              {entry.quotes.map((q, i) => (
                <li key={i} className="space-y-2 rounded-lg bg-card p-3">
                  <div className="flex items-start gap-1.5">
                    <Textarea
                      aria-label="משפט של לקוחה"
                      rows={2}
                      value={q.text}
                      disabled={readOnly}
                      onChange={(e) => set({ quotes: entry.quotes.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })}
                      className="rounded-lg"
                    />
                    {!readOnly && (
                      <button type="button" aria-label="הסרה" onClick={() => set({ quotes: entry.quotes.filter((_, j) => j !== i) })} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={q.consent}
                      disabled={readOnly}
                      onCheckedChange={(v) => set({ quotes: entry.quotes.map((x, j) => (j === i ? { ...x, consent: v } : x)) })}
                    />
                    יש לי אישור שלה לפרסם
                  </label>
                </li>
              ))}
            </ul>
            {!readOnly && (
              <button type="button" onClick={() => set({ quotes: [...entry.quotes, { text: "", consent: false }] })} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <Plus className="h-4 w-4" aria-hidden />
                הוספת משפט
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-4 bg-gradient-to-l from-gold-light/50 to-card p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BookOpen className="h-7 w-7" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-semibold text-gold-deep">מחברת העבודה · חודש {month}</p>
            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.subtitle}</p>
          </div>
          <ProgressRing value={progress} />
        </div>
        <CardContent className="space-y-4 p-5 sm:p-6">
          <p className="text-base">
            <span className="font-bold">המטרה היום: </span>
            {book.goal}
          </p>

          {/* "המסלול שלנו" */}
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold sm:text-sm" aria-label="המסלול שלנו">
            {book.path.map((step, i) => {
              const lit = book.sections.filter((s) => step.sectionIds.includes(s.id)).some((s) => sectionHasContent(s, entry));
              return (
                <li key={step.label} className="flex items-center gap-1.5">
                  <span className={cn("rounded-full px-3 py-1 transition-colors", lit ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground")}>
                    {step.label}
                  </span>
                  {i < book.path.length - 1 && (
                    <span className="text-muted-foreground" aria-hidden>
                      ←
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Paper alternative */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary/60 p-3 text-sm">
            <Camera className="h-4 w-4 text-primary" aria-hidden />
            <span className="font-medium">מילאת על דף?</span>
            {!readOnly && (
              <>
                <input
                  ref={photoInput}
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    set({ photos: [...entry.photos, ...Array.from(e.target.files ?? []).map((x) => ({ name: x.name }))] });
                    e.target.value = "";
                  }}
                />
                <button type="button" onClick={() => photoInput.current?.click()} className="font-semibold text-primary underline-offset-2 hover:underline">
                  צלמי והעלי את המחברת
                </button>
              </>
            )}
            {entry.photos.map((p, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-0.5 text-xs">
                <FileText className="h-3 w-3 text-gold-deep" aria-hidden />
                {p.name}
              </span>
            ))}
            {readOnly && entry.photos.length === 0 && <span className="text-muted-foreground">לא הועלו צילומים</span>}
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      {book.sections.map((section) => {
        const Icon = section.icon;
        const done = sectionHasContent(section, entry);
        const isOpen = readOnly || open === section.id;
        return (
          <Card key={section.id} className={cn("overflow-hidden rounded-2xl transition-shadow", isOpen && "shadow-md")}>
            <button
              type="button"
              aria-expanded={isOpen}
              disabled={readOnly}
              onClick={() => setOpen(isOpen ? null : section.id)}
              className="flex w-full items-center gap-3 p-4 text-right disabled:cursor-default sm:p-5"
            >
              <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", done ? "bg-success text-success-foreground" : "bg-secondary text-primary")}>
                {done && !isOpen ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-gold-deep">{section.number}</span>
                <span className="block text-lg font-extrabold leading-snug">{section.title}</span>
              </span>
              {!readOnly && <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", isOpen && "rotate-180")} aria-hidden />}
            </button>
            {isOpen && (
              <CardContent className="animate-in fade-in space-y-5 border-t p-4 pt-5 duration-300 sm:p-5">
                {section.intro && <p className="text-sm text-muted-foreground">{section.intro}</p>}
                {section.fields.map(renderField)}
                {section.note && <p className="rounded-lg bg-secondary/60 p-3 text-sm">{section.note}</p>}
              </CardContent>
            )}
          </Card>
        );
      })}

      {!readOnly && <p className="text-center text-xs text-muted-foreground">הכול נשמר לבד. המלווה שלך רואה את המחברת.</p>}
    </div>
  );
};
````

## FILE: src/pages/Login.tsx
````tsx
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { programName, roadmapTitle } from "@/data/roadmap";
import { useSession } from "@/lib/tracker-store";

const GoogleMark = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export default function Login() {
  const { signInWithPassword, signInWithGoogle } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-primary lg:flex-row">
      {/* Brand side */}
      <div className="relative flex flex-1 flex-col justify-end overflow-hidden px-6 pb-10 pt-16 text-primary-foreground lg:p-14">
        <BrandStar className="pointer-events-none absolute -left-16 -top-16 h-80 w-80 text-gold/15" />
        <BrandStar className="pointer-events-none absolute bottom-10 left-1/3 h-10 w-10 text-gold/40" />
        <p className="relative flex items-center gap-2 text-sm font-medium text-gold-light">
          <BrandStar className="h-3.5 w-3.5 text-gold" />
          {programName}
        </p>
        <h1 className="relative mt-3 text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-tight">{roadmapTitle}</h1>
        <p className="relative mt-3 max-w-md text-lg text-primary-foreground/85">כל החודשים, מחברות העבודה וההתקדמות שלך, במקום אחד.</p>
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center rounded-t-3xl bg-background px-4 py-10 lg:rounded-none lg:rounded-r-3xl">
        <Card className="w-full max-w-sm rounded-2xl border-0 shadow-none sm:border sm:shadow-sm">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-extrabold">כניסה</h2>
              <p className="mt-1 text-sm text-muted-foreground">משתתפות, מלוות ומנהלת התוכנית נכנסות מכאן.</p>
            </div>

            <Button variant="outline" size="lg" className="w-full gap-3 rounded-xl" onClick={signInWithGoogle}>
              <GoogleMark />
              כניסה עם Google
            </Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              או עם שם משתמש וסיסמה
              <span className="h-px flex-1 bg-border" />
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setError(signInWithPassword(username, password));
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="login-user">שם משתמש או מייל</Label>
                <Input id="login-user" autoComplete="username" dir="ltr" className="h-11 rounded-xl text-right" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-pass">סיסמה</Label>
                <div className="relative">
                  <Input
                    id="login-pass"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    dir="ltr"
                    className="h-11 rounded-xl pl-11 text-right"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={show ? "הסתרת הסיסמה" : "הצגת הסיסמה"}
                    onClick={() => setShow((v) => !v)}
                    className="absolute inset-y-0 left-2 flex items-center px-1 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-warning/10 p-3 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" className="w-full rounded-xl">
                <LogIn />
                כניסה
              </Button>
              <p className="text-center text-xs text-muted-foreground">שכחת סיסמה? פני למנהלת התוכנית.</p>
            </form>

            {/* PREVIEW ONLY: removed in the real app */}
            <div className="space-y-1.5 rounded-xl border border-dashed border-gold/70 bg-gold-light/20 p-3 text-xs">
              <p className="font-bold">חשבונות לתצוגה המקדימה (סיסמה 123456)</p>
              <p>
                משתתפת: <span dir="ltr" className="font-mono">student</span> · מלווה: <span dir="ltr" className="font-mono">mentor</span> · מנהלת:{" "}
                <span dir="ltr" className="font-mono">admin</span>
              </p>
              <p className="text-muted-foreground">כפתור Google נכנס כאן בתור משתתפת לדוגמה.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
````

## FILE: src/pages/ParticipantRoadmap.tsx
````tsx
import { useState } from "react";
import { BookOpen, ChevronDown, Flag, Info, ListChecks, LogOut, Map as MapIcon, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkbookView } from "@/components/roadmap/WorkbookView";
import * as copy from "@/data/copy";
import { Card, CardContent } from "@/components/ui/card";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { MonthForm } from "@/components/roadmap/MonthForm";
import { RoadmapOverview } from "@/components/roadmap/RoadmapOverview";
import {
  definitions,
  howToUse,
  months,
  personalGoalsNote,
  programName,
  roadmapTitle,
  startingPoints,
} from "@/data/roadmap";
import { metricHints, useSession, useTracker } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";

export default function ParticipantRoadmap({ participantId }: { participantId: string }) {
  const tracker = useTracker();
  const participant = tracker.participants.find((p) => p.id === participantId);
  const [selected, setSelected] = useState(participant?.openMonth ?? 1);
  const [guideOpen, setGuideOpen] = useState(false);
  const [tab, setTab] = useState<"map" | "workbook">("map");
  const { signOut } = useSession();

  if (!participant) return null;
  const mentor = tracker.mentors.find((m) => m.id === participant.mentorId);
  const month = months.find((m) => m.number === Math.min(selected, participant.openMonth))!;
  const entry = tracker.getEntry(participant.id, month.number);

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <BrandStar className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 text-gold/15" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
              <BrandStar className="h-3.5 w-3.5 text-gold" />
              {programName}
            </p>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut />
              יציאה
            </Button>
          </div>
          <h1 className="mt-2 text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-tight">{copy.greeting(participant.name.split(" ")[0])}</h1>
          <p className="mt-2 max-w-2xl text-primary-foreground/85">{copy.greetingSub}</p>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-primary-foreground/85">
            <div className="flex items-center gap-1.5">
              <dt className="flex items-center gap-1.5"><MapIcon className="h-4 w-4 text-gold" aria-hidden />{roadmapTitle}:</dt>
              <dd className="font-semibold text-primary-foreground">{participant.name}</dd>
            </div>
            {mentor && (
              <div className="flex items-center gap-1.5">
                <dt className="flex items-center gap-1.5"><UserRound className="h-4 w-4 text-gold" aria-hidden />המלווה שלך:</dt>
                <dd className="font-semibold text-primary-foreground">{mentor.name}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Starting point: set once, everything is compared against it */}
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:gap-6 sm:pt-5">
            <p className="flex shrink-0 items-center gap-2 font-bold text-primary"><Flag className="h-4 w-4 text-gold-deep" aria-hidden />{copy.startingPointQuestion}</p>
            <div role="radiogroup" aria-label="נקודת פתיחה" className="flex flex-wrap gap-2">
              {startingPoints.map((sp) => {
                const on = participant.startingPoint === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => tracker.setStartingPoint(participant.id, sp.id)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
                    )}
                  >
                    {sp.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* How to use */}
        <Card className="rounded-2xl">
          <button
            type="button"
            onClick={() => setGuideOpen((v) => !v)}
            aria-expanded={guideOpen}
            className="flex w-full items-center justify-between gap-3 p-5 text-right"
          >
            <span className="flex items-center gap-2 font-bold text-primary">
              <Info className="h-4 w-4" aria-hidden />
              {copy.guideTitle}
            </span>
            <ChevronDown className={cn("h-5 w-5 transition-transform", guideOpen && "rotate-180")} aria-hidden />
          </button>
          {guideOpen && (
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>{howToUse}</p>
              <dl className="grid gap-2 sm:grid-cols-2">
                {definitions.map((d) => (
                  <div key={d.term} className="rounded-md bg-secondary/60 p-3">
                    <dt className="font-bold text-primary">{d.term}</dt>
                    <dd className="text-muted-foreground">{d.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted-foreground">{personalGoalsNote}</p>
            </CardContent>
          )}
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-primary">{copy.overviewTitle}</h2>
          <RoadmapOverview
            openMonth={participant.openMonth}
            selectedMonth={month.number}
            getEntry={(n) => tracker.getEntry(participant.id, n)}
            onSelect={setSelected}
          />
        </section>

        <div role="tablist" aria-label="תוכן החודש" className="grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
          {[
            { id: "map" as const, label: "מפת החודש", Icon: ListChecks },
            { id: "workbook" as const, label: "מחברת העבודה", Icon: BookOpen },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all",
                tab === id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>

        {tab === "workbook" ? (
          <WorkbookView
            key={`wb-${month.number}`}
            month={month.number}
            entry={tracker.getWorkbookEntry(participant.id, month.number)}
            onChange={(patch) => tracker.saveWorkbook(participant.id, month.number, patch)}
          />
        ) : (
        <MonthForm
          hints={metricHints(tracker.workbooks, participant.id)}
          key={month.number}
          month={month}
          entry={entry}
          onChange={(patch) => tracker.saveEntry(participant.id, month.number, { ...patch, status: entry.status === "returned" ? "returned" : "draft" })}
          onSubmit={() => tracker.submitEntry(participant.id, month.number)}
        />
        )}
      </main>
    </div>
  );
}
````

## FILE: src/pages/ReviewDashboard.tsx
````tsx
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CircleDashed,
  Clock,
  Layers,
  ListChecks,
  Lock,
  LockOpen,
  LogOut,
  Search,
  Settings2,
  Undo2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { MonthForm } from "@/components/roadmap/MonthForm";
import { ProgressRing } from "@/components/roadmap/ProgressRing";
import { StatusBadge } from "@/components/roadmap/StatusBadge";
import { WorkbookView } from "@/components/roadmap/WorkbookView";
import { monthIcons } from "@/data/icons";
import { months, programName, startingPoints } from "@/data/roadmap";
import {
  emptyEntry,
  emptyWorkbook,
  entryProgress,
  lastActivity,
  metricHints,
  useSession,
  useTracker,
  workbookProgress,
  type MonthEntry,
  type Participant,
  type Tracker,
} from "@/lib/tracker-store";
import { cn } from "@/lib/utils";

interface Props {
  role: "admin" | "mentor";
  /** Required for role "mentor": she only sees her own participants. */
  mentorId?: string;
}

type Tab = "progress" | "review" | "content" | "manage";

const STALE_DAYS = 7;

const hasContent = (e: MonthEntry) =>
  Object.values(e.milestones).some(Boolean) || Object.values(e.actuals).some((v) => v.trim() !== "");

const monthPct = (t: Tracker, participantId: string, n: number) => {
  const m = months.find((x) => x.number === n)!;
  return entryProgress(t.getEntry(participantId, n), m.milestones.map((x) => x.id), m.metrics.map((x) => x.id));
};

/** Program progress: approved months count fully, the open month by its fill rate. */
const programPct = (t: Tracker, p: Participant) => {
  let total = 0;
  for (let n = 1; n <= p.openMonth; n++) {
    const e = t.getEntry(p.id, n);
    total += e.status === "approved" ? 100 : monthPct(t, p.id, n) * 0.9;
  }
  return Math.round(total / months.length);
};

const daysSince = (d: Date | null) => (d ? Math.floor((Date.now() - d.getTime()) / 864e5) : null);
const relative = (days: number | null) =>
  days === null ? "עוד לא נכנסה" : days === 0 ? "היום" : days === 1 ? "אתמול" : `לפני ${days} ימים`;

export default function ReviewDashboard({ role, mentorId }: Props) {
  const tracker = useTracker();
  const { session, signOut } = useSession();
  const [tab, setTab] = useState<Tab>(role === "admin" ? "progress" : "review");
  const [mentorFilter, setMentorFilter] = useState<string>(role === "mentor" ? mentorId ?? "" : "all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"attention" | "progress" | "name">("attention");
  const [open, setOpen] = useState<{ participantId: string; month: number } | null>(null);
  const [view, setView] = useState<"map" | "workbook">("map");
  const [note, setNote] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const [contentMonth, setContentMonth] = useState(1);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMentor, setNewMentor] = useState(tracker.mentors[0]?.id ?? "");

  const scoped = tracker.participants.filter((p) => mentorFilter === "all" || p.mentorId === mentorFilter);
  const currentMonth = Math.max(1, ...tracker.participants.map((p) => p.openMonth));

  const rows = useMemo(() => {
    const q = query.trim();
    return scoped
      .filter((p) => !q || p.name.includes(q) || p.email.includes(q))
      .map((p) => {
        const e = tracker.getEntry(p.id, p.openMonth);
        const wb = workbookProgress(tracker.getWorkbookEntry(p.id, p.openMonth));
        const days = daysSince(lastActivity(tracker, p.id));
        const flags: { label: string; tone: "warning" | "gold" | "muted" }[] = [];
        if (e.status === "submitted") flags.push({ label: "ממתינה לאישור", tone: "gold" });
        if (e.status === "returned") flags.push({ label: "הוחזר להשלמה", tone: "warning" });
        if (days === null || days >= STALE_DAYS) flags.push({ label: days === null ? "לא התחילה" : `שקטה ${days} ימים`, tone: "warning" });
        if (!p.startingPoint) flags.push({ label: "בלי נקודת פתיחה", tone: "muted" });
        return { p, e, monthPct: monthPct(tracker, p.id, p.openMonth), wb, program: programPct(tracker, p), days, flags };
      })
      .sort((a, b) =>
        sort === "name"
          ? a.p.name.localeCompare(b.p.name, "he")
          : sort === "progress"
            ? b.program - a.program
            : b.flags.filter((f) => f.tone !== "muted").length - a.flags.filter((f) => f.tone !== "muted").length || a.program - b.program,
      );
  }, [scoped, tracker, query, sort]);

  const stats = [
    { label: "משתתפות", value: rows.length, Icon: Users },
    { label: "התקדמות ממוצעת", value: `${rows.length ? Math.round(rows.reduce((n, r) => n + r.program, 0) / rows.length) : 0}%`, Icon: BarChart3 },
    { label: "ממתינות לאישור", value: rows.filter((r) => r.e.status === "submitted").length, Icon: Clock },
    { label: "דורשות תשומת לב", value: rows.filter((r) => r.flags.some((f) => f.tone === "warning")).length, Icon: AlertTriangle },
  ];

  const openReview = (participantId: string, month: number, as: "map" | "workbook" = "map") => {
    setOpen({ participantId, month });
    setView(as);
    setNote(tracker.getEntry(participantId, month).mentorNote);
    setTab("review");
  };

  const openParticipant = open && tracker.participants.find((p) => p.id === open.participantId);
  const openMonth = open && months.find((m) => m.number === open.month);
  const openEntry = open && tracker.getEntry(open.participantId, open.month);
  const detailRow = detail ? rows.find((r) => r.p.id === detail) : null;

  const tabs: { id: Tab; label: string; Icon: typeof Users }[] = [
    { id: "progress", label: "התקדמות", Icon: BarChart3 },
    { id: "review", label: role === "admin" ? "אישורים" : "המשתתפות שלי", Icon: ListChecks },
    { id: "content", label: "כל חודשי התוכנית", Icon: Layers },
    ...(role === "admin" ? [{ id: "manage" as const, label: "ניהול", Icon: Settings2 }] : []),
  ];

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
                <BrandStar className="h-3.5 w-3.5 text-gold" />
                {programName}
              </p>
              <h1 className="mt-1 text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold">{role === "admin" ? "לוח הבקרה של התוכנית" : "המשתתפות שלי"}</h1>
              <p className="text-sm text-primary-foreground/75">שלום {session?.name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut />
              יציאה
            </Button>
          </div>
          <nav role="tablist" aria-label="אזורים" className="-mx-4 mt-5 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-bold transition-colors",
                  tab === id ? "bg-background text-primary" : "text-primary-foreground/80 hover:bg-primary-foreground/10",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {role === "admin" && tab !== "content" && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="סינון לפי מלווה">
            {[{ id: "all", name: "כל המלוות" }, ...tracker.mentors].map((m) => (
              <Button key={m.id} size="sm" variant={mentorFilter === m.id ? "default" : "outline"} aria-pressed={mentorFilter === m.id} onClick={() => setMentorFilter(m.id)} className="rounded-full">
                {m.name}
              </Button>
            ))}
          </div>
        )}

        {/* ---------------- Progress ---------------- */}
        {tab === "progress" && (
          <>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map(({ label, value, Icon }) => (
                <Card key={label} className="rounded-2xl">
                  <CardContent className="flex items-center gap-3 p-4 sm:p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="ltr-nums text-right text-2xl font-extrabold leading-none">{value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={cn("grid gap-4", detailRow && "lg:grid-cols-[1fr_380px]")}>
              <Card className="min-w-0 rounded-2xl">
                <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0">
                  <CardTitle>ההתקדמות של כל משתתפת</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                      <Input aria-label="חיפוש משתתפת" placeholder="חיפוש לפי שם או מייל" value={query} onChange={(e) => setQuery(e.target.value)} className="h-9 w-56 rounded-full pr-9" />
                    </div>
                    <select aria-label="מיון" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 rounded-full border border-input bg-card px-3 text-sm">
                      <option value="attention">קודם מי שצריכה תשומת לב</option>
                      <option value="progress">לפי התקדמות</option>
                      <option value="name">לפי שם</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-0 sm:p-0">
                  <ul className="divide-y">
                    {rows.map((r) => {
                      const mentor = tracker.mentors.find((m) => m.id === r.p.mentorId);
                      return (
                        <li key={r.p.id}>
                          <button
                            type="button"
                            onClick={() => setDetail(detail === r.p.id ? null : r.p.id)}
                            className={cn("grid w-full gap-3 px-4 py-4 text-right transition-colors hover:bg-secondary/50 sm:grid-cols-[1.4fr_1.6fr_1fr] sm:items-center sm:px-6", detail === r.p.id && "bg-secondary/70")}
                          >
                            <span className="min-w-0">
                              <span className="block font-bold">{r.p.name}</span>
                              <span className="block truncate text-xs text-muted-foreground">
                                {role === "admin" && mentor ? `${mentor.name} · ` : ""}חודש {r.p.openMonth} · {relative(r.days)}
                              </span>
                            </span>
                            <span className="space-y-1.5">
                              <span className="flex items-center gap-2">
                                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                                  <span className="block h-full rounded-full bg-gold transition-all" style={{ width: `${r.program}%` }} />
                                </span>
                                <span className="ltr-nums w-10 text-xs font-bold">{r.program}%</span>
                              </span>
                              <span className="flex gap-3 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <ListChecks className="h-3 w-3" aria-hidden />
                                  מפה <span className="ltr-nums font-semibold text-foreground">{r.monthPct}%</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" aria-hidden />
                                  מחברת <span className="ltr-nums font-semibold text-foreground">{r.wb}%</span>
                                </span>
                              </span>
                            </span>
                            <span className="flex flex-wrap gap-1 sm:justify-end">
                              {r.flags.length === 0 ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                                  בקצב
                                </span>
                              ) : (
                                r.flags.map((f) => (
                                  <span
                                    key={f.label}
                                    className={cn(
                                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                                      f.tone === "warning" && "bg-warning/15 text-destructive",
                                      f.tone === "gold" && "bg-gold-light text-accent-foreground",
                                      f.tone === "muted" && "bg-secondary text-muted-foreground",
                                    )}
                                  >
                                    {f.label}
                                  </span>
                                ))
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    {rows.length === 0 && <li className="p-8 text-center text-sm text-muted-foreground">לא נמצאו משתתפות</li>}
                  </ul>
                </CardContent>
              </Card>

              {detailRow && (
                <Card className="h-fit rounded-2xl lg:sticky lg:top-4">
                  <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
                    <div className="flex items-center gap-3">
                      <ProgressRing value={detailRow.program} size={56} />
                      <div>
                        <CardTitle>{detailRow.p.name}</CardTitle>
                        <CardDescription className="ltr-nums text-right">{detailRow.p.email}</CardDescription>
                        <CardDescription>{startingPoints.find((s) => s.id === detailRow.p.startingPoint)?.label ?? "נקודת פתיחה לא סומנה"}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="סגירה" onClick={() => setDetail(null)}>
                      <X />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ol className="space-y-2">
                      {months.map((m) => {
                        const Icon = monthIcons[m.number];
                        const locked = m.number > detailRow.p.openMonth;
                        const e = tracker.getEntry(detailRow.p.id, m.number);
                        const wb = workbookProgress(tracker.getWorkbookEntry(detailRow.p.id, m.number));
                        return (
                          <li key={m.number} className={cn("flex items-center gap-3 rounded-xl border p-2.5", locked && "border-dashed opacity-60")}>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                              {locked ? <Lock className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold">
                                {m.number}. {m.title}
                              </span>
                              <span className="flex gap-3 text-[11px] text-muted-foreground">
                                <span>
                                  מפה <span className="ltr-nums font-semibold">{monthPct(tracker, detailRow.p.id, m.number)}%</span>
                                </span>
                                <span>
                                  מחברת <span className="ltr-nums font-semibold">{wb}%</span>
                                </span>
                              </span>
                            </span>
                            {!locked && <StatusBadge status={e.status} short />}
                            <Button variant="ghost" size="sm" onClick={() => openReview(detailRow.p.id, m.number)}>
                              צפייה
                            </Button>
                          </li>
                        );
                      })}
                    </ol>
                    {(() => {
                      const h = metricHints(tracker.workbooks, detailRow.p.id);
                      const income = [...months].reverse().map((m) => tracker.getEntry(detailRow.p.id, m.number).actuals.income).find(Boolean);
                      return (
                        <dl className="grid grid-cols-3 gap-2 text-center">
                          {[
                            { k: "משתתפות בפיילוט", v: h.pilot_participants?.value ?? 0 },
                            { k: "עדויות באישור", v: h.testimonials_approved?.value ?? 0 },
                            { k: "הכנסה אחרונה", v: income ? `${income} ₪` : "–" },
                          ].map((x) => (
                            <div key={x.k} className="rounded-xl bg-secondary/60 p-2">
                              <dd className="ltr-nums text-lg font-extrabold">{x.v}</dd>
                              <dt className="text-[11px] text-muted-foreground">{x.k}</dt>
                            </div>
                          ))}
                        </dl>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}

        {/* ---------------- Review ---------------- */}
        {tab === "review" && (
          <>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>מפת המשתתפות</CardTitle>
                <CardDescription>לחיצה על חודש פותחת את מפת החודש ואת מחברת העבודה. למלוות ולמנהלת פתוחים כל החודשים.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-2 sm:px-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-sm">
                    <thead>
                      <tr className="border-y bg-secondary/60 text-xs text-secondary-foreground">
                        <th scope="col" className="px-4 py-2 text-right font-bold sm:px-6">משתתפת</th>
                        {months.map((m) => {
                          const Icon = monthIcons[m.number];
                          return (
                            <th key={m.number} scope="col" className="px-2 py-2 text-center font-bold">
                              <Icon className="mx-auto mb-1 h-4 w-4 text-gold-deep" aria-hidden />
                              <span className="block">חודש {m.number}</span>
                              <span className="block font-normal text-muted-foreground">{m.milestone}</span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {scoped.map((p) => {
                        const sp = startingPoints.find((s) => s.id === p.startingPoint);
                        const mentor = tracker.mentors.find((m) => m.id === p.mentorId);
                        return (
                          <tr key={p.id}>
                            <th scope="row" className="px-4 py-3 text-right font-normal sm:px-6">
                              <span className="block font-semibold">{p.name}</span>
                              <span className="block text-xs text-muted-foreground">
                                {role === "admin" && mentor ? `${mentor.name} · ` : ""}
                                {sp ? sp.label : "נקודת פתיחה לא סומנה"}
                              </span>
                            </th>
                            {months.map((m) => {
                              const locked = m.number > p.openMonth;
                              const e = tracker.getEntry(p.id, m.number);
                              const isOpen = open?.participantId === p.id && open.month === m.number;
                              return (
                                <td key={m.number} className="px-1.5 py-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => openReview(p.id, m.number)}
                                    title={locked ? "החודש עוד נעול למשתתפת" : undefined}
                                    className={cn(
                                      "flex w-full flex-col items-center gap-1 rounded-lg p-1.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                      isOpen && "bg-secondary ring-2 ring-primary",
                                    )}
                                  >
                                    {locked ? (
                                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <Lock className="h-3.5 w-3.5" aria-hidden />
                                        נעול לה
                                      </span>
                                    ) : (
                                      <StatusBadge status={e.status} short />
                                    )}
                                    {!locked && <span className="ltr-nums text-[11px] text-muted-foreground">{monthPct(tracker, p.id, m.number)}%</span>}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {openParticipant && openMonth && openEntry && (
              <section className="space-y-4" aria-label="צפייה ואישור">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-extrabold text-primary">
                    {openParticipant.name} · חודש {openMonth.number}
                    {openMonth.number > openParticipant.openMonth && <span className="mr-2 text-sm font-medium text-muted-foreground">(עוד נעול למשתתפת)</span>}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div role="tablist" className="flex gap-1 rounded-xl bg-secondary p-1">
                      {[
                        { id: "map" as const, label: "מפת החודש", Icon: ListChecks },
                        { id: "workbook" as const, label: "מחברת העבודה", Icon: BookOpen },
                      ].map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          role="tab"
                          aria-selected={view === id}
                          onClick={() => setView(id)}
                          className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold", view === id ? "bg-card text-primary shadow-sm" : "text-muted-foreground")}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          {label}
                        </button>
                      ))}
                    </div>
                    <Button variant="ghost" size="icon" aria-label="סגירה" onClick={() => setOpen(null)}>
                      <X />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
                  <div className="min-w-0">
                    {view === "map" ? (
                      <MonthForm month={openMonth} entry={{ ...openEntry, mentorNote: "" }} readOnly hints={metricHints(tracker.workbooks, openParticipant.id)} />
                    ) : (
                      <WorkbookView month={openMonth.number} entry={tracker.getWorkbookEntry(openParticipant.id, openMonth.number)} readOnly />
                    )}
                  </div>

                  <Card className="h-fit rounded-2xl lg:sticky lg:top-4">
                    <CardHeader>
                      <CardTitle>אישור המלווה</CardTitle>
                      <CardDescription>
                        {openEntry.status === "submitted"
                          ? "המשתתפת שלחה את החודש לאישור."
                          : openEntry.status === "approved"
                            ? "החודש כבר אושר. אפשר לעדכן הערה או להחזיר להשלמה."
                            : "המשתתפת עדיין לא שלחה. אפשר לאשר אחרי שיחת הסיכום גם בלי שליחה."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="mentor-note">הערה למשתתפת</Label>
                        <Textarea id="mentor-note" rows={4} placeholder="מה היה חזק החודש, ומה להשלים" value={note} onChange={(e) => setNote(e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => tracker.reviewEntry(openParticipant.id, openMonth.number, "approved", note)}>
                          <CheckCircle2 />
                          אישור החודש
                        </Button>
                        <Button variant="outline" onClick={() => tracker.reviewEntry(openParticipant.id, openMonth.number, "returned", note)}>
                          <Undo2 />
                          החזרה להשלמה
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}
          </>
        )}

        {/* ---------------- All program months ---------------- */}
        {tab === "content" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">כל ששת החודשים ומחברות העבודה, פתוחים לצפייה למלוות ולמנהלת בלבד. כך זה ייראה למשתתפות כשהחודש ייפתח.</p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {months.map((m) => {
                const Icon = monthIcons[m.number];
                return (
                  <Button key={m.number} variant={contentMonth === m.number ? "default" : "outline"} onClick={() => setContentMonth(m.number)} className="shrink-0 rounded-full">
                    <Icon />
                    {m.number}. {m.title}
                  </Button>
                );
              })}
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <MonthForm month={months[contentMonth - 1]} entry={emptyEntry("preview", contentMonth)} readOnly />
              <WorkbookView month={contentMonth} entry={emptyWorkbook("preview", contentMonth)} readOnly />
            </div>
          </div>
        )}

        {/* ---------------- Manage (admin) ---------------- */}
        {tab === "manage" && role === "admin" && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LockOpen className="h-5 w-5" aria-hidden />
                  פתיחת חודשים
                </CardTitle>
                <CardDescription>החודש הפתוח לקבוצה: {currentMonth}. אפשר גם לפתוח חודש למשתתפת אחת.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentMonth < months.length && (
                  <Button variant="gold" onClick={() => tracker.openMonthForAll(currentMonth + 1)}>
                    <LockOpen />
                    פתיחת חודש {currentMonth + 1} לכולן
                  </Button>
                )}
                <ul className="divide-y rounded-xl border">
                  {tracker.participants.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                      <span className="font-medium">{p.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">פתוח עד חודש {p.openMonth}</span>
                        {p.openMonth < months.length && (
                          <Button size="sm" variant="outline" onClick={() => tracker.setOpenMonth(p.id, p.openMonth + 1)}>
                            פתיחת {p.openMonth + 1}
                          </Button>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="h-fit rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" aria-hidden />
                  הוספת משתתפת
                </CardTitle>
                <CardDescription>היא תקבל הזמנה למייל ותוכל להיכנס עם Google או לבחור סיסמה.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newName.trim() || !newEmail.trim()) return;
                    tracker.addParticipant(newName.trim(), newEmail.trim(), newMentor);
                    setNewName("");
                    setNewEmail("");
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="new-name">שם המשתתפת</Label>
                    <Input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="new-email">מייל</Label>
                    <Input id="new-email" type="email" dir="ltr" className="text-right" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="new-mentor">מלווה</Label>
                    <select id="new-mentor" value={newMentor} onChange={(e) => setNewMentor(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
                      {tracker.mentors.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit">
                    <UserPlus />
                    הוספה
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "review" && !open && (
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CircleDashed className="h-4 w-4" aria-hidden />
            בחרי משתתפת וחודש בטבלה כדי לצפות ולאשר
          </p>
        )}
      </main>
    </div>
  );
}
````

## FILE: src/App.tsx
````tsx
import { RotateCcw } from "lucide-react";
import Login from "@/pages/Login";
import ParticipantRoadmap from "@/pages/ParticipantRoadmap";
import ReviewDashboard from "@/pages/ReviewDashboard";
import { useSession, useTracker } from "@/lib/tracker-store";

// In the real app each role lands on its own route after sign-in
// (/roadmap, /mentor, /admin). The preview bar does not exist there.
export default function App() {
  const { session } = useSession();
  const tracker = useTracker();

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 bg-foreground px-3 py-1.5 text-xs text-background">
        <span className="opacity-70">תצוגה מקדימה · גרסה ב׳ · הנתונים נשמרים רק בדפדפן הזה</span>
        <button type="button" onClick={tracker.resetDemo} className="inline-flex items-center gap-1 rounded-full px-3 py-0.5 opacity-70 hover:bg-background/10 hover:opacity-100">
          <RotateCcw className="h-3 w-3" aria-hidden />
          איפוס נתוני דוגמה
        </button>
      </div>
      {!session && <Login />}
      {session?.role === "participant" && session.participantId && <ParticipantRoadmap participantId={session.participantId} />}
      {session?.role === "mentor" && <ReviewDashboard role="mentor" mentorId={session.mentorId} />}
      {session?.role === "admin" && <ReviewDashboard role="admin" />}
    </>
  );
}
````

## FILE: README-LOVABLE.md
````md
# מפת הדרכים שלי | לצאת לעצמאות: מערכת מעקב

גרסה מקומית מוכנה לדחיפה ל-Lovable. `preview.html` היא תצוגה מקדימה בלבד
(הנתונים נשמרים בדפדפן). קוד ה-React שב-`src/` הוא מה שעולה ל-Lovable.

## תפקידים

| תפקיד | מה רואה | מה עושה |
| --- | --- | --- |
| משתתפת | המפה שלה בלבד | ממלאת את החודש הפתוח, מצרפת ראיות, שולחת לאישור |
| מלווה | המשתתפות שלה בלבד | צופה, כותבת הערה, מאשרת או מחזירה להשלמה |
| מנהלת התוכנית | כולן, עם סינון לפי מלווה | לוח התקדמות, פותחת חודשים, מוסיפה משתתפות |

מלוות ומנהלת התוכנית רואות את כל ששת החודשים ואת כל מחברות העבודה,
גם חודשים שעדיין נעולים למשתתפות (לשונית "כל חודשי התוכנית").

## מחברת עבודה לכל חודש

התוכן ב-`src/data/workbooks.ts`. כרגע יש מחברת לחודש 1 ("מתחילות לזוז").
חודש בלי מחברת מציג "תעלה כאן לפני המפגש". המלווה רואה את המחברת לקריאה.
רשימת ההזמנות ומשפטי הלקוחות מציעים מספרים למדדים של המפה (`metricHints`),
המשתתפת מאשרת את ההעברה בלחיצה.

## חשיפה הדרגתית

כל ששת החודשים מופיעים במבט העל (כותרת ויעד), אבל רק חודשים עד `open_month`
של המשתתפת ניתנים לפתיחה. מנהלת התוכנית מקדמת את `open_month`.

## סטטוסים

`draft` (בעבודה) → `submitted` (ממתין לאישור) → `approved` (אושר)
או `returned` (הוחזר להשלמה) → חזרה ל-`submitted`.
טופס ב-`submitted` או `approved` נעול לעריכה אצל המשתתפת.

## מבנה נתונים ל-Lovable Cloud

```sql
create type app_role as enum ('admin', 'mentor', 'participant');
create type entry_status as enum ('draft', 'submitted', 'returned', 'approved');

create table user_roles (
  user_id uuid references auth.users on delete cascade,
  role app_role not null,
  primary key (user_id, role)
);

create table mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users,
  name text not null
);

create table participants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users,
  email text not null unique,
  name text not null,
  mentor_id uuid references mentors,
  starting_point text check (starting_point in ('no_idea','few_directions','existing_idea','active_business')),
  open_month int not null default 1 check (open_month between 1 and 6),
  created_at timestamptz default now()
);

create table workbook_entries (
  participant_id uuid references participants on delete cascade,
  month int check (month between 1 and 6),
  answers jsonb not null default '{}',
  blanks jsonb not null default '{}',
  yes text[] not null default '{}',
  no text[] not null default '{}',
  invites jsonb not null default '[]',  -- [{name, why, when, status}]
  message text not null default '',
  quotes jsonb not null default '[]',   -- [{text, consent}]
  photos jsonb not null default '[]',   -- storage bucket "evidence"
  updated_at timestamptz default now(),
  primary key (participant_id, month)
);

create table month_entries (
  participant_id uuid references participants on delete cascade,
  month int check (month between 1 and 6),
  status entry_status not null default 'draft',
  milestones jsonb not null default '{}',
  actuals jsonb not null default '{}',
  personal_targets jsonb not null default '{}',
  evidence text not null default '',
  evidence_files jsonb not null default '[]', -- [{name, path}] in storage bucket "evidence"
  reflection jsonb not null default '{}',
  next_follow_up date,
  mentor_note text not null default '',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  updated_at timestamptz default now(),
  primary key (participant_id, month)
);
```

### הרשאות (RLS) — חובה

- משתתפת: קוראת וכותבת רק שורות שלה, רק כש-`month <= open_month`,
  ורק כשהסטטוס `draft` או `returned`. לא יכולה לשנות `status` ל-`approved`,
  לא את `mentor_note` ולא את `open_month`.
- מלווה: קוראת שורות של המשתתפות שלה, מעדכנת רק `status`
  (`approved`/`returned`), `mentor_note`, `reviewed_at`.
- מנהלת: הכול.
- תפקיד נבדק דרך פונקציית `has_role()` עם `security definer`, לא מטבלת
  הפרופיל ולא מהלקוח.
- באקט `evidence` פרטי. קבצים תחת `{participant_id}/{month}/`, עם אותן
  הרשאות קריאה כמו השורה.

### כניסה

שתי דרכים, ב-Lovable Cloud Auth:
- **Google** (OAuth) למשתתפות.
- **מייל וסיסמה** לכולן, כולל מלוות ומנהלת. מלוות ומנהלת נכנסות רק עם סיסמה.
  כולל "שכחתי סיסמה" במייל.

אין הרשמה פתוחה: רק מייל שמנהלת התוכנית הוסיפה יכול להיכנס. בכניסה הראשונה
`participants.user_id` מתמלא לפי המייל, ומי שהמייל שלה לא ברשימה מקבלת
הודעה לפנות למנהלת התוכנית.

`workbook_entries`: המשתתפת קוראת וכותבת את שלה, רק עד `open_month`.
מלווה קוראת את של המשתתפות שלה בלבד. מנהלת קוראת הכול.

## ניתוב

- `/` → מפנה לפי תפקיד
- `/roadmap` → `ParticipantRoadmap`
- `/mentor` → `ReviewDashboard role="mentor"`
- `/admin` → `ReviewDashboard role="admin"`

- `/login` → `Login`

בתצוגה המקדימה הכניסה מדומה: חשבונות `student`, `mentor`, `admin` עם
סיסמה 123456, וכפתור Google נכנס כמשתתפת לדוגמה. ב-Lovable כל זה מוחלף
ב-Auth אמיתי, והקופסה של חשבונות הדוגמה בדף הכניסה נמחקת.
````

