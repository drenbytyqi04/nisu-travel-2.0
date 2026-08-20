import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  bleed,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      // scroll-mt clears the fixed navbar when an anchor is targeted.
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-32 lg:py-40",
        bleed && "overflow-hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Section heading. The eyebrow carries a real index (a section marker),
 * not decoration — it tells you where you are in the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "centre";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "centre" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <AnimatedText
        as={as}
        text={title}
        className="display-xl text-[clamp(2.25rem,6vw,4.5rem)] text-paper"
      />
      {intro && (
        <Reveal delay={0.12}>
          <p className="pretty mt-7 max-w-2xl text-lg leading-relaxed text-paper-dim">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** The route-line divider: a dashed jade hairline, borrowed from a flight map. */
export function RouteDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-3 py-2", className)}
    >
      <span className="size-1.5 rounded-full bg-jade" />
      <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-jade)_0_10px,transparent_10px_20px)] opacity-50" />
      <span className="size-1.5 rounded-full bg-sky" />
    </div>
  );
}
