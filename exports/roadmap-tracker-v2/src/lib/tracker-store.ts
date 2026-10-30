// Data layer for the roadmap tracker.
//
// PREVIEW ONLY: this implementation keeps everything in localStorage so the
// design can be reviewed without a backend. In Lovable it is replaced by
// Lovable Cloud (Supabase) tables with the same shapes — see README-LOVABLE.md.
// Components only talk to `useTracker()`, so swapping the backend does not
// touch the UI.

import { useCallback, useEffect, useState } from "react";
import type { ReflectionId, StartingPointId } from "@/data/roadmap";

export type EntryStatus = "draft" | "submitted" | "returned" | "approved";

export interface Mentor {
  id: string;
  name: string;
}

export interface Participant {
  id: string;
  name: string;
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

interface TrackerState {
  mentors: Mentor[];
  participants: Participant[];
  entries: MonthEntry[];
}

const STORAGE_KEY = "roadmap-tracker-preview-v1";

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

// Placeholder demo data. Not real people.
const seed = (): TrackerState => {
  const now = new Date().toISOString();
  return {
    mentors: [
      { id: "mentor-1", name: "מלווה א׳" },
      { id: "mentor-2", name: "מלווה ב׳" },
    ],
    participants: [
      { id: "p1", name: "משתתפת לדוגמה 1", mentorId: "mentor-1", startingPoint: "few_directions", openMonth: 1 },
      { id: "p2", name: "משתתפת לדוגמה 2", mentorId: "mentor-1", startingPoint: "existing_idea", openMonth: 1 },
      { id: "p3", name: "משתתפת לדוגמה 3", mentorId: "mentor-1", startingPoint: null, openMonth: 1 },
      { id: "p4", name: "משתתפת לדוגמה 4", mentorId: "mentor-2", startingPoint: "active_business", openMonth: 1 },
      { id: "p5", name: "משתתפת לדוגמה 5", mentorId: "mentor-2", startingPoint: "no_idea", openMonth: 1 },
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
      },
      {
        ...emptyEntry("p1", 1),
        milestones: { m1a: true, m1b: true },
        actuals: { discovery_calls: "1" },
      },
    ],
  };
};

const load = (): TrackerState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TrackerState;
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

  return {
    ...snapshot,
    getEntry,
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
    addParticipant: (name: string, mentorId: string) => {
      const s = getState();
      const id = `p${Date.now()}`;
      const openMonth = Math.max(1, ...s.participants.map((p) => p.openMonth));
      commit({ ...s, participants: [...s.participants, { id, name, mentorId, startingPoint: null, openMonth }] });
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
