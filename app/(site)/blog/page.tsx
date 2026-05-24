"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ArrowRight, Loader2, Star } from "lucide-react";
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
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const featured = posts.find((p) => p.isFeatured);

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Page header */}
      <section className="py-20 border-b border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="section-label text-gold-600 dark:text-gold-400">Blog &amp; Articles</span>
            </div>
            <h1 className="section-heading mb-4">
              Kingdom Truth<br />in Written Form
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              In-depth biblical teachings, Kingdom articles, and answers for every searching soul.
            </p>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {!loading && featured && (
        <section className="py-16 border-b border-border/60">
          <div className="container-editorial">
            <p className="section-label mb-8">Featured Article</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start p-8 md:p-10 rounded-3xl border border-gold-400/20 bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 hover:border-gold-400/40 transition-all max-w-5xl"
            >
              {/* Gold glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex-1">
                <div className="badge-gold mb-4 w-fit">
                  <Star className="w-3 h-3" /> Featured
                </div>
                <span className="text-gold-400 text-xs font-semibold mb-2 block">{featured.category}</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-snug mb-3 group-hover:text-gold-200 transition-colors">
                  {featured.title}
                </h2>
                {featured.subtitle && (
                  <p className="text-zinc-300 text-base mb-3 font-medium">{featured.subtitle}</p>
                )}
                <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3 max-w-xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {featured.readingTime} min read
                  </span>
                  {featured.author && <span>{featured.author}</span>}
                  {featured.publishedAt && (
                    <span>
                      {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span className="ml-auto flex items-center gap-1.5 text-gold-400 font-semibold group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Search + filter + grid */}
      <section className="py-16 pb-28">
        <div className="container-editorial">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400/40 transition-all"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 min-w-[180px] cursor-pointer"
            >
              <option value="All">All Categories</option>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                {search ? `No articles matching "${search}"` : "No articles yet. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered
                .filter((p) => p.id !== featured?.id)
                .map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gold-600 dark:text-gold-400 font-semibold">
                          {post.category}
                        </span>
                        {post.isFeatured && (
                          <Star className="w-3 h-3 text-gold-400 fill-gold-400 ml-auto" />
                        )}
                      </div>
                      <h2 className="font-serif font-bold text-base leading-snug mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors flex-1">
                        {post.title}
                      </h2>
                      {post.subtitle && (
                        <p className="text-sm text-muted-foreground mb-2 font-medium line-clamp-1">
                          {post.subtitle}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border/60 mt-auto">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readingTime} min
                        </span>
                        {post.publishedAt && (
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        <span className="ml-auto text-gold-500 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
