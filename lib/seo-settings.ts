import { kvGet, kvSet } from "@/lib/kv";
export type { GlobalSEO, PageSEO, PagesSEO } from "@/lib/seo-types";
import type { GlobalSEO, PageSEO, PagesSEO } from "@/lib/seo-types";
import { DEFAULT_GLOBAL_SEO } from "@/lib/seo-types";

export async function getGlobalSEO(): Promise<GlobalSEO> {
  return (await kvGet<GlobalSEO>("seo:global")) ?? DEFAULT_GLOBAL_SEO;
}

export async function setGlobalSEO(data: Partial<GlobalSEO>): Promise<GlobalSEO> {
  const current = await getGlobalSEO();
  const updated = { ...current, ...data };
  await kvSet("seo:global", updated);
  return updated;
}

export async function getPagesSEO(): Promise<PagesSEO> {
  return (await kvGet<PagesSEO>("seo:pages")) ?? {};
}

export async function setPageSEO(slug: string, data: PageSEO): Promise<void> {
  const pages = await getPagesSEO();
  pages[slug] = data;
  await kvSet("seo:pages", pages);
}

/** Merge KV override with static defaults. Call this in generateMetadata for server pages. */
export async function applyPageSEO(
  defaults: { title: string; description: string; image?: string },
  slug: string
): Promise<{ title: string; description: string; image?: string; noIndex: boolean }> {
  const pages = await getPagesSEO();
  const override = pages[slug];
  return {
    title: override?.title || defaults.title,
    description: override?.description || defaults.description,
    image: override?.ogImage || defaults.image,
    noIndex: override?.noIndex ?? false,
  };
}
