import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/blog";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://joshuaglobal.live";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${APP_URL}/kingdom`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${APP_URL}/apostle-paul`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${APP_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/daily-verse`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/teachings`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/questions`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${APP_URL}/lords-prayer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${APP_URL}/truth`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${APP_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/give`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogs = await getBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((p) => p.isPublished)
    .map((p) => ({
      url: `${APP_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: p.isFeatured ? 0.9 : 0.8,
    }));

  return [...staticRoutes, ...blogRoutes];
}
