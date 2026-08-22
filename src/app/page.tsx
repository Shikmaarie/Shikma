import HomeHero from "@/components/sections/home/HomeHero";
import GiftsIntro from "@/components/sections/home/GiftsIntro";
import Gifts from "@/components/sections/home/Gifts";
import VideoFeature from "@/components/sections/home/VideoFeature";
import Greeting from "@/components/sections/home/Greeting";
import SuccessStories from "@/components/sections/home/SuccessStories";
import CommunityCta from "@/components/sections/home/CommunityCta";
import { site } from "@/data/site";

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
        telephone: site.phone,
        sameAs: Object.values(site.social),
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
      <HomeHero />
      <GiftsIntro />
      <Gifts />
      <VideoFeature />
      <Greeting />
      <SuccessStories />
      <CommunityCta />
    </>
  );
}
