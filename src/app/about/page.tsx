import { AboutIntro } from "@/components/sections/AboutIntro";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyNisu } from "@/components/sections/WhyNisu";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Nisu Travel is a travel agency in Prishtina, Kosovo, planning flights, hotels and complete journeys for travellers across Kosovo and the Albanian diaspora.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Travel Starts With Trust."
        intro="Nisu means to set off. That is the moment we exist for — when a trip stops being an idea and becomes a departure."
        image={img("A city seen from the air on final approach", "rhine", "city")}
        artKey="page-about"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <AboutIntro full />
      <Stats />
      <WhyNisu />
      <Testimonials />
      <RequestCTA />
    </>
  );
}
