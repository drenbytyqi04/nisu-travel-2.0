"use client";

import { motion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled. Kept small so it reads as a fade, not a slide. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

/**
 * The workhorse scroll reveal. Content is present in the DOM and readable
 * without JS — only opacity/transform animate, so crawlers and reduced-motion
 * users get the final state immediately.
 *
 * Under reduced motion the travel is dropped but the fade stays: a cross-fade
 * carries no vestibular risk, and a page where nothing at all resolves reads
 * as broken rather than calm.
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.4 : 0.65, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its `StaggerItem` children. */
export function Stagger({
  children,
  className,
  gap = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of `Stagger`. Inherits the parent's timing. */
export function StaggerItem({
  children,
  className,
  y = 20,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
