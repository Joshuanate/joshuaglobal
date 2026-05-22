import { kvGet, kvSet, kvDel } from "@/lib/kv";
export type { Teaching } from "@/lib/teaching-types";
export { TEACHING_CATEGORIES } from "@/lib/teaching-types";
import type { Teaching } from "@/lib/teaching-types";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function calcReadingTime(body: string): number {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
}

export async function getTeachings(): Promise<Teaching[]> {
  return (await kvGet<Teaching[]>("teachings:list")) ?? [];
}

export async function getTeaching(slug: string): Promise<Teaching | null> {
  return kvGet<Teaching>(`teaching:${slug}`);
}

export async function createTeaching(
  data: Omit<Teaching, "id" | "slug" | "readingTime" | "createdAt" | "updatedAt">
): Promise<Teaching> {
  const list = await getTeachings();
  const slug = slugify(data.title);
  const teaching: Teaching = {
    ...data,
    id: crypto.randomUUID(),
    slug,
    readingTime: calcReadingTime(data.body),
    publishedAt: data.isPublished ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  list.unshift(teaching);
  await kvSet("teachings:list", list);
  await kvSet(`teaching:${slug}`, teaching);
  return teaching;
}

export async function updateTeaching(
  id: string,
  data: Partial<Teaching>
): Promise<Teaching | null> {
  const list = await getTeachings();
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated: Teaching = {
    ...list[idx],
    ...data,
    readingTime: data.body ? calcReadingTime(data.body) : list[idx].readingTime,
    publishedAt:
      data.isPublished && !list[idx].publishedAt
        ? new Date().toISOString()
        : list[idx].publishedAt,
    updatedAt: new Date().toISOString(),
  };
  list[idx] = updated;
  await kvSet("teachings:list", list);
  await kvSet(`teaching:${updated.slug}`, updated);
  return updated;
}

export async function deleteTeaching(id: string): Promise<void> {
  const list = await getTeachings();
  const teaching = list.find((t) => t.id === id);
  if (teaching) await kvDel(`teaching:${teaching.slug}`);
  await kvSet("teachings:list", list.filter((t) => t.id !== id));
}
