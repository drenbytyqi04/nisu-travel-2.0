"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PackageCard } from "@/components/cards/PackageCard";
import { Container, Section } from "@/components/ui/section";
import { packageTypes, packages } from "@/content/packages";
import { cn } from "@/lib/utils";

export function PackagesIndex() {
  const [type, setType] = useState("All");
  const list = type === "All" ? packages : packages.filter((p) => p.type === type);

  return (
    <Section>
      <Container>
        <h2 className="sr-only">All travel packages</h2>
        <div
          role="group"
          aria-label="Filter packages by travel type"
          className="no-scrollbar rail-fade flex gap-2 overflow-x-auto pb-1"
        >
          {["All", ...packageTypes].map((option) => {
            const active = type === option;
            return (
              <button
                key={option}
                onClick={() => setType(option)}
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
          {list.length} {list.length === 1 ? "package" : "packages"}
        </p>

        <motion.ul layout className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((item) => (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <PackageCard item={item} className="h-full" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="pretty mt-12 max-w-2xl text-sm leading-relaxed text-paper-faint">
          Prices are not shown because fares and hotel rates move constantly.
          Send us your dates and we will come back with real options and real
          numbers, in writing.
        </p>
      </Container>
    </Section>
  );
}
