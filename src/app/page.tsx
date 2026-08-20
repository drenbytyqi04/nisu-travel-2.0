import { AboutIntro } from "@/components/sections/AboutIntro";
import { DestinationsRail } from "@/components/sections/DestinationsRail";
import { Diaspora } from "@/components/sections/Diaspora";
import { FeaturedDestinations } from "@/components/sections/FeaturedDestinations";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Inspiration } from "@/components/sections/Inspiration";
import { Location } from "@/components/sections/Location";
import { Packages } from "@/components/sections/Packages";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { TravelExperience } from "@/components/sections/TravelExperience";
import { TravelStory } from "@/components/sections/TravelStory";
import { WhyNisu } from "@/components/sections/WhyNisu";

/**
 * Narrative order — discover, explore, trust, request:
 * hook → approach → services → destinations → featured → packages →
 * process → reasons → diaspora → story → proof → journal → climax CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TravelExperience />
      <Services />
      <DestinationsRail />
      <FeaturedDestinations />
      <Packages limit={4} />
      <HowItWorks />
      <WhyNisu />
      <Diaspora />
      <TravelStory />
      <Stats />
      <Testimonials />
      <AboutIntro />
      <Gallery limit={8} />
      <Inspiration />
      <RequestCTA />
      <Location />
    </>
  );
}
