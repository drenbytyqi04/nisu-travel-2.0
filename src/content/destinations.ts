import { img, type ImageRef } from "@/lib/images";

export type Destination = {
  slug: string;
  /** City or region shown large. */
  name: string;
  country: string;
  /** IATA-style code used as a typographic device throughout the site. */
  code: string;
  /** Decimal coordinates, printed in mono as a structural label. */
  coords: string;
  /** One line, editorial. Runs under the name on the featured showcase. */
  line: string;
  blurb: string;
  /** Longer copy for the destination detail page. */
  body: string[];
  /** Surfaces this destination in the full-bleed cinematic showcase. */
  featured: boolean;
  bestFor: string[];
  season: string;
  flightNote: string;
  image: ImageRef;
};

/**
 * CMS-ready: this array is the only place destinations are defined. Every
 * listing, card, filter, detail page and sitemap entry derives from it, so
 * a headless CMS can replace this file with a fetch of the same shape.
 */
export const destinations: Destination[] = [
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    code: "IST",
    coords: "41.0082° N, 28.9784° E",
    line: "Where history, culture and modern life meet.",
    blurb:
      "Two continents, one skyline, and a ferry ride that costs less than a coffee. Istanbul rewards travellers who arrive curious.",
    body: [
      "Istanbul is the easiest great city to fall for. Mornings belong to the ferries crossing the Bosphorus, afternoons to the covered markets, and evenings to rooftops where the call to prayer carries over the water.",
      "We plan Istanbul for first-time visitors and for people returning for the fourth time. That usually means a hotel in the right neighbourhood rather than the famous one, and a route through the old city that avoids the middle of the day.",
      "Long weekends work here. So do longer stays that pair the city with the Aegean coast.",
    ],
    featured: true,
    bestFor: ["City Breaks", "Couples", "Culture"],
    season: "April–June, September–November",
    flightNote: "Short-haul from Prishtina, comfortable as a long weekend.",
    image: img(
      "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
      "bosphorus",
      "city",
    ),
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    coords: "25.2048° N, 55.2708° E",
    line: "Experience a city built for extraordinary moments.",
    blurb:
      "Desert light, engineered skylines and service standards that reset your expectations. Dubai is a city that does nothing by halves.",
    body: [
      "Dubai is at its best when you treat it as two trips at once: the city, and the desert an hour outside it. We build both into the same week.",
      "Hotels here vary enormously in what they actually deliver, so we book from experience rather than from a listing page — beach access, breakfast, and how far you really are from everything else.",
      "Winter is the season. Between November and March the weather does the work for you.",
    ],
    featured: true,
    bestFor: ["Luxury", "Family", "City Breaks"],
    season: "November–March",
    flightNote: "Connecting routes; we plan the layover so it works for you.",
    image: img(
      "Amber dusk over the Dubai skyline seen from the desert",
      "gulf",
      "city",
    ),
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    code: "JTR",
    coords: "36.3932° N, 25.4615° E",
    line: "Whitewashed villages, blue horizons and unforgettable sunsets.",
    blurb:
      "A volcanic caldera with villages balanced along its rim. Santorini is small, and the details of where you stay matter enormously.",
    body: [
      "Everyone comes for the sunset. The trick is being somewhere you actually want to be for the other twenty-three hours.",
      "We book Santorini by village, not by island — Oia, Imerovigli and Fira are three different holidays, and the difference between a caldera-view room and a room fifty metres inland is the whole trip.",
      "Shoulder season is quieter, cheaper and warm enough to swim.",
    ],
    featured: true,
    bestFor: ["Couples", "Luxury", "Beach"],
    season: "May–June, September–October",
    flightNote: "Seasonal routes; often best paired with Athens.",
    image: img(
      "Whitewashed caldera villages above the Aegean, Santorini",
      "aegean",
      "coast",
    ),
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    code: "DPS",
    coords: "8.4095° S, 115.1889° E",
    line: "Discover tropical landscapes, culture and tranquility.",
    blurb:
      "Rice terraces inland, surf on the coast, and a culture that carries on entirely independently of tourism. Worth the flight.",
    body: [
      "Bali is a long way from Prishtina, which is exactly why it should be planned properly. Two weeks is the minimum that makes the journey worth it.",
      "We usually split the island: somewhere green and quiet inland to start, then the coast once you have adjusted to the time difference.",
      "Dry season runs April to October. Book earlier than you think for July and August.",
    ],
    featured: true,
    bestFor: ["Long-haul", "Couples", "Nature"],
    season: "April–October",
    flightNote: "Long-haul with one or two connections.",
    image: img(
      "Terraced green hillsides in humid morning light, Bali",
      "tropic",
      "tropic",
    ),
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spain",
    code: "BCN",
    coords: "41.3874° N, 2.1686° E",
    line: "A city with a beach and an appetite.",
    blurb:
      "Architecture worth crossing a continent for, a working port city underneath it, and dinner that starts at ten.",
    body: [
      "Barcelona rewards walking. We plan it neighbourhood by neighbourhood rather than landmark by landmark, which is how the city actually makes sense.",
      "The famous buildings need booking weeks ahead. We handle that so you are not queuing on the one morning it rains.",
      "Late spring and early autumn are ideal — warm enough for the beach, cool enough for the city.",
    ],
    featured: false,
    bestFor: ["City Breaks", "Family", "Culture"],
    season: "May–June, September",
    flightNote: "Short-haul; frequent European connections.",
    image: img(
      "Terracotta rooftops and Mediterranean light, Barcelona",
      "catalan",
      "city",
    ),
  },
  {
    slug: "egypt",
    name: "Egypt",
    country: "Egypt",
    code: "HRG",
    coords: "27.2579° N, 33.8116° E",
    line: "Five thousand years, and a very good reef.",
    blurb:
      "Red Sea resorts that work brilliantly for families, and a Nile itinerary that is one of the great journeys in travel.",
    body: [
      "Most people go to Egypt for the sea and discover the history. We build itineraries that make room for both without turning the week into a bus tour.",
      "Hurghada and Sharm work as straightforward beach weeks. Adding Luxor turns it into something you will still be talking about years later.",
      "Autumn through spring is comfortable; midsummer is genuinely hot.",
    ],
    featured: false,
    bestFor: ["Family", "Beach", "Culture"],
    season: "October–April",
    flightNote: "Charter and connecting options depending on season.",
    image: img(
      "Desert dunes and the Nile valley in late gold light, Egypt",
      "nile",
      "desert",
    ),
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    code: "ZRH",
    coords: "47.3769° N, 8.5417° E",
    line: "Mountains that look unreasonable in photographs.",
    blurb:
      "Precise, expensive and completely worth it. Also one of the diaspora's home routes, which we know well.",
    body: [
      "Switzerland is two trips: the mountains, and the cities that connect them. The trains make combining both effortless if the timings are planned properly.",
      "We book Switzerland for holidays and for family visits, and the planning is different for each. Both benefit from booking early.",
      "Summer for hiking and lakes, winter for snow. Spring and autumn are quiet and beautiful.",
    ],
    featured: false,
    bestFor: ["Nature", "Diaspora", "Family"],
    season: "Year-round",
    flightNote: "A core diaspora route — we plan these constantly.",
    image: img(
      "Snow-lit alpine peaks above a cold blue valley, Switzerland",
      "alpine",
      "peaks",
    ),
  },
  {
    slug: "germany",
    name: "Germany",
    country: "Germany",
    code: "FRA",
    coords: "50.1109° N, 8.6821° E",
    line: "The route home, and a country worth stopping in.",
    blurb:
      "For many Kosovar families Germany is the most travelled route of the year. It is also a country most of us have barely toured.",
    body: [
      "We book more journeys to Germany than to anywhere else, largely for family visits — and we have learned exactly where the cheap weeks and the expensive ones fall.",
      "If you are travelling anyway, a few days in Berlin, Munich or along the Rhine turns a family trip into a holiday.",
      "Summer and December are the peak windows. Book those months as early as you can.",
    ],
    featured: false,
    bestFor: ["Diaspora", "City Breaks", "Culture"],
    season: "Year-round",
    flightNote: "The most-requested route we handle.",
    image: img(
      "Cool northern light over a river city, Germany",
      "rhine",
      "city",
    ),
  },
];

export const featuredDestinations = destinations.filter((d) => d.featured);

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Filter chips on /destinations are derived, never hand-maintained. */
export const destinationTags = Array.from(
  new Set(destinations.flatMap((d) => d.bestFor)),
).sort();
