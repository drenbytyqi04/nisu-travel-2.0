import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { posts } from "@/content/posts";
import { site } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/destinations"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/packages"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/inspiration"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/request"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  return [
    ...staticRoutes,
    ...destinations.map((d) => ({
      url: url(`/destinations/${d.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: url(`/inspiration/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
