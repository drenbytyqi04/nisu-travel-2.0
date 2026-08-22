import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import type { ImageKey } from "@/data/images";
import type { TravelPackage } from "@/content/packages";
import { cn } from "@/lib/utils";

export function PackageCard({
  item,
  className,
}: {
  item: TravelPackage;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-plate border border-line bg-ink-2",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]">
          <Media
            imageKey={`pkg-${item.slug}` as ImageKey}
            decorative
            sizes="(max-width: 768px) 92vw, 44vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent"
        />
        <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-ink/50 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
          {item.type}
        </span>
      </div>

      <div className="p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl text-paper">{item.title}</h3>
          <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.15em] text-paper-faint">
            {item.duration}
          </span>
        </div>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-jade">
          {item.destinations}
        </p>
        <p className="pretty mt-4 text-sm leading-relaxed text-paper-dim">
          {item.description}
        </p>

        {/* No price: fares move constantly, so the CTA asks rather than claims. */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={`/request?package=${item.slug}`}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-jade px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-jade-glow"
          >
            Request Offer
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/packages"
            className="inline-flex h-11 items-center px-2 text-sm text-paper-dim transition-colors duration-300 hover:text-paper"
          >
            Discover Package
          </Link>
        </div>
      </div>
    </article>
  );
}
