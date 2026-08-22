import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Schema } from "@/components/Schema";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Container, RouteDivider, Section } from "@/components/ui/section";
import type { ImageKey } from "@/data/images";
import { destinations, getDestination } from "@/content/destinations";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return pageMetadata({ title: "Destination", description: "", path: "/destinations" });

  return pageMetadata({
    title: `${destination.name}, ${destination.country}`,
    description: `${destination.blurb} Plan a trip to ${destination.name} with Nisu Travel — flights, hotels and complete itineraries from Kosovo.`,
    path: `/destinations/${destination.slug}`,
  });
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const others = destinations.filter((d) => d.slug !== destination.slug).slice(0, 3);

  return (
    <>
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ])}
      />

      <PageHero
        eyebrow={destination.country}
        title={destination.name}
        intro={destination.line}
        imageKey={`dest-${destination.slug}` as ImageKey}
        meta={destination.coords}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: destination.name, href: `/destinations/${destination.slug}` },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="balance font-display text-2xl leading-snug text-paper sm:text-3xl">
                  {destination.blurb}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <RouteDivider className="my-10 max-w-sm" />
              </Reveal>

              <div className="space-y-6">
                {destination.body.map((paragraph, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="pretty text-base leading-relaxed text-paper-dim sm:text-lg">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div className="mt-12 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href={`/request?destination=${encodeURIComponent(destination.name)}`}>
                      Request This Trip
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <WhatsAppLink
                    size="lg"
                    variant="outline"
                    message={`Hello Nisu Travel, I'm interested in planning a trip to ${destination.name}.`}
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <aside className="rounded-plate border border-line bg-ink-2/60 p-7">
                <h2 className="eyebrow mb-6">At a glance</h2>
                <dl className="space-y-6">
                  <div>
                    <dt className="text-xs text-paper-faint">Airport code</dt>
                    <dd className="mt-1 font-mono text-lg tracking-[0.15em] text-jade">
                      {destination.code}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-faint">Coordinates</dt>
                    <dd className="tnum mt-1 font-mono text-sm text-paper">
                      {destination.coords}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-faint">Best season</dt>
                    <dd className="mt-1 text-sm text-paper">{destination.season}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-faint">Getting there</dt>
                    <dd className="pretty mt-1 text-sm leading-relaxed text-paper">
                      {destination.flightNote}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-faint">Suits</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {destination.bestFor.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-paper-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <p className="pretty mt-8 border-t border-line pt-6 text-xs leading-relaxed text-paper-faint">
                  Seasons and routings are general guidance. Fares, availability
                  and schedules are confirmed in writing when we send your offer.
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-2/40">
        <Container>
          <h2 className="font-display text-3xl text-paper sm:text-4xl">
            Also worth considering
          </h2>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <StaggerItem key={other.slug}>
                <DestinationCard destination={other} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
