import type { Metadata } from "next";
import UsaHero from "@/components/usa/UsaHero";
import UsaMarquee from "@/components/usa/UsaMarquee";
import UsaProblem from "@/components/usa/UsaProblem";
import UsaImagine from "@/components/usa/UsaImagine";
import UsaAgenda from "@/components/usa/UsaAgenda";
import UsaStory from "@/components/usa/UsaStory";
import UsaVoices from "@/components/usa/UsaVoices";
import UsaIncluded from "@/components/usa/UsaIncluded";
import UsaTickets from "@/components/usa/UsaTickets";
import UsaCities from "@/components/usa/UsaCities";
import RegisterForm from "@/components/usa/RegisterForm";
import UsaClosing from "@/components/usa/UsaClosing";
import UsaStickyCta from "@/components/usa/UsaStickyCta";
import { cities, usaSeminar } from "@/data/usaSeminar";
import { site } from "@/data/site";

const description =
  "סמינר פרונטלי של יומיים עם רחלי חדד — מיאמי 27–28 באוקטובר 2026, לוס אנג׳לס 2–3 בנובמבר 2026. יומיים שישנו את הדרך שבה אתם חושבים, מרגישים ומתנהלים עם כסף.";

export const metadata: Metadata = {
  title: `${usaSeminar.title} — ${usaSeminar.year}`,
  description,
  alternates: { canonical: "/usa" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${site.url}/usa`,
    title: `${usaSeminar.title} — ${usaSeminar.year}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${usaSeminar.title} — ${usaSeminar.year}`,
    description,
  },
};

export default function UsaSeminarPage() {
  // One Event per city. Only the locality is published — no venue has been
  // announced — so the address stops at city level rather than inventing one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": cities.map((city) => ({
      "@type": "Event",
      name: `${usaSeminar.title} — ${city.name}`,
      description,
      startDate: city.start,
      endDate: city.end,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      inLanguage: "he",
      url: `${site.url}/usa`,
      location: {
        "@type": "Place",
        name: city.locality,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.locality,
          addressRegion: city.region,
          addressCountry: "US",
        },
      },
      performer: { "@type": "Person", name: site.name },
      organizer: { "@type": "Person", name: site.name, url: site.url },
      offers: {
        "@type": "Offer",
        price: "35",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${site.url}/usa#register`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is authored in this repo, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <UsaHero />
      <UsaMarquee />
      <UsaProblem />
      <UsaImagine />
      <UsaAgenda />
      <UsaStory />
      <UsaVoices />
      <UsaIncluded />
      <UsaTickets />
      <UsaCities />
      <RegisterForm />
      <UsaClosing />
      <UsaStickyCta />
    </>
  );
}
