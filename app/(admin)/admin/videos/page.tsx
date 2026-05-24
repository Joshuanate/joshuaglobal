"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  PlayCircle,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Edit,
  Youtube,
  Clock,
} from "lucide-react";
import type { Video } from "@/lib/video-types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    setVideos(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function togglePublish(v: Video) {
    setActionId(v.id);
    await fetch(`/api/admin/videos/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !v.isPublished }),
    });
    await load();
    setActionId(null);
  }

  async function toggleFeatured(v: Video) {
    setActionId(v.id);
    await fetch(`/api/admin/videos/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !v.isFeatured }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(v: Video) {
    if (!confirm(`Delete "${v.title}"?`)) return;
    setActionId(v.id);
    await fetch(`/api/admin/videos/${v.id}`, { method: "DELETE" });
    await load();
    setActionId(null);
  }

  const published = videos.filter((v) => v.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {published} published · {videos.length} total
          </p>
        </div>
        <Link href="/admin/videos/new" className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> Add Video
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20">
          <PlayCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No videos yet.</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Add YouTube videos to feature on your Videos page.
          </p>
          <Link href="/admin/videos/new" className="btn-primary text-sm inline-flex gap-2">
            <Plus className="w-4 h-4" /> Add your first video
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map((v) => (
            <div
              key={v.id}
              className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-all ${
                actionId === v.id
                  ? "opacity-50"
                  : "hover:border-gold-300 dark:hover:border-gold-700"
              }`}
            >
              {/* Thumbnail or placeholder */}
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                {v.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                ) : v.youtubeId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Youtube className="w-5 h-5 text-muted-foreground/40" />
                )}
              </div>

              {/* Status dot */}
              <div
                className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                  v.isPublished ? "bg-green-500" : "bg-amber-400"
                }`}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">
                    {v.category}
                  </span>
                  {v.isFeatured && (
                    <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">
                      ★ Featured
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium ${
                      v.isPublished
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {v.isPublished ? "Published" : "Draft"}
                  </span>
                  {v.duration && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {v.duration}
                    </span>
                  )}
                  {v.views && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      {v.views}
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-1 truncate">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{v.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(v)}
                  title={v.isFeatured ? "Unfeature" : "Feature"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors"
                >
                  {v.isFeatured ? (
                    <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => togglePublish(v)}
                  title={v.isPublished ? "Unpublish" : "Publish"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {v.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/videos/new?edit=${v.id}`}
                  title="Edit"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                {v.youtubeUrl && (
                  <a
                    href={v.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch on YouTube"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(v)}
                  title="Delete"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
