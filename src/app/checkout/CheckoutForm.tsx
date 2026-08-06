"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Lock, ShieldCheck } from "lucide-react";
import { resolveCart, useCart } from "@/lib/cart";
import { formatILS } from "@/data/products";

export default function CheckoutForm() {
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cart lives in localStorage, so nothing renders until after hydration.
  useEffect(() => setMounted(true), []);

  const { lines, subtotal, maxPayments } = resolveCart(items);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
          customer: {
            fullName: data.get("fullName"),
            email: data.get("email"),
            phone: data.get("phone"),
            idNumber: data.get("idNumber"),
          },
        }),
      });

      const payload = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !payload.url) {
        setError(payload.error ?? "משהו השתבש. נסו שוב.");
        setSubmitting(false);
        return;
      }

      // Hand off to Cardcom's hosted page. The cart is cleared on the success
      // page, so an abandoned payment still comes back to a full cart.
      window.location.href = payload.url;
    } catch {
      setError("לא הצלחנו להתחבר לשרת. בדקו את החיבור ונסו שוב.");
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gold" aria-hidden="true" />
        <span className="sr-only">טוען את העגלה…</span>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-4xl glass px-8 py-20 text-center">
        <p className="text-lg text-mist/65">העגלה שלך ריקה.</p>
        <Link
          href="/store"
          className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void"
        >
          לגלישה בחנות
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <form onSubmit={handleSubmit} className="rounded-4xl glass p-7 sm:p-9">
        <h2 className="font-display text-2xl font-bold text-mist">הפרטים שלך</h2>
        <p className="mt-2 text-sm text-mist/55">
          נשתמש בהם להנפקת החשבונית ולשליחת הגישה.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field
            name="fullName"
            label="שם מלא"
            autoComplete="name"
            required
            className="sm:col-span-2"
          />
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
            dir="ltr"
            required
          />
          <Field
            name="idNumber"
            label="תעודת זהות (לחשבונית)"
            dir="ltr"
            inputMode="numeric"
            className="sm:col-span-2"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 text-base font-bold text-void transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              מעבירים לעמוד התשלום…
            </>
          ) : (
            <>
              <Lock className="size-4" aria-hidden="true" />
              המשך לתשלום מאובטח
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-mist/45">
          בלחיצה על הכפתור תועברו לעמוד הסליקה המאובטח של קארדקום. בביצוע
          ההזמנה אתם מאשרים את{" "}
          <Link href="/legal/terms" className="text-gold-lt hover:underline">
            התקנון ותנאי השימוש
          </Link>
          .
        </p>
      </form>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-4xl glass p-7 sm:p-8">
          <h2 className="font-display text-xl font-bold text-mist">סיכום ההזמנה</h2>

          <ul className="mt-6 flex flex-col gap-4">
            {lines.map(({ product, quantity }) => (
              <li
                key={product.slug}
                className="flex items-start justify-between gap-4 border-b border-gold/10 pb-4 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-mist">{product.name}</p>
                  <p className="ltr-nums mt-1 text-xs text-mist/45">
                    כמות: {quantity}
                  </p>
                </div>
                <span className="ltr-nums shrink-0 font-bold text-gold-lt">
                  {formatILS(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-baseline justify-between border-t border-gold/15 pt-5">
            <span className="text-sm text-mist/60">סה״כ לתשלום</span>
            <span className="ltr-nums font-display text-3xl font-black text-gradient-gold">
              {formatILS(subtotal)}
            </span>
          </div>
          <p className="mt-1 text-left text-xs text-mist/45">כולל מע״מ</p>

          {maxPayments > 1 && (
            <p className="ltr-nums mt-4 rounded-2xl border border-gold/20 bg-void/40 px-4 py-3 text-xs leading-relaxed text-mist/60">
              ניתן לפרוס עד {maxPayments} תשלומים. את מספר התשלומים בוחרים בעמוד
              הסליקה.
            </p>
          )}

          <div className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-mist/50">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0 text-gold/70"
              aria-hidden="true"
            />
            <span>
              הסליקה מתבצעת בעמוד מאובטח של קארדקום בתקן PCI-DSS. פרטי האשראי
              אינם עוברים דרך האתר ואינם נשמרים בו.
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  name,
  label,
  className = "",
  ...props
}: {
  name: string;
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-mist/75"
      >
        {label}
        {props.required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        className="w-full rounded-2xl border border-gold/20 bg-void/50 px-4 py-3 text-mist placeholder:text-mist/30 transition focus:border-gold/60 focus:outline-none"
        {...props}
      />
    </div>
  );
}
