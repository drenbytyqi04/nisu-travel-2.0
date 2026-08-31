/**
 * NISU TRAVEL — Central business configuration
 * ---------------------------------------------------------------
 * This is the single source of truth for every business-specific value
 * on the site. Edit here; nothing else needs to change.
 *
 * IMPORTANT — values left as an empty string ("") are NOT invented.
 * The site detects them and hides or disables the related CTA instead of
 * showing a fake phone number, address or statistic. Fill them in and the
 * corresponding buttons, links and schema.org metadata switch on automatically.
 */

export const site = {
  name: "Nisu Travel",
  legalName: "Nisu Travel",
  tagline: "Travel · Discover · Experience",
  /** Used for canonical URLs, sitemap and Open Graph. Update on launch. */
  url: "https://nisutravel.com",
  locale: "en",
  description:
    "Nisu Travel is a travel agency in Prishtina, Kosovo. Flights, hotels, holiday packages and personally planned journeys for travellers across Kosovo and the Albanian diaspora.",
} as const;

type ContactConfig = {
  phone: string;
  whatsapp: string;
  email: string;
  street: string;
  city: string;
  country: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
};

export const contact: ContactConfig = {
  /** Display format. `telLink()` strips it down for the tel: href. */
  phone: "+383 43 500 435",
  /** Digits only, no + or spaces — this is what wa.me expects. */
  whatsapp: "38343500435",
  /** TODO: add the real inbox, e.g. "hello@nisutravel.com". */
  email: "",
  /** Street address intentionally omitted until confirmed. */
  street: "",
  city: "Prishtina",
  country: "Kosovo",
  /** TODO: paste the Google Maps place URL or embed src once the office is listed. */
  mapsUrl: "",
  mapsEmbedUrl: "",
};

type SocialConfig = { instagram: string; facebook: string; tiktok: string };

export const social: SocialConfig = {
  instagram: "",
  facebook: "",
  tiktok: "",
};

/** Pre-filled WhatsApp opener. */
export const whatsappMessage =
  "Hello Nisu Travel, I'm interested in planning a trip.";

/**
 * Headline statistics. Set `enabled: false` to hide the whole block rather
 * than publish numbers you cannot stand behind.
 */
export const stats = {
  enabled: true,
  items: [
    { value: 1000, suffix: "+", label: "Travellers Served" },
    { value: 50, suffix: "+", label: "Destinations" },
    { value: 24, suffix: "/7", label: "Travel Support" },
    { value: 100, suffix: "%", label: "Personalised Service" },
  ],
} as const;

/** Aggregate review score shown above the testimonial slider. */
export const reviews = {
  enabled: true,
  score: "5.0",
  label: "Happy Travellers",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "About", href: "/about" },
    { label: "Travel Inspiration", href: "/inspiration" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Trip", href: "/request" },
  ],
  services: [
    { label: "Flight Tickets", href: "/services#flights" },
    { label: "Hotels", href: "/services#hotels" },
    { label: "Holiday Packages", href: "/packages" },
    { label: "Transfers", href: "/services#transfers" },
    { label: "Custom Trips", href: "/services#itineraries" },
  ],
} as const;

/* ----------------------------------------------------------------
 * Derived helpers — every CTA in the app goes through these, so an
 * unset value degrades to `null` instead of a broken or fake link.
 * ---------------------------------------------------------------- */

export function whatsappLink(message: string = whatsappMessage): string | null {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string | null {
  if (!contact.phone) return null;
  return `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
}

export function mailLink(subject?: string): string | null {
  if (!contact.email) return null;
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${contact.email}${q}`;
}

export function locationLine(): string {
  return [contact.street, contact.city, contact.country]
    .filter(Boolean)
    .join(", ");
}

export const socialLinks = () =>
  [
    { key: "instagram", label: "Instagram", href: social.instagram },
    { key: "facebook", label: "Facebook", href: social.facebook },
    { key: "tiktok", label: "TikTok", href: social.tiktok },
  ].filter((s) => Boolean(s.href));
