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
