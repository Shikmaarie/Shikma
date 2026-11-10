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
