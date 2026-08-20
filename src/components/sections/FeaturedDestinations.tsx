"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Media } from "@/components/media/Media";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/section";
import { featuredDestinations, type Destination } from "@/content/destinations";

/**
 * Full-bleed cinematic showcase. Each destination gets its own frame; the
 * plate drifts behind fixed type as the frame passes, which is what gives
 * the transition between places its cut-to-cut feel.
 */
function Frame({ destination, index }: { destination: Destination; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={ref}
      aria-labelledby={`featured-${destination.slug}`}
      className="grain relative isolate flex min-h-[88vh] items-end overflow-hidden border-t border-line py-20 sm:min-h-dvh"
    >
      <motion.div
        className="absolute inset-[-10%] -z-10"
        style={reduced ? undefined : { y, scale }}
      >
        <Media
          image={destination.image}
          artKey={`featured-${destination.slug}`}
          decorative
          sizes="100vw"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
      />

      <Container>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-jade">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span>{destination.country}</span>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span className="tnum">{destination.coords}</span>
              </p>
            </Reveal>

            <AnimatedText
              as="h3"
              text={destination.name.toUpperCase()}
              className="display-xl mt-6 text-[clamp(3rem,12vw,9rem)] text-paper"
            />

            <Reveal delay={0.1}>
              <p className="balance mt-5 max-w-xl font-display text-xl leading-snug text-paper-dim sm:text-2xl">
                {destination.line}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                href={`/destinations/${destination.slug}`}
                className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-paper px-7 text-sm font-medium text-ink transition-colors duration-300 hover:bg-jade"
              >
                Explore Trip
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden shrink-0 sm:block">
            <span className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-paper/10">
              {destination.code}
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function FeaturedDestinations() {
  return (
    <div id="featured">
      <Container className="pt-24 sm:pt-32">
        <p className="eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
          Featured — four places worth the flight
        </p>
      </Container>
      {featuredDestinations.map((destination, i) => (
        <Frame key={destination.slug} destination={destination} index={i} />
      ))}
    </div>
  );
}
