import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { galleryItems } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Destinations, hotels, beaches and cities from journeys planned by Nisu Travel in Prishtina, Kosovo.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Places We Send People."
        intro="A working archive rather than a brochure — the light, the water and the terminals in between."
        imageKey="page-gallery"
        meta={`${galleryItems.length} images`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />
      <Gallery />
      <RequestCTA />
    </>
  );
}
