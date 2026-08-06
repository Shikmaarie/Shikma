import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Results from "@/components/sections/Results";
import Podcast from "@/components/sections/Podcast";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { faq, site } from "@/data/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        url: site.url,
        email: site.email,
        sameAs: Object.values(site.social),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is authored in this repo, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Programs />
      <Results />
      <Podcast />
      <Faq />
      <Contact />
    </>
  );
}
