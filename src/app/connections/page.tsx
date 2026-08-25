import type { Metadata } from "next";
import Hero from "@/components/connections/Hero";
import PhotoBand from "@/components/connections/PhotoBand";
import ClubIntro from "@/components/connections/ClubIntro";
import TwoWays from "@/components/connections/TwoWays";
import Curriculum from "@/components/connections/Curriculum";
import AboutRacheli from "@/components/connections/AboutRacheli";
import RegisterForm from "@/components/connections/RegisterForm";
import ClosingQuote from "@/components/connections/ClosingQuote";
import { connectionsHero } from "@/data/connections";

export const metadata: Metadata = {
  title: "קשרים ושת״פים — הדרכה חינמית",
  description: `${connectionsHero.title.join(" ")} ${connectionsHero.titleGold}`,
  alternates: { canonical: "/connections" },
};

export default function ConnectionsPage() {
  return (
    <div className="bg-parchment">
      <Hero />
      <PhotoBand />
      <ClubIntro />
      <TwoWays />
      <Curriculum />
      <AboutRacheli />
      <RegisterForm />
      <ClosingQuote />
    </div>
  );
}
