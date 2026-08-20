import { PostCard } from "@/components/cards/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { Container, Section } from "@/components/ui/section";
import { sortedPosts } from "@/content/posts";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Travel Inspiration",
  description:
    "Destination guides, booking advice and travel tips from Nisu Travel — written by the people who do the planning.",
  path: "/inspiration",
});

export default function InspirationPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Travel Inspiration"
        intro="What we tell people who ask — where to go, when to book, and what is genuinely worth the flight."
        image={img("An open landscape at the start of a journey", "alpine", "peaks")}
        artKey="page-inspiration"
        meta={`${sortedPosts.length} articles`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Travel Inspiration", href: "/inspiration" },
        ]}
      />

      <Section>
        <Container>
          <h2 className="sr-only">All articles</h2>
          <Stagger className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <RequestCTA />
    </>
  );
}
