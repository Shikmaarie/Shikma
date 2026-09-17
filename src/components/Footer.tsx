import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";
import { nav, site } from "@/data/site";
import Wordmark from "@/components/ui/Wordmark";
import { purchasable } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-surface="dark"
      className="relative bg-gradient-to-b from-night to-void px-5 pt-20 pb-10 sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark size="lg" className="!items-start" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg2">
              להפסיק לרדוף אחרי הכסף — ולבנות אימפריה שמנוהלת מבפנים החוצה.
            </p>

            <div className="mt-6 flex gap-3">
              <Social href={site.social.instagram} label="אינסטגרם">
                <InstagramIcon className="size-4" />
              </Social>
              <Social href={site.social.facebook} label="פייסבוק">
                <FacebookIcon className="size-4" />
              </Social>
              <Social href={site.social.youtube} label="יוטיוב">
                <YoutubeIcon className="size-4" />
              </Social>
            </div>
          </div>

          <FooterCol title="קישורים מהירים">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="לרכישה מיידית">
            {purchasable.slice(0, 5).map((p) => (
              <FooterLink key={p.slug} href={`/store/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
            <FooterLink href="/store">לכל המוצרים</FooterLink>
          </FooterCol>

          <FooterCol title="יצירת קשר">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-sm text-fg2 transition hover:text-accent"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="ltr-nums">{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 text-sm text-fg2 transition hover:text-accent"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span className="ltr-nums">{site.phone}</span>
              </a>
            </li>
            <li className="pt-3">
              <p className="text-xs leading-relaxed text-fg3">
                התשלומים באתר מתבצעים בעמוד סליקה מאובטח של קארדקום בתקן
                PCI-DSS. פרטי האשראי אינם נשמרים באתר.
              </p>
            </li>
          </FooterCol>
        </div>

        <p className="mt-14 rounded-2xl border border-line bg-card px-5 py-4 text-xs leading-relaxed text-fg3">
          אתר זה מופעל עם מערכת „נגיש בקליק”. להצגת תפריט הנגישות יש ללחוץ{" "}
          <kbd className="ltr-nums rounded border border-line-strong px-1.5 py-0.5 text-accent">
            Control-F10
          </kbd>
          , ולהפעלת קורא מסך{" "}
          <kbd className="ltr-nums rounded border border-line-strong px-1.5 py-0.5 text-accent">
            Control-F11
          </kbd>
          .
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 text-xs text-fg3 sm:flex-row sm:items-center sm:justify-between">
          <p className="ltr-nums">
            © {year} {site.name} · כל הזכויות שמורות | עיצוב ובנייה:{" "}
            {site.credit}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/terms" className="transition hover:text-accent">
              תקנון ותנאי שימוש
            </Link>
            <Link href="/legal/privacy" className="transition hover:text-accent">
              מדיניות פרטיות
            </Link>
            <Link
              href="/legal/accessibility"
              className="transition hover:text-accent"
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-accent">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-fg2 transition hover:text-accent"
      >
        {children}
      </Link>
    </li>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-line-strong text-fg2 transition hover:border-current hover:text-accent"
    >
      {children}
    </a>
  );
}
