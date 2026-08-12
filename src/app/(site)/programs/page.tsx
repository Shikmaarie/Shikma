import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import ProgramDetail from "@/components/store/ProgramDetail";
import Contact from "@/components/sections/Contact";
import { byCategory } from "@/data/products";
import { programsPage } from "@/data/site";

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
