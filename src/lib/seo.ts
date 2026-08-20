import type { Metadata } from "next";
import { contact, locationLine, site } from "@/content/site.config";

/** Keyword set the site is optimised for, used in metadata and copy checks. */
export const keywords = [
  "Nisu Travel",
  "Nisu Travel Kosovo",
  "travel agency Kosovo",
  "travel agency Prishtina",
  "Kosovo travel agency",
  "flights Kosovo",
  "flights from Kosovo",
  "travel packages Kosovo",
  "holiday packages Kosovo",
  "agjenci udhëtimi Prishtinë",
];

export function pageMetadata({
  title,
  description,
  path = "/",
  images,
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      images: images ?? ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/**
 * TravelAgency + LocalBusiness structured data.
 * Fields that are unset in site.config.ts are omitted rather than faked —
 * invalid contact data in schema is worse than none.
 */
export function organisationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${site.url}/#organisation`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    areaServed: [
      { "@type": "Country", name: "Kosovo" },
      { "@type": "Place", name: "Albanian diaspora, Europe" },
    ],
    address: {
      "@type": "PostalAddress",
      ...(contact.street ? { streetAddress: contact.street } : {}),
      addressLocality: contact.city,
      addressCountry: "XK",
    },
  };

  if (contact.phone) schema.telephone = contact.phone;
  if (contact.email) schema.email = contact.email;
  if (contact.mapsUrl) schema.hasMap = contact.mapsUrl;

  const sameAs = [
    process.env.NEXT_PUBLIC_INSTAGRAM,
    process.env.NEXT_PUBLIC_FACEBOOK,
  ].filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;

  return schema;
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function locationText() {
  return locationLine();
}
