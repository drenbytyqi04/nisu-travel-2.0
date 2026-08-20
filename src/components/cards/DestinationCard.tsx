import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import type { Destination } from "@/content/destinations";
import { cn } from "@/lib/utils";

export function DestinationCard({
  destination,
  className,
  sizes = "(max-width: 768px) 82vw, 32vw",
}: {
  destination: Destination;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-plate border border-line bg-ink-2",
        className,
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Slow zoom on hover — transform only, so nothing reflows. */}
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]">
          <Media
            image={destination.image}
            artKey={`dest-${destination.slug}`}
            decorative
            sizes={sizes}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper/70">
            {destination.country}
          </span>
          <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-paper/80 backdrop-blur-sm">
            {destination.code}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6">
          {/* Title lifts slightly to make room for the CTA sliding up. */}
          <h3 className="font-display text-3xl text-paper transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {destination.name}
          </h3>
          <p className="pretty mt-2 line-clamp-2 text-sm leading-relaxed text-paper-dim">
            {destination.blurb}
          </p>

          <span className="mt-4 flex translate-y-3 items-center gap-2 text-sm font-medium text-jade opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            Explore Destination
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
