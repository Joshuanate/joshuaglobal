import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Search,
  ChevronRight,
  Star,
  ArrowRight,
  MessageCircle,
  BookMarked,
  Crown,
  Shield,
  Flame,
  Globe,
  Heart,
  Youtube,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import { generateSEO, generateOrganizationSchema } from "@/lib/seo";
import { kvGet } from "@/lib/kv";
import { type SiteContent, DEFAULT_CONTENT } from "@/lib/content";

export const revalidate = 0;

export const metadata: Metadata = generateSEO({
  title: "The Kingdom of God — Preach the Truth, Know the King",
  description:
    "Jesus preached the Kingdom of God over 100 times. This is that message — unfiltered, uncompromised. Daily verse, Kingdom teachings, biblical truth, and answers to every question about God.",
  url: "/",
});

const categories = [
  { name: "Kingdom of God", icon: "👑", count: 124, href: "/teachings?cat=kingdom", featured: true },
  { name: "Apostle Paul", icon: "✉", count: 78, href: "/teachings?cat=paul" },
  { name: "Salvation & Grace", icon: "✝", count: 104, href: "/truth/grace" },
  { name: "Prayer & Intercession", icon: "🙏", count: 89, href: "/teachings?cat=prayer" },
  { name: "Identity in Christ", icon: "✦", count: 67, href: "/teachings?cat=identity" },
  { name: "Exposing Deception", icon: "⚔", count: 55, href: "/teachings?cat=deception" },
  { name: "Holy Spirit", icon: "🔥", count: 91, href: "/teachings?cat=spirit" },
  { name: "End Times", icon: "◎", count: 48, href: "/teachings?cat=endtimes" },
];

const latestTeachings = [
  {
    slug: "kingdom-of-god-jesus-primary-message",
    title: "The Kingdom of God: Jesus' #1 Message — And Why the Church Stopped Preaching It",
    excerpt: "Jesus mentioned the Kingdom of God over 100 times in the Gospels. It was the first thing He preached and the last. So why is it almost absent from modern pulpits?",
    category: "Kingdom of God",
    readingTime: 12,
    date: "May 20, 2026",
  },
  {
    slug: "apostle-paul-kingdom-message",
    title: "Paul the Apostle: His Gospel Was Kingdom, Not Just Salvation",
    excerpt: "Most people reduce Paul to salvation theology. But read Acts 28:31 — Paul spent his final days preaching 'the Kingdom of God and teaching about the Lord Jesus Christ.'",
    category: "Apostle Paul",
    readingTime: 10,
    date: "May 18, 2026",
  },
  {
    slug: "identity-citizen-of-heaven",
    title: "You Are a Citizen of Heaven — And That Changes Everything",
    excerpt: "Philippians 3:20 — 'our citizenship is in heaven.' Paul is not talking about dying and going to heaven. He is talking about your identity, your authority, and your life right now.",
    category: "Identity in Christ",
    readingTime: 8,
    date: "May 15, 2026",
  },
];

const godQuestions = [
  { q: "How do I pray? Does God actually hear me?", href: "/questions/how-to-pray", tag: "Prayer" },
  { q: "What is the Kingdom of God and how do I enter it?", href: "/questions/what-is-kingdom-of-god", tag: "Kingdom" },
  { q: "How do I know God forgives me?", href: "/questions/does-god-forgive-me", tag: "Salvation" },
  { q: "What does it mean to be born again?", href: "/questions/born-again-meaning", tag: "Salvation" },
  { q: "Is Jesus really the only way to God?", href: "/questions/is-jesus-the-only-way", tag: "Truth" },
  { q: "Why does God allow suffering and pain?", href: "/questions/why-god-allows-suffering", tag: "Faith" },
  { q: "What is the Holy Spirit and how does He work?", href: "/questions/what-is-holy-spirit", tag: "Spirit" },
  { q: "How do I read the Bible and understand it?", href: "/questions/how-to-read-bible", tag: "Study" },
  { q: "What does the Bible say about fear and anxiety?", href: "/questions/bible-fear-anxiety", tag: "Peace" },
  { q: "Who was Apostle Paul and why does he matter?", href: "/questions/who-was-apostle-paul", tag: "Paul" },
];

const testimonies = [
  {
    name: "Emmanuel T.",
    location: "Accra, Ghana",
    text: "I've been a Christian for 20 years but never understood what the Kingdom of God actually meant. This platform changed everything. I finally understand what Jesus was preaching.",
    rating: 5,
  },
  {
    name: "Rachel M.",
    location: "London, UK",
    text: "I searched 'how to pray' and found this site. The answer wasn't just steps — it was deep, biblical, Kingdom-rooted truth. I've been coming back every day since.",
    rating: 5,
  },
  {
    name: "David O.",
    location: "Lagos, Nigeria",
    text: "Dr. Myles Munroe's Kingdom message was the most important thing I ever heard. Now there's a platform continuing that work. Thank God for Joshua Global.",
    rating: 5,
  },
];

const stats = [
  { value: "100+", label: "Times Jesus preached Kingdom" },
  { value: "850+", label: "Truth entries" },
  { value: "12,000+", label: "Souls reached worldwide" },
  { value: "365", label: "Daily devotions/year" },
];

const socials = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@joshuaglobal", color: "hover:text-red-500" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/joshuaglobal", color: "hover:text-pink-500" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/joshuaglobal", color: "hover:text-sky-400" },
  { icon: Mail, label: "TikTok", href: "https://tiktok.com/@joshuaglobal", color: "hover:text-white" },
];

export default async function HomePage() {
  const orgSchema = generateOrganizationSchema();
  const siteContent: SiteContent = (await kvGet<SiteContent>("site:content")) ?? DEFAULT_CONTENT;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* ── Announcement Banner ───────────────────────────────── */}
      {siteContent.announcementActive && siteContent.announcement && (
        <div className="bg-gold-500 text-black text-sm font-semibold text-center py-2.5 px-4">
          {siteContent.announcement}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gold-400/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-600/4 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-editorial w-full py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-sm font-medium mb-8">
              <Crown className="w-3.5 h-3.5" />
              Kingdom of God Ministry — Jesus Is Lord
            </div>

            <h1 className="hero-text mb-6">
              <span className="gold-gradient">The Kingdom of God</span>
              <br />
              Has Come
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
              {siteContent.heroSubheading}
            </p>

            <p className="text-base text-gold-500 dark:text-gold-400 font-semibold mb-10 tracking-wide">
              &ldquo;Mine is the Kingdom. Lord Jesus is my King.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/kingdom" className="btn-primary text-base gap-2 px-8 py-4">
                <Crown className="w-5 h-5" />
                Explore the Kingdom
              </Link>
              <Link href="/daily-verse" className="btn-secondary text-base gap-2 px-8 py-4">
                <BookOpen className="w-5 h-5" />
                Daily Verse & Prayer
              </Link>
              <Link href="/questions" className="btn-secondary text-base gap-2 px-8 py-4">
                <MessageCircle className="w-5 h-5" />
                Get Answers
              </Link>
            </div>

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

      {/* ── Kingdom Declaration ───────────────────────────────── */}
      <section className="py-16 border-y border-gold-200/30 dark:border-gold-800/30 bg-gradient-to-r from-gold-950/40 via-black/60 to-gold-950/40">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <Crown className="w-8 h-8 text-gold-400 mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
              &ldquo;The time has come. The Kingdom of God has come near. Repent and believe the good news.&rdquo;
            </h2>
            <p className="text-gold-400 font-semibold mb-6">— Mark 1:15 — The very first words Jesus preached</p>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Not a church denomination. Not a religious ritual. Not a far-off future event.
              The Kingdom of God is the government of Heaven invading earth — and it is available to you right now.
              This is the message Joshua Global was built to declare.
            </p>
          </div>
        </div>
      </section>

      {/* ── Truth Declaration ─────────────────────────────────── */}
      <section className="py-14 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "This Is Truth",
                  desc: "Not one perspective among many. Not tradition, not religion, not opinion. What you find here is grounded in the original Word of God — Hebrew, Greek, and context included.",
                },
                {
                  icon: Flame,
                  title: "The Kingdom First",
                  desc: "Everything on this platform begins with the Kingdom of God — because that is where Jesus began. Matthew 6:33 is not a suggestion. It is the order of Heaven.",
                },
                {
                  icon: Globe,
                  title: "For Every Nation",
                  desc: "The Gospel of the Kingdom is for all people, all nations, all languages. From Lagos to London, from Manila to Miami — the King has no borders.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
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
              Today&apos;s Verse
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl font-medium italic text-foreground mb-4 leading-relaxed">
              &ldquo;{siteContent.featuredVerseText}&rdquo;
            </blockquote>
            <cite className="text-gold-600 dark:text-gold-400 font-semibold not-italic">
              — {siteContent.featuredVerseRef}
            </cite>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xl mx-auto">
              {siteContent.featuredVerseContext}
            </p>
            <Link
              href="/daily-verse"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline"
            >
              Read full context, meaning & prayer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Explore by Topic</h2>
            <p className="text-muted-foreground">Every topic rooted in Kingdom truth and the original Word of God.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 card-hover text-center ${
                  cat.featured
                    ? "border-gold-400 dark:border-gold-600 bg-gradient-to-br from-gold-950/60 to-black col-span-2 md:col-span-1"
                    : "border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/30"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className={`text-sm font-semibold transition-colors ${
                    cat.featured
                      ? "text-gold-300"
                      : "text-foreground group-hover:text-gold-700 dark:group-hover:text-gold-300"
                  }`}>
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} studies</p>
                </div>
                {cat.featured && (
                  <span className="text-xs text-gold-500 font-medium">Primary Pillar</span>
                )}
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
              <h2 className="section-heading mb-2">Kingdom Teachings</h2>
              <p className="text-muted-foreground">Deep, uncompromised truth from the original Word.</p>
            </div>
            <Link href="/teachings" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400 hover:underline">
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
                {i === 0 && <span className="badge-gold self-start">Featured</span>}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t.category}</p>
                  <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>{t.date}</span>
                  <span>{t.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dr. Myles Munroe Section ──────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black p-10 md:p-14">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-gold-700/8 rounded-full blur-[80px]" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/25 text-gold-300 text-xs font-semibold mb-6">
                <Crown className="w-3.5 h-3.5" />
                Continuing the Legacy
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                In the Tradition of Dr. Myles Munroe
              </h2>
              <p className="text-white/65 leading-relaxed mb-4 text-lg">
                Dr. Myles Munroe dedicated his life to one message: the Kingdom of God.
                He taught that the Kingdom was Jesus&apos; primary purpose — not heaven after death,
                but Heaven&apos;s government on earth right now.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Joshua Global exists to carry that torch. Every teaching, every article, every daily verse
                on this platform is built on the foundation Dr. Munroe laid — that the number one goal
                of every human being should be entering and living in the Kingdom of God.
              </p>
              <blockquote className="border-l-2 border-gold-400 pl-5 mb-8">
                <p className="text-gold-200 italic font-serif text-xl leading-relaxed">
                  &ldquo;The greatest tragedy in life is not death, but a life without purpose — without knowing the King and His Kingdom.&rdquo;
                </p>
                <cite className="text-gold-500 text-sm font-semibold not-italic mt-2 block">— Dr. Myles Munroe</cite>
              </blockquote>
              <Link href="/teachings?cat=kingdom" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold transition-colors">
                <Crown className="w-4 h-4" />
                Study the Kingdom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Questions People Ask About God ────────────────────── */}
      <section className="py-20 bg-secondary/30">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <div className="badge-gold mb-4 justify-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              Answers for Every Seeker
            </div>
            <h2 className="section-heading mb-3">Questions People Are Asking About God</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Millions search for answers every day. Every question you have about God, Jesus, prayer,
              and the Kingdom — the truth is here. No religion. No tradition. Just the Word.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto mb-10">
            {godQuestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/20 transition-all"
              >
                <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/50 text-gold-700 dark:text-gold-300 text-xs font-semibold whitespace-nowrap">
                  {item.tag}
                </span>
                <p className="flex-1 text-sm font-medium text-foreground group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                  {item.q}
                </p>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="relative max-w-xl mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ask your question about God, Jesus, or the Bible..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <Link href="/questions/ask" className="btn-primary text-sm whitespace-nowrap px-5">
                Get Answer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonies ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Lives Being Transformed</h2>
            <p className="text-muted-foreground">From Lagos to London, the Kingdom message is reaching the nations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonies.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-4">
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

      {/* ── Social Media Strip ────────────────────────────────── */}
      <section className="py-14 border-y border-border bg-secondary/20">
        <div className="container-editorial">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">Follow the Kingdom Message</h2>
            <p className="text-muted-foreground text-sm">Daily truth on every platform — YouTube, Instagram, TikTok, Twitter/X, Pinterest</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "YouTube", sublabel: "Kingdom Teachings", href: "https://youtube.com/@joshuaglobal", icon: Youtube, color: "border-red-500/30 hover:border-red-500 hover:bg-red-500/5" },
              { label: "Instagram", sublabel: "Daily Verses & Reels", href: "https://instagram.com/joshuaglobal", icon: Instagram, color: "border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/5" },
              { label: "TikTok", sublabel: "Truth Drops", href: "https://tiktok.com/@joshuaglobal", icon: Flame, color: "border-white/20 hover:border-white/60 hover:bg-white/5" },
              { label: "Twitter / X", sublabel: "Kingdom Declarations", href: "https://twitter.com/joshuaglobal", icon: Twitter, color: "border-sky-500/30 hover:border-sky-500 hover:bg-sky-500/5" },
              { label: "Pinterest", sublabel: "Scripture Graphics", href: "https://pinterest.com/joshuaglobal", icon: Globe, color: "border-red-400/30 hover:border-red-400 hover:bg-red-400/5" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border bg-card transition-all duration-300 group ${s.color}`}
              >
                <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sublabel}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="container-editorial text-center">
          <Crown className="w-10 h-10 text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Enter the Kingdom. Know the King.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            The number one goal of every human being should be entering into the Kingdom of Heaven.
            Jesus paid the price. The door is open. Start here.
          </p>
          <p className="text-gold-500 font-semibold mb-10">
            &ldquo;Lord destroy my ungodly thinking — give me your culture of Kingdom.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kingdom" className="btn-primary text-base px-8 py-4">
              <Crown className="w-5 h-5" />
              Start with the Kingdom
            </Link>
            <Link href="/daily-verse" className="btn-secondary text-base px-8 py-4">
              <BookOpen className="w-5 h-5" />
              Today&apos;s Verse & Prayer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
