import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Share2,
  Volume2,
  ChevronRight,
  Heart,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";

// Static demo data — replace with DB fetch in production
const getVerse = (slug: string) => ({
  slug,
  verse: "The truth will set you free.",
  reference: "John 8:32",
  book: "John",
  chapter: 8,
  verseNumber: "32",
  translation: "NIV",
  context:
    "Jesus was speaking to Jews who had believed in him in the temple courts at Jerusalem. He makes a conditional promise: those who 'hold to my teaching' are truly his disciples. This verse is the second half of that promise.",
  originalMeaning:
    "The Greek word for 'truth' here is ἀλήθεια (alētheia) — not just factual accuracy, but ultimate reality and the nature of God. 'Set free' (ἐλευθερώσει, eleutherōsei) carries the meaning of liberation from bondage. Jesus is declaring that knowing divine reality — through abiding in his word — produces genuine freedom from sin, deception, and spiritual death.",
  inspiration:
    "This verse is often quoted culturally in contexts of political or intellectual freedom, but its original weight is far deeper. Jesus is not speaking about information — he is speaking about himself. In John 14:6, he says 'I am the way, the truth, and the life.' The truth that sets you free is a Person, not merely a proposition.",
  prayer:
    "Lord Jesus, open my eyes to the depths of your truth. Let your Word be a living light in my life. Free me from every deception I have accepted, every tradition that contradicts your reality. I choose today to hold fast to your teaching. Amen.",
  application:
    "Ask yourself: Are there areas of your life shaped by cultural or religious assumptions rather than Jesus' actual words? This verse invites a return to primary source — the Gospels — to test what you believe against what he actually said.",
  relatedVerses: [
    { ref: "John 14:6", text: "I am the way, the truth, and the life." },
    { ref: "John 17:17", text: "Your word is truth." },
    { ref: "Romans 8:2", text: "The Spirit of life has set you free from the law of sin and death." },
    { ref: "Galatians 5:1", text: "It is for freedom that Christ has set us free." },
  ],
  tags: ["truth", "freedom", "discipleship", "gospel of john"],
  publishedAt: new Date("2026-05-06"),
  audioUrl: null,
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const verse = getVerse(slug);
  return generateSEO({
    title: `${verse.reference} — "${verse.verse}"`,
    description: `Daily verse study: ${verse.verse} (${verse.reference}). Discover the original meaning, context, prayer, and related scriptures.`,
    url: `/daily-verse/${slug}`,
    type: "article",
    publishedAt: verse.publishedAt,
    tags: verse.tags,
  });
}

export default async function DailyVersePage({ params }: Props) {
  const { slug } = await params;
  const verse = getVerse(slug);

  const articleSchema = generateArticleSchema({
    title: `${verse.reference} — "${verse.verse}"`,
    description: verse.context,
    url: `/daily-verse/${slug}`,
    publishedAt: verse.publishedAt,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Daily Verse", url: "/daily-verse" },
    { name: verse.reference, url: `/daily-verse/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="container-editorial py-12 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/daily-verse" className="hover:text-foreground">Daily Verse</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{verse.reference}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="badge-gold mb-6">
            <Clock className="w-3 h-3 mr-1" />
            Daily Verse — {verse.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>

          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gold-50 via-parchment-50 to-gold-50/50 dark:from-gold-950/30 dark:via-background dark:to-gold-950/20 border border-gold-200 dark:border-gold-800/50 mb-8">
            <div className="absolute top-6 left-6 w-1 h-16 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full" />
            <blockquote className="pl-6">
              <p className="font-serif text-2xl md:text-3xl font-medium italic text-foreground leading-relaxed mb-4">
                &ldquo;{verse.verse}&rdquo;
              </p>
              <cite className="text-gold-600 dark:text-gold-400 font-semibold not-italic text-lg">
                — {verse.reference} ({verse.translation})
              </cite>
            </blockquote>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {verse.audioUrl && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-medium transition-colors">
                <Volume2 className="w-4 h-4" />
                Listen (Audio)
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-medium transition-colors">
              <Share2 className="w-4 h-4" />
              Share Verse
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-medium transition-colors">
              <Heart className="w-4 h-4" />
              Save
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Context */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center text-gold-600 dark:text-gold-400 text-xs font-bold">1</span>
                Historical Context
              </h2>
              <p className="text-muted-foreground leading-relaxed">{verse.context}</p>
            </section>

            {/* Original Meaning */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center text-gold-600 dark:text-gold-400 text-xs font-bold">2</span>
                Original Greek/Hebrew Meaning
              </h2>
              <div className="p-5 rounded-2xl bg-secondary/50 border border-border">
                <p className="text-muted-foreground leading-relaxed">{verse.originalMeaning}</p>
              </div>
            </section>

            {/* Inspiration */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center text-gold-600 dark:text-gold-400 text-xs font-bold">3</span>
                Inspiration & Insight
              </h2>
              <p className="text-muted-foreground leading-relaxed">{verse.inspiration}</p>
            </section>

            {/* Application */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center text-gold-600 dark:text-gold-400 text-xs font-bold">4</span>
                Personal Application
              </h2>
              <p className="text-muted-foreground leading-relaxed">{verse.application}</p>
            </section>

            {/* Prayer */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center text-gold-600 dark:text-gold-400 text-xs font-bold">5</span>
                Prayer
              </h2>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-parchment-50 dark:from-gold-950/20 dark:to-background border border-gold-200 dark:border-gold-800/50">
                <div className="absolute top-4 left-4 w-0.5 h-full bg-gradient-to-b from-gold-400 to-transparent" />
                <p className="pl-4 text-muted-foreground leading-relaxed italic font-serif">
                  {verse.prayer}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related Verses */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-4">Related Scriptures</h3>
              <div className="space-y-3">
                {verse.relatedVerses.map((rv) => (
                  <div key={rv.ref} className="p-3 rounded-xl bg-secondary/50">
                    <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1">
                      {rv.ref}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      &ldquo;{rv.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {verse.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/teachings?tag=${tag}`}
                    className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="p-6 rounded-2xl border border-gold-200 dark:border-gold-800/50 bg-gradient-to-br from-gold-50 to-parchment-50 dark:from-gold-950/20 dark:to-background">
              <BookOpen className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="font-serif font-bold mb-2">Daily in Your Inbox</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Get today&apos;s verse with full study context delivered every morning.
              </p>
              <Link href="/newsletter" className="btn-primary w-full justify-center text-sm">
                Subscribe Free
              </Link>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <nav className="mt-16 flex justify-between border-t border-border pt-8">
          <Link href="/daily-verse" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
            All Daily Verses
          </Link>
          <Link href="/teachings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Explore Teachings
            <ChevronRight className="w-4 h-4" />
          </Link>
        </nav>
      </article>
    </>
  );
}
