"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { AnimatedText } from "@/components/motion/AnimatedText";

/**
 * A route board, not a map.
 *
 * Positions are schematic — laid out to read clearly, and deliberately not
 * presented as a geographic projection. No specific flight numbers, carriers
 * or schedules are claimed anywhere here, because we have none.
 */
const ORIGIN = { x: 620, y: 360, label: "Prishtina", code: "PRN" };

const routes = [
  { x: 360, y: 128, label: "Germany", code: "DE", lift: 120 },
  { x: 330, y: 250, label: "Switzerland", code: "CH", lift: 86 },
  { x: 452, y: 206, label: "Austria", code: "AT", lift: 74 },
  { x: 402, y: 336, label: "Italy", code: "IT", lift: 58 },
  { x: 208, y: 232, label: "France", code: "FR", lift: 132 },
];

function arc(to: (typeof routes)[number]) {
  const mx = (ORIGIN.x + to.x) / 2;
  const my = (ORIGIN.y + to.y) / 2 - to.lift;
  return `M ${ORIGIN.x} ${ORIGIN.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export function Diaspora() {
  const reduced = useReducedMotion();

  return (
    <Section id="diaspora" bleed className="bg-ink-2/40">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
                Diaspora
              </p>
            </Reveal>

            <AnimatedText
              text={"Closer to Home.\nCloser to the World."}
              className="display-xl text-[clamp(2.25rem,5.5vw,4.25rem)] text-paper"
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-8 max-w-lg text-lg leading-relaxed text-paper-dim">
                Nisu Travel helps travellers from the Albanian diaspora plan
                journeys between Kosovo and destinations across Europe and
                beyond.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="pretty mt-5 max-w-lg text-base leading-relaxed text-paper-dim">
                Summer, New Year and Eid are the busiest weeks of our year. We
                know how those windows price, and we know that booking them
                early is the difference that matters most.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10">
                <Button asChild size="lg">
                  <Link href="/request">
                    Plan Your Journey
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal y={24}>
            <figure className="relative overflow-hidden rounded-plate border border-line bg-ink p-4 sm:p-6">
              <svg
                viewBox="0 0 800 500"
                className="h-auto w-full"
                role="img"
                aria-label="Schematic route board showing connections from Prishtina to Germany, Switzerland, Austria, Italy and France"
              >
                {/* Faint graticule — a chart ground, not a country map. */}
                <g stroke="currentColor" className="text-line" strokeWidth="1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 62.5} x2="800" y2={i * 62.5} />
                  ))}
                  {Array.from({ length: 13 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 66.7} y1="0" x2={i * 66.7} y2="500" />
                  ))}
                </g>

                {routes.map((route, i) => {
                  const d = arc(route);
                  return (
                    <g key={route.code}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#5dbb63"
                        strokeWidth="2"
                        strokeDasharray="7 9"
                        strokeLinecap="round"
                        initial={{ pathLength: reduced ? 1 : 0, opacity: 0.9 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                        transition={{
                          duration: 1.5,
                          delay: 0.15 + i * 0.16,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />

                      {/* Aircraft marker riding the same arc. */}
                      <circle r="4.5" fill="#8fc7e8">
                        <animateMotion
                          dur={`${7 + i * 1.3}s`}
                          repeatCount="indefinite"
                          path={d}
                          rotate="auto"
                        />
                      </circle>

                      <motion.g
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + i * 0.16, duration: 0.5 }}
                      >
                        <circle cx={route.x} cy={route.y} r="6" fill="#8fc7e8" />
                        <circle cx={route.x} cy={route.y} r="13" fill="none" stroke="#8fc7e8" strokeOpacity="0.35" />
                        <text
                          x={route.x}
                          y={route.y - 26}
                          textAnchor="middle"
                          className="fill-paper font-mono"
                          fontSize="17"
                          letterSpacing="2"
                        >
                          {route.code}
                        </text>
                        <text
                          x={route.x}
                          y={route.y + 34}
                          textAnchor="middle"
                          className="fill-paper-dim font-sans"
                          fontSize="15"
                        >
                          {route.label}
                        </text>
                      </motion.g>
                    </g>
                  );
                })}

                {/* Origin sits last so it draws above every arc. */}
                <g>
                  <circle cx={ORIGIN.x} cy={ORIGIN.y} r="9" fill="#5dbb63" />
                  <circle cx={ORIGIN.x} cy={ORIGIN.y} r="20" fill="none" stroke="#5dbb63" strokeOpacity="0.4" />
                  <circle cx={ORIGIN.x} cy={ORIGIN.y} r="32" fill="none" stroke="#5dbb63" strokeOpacity="0.18" />
                  <text
                    x={ORIGIN.x}
                    y={ORIGIN.y + 54}
                    textAnchor="middle"
                    className="fill-paper font-mono"
                    fontSize="17"
                    letterSpacing="2"
                  >
                    {ORIGIN.code}
                  </text>
                  <text
                    x={ORIGIN.x}
                    y={ORIGIN.y + 76}
                    textAnchor="middle"
                    className="fill-paper-dim font-sans"
                    fontSize="15"
                  >
                    {ORIGIN.label}
                  </text>
                </g>
              </svg>

              <figcaption className="mt-2 px-2 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper-faint">
                Schematic. Routes shown are destinations we plan, not scheduled
                services.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
