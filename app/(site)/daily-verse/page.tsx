import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, Calendar } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Daily Bible Verse — Scripture Study with Context",
  description:
    "Read today's daily Bible verse with deep historical context, original language insights, prayer, and related scriptures. Updated every day.",
  url: "/daily-verse",
});

const verses = [
  {
    slug: "john-8-32-truth-sets-you-free",
    reference: "John 8:32",
    verse: "The truth will set you free.",
    date: "May 6, 2026",
    isFeatured: true,
    tags: ["truth", "freedom"],
  },
  {
    slug: "matthew-6-33-seek-first-kingdom",
    reference: "Matthew 6:33",
    verse: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    date: "May 5, 2026",
    isFeatured: false,
    tags: ["kingdom", "provision"],
  },
  {
    slug: "john-3-16-god-so-loved",
    reference: "John 3:16",
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    date: "May 4, 2026",
    isFeatured: false,
    tags: ["love", "salvation", "eternal life"],
  },
  {
    slug: "philippians-4-7-peace-of-god",
    reference: "Philippians 4:7",
    verse: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    date: "May 3, 2026",
    isFeatured: false,
    tags: ["peace", "prayer"],
  },
  {
    slug: "romans-8-28-all-things-good",
    reference: "Romans 8:28",
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    date: "May 2, 2026",
    isFeatured: false,
    tags: ["sovereignty", "purpose"],
  },
  {
    slug: "proverbs-3-5-trust-the-lord",
    reference: "Proverbs 3:5–6",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
    date: "May 1, 2026",
    isFeatured: false,
    tags: ["trust", "wisdom"],
  },
];

export default function DailyVersesPage() {
  const [featured, ...rest] = verses;

  return (
    <div className="container-editorial py-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <div className="badge-gold mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          Daily Scripture
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Daily Bible Verse</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Every day, a new scripture with full historical context, original language insight,
          personal application, and prayer.
        </p>
      </header>

      {/* Today's featured */}
      <Link
        href={`/daily-verse/${featured.slug}`}
        className="group block p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gold-900 via-[#1a1200] to-black text-white mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-[80px]" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" />
            Today — {featured.date}
          </span>
          <blockquote className="font-serif text-2xl md:text-3xl font-medium italic mb-4 leading-relaxed text-white/90">
            &ldquo;{featured.verse}&rdquo;
          </blockquote>
          <cite className="text-gold-400 font-semibold not-italic">— {featured.reference}</cite>
          <div className="flex items-center gap-2 mt-6 text-sm text-white/60 group-hover:text-gold-300 transition-colors">
            Read with full context <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      {/* Archive grid */}
      <h2 className="font-serif text-2xl font-bold mb-6">Previous Verses</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {rest.map((v) => (
          <Link
            key={v.slug}
            href={`/daily-verse/${v.slug}`}
            className="group p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
          >
            <p className="text-xs text-muted-foreground mb-2">{v.date}</p>
            <p className="text-sm font-semibold text-gold-600 dark:text-gold-400 mb-2">{v.reference}</p>
            <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
              &ldquo;{v.verse}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-gold-500 transition-colors">
              Read study <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
