import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, Paperclip, PartyPopper, Send, Target, Trophy, X } from "lucide-react";
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

export const MonthForm = ({ month, entry, readOnly, onChange, onSubmit }: Props) => {
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
