"use client";

import { motion } from "framer-motion";
import { useRef, type ElementType } from "react";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Use "\n" to force a line break. Each line masks and rises independently. */
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Slower, heavier feel for hero-scale type. */
  duration?: number;
};

/**
 * Line-by-line clip reveal.
 *
 * The full string stays in the accessibility tree as one label, so screen
 * readers never hear it letter-shredded.
 *
 * Two details matter here:
 *
 * 1. Reveal state comes from `useReveal` on the *static* wrapper, never from
 *    `whileInView` on the span that moves — a translated child of an
 *    `overflow-hidden` parent is clipped out of its own intersection rect, so
 *    observing it would deadlock.
 *
 * 2. Both motion modes share one DOM structure and one final state
 *    (`y: 0, opacity: 1`). Reduced motion only drops the travel. That means
 *    switching mode mid-animation can never strand a line half-revealed.
 */
export function AnimatedText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  duration = 0.9,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useReveal(ref);
  const lines = text.split("\n");

  return (
    <Tag className={cn(className)} aria-label={text.replace(/\n/g, " ")}>
      <span ref={ref} className="block">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
            <motion.span
              className="block"
              initial={{ y: "110%", opacity: 0 }}
              animate={
                shown
                  ? { y: "0%", opacity: 1 }
                  : { y: reduced ? "0%" : "110%", opacity: 0 }
              }
              transition={{
                duration: reduced ? 0.5 : duration,
                delay: delay + i * (reduced ? 0.06 : 0.09),
                ease: reduced ? "easeOut" : [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
