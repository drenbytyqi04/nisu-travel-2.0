import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { RequestFormPanel } from "@/components/sections/RequestFormPanel";
import { Location } from "@/components/sections/Location";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Trip",
  description:
    "Tell Nisu Travel where you want to go and we will prepare a personalised offer — flights, hotels, transfers and complete itineraries from Kosovo.",
  path: "/request",
});

export default function RequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a trip"
        title="Ready to Nisu?"
        intro="Tell us where you want to go. We'll help you plan the rest — usually with an answer the same day."
        image={img("A runway stretching towards first light", "jade", "aerial")}
        artKey="page-request"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Request a Trip", href: "/request" },
        ]}
      />
      <Suspense>
        <RequestFormPanel />
      </Suspense>
      <Location />
    </>
  );
}
