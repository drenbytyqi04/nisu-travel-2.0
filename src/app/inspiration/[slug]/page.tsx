import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Schema } from "@/components/Schema";
import { PostCard } from "@/components/cards/PostCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { RequestCTA } from "@/components/sections/RequestCTA";
import { Container, Section } from "@/components/ui/section";
import type { ImageKey } from "@/data/images";
import { getPost, posts, sortedPosts } from "@/content/posts";
import { site } from "@/content/site.config";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMetadata({ title: "Article", description: "", path: "/inspiration" });

  return {
    ...pageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/inspiration/${post.slug}`,
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      url: new URL(`/inspiration/${post.slug}`, site.url).toString(),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const formatted = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          articleSection: post.category,
          publisher: { "@id": `${site.url}/#organisation` },
          mainEntityOfPage: new URL(`/inspiration/${post.slug}`, site.url).toString(),
        }}
      />
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Travel Inspiration", path: "/inspiration" },
          { name: post.title, path: `/inspiration/${post.slug}` },
        ])}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        imageKey={`post-${post.slug}` as ImageKey}
        meta={`${formatted} · ${post.readingTime}`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Inspiration", href: "/inspiration" },
        ]}
      />

      <Section>
        <Container>
          <article className="mx-auto max-w-2xl">
            <Reveal>
              <p className="balance font-display text-2xl leading-snug text-paper">
                {post.excerpt}
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {post.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p className="pretty text-base leading-relaxed text-paper-dim sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="pretty mt-12 border-t border-line pt-8 text-sm leading-relaxed text-paper-faint">
                General guidance rather than a quote. Seasons, fares and
                availability change — send us your dates and we will confirm
                real options in writing.
              </p>
            </Reveal>
          </article>
        </Container>
      </Section>

      <Section className="bg-ink-2/40">
        <Container>
          <h2 className="font-display text-3xl text-paper sm:text-4xl">Keep reading</h2>
          <Stagger className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <PostCard post={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <RequestCTA />
    </>
  );
}
