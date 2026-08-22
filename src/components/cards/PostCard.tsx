import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import type { ImageKey } from "@/data/images";
import type { Post } from "@/content/posts";
import { cn } from "@/lib/utils";

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/inspiration/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]">
            <Media
              imageKey={`post-${post.slug}` as ImageKey}
              decorative
              sizes="(max-width: 768px) 92vw, 30vw"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-jade">
            {post.category}
          </span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <time
            dateTime={post.date}
            className="font-mono text-[0.65rem] tracking-[0.14em] text-paper-faint"
          >
            {post.readingTime}
          </time>
        </div>

        <h3 className="balance mt-3 font-display text-xl leading-snug text-paper transition-colors duration-300 group-hover:text-jade">
          {post.title}
        </h3>
        <p className="pretty mt-2.5 line-clamp-3 text-sm leading-relaxed text-paper-dim">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-jade">
          Read More
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
