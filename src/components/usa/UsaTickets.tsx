"use client";

import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { BrandStar } from "@/components/ui/Wordmark";
import { useSeminar } from "@/lib/seminar";
import { ticketsSection, tickets, usaSeminar } from "@/data/usaSeminar";

const accentRing: Record<string, string> = {
  gold: "border-gold/30 hover:border-gold/70",
  coral: "border-coral/30 hover:border-coral/70",
  peri: "border-peri/45 hover:border-peri/80",
};

/**
 * The three tiers. Picking one preselects it in the registration form below
 * rather than navigating away — there is no US checkout link yet.
 */
export default function UsaTickets() {
  const setTicket = useSeminar((s) => s.setTicket);
  const selected = useSeminar((s) => s.ticketId);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-void via-night to-void px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{ticketsSection.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight font-black text-cream sm:text-5xl lg:text-6xl">
              {ticketsSection.title}
            </h2>
            <p className="mt-5 text-base text-cream/60 sm:text-lg">
              {ticketsSection.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {tickets.map((ticket, i) => (
            <Reveal key={ticket.id} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-4xl border bg-void/60 p-8 backdrop-blur-sm transition ${
                  accentRing[ticket.accent]
                } ${ticket.featured ? "lg:-translate-y-4 lg:shadow-[0_30px_80px_-40px_rgba(142,155,246,0.6)]" : ""} ${
                  selected === ticket.id ? "ring-2 ring-gold/70" : ""
                }`}
              >
                {ticket.featured && (
                  <span className="absolute -top-3 right-8 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-l from-peri to-lavender px-4 py-1 text-[11px] font-black text-void">
                    <BrandStar className="size-2.5" />
                    הכי מבוקש
                  </span>
                )}

                {/* No dir="auto" — it would flip the Latin "VIP" to the left
                    edge while the Hebrew titles stay right, breaking the row. */}
                <h3 className="font-display text-2xl font-bold text-cream">
                  {ticket.name}
                </h3>

                <p className="mt-5">
                  {ticket.price ? (
                    <span
                      className="ltr-nums font-display text-5xl font-black text-gradient-gold"
                      dir="ltr"
                    >
                      {ticket.price}
                    </span>
                  ) : (
                    // רחלי עדיין לא פרסמה מחיר ל-VIP. לא להמציא — ראו CLAUDE.md.
                    <span className="font-display text-2xl font-bold text-gold-lt">
                      בפנייה אישית
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-cream/50">{ticket.priceNote}</p>

                <ul className="mt-7 flex grow flex-col gap-3 border-t border-gold/12 pt-7">
                  {ticket.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check
                        className="mt-1 size-4 shrink-0 text-gold"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-cream/75">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={usaSeminar.registerHref}
                  onClick={() => setTicket(ticket.id)}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold transition ${
                    ticket.featured
                      ? "bg-gradient-to-l from-gold-dp via-gold to-gold-lt text-void hover:brightness-110"
                      : "border border-gold/40 text-cream hover:border-gold hover:text-gold-lt"
                  }`}
                >
                  {ticket.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
