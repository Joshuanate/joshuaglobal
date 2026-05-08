import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Filter } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Biblical Teachings — In-Depth Scripture Studies",
  description:
    "Long-form biblical teachings, scripture studies, and truth-focused content. Explore original language, historical context, and practical application.",
  url: "/teachings",
});

const categories = ["All", "Core Teachings", "Kingdom", "Prayer", "Grace", "Prophecy", "Character of God", "Ethics"];

const teachings = [
  {
    slug: "what-jesus-meant-by-repentance",
    title: "What Jesus Truly Meant by Repentance",
    excerpt: "Most translations miss the depth of the Greek word metanoia. It's not guilt — it's a complete transformation of mind that changes how you see everything.",
    category: "Core Teachings",
    readingTime: 8,
    date: "May 5, 2026",
    isFeatured: true,
    tags: ["repentance", "greek", "metanoia"],
  },
  {
    slug: "kingdom-of-god-explained",
    title: "The Kingdom of God: Not What You Were Told",
    excerpt: "Jesus mentioned the Kingdom of God over 100 times. Understanding it changes everything about how we read the Gospels — and how we live today.",
    category: "Kingdom",
    readingTime: 12,
    date: "May 3, 2026",
    isFeatured: true,
    tags: ["kingdom", "jesus", "eschatology"],
  },
  {
    slug: "why-jesus-spoke-in-parables",
    title: "Why Did Jesus Speak in Parables?",
    excerpt: "The parables weren't simplifications — they were strategic invitations to deeper truth for those with ears to hear. Here's the real reason.",
    category: "Core Teachings",
    readingTime: 6,
    date: "April 30, 2026",
    isFeatured: false,
    tags: ["parables", "teaching method"],
  },
  {
    slug: "grace-more-than-forgiveness",
    title: "Grace Is More Than Forgiveness",
    excerpt: "The Greek word charis means enabling power, not just pardon. Grace empowers you to live differently — it doesn't merely excuse the past.",
    category: "Grace",
    readingTime: 9,
    date: "April 27, 2026",
    isFeatured: false,
    tags: ["grace", "charis", "salvation"],
  },
  {
    slug: "shema-and-the-great-commandment",
    title: "The Shema and the Great Commandment",
    excerpt: "When Jesus quoted the Shema, he wasn't just quoting scripture. He was declaring the identity of the Kingdom and the whole law in one breath.",
    category: "Core Teachings",
    readingTime: 10,
    date: "April 24, 2026",
    isFeatured: false,
    tags: ["shema", "love", "commandments"],
  },
  {
    slug: "sermon-on-the-mount-decoded",
    title: "The Sermon on the Mount, Decoded",
    excerpt: "The Beatitudes are not rules to follow — they are descriptions of Kingdom citizens. Jesus was describing a new kind of human, not a new moral checklist.",
    category: "Kingdom",
    readingTime: 15,
    date: "April 20, 2026",
    isFeatured: false,
    tags: ["sermon on the mount", "beatitudes", "kingdom"],
  },
];

export default function TeachingsPage() {
  const featured = teachings.filter((t) => t.isFeatured);
  const rest = teachings.filter((t) => !t.isFeatured);

  return (
    <div className="container-editorial py-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <div className="badge-gold mb-4">
          <BookOpen className="w-3 h-3 mr-1" />
          Scripture Studies
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Biblical Teachings</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Deep, context-rich studies on what Jesus and the apostles actually taught — with original
          language, history, and real-world application.
        </p>
      </header>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-hide pb-2">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-gold-500 text-white"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Featured Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((t) => (
              <Link
                key={t.slug}
                href={`/teachings/${t.slug}`}
                className="group flex flex-col gap-4 p-8 rounded-3xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
              >
                <span className="badge-gold self-start">{t.category}</span>
                <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <span>{t.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t.readingTime} min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All teachings */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-6">All Teachings</h2>
        <div className="space-y-4">
          {rest.map((t) => (
            <Link
              key={t.slug}
              href={`/teachings/${t.slug}`}
              className="group flex gap-6 p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gold-600 dark:text-gold-400">{t.category}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{t.date}</span>
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors leading-snug">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {t.readingTime} min
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
