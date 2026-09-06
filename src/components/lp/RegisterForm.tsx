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
        className="rounded-4xl border border-gold-ink/30 bg-white p-9 text-center shadow-[0_30px_60px_-45px_rgba(3,61,75,0.55)]"
      >
        <span
          className="mx-auto grid size-14 place-items-center rounded-full bg-mist text-ink"
          aria-hidden="true"
        >
          <Check className="size-7" />
        </span>
        <h3 className="mt-6 text-3xl font-black text-ink">
          {register.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-2">
          {register.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl border border-gold-ink/25 bg-white p-7 shadow-[0_30px_60px_-45px_rgba(3,61,75,0.55)] sm:p-9"
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
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-flame/50 bg-flame/10 px-4 py-3 text-sm text-flame-dp"
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
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-bold text-paper shadow-[0_18px_36px_-20px_rgba(3,61,75,0.95)] transition hover:bg-flame-dp disabled:cursor-not-allowed disabled:opacity-60"
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

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-2/80">
        {register.fine}{" "}
        <Link href="/legal/privacy" className="text-flame-dp hover:underline">
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
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {props.required && <span className="text-flame-dp"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        className="w-full rounded-2xl border border-ink/15 bg-paper-2/60 px-4 py-3 text-ink placeholder:text-ink-2/50 transition focus:border-ink/50 focus:bg-white focus:outline-none"
        {...props}
      />
    </div>
  );
}
