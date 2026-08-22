import { DestinationsIndex } from "@/components/sections/DestinationsIndex";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { destinations } from "@/content/destinations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Destinations",
  description:
    "Destinations Nisu Travel plans from Kosovo — Istanbul, Dubai, Santorini, Bali, Barcelona, Egypt, Switzerland and Germany. Flights, hotels and complete itineraries.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where Will You Go Next?"
        intro="Places we book often enough to have opinions about — including when not to go, and where to stay when you do."
        imageKey="page-destinations"
        meta={`${destinations.length} destinations`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
        ]}
      />
      <DestinationsIndex />
      <RequestCTA />
    </>
  );
}
