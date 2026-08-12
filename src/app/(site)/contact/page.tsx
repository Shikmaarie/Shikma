import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import Faq from "@/components/sections/Faq";
import { products } from "@/data/products";
import { contactPage, site } from "@/data/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "שיחת התאמה עם רחלי חדד — בלי התחייבות ובלי מכירה בכוח. ספרו לי איפה אתם היום.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;
  // Only echo a slug that actually exists, so the URL can't inject text.
  const requested = products.find((p) => p.slug === program);

  return (
    <>
      <PageHeader
        eyebrow="צור קשר"
        title={contactPage.title}
        sub={contactPage.sub}
      />

      <Section className="bg-void !pt-6">
        {requested && (
          <Reveal>
            <p className="mb-10 rounded-3xl border border-gold/30 bg-gold/8 px-6 py-5 text-center text-cream/85">
              מתעניינים ב
              <span className="font-bold text-gold-lt">{requested.name}</span> —
              נהדר. ציינו את זה בפנייה ואחזור אליכם עם כל הפרטים.
            </p>
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="h-full">
            <ContactCard
              href={`https://wa.me/${site.whatsapp}`}
              external
              icon={<MessageCircle className="size-6" aria-hidden="true" />}
              title="וואטסאפ"
              body="הדרך המהירה ביותר להגיע אליי. כתבו לי מה קורה בעסק ואחזור אליכם."
              action="לפתיחת שיחה"
            />
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <ContactCard
              href={`mailto:${site.email}`}
              icon={<Mail className="size-6" aria-hidden="true" />}
              title="אימייל"
              body={site.email}
              action="לשליחת מייל"
            />
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <ContactCard
              href={`tel:${site.phone}`}
              icon={<Phone className="size-6" aria-hidden="true" />}
              title="טלפון"
              body={site.phone}
              action="להתקשרות"
            />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 rounded-5xl glass p-9 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
              עדיין לא בטוחים מה מתאים לכם?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/60">
              התחילו במשהו קטן. אתגר הכסף והשפע או מועדון העסקים הם הדרך הכי
              פשוטה להכיר את הגישה — בלי התחייבות.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/store/money-challenge"
                className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void transition hover:brightness-110"
              >
                לאתגר הכסף והשפע
              </Link>
              <Link
                href="/club"
                className="rounded-full border border-gold/35 px-8 py-3.5 font-semibold text-cream transition hover:border-gold/70 hover:text-gold-lt"
              >
                למועדון העסקים
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      <Faq />
    </>
  );
}

function ContactCard({
  href,
  external = false,
  icon,
  title,
  body,
  action,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  title: string;
  body: string;
  action: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-full flex-col rounded-4xl glass p-8 transition duration-500 hover:border-gold/50 hover:shadow-[0_28px_80px_-45px_rgba(212,169,95,0.7)]"
    >
      <span className="grid size-12 place-items-center rounded-full border border-gold/30 bg-void/50 text-gold">
        {icon}
      </span>

      <h2 className="mt-6 font-display text-xl font-bold text-cream">{title}</h2>
      <p className="ltr-nums mt-2 flex-1 leading-relaxed text-cream/60">{body}</p>

      <span className="mt-6 font-semibold text-gold-lt">{action} ←</span>
    </a>
  );
}
