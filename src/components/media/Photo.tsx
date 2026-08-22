"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A photograph that degrades to generated art.
 *
 * If the remote image 404s, is rate-limited, or the network is unavailable,
 * `onError` swaps in the `fallback` plate. A visitor never sees a broken
 * image icon or an empty frame — the layout is identical either way, so
 * there is no shift when it happens.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Server-rendered plate, passed down as JSX. */
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
