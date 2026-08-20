import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { services } from "@/content/services";

export function Services({ all = false }: { all?: boolean }) {
  const list = all ? services : services.slice(0, 6);

  return (
    <Section id="services" className="bg-ink-2/40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="What we do"
            title={"Everything a Journey\nActually Needs."}
            intro="Ten services, one conversation. Book the whole trip or just the part you would rather not handle yourself."
          />
          {!all && (
            <Button asChild variant="outline" size="md" className="shrink-0">
              <Link href="/services">
                All Services
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, i) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} index={i} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
