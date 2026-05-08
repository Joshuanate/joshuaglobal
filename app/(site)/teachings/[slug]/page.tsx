import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, Share2, BookOpen, ArrowLeft } from "lucide-react";
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";

const getTeaching = (slug: string) => ({
  slug,
  title: "What Jesus Truly Meant by Repentance",
  subtitle: "Exploring the Greek word metanoia and its revolutionary implications",
  excerpt: "Most translations miss the depth of the Greek word metanoia. It's not guilt — it's a complete transformation of mind.",
  body: `When Jesus began his public ministry, his very first recorded words were: **"Repent, for the kingdom of heaven is at hand"** (Matthew 4:17). That word — repent — has been translated, misunderstood, and weaponized in ways that have shaped centuries of Christian practice.

But what did Jesus actually mean?

## The Greek Word: Metanoia

The word translated as "repent" is **μετάνοια (metanoia)**. It's a compound word:

- **meta** — change, transformation, beyond
- **nous** — mind, perception, understanding, the inner man

Metanoia literally means: **a change of mind** — specifically, a fundamental shift in how you perceive reality itself.

This is not primarily an emotional experience. It is cognitive and volitional. It involves a new way of seeing God, yourself, the world, and what matters.

## What Repentance Is NOT

The Latin church translated metanoia as *paenitentia* — which carries the meaning of penance, guilt, remorse. This translation shaped Western Christianity's understanding for over a millennium, creating a framework where repentance = feeling terrible about your sin.

But Jesus was not calling people to a guilt program. He was calling them to a perceptual revolution.

## The Hebrew Connection

The Hebrew equivalent is **שׁוּב (shuv)**, meaning "to return" or "to turn back." It's deeply relational — it describes turning back to someone, specifically to God. The Prodigal Son "came to his senses" (the father's embrace awaited), and he turned back. That is shuv.

## What Repentance Actually Demands

Metanoia demands that you:

1. **Stop operating from false frameworks** — cultural, religious, or personal assumptions about how life works
2. **Adopt the Kingdom's framework** — seeing through Jesus' eyes rather than the world's
3. **Continually realign** — not once at conversion, but as an ongoing posture

This is why Jesus immediately connects repentance to the Kingdom: you cannot perceive or participate in God's active reign if your mind is still calibrated to the world's operating system.

## The Role of God's Kindness

Romans 2:4 delivers a stunning statement: **"God's kindness is intended to lead you to repentance."**

Not fear. Not punishment. Not guilt. **Kindness.**

True metanoia is drawn by encountering the love and beauty of God — not compelled by shame. This completely reframes the altar call, the hellfire sermon, and the entire guilt-based model of evangelism.

## Practical Implication

What does this mean for you today?

Ask yourself: In which areas of your life are you operating from a framework that contradicts the Kingdom of God? About money? About power? About identity? About who deserves love?

Metanoia is the invitation to let Jesus rewrite your mental operating system — starting now, and continuing for life.

> "Repent, for the kingdom of heaven is at hand." — Matthew 4:17`,
  category: "Core Teachings",
  readingTime: 8,
  date: "May 5, 2026",
  publishedAt: new Date("2026-05-05"),
  updatedAt: new Date("2026-05-05"),
  tags: ["repentance", "greek", "metanoia", "kingdom"],
  scriptures: [
    { ref: "Matthew 4:17", text: "Repent, for the kingdom of heaven is at hand." },
    { ref: "Romans 2:4", text: "God's kindness is intended to lead you to repentance." },
    { ref: "Acts 2:38", text: "Repent and be baptized, every one of you." },
  ],
  relatedPosts: [
    { slug: "kingdom-of-god-explained", title: "The Kingdom of God: Not What You Were Told" },
    { slug: "grace-more-than-forgiveness", title: "Grace Is More Than Forgiveness" },
  ],
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTeaching(slug);
  return generateSEO({
    title: t.title,
    description: t.excerpt,
    url: `/teachings/${slug}`,
    type: "article",
    publishedAt: t.publishedAt,
    updatedAt: t.updatedAt,
    tags: t.tags,
  });
}

export default async function TeachingPage({ params }: Props) {
  const { slug } = await params;
  const teaching = getTeaching(slug);

  const articleSchema = generateArticleSchema({
    title: teaching.title,
    description: teaching.excerpt,
    url: `/teachings/${slug}`,
    publishedAt: teaching.publishedAt,
    updatedAt: teaching.updatedAt,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Teachings", url: "/teachings" },
    { name: teaching.title, url: `/teachings/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: "0%" }} id="reading-progress" />

      <div className="container-editorial py-12 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/teachings" className="hover:text-foreground">Teachings</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{teaching.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-gold">{teaching.category}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {teaching.readingTime} min read
                </span>
                <span className="text-xs text-muted-foreground">{teaching.date}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {teaching.title}
              </h1>
              {teaching.subtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed">{teaching.subtitle}</p>
              )}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Joshua Global</p>
                  <p className="text-xs text-muted-foreground">Biblical Studies Team</p>
                </div>
                <button className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </header>

            {/* Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_blockquote]:scripture-quote [&_strong]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed">
              {teaching.body.split("\n\n").map((para, i) => {
                if (para.startsWith("## ")) {
                  return <h2 key={i}>{para.replace("## ", "")}</h2>;
                }
                if (para.startsWith("> ")) {
                  return (
                    <blockquote key={i}>
                      {para.replace("> ", "")}
                    </blockquote>
                  );
                }
                if (para.includes("\n- ")) {
                  const [intro, ...items] = para.split("\n- ");
                  return (
                    <div key={i}>
                      {intro && <p>{intro.replace(/\*\*/g, "")}</p>}
                      <ul className="space-y-2 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="flex gap-2 text-muted-foreground">
                            <span className="text-gold-500 mt-1">•</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                if (para.match(/^\d+\./m)) {
                  const items = para.split("\n").filter(Boolean);
                  return (
                    <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
                      {items.map((item, j) => (
                        <li key={j} className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                  }} />
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {teaching.tags.map((tag) => (
                  <Link key={tag} href={`/teachings?tag=${tag}`}
                    className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground capitalize">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex justify-between">
              <Link href="/teachings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                All Teachings
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Scriptures */}
            <div className="p-6 rounded-2xl border border-border bg-card sticky top-20">
              <h3 className="font-serif font-bold mb-4">Key Scriptures</h3>
              <div className="space-y-3 mb-6">
                {teaching.scriptures.map((s) => (
                  <div key={s.ref} className="p-3 rounded-xl bg-secondary/50">
                    <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1">{s.ref}</p>
                    <p className="text-xs text-muted-foreground italic">&ldquo;{s.text}&rdquo;</p>
                  </div>
                ))}
              </div>

              <h3 className="font-serif font-bold mb-4">Continue Reading</h3>
              <div className="space-y-3">
                {teaching.relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/teachings/${rp.slug}`}
                    className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground group">
                    <BookOpen className="w-3.5 h-3.5 mt-0.5 text-gold-500 flex-shrink-0" />
                    <span className="group-hover:text-gold-600 dark:group-hover:text-gold-400 leading-snug">
                      {rp.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
