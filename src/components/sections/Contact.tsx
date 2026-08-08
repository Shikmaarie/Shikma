import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <Section id="contact" className="bg-night">
      <Reveal>
        <div className="relative overflow-hidden rounded-5xl border border-gold/25 bg-gradient-to-t from-void via-teal/50 to-void px-7 py-20 text-center sm:px-14">
          <span
            className="absolute left-1/2 top-0 h-64 w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <Eyebrow>הצעד הבא</Eyebrow>

            <SectionTitle className="mt-6">
              אם הגעתם עד לכאן —
              <br />
              <span className="text-gradient-gold">זה כבר לא במקרה.</span>
            </SectionTitle>

            <p className="mt-7 text-lg leading-relaxed text-cream/65">
              בואו נבדוק ביחד מה נכון לכם עכשיו. שיחת התאמה קצרה, בלי התחייבות
              ובלי מכירה בכוח.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 font-bold text-void shadow-[0_10px_45px_-12px_rgba(212,169,95,0.85)] transition hover:brightness-110"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                לשיחה בוואטסאפ
              </a>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-gold/35 px-8 py-4 font-semibold text-cream transition hover:border-gold/70 hover:text-gold-lt"
              >
                לכל דרכי ההתקשרות
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <p className="mt-8 text-sm text-cream/45">
              או במייל:{" "}
              <a
                href={`mailto:${site.email}`}
                className="ltr-nums text-gold-lt underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
