"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AlertCircle, ArrowLeft, Check, Loader2 } from "lucide-react";
import { BrandStar } from "@/components/ui/Wordmark";
import { partnerships } from "@/data/partnerships";

const { form } = partnerships;

export default function RegistrationForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setState("sending");

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          source: "partnerships-masterclass",
        }),
      });

      const payload = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(payload.error ?? "משהו השתבש. נסו שוב.");
        setState("idle");
        return;
      }

      setState("done");
    } catch {
      setError("לא הצלחנו להתחבר לשרת. בדקו את החיבור ונסו שוב.");
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <div
        // role="status" so the confirmation is announced when it replaces the
        // form — the submit button that had focus is gone by then.
        role="status"
        className="rounded-5xl border border-gold-dp/40 bg-gradient-to-t from-shell to-[#fdf3e2] px-8 py-14 text-center shadow-[0_26px_55px_-30px_rgba(138,100,40,0.55)] sm:px-12"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold-dp/45 bg-ivory text-gold-ink">
          <Check className="size-8" aria-hidden="true" />
        </span>

        <h3 className="mt-7 font-display text-2xl font-black text-gradient-gold-deep sm:text-3xl">
          {form.success.title}
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          {form.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-5xl card-light px-6 py-9 sm:px-10 sm:py-11"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="fullName"
          label="שם מלא"
          autoComplete="name"
          required
          className="sm:col-span-2"
        />
        <Field
          name="phone"
          label="טלפון"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          required
        />
        <Field
          name="email"
          label="אימייל"
          type="email"
          autoComplete="email"
          dir="ltr"
          required
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-coral-ink/35 bg-coral-ink/8 px-4 py-3 text-sm text-coral-ink"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-7 py-4.5 text-base font-black text-ink shadow-[0_16px_40px_-14px_rgba(138,100,40,0.55)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            {form.submitting}
          </>
        ) : (
          <>
            <BrandStar className="size-4" aria-hidden="true" />
            {form.submit}
            <ArrowLeft
              className="size-5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <p className="mt-5 text-center text-xs leading-relaxed text-ink-soft">
        {form.consent}{" "}
        <Link
          href="/legal/privacy"
          className="text-gold-ink underline-offset-4 hover:underline"
        >
          מדיניות הפרטיות
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  className = "",
  ...props
}: {
  label: string;
  name: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  // Scoped so the ids stay unique if the form is ever rendered twice on a page.
  const id = `${useId()}-${name}`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-soft">
        {label}
        {props.required && <span className="text-gold-ink"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        className="w-full rounded-2xl border border-ink/20 bg-ivory px-4 py-3.5 text-ink transition placeholder:text-ink-soft focus:border-gold-dp/70 focus:outline-none"
        {...props}
      />
    </div>
  );
}
