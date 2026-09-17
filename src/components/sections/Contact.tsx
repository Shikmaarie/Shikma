import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ScriptLine, pill } from "@/components/ui/Editorial";
import { BrandStar } from "@/components/ui/Wordmark";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <Section
      id="contact"
      surface="dark"
      className="overflow-hidden bg-gradient-to-bl from-teal-2 via-teal to-night"
    >
      <span
        className="pointer-events-none absolute -top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-gold/12 blur-3xl"
        aria-hidden="true"
      />

      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">הצעד הבא</Eyebrow>

          <SectionTitle className="mt-6">
            אם הגעתם עד לכאן —
            <br />
            <span className="font-light">זה כבר לא במקרה.</span>
          </SectionTitle>

          <ScriptLine className="mt-5">
            שיחת התאמה קצרה. בלי התחייבות ובלי מכירה בכוח.
          </ScriptLine>

          <p className="mt-6 leading-relaxed text-fg2 sm:text-lg">
            ספרו לי איפה אתם היום — ואגיד לכם בכנות מה הצעד הבא, גם אם הוא לא
            אצלי.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={pill.gold}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              לשיחה בוואטסאפ
            </a>

            <Link href="/contact" className={`group ${pill.ghost}`}>
              לכל דרכי ההתקשרות
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <p className="mt-9 flex flex-wrap items-center justify-center gap-2 text-sm text-fg3">
            <BrandStar className="size-2.5 text-gold/70" />
            או במייל:{" "}
            <a
              href={`mailto:${site.email}`}
              className="ltr-nums text-gold-lt underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
