import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/cards/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { sortedPosts } from "@/content/posts";

export function Inspiration({ limit = 3 }: { limit?: number }) {
  const list = sortedPosts.slice(0, limit);

  return (
    <Section id="inspiration" className="bg-ink-2/40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Journal"
            title="Travel Inspiration"
            intro="What we tell people who ask. Written by the people who do the booking, not by a marketing department."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/inspiration">
              Read All
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
