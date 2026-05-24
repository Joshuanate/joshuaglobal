import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getBlog, getBlogs } from "@/lib/blog";
import { generateSEO, generateArticleSchema } from "@/lib/seo";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) return {};
  return generateSEO({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.seoImage || post.coverImage,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    updatedAt: new Date(post.updatedAt),
    tags: post.tags,
    noIndex: post.noIndex,
  });
}

function renderMarkdown(body: string): string {
  return body
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="font-serif text-2xl font-bold mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3 class="font-serif text-xl font-bold mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("#### ")) return `<h4 class="font-serif text-lg font-bold mt-6 mb-2">${line.slice(5)}</h4>`;
      if (line.trim() === "---") return `<hr class="border-border my-8" />`;
      if (line.trim() === "") return `<div class="h-4"></div>`;
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-500 underline hover:text-gold-400 transition-colors">$1</a>');
      return `<p class="mb-0 leading-[1.85] text-foreground">${formatted}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) notFound();

  const allPosts = await getBlogs();
  const related = allPosts
    .filter((p) => p.isPublished && p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const articleSchema = generateArticleSchema({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    url: `/blog/${post.slug}`,
    image: post.seoImage || post.coverImage,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    updatedAt: new Date(post.updatedAt),
    author: post.author,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-background">
          <div className="max-w-3xl mx-auto px-6 pt-16 pb-14">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-8">
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold">{post.category}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4">{post.title}</h1>
            {post.subtitle && <p className="text-zinc-300 text-xl mb-5">{post.subtitle}</p>}
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>
            <div className="flex items-center gap-5 text-zinc-500 text-sm flex-wrap pb-8 border-b border-zinc-800">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-zinc-900">J</div>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTime} min read</span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-[17px] leading-[1.85]" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-12 pt-6 border-t border-border flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
          )}

          {/* Author card */}
          <div className="mt-10 p-6 rounded-2xl bg-card border border-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-lg flex-shrink-0">J</div>
            <div>
              <p className="font-serif font-bold text-base">{post.author} — JoshuaGlobal</p>
              <p className="text-sm text-muted-foreground mt-1">Preaching the Kingdom of God to every nation. Continuing the legacy of Dr. Myles Munroe and Apostle Paul.</p>
              <Link href="/about" className="text-gold-500 text-sm font-medium hover:text-gold-400 transition-colors mt-1 inline-block">Read the story →</Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 pb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group p-5 rounded-2xl border border-border bg-card hover:border-gold-400/50 transition-all">
                  <span className="text-xs text-gold-500 font-semibold">{p.category}</span>
                  <h3 className="font-serif font-bold text-sm mt-1 mb-2 leading-snug group-hover:text-gold-500 transition-colors">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
