"use client";

import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { TripRequestForm } from "@/components/sections/TripRequestForm";
import { Container, Section } from "@/components/ui/section";

/**
 * Reads ?destination= and ?package= so every "Request Offer" link across the
 * site arrives with the form already filled in as far as it can be.
 */
export function RequestFormPanel() {
  const params = useSearchParams();

  return (
    <Section>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl text-paper">
                A few details is all we need.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="pretty mt-5 text-base leading-relaxed text-paper-dim">
                Nothing here is binding. The more you tell us the sharper the
                offer, but a destination and a rough month is genuinely enough
                to start.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ol className="mt-10 space-y-5">
                {[
                  "You send this form",
                  "We come back with options",
                  "You choose, we book",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="tnum font-mono text-xs text-jade">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-paper-dim">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <TripRequestForm
              defaultDestination={params.get("destination") ?? ""}
              defaultPackage={params.get("package") ?? ""}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
