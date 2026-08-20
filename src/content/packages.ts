import { img, type ImageRef } from "@/lib/images";

export type TravelPackage = {
  slug: string;
  title: string;
  /** Travel type — also the filter facet on /packages. */
  type: string;
  /** Example destinations, not a fixed list. */
  destinations: string;
  description: string;
  duration: string;
  image: ImageRef;
};

/**
 * No prices here by design. Availability and fares move constantly, so every
 * card ends in "Request Offer" rather than a number we cannot stand behind.
 */
export const packages: TravelPackage[] = [
  {
    slug: "summer-holidays",
    title: "Summer Holidays",
    type: "Beach",
    destinations: "Turkey · Greece · Egypt",
    description:
      "The straightforward one. Sun, a hotel that works, and transfers arranged so the first day is not spent solving problems.",
    duration: "7–14 nights",
    image: img("Open sea and sand under strong summer light", "aegean", "coast"),
  },
  {
    slug: "city-breaks",
    title: "City Breaks",
    type: "City",
    destinations: "Istanbul · Barcelona · Vienna",
    description:
      "Three or four nights, a hotel in the right neighbourhood, and a plan loose enough to abandon.",
    duration: "3–5 nights",
    image: img("Warm city rooftops at the end of the day", "catalan", "city"),
  },
  {
    slug: "beach-holidays",
    title: "Beach Holidays",
    type: "Beach",
    destinations: "Antalya · Hurghada · Crete",
    description:
      "Resorts chosen for the things listings never mention: the walk to the water, the breakfast, the noise.",
    duration: "7–10 nights",
    image: img("A long empty shoreline in the early morning", "nile", "coast"),
  },
  {
    slug: "luxury-getaways",
    title: "Luxury Getaways",
    type: "Luxury",
    destinations: "Dubai · Maldives · Santorini",
    description:
      "Where the difference between very good and exceptional is entirely in the booking. We know which is which.",
    duration: "5–10 nights",
    image: img("A private terrace above the water at dusk", "gulf", "coast"),
  },
  {
    slug: "family-holidays",
    title: "Family Holidays",
    type: "Family",
    destinations: "Turkey · Egypt · Spain",
    description:
      "Sensible flight times, connecting rooms, and a pool the children will not want to leave.",
    duration: "7–14 nights",
    image: img("Shallow calm water beside a resort garden", "tropic", "coast"),
  },
  {
    slug: "romantic-escapes",
    title: "Romantic Escapes",
    type: "Couples",
    destinations: "Santorini · Rome · Bali",
    description:
      "Quiet hotels, late dinners, and nothing on the schedule before ten in the morning.",
    duration: "4–10 nights",
    image: img("Two chairs facing a caldera at sunset", "aegean", "coast"),
  },
  {
    slug: "winter-trips",
    title: "Winter Trips",
    type: "Winter",
    destinations: "Switzerland · Austria · Dubai",
    description:
      "Snow, or the deliberate absence of it. Both are excellent decisions in January.",
    duration: "5–10 nights",
    image: img("Snow-covered peaks under a cold clear sky", "alpine", "peaks"),
  },
  {
    slug: "weekend-getaways",
    title: "Weekend Getaways",
    type: "City",
    destinations: "Belgrade · Skopje · Tirana · Istanbul",
    description:
      "Friday out, Sunday back. Close enough that the flight is not the holiday.",
    duration: "2–3 nights",
    image: img("A city skyline seen from the air on approach", "bosphorus", "city"),
  },
];

export const packageTypes = Array.from(new Set(packages.map((p) => p.type))).sort();
