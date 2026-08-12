"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { useSeminar } from "@/lib/seminar";
import { cities, register, tickets } from "@/data/usaSeminar";

const field =
  "w-full rounded-2xl border border-gold/25 bg-void/70 px-5 py-3.5 text-cream placeholder:text-cream/35 transition focus:border-gold/70 focus:outline-none";

/**
 * Seat reservation, not checkout. No money moves here — the server records the
 * lead and Racheli's team follows up to collect payment. The note under the
 * heading says so, because the buttons that lead here show a dollar price.
 */
export default function RegisterForm() {
  const cityId = useSeminar((s) => s.cityId);
  const ticketId = useSeminar((s) => s.ticketId);
  const setCity = useSeminar((s) => s.setCity);
  const setTicket = useSeminar((s) => s.setTicket);

  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("sending");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/usa-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          cityId: data.get("cityId"),
          ticketId: data.get("ticketId"),
          notes: data.get("notes"),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? register.genericError);
        setStatus("idle");
        return;
      }

      setStatus("done");
    } catch {
      setError(register.genericError);
      setStatus("idle");
    }
  }

  return (
    <section
      id="register"
      className="relative scroll-mt-8 overflow-hidden bg-teal/25 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-2xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{register.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight font-black text-cream sm:text-5xl">
              {register.title}
            </h2>
            <p className="mt-5 text-base text-cream/65 sm:text-lg">{register.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "done" ? (
            <div
              className="mt-12 rounded-4xl border border-gold/40 bg-void/70 p-10 text-center"
              role="status"
            >
              <span
                className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br from-gold-lt to-gold-dp"
                aria-hidden="true"
              >
                <Check className="size-7 text-void" strokeWidth={3} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-cream">
                {register.success.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-cream/70">
                {register.success.body}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-cream/80">
                    {register.fields.fullName}
                  </span>
                  <input
                    name="fullName"
                    required
                    autoComplete="name"
                    className={field}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-cream/80">
                    {register.fields.phone}
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    dir="ltr"
                    className={`${field} text-right`}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-cream/80">
                  {register.fields.email}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  className={`${field} text-right`}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-cream/80">
                    {register.fields.city}
                  </span>
                  <select
                    name="cityId"
                    required
                    value={cityId ?? ""}
                    onChange={(e) => setCity(e.target.value)}
                    className={field}
                  >
                    <option value="" disabled>
                      בחרו עיר
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name} · {city.dates}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-cream/80">
                    {register.fields.ticket}
                  </span>
                  <select
                    name="ticketId"
                    required
                    value={ticketId ?? ""}
                    onChange={(e) => setTicket(e.target.value)}
                    className={field}
                  >
                    <option value="" disabled>
                      בחרו כרטיס
                    </option>
                    {tickets.map((ticket) => (
                      <option key={ticket.id} value={ticket.id}>
                        {ticket.name}
                        {ticket.price ? ` · ${ticket.price}` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-cream/80">
                  {register.fields.notes}
                </span>
                <textarea name="notes" rows={3} className={`${field} resize-y`} />
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-2xl border border-coral/40 bg-coral/10 px-5 py-3 text-sm text-coral"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 text-base font-bold text-void transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" && (
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                )}
                {status === "sending" ? register.submitting : register.submit}
              </button>

              <p className="text-center text-xs leading-relaxed text-cream/45">
                {register.note}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
