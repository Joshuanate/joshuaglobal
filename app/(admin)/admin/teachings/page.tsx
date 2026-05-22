"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Search, BookOpen, Loader2, Trash2,
  Eye, EyeOff, Star, StarOff, Filter, Crown,
} from "lucide-react";
import type { Teaching } from "@/lib/teaching-types";
import { TEACHING_CATEGORIES } from "@/lib/teaching-types";

export default function TeachingsAdminPage() {
  const [teachings, setTeachings] = useState<Teaching[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/teachings");
    const data = await res.json();
    setTeachings(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function togglePublish(t: Teaching) {
    setActionId(t.id);
    await fetch(`/api/admin/teachings/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !t.isPublished }),
    });
    await load();
    setActionId(null);
  }

  async function toggleFeatured(t: Teaching) {
    setActionId(t.id);
    await fetch(`/api/admin/teachings/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !t.isFeatured }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(t: Teaching) {
    if (!confirm(`Delete "${t.title}"? This cannot be undone.`)) return;
    setActionId(t.id);
    await fetch(`/api/admin/teachings/${t.id}`, { method: "DELETE" });
    await load();
    setActionId(null);
  }

  const filtered = teachings.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || t.category === category;
    return matchSearch && matchCat;
  });

  const published = teachings.filter((t) => t.isPublished).length;
  const drafts = teachings.filter((t) => !t.isPublished).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Teachings & Articles</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {published} published · {drafts} drafts · {teachings.length} total
          </p>
        </div>
        <Link href="/admin/teachings/new" className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> New Teaching
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teachings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none min-w-[180px]"
          >
            <option value="All">All Categories</option>
            {TEACHING_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            {teachings.length === 0 ? "No teachings yet." : "No results found."}
          </p>
          {teachings.length === 0 && (
            <Link href="/admin/teachings/new" className="btn-primary text-sm mt-4 inline-flex gap-2">
              <Plus className="w-4 h-4" /> Write your first teaching
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-all ${
                actionId === t.id ? "opacity-50" : "hover:border-gold-300 dark:hover:border-gold-700"
              }`}
            >
              {/* Status dot */}
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${t.isPublished ? "bg-green-500" : "bg-amber-400"}`} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">
                    {t.category}
                  </span>
                  {t.isFeatured && (
                    <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">
                      ★ Featured
                    </span>
                  )}
                  <span className={`text-xs font-medium ${t.isPublished ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {t.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-1 truncate">{t.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{t.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.readingTime} min read · {new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(t)}
                  title={t.isFeatured ? "Remove from featured" : "Mark as featured"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors"
                >
                  {t.isFeatured ? <Star className="w-4 h-4 fill-gold-400 text-gold-400" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => togglePublish(t)}
                  title={t.isPublished ? "Unpublish" : "Publish"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {t.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/teachings/new?edit=${t.id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Edit"
                >
                  <Crown className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(t)}
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
