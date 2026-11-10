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
