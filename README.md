# Nisu Travel

Marketing site for **Nisu Travel**, a travel agency in Prishtina, Kosovo.

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

---

## Start here: `src/content/site.config.ts`

Every business-specific value lives in one file. **Nothing else needs editing to
launch.**

| Field | What it switches on |
|---|---|
| `contact.whatsapp` | Every WhatsApp CTA — floating button, sticky mobile bar, hero, contact, form |
| `contact.phone` | Phone links in footer and contact block |
| `contact.email` | Email links in footer and contact block |
| `contact.mapsEmbedUrl` | Replaces the map placeholder with the live map |
| `contact.street` | Adds street to the address and to schema.org |
| `social.*` | Instagram / Facebook / TikTok buttons |
| `stats` | The four headline numbers (`enabled: false` removes the section) |
| `reviews` | Aggregate score above the testimonial slider |
| `site.url` | Canonical URLs, sitemap, Open Graph |

**Values left empty are not invented.** A missing WhatsApp number means the
WhatsApp buttons do not render at all, rather than linking somewhere wrong. Fill
the value in and they appear. This applies to phone, email, address, map and
social links.

### Not yet configured

These are deliberately blank because the real values were not supplied:

- `contact.phone`, `contact.whatsapp`, `contact.email`
- `contact.street`, `contact.mapsUrl`, `contact.mapsEmbedUrl`
- `social.instagram`, `social.facebook`, `social.tiktok`
- `site.url` — currently `https://nisutravel.com`, update to the real domain

---

## Content (CMS-ready)

`src/content/` holds typed arrays with the exact shape a headless CMS would
return. Swap any array for a `fetch` and every listing, detail page, filter and
sitemap entry follows automatically.

| File | Drives |
|---|---|
| `destinations.ts` | `/destinations`, `/destinations/[slug]`, home rail, featured showcase, form autocomplete |
| `services.ts` | `/services`, home services grid |
| `packages.ts` | `/packages`, home packages, `?package=` prefill |
| `posts.ts` | `/inspiration`, `/inspiration/[slug]` |
| `testimonials.ts` | Testimonial slider |
| `gallery.ts` | `/gallery` and home gallery |

Filter chips (`destinationTags`, `packageTypes`, `galleryCategories`) are derived
from the data — add an item and its filter appears.

**Prices are deliberately absent.** Fares and hotel rates move constantly, so
every package ends in *Request Offer*. Testimonials are placeholders with real
structure; replace them with genuine reviews before launch.

---

## The trip request form

`/request` and `/contact` share `TripRequestForm`. Validation runs on blur, a
linked error summary takes focus after a failed submit, and success shows the
confirmation panel.

⚠️ **`POST /api/trip-request` does not deliver anywhere yet.** It validates and
returns 200, but no email provider, inbox or CRM has been wired up — see the
TODO block in `src/app/api/trip-request/route.ts`. Add Resend, Nodemailer or a
webhook there.

Until then, **the working conversion path is WhatsApp**: the form's *Send on
WhatsApp instead* button composes the whole enquiry into a pre-filled message
and needs no backend at all. It appears as soon as `contact.whatsapp` is set.

---

## Imagery

All 58 images are declared in **one file**: `src/data/images.ts`. That registry
is the only place you edit to change photography.

Each entry carries a photo `src` (currently an Unsplash URL), an `alt` written
as a photo brief, and a `palette`/`composition` pair that keeps a generated
plate available as the fallback.

```bash
npm run photos:check   # verifies every photo URL resolves
```

⚠️ **The Unsplash IDs have not been verified.** They were assigned in an
environment where Unsplash is unreachable, so the subject of each photo is a
best guess. Run `npm run photos:check` on a normal network — it lists any entry
whose URL does not resolve — and open the site to check that each photo shows
what its `alt` text describes.

Anything that fails to load falls back automatically to its generated plate
(see `components/media/Photo.tsx`), so a wrong ID degrades gracefully instead
of showing a broken image.

See [PHOTOGRAPHY.md](./PHOTOGRAPHY.md) for the full detail.

---

## Architecture

```
src/
  app/            routes, sitemap.ts, robots.ts, opengraph-image.tsx, api/
  components/
    layout/       nav, footer, smooth scroll, scroll progress, WhatsApp CTAs
    motion/       Reveal, AnimatedText, Counter, Parallax, Magnetic
    media/        Media (registry lookup), Photo (with fallback), Plate (art)
    sections/     one file per page section
    cards/        destination, service, package, post
    ui/           button, form fields, section scaffolding
  content/        site.config.ts + typed content arrays
  data/           images.ts — the central image registry (all 58 images)
  lib/            art engine, SEO/schema helpers, utils
```

## Motion

- **Framer Motion** — reveals, staggers, counters, parallax, page transitions
- **GSAP + ScrollTrigger** — the pinned horizontal destinations rail (the only
  pinned section on the page, per the perf/UX guidance)
- **Lenis** — smooth scroll, fully disabled under `prefers-reduced-motion`

Every animation collapses under `prefers-reduced-motion`, and all content is
present in the DOM and readable without JavaScript.

## Accessibility & performance notes

- Skip link, visible 2px focus rings, one `h1` per page, no heading-level skips
- All touch targets ≥ 44px; 16px minimum input text (no iOS zoom)
- Native `<select>` and `<input type="date">` for correct mobile pickers
- Gallery lightbox and mobile menu use Radix Dialog (focus trap + Escape)
- Testimonial auto-advance pauses on hover and focus
- Photos are lazy-loaded and served as AVIF/WebP via `next/image`; the plate
  fallback is inline SVG, so neither path causes layout shift
- Fonts self-hosted via `next/font` with `display: swap`
