import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Search,
  ChevronRight,
  Star,
  ArrowRight,
  MessageCircle,
  BookMarked,
  Lightbulb,
  Users,
  Volume2,
  Heart,
} from "lucide-react";
import { generateSEO, generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Discover the Original Teachings of Jesus",
  description:
    "Scripture-based studies, biblical truth, daily verses, and AI-powered spiritual guidance. Explore what Jesus truly taught at Joshua Global.",
  url: "/",
});

const featuredVerse = {
  text: "The truth will set you free.",
  reference: "John 8:32",
  context:
    "Jesus spoke these words to those who believed in him, promising that true discipleship leads to liberating knowledge.",
};

const categories = [
  { name: "Faith & Belief", icon: "✦", count: 142, href: "/teachings?cat=faith" },
  { name: "Prayer & Worship", icon: "🙏", count: 89, href: "/teachings?cat=prayer" },
  { name: "Grace & Salvation", icon: "✝", count: 104, href: "/truth/grace" },
  { name: "Kingdom of God", icon: "👑", count: 67, href: "/truth/kingdom" },
  { name: "Love & Forgiveness", icon: "♥", count: 98, href: "/teachings?cat=love" },
  { name: "Prophecy & End Times", icon: "◎", count: 55, href: "/teachings?cat=prophecy" },
];

const latestTeachings = [
  {
    slug: "what-jesus-meant-by-repentance",
    title: "What Jesus Truly Meant by Repentance",
    excerpt: "Most translations miss the depth of the Greek word metanoia. It's not guilt — it's a complete transformation of mind.",
    category: "Core Teachings",
    readingTime: 8,
    date: "May 5, 2026",
  },
  {
    slug: "kingdom-of-god-explained",
    title: "The Kingdom of God: Not What You Were Told",
    excerpt: "Jesus mentioned the Kingdom of God over 100 times. Understanding it changes everything about how we read the Gospels.",
    category: "Kingdom",
    readingTime: 12,
    date: "May 3, 2026",
  },
  {
    slug: "why-jesus-spoke-in-parables",
    title: "Why Did Jesus Speak in Parables?",
    excerpt: "The parables weren't simplifications — they were strategic invitations to deeper truth for those with ears to hear.",
    category: "Bible Study",
    readingTime: 6,
    date: "April 30, 2026",
  },
];

const trendingQuestions = [
  { slug: "what-did-jesus-mean-repentance", q: "What did Jesus mean by repentance?" },
  { slug: "is-the-kingdom-of-god-literal", q: "Is the Kingdom of God a literal place?" },
  { slug: "what-is-the-holy-spirit", q: "What is the Holy Spirit exactly?" },
  { slug: "why-did-god-allow-suffering", q: "Why does God allow suffering?" },
  { slug: "what-is-eternal-life", q: "What is eternal life according to Jesus?" },
];

const truths = [
  { term: "Repentance", slug: "repentance", preview: "From Greek metanoia — a total shift of mind and direction." },
  { term: "Grace", slug: "grace", preview: "Unmerited favor; the divine gift that enables salvation." },
  { term: "Salvation", slug: "salvation", preview: "Deliverance and wholeness — shalom in its fullness." },
  { term: "Kingdom", slug: "kingdom-of-god", preview: "God's active reign breaking into human reality now." },
];

const testimonies = [
  {
    name: "Amara O.",
    location: "Lagos, Nigeria",
    text: "The Truth Dictionary changed how I read scripture. I finally understand what 'repentance' actually means in the original Greek.",
    rating: 5,
  },
  {
    name: "David K.",
    location: "London, UK",
    text: "The daily verse feature with context has transformed my mornings. I no longer read scripture in isolation from its meaning.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    location: "Atlanta, USA",
    text: "I asked the AI guide what Jesus meant about fear, and got a beautifully referenced answer. This platform is a gift.",
    rating: 5,
  },
];

const stats = [
  { value: "2,400+", label: "Scripture studies" },
  { value: "850+", label: "Truth entries" },
  { value: "12,000+", label: "Students worldwide" },
  { value: "365", label: "Daily devotions/year" },
];

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-400/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-editorial w-full py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Biblical Truth Platform
            </div>

            {/* Heading */}
            <h1 className="hero-text mb-6 animate-fade-up">
              Discover the{" "}
              <span className="gold-gradient">Original Teachings</span>
              <br />of Jesus
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
              Scripture-based studies, truth-focused teachings, daily Bible verses, and
              AI-powered exploration — all in one spiritually deep, modern platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up">
              <Link href="/daily-verse" className="btn-primary text-base gap-2 px-8 py-4">
                <BookOpen className="w-5 h-5" />
                Start Daily Study
              </Link>
              <Link href="/truth" className="btn-secondary text-base gap-2 px-8 py-4">
                <Search className="w-5 h-5" />
                Explore Truth Dictionary
              </Link>
              <Link href="/questions" className="btn-secondary text-base gap-2 px-8 py-4">
                <MessageCircle className="w-5 h-5" />
                Ask a Question
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-serif text-2xl font-bold text-gold-600 dark:text-gold-400">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Daily Verse ───────────────────────────────────────── */}
      <section className="py-16 border-y border-border bg-gradient-to-r from-gold-50/50 via-parchment-50 to-gold-50/50 dark:from-gold-950/20 dark:via-background dark:to-gold-950/20">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-gold mb-4">
              <BookMarked className="w-3 h-3 mr-1" />
              Today&apos;s Verse — May 6, 2026
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl font-medium italic text-foreground mb-4 leading-relaxed">
              &ldquo;{featuredVerse.text}&rdquo;
            </blockquote>
            <cite className="text-gold-600 dark:text-gold-400 font-semibold not-italic">
              — {featuredVerse.reference}
            </cite>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xl mx-auto">
              {featuredVerse.context}
            </p>
            <Link
              href="/daily-verse/john-8-32-truth-sets-you-free"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline"
            >
              Read full context & prayer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Scripture Categories ──────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Explore by Topic</h2>
            <p className="text-muted-foreground">Dive into the subjects that matter most to your faith journey.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-all duration-300 card-hover text-center"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} studies</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Teachings ──────────────────────────────────── */}
      <section className="py-20 bg-secondary/30">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading mb-2">Latest Teachings</h2>
              <p className="text-muted-foreground">Deep scripture study from the original sources.</p>
            </div>
            <Link
              href="/teachings"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline"
            >
              All teachings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestTeachings.map((t, i) => (
              <Link
                key={t.slug}
                href={`/teachings/${t.slug}`}
                className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
              >
                {i === 0 && (
                  <span className="badge-gold self-start">Featured</span>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t.category}</p>
                  <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>{t.date}</span>
                  <span>{t.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/teachings" className="btn-secondary text-sm">
              View all teachings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI Truth Guide CTA ────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-900 via-[#1a1200] to-black p-10 md:p-16 text-white">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-600/10 rounded-full blur-[80px]" />

            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by AI + Scripture
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Ask Anything About the Bible
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Our AI Truth Guide searches across teachings, truth entries, and scripture
                references to give you grounded, contextual answers to your spiritual questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ai-guide"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Exploring
                </Link>
                <Link
                  href="/questions"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-colors"
                >
                  Browse Questions
                </Link>
              </div>

              {/* Sample questions */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "What did Jesus teach about love?",
                  "What is the Kingdom of God?",
                  "How should we pray?",
                ].map((q) => (
                  <Link
                    key={q}
                    href={`/ai-guide?q=${encodeURIComponent(q)}`}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Truth Dictionary Preview ──────────────────────────── */}
      <section className="py-20 bg-secondary/30">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading mb-2">Truth Dictionary</h2>
              <p className="text-muted-foreground">Understand biblical terms in their original depth and context.</p>
            </div>
            <Link
              href="/truth"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline"
            >
              Explore all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {truths.map((t) => (
              <Link
                key={t.slug}
                href={`/truth/${t.slug}`}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
              >
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {t.term}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.preview}</p>
                <span className="inline-flex items-center gap-1 text-xs text-gold-600 dark:text-gold-400 font-medium mt-3">
                  Explore <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search any biblical term — grace, covenant, atonement..."
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* ── Trending Questions ────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-heading mb-2">People Are Asking</h2>
                <p className="text-muted-foreground">Join thousands seeking biblical truth together.</p>
              </div>
              <Link
                href="/questions"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline"
              >
                All questions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {trendingQuestions.map((q, i) => (
                <Link
                  key={q.slug}
                  href={`/questions/${q.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/20 transition-all group"
                >
                  <span className="text-2xl font-serif font-bold text-muted-foreground/30 w-8 text-center">
                    {i + 1}
                  </span>
                  <p className="flex-1 text-sm font-medium text-foreground group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                    {q.q}
                  </p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Ask your own question..."
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <Link href="/questions/ask" className="btn-primary text-sm whitespace-nowrap">
                Ask Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonies ───────────────────────────────────────── */}
      <section className="py-20 bg-secondary/30">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Lives Being Transformed</h2>
            <p className="text-muted-foreground">
              From Lagos to London, people discovering scripture&apos;s real depth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonies.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900 flex items-center justify-center text-gold-700 dark:text-gold-300 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Row ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Everything You Need to Go Deeper</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Daily Verse System", desc: "Context, original meaning, prayer, and related scriptures — every day." },
              { icon: Lightbulb, title: "Truth Dictionary", desc: "870+ biblical terms explained with Hebrew, Greek, and cultural context." },
              { icon: Sparkles, title: "AI Truth Guide", desc: "Ask anything. Get scripture-grounded answers with referenced sources." },
              { icon: Users, title: "Global Community", desc: "Join believers worldwide asking, studying, and growing together." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card">
                <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container-editorial text-center">
          <Heart className="w-10 h-10 text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Begin Your Journey into Truth
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Free forever. No account needed to start. Dive into scripture with new eyes today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/daily-verse" className="btn-primary text-base px-8 py-4">
              <BookOpen className="w-5 h-5" />
              Start Daily Study
            </Link>
            <Link href="/ai-guide" className="btn-secondary text-base px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Try AI Guide Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
