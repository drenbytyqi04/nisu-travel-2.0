import type { Composition, PaletteName } from "@/lib/art";

/**
 * NISU TRAVEL — Central image registry
 * ---------------------------------------------------------------
 * Every image on the site is declared here, once. This is the ONLY file you
 * edit to put real photography on the site.
 *
 * To add a photo, set `src` on its entry:
 *
 *   "dest-istanbul": {
 *     alt: "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
 *     palette: "bosphorus",
 *     composition: "city",
 *     src: "/photos/istanbul.jpg",        // ← a file in /public …
 *     // src: "https://cdn.example.com/istanbul.jpg",  … or a remote URL
 *   },
 *
 * `<Media>` then renders `next/image` (fill, responsive `sizes`, AVIF/WebP,
 * lazy loading) instead of the generated plate. Nothing else changes — the
 * same crops, hover zooms and gradients apply.
 *
 * Remote URLs need their host allow-listed in `next.config.ts` under
 * `images.remotePatterns`.
 *
 * The other fields stay useful after a photo is added:
 *   • `alt`         — written as a photo brief; it describes the shot to source,
 *                     and is what screen readers announce.
 *   • `palette` /   — keep the generated plate working as the fallback for any
 *     `composition`   entry that has no `src` yet.
 *
 * See PHOTOGRAPHY.md for the shot-list priority.
 */

export type ImageEntry = {
  /** Doubles as the photo brief and the screen-reader description. */
  alt: string;
  palette: PaletteName;
  composition: Composition;
  /** Set this to use a real photograph. Leave undefined for generated art. */
  src?: string;
};

/**
 * Builds an Unsplash CDN URL. `auto=format` serves AVIF/WebP where supported
 * and `fit=crop` keeps the aspect ratio the layout asks for.
 *
 * Unsplash photos are free to use under the Unsplash Licence. Replace these
 * with commissioned or licensed photography before a serious launch — they
 * are widely used and a premium brand benefits from imagery nobody else has.
 */
function unsplash(id: string, w = 2400, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  /* ---- Page & section backdrops ------------------------------------
     These are the full-bleed frames. Shoot or license these first.
  */
  "hero-departure": {
    alt: "An aircraft climbing above the cloud line into first light",
    palette: "altitude",
    composition: "aerial",
    src: unsplash("1436491865332-7a61a109cc05"),
  },
  "page-destinations": {
    alt: "A coastline seen from the air at golden hour",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1507525428034-b723cf961d3e"),
  },
  "page-services": {
    alt: "An aircraft on the stand at first light",
    palette: "terminal",
    composition: "aerial",
    src: unsplash("1436491865332-7a61a109cc05"),
  },
  "page-packages": {
    alt: "A resort shoreline in late afternoon light",
    palette: "tropic",
    composition: "coast",
    src: unsplash("1520250497591-112f2f40a3f4"),
  },
  "page-about": {
    alt: "A city seen from the air on final approach",
    palette: "rhine",
    composition: "city",
    src: unsplash("1502602898657-3e91760cbb34"),
  },
  "page-inspiration": {
    alt: "An open landscape at the start of a journey",
    palette: "alpine",
    composition: "peaks",
    src: unsplash("1464822759023-fed622ff2c3b"),
  },
  "page-gallery": {
    alt: "A wide coastal panorama at sunset",
    palette: "bosphorus",
    composition: "coast",
    src: unsplash("1470071459604-3b5ec3a7fe05"),
  },
  "page-contact": {
    alt: "Evening light over a harbour city",
    palette: "catalan",
    composition: "city",
    src: unsplash("1493246507139-91e8fad9978e"),
  },
  "page-request": {
    alt: "A runway stretching towards first light",
    palette: "jade",
    composition: "aerial",
    src: unsplash("1517400508447-f8dd518b86db"),
  },
  "experience-primary": {
    alt: "A wide coastline seen from the air in morning light",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1519046904884-53103b34b206"),
  },
  "experience-secondary": {
    alt: "A quiet hotel terrace before the day begins",
    palette: "tropic",
    composition: "tropic",
    src: unsplash("1571003123894-1f0594d2b5d9"),
  },
  "story-plate": {
    alt: "A wide empty coastline at the end of the day",
    palette: "bosphorus",
    composition: "coast",
    src: unsplash("1473116763249-2faaef81ccda"),
  },
  "cta-runway": {
    alt: "A runway at first light before departure",
    palette: "jade",
    composition: "aerial",
    src: unsplash("1544620347-c4fd4a3d5957"),
  },
  "about-plate": {
    alt: "An aircraft on approach over a European city at dusk",
    palette: "rhine",
    composition: "city",
    src: unsplash("1449824913935-59a10b8d2000"),
  },

  /* ---- Destinations ------------------------------------------------
     Also used for the featured full-bleed showcase and the mobile menu backdrop.
  */
  "dest-istanbul": {
    alt: "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
    palette: "bosphorus",
    composition: "city",
    src: unsplash("1541432901042-2d8bd64b4a9b"),
  },
  "dest-dubai": {
    alt: "Amber dusk over the Dubai skyline seen from the desert",
    palette: "gulf",
    composition: "city",
    src: unsplash("1512453979798-5ea266f8880c"),
  },
  "dest-santorini": {
    alt: "Whitewashed caldera villages above the Aegean, Santorini",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1613395877344-13d4a8e0d49e"),
  },
  "dest-bali": {
    alt: "Terraced green hillsides in humid morning light, Bali",
    palette: "tropic",
    composition: "tropic",
    src: unsplash("1537996194471-e657df975ab4"),
  },
  "dest-barcelona": {
    alt: "Terracotta rooftops and Mediterranean light, Barcelona",
    palette: "catalan",
    composition: "city",
    src: unsplash("1583422409516-2895a77efded"),
  },
  "dest-egypt": {
    alt: "Desert dunes and the Nile valley in late gold light, Egypt",
    palette: "nile",
    composition: "desert",
    src: unsplash("1539650116574-75c0c6d73f6e"),
  },
  "dest-switzerland": {
    alt: "Snow-lit alpine peaks above a cold blue valley, Switzerland",
    palette: "alpine",
    composition: "peaks",
    src: unsplash("1531210483974-4f8c1f33fd35"),
  },
  "dest-germany": {
    alt: "Cool northern light over a river city, Germany",
    palette: "rhine",
    composition: "city",
    src: unsplash("1527668752968-14dc70a27c95"),
  },

  /* ---- Services ----------------------------------------------------
  */
  "svc-flights": {
    alt: "An aircraft climbing away from the runway at dawn",
    palette: "altitude",
    composition: "aerial",
    src: unsplash("1517400508447-f8dd518b86db"),
  },
  "svc-hotels": {
    alt: "A lit hotel terrace overlooking the water at night",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1566073771259-6a8506099945"),
  },
  "svc-packages": {
    alt: "Loungers and palms on a quiet beach in late afternoon",
    palette: "tropic",
    composition: "coast",
    src: unsplash("1507525428034-b723cf961d3e"),
  },
  "svc-transfers": {
    alt: "Headlights on an airport approach road after dark",
    palette: "terminal",
    composition: "city",
    src: unsplash("1449965408869-eaa3f722e40d"),
  },
  "svc-itineraries": {
    alt: "A coastal road winding between headlands",
    palette: "catalan",
    composition: "coast",
    src: unsplash("1469854523086-cc02fe5d8800"),
  },
  "svc-groups": {
    alt: "A group boarding a coach beside a terminal building",
    palette: "terminal",
    composition: "city",
    src: unsplash("1517457373958-b7bdd4587205"),
  },
  "svc-families": {
    alt: "Shallow warm sea and open sand in the morning",
    palette: "nile",
    composition: "coast",
    src: unsplash("1602002418082-a4443e081dd1"),
  },
  "svc-couples": {
    alt: "A caldera-view terrace at sunset",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1518621736915-f3b1c41bfd00"),
  },
  "svc-diaspora": {
    alt: "A river city under cool northern cloud",
    palette: "rhine",
    composition: "city",
    src: unsplash("1467269204594-9661b134dd2b"),
  },
  "svc-business": {
    alt: "An empty departure gate early in the morning",
    palette: "terminal",
    composition: "aerial",
    src: unsplash("1436491865332-7a61a109cc05"),
  },

  /* ---- Packages ----------------------------------------------------
  */
  "pkg-summer-holidays": {
    alt: "Open sea and sand under strong summer light",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1507525428034-b723cf961d3e"),
  },
  "pkg-city-breaks": {
    alt: "Warm city rooftops at the end of the day",
    palette: "catalan",
    composition: "city",
    src: unsplash("1502602898657-3e91760cbb34"),
  },
  "pkg-beach-holidays": {
    alt: "A long empty shoreline in the early morning",
    palette: "nile",
    composition: "coast",
    src: unsplash("1519046904884-53103b34b206"),
  },
  "pkg-luxury-getaways": {
    alt: "A private terrace above the water at dusk",
    palette: "gulf",
    composition: "coast",
    src: unsplash("1566073771259-6a8506099945"),
  },
  "pkg-family-holidays": {
    alt: "Shallow calm water beside a resort garden",
    palette: "tropic",
    composition: "coast",
    src: unsplash("1602002418082-a4443e081dd1"),
  },
  "pkg-romantic-escapes": {
    alt: "Two chairs facing a caldera at sunset",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1518621736915-f3b1c41bfd00"),
  },
  "pkg-winter-trips": {
    alt: "Snow-covered peaks under a cold clear sky",
    palette: "alpine",
    composition: "peaks",
    src: unsplash("1551524559-8af4e6624178"),
  },
  "pkg-weekend-getaways": {
    alt: "A city skyline seen from the air on approach",
    palette: "bosphorus",
    composition: "city",
    src: unsplash("1493246507139-91e8fad9978e"),
  },

  /* ---- Travel Inspiration articles ---------------------------------
  */
  "post-best-summer-destinations": {
    alt: "Summer coastline seen from above",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1507525428034-b723cf961d3e"),
  },
  "post-weekend-escapes-in-europe": {
    alt: "A compact European city centre at night",
    palette: "rhine",
    composition: "city",
    src: unsplash("1502602898657-3e91760cbb34"),
  },
  "post-what-to-pack": {
    alt: "Packed luggage in the light of an early departure",
    palette: "terminal",
    composition: "aerial",
    src: unsplash("1488646953014-85cb44e25828"),
  },
  "post-destinations-for-couples": {
    alt: "A quiet terrace above the sea at sunset",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1518621736915-f3b1c41bfd00"),
  },
  "post-family-holiday-ideas": {
    alt: "A resort pool and garden in the afternoon",
    palette: "tropic",
    composition: "coast",
    src: unsplash("1602002418082-a4443e081dd1"),
  },
  "post-diaspora-travel-tips": {
    alt: "A departure board and waiting travellers",
    palette: "terminal",
    composition: "city",
    src: unsplash("1449965408869-eaa3f722e40d"),
  },

  /* ---- Gallery -----------------------------------------------------
  */
  "gal-g1": {
    alt: "The Istanbul skyline seen from a Bosphorus ferry",
    palette: "bosphorus",
    composition: "city",
    src: unsplash("1541432901042-2d8bd64b4a9b"),
  },
  "gal-g2": {
    alt: "Clear shallow water over pale sand",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1519046904884-53103b34b206"),
  },
  "gal-g3": {
    alt: "An empty airport terminal before sunrise",
    palette: "terminal",
    composition: "aerial",
    src: unsplash("1517400508447-f8dd518b86db"),
  },
  "gal-g4": {
    alt: "Snow-covered peaks above a valley",
    palette: "alpine",
    composition: "peaks",
    src: unsplash("1531210483974-4f8c1f33fd35"),
  },
  "gal-g5": {
    alt: "A hotel terrace overlooking the caldera",
    palette: "aegean",
    composition: "coast",
    src: unsplash("1613395877344-13d4a8e0d49e"),
  },
  "gal-g6": {
    alt: "The Dubai skyline lit at night",
    palette: "gulf",
    composition: "city",
    src: unsplash("1512453979798-5ea266f8880c"),
  },
  "gal-g7": {
    alt: "A view of mountains from an aircraft window",
    palette: "altitude",
    composition: "aerial",
    src: unsplash("1467269204594-9661b134dd2b"),
  },
  "gal-g8": {
    alt: "Desert dunes beside the Nile",
    palette: "nile",
    composition: "desert",
    src: unsplash("1539650116574-75c0c6d73f6e"),
  },
  "gal-g9": {
    alt: "Calm sea and empty sand at sunrise",
    palette: "nile",
    composition: "coast",
    src: unsplash("1473116763249-2faaef81ccda"),
  },
  "gal-g10": {
    alt: "A quiet resort pool surrounded by planting",
    palette: "tropic",
    composition: "coast",
    src: unsplash("1566073771259-6a8506099945"),
  },
  "gal-g11": {
    alt: "Terracotta rooftops in evening light",
    palette: "catalan",
    composition: "city",
    src: unsplash("1583422409516-2895a77efded"),
  },
  "gal-g12": {
    alt: "Green terraced hillsides in morning mist",
    palette: "tropic",
    composition: "tropic",
    src: unsplash("1537996194471-e657df975ab4"),
  },

} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;

export function getImage(key: ImageKey): ImageEntry {
  return images[key];
}

/** How many images still need real photography. Used by `npm run photos`. */
export function missingPhotos(): ImageKey[] {
  return (Object.keys(images) as ImageKey[]).filter((k) => !images[k].src);
}
