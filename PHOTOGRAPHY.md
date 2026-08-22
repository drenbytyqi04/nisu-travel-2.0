# Photography

## Where photos live

**Every image on the site is declared in one file: `src/data/images.ts`.**

58 entries, each shaped like this:

```ts
"dest-istanbul": {
  alt: "Minarets and ferry traffic on the Bosphorus at dusk, Istanbul",
  palette: "bosphorus",
  composition: "city",
  src: unsplash("1541432901042-2d8bd64b4a9b"),
},
```

- **`src`** — the photograph. An Unsplash URL today; can be a file in `/public`
  (`"/photos/istanbul.jpg"`) or any host allow-listed in `next.config.ts`.
- **`alt`** — doubles as the photo brief and the screen-reader description.
  If you commission photography, this is your shot list.
- **`palette` / `composition`** — keep the generated plate working as a
  fallback for that entry.

Nothing else in the codebase references an image. Change this file and the
whole site follows.

## ⚠️ The current Unsplash IDs are unverified

They were assigned in a build environment where **Unsplash is blocked at the
network level**, so no URL could be fetched, opened or checked. The IDs are
best guesses: some may 404, and some may show a different subject than the
`alt` text describes.

Two things make this safe rather than broken:

**1. Automatic fallback.** If a photo fails to load — 404, rate limit, offline
— `components/media/Photo.tsx` swaps in that entry's generated plate. Same
dimensions, so there is no layout shift, and a visitor never sees a broken
image.

**2. A checker.** On any normal network:

```bash
npm run photos:check
```

It requests all 58 URLs and prints an `ok` / `FAIL` line per entry, with the
photo ID for anything that failed. Fix those IDs in `src/data/images.ts`.

The checker only proves a URL *resolves*. It cannot tell you the photo shows
the right place — for that, open the site and look. Wrong-but-loading photos
are the failure mode to watch for.

## Replacing a photo

Find a photo on [unsplash.com](https://unsplash.com), copy the ID from its URL
(`unsplash.com/photos/some-slug-XXXXXXXXXXX` → the download URL contains
`photo-<id>`), and set it:

```ts
src: unsplash("1541432901042-2d8bd64b4a9b"),
```

Or use your own file:

```ts
src: "/photos/istanbul.jpg",   // → public/photos/istanbul.jpg
```

For a remote host other than Unsplash, add it to `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }],
}
```

## Licensing

Unsplash photos are free to use commercially under the
[Unsplash Licence](https://unsplash.com/license), with no attribution
required. They are also very widely used — a premium travel brand benefits
from imagery competitors do not also have. Treat these as a strong
placeholder, and commission or licence properly before a serious launch.

## Shot list priority

If budget covers only a few, these are the full-bleed, above-the-fold frames:

1. `hero-departure` — aircraft climbing above the cloud line at first light
2. `dest-istanbul`, `dest-dubai`, `dest-santorini`, `dest-bali` — the four
   featured destinations, each shown full screen
3. `story-plate` — a wide, quiet coastline at the end of the day
4. `cta-runway` — a runway at first light

## Registry groups

| Prefix | Count | Used by |
|---|---|---|
| `hero-`, `page-`, `experience-`, `story-`, `cta-`, `about-` | 14 | Section and page backdrops |
| `dest-` | 8 | Destination cards, detail pages, featured showcase, mobile menu |
| `svc-` | 10 | Service cards |
| `pkg-` | 8 | Package cards |
| `post-` | 6 | Article cards and article pages |
| `gal-` | 12 | Gallery grid and lightbox |

## The generated art system

Palettes and compositions live in `src/lib/art.ts`.

**Palettes:** `bosphorus`, `gulf`, `aegean`, `tropic`, `alpine`, `nile`,
`catalan`, `rhine`, `jade`, `altitude`, `terminal`

**Compositions:** `coast`, `peaks`, `city`, `desert`, `tropic`, `aerial`

Plates are deterministic — the same registry key always produces the same
image, so a destination looks identical on its card and its detail page.
