"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, BookOpen, Loader2, Trash2, Eye, EyeOff, Star, StarOff, Edit } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function togglePublish(p: BlogPost) {
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !p.isPublished }),
    });
    await load();
    setActionId(null);
  }

  async function toggleFeatured(p: BlogPost) {
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !p.isFeatured }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(p: BlogPost) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, { method: "DELETE" });
    await load();
    setActionId(null);
  }

  const published = posts.filter((p) => p.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Blog &amp; Articles</h1>
          <p className="text-sm text-muted-foreground mt-1">{published} published · {posts.length} total</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No articles yet.</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm mt-4 inline-flex gap-2">
            <Plus className="w-4 h-4" /> Write your first article
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-all ${
                actionId === p.id ? "opacity-50" : "hover:border-gold-300 dark:hover:border-gold-700"
              }`}
            >
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${p.isPublished ? "bg-green-500" : "bg-amber-400"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">{p.category}</span>
                  {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">★ Featured</span>}
                  <span className={`text-xs font-medium ${p.isPublished ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.readingTime} min read</span>
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-1 truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{p.excerpt}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(p)}
                  title={p.isFeatured ? "Unfeature" : "Feature"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors"
                >
                  {p.isFeatured ? <Star className="w-4 h-4 fill-gold-400 text-gold-400" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => togglePublish(p)}
                  title={p.isPublished ? "Unpublish" : "Publish"}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {p.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/blog/new?edit=${p.id}`}
                  title="Edit"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <Link
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  title="View on site"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(p)}
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
