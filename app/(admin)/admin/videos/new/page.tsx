"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  Youtube,
  ChevronDown,
  ChevronUp,
  Globe,
} from "lucide-react";
import { VIDEO_CATEGORIES } from "@/lib/video-types";
import type { Video } from "@/lib/video-types";

const EMPTY_FORM = {
  title: "",
  description: "",
  youtubeId: "",
  youtubeUrl: "",
  category: "Kingdom of God",
  duration: "",
  thumbnailUrl: "",
  tags: "",
  isPublished: false,
  isFeatured: false,
  views: "",
  seoTitle: "",
  seoDescription: "",
};

function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/
  );
  return match ? match[1] : "";
}

export default function AdminVideoEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(!!editId);

  useEffect(() => {
    if (!editId) return;
    fetch("/api/admin/videos")
      .then((r) => r.json())
      .then((data: Video[]) => {
        const video = Array.isArray(data) ? data.find((v) => v.id === editId) : null;
        if (video) {
          setForm({
            title: video.title,
            description: video.description,
            youtubeId: video.youtubeId || "",
            youtubeUrl: video.youtubeUrl || "",
            category: video.category,
            duration: video.duration || "",
            thumbnailUrl: video.thumbnailUrl || "",
            tags: video.tags.join(", "),
            isPublished: video.isPublished,
            isFeatured: video.isFeatured,
            views: video.views || "",
            seoTitle: "",
            seoDescription: "",
          });
        }
        setLoadingVideo(false);
      });
  }, [editId]);

  function update(key: string, value: string | boolean) {
    setForm((p) => {
      const next = { ...p, [key]: value };
      // Auto-extract YouTube ID from URL
      if (key === "youtubeUrl" && typeof value === "string") {
        const id = extractYoutubeId(value);
        if (id) next.youtubeId = id;
      }
      return next;
    });
    setError("");
    setSaved(false);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      youtubeId: form.youtubeId || undefined,
      youtubeUrl: form.youtubeUrl || undefined,
      category: form.category,
      duration: form.duration || undefined,
      thumbnailUrl: form.thumbnailUrl || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      views: form.views || undefined,
    };

    const res = editId
      ? await fetch(`/api/admin/videos/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/videos"), 1200);
    } else {
      setError(data.error || "Failed to save. Please try again.");
    }
  }

  if (loadingVideo) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
      </div>
    );
  }

  const previewId = form.youtubeId || extractYoutubeId(form.youtubeUrl);

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/videos")}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">
              {editId ? "Edit Video" : "Add Video"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a YouTube video to the ministry library
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => update("isPublished", !form.isPublished)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
              form.isPublished
                ? "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {form.isPublished ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            {form.isPublished ? "Published" : "Draft"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm gap-2 disabled:opacity-50"
          >
            {saved ? (
              <CheckCircle className="w-4 h-4" />
            ) : saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Saved!" : editId ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" />
          {form.isPublished ? "Video published and live!" : "Saved as draft."}
        </div>
      )}

      <div className="space-y-6">
        {/* YouTube URL */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            YouTube URL *
          </label>
          <div className="relative">
            <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            <input
              type="url"
              value={form.youtubeUrl}
              onChange={(e) => update("youtubeUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          {form.youtubeId && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              YouTube ID detected: <span className="font-mono font-semibold">{form.youtubeId}</span>
            </p>
          )}
        </div>

        {/* Preview */}
        {previewId && (
          <div className="rounded-2xl overflow-hidden border border-border aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${previewId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="What Is the Kingdom of God? — Complete Teaching"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-base font-serif font-bold focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Description *
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What this teaching covers. Shown on the Videos page under the title."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Category + Duration + Views */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {VIDEO_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Duration
            </label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
              placeholder="38 min"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Views
            </label>
            <input
              type="text"
              value={form.views}
              onChange={(e) => update("views", e.target.value)}
              placeholder="8.2K views"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Tags{" "}
            <span className="font-normal normal-case">(comma separated)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="kingdom, prayer, paul"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Featured toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-secondary transition-colors w-fit">
            <div
              onClick={() => update("isFeatured", !form.isFeatured)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                form.isFeatured ? "bg-gold-500" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  form.isFeatured ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-medium">Feature this video</span>
              <span className="text-xs text-muted-foreground">
                (shown as hero on Videos page)
              </span>
            </div>
          </label>
        </div>

        {/* SEO — collapsible */}
        <div className="rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-500" />
              <span className="font-semibold text-sm">SEO Settings</span>
              <span className="text-xs text-muted-foreground">(optional)</span>
            </div>
            {seoOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {seoOpen && (
            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(e) => update("seoTitle", e.target.value)}
                  placeholder="Custom title for search engines..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {(form.seoTitle || form.title).length}/60 chars recommended
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={form.seoDescription}
                  onChange={(e) => update("seoDescription", e.target.value)}
                  placeholder="Custom description for search engines..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {(form.seoDescription || form.description).length}/160 chars recommended
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom save */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {form.isPublished
              ? "Will appear on joshuaglobal.live/videos"
              : "Saving as draft — not visible to visitors"}
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {editId ? "Update Video" : "Save Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
