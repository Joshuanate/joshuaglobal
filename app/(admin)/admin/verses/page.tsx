"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, BookMarked, Loader2, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import type { VerseEntry } from "@/lib/verse-types";

export default function VersesAdminPage() {
  const [verses, setVerses] = useState<VerseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/verses");
    const data = await res.json();
    setVerses(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function togglePublish(v: VerseEntry) {
    setActionId(v.id);
    await fetch(`/api/admin/verses/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !v.isPublished }),
    });
    await load();
    setActionId(null);
  }

  async function toggleFeatured(v: VerseEntry) {
    setActionId(v.id);
    await fetch(`/api/admin/verses/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !v.isFeatured }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(v: VerseEntry) {
    if (!confirm(`Delete verse "${v.reference}"?`)) return;
    setActionId(v.id);
    await fetch(`/api/admin/verses/${v.id}`, { method: "DELETE" });
    await load();
    setActionId(null);
  }

  const published = verses.filter((v) => v.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Daily Verses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {published} published · {verses.length} total
          </p>
        </div>
        <Link href="/admin/verses/new" className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> Schedule New Verse
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : verses.length === 0 ? (
        <div className="text-center py-20">
          <BookMarked className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No verses scheduled yet.</p>
          <Link href="/admin/verses/new" className="btn-primary text-sm mt-4 inline-flex gap-2">
            <Plus className="w-4 h-4" /> Schedule your first verse
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {verses.map((v) => (
            <div
              key={v.id}
              className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-all ${
                actionId === v.id ? "opacity-50" : "hover:border-gold-300 dark:hover:border-gold-700"
              }`}
            >
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${v.isPublished ? "bg-green-500" : "bg-amber-400"}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-gold-600 dark:text-gold-400 font-semibold text-sm">{v.reference}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">📅 {v.scheduledDate}</span>
                  {v.isFeatured && (
                    <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">★ Featured</span>
                  )}
                  <span className={`text-xs font-medium ${v.isPublished ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {v.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm font-serif italic text-foreground line-clamp-1">&ldquo;{v.verse}&rdquo;</p>
                {v.tags.length > 0 && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {v.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-secondary text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleFeatured(v)} title={v.isFeatured ? "Unfeature" : "Feature"} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors">
                  {v.isFeatured ? <Star className="w-4 h-4 fill-gold-400 text-gold-400" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button onClick={() => togglePublish(v)} title={v.isPublished ? "Unpublish" : "Publish"} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  {v.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(v)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
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
