import Image from "next/image";
import { plateSpec } from "@/lib/art";
import type { ImageRef } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Plate } from "./Plate";

type Props = {
  image: ImageRef;
  /** Stable key for the generated art. Same key always yields the same plate. */
  artKey: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  route?: boolean;
  /** Decorative images sit behind their own caption or heading. */
  decorative?: boolean;
};

export function Media({
  image,
  artKey,
  className,
  sizes = "100vw",
  priority,
  route,
  decorative,
}: Props) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        aria-hidden={decorative || undefined}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const spec = plateSpec(artKey, image.palette, image.composition);
  return (
    <div className={cn("absolute inset-0", className)}>
      <Plate {...spec} route={route} />
      {!decorative && <span className="sr-only">{image.alt}</span>}
    </div>
  );
}
