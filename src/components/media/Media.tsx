import { plateSpec } from "@/lib/art";
import { getImage, type ImageKey } from "@/data/images";
import { cn } from "@/lib/utils";
import { Photo } from "./Photo";
import { Plate } from "./Plate";

type Props = {
  /** Looks the image up in `src/data/images.ts` — the single registry. */
  imageKey: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  route?: boolean;
  /** Decorative images sit behind their own caption or heading. */
  decorative?: boolean;
};

/**
 * Renders the registry entry's photograph when it has a `src`, and the
 * generated plate when it does not — or when the photograph fails to load.
 */
export function Media({
  imageKey,
  className,
  sizes = "100vw",
  priority,
  route,
  decorative,
}: Props) {
  const image = getImage(imageKey);
  const spec = plateSpec(imageKey, image.palette, image.composition);

  const plate = (
    <div className={cn("absolute inset-0", className)}>
      <Plate {...spec} route={route} />
      {!decorative && <span className="sr-only">{image.alt}</span>}
    </div>
  );

  if (!image.src) return plate;

  return (
    <Photo
      src={image.src}
      alt={decorative ? "" : image.alt}
      sizes={sizes}
      priority={priority}
      className={className}
      fallback={plate}
    />
  );
}
