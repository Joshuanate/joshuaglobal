import { kvGet, kvSet } from "./kv";
import type { Video } from "./video-types";

const KEY = "videos";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getVideos(): Promise<Video[]> {
  const data = await kvGet<Video[]>(KEY);
  return data ?? [];
}

export async function saveVideos(videos: Video[]): Promise<void> {
  await kvSet(KEY, videos);
}

export async function createVideo(
  data: Omit<Video, "id" | "slug" | "createdAt" | "updatedAt">
): Promise<Video> {
  const videos = await getVideos();
  const video: Video = {
    id: crypto.randomUUID(),
    slug: toSlug(data.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  };
  videos.unshift(video);
  await saveVideos(videos);
  return video;
}

export async function updateVideo(
  id: string,
  data: Partial<Omit<Video, "id" | "createdAt">>
): Promise<Video | null> {
  const videos = await getVideos();
  const idx = videos.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  videos[idx] = { ...videos[idx], ...data, updatedAt: new Date().toISOString() };
  await saveVideos(videos);
  return videos[idx];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const videos = await getVideos();
  const filtered = videos.filter((v) => v.id !== id);
  if (filtered.length === videos.length) return false;
  await saveVideos(filtered);
  return true;
}
