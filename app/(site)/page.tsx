import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  MessageCircle,
  Crown,
  Play,
  Clock,
  ChevronRight,
  Star,
  Mail,
  Youtube,
  Instagram,
  Twitter,
  Globe,
  Flame,
  BookMarked,
  Zap,
  Users,
  Video,
} from "lucide-react";
import { generateSEO, generateOrganizationSchema } from "@/lib/seo";
import { kvGet } from "@/lib/kv";
import { type SiteContent, DEFAULT_CONTENT } from "@/lib/content";

export const revalidate = 0;

export const metadata: Metadata = generateSEO({
  title: "The Kingdom of God — Biblical Teachings, Truth & Daily Verse",
  description:
    "A modern Kingdom-focused biblical media platform. Jesus preached the Kingdom of God over 100 times. Discover that message — through teachings, daily verse, articles, Q&A, and video.",
  url: "/",
});

const pillars = [
  {
    icon: Crown,
    label: "Kingdom of God",
    desc: "The primary message of Jesus — God's government on earth",
    href: "/kingdom",
    accent: true,
  },
  {
    icon: BookOpen,
    label: "Bible Study",
    desc: "Deep, contextual studies from the original Word",
    href: "/teachings",
  },
  {
    icon: BookMarked,
    label: "Daily Verse",
    desc: "Scripture with meaning, context, and prayer",
    href: "/daily-verse",
  },
  {
    icon: MessageCircle,
    label: "Questions & Answers",
    desc: "Every question about God answered with truth",
    href: "/questions",
  },
  {
    icon: Video,
    label: "Video Teachings",
    desc: "Watch Kingdom teachings on YouTube",
    href: "/videos",
  },
  {
    icon: Zap,
    label: "Truth Dictionary",
    desc: "Biblical terms defined — no religious spin",
    href: "/truth",
  },
  {
    icon: Globe,
    label: "Blog & Articles",
    desc: "In-depth Kingdom articles and reflections",
    href: "/blog",
  },
  {
    icon: Users,
    label: "Community",
    desc: "Join believers from every nation",
    href: "/newsletter",
  },
];

const latestTeachings = [
  {
    slug: "kingdom-of-god-jesus-primary-message",
    title: "The Kingdom of God: Jesus' #1 Message — And Why the Church Stopped Preaching It",
    excerpt: "Jesus mentioned the Kingdom of God over 100 times in the Gospels. It was the first thing He preached and the last. So why is it almost absent from modern pulpits?",
    category: "Kingdom of God",
    readingTime: 12,
    date: "May 20, 2026",
    featured: true,
  },
  {
    slug: "apostle-paul-kingdom-message",
    title: "Paul's Gospel Was Kingdom, Not Just Salvation",
    excerpt: "Most people reduce Paul to salvation theology. But read Acts 28:31 — Paul preached 'the Kingdom of God and the Lord Jesus Christ.'",
    category: "Apostle Paul",
    readingTime: 10,
    date: "May 18, 2026",
  },
  {
    slug: "identity-citizen-of-heaven",
    title: "You Are a Citizen of Heaven — And That Changes Everything",
    excerpt: "Philippians 3:20 — 'our citizenship is in heaven.' This is your identity, your authority, and your life right now.",
    category: "Identity in Christ",
    readingTime: 8,
    date: "May 15, 2026",
  },
];

const godQuestions = [
  { q: "How do I pray? Does God hear me?", href: "/questions/how-to-pray", tag: "Prayer" },
  { q: "What is the Kingdom of God?", href: "/questions/what-is-kingdom-of-god", tag: "Kingdom" },
  { q: "How do I know God forgives me?", href: "/questions/does-god-forgive-me", tag: "Grace" },
  { q: "What does it mean to be born again?", href: "/questions/born-again-meaning", tag: "Salvation" },
  { q: "Is Jesus the only way to God?", href: "/questions/is-jesus-the-only-way", tag: "Truth" },
  { q: "Why does God allow suffering?", href: "/questions/why-god-allows-suffering", tag: "Faith" },
];

const testimonies = [
  {
    name: "Emmanuel T.",
    location: "Accra, Ghana",
    text: "I've been a Christian for 20 years but never understood what the Kingdom of God meant. This platform changed everything.",
    role: "Pastor",
  },
  {
    name: "Rachel M.",
    location: "London, UK",
    text: "I searched 'how to pray' and found this site. The answer was deep, biblical, Kingdom-rooted truth. I've been back every day.",
    role: "Seeker",
  },
  {
    name: "David O.",
    location: "Lagos, Nigeria",
    text: "Dr. Myles Munroe's Kingdom message changed my life. Now there's a platform continuing that work. Thank God for Joshua Global.",
    role: "Kingdom student",
  },
];

const videos = [
  {
    title: "What Is the Kingdom of God? (Full Teaching)",
    duration: "38 min",
    views: "12K views",
    href: "https://youtube.com/@joshuaglobal",
    category: "Kingdom of God",
  },
  {
    title: "How to Actually Pray — The Lord's Prayer Explained",
    duration: "22 min",
    views: "8K views",
    href: "https://youtube.com/@joshuaglobal",
    category: "Prayer",
  },
  {
    title: "Apostle Paul: The Kingdom Gospel He Preached",
    duration: "44 min",
    views: "6K views",
    href: "https://youtube.com/@joshuaglobal",
    category: "Apostle Paul",
  },
];

const marqueeItems = [
  "The Kingdom of God is at hand",
  "Repent and believe the good news",
  "Seek first His Kingdom",
  "Your Kingdom come, Your will be done",
  "We are citizens of Heaven",
  "Jesus is Lord of the Kingdom",
  "The Kingdom of God is within you",
  "Preach the Kingdom to every nation",
];

const stats = [
  { value: "100+", label: "Kingdom references in the Gospels" },
  { value: "3", label: "Articles published" },
  { value: "12K+", label: "Souls reached worldwide" },
  { value: "365", label: "Daily devotions per year" },
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

      {/* ── Announcement Banner ────────────────────────────────────── */}
      {siteContent.announcementActive && siteContent.announcement && (
        <div className="bg-gold-500 text-black text-sm font-semibold text-center py-2 px-4 fixed top-0 inset-x-0 z-[60]">
          {siteContent.announcement}
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">

        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-[#070604]" />
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gold-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-gold-600/[0.03] rounded-full blur-[100px]" />
          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="container-editorial w-full py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── Left ── */}
            <div className="max-w-xl">
              {/* Label */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="section-label text-gold-600 dark:text-gold-400">
                  Kingdom-Focused Biblical Content
                </span>
              </div>

              {/* Headline */}
              <h1 className="hero-text-xl mb-6 text-balance">
                <span className="block text-foreground">The Kingdom</span>
                <span className="block gold-gradient">of God</span>
                <span className="block text-foreground">Has Come.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-3 text-pretty max-w-md">
                {siteContent.heroSubheading}
              </p>
              <p className="text-sm text-gold-500 dark:text-gold-400 font-medium mb-10">
                Mark 1:15 — The very first words Jesus preached.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-14">
                <Link href="/teachings" className="btn-primary gap-2 px-6 py-3">
                  <BookOpen className="w-4 h-4" />
                  Read Teachings
                </Link>
                <Link href="/videos" className="btn-secondary gap-2 px-6 py-3">
                  <Play className="w-4 h-4" />
                  Watch Videos
                </Link>
                <Link href="/questions" className="btn-secondary gap-2 px-6 py-3">
                  <MessageCircle className="w-4 h-4" />
                  Get Answers
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl font-bold gold-gradient-subtle">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — Cinematic Feature Panel ── */}
            <div className="hidden lg:block relative">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gold-400/5 rounded-3xl blur-2xl" />

              {/* Main panel */}
              <div className="relative rounded-3xl overflow-hidden border border-gold-400/20 bg-gradient-to-br from-zinc-950 via-[#0c0a05] to-zinc-950 p-8 h-[520px] flex flex-col justify-between">

                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Top badge */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/25">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                    <span className="text-gold-300 text-xs font-semibold tracking-wide">Live Teaching</span>
                  </div>
                  <span className="text-zinc-600 text-xs">JoshuaGlobal.live</span>
                </div>

                {/* Central crown emblem */}
                <div className="relative flex flex-col items-center gap-6 flex-1 justify-center">
                  {/* Outer ring */}
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gold-400/10 blur-xl" />
                    <div className="relative w-20 h-20 rounded-full border border-gold-400/30 bg-gold-500/10 flex items-center justify-center">
                      <Crown className="w-9 h-9 text-gold-400" />
                    </div>
                  </div>

                  {/* Scripture block */}
                  <div className="text-center max-w-[280px]">
                    <p className="font-serif text-xl text-white leading-relaxed italic mb-2">
                      &ldquo;The time has come. The Kingdom of God has come near.
                      Repent and believe the good news.&rdquo;
                    </p>
                    <p className="text-gold-400 text-sm font-semibold">— Mark 1:15</p>
                  </div>
                </div>

                {/* Bottom cards */}
                <div className="relative grid grid-cols-3 gap-3">
                  {[
                    { icon: BookOpen, label: "Teachings", href: "/teachings" },
                    { icon: Video, label: "Videos", href: "/videos" },
                    { icon: MessageCircle, label: "Q&A", href: "/questions" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-gold-500/30 transition-all group"
                    >
                      <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-gold-400 transition-colors" />
                      <span className="text-zinc-400 text-xs group-hover:text-zinc-200 transition-colors">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING TICKER ──────────────────────────────────────── */}
      <div className="border-y border-gold-200/20 dark:border-gold-800/20 bg-gold-500/5 dark:bg-gold-950/20 py-3 overflow-hidden">
        <div className="marquee-track mask-fade-x">
          <div className="marquee-content">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-4 px-6 text-xs font-semibold text-gold-600/70 dark:text-gold-400/60 uppercase tracking-[0.1em] whitespace-nowrap">
                <Crown className="w-2.5 h-2.5 text-gold-400/50 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-4 px-6 text-xs font-semibold text-gold-600/70 dark:text-gold-400/60 uppercase tracking-[0.1em] whitespace-nowrap">
                <Crown className="w-2.5 h-2.5 text-gold-400/50 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION STATEMENT ─────────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container-editorial">
          <div className="max-w-5xl mx-auto">
            {/* Label */}
            <div className="text-center mb-16">
              <p className="section-label mb-4">The Assignment</p>
              <h2 className="section-heading max-w-3xl mx-auto text-balance">
                A Platform Built on One Message — the Kingdom of God
              </h2>
            </div>

            {/* 3-column cards */}
            <div className="grid md:grid-cols-3 gap-px bg-border/60 rounded-3xl overflow-hidden">
              {[
                {
                  number: "01",
                  title: "Vision",
                  content: "A world where every nation has heard the uncompromised Gospel of the Kingdom — the same message Jesus preached 100+ times.",
                  verse: "Matthew 24:14",
                },
                {
                  number: "02",
                  title: "Mission",
                  content: "To preach the Kingdom of God to every nation — through teachings, articles, video, and daily devotion — with boldness and without hindrance.",
                  verse: "Acts 28:31",
                },
                {
                  number: "03",
                  title: "Foundation",
                  content: "Built on the Word of God and the legacy of Dr. Myles Munroe — who dedicated his life to restoring the Kingdom message to the church.",
                  verse: "Matthew 6:33",
                },
              ].map((item) => (
                <div key={item.number} className="bg-card p-8 lg:p-10 group hover:bg-secondary/30 transition-colors">
                  <span className="font-serif text-4xl font-bold text-gold-200 dark:text-gold-900 select-none block mb-6">
                    {item.number}
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.content}</p>
                  <span className="text-xs text-gold-500 dark:text-gold-400 font-semibold">{item.verse}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DAILY VERSE ───────────────────────────────────────────── */}
      <section className="py-20 border-y border-border/60 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gold-50/80 via-background to-gold-50/80 dark:from-gold-950/15 dark:via-background dark:to-gold-950/15" />

        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-gold mb-6 mx-auto w-fit">
              <BookMarked className="w-3 h-3" />
              Today&apos;s Verse
            </div>

            <blockquote className="font-serif text-2xl md:text-3xl font-medium italic text-foreground mb-4 leading-[1.4]">
              &ldquo;{siteContent.featuredVerseText}&rdquo;
            </blockquote>
            <cite className="text-gold-600 dark:text-gold-400 font-semibold not-italic text-sm">
              — {siteContent.featuredVerseRef}
            </cite>
            <p className="text-muted-foreground mt-5 text-sm leading-relaxed max-w-xl mx-auto">
              {siteContent.featuredVerseContext}
            </p>
            <Link
              href="/daily-verse"
              className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors group"
            >
              Read full reflection & prayer
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTENT PILLARS ───────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="section-label mb-3">What You&apos;ll Find Here</p>
              <h2 className="section-heading">Eight Pillars of<br />Kingdom Knowledge</h2>
            </div>
            <Link href="/teachings" className="text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1.5 group shrink-0">
              Browse all content
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => (
              <Link
                key={p.label}
                href={p.href}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                  p.accent
                    ? "border-gold-400/40 bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 col-span-1 sm:col-span-2 lg:col-span-2"
                    : "border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:shadow-lg hover:shadow-black/5"
                }`}
              >
                {p.accent && (
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/8 rounded-full blur-3xl" />
                )}
                <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                  p.accent
                    ? "bg-gold-500/15 border border-gold-500/25"
                    : "bg-secondary group-hover:bg-gold-50 dark:group-hover:bg-gold-950/40 transition-colors"
                }`}>
                  <p.icon className={`w-4.5 h-4.5 ${
                    p.accent ? "text-gold-400" : "text-muted-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors"
                  }`} style={{ width: "18px", height: "18px" }} />
                </div>
                <h3 className={`font-semibold text-sm mb-1.5 ${p.accent ? "text-white" : "text-foreground"}`}>
                  {p.label}
                </h3>
                <p className={`text-xs leading-relaxed ${p.accent ? "text-zinc-400" : "text-muted-foreground"}`}>
                  {p.desc}
                </p>
                {p.accent && (
                  <div className="mt-4 flex items-center gap-1 text-gold-400 text-xs font-semibold">
                    Explore <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TEACHINGS ────────────────────────────────────── */}
      <section className="py-28 bg-secondary/25">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="section-label mb-3">Kingdom Teachings</p>
              <h2 className="section-heading">Deep Biblical Truth,<br />No Compromise</h2>
            </div>
            <Link href="/teachings" className="text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1.5 group shrink-0">
              All teachings
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {latestTeachings.map((t, i) => (
              <Link
                key={t.slug}
                href={`/teachings/${t.slug}`}
                className={`group flex flex-col gap-4 p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/6 ${
                  i === 0
                    ? "border-gold-300/40 dark:border-gold-700/30 bg-gradient-to-br from-gold-50/80 to-background dark:from-gold-950/20 dark:to-card"
                    : "border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40"
                }`}
              >
                {i === 0 && (
                  <div className="badge-gold self-start">Featured</div>
                )}
                <div>
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold mb-2">{t.category}</p>
                  <h3 className="font-serif text-base font-bold leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/60">
                  <span>{t.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.readingTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DR. MYLES MUNROE LEGACY ───────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0800] via-[#130f03] to-[#0a0800] border border-gold-400/20 p-10 md:p-16">
            {/* Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-600/6 rounded-full blur-[80px]" />
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative max-w-3xl">
              <div className="badge-gold mb-6 w-fit">
                <Crown className="w-3 h-3" />
                Continuing the Legacy
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                In the Tradition of<br />
                <span className="text-gold-400">Dr. Myles Munroe</span>
              </h2>

              <p className="text-white/60 leading-relaxed mb-4 text-base max-w-2xl">
                Dr. Myles Munroe dedicated 40 years to one message: the Kingdom of God.
                He taught that the Kingdom was Jesus&apos; primary purpose — Heaven&apos;s government on earth, available now.
              </p>
              <p className="text-white/60 leading-relaxed mb-10 text-base max-w-2xl">
                Joshua Global exists to carry that torch — every teaching, article, and verse built on the
                foundation Dr. Munroe laid.
              </p>

              <blockquote className="border-l-2 border-gold-400 pl-6 mb-10">
                <p className="text-gold-100 italic font-serif text-xl leading-relaxed">
                  &ldquo;The greatest tragedy in life is not death, but a life without purpose — without knowing the King and His Kingdom.&rdquo;
                </p>
                <cite className="text-gold-500 text-sm font-semibold not-italic mt-2 block">— Dr. Myles Munroe</cite>
              </blockquote>

              <Link href="/teachings?cat=kingdom" className="btn-primary gap-2">
                <Crown className="w-4 h-4" />
                Study the Kingdom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO TEACHINGS ───────────────────────────────────────── */}
      <section className="py-28 bg-secondary/25">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="section-label mb-3">Video Teachings</p>
              <h2 className="section-heading">Watch the Kingdom<br />Being Preached</h2>
            </div>
            <a
              href="https://youtube.com/@joshuaglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1.5 group shrink-0"
            >
              <Youtube className="w-4 h-4" />
              Subscribe on YouTube
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {videos.map((v, i) => (
              <a
                key={v.title}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8"
              >
                {/* Thumbnail placeholder */}
                <div className={`relative w-full aspect-video flex items-center justify-center ${
                  i === 0
                    ? "bg-gradient-to-br from-zinc-900 via-[#0d0b02] to-zinc-950"
                    : "bg-gradient-to-br from-zinc-900 to-zinc-950"
                }`}>
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                      backgroundSize: "25px 25px",
                    }}
                  />
                  {/* Play button */}
                  <div className="relative w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center shadow-xl shadow-gold-500/30 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-black ml-0.5 fill-black" />
                  </div>
                  {/* Duration */}
                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    {v.duration}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold mb-1.5">{v.category}</p>
                  <h3 className="font-serif font-bold text-sm leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{v.views}</p>
                </div>
              </a>
            ))}
          </div>

          {/* YouTube CTA card */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Joshua Global on YouTube</p>
                <p className="text-xs text-muted-foreground mt-0.5">Kingdom teachings, Bible studies, and truth drops — every week</p>
              </div>
            </div>
            <a
              href="https://youtube.com/@joshuaglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Subscribe Free
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOG ARTICLES ─────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="section-label mb-3">Latest Articles</p>
              <h2 className="section-heading">Kingdom Truth<br />in Written Form</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1.5 group shrink-0">
              All articles
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Featured + Grid */}
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Featured large */}
            <Link
              href="/blog/the-gospel-of-the-kingdom-what-jesus-actually-preached"
              className="group lg:col-span-3 relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 p-8 min-h-[280px] flex flex-col justify-between hover:border-gold-500/40 transition-all"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-gold-400/6 rounded-full blur-3xl" />
              <div className="relative">
                <div className="badge-gold mb-4 w-fit">
                  <Star className="w-3 h-3" /> Featured
                </div>
                <span className="text-gold-400 text-xs font-semibold mb-2 block">Kingdom of God</span>
                <h3 className="font-serif text-xl font-bold text-white leading-snug mb-3 group-hover:text-gold-200 transition-colors max-w-sm">
                  The Gospel of the Kingdom: What Jesus Actually Preached
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 max-w-sm">
                  There are two gospels in circulation. Jesus preached the second — and most churches have forgotten it.
                </p>
              </div>
              <div className="relative flex items-center gap-3 text-xs text-zinc-500 mt-4">
                <Clock className="w-3 h-3" /> 8 min read
                <span>·</span>
                <span>May 20, 2026</span>
                <span className="ml-auto text-gold-400 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Side cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                {
                  title: "You Are Not 'Just a Sinner Saved by Grace' — You Are a Kingdom Citizen",
                  category: "Identity in Christ",
                  time: "7 min",
                  href: "/blog/you-are-not-a-sinner-saved-by-grace-you-are-a-kingdom-citizen",
                },
                {
                  title: "How to Actually Read the Bible and Understand It",
                  category: "Bible Study",
                  time: "9 min",
                  href: "/blog/how-to-actually-read-the-bible-and-understand-it",
                },
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 transition-all flex-1"
                >
                  <span className="text-xs text-gold-600 dark:text-gold-400 font-semibold">{post.category}</span>
                  <h3 className="font-serif font-bold text-sm leading-snug mt-1.5 mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {post.time} read
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUESTIONS ─────────────────────────────────────────────── */}
      <section className="py-28 bg-secondary/25">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-label mb-3">Get Answers</p>
              <h2 className="section-heading mb-4">Questions People<br />Are Asking About God</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                Millions search for answers every day. No religion, no tradition — just the Word.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-10">
              {godQuestions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:bg-gold-50/50 dark:hover:bg-gold-950/20 transition-all"
                >
                  <span className="px-2 py-1 rounded-lg bg-gold-100 dark:bg-gold-900/50 text-gold-700 dark:text-gold-300 text-xs font-semibold whitespace-nowrap">
                    {item.tag}
                  </span>
                  <p className="flex-1 text-sm font-medium group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                    {item.q}
                  </p>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-gold-500 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/questions" className="btn-primary gap-2">
                <MessageCircle className="w-4 h-4" />
                Browse All Questions
              </Link>
              <Link href="/questions/ask" className="btn-secondary gap-2 ml-3">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIES ───────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <p className="section-label mb-3">From the Nations</p>
            <h2 className="section-heading">Lives Being<br />Transformed</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonies.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl border border-border bg-card flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location} · {t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / COMMUNITY ────────────────────────────────── */}
      <section className="py-20 border-y border-border/60">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 border border-gold-400/20 p-10 md:p-14">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-400/8 rounded-full blur-[80px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                backgroundSize: "35px 35px",
              }}
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <div className="badge-gold mb-6 mx-auto w-fit">
                <Users className="w-3 h-3" />
                The Kingdom Community
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Join Thousands of<br />Kingdom Seekers Worldwide
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-3">
                Weekly Kingdom teachings, daily devotionals, scripture reflections, new articles, and truth — delivered to your inbox every morning.
              </p>
              <p className="text-gold-400/70 text-sm mb-10">Free forever. No spam. Unsubscribe anytime.</p>

              {/* What you get */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-left">
                {[
                  { icon: BookOpen, label: "Weekly teachings" },
                  { icon: BookMarked, label: "Daily verses" },
                  { icon: Crown, label: "Kingdom devotionals" },
                  { icon: Video, label: "New video alerts" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/8">
                    <item.icon className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span className="text-zinc-300 text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-gold-400/60 focus:bg-white/10 transition-all"
                  />
                </div>
                <button type="submit" className="btn-primary whitespace-nowrap px-6 py-3">
                  Join Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PLATFORMS ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-editorial">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Follow the Movement</p>
            <h2 className="font-serif text-2xl font-bold">The Kingdom on Every Platform</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "YouTube", sub: "Kingdom Teachings", href: "https://youtube.com/@joshuaglobal", Icon: Youtube, color: "hover:border-red-500/50 hover:bg-red-500/5 group-hover:text-red-400" },
              { label: "Instagram", sub: "Daily Verses & Reels", href: "https://instagram.com/joshuaglobal", Icon: Instagram, color: "hover:border-pink-500/50 hover:bg-pink-500/5 group-hover:text-pink-400" },
              { label: "TikTok", sub: "Truth Drops", href: "https://tiktok.com/@joshuaglobal", Icon: Flame, color: "hover:border-zinc-400/50 hover:bg-zinc-400/5 group-hover:text-zinc-300" },
              { label: "Twitter / X", sub: "Kingdom Declarations", href: "https://twitter.com/joshuaglobal", Icon: Twitter, color: "hover:border-sky-500/50 hover:bg-sky-500/5 group-hover:text-sky-400" },
              { label: "Pinterest", sub: "Scripture Graphics", href: "https://pinterest.com/joshuaglobal", Icon: Globe, color: "hover:border-red-400/50 hover:bg-red-400/5 group-hover:text-red-400" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 ${s.color}`}
              >
                <s.Icon className={`w-4.5 h-4.5 text-muted-foreground transition-colors ${s.color}`} style={{ width: "18px", height: "18px" }} />
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border/60">
        <div className="container-editorial text-center">
          <div className="max-w-2xl mx-auto">
            <Crown className="w-8 h-8 text-gold-400 mx-auto mb-8 opacity-80" />
            <h2 className="section-heading mb-5">
              Enter the Kingdom.<br />Know the King.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3 max-w-lg mx-auto">
              The number one goal of every human being should be entering into the Kingdom of God.
              Jesus paid the price. The door is open.
            </p>
            <p className="text-gold-500 dark:text-gold-400 text-sm font-semibold mb-12">
              &ldquo;But seek first his kingdom and his righteousness.&rdquo; — Matthew 6:33
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/kingdom" className="btn-primary gap-2 px-8 py-3.5">
                <Crown className="w-4 h-4" />
                Start with the Kingdom
              </Link>
              <Link href="/daily-verse" className="btn-secondary gap-2 px-8 py-3.5">
                <BookOpen className="w-4 h-4" />
                Today&apos;s Verse &amp; Prayer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
