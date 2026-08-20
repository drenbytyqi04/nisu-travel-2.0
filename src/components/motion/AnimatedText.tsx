"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

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
 * Line-by-line clip reveal. The full string stays in the accessibility tree
 * as one label, so screen readers never hear it letter-shredded.
 *
 * The viewport observer is attached to the *static* clipping span, never to
 * the span that moves: a translated child of an `overflow-hidden` parent is
 * clipped out of its own intersection rect, so observing it would deadlock —
 * it can never become visible, so it can never be told to animate in.
 */
export function AnimatedText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  duration = 0.9,
}: Props) {
  const reduced = useReducedMotion();
  const lines = text.split("\n");

  if (reduced) {
    return (
      <Tag className={cn(className)}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.08em]"
          aria-hidden="true"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          variants={{ hidden: {}, show: {} }}
          transition={{
            duration,
            delay: delay + i * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{
              duration,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
