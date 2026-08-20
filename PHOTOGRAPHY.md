# Photography

## What ships today

Every image on this site is **generated inline SVG artwork**, not a photograph.

Each destination has a palette sampled from the real light of that place —
Santorini's bleached Aegean blue, Dubai's amber desert dusk, Istanbul's
smoke-and-rose Bosphorus evening, Bali's humid green — composed into a layered
plate: sky gradient, low sun bloom, atmospheric haze bands, and two or three
depth layers of landform, skyline or dune, graded into the page's charcoal
ground.

**Why this rather than stock photography:** the environment this was built in
had no reachable image host, so no photograph could be fetched, licensed or
verified. Shipping unverified stock URLs risked broken images and wrong
subjects. The generated plates are self-contained, deterministic, grade
correctly against the dark theme, cost zero network requests, and cause no
layout shift.

They are a **legitimate visual system**, not grey placeholder boxes — but they
are not photography, and a premium travel brand should ultimately ship real
photographs.

## Swapping in real photography

One line per image. Find the `img(...)` call and add a fourth argument:

```ts
// src/content/destinations.ts — before
image: img(
  "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
  "bosphorus",
  "city",
),

// after
image: img(
  "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
  "bosphorus",
  "city",
  "/photos/istanbul.jpg",   // ← file in /public, or a remote URL
),
```

`Media` detects `src` and renders `next/image` (with `fill`, correct `sizes`,
AVIF/WebP and lazy loading) instead of the plate. Nothing else changes — the
same alt text, crops, hover zooms and gradients apply.

The first two arguments stay useful after the swap: the **alt text** is already
written as a photo brief (it describes the shot to source), and the **palette**
keeps the plate as a fallback.

### Remote images

Add the host to `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }],
}
```

`images.unsplash.com` is already allow-listed.

### Where the images live

| File | Images |
|---|---|
| `src/content/destinations.ts` | 8 destination photos (hero + cards + detail pages) |
| `src/content/services.ts` | 10 service card backgrounds |
| `src/content/packages.ts` | 8 package cards |
| `src/content/posts.ts` | 6 article images |
| `src/content/gallery.ts` | 12 gallery images |
| `src/components/sections/*.tsx` | Section backgrounds — inline `img(...)` calls in `Hero`, `TravelExperience`, `TravelStory`, `RequestCTA`, `AboutIntro`, and each page's `PageHero` |

### Shot list priority

If budget only covers a few, shoot or license these first — they are the
full-bleed, above-the-fold frames:

1. `Hero` — aircraft climbing above the cloud line at first light
2. The four featured destinations — Istanbul, Dubai, Santorini, Bali
3. `TravelStory` — a wide, quiet coastline at the end of the day
4. `RequestCTA` — a runway at first light

## Art system reference

Palettes and compositions live in `src/lib/art.ts`.

**Palettes:** `bosphorus`, `gulf`, `aegean`, `tropic`, `alpine`, `nile`,
`catalan`, `rhine`, `jade`, `altitude`, `terminal`

**Compositions:** `coast`, `peaks`, `city`, `desert`, `tropic`, `aerial`

Plates are deterministic — the same `artKey` always produces the same image, so
a destination card looks identical on the home page and its detail page.
