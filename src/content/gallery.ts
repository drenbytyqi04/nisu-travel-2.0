import { img, type ImageRef } from "@/lib/images";

export type GalleryItem = {
  id: string;
  category: "Destinations" | "Hotels" | "Beaches" | "Cities" | "Travel";
  caption: string;
  /** Masonry weight: tall items span two rows on desktop. */
  tall?: boolean;
  image: ImageRef;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "Cities", caption: "Istanbul, from the water", tall: true, image: img("The Istanbul skyline seen from a Bosphorus ferry", "bosphorus", "city") },
  { id: "g2", category: "Beaches", caption: "The Aegean, early September", image: img("Clear shallow water over pale sand", "aegean", "coast") },
  { id: "g3", category: "Travel", caption: "Departures, 05:40", image: img("An empty airport terminal before sunrise", "terminal", "aerial") },
  { id: "g4", category: "Destinations", caption: "Alpine passes", tall: true, image: img("Snow-covered peaks above a valley", "alpine", "peaks") },
  { id: "g5", category: "Hotels", caption: "Caldera terrace, Santorini", image: img("A hotel terrace overlooking the caldera", "aegean", "coast") },
  { id: "g6", category: "Cities", caption: "Dubai after dark", image: img("The Dubai skyline lit at night", "gulf", "city") },
  { id: "g7", category: "Travel", caption: "Somewhere over the Alps", tall: true, image: img("A view of mountains from an aircraft window", "altitude", "aerial") },
  { id: "g8", category: "Destinations", caption: "The Nile valley", image: img("Desert dunes beside the Nile", "nile", "desert") },
  { id: "g9", category: "Beaches", caption: "Red Sea mornings", image: img("Calm sea and empty sand at sunrise", "nile", "coast") },
  { id: "g10", category: "Hotels", caption: "Poolside, off season", tall: true, image: img("A quiet resort pool surrounded by planting", "tropic", "coast") },
  { id: "g11", category: "Cities", caption: "Barcelona rooftops", image: img("Terracotta rooftops in evening light", "catalan", "city") },
  { id: "g12", category: "Destinations", caption: "Rice terraces, Bali", image: img("Green terraced hillsides in morning mist", "tropic", "tropic") },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((g) => g.category))),
] as const;
