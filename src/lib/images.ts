import type { Composition, PaletteName } from "./art";

/**
 * Every image on the site is described by one of these.
 *
 * Leave `src` undefined and a generated cinematic plate is rendered
 * (see `components/media/Plate.tsx`). Set `src` — a file in /public or a
 * URL on a host allow-listed in `next.config.ts` — and `next/image` takes
 * over with no other change. See PHOTOGRAPHY.md.
 */
export type ImageRef = {
  /** Describes the photograph for screen readers and for whoever sources it. */
  alt: string;
  palette: PaletteName;
  composition: Composition;
  src?: string;
};

export function img(
  alt: string,
  palette: PaletteName,
  composition: Composition,
  src?: string,
): ImageRef {
  return { alt, palette, composition, src };
}
