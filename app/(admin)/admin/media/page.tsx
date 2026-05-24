"use client";

import { useState, useRef } from "react";
import {
  ImageIcon,
  Upload,
  Link2,
  Copy,
  CheckCircle,
  Trash2,
  Search,
  Grid3x3,
  List,
  Plus,
  X,
} from "lucide-react";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "og" | "thumbnail";
  addedAt: string;
};

const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: "1",
    name: "Kingdom Header",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    type: "og",
    addedAt: "May 24, 2026",
  },
  {
    id: "2",
    name: "Bible Study Cover",
    url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80",
    type: "image",
    addedAt: "May 22, 2026",
  },
  {
    id: "3",
    name: "Prayer Cover",
    url: "https://images.unsplash.com/photo-1518542331925-4e91e9a74edf?w=1200&q=80",
    type: "og",
    addedAt: "May 20, 2026",
  },
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(SAMPLE_MEDIA);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", url: "", type: "image" as MediaItem["type"] });

  function handleCopy(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleDelete(id: string) {
    if (!confirm("Remove this media item?")) return;
    setMedia((prev) => prev.filter((m) => m.id !== id));
  }

  function handleAdd() {
    if (!addForm.name.trim() || !addForm.url.trim()) return;
    const item: MediaItem = {
      id: crypto.randomUUID(),
      name: addForm.name,
      url: addForm.url,
      type: addForm.type,
      addedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setMedia((prev) => [item, ...prev]);
    setAddForm({ name: "", url: "", type: "image" });
    setAddOpen(false);
  }

  const filtered = media.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {media.length} items · Store and reuse image URLs across content
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="btn-primary text-sm gap-2"
        >
          <Plus className="w-4 h-4" /> Add Media
        </button>
      </div>

      {/* Upload zone — info banner */}
      <div className="mb-6 p-5 rounded-2xl border border-dashed border-gold-300 dark:border-gold-700/50 bg-gold-50 dark:bg-gold-950/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gold-700 dark:text-gold-300 mb-1">
              File Upload — Coming Soon
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Direct image uploads require <strong>Vercel Blob</strong> to be connected. Once you add{" "}
              <code className="text-gold-500 bg-gold-100 dark:bg-gold-900/50 px-1 py-0.5 rounded">
                BLOB_READ_WRITE_TOKEN
              </code>{" "}
              to your environment, drag-and-drop uploads will activate here. For now, add images by URL
              using the <strong>Add Media</strong> button above.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-card">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-gold-100 dark:bg-gold-900/50 text-gold-600 dark:text-gold-400" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-gold-100 dark:bg-gold-900/50 text-gold-600 dark:text-gold-400" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            {search ? `No media found for "${search}"` : "No media yet."}
          </p>
          {!search && (
            <button
              onClick={() => setAddOpen(true)}
              className="btn-primary text-sm mt-4 inline-flex gap-2"
            >
              <Plus className="w-4 h-4" /> Add your first image URL
            </button>
          )}
        </div>
      ) : view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-gold-300 dark:hover:border-gold-700 transition-all"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-secondary relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(item.url, item.id)}
                    className="w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-800" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.addedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-all"
            >
              <div className="w-14 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.url}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize flex-shrink-0">
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground flex-shrink-0">{item.addedAt}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  title="Copy URL"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {copiedId === item.id ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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

      {/* Add Media Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setAddOpen(false)}
          />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gold-500" />
                <h2 className="font-serif font-bold">Add Media URL</h2>
              </div>
              <button
                onClick={() => setAddOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Name
                </label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Kingdom Header Image"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Image URL
                </label>
                <input
                  type="url"
                  value={addForm.url}
                  onChange={(e) => setAddForm((p) => ({ ...p, url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Type
                </label>
                <select
                  value={addForm.type}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, type: e.target.value as MediaItem["type"] }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="image">Article Image</option>
                  <option value="og">OG / Social Image</option>
                  <option value="thumbnail">Video Thumbnail</option>
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setAddOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!addForm.name.trim() || !addForm.url.trim()}
                  className="flex-1 btn-primary text-sm disabled:opacity-50"
                >
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
