"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Media } from "@/components/media/Media";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { stats } from "@/content/site.config";


export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The frame drifts and dims as you leave it — a slow camera pull-back.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-dvh flex-col justify-end overflow-hidden pb-10 pt-32 sm:pb-16"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y, scale }}
      >
        <Media imageKey="hero-departure" priority decorative sizes="100vw" />
      </motion.div>

      {/* Cinematic grade: dark at the base so type always clears contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/45 via-ink/15 to-ink"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent"
      />

      <Container>
        <motion.p
          className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-jade">Nisu Travel</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          <span>Travel · Discover · Experience</span>
        </motion.p>

        <h1 className="display-xl mt-7 max-w-4xl text-[clamp(2.75rem,9vw,7rem)] text-paper">
          {["Your Journey", "Starts Here."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.1,
                  delay: 0.28 + i * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="pretty mt-8 max-w-xl text-lg leading-relaxed text-paper-dim sm:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Flights, hotels and unforgettable travel experiences — carefully
          planned around you.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic>
            <Button asChild size="lg">
              <Link href="/destinations">
                Explore Destinations
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild variant="outline" size="lg">
            <Link href="/request">Request a Trip</Link>
          </Button>
          <WhatsAppLink size="lg" />
        </motion.div>

        {/* Statistics read as instrument data, in mono, on a hairline rail. */}
        {stats.enabled && (
          <motion.dl
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            {stats.items.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="tnum block font-display text-3xl text-paper sm:text-4xl">
                    {item.value}
                    {item.suffix}
                  </span>
                  <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-faint">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}

        <motion.div
          className="mt-14 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-jade"
          >
            <ArrowDown className="size-4" aria-hidden="true" />
          </motion.span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-paper-faint">
            Scroll to explore
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
