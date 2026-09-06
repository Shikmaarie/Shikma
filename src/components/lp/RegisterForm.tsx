"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { moneyFearLanding } from "@/data/landing";
import { site } from "@/data/site";

export default function RegisterForm() {
  const { register, cta, slug } = moneyFearLanding;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          event: slug,
        }),
      });

      const payload = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !payload.ok) {
        setError(payload.error ?? "משהו השתבש. נסו שוב.");
        setSubmitting(false);
        return;
      }

      setDone(true);
    } catch {
      setError("לא הצלחנו להתחבר לשרת. בדקו את החיבור ונסו שוב.");
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        role="status"
        className="rounded-4xl border border-gold/30 bg-void/50 p-9 text-center"
      >
        <span
          className="mx-auto grid size-14 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-lt"
          aria-hidden="true"
        >
          <Check className="size-7" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-black text-gradient-gold">
          {register.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-cream/70">
          {register.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl border border-gold/25 bg-void/50 p-7 backdrop-blur-md sm:p-9"
    >
      <div className="grid gap-5">
        <Field name="fullName" label="שם מלא" autoComplete="name" required />
        <Field
          name="email"
          label="אימייל"
          type="email"
          autoComplete="email"
          dir="ltr"
          required
        />
        <Field
          name="phone"
          label="טלפון"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          dir="ltr"
          required
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            {error}{" "}
            <a
              href={`mailto:${site.email}`}
              className="ltr-nums underline underline-offset-4"
            >
              {site.email}
            </a>
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 text-base font-bold text-void shadow-[0_10px_45px_-12px_rgba(212,169,95,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            רושמים אתכם…
          </>
        ) : (
          cta.label
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-cream/45">
        {register.fine}{" "}
        <Link href="/legal/privacy" className="text-gold-lt hover:underline">
          מדיניות הפרטיות
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  ...props
}: {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-cream/75"
      >
        {label}
        {props.required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        className="w-full rounded-2xl border border-gold/20 bg-void/60 px-4 py-3 text-cream placeholder:text-cream/30 transition focus:border-gold/60 focus:outline-none"
        {...props}
      />
    </div>
  );
}
