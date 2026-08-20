export type Testimonial = {
  quote: string;
  /** Replace with real reviewer names once you have written consent. */
  author: string;
  context: string;
  rating: 5;
};

/**
 * Placeholder reviews, clearly structured so real ones drop straight in.
 * Keep `rating` honest — the aggregate shown on the site is derived from
 * `reviews` in site.config.ts, not from this array.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Nisu Travel made our entire trip so easy. Everything was organised perfectly, and when our plans changed a week before, it was handled the same day.",
    author: "Family booking",
    context: "Antalya · Summer holiday",
    rating: 5,
  },
  {
    quote:
      "From the flight to the hotel, everything was handled professionally. We were met at the airport and never had to solve anything ourselves.",
    author: "Couple booking",
    context: "Istanbul · City break",
    rating: 5,
  },
  {
    quote:
      "Great communication throughout the whole journey. Questions answered in minutes, not days — including while we were already travelling.",
    author: "Group booking",
    context: "Zurich · Family visit",
    rating: 5,
  },
  {
    quote:
      "They found a routing I could not find myself, at a better time and for less than I expected to pay. That is the whole job, done well.",
    author: "Business traveller",
    context: "Frankfurt · Work trip",
    rating: 5,
  },
];
