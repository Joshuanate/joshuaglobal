"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ChevronRight, Loader2, Star } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { BLOG_CATEGORIES } from "@/lib/blog-types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const filtered = posts.filter((p) => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.includes(search.toLowerCase()));
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = posts.filter((p) => p.isFeatured).slice(0, 1)[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 text-xs font-semibold mb-4">
          <BookOpen className="w-3 h-3" /> Kingdom Articles
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Blog &amp; Articles</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          In-depth Kingdom teachings, biblical truth, and answers for every searching soul.
        </p>
      </div>

      {/* Featured post */}
      {!loading && featured && (
        <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 hover:border-gold-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Featured Article</span>
              <span className="text-zinc-500 text-xs">{featured.category}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors leading-snug">
              {featured.title}
            </h2>
            {featured.subtitle && <p className="text-zinc-400 mb-3">{featured.subtitle}</p>}
            <p className="text-zinc-300 leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-zinc-500 text-xs">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readingTime} min read</span>
              <span>{featured.author}</span>
              {featured.publishedAt && <span>{new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
              <span className="ml-auto flex items-center gap-1 text-gold-400 font-medium">Read article <ChevronRight className="w-3 h-3" /></span>
            </div>
          </div>
        </Link>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 min-w-[180px]"
        >
          <option value="All">All Categories</option>
          {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Posts grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gold-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">{search ? `No articles found for "${search}"` : "No articles yet."}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.filter((p) => p.id !== featured?.id).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group p-6 rounded-2xl border border-border bg-card hover:border-gold-400/50 transition-all hover:-translate-y-0.5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">{post.category}</span>
                {post.isFeatured && <Star className="w-3 h-3 text-gold-400 fill-gold-400" />}
              </div>
              <h2 className="font-serif font-bold text-base leading-snug mb-2 group-hover:text-gold-500 transition-colors">{post.title}</h2>
              {post.subtitle && <p className="text-sm text-muted-foreground mb-2 font-medium">{post.subtitle}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
                {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}
                <span className="ml-auto text-gold-500 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">Read <ChevronRight className="w-3 h-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
