"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Plus, Trash2, UserPlus } from "lucide-react";
import {
  GENDERS,
  GRADES,
  MAX_CHILDREN_PER_SUBMISSION,
  formatPhone,
  normalizePhone,
  type ChildInput,
} from "@/lib/registration-fields";

const DRAFT_KEY = "rishum-draft-v1";

type Errors = Record<string, string>;
type Status = "idle" | "saving" | "done";

const newChild = (school = ""): ChildInput => ({
  childName: "",
  gender: "",
  grade: "",
  school,
});

/** Each child card gets its own crayon colour, so siblings stay apart. */
const CARD_COLORS = [
  { chip: "bg-kid-lilac-lt text-kid-lilac", dot: "bg-kid-lilac" },
  { chip: "bg-kid-teal-lt text-kid-teal", dot: "bg-kid-teal" },
  { chip: "bg-kid-sun/25 text-kid-sun-dp", dot: "bg-kid-sun-dp" },
  { chip: "bg-kid-coral/15 text-kid-coral", dot: "bg-kid-coral" },
];

/** "א" → "כיתה א׳", "יא" → "כיתה י״א", "גן" stays as it is. */
function gradeLabel(grade: string): string {
  if (grade.length === 1) return `כיתה ${grade}׳`;
  if (grade.length === 2 && grade.startsWith("י")) {
    return `כיתה ${grade[0]}״${grade[1]}`;
  }
  return grade;
}

export default function RegistrationForm() {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [children, setChildren] = useState<ChildInput[]>([newChild()]);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [saved, setSaved] = useState<ChildInput[]>([]);
  const [restored, setRestored] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // A half-filled form survives a closed tab or a phone call mid-way.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as {
        parentName?: string;
        phone?: string;
        children?: ChildInput[];
      };
      if (draft.parentName) setParentName(draft.parentName);
      if (draft.phone) setPhone(draft.phone);
      if (Array.isArray(draft.children) && draft.children.length > 0) {
        setChildren(draft.children.map((c) => ({ ...newChild(), ...c })));
      }
      if (draft.parentName || draft.phone) setRestored(true);
    } catch {
      // A corrupt draft is not worth telling anyone about.
    }
  }, []);

  useEffect(() => {
    if (status === "done") return;
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ parentName, phone, children }),
      );
    } catch {
      // Private browsing — the form still works, it just won't remember.
    }
  }, [parentName, phone, children, status]);

  function updateChild(index: number, patch: Partial<ChildInput>) {
    setChildren((prev) =>
      prev.map((child, i) => (i === index ? { ...child, ...patch } : child)),
    );
    setErrors((prev) => {
      const next = { ...prev };
      for (const field of Object.keys(patch)) delete next[`${index}.${field}`];
      return next;
    });
  }

  function addChild() {
    // Siblings almost always share a school — carry it over.
    const lastSchool = children[children.length - 1]?.school ?? "";
    setChildren((prev) => [...prev, newChild(lastSchool)]);
  }

  function removeChild(index: number) {
    setChildren((prev) => prev.filter((_, i) => i !== index));
    setErrors({});
  }

  function validate(): Errors {
    const found: Errors = {};
    if (parentName.trim().length < 2) {
      found.parentName = "יש למלא את שם ההורה";
    }
    if (!normalizePhone(phone)) {
      found.phone = "מספר טלפון לא תקין — לדוגמה 050-1234567";
    }
    children.forEach((child, i) => {
      const name = child.childName.trim();
      if (name.length < 2) {
        found[`${i}.childName`] = "יש למלא שם";
      } else if (!name.includes(" ")) {
        found[`${i}.childName`] = "יש לכתוב שם פרטי ושם משפחה";
      }
      if (!child.gender) found[`${i}.gender`] = "יש לבחור";
      if (!child.grade) found[`${i}.grade`] = "יש לבחור";
      if (child.school.trim().length < 2) {
        found[`${i}.school`] = "יש למלא שם גן או בית ספר";
      }
    });
    return found;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']",
      );
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("saving");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentName, phone, children, website }),
      });
      const body = (await response.json()) as {
        error?: string;
        saved?: number;
      };
      if (!response.ok) {
        setStatus("idle");
        setFormError(body.error ?? "משהו השתבש. נסו שוב בעוד רגע.");
        return;
      }
      setSaved(children);
      setStatus("done");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Nothing to clean up.
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("idle");
      setFormError("אין חיבור לאינטרנט כרגע. נסו שוב בעוד רגע.");
    }
  }

  function startOver() {
    setParentName("");
    setPhone("");
    setChildren([newChild()]);
    setErrors({});
    setFormError("");
    setSaved([]);
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-kid-card p-8 text-center shadow-[0_18px_40px_-24px_rgba(43,42,74,0.35)] sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-kid-mint/15">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kid-mint text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
        </div>
        <h2 className="mt-6 font-display text-3xl font-black text-kid-ink">
          הפרטים נשמרו. תודה!
        </h2>
        <p className="mt-3 text-kid-ink-soft">
          נרשמו {saved.length === 1 ? "ילד/ה אחד/ת" : `${saved.length} ילדים`}:
        </p>
        <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2">
          {saved.map((child, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-2xl bg-kid-bg px-4 py-3 text-right text-sm text-kid-ink"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  CARD_COLORS[i % CARD_COLORS.length].dot
                }`}
              />
              <span className="font-bold">{child.childName}</span>
              <span className="text-kid-ink-soft">
                {gradeLabel(child.grade)} · {child.school}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={startOver}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-kid-teal-lt px-6 py-3 font-bold text-kid-teal transition hover:brightness-95"
        >
          <UserPlus className="h-4 w-4" />
          רישום משפחה נוספת
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {restored && (
        <p className="rounded-2xl bg-kid-mint/12 px-4 py-3 text-sm font-bold text-kid-mint">
          השלמנו את הפרטים שהתחלתם למלא קודם.
        </p>
      )}

      {/* Parent — filled once, applies to every child below. */}
      <section className="rounded-[2rem] bg-kid-card p-5 shadow-[0_18px_40px_-28px_rgba(43,42,74,0.35)] sm:p-7">
        <h2 className="mb-5 inline-flex items-center gap-2 rounded-full bg-kid-sun/20 px-4 py-1.5 font-display text-lg font-black text-kid-sun-dp">
          פרטי ההורה
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="parentName"
            label="שם אחד ההורים"
            value={parentName}
            error={errors.parentName}
            autoComplete="name"
            placeholder="שם פרטי ומשפחה"
            onChange={(value) => {
              setParentName(value);
              setErrors((prev) => ({ ...prev, parentName: "" }));
            }}
          />
          <Field
            id="phone"
            label="טלפון ההורה"
            value={phone}
            error={errors.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="050-1234567"
            hint={
              normalizePhone(phone) && normalizePhone(phone) !== phone
                ? formatPhone(normalizePhone(phone))
                : undefined
            }
            onChange={(value) => {
              setPhone(value);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
          />
        </div>
      </section>

      {/* Children — one card per child, one row per child in the sheet. */}
      {children.map((child, index) => {
        const color = CARD_COLORS[index % CARD_COLORS.length];
        return (
          <section
            key={index}
            className="rounded-[2rem] bg-kid-card p-5 shadow-[0_18px_40px_-28px_rgba(43,42,74,0.35)] sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-lg font-black ${color.chip}`}
              >
                {children.length === 1 ? "פרטי הילד/ה" : `ילד/ה ${index + 1}`}
              </h2>
              {children.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChild(index)}
                  aria-label={`הסרת ילד/ה ${index + 1}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-kid-coral transition hover:bg-kid-coral/10"
                >
                  <Trash2 className="h-4 w-4" />
                  הסרה
                </button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id={`child-${index}-name`}
                label="שם ושם משפחה של הילד/ה"
                value={child.childName}
                error={errors[`${index}.childName`]}
                placeholder="שם פרטי ומשפחה"
                onChange={(value) => updateChild(index, { childName: value })}
              />

              <div>
                <span className="mb-2 block text-sm font-bold text-kid-ink">
                  מין
                </span>
                <div className="flex gap-2">
                  {GENDERS.map((gender) => {
                    const active = child.gender === gender;
                    return (
                      <button
                        key={gender}
                        type="button"
                        aria-pressed={active}
                        aria-invalid={Boolean(errors[`${index}.gender`])}
                        onClick={() => updateChild(index, { gender })}
                        className={`flex-1 rounded-2xl border-2 px-4 py-3 font-bold transition ${
                          active
                            ? "border-kid-teal bg-kid-teal text-white"
                            : "border-kid-line bg-kid-card text-kid-ink hover:border-kid-teal/50"
                        }`}
                      >
                        {gender}
                      </button>
                    );
                  })}
                </div>
                <FieldError message={errors[`${index}.gender`]} />
              </div>

              <div>
                <label
                  htmlFor={`child-${index}-grade`}
                  className="mb-2 block text-sm font-bold text-kid-ink"
                >
                  כיתה
                </label>
                <select
                  id={`child-${index}-grade`}
                  value={child.grade}
                  aria-invalid={Boolean(errors[`${index}.grade`])}
                  onChange={(e) => updateChild(index, { grade: e.target.value })}
                  className={`w-full rounded-2xl border-2 bg-kid-card px-4 py-3 text-kid-ink outline-none transition ${
                    errors[`${index}.grade`]
                      ? "border-kid-coral"
                      : "border-kid-line focus:border-kid-teal"
                  }`}
                >
                  <option value="">בחרו כיתה…</option>
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {gradeLabel(grade)}
                    </option>
                  ))}
                </select>
                <FieldError message={errors[`${index}.grade`]} />
              </div>

              <Field
                id={`child-${index}-school`}
                label="שם הגן או בית הספר"
                value={child.school}
                error={errors[`${index}.school`]}
                placeholder="לדוגמה: בית ספר יסודי הדקל"
                onChange={(value) => updateChild(index, { school: value })}
              />
            </div>
          </section>
        );
      })}

      {children.length < MAX_CHILDREN_PER_SUBMISSION && (
        <button
          type="button"
          onClick={addChild}
          className="flex w-full items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-kid-lilac/50 bg-kid-lilac-lt/50 px-6 py-5 font-black text-kid-lilac transition hover:border-kid-lilac hover:bg-kid-lilac-lt"
        >
          <Plus className="h-5 w-5" />
          הוספת ילד/ה נוסף/ת
        </button>
      )}

      {/* Bots fill this in; parents never see it. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">אתר</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div aria-live="polite">
        {formError && (
          <p className="rounded-2xl bg-kid-coral/12 px-4 py-3 text-center font-bold text-kid-coral">
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-kid-sun-dp via-kid-sun to-kid-sun-dp px-8 py-4 text-lg font-black text-kid-ink shadow-[0_12px_26px_-14px_rgba(255,162,43,0.9)] transition hover:brightness-105 disabled:opacity-60"
      >
        {status === "saving" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            שומרים…
          </>
        ) : (
          "שליחת הפרטים"
        )}
      </button>

      <p className="text-center text-xs text-kid-ink-soft">
        הפרטים נשמרים לצורך הרישום בלבד ולא מועברים לגורם שלישי.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  error,
  hint,
  onChange,
  ...input
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  onChange: (value: string) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange"
>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-kid-ink">
        {label}
      </label>
      <input
        {...input}
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border-2 bg-kid-card px-4 py-3 text-kid-ink outline-none transition placeholder:text-kid-ink-soft/50 ${
          error ? "border-kid-coral" : "border-kid-line focus:border-kid-teal"
        }`}
      />
      {hint && !error && (
        <p className="ltr-nums mt-1.5 text-right text-xs font-bold text-kid-teal">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-bold text-kid-coral">
      {message}
    </p>
  );
}
