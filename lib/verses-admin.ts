import { kvGet, kvSet, kvDel } from "@/lib/kv";
export type { VerseEntry } from "@/lib/verse-types";
import type { VerseEntry } from "@/lib/verse-types";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function getVerses(): Promise<VerseEntry[]> {
  return (await kvGet<VerseEntry[]>("verses:list")) ?? [];
}

export async function getVerse(slug: string): Promise<VerseEntry | null> {
  return kvGet<VerseEntry>(`verse:${slug}`);
}

export async function createVerse(data: Omit<VerseEntry, "id" | "slug" | "createdAt" | "updatedAt">): Promise<VerseEntry> {
  const list = await getVerses();
  const slug = slugify(`${data.reference} ${data.scheduledDate}`);
  const verse: VerseEntry = {
    ...data,
    id: crypto.randomUUID(),
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  list.unshift(verse);
  list.sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));
  await kvSet("verses:list", list);
  await kvSet(`verse:${slug}`, verse);
  return verse;
}

export async function updateVerse(id: string, data: Partial<VerseEntry>): Promise<VerseEntry | null> {
  const list = await getVerses();
  const idx = list.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  const updated: VerseEntry = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
  list[idx] = updated;
  await kvSet("verses:list", list);
  await kvSet(`verse:${updated.slug}`, updated);
  return updated;
}

export async function deleteVerse(id: string): Promise<void> {
  const list = await getVerses();
  const verse = list.find((v) => v.id === id);
  if (verse) await kvDel(`verse:${verse.slug}`);
  await kvSet("verses:list", list.filter((v) => v.id !== id));
}
