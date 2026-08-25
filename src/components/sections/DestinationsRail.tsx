"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { destinations } from "@/content/destinations";
import { useReducedMotion } from "@/components/motion/MotionPreference";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: the section pins and the rail scrubs horizontally.
 * Mobile: a plain scroll-snap carousel — native momentum beats a pinned
 * section on touch, and it costs no JavaScript at all.
 *
 * This is the only pinned section on the page, by design.
 */
export function DestinationsRail() {
  const section = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // The pin is large-scale movement, so it stays off under reduced motion —
    // the rail degrades to the same scroll-snap carousel mobile uses.
    if (reduced) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: "(min-width: 1024px)" },
        () => {
          const track = rail.current;
          const wrapper = section.current;
          if (!track || !wrapper) return;

          const distance = () => track.scrollWidth - window.innerWidth + 96;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              // Pin length follows content width, so the scrub never runs out.
              end: () => `+=${distance()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => tween.kill();
        },
      );
    }, section);

    // Fonts and generated art settle after first paint; re-measure once.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <div ref={section} className="relative">
      <Section id="destinations" bleed className="lg:flex lg:min-h-dvh lg:flex-col lg:justify-center">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Destinations"
              title="Where Will You Go Next?"
              intro="Eight places we book constantly, and know well enough to tell you when they are not the right choice."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/destinations">
                All Destinations
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>

        <div className="mt-14 overflow-hidden">
          <div
            ref={rail}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:overflow-visible lg:pb-0"
          >
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
                className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[26rem]"
              />
            ))}

            {/* End card closes the rail rather than letting it trail off. */}
            <Link
              href="/request"
              className="group flex w-[78vw] shrink-0 snap-start flex-col justify-end rounded-plate border border-dashed border-line-strong p-8 transition-colors duration-500 hover:border-jade sm:w-[46vw] lg:w-[22rem]"
            >
              <p className="eyebrow">Somewhere else?</p>
              <p className="mt-4 font-display text-3xl text-paper">
                Tell us where.
              </p>
              <p className="pretty mt-3 text-sm leading-relaxed text-paper-dim">
                These are the places we are asked for most — not a limit. If it
                has an airport, we can plan it.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-jade">
                Request a Trip
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <Container>
          <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint lg:hidden">
            Swipe to explore →
          </p>
        </Container>
      </Section>
    </div>
  );
}
