import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ChevronUp, BookOpen, MessageCircle } from "lucide-react";
import { generateSEO, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

const getQuestion = (slug: string) => ({
  slug,
  title: "What did Jesus mean by repentance?",
  body: "I've always been taught that repentance means feeling really sorry for your sins and vowing not to do them again. But recently I heard that the Greek word has a different meaning. Can someone explain what Jesus actually meant when he said 'Repent, for the kingdom of heaven is at hand'?",
  tags: ["repentance", "greek", "jesus", "kingdom"],
  votes: 142,
  date: "May 2, 2026",
  answers: [
    {
      id: "a1",
      isAccepted: true,
      isAI: false,
      voteScore: 89,
      body: `Great question. The Greek word Jesus used is **μετάνοια (metanoia)** — not the remorse-focused word you might expect.\n\nMetanoia literally breaks down as:\n- **meta** = change, transformation\n- **nous** = mind, perception, understanding\n\nSo metanoia = **a change of mind** — specifically, a fundamental reorientation of how you perceive reality.\n\nJesus wasn't primarily calling for emotional guilt. He was calling for a complete paradigm shift — a new way of seeing God, yourself, your neighbor, and the world. This is why he immediately connects it to the Kingdom of God: "Repent, **for** the Kingdom of heaven is at hand." The kingdom is already breaking in — repentance is the cognitive realignment that allows you to perceive and participate in it.\n\nThe Hebrew equivalent שׁוּב (shuv) reinforces this — it means "to turn" or "to return," emphasizing relational movement back toward God.\n\nSo repentance = turning your mind toward God's reality and away from every false framework. It is an ongoing posture, not a one-time event.`,
      author: "Joshua Global",
      date: "May 2, 2026",
    },
    {
      id: "a2",
      isAccepted: false,
      isAI: false,
      voteScore: 45,
      body: `Adding context from Paul's writings:\n\nRomans 12:2 says **"be transformed by the renewing of your mind"** — which uses the word ἀνακαινόω (anakainoō), related to metanoia. This confirms that biblical repentance is fundamentally cognitive and ongoing.\n\nAlso notable: Romans 2:4 says God's **kindness** leads to repentance — not fear, guilt, or punishment. True metanoia is drawn by love, not compelled by shame. This completely reframes how most people understand the call to repentance.\n\n**Related teachings:** [What is the Kingdom of God?](/questions/what-is-the-kingdom-of-god) | [Grace in the original Greek](/truth/grace)`,
      author: "Community",
      date: "May 2, 2026",
    },
  ],
  relatedQuestions: [
    { slug: "what-is-the-kingdom-of-god", title: "What is the Kingdom of God?" },
    { slug: "what-is-grace", title: "What exactly is grace?" },
    { slug: "how-should-christians-pray", title: "How should Christians pray?" },
  ],
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuestion(slug);
  return generateSEO({
    title: q.title,
    description: q.body.slice(0, 155) + "…",
    url: `/questions/${slug}`,
    type: "article",
    tags: q.tags,
  });
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const q = getQuestion(slug);

  const faqSchema = generateFAQSchema(
    q.answers.map((a) => ({ question: q.title, answer: a.body.replace(/\*\*/g, "") }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Questions", url: "/questions" },
    { name: q.title, url: `/questions/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container-editorial py-12 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/questions" className="hover:text-foreground">Questions</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{q.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Question */}
            <header className="mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">{q.title}</h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{q.votes} votes</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{q.answers.length} answers</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{q.date}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{q.body}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {q.tags.map((tag) => (
                  <Link key={tag} href={`/questions?tag=${tag}`}
                    className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground">
                    {tag}
                  </Link>
                ))}
              </div>
            </header>

            {/* Answers */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">
                {q.answers.length} Answer{q.answers.length !== 1 ? "s" : ""}
              </h2>
              <div className="space-y-6">
                {q.answers.map((answer) => (
                  <div key={answer.id} className={`p-6 rounded-2xl border ${answer.isAccepted ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20" : "border-border bg-card"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      {answer.isAccepted && (
                        <span className="px-2.5 py-1 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-semibold">
                          ✓ Accepted Answer
                        </span>
                      )}
                      </div>
                    <div className="prose prose-sm max-w-none text-muted-foreground mb-4 whitespace-pre-line">
                      {answer.body}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ChevronUp className="w-4 h-4" /> {answer.voteScore}
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {answer.author} · {answer.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit answer */}
            <section className="mt-10 p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif text-xl font-bold mb-4">Add Your Answer</h3>
              <textarea
                rows={6}
                placeholder="Share a scripture-based answer..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-500 mb-4"
              />
              <div className="flex gap-3">
                <button className="btn-primary text-sm">Post Answer</button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-4">Related Questions</h3>
              <div className="space-y-3">
                {q.relatedQuestions.map((rq) => (
                  <Link key={rq.slug} href={`/questions/${rq.slug}`}
                    className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground group">
                    <MessageCircle className="w-3.5 h-3.5 mt-0.5 text-gold-500 flex-shrink-0" />
                    <span className="group-hover:text-gold-600 dark:group-hover:text-gold-400">{rq.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-serif font-bold mb-3">Explore Truth Dictionary</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Find deep biblical definitions for terms in this question.
              </p>
              <div className="space-y-2">
                {q.tags.slice(0, 3).map((tag) => (
                  <Link key={tag} href={`/truth/${tag}`}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary transition-colors group">
                    <span className="text-sm font-medium capitalize">{tag}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold-500" />
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/newsletter" className="block p-6 rounded-2xl border border-gold-200 dark:border-gold-800/50 bg-gradient-to-br from-gold-50 to-parchment-50 dark:from-gold-950/20 dark:to-background">
              <BookOpen className="w-5 h-5 text-gold-500 mb-2" />
              <h3 className="font-serif font-bold mb-1">Daily Devotion</h3>
              <p className="text-xs text-muted-foreground">
                Get scripture, context, and prayer in your inbox every morning.
              </p>
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
