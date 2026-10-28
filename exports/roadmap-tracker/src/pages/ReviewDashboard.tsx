import { useState } from "react";
import { CheckCircle2, CircleDashed, Clock, Lock, LockOpen, Undo2, UserPlus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { MonthForm } from "@/components/roadmap/MonthForm";
import { StatusBadge } from "@/components/roadmap/StatusBadge";
import { months, programName, startingPoints } from "@/data/roadmap";
import { entryProgress, useTracker, type MonthEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";

interface Props {
  role: "admin" | "mentor";
  /** Required for role "mentor": she only sees her own participants. */
  mentorId?: string;
}

const hasContent = (e: MonthEntry) =>
  Object.values(e.milestones).some(Boolean) || Object.values(e.actuals).some((v) => v.trim() !== "");

export default function ReviewDashboard({ role, mentorId }: Props) {
  const tracker = useTracker();
  const [mentorFilter, setMentorFilter] = useState<string>(role === "mentor" ? mentorId ?? "" : "all");
  const [open, setOpen] = useState<{ participantId: string; month: number } | null>(null);
  const [note, setNote] = useState("");
  const [newName, setNewName] = useState("");
  const [newMentor, setNewMentor] = useState(tracker.mentors[0]?.id ?? "");

  const participants = tracker.participants.filter((p) => mentorFilter === "all" || p.mentorId === mentorFilter);
  const currentMonth = Math.max(1, ...tracker.participants.map((p) => p.openMonth));
  // Each participant is measured on the month currently open for her
  const currentEntries = participants.map((p) => tracker.getEntry(p.id, p.openMonth));
  const stats = [
    { label: "משתתפות", value: participants.length, Icon: Users },
    { label: "ממתינות לאישור", value: currentEntries.filter((e) => e.status === "submitted").length, Icon: Clock },
    { label: "אישרו את החודש הנוכחי", value: currentEntries.filter((e) => e.status === "approved").length, Icon: CheckCircle2 },
    { label: "עוד לא התחילו", value: currentEntries.filter((e) => e.status === "draft" && !hasContent(e)).length, Icon: CircleDashed },
  ];

  const openParticipant = open && tracker.participants.find((p) => p.id === open.participantId);
  const openMonth = open && months.find((m) => m.number === open.month);
  const openEntry = open && tracker.getEntry(open.participantId, open.month);

  const select = (participantId: string, month: number) => {
    setOpen({ participantId, month });
    setNote(tracker.getEntry(participantId, month).mentorNote);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-6 sm:px-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
              <BrandStar className="h-3.5 w-3.5 text-gold" />
              {programName}
            </p>
            <h1 className="mt-1 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold">
              {role === "admin" ? "לוח מעקב התוכנית" : "המשתתפות שלי"}
            </h1>
          </div>
          {role === "admin" && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-primary-foreground/80">החודש הפתוח לקבוצה: {currentMonth}</span>
              {currentMonth < months.length && (
                <Button variant="gold" onClick={() => tracker.openMonthForAll(currentMonth + 1)}>
                  <LockOpen />
                  פתיחת חודש {currentMonth + 1} לכולן
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 pt-5 sm:pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="ltr-nums text-right font-display text-2xl font-bold leading-none">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle>מפת המשתתפות</CardTitle>
              <CardDescription>לחיצה על חודש פותחת את הטופס לצפייה ולאישור</CardDescription>
            </div>
            {role === "admin" && (
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="סינון לפי מלווה">
                {[{ id: "all", name: "כל המלוות" }, ...tracker.mentors].map((m) => (
                  <Button
                    key={m.id}
                    size="sm"
                    variant={mentorFilter === m.id ? "default" : "outline"}
                    role="tab"
                    aria-selected={mentorFilter === m.id}
                    onClick={() => setMentorFilter(m.id)}
                  >
                    {m.name}
                  </Button>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="px-0 pb-2 sm:px-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-y bg-secondary/60 text-xs text-secondary-foreground">
                    <th scope="col" className="px-4 py-2 text-right font-bold sm:px-6">משתתפת</th>
                    {months.map((m) => (
                      <th key={m.number} scope="col" className="px-2 py-2 text-center font-bold">
                        <span className="block">חודש {m.number}</span>
                        <span className="block font-normal text-muted-foreground">{m.milestone}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {participants.map((p) => {
                    const mentor = tracker.mentors.find((m) => m.id === p.mentorId);
                    const sp = startingPoints.find((s) => s.id === p.startingPoint);
                    return (
                      <tr key={p.id} className="align-middle">
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
                          const pct = entryProgress(e, m.milestones.map((x) => x.id), m.metrics.map((x) => x.id));
                          const isOpen = open?.participantId === p.id && open.month === m.number;
                          return (
                            <td key={m.number} className="px-1.5 py-2 text-center">
                              {locked ? (
                                role === "admin" && m.number === p.openMonth + 1 ? (
                                  <button
                                    type="button"
                                    onClick={() => tracker.setOpenMonth(p.id, m.number)}
                                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    title="פתיחת החודש למשתתפת הזו בלבד"
                                  >
                                    <Lock className="h-3.5 w-3.5" aria-hidden />
                                    פתיחה
                                  </button>
                                ) : (
                                  <Lock className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="נעול" />
                                )
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => select(p.id, m.number)}
                                  className={cn(
                                    "flex w-full flex-col items-center gap-1 rounded-md p-1.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    isOpen && "bg-secondary ring-2 ring-primary",
                                  )}
                                >
                                  <StatusBadge status={e.status} short />
                                  <span className="ltr-nums text-[11px] text-muted-foreground">{pct}%</span>
                                </button>
                              )}
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
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-primary">
                {openParticipant.name} · חודש {openMonth.number}
              </h2>
              <Button variant="ghost" size="icon" aria-label="סגירה" onClick={() => setOpen(null)}>
                <X />
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
              <MonthForm month={openMonth} entry={{ ...openEntry, mentorNote: "" }} readOnly />

              <Card className="h-fit lg:sticky lg:top-4">
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
                    <Textarea
                      id="mentor-note"
                      rows={4}
                      placeholder="מה היה חזק החודש, ומה להשלים"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
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

        {role === "admin" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" aria-hidden />
                הוספת משתתפת
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="flex flex-col gap-3 sm:flex-row sm:items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newName.trim()) return;
                  tracker.addParticipant(newName.trim(), newMentor);
                  setNewName("");
                }}
              >
                <div className="flex-1 space-y-1.5">
                  <Label htmlFor="new-name">שם המשתתפת</Label>
                  <Input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-mentor">מלווה</Label>
                  <select
                    id="new-mentor"
                    value={newMentor}
                    onChange={(e) => setNewMentor(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm sm:w-48"
                  >
                    {tracker.mentors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit">הוספה</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
