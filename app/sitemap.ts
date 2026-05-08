import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://joshuaglobal.live";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${APP_URL}/daily-verse`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/truth`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/teachings`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/questions`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${APP_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // TODO: Fetch from DB and add dynamic routes
  // const verses = await prisma.dailyVerse.findMany({ where: { isPublished: true } });
  // const verseRoutes = verses.map((v) => ({ url: `${APP_URL}/daily-verse/${v.slug}`, ... }));

  return staticRoutes;
}
