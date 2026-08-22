"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Media } from "@/components/media/Media";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/section";


/** Slow, quiet, full-bleed. The emotional beat before the conversion push. */
export function TravelStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.03, 1.15]);

  return (
    <section
      ref={ref}
      className="grain vignette relative isolate flex min-h-[85vh] items-center overflow-hidden py-28"
    >
      <motion.div
        className="absolute inset-[-14%] -z-10"
        style={reduced ? undefined : { y, scale }}
      >
        <Media imageKey="story-plate" decorative sizes="100vw" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow mb-8">Every trip leaves something behind</p>
          </Reveal>

          <AnimatedText
            text={"Every Journey\nBecomes a Story."}
            className="display-xl text-[clamp(2.5rem,8vw,6rem)] text-paper"
          />

          <Reveal delay={0.14}>
            <p className="pretty mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-paper-dim sm:text-xl">
              Some trips are about discovering a new place. Others become
              memories you carry forever. Nisu Travel helps you create journeys
              worth remembering.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
