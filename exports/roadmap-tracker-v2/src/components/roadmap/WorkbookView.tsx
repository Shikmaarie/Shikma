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
