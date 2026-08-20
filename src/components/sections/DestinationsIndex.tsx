"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Container, Section } from "@/components/ui/section";
import { destinationTags, destinations } from "@/content/destinations";
import { cn } from "@/lib/utils";

export function DestinationsIndex() {
  const [tag, setTag] = useState<string>("All");
  const list =
    tag === "All"
      ? destinations
      : destinations.filter((d) => d.bestFor.includes(tag));

  return (
    <Section>
      <Container>
        <h2 className="sr-only">All destinations</h2>
        <div
          role="group"
          aria-label="Filter destinations"
          className="no-scrollbar rail-fade flex gap-2 overflow-x-auto pb-1"
        >
          {["All", ...destinationTags].map((option) => {
            const active = tag === option;
            return (
              <button
                key={option}
                onClick={() => setTag(option)}
                aria-pressed={active}
                className={cn(
                  "h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm transition-colors duration-300",
                  active
                    ? "border-jade bg-jade text-ink"
                    : "border-line text-paper-dim hover:border-line-strong hover:text-paper",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        <p className="tnum mt-6 font-mono text-xs text-paper-faint" aria-live="polite">
          {list.length} {list.length === 1 ? "destination" : "destinations"}
        </p>

        <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((destination) => (
              <motion.li
                key={destination.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <DestinationCard destination={destination} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </Section>
  );
}
