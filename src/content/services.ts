
export type Service = {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Lucide icon name, resolved in components/cards/ServiceCard.tsx */
  icon:
    | "plane"
    | "bed"
    | "palm"
    | "car"
    | "route"
    | "users"
    | "family"
    | "heart"
    | "home"
    | "briefcase";
};

export const services: Service[] = [
  {
    id: "flights",
    label: "Air",
    title: "Flight Tickets",
    description:
      "We find the routing that actually suits you — not just the cheapest line on a screen. Layovers, luggage and timings included.",
    icon: "plane",
  },
  {
    id: "hotels",
    label: "Stay",
    title: "Hotel Reservations",
    description:
      "Rooms we would book ourselves. We know which listings flatter themselves and which quietly over-deliver.",
    icon: "bed",
  },
  {
    id: "packages",
    label: "Complete",
    title: "Holiday Packages",
    description:
      "Flights, hotel and transfers arranged together, priced together, and handled by one person who knows your booking.",
    icon: "palm",
  },
  {
    id: "transfers",
    label: "Ground",
    title: "Airport Transfers",
    description:
      "Someone waiting when you land, in the city you have never driven in. The least glamorous booking that matters most.",
    icon: "car",
  },
  {
    id: "itineraries",
    label: "Bespoke",
    title: "Custom Itineraries",
    description:
      "You tell us the shape of the trip. We build the days around it, then leave enough room to change your mind.",
    icon: "route",
  },
  {
    id: "groups",
    label: "Together",
    title: "Group Travel",
    description:
      "Fifteen people, one itinerary, one invoice. We have organised enough of these to know where they go wrong.",
    icon: "users",
  },
  {
    id: "families",
    label: "Together",
    title: "Family Holidays",
    description:
      "Direct where possible, sensible arrival times, and a hotel where the pool is genuinely close to the room.",
    icon: "family",
  },
  {
    id: "couples",
    label: "Two",
    title: "Couple Getaways",
    description:
      "Anniversaries, honeymoons, or a week away that needed no reason. Quiet places, planned carefully.",
    icon: "heart",
  },
  {
    id: "diaspora",
    label: "Home",
    title: "Diaspora Travel",
    description:
      "Prishtina to Germany, Switzerland, Austria and back. The routes we book most, and the ones we price best.",
    icon: "home",
  },
  {
    id: "business",
    label: "Work",
    title: "Business Travel",
    description:
      "Flexible fares, changed plans, late invoices. Booked once, adjusted whenever the meeting moves.",
    icon: "briefcase",
  },
];
