import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import ProgramDetail from "@/components/store/ProgramDetail";
import Contact from "@/components/sections/Contact";
import { byCategory } from "@/data/products";
import { eventPage, programsPage } from "@/data/site";

export const metadata: Metadata = {
  title: "תוכניות עסקיות",
  description:
    "Platinum Business, ה-DNA של העסק ולצאת לעצמאות — מסלולי הליווי העסקי של רחלי חדד, לכל שלב שבו העסק שלכם נמצא.",
};

export default function ProgramsPage() {
  const items = byCategory("business");

  return (
    <>
      <PageHeader
        eyebrow="תוכניות עסקיות"
        title={programsPage.title}
        accent={programsPage.titleAccent}
        sub={programsPage.sub}
      />

      <Section className="bg-void !pt-6">
        <Reveal>
          <Link
            href={eventPage.promo.href}
            className="group mb-8 flex flex-col gap-4 rounded-4xl border border-gold/25 bg-gradient-to-l from-teal/45 to-void/40 p-7 transition hover:border-gold/55 sm:flex-row sm:items-center sm:gap-8 sm:p-9"
          >
            <div className="flex-1">
              <span className="text-xs font-bold tracking-[0.22em] text-gold/80">
                {eventPage.promo.kicker}
              </span>
              <h2 className="mt-2.5 font-display text-2xl font-bold text-cream">
                {eventPage.promo.title}
              </h2>
              <p className="mt-2 leading-relaxed text-cream/65">
                {eventPage.promo.body}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 px-6 py-3 font-semibold text-gold-lt transition group-hover:border-gold/80">
              {eventPage.promo.cta}
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>

        <div className="flex flex-col gap-8">
          {items.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.06}>
              <ProgramDetail product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Contact />
    </>
  );
}
