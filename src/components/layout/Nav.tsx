"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Media } from "@/components/media/Media";
import type { ImageKey } from "@/data/images";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Button } from "@/components/ui/button";
import { nav } from "@/content/site.config";
import { featuredDestinations } from "@/content/destinations";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const menuArt = featuredDestinations[0];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-jade focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "glass border-b"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8"
        >
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2"
            aria-label="Nisu Travel — home"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-paper">
              NISU
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-jade transition-colors duration-300 group-hover:text-jade-glow">
              Travel
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active ? "text-paper" : "text-paper-dim hover:text-paper",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-jade"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/request">Plan Your Trip</Link>
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-colors duration-300 hover:border-jade hover:text-jade lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed inset-0 z-[70] overflow-y-auto bg-ink focus:outline-none">
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Site navigation and contact options
                  </Dialog.Description>

                  {/* Destination art behind the menu, heavily graded down. */}
                  <div className="pointer-events-none absolute inset-0 opacity-40">
                    <Media
                      imageKey={`dest-${menuArt.slug}` as ImageKey}
                      decorative
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
                  </div>

                  <div className="relative flex min-h-dvh flex-col px-5 pb-10 pt-6 sm:px-8">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold text-paper">
                        NISU <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-jade">Travel</span>
                      </span>
                      <Dialog.Close asChild>
                        <button
                          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper"
                          aria-label="Close menu"
                        >
                          <X className="size-5" aria-hidden="true" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <ul className="mt-14 flex flex-col gap-1">
                      {nav.map((item, i) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.06 + i * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-baseline justify-between border-b border-line py-4 font-display text-4xl text-paper transition-colors duration-300 hover:text-jade sm:text-5xl"
                          >
                            {item.label}
                            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-paper-faint">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-3 pt-12">
                      <Button asChild size="lg" className="w-full">
                        <Link href="/request">
                          Request a Trip
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </Button>
                      <WhatsAppLink size="lg" className="w-full" />
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </nav>
      </header>
    </>
  );
}
