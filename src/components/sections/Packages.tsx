import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PackageCard } from "@/components/cards/PackageCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { packages } from "@/content/packages";

export function Packages({ limit }: { limit?: number }) {
  const list = limit ? packages.slice(0, limit) : packages;

  return (
    <Section id="packages">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Packages"
            title="Made for Your Next Escape."
            intro="Starting points, not fixed products. Every one of these gets rebuilt around your dates, your budget and who is travelling."
          />
          {limit && (
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/packages">
                All Packages
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
          {list.map((item) => (
            <StaggerItem key={item.slug}>
              <PackageCard item={item} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
