import { Suspense } from "react";
import { Location } from "@/components/sections/Location";
import { PageHero } from "@/components/sections/PageHero";
import { RequestFormPanel } from "@/components/sections/RequestFormPanel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Nisu Travel in Prishtina, Kosovo — WhatsApp, phone or email. Flights, hotels, holiday packages and personally planned journeys.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Plan Your Next Journey."
        intro="Message us, call us, or come in. Whichever is easiest — you reach the same people either way."
        imageKey="page-contact"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <Suspense>
        <RequestFormPanel />
      </Suspense>
      <Location />
    </>
  );
}
