"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Media } from "@/components/media/Media";
import type { ImageKey } from "@/data/images";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { galleryCategories, galleryItems } from "@/content/gallery";
import { cn } from "@/lib/utils";

export function Gallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = galleryItems
    .filter((item) => filter === "All" || item.category === filter)
    .slice(0, limit);

  const step = useCallback(
    (delta: number) => {
      setOpen((current) => {
        if (current === null) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  // Arrow keys drive the lightbox; Radix already handles Escape and focus.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const active = open !== null ? visible[open] : null;

  return (
    <Section id="gallery">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Places We Send People."
          intro="A working archive rather than a brochure — the light, the water and the terminals in between."
        />

        <Reveal>
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="no-scrollbar rail-fade mt-12 flex gap-2 overflow-x-auto pb-1"
          >
            {galleryCategories.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setFilter(category);
                    setOpen(null);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm transition-colors duration-300",
                    active
                      ? "border-jade bg-jade text-ink"
                      : "border-line text-paper-dim hover:border-line-strong hover:text-paper",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Masonry via dense grid: tall items claim two rows. */}
        <motion.ul
          layout
          className="mt-10 grid auto-rows-[13rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[15rem] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(item.tall && "row-span-2")}
              >
                <button
                  onClick={() => setOpen(i)}
                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-card border border-line text-left"
                >
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]">
                    <Media
                      imageKey={`gal-${item.id}` as ImageKey}
                      decorative
                      sizes="(max-width: 640px) 48vw, 25vw"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                    <span className="text-sm text-paper">{item.caption}</span>
                    <Expand
                      className="size-4 shrink-0 text-jade opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="sr-only">
                    Open “{item.caption}” full screen.
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md" />
          <Dialog.Content className="fixed inset-0 z-[80] flex flex-col p-4 focus:outline-none sm:p-8">
            <Dialog.Title className="sr-only">
              {active ? active.caption : "Gallery"}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              {active ? active.caption : ""}
            </Dialog.Description>

            <div className="flex items-center justify-between">
              <span className="tnum font-mono text-xs text-paper-faint">
                {open !== null ? String(open + 1).padStart(2, "0") : "00"} /{" "}
                {String(visible.length).padStart(2, "0")}
              </span>
              <Dialog.Close asChild>
                <button
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-jade hover:text-jade"
                  aria-label="Close"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            {active && (
              <figure className="relative mt-4 flex min-h-0 flex-1 flex-col">
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-plate border border-line">
                  <Media
                    imageKey={`gal-${active.id}` as ImageKey}
                    decorative
                    sizes="100vw"
                  />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-xl text-paper">{active.caption}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-jade">
                      {active.category}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-jade hover:text-jade"
                    >
                      <ArrowLeft className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next image"
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-jade hover:text-jade"
                    >
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </figcaption>
              </figure>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
}
