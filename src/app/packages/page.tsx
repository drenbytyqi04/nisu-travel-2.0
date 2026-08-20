import { PackagesIndex } from "@/components/sections/PackagesIndex";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { packages } from "@/content/packages";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Travel Packages",
  description:
    "Holiday packages from Kosovo — summer holidays, city breaks, beach holidays, luxury getaways, family holidays, romantic escapes, winter trips and weekend getaways. Request an offer from Nisu Travel.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Made for Your Next Escape."
        intro="Starting points, not fixed products. Every one gets rebuilt around your dates, your budget and who is travelling."
        image={img("A resort shoreline in late afternoon light", "tropic", "coast")}
        artKey="page-packages"
        meta={`${packages.length} packages`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Packages", href: "/packages" },
        ]}
      />
      <PackagesIndex />
      <RequestCTA />
    </>
  );
}
