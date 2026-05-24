import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, ArrowRight, Clock, Crown, BookOpen, Mail } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Daily Bible Verse — Scripture with Context, Meaning & Prayer",
  description:
    "Start every day grounded in God's Word. Read today's verse with deep historical context, original language insights, personal application, and prayer. Updated daily.",
  url: "/daily-verse",
});

const todayVerse = {
  slug: "john-8-32-truth-sets-you-free",
  reference: "John 8:32",
  book: "John",
  text: "The truth will set you free.",
  fullContext: "Jesus was speaking to Jews who had believed in him in the temple courts in Jerusalem. He makes a conditional promise: those who hold to his teaching are truly his disciples — and they will know the truth that liberates.",
  date: "Today",
  tags: ["truth", "freedom", "discipleship"],
};

const recentVerses = [
  {
    slug: "matthew-6-33-seek-first-kingdom",
    reference: "Matthew 6:33",
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    date: "Yesterday",
    tags: ["kingdom", "provision", "priority"],
  },
  {
    slug: "john-3-16-god-so-loved",
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    date: "May 23",
    tags: ["love", "salvation", "eternal life"],
  },
  {
    slug: "philippians-4-7-peace-of-god",
    reference: "Philippians 4:7",
    text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    date: "May 22",
    tags: ["peace", "prayer", "mind"],
  },
  {
    slug: "romans-8-28-all-things-good",
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    date: "May 21",
    tags: ["sovereignty", "purpose", "faith"],
  },
  {
    slug: "proverbs-3-5-trust-the-lord",
    reference: "Proverbs 3:5–6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    date: "May 20",
    tags: ["trust", "wisdom", "guidance"],
  },
  {
    slug: "isaiah-40-31-renew-strength",
    reference: "Isaiah 40:31",
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    date: "May 19",
    tags: ["strength", "hope", "endurance"],
  },
];

const benefits = [
  { icon: BookMarked, label: "Historical context" },
  { icon: Crown, label: "Kingdom meaning" },
  { icon: BookOpen, label: "Original language" },
  { icon: Mail, label: "Prayer to pray" },
];

export default function DailyVersesPage() {
  return (
    <div>

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="py-20 border-b border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="section-label text-gold-600 dark:text-gold-400">Daily Scripture</span>
            </div>
            <h1 className="section-heading mb-4">
              Daily Bible Verse
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Every day, a new scripture — with full historical context, original language insight,
              personal application, and a prayer to carry with you.
            </p>
          </div>
        </div>
      </section>

      {/* ── TODAY'S VERSE ────────────────────────────────────────── */}
      <section className="py-20 border-b border-border/60">
        <div className="container-editorial">
          <p className="section-label mb-8">Today&apos;s Verse</p>

          <div className="max-w-5xl">
            <Link
              href={`/daily-verse/${todayVerse.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-gold-400/20 bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 p-10 md:p-14 hover:border-gold-400/40 transition-all"
            >
              {/* Ambient glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-600/4 rounded-full blur-3xl pointer-events-none" />
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                  backgroundSize: "35px 35px",
                }}
              />

              <div className="relative">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/25">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                    <span className="text-gold-300 text-xs font-semibold tracking-wide">Today — {todayVerse.date}</span>
                  </div>
                </div>

                {/* Verse */}
                <div className="mb-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full mb-6" />
                  <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                    &ldquo;{todayVerse.text}&rdquo;
                  </blockquote>
                  <cite className="text-gold-400 font-semibold not-italic text-lg">
                    — {todayVerse.reference}
                  </cite>
                </div>

                {/* Context preview */}
                <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl mb-8">
                  {todayVerse.fullContext}
                </p>

                {/* What's inside */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {benefits.map((b) => (
                    <div key={b.label} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/8">
                      <b.icon className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-xs font-medium">{b.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-gold-400 font-semibold group-hover:gap-3 transition-all">
                  Read full study — context, meaning &amp; prayer
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {todayVerse.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/8 text-zinc-400 text-xs font-medium capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── RECENT VERSES ────────────────────────────────────────── */}
      <section className="py-20 pb-28">
        <div className="container-editorial">
          <div className="flex items-center justify-between mb-10">
            <p className="section-label">Previous Verses</p>
            <Link
              href="/newsletter"
              className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors group"
            >
              Get them daily by email
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentVerses.map((v) => (
              <Link
                key={v.slug}
                href={`/daily-verse/${v.slug}`}
                className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold-600 dark:text-gold-400 font-semibold">{v.reference}</span>
                  <span className="text-xs text-muted-foreground">{v.date}</span>
                </div>
                <blockquote className="font-serif italic text-foreground leading-relaxed text-sm flex-1">
                  &ldquo;{v.text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground capitalize">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gold-500 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Study <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────── */}
      <section className="pb-28">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 border border-gold-400/20 p-10 md:p-14">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                backgroundSize: "35px 35px",
              }}
            />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-lg">
                <div className="badge-gold mb-5 w-fit">
                  <BookMarked className="w-3 h-3" />
                  Never Miss a Verse
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
                  Start Every Morning<br />Grounded in the Word
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Get the daily verse with full context, original language meaning, Kingdom application, and a prayer — delivered to your inbox every morning. Free forever.
                </p>
              </div>

              <form
                action="/api/newsletter"
                method="POST"
                className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[320px] shrink-0"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-gold-400/60 transition-all"
                />
                <button type="submit" className="btn-primary justify-center py-3">
                  <Mail className="w-4 h-4" />
                  Subscribe Free
                </button>
                <p className="text-xs text-zinc-500 text-center">No spam. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
