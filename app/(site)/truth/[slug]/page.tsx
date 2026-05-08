import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, Search } from "lucide-react";
import {
  generateSEO,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";

const getEntry = (slug: string) => ({
  slug,
  term: "Repentance",
  category: "Core Doctrines",
  definition:
    "Repentance is the turning away from sin and the self-directed life, toward God and his ways. It is not merely feeling sorry for wrongdoing, but a fundamental reorientation of one's mind, will, and direction.",
  hebrewGreek: `The primary New Testament word for repentance is μετάνοια (metanoia), from meta (change) and nous (mind). It literally means a change of mind — not just sorrow or remorse, but a complete shift in thinking, perspective, and direction. The Hebrew equivalent, שׁוּב (shuv), means "to return" or "to turn back" — emphasizing a relational return to God. John the Baptist and Jesus both began their ministry with the call to "repent," establishing it as foundational to the Gospel.`,
  biblicalContext:
    "Repentance appears at the very beginning of Jesus' public ministry (Matthew 4:17). It is the first word of the Gospel proclamation. The first Christians preached repentance as the doorway to receiving the Holy Spirit (Acts 2:38). Paul describes repentance as being 'led by the goodness of God' (Romans 2:4), not fear of punishment — suggesting that true repentance is drawn by encountering divine love, not compelled by guilt.",
  misconceptions:
    "The most common misconception is equating repentance with remorse or emotional guilt. Many Christians believe repentance is primarily about feeling bad about sin. But metanoia is cognitive and volitional — it concerns the direction of the mind and will. Another misconception is that repentance is a one-time act. Scripture presents it as a lifestyle — an ongoing orientation toward God.",
  application:
    "Practical repentance means honestly examining areas where your thinking aligns more with cultural narratives than with the mind of Christ. It means choosing to think differently — about money, relationships, power, status, and identity — in alignment with the Kingdom of God.",
  scriptures: [
    { ref: "Matthew 4:17", text: "Repent, for the kingdom of heaven has come near." },
    { ref: "Acts 2:38", text: "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins." },
    { ref: "Romans 2:4", text: "God's kindness is intended to lead you to repentance." },
    { ref: "2 Corinthians 7:10", text: "Godly sorrow brings repentance that leads to salvation and leaves no regret." },
    { ref: "Luke 15:7", text: "There will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent." },
  ],
  relatedTerms: ["Grace", "Salvation", "Sanctification", "Faith", "Forgiveness"],
  faq: [
    {
      question: "Is repentance the same as confession?",
      answer: "No. Confession is acknowledging sin verbally. Repentance is turning from it — a change of mind and direction. Confession without metanoia is incomplete.",
    },
    {
      question: "Can you repent without feeling sorry?",
      answer: "True metanoia produces godly sorrow (2 Cor 7:10), but the sorrow is not the repentance itself. Repentance is primarily a change of mind and direction, not an emotion.",
    },
    {
      question: "How often should a Christian repent?",
      answer: "Repentance is not a one-time event but an ongoing posture. As we grow in awareness of how our thinking diverges from God's, we continually return (shuv) to alignment with him.",
    },
    {
      question: "Is repentance required for salvation?",
      answer: "Jesus, Peter, and Paul all proclaimed repentance as foundational to receiving the Gospel. It's not a work to earn salvation but the natural turning toward God that faith produces.",
    },
  ],
  tags: ["repentance", "metanoia", "salvation", "core doctrine"],
  updatedAt: new Date("2026-05-01"),
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  return generateSEO({
    title: `${entry.term} — Biblical Definition & Original Meaning`,
    description: `What is ${entry.term}? Learn the original Hebrew/Greek meaning, biblical context, common misconceptions, and supporting scriptures.`,
    url: `/truth/${slug}`,
    type: "article",
    updatedAt: entry.updatedAt,
    tags: entry.tags,
  });
}

export default async function TruthEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry(slug);

  const faqSchema = generateFAQSchema(entry.faq);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Truth Dictionary", url: "/truth" },
    { name: entry.term, url: `/truth/${slug}` },
  ]);
  const articleSchema = generateArticleSchema({
    title: `${entry.term} — Biblical Definition`,
    description: entry.definition,
    url: `/truth/${slug}`,
    updatedAt: entry.updatedAt,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="container-editorial py-12 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/truth" className="hover:text-foreground">Truth Dictionary</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{entry.term}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400 mb-3">
            {entry.category}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{entry.term}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {entry.definition}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Hebrew/Greek */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Original Hebrew/Greek Meaning</h2>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <p className="text-muted-foreground leading-relaxed">{entry.hebrewGreek}</p>
              </div>
            </section>

            {/* Biblical Context */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Biblical Context</h2>
              <p className="text-muted-foreground leading-relaxed">{entry.biblicalContext}</p>
            </section>

            {/* Misconceptions */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Common Misconceptions</h2>
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <p className="text-muted-foreground leading-relaxed">{entry.misconceptions}</p>
              </div>
            </section>

            {/* Application */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Practical Application</h2>
              <p className="text-muted-foreground leading-relaxed">{entry.application}</p>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {entry.faq.map((item) => (
                  <div key={item.question} className="p-5 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Supporting Scriptures */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-4">Supporting Scriptures</h3>
              <div className="space-y-3">
                {entry.scriptures.map((s) => (
                  <div key={s.ref} className="p-3 rounded-xl bg-secondary/50">
                    <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1">{s.ref}</p>
                    <p className="text-sm text-muted-foreground italic">&ldquo;{s.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Terms */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-4">Related Terms</h3>
              <div className="space-y-2">
                {entry.relatedTerms.map((term) => (
                  <Link
                    key={term}
                    href={`/truth/${term.toLowerCase()}`}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <span className="text-sm font-medium">{term}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-3">Search Dictionary</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search terms..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
