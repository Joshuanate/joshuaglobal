import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Search, ChevronUp, ChevronRight, Plus } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Ask Bible Questions — Biblical Truth Q&A Platform",
  description:
    "Search thousands of answered Bible questions or ask your own. Get scripture-based answers to your deepest spiritual questions.",
  url: "/questions",
});

const questions = [
  {
    slug: "what-did-jesus-mean-repentance",
    title: "What did Jesus mean by repentance?",
    excerpt: "Understanding the Greek word metanoia and its depth beyond guilt and sorrow...",
    votes: 142,
    answers: 8,
    tags: ["repentance", "greek", "jesus"],
    isAnswered: true,
    date: "3 days ago",
  },
  {
    slug: "what-is-the-kingdom-of-god",
    title: "What is the Kingdom of God and is it present or future?",
    excerpt: "Jesus referred to the Kingdom over 100 times. Is it a future state or a present reality?",
    votes: 98,
    answers: 12,
    tags: ["kingdom", "eschatology"],
    isAnswered: true,
    date: "1 week ago",
  },
  {
    slug: "why-did-jesus-speak-in-parables",
    title: "Why did Jesus speak in parables? Was it to confuse people?",
    excerpt: "Matthew 13:13 seems to say Jesus used parables so people would NOT understand...",
    votes: 76,
    answers: 6,
    tags: ["parables", "jesus", "gospels"],
    isAnswered: true,
    date: "2 weeks ago",
  },
  {
    slug: "what-is-grace",
    title: "What exactly is grace and how does it work?",
    excerpt: "Is grace just unmerited favor, or does it have an enabling, transforming dimension?",
    votes: 65,
    answers: 9,
    tags: ["grace", "salvation"],
    isAnswered: true,
    date: "3 weeks ago",
  },
  {
    slug: "holy-spirit-what-is-it",
    title: "Who or what is the Holy Spirit exactly?",
    excerpt: "The third person of the Trinity is often the least understood. What did Jesus teach?",
    votes: 54,
    answers: 7,
    tags: ["holy spirit", "trinity"],
    isAnswered: false,
    date: "1 month ago",
  },
  {
    slug: "why-does-god-allow-suffering",
    title: "Why does God allow suffering if he is all-powerful and loving?",
    excerpt: "The problem of evil has challenged faith for millennia. What does scripture actually say?",
    votes: 121,
    answers: 15,
    tags: ["suffering", "theodicy", "faith"],
    isAnswered: true,
    date: "1 month ago",
  },
];

export default function QuestionsPage() {
  return (
    <div className="container-editorial py-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="badge-gold mb-4">
          <MessageCircle className="w-3 h-3 mr-1" />
          Community Q&A
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Bible Questions</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Ask anything about scripture. Search existing answers or get AI-assisted responses.
            </p>
          </div>
          <Link href="/questions/ask" className="btn-primary whitespace-nowrap gap-2">
            <Plus className="w-4 h-4" />
            Ask a Question
          </Link>
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search questions — What is grace? Why did Jesus...?"
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
        {["Trending", "Newest", "Most Answered", "Unanswered"].map((f, i) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-gold-500 text-white"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q) => (
          <Link
            key={q.slug}
            href={`/questions/${q.slug}`}
            className="group flex gap-4 p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
          >
            {/* Vote count */}
            <div className="flex flex-col items-center gap-1 min-w-[40px] text-center">
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-bold">{q.votes}</span>
              <span className="text-xs text-muted-foreground">votes</span>
            </div>

            {/* Answers count */}
            <div className={`flex flex-col items-center gap-1 min-w-[40px] text-center px-2 py-1 rounded-lg ${q.isAnswered ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-secondary text-muted-foreground"}`}>
              <span className="text-sm font-bold">{q.answers}</span>
              <span className="text-xs">ans</span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-lg font-bold mb-1.5 group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors leading-snug">
                {q.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{q.excerpt}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {q.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground ml-auto">{q.date}</span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors self-center" />
          </Link>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 text-center">
        <button className="btn-secondary text-sm">Load more questions</button>
      </div>
    </div>
  );
}
