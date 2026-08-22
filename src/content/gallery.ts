
export type GalleryItem = {
  id: string;
  category: "Destinations" | "Hotels" | "Beaches" | "Cities" | "Travel";
  caption: string;
  /** Masonry weight: tall items span two rows on desktop. */
  tall?: boolean;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "Cities", caption: "Istanbul, from the water", tall: true },
  { id: "g2", category: "Beaches", caption: "The Aegean, early September" },
  { id: "g3", category: "Travel", caption: "Departures, 05:40" },
  { id: "g4", category: "Destinations", caption: "Alpine passes", tall: true },
  { id: "g5", category: "Hotels", caption: "Caldera terrace, Santorini" },
  { id: "g6", category: "Cities", caption: "Dubai after dark" },
  { id: "g7", category: "Travel", caption: "Somewhere over the Alps", tall: true },
  { id: "g8", category: "Destinations", caption: "The Nile valley" },
  { id: "g9", category: "Beaches", caption: "Red Sea mornings" },
  { id: "g10", category: "Hotels", caption: "Poolside, off season", tall: true },
  { id: "g11", category: "Cities", caption: "Barcelona rooftops" },
  { id: "g12", category: "Destinations", caption: "Rice terraces, Bali" },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((g) => g.category))),
] as const;
