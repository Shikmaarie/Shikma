import { useRef } from "react";
import { FileText, Paperclip, Send, Sparkles, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { evidencePrompt, reflectionFields, type RoadmapMonth } from "@/data/roadmap";
import { entryProgress, type MonthEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface Props {
  month: RoadmapMonth;
  entry: MonthEntry;
  readOnly?: boolean;
  onChange?: (patch: Partial<MonthEntry>) => void;
  onSubmit?: () => void;
}

const SectionTitle = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <h4 className="flex items-center gap-2 text-base font-bold text-primary">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-light text-xs text-accent-foreground">{n}</span>
    {children}
  </h4>
);

export const MonthForm = ({ month, entry, readOnly, onChange, onSubmit }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const locked = readOnly || entry.status === "submitted" || entry.status === "approved";
  const set = (patch: Partial<MonthEntry>) => !locked && onChange?.(patch);

  const progress = entryProgress(
    entry,
    month.milestones.map((m) => m.id),
    month.metrics.map((m) => m.id),
  );
  const checked = month.milestones.filter((m) => entry.milestones[m.id]).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-3 border-b bg-secondary/50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gold-deep">חודש {month.number}</p>
            <CardTitle className="font-display text-2xl sm:text-3xl">{month.title}</CardTitle>
          </div>
          <StatusBadge status={entry.status} />
        </div>
        <CardDescription className="flex items-start gap-2 text-base text-foreground">
          <Target className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
          <span>
            <span className="font-semibold">הישג רצוי: </span>
            {month.desiredOutcome}
          </span>
        </CardDescription>
        <div className="flex items-center gap-3">
          <Progress value={progress} className="flex-1" />
          <span className="ltr-nums text-sm font-semibold text-muted-foreground">{progress}%</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-6 sm:pt-6">
        {entry.mentorNote && (
          <div
            className={cn(
              "rounded-md border-r-4 p-4 text-sm",
              entry.status === "returned" ? "border-warning bg-warning/10" : "border-success bg-success/10",
            )}
          >
            <p className="mb-1 font-bold">הערת המלווה</p>
            <p className="whitespace-pre-line">{entry.mentorNote}</p>
          </div>
        )}

        {/* 1. Milestones */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <SectionTitle n={1}>אבני דרך לסימון</SectionTitle>
            <span className="ltr-nums text-sm text-muted-foreground">
              {checked}/{month.milestones.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">מסמנות וי רק על פעולה שבוצעה בפועל.</p>
          <ul className="space-y-2">
            {month.milestones.map((m) => {
              const id = `ms-${month.number}-${m.id}`;
              const on = !!entry.milestones[m.id];
              return (
                <li key={m.id}>
                  <label
                    htmlFor={id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                      on ? "border-primary/40 bg-primary/5" : "bg-card hover:bg-secondary/50",
                      locked && "cursor-default",
                    )}
                  >
                    <Checkbox
                      id={id}
                      checked={on}
                      disabled={locked}
                      onCheckedChange={(v) => set({ milestones: { ...entry.milestones, [m.id]: v } })}
                      className="mt-0.5"
                    />
                    <span className={cn("text-sm leading-relaxed sm:text-base", on && "font-medium")}>{m.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 2. Metrics */}
        <section className="space-y-3">
          <SectionTitle n={2}>לוח מדדים חודשי</SectionTitle>
          <div className="overflow-hidden rounded-md border">
            <div className="hidden grid-cols-[2fr_1.2fr_1fr] gap-3 bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground sm:grid">
              <span>מדד</span>
              <span>{month.targetColumnLabel}</span>
              <span>בפועל</span>
            </div>
            <ul className="divide-y">
              {month.metrics.map((metric) => {
                const actualId = `act-${month.number}-${metric.id}`;
                return (
                  <li key={metric.id} className="grid grid-cols-2 items-center gap-x-3 gap-y-2 px-4 py-3 sm:grid-cols-[2fr_1.2fr_1fr]">
                    <Label htmlFor={actualId} className="col-span-2 font-semibold sm:col-span-1">
                      {metric.label}
                    </Label>
                    <div className="text-sm">
                      <span className="block text-xs text-muted-foreground sm:hidden">{month.targetColumnLabel}</span>
                      {metric.target.kind === "personal" ? (
                        <Input
                          aria-label={`יעד אישי: ${metric.label}`}
                          inputMode="numeric"
                          placeholder={metric.currency ? "יעד אישי ₪" : "יעד אישי"}
                          value={entry.personalTargets[metric.id] ?? ""}
                          disabled={locked}
                          onChange={(e) => set({ personalTargets: { ...entry.personalTargets, [metric.id]: e.target.value } })}
                          className="h-9"
                        />
                      ) : (
                        <span className={cn("font-medium", metric.target.kind === "program" && "text-gold-deep")}>{metric.target.label}</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground sm:hidden">בפועל</span>
                      <div className="relative">
                        <Input
                          id={actualId}
                          inputMode="numeric"
                          placeholder="0"
                          value={entry.actuals[metric.id] ?? ""}
                          disabled={locked}
                          onChange={(e) => set({ actuals: { ...entry.actuals, [metric.id]: e.target.value } })}
                          className={cn("h-9 font-semibold", metric.currency && "pl-8")}
                        />
                        {metric.currency && (
                          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">₪</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 3. Evidence */}
        <section className="space-y-3">
          <SectionTitle n={3}>ראיות להצלחה</SectionTitle>
          <Label htmlFor={`ev-${month.number}`} className="block text-muted-foreground">
            {evidencePrompt}
          </Label>
          <Textarea
            id={`ev-${month.number}`}
            rows={3}
            placeholder="הדביקי קישור או תארי בקצרה מה מתועד"
            value={entry.evidence}
            disabled={locked}
            onChange={(e) => set({ evidence: e.target.value })}
          />
          <div className="flex flex-wrap items-center gap-2">
            {entry.evidenceFiles.map((f, i) => (
              <span key={`${f.name}-${i}`} className="inline-flex items-center gap-1.5 rounded-full border bg-secondary px-3 py-1 text-xs">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                <span className="max-w-[12rem] truncate">{f.name}</span>
                {!locked && (
                  <button
                    type="button"
                    aria-label={`הסרת ${f.name}`}
                    onClick={() => set({ evidenceFiles: entry.evidenceFiles.filter((_, j) => j !== i) })}
                    className="rounded-full p-0.5 hover:bg-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
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
                <Button type="button" variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
                  <Paperclip />
                  צירוף צילום מסך או קובץ
                </Button>
              </>
            )}
          </div>
        </section>

        {/* 4. Summary conversation */}
        <section className="space-y-4 rounded-lg bg-secondary/50 p-4 sm:p-5">
          <SectionTitle n={4}>שיחת סיכום עם המלווה</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {reflectionFields.map((f, i) => (
              <div key={f.id} className={cn("space-y-1.5", i === 0 && "md:col-span-2")}>
                <Label htmlFor={`rf-${month.number}-${f.id}`} className="flex items-center gap-1.5">
                  {f.id === "win" && <Sparkles className="h-4 w-4 text-gold-deep" aria-hidden />}
                  {f.label}
                </Label>
                <Textarea
                  id={`rf-${month.number}-${f.id}`}
                  rows={2}
                  value={entry.reflection[f.id] ?? ""}
                  disabled={locked}
                  onChange={(e) => set({ reflection: { ...entry.reflection, [f.id]: e.target.value } })}
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor={`fu-${month.number}`}>תאריך המעקב הבא</Label>
              <Input
                id={`fu-${month.number}`}
                type="date"
                value={entry.nextFollowUp}
                disabled={locked}
                onChange={(e) => set({ nextFollowUp: e.target.value })}
              />
            </div>
          </div>
        </section>

        {!readOnly && (
          <footer className="flex flex-col-reverse items-stretch gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {locked
                ? entry.status === "approved"
                  ? "החודש אושר על ידי המלווה. כל הכבוד!"
                  : "נשלח למלווה. אפשר לעבור על זה יחד בשיחת הסיכום."
                : "הכול נשמר אוטומטית. שולחות למלווה כשמוכנות לשיחת הסיכום."}
            </p>
            {!locked && (
              <Button size="lg" onClick={onSubmit}>
                <Send />
                שליחה לאישור המלווה
              </Button>
            )}
          </footer>
        )}
      </CardContent>
    </Card>
  );
};
