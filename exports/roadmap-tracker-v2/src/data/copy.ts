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
