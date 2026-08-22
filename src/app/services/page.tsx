import { HowItWorks } from "@/components/sections/HowItWorks";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { Services } from "@/components/sections/Services";
import { WhyNisu } from "@/components/sections/WhyNisu";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Flight tickets, hotel reservations, holiday packages, airport transfers, custom itineraries, group, family, couple, diaspora and business travel — arranged by Nisu Travel in Prishtina.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={"Everything a Journey\nActually Needs."}
        intro="Book the whole trip or the single part you would rather not handle yourself. Same attention either way."
        imageKey="page-services"
        meta={`${services.length} services`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <Services all />
      <HowItWorks />
      <WhyNisu />
      <RequestCTA />
    </>
  );
}
