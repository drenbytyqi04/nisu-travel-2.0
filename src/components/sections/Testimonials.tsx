"use client";

import {AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/section";
import { testimonials } from "@/content/testimonials";
import { reviews } from "@/content/site.config";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((next: number) => {
    setDirection(next > 0 ? 1 : -1);
    setIndex((i) => (i + next + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance, but never while hovered, focused, or under reduced motion.
  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(() => go(1), 7000);
    return () => clearInterval(timer);
  }, [paused, reduced, go]);

  const current = testimonials[index];

  return (
    <Section id="testimonials" bleed>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
                Travellers
              </p>
            </Reveal>

            {reviews.enabled && (
              <Reveal delay={0.06}>
                <div className="flex items-baseline gap-4">
                  <span className="tnum font-display text-6xl text-paper">
                    {reviews.score}
                  </span>
                  <div>
                    <div className="flex gap-0.5" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-jade text-jade" />
                      ))}
                    </div>
                    <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-faint">
                      {reviews.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <p className="pretty mt-8 max-w-sm text-base leading-relaxed text-paper-dim">
                Reviews below are placeholders with real structure — replace the
                entries in{" "}
                <code className="wrap-anywhere font-mono text-xs text-jade">
                  content/testimonials.ts
                </code>{" "}
                with genuine ones and nothing else needs to change.
              </p>
            </Reveal>
          </div>

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Announce quietly; the slider must never steal focus. */}
            <div
              className="relative min-h-[19rem] sm:min-h-[16rem]"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={index}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <div className="flex gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-jade text-jade" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="balance mt-6 font-display text-2xl leading-snug text-paper sm:text-3xl">
                    “{current.quote}”
                  </p>
                  <footer className="mt-7">
                    <p className="text-sm font-medium text-paper">{current.author}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper-faint">
                      {current.context}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors duration-300 hover:border-jade hover:text-jade"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next review"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors duration-300 hover:border-jade hover:text-jade"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>

              <span className="tnum ml-auto font-mono text-xs text-paper-faint">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
