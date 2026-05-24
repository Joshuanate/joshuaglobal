"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, Search, ChevronUp, ChevronRight, Plus, CheckCircle, Loader2 } from "lucide-react";
import type { Question } from "@/lib/question-types";

type Filter = "Trending" | "Newest" | "Most Answered" | "Unanswered";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("Trending");
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleVote(e: React.MouseEvent, q: Question) {
    e.preventDefault();
    if (votedIds.has(q.id)) return;
    setVotedIds((prev) => new Set([...prev, q.id]));
    setQuestions((prev) => prev.map((x) => x.id === q.id ? { ...x, votes: x.votes + 1 } : x));
    await fetch(`/api/questions/${q.slug}/vote`, { method: "POST" });
  }

  const filtered = questions
    .filter((q) => {
      if (!search) return true;
      return q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.includes(search.toLowerCase()));
    })
    .filter((q) => filter === "Unanswered" ? q.answers.length === 0 : true)
    .sort((a, b) => {
      if (filter === "Trending") return b.votes - a.votes;
      if (filter === "Newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filter === "Most Answered") return b.answers.length - a.answers.length;
      return a.answers.length - b.answers.length;
    });

  const answered = questions.filter((q) => q.isAnswered).length;

  return (
    <div>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="py-20 border-b border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="section-label text-gold-600 dark:text-gold-400">Community Q&amp;A</span>
              </div>
              <h1 className="section-heading mb-4">Questions &amp; Answers</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ask anything about God, Scripture, and the Kingdom. Get truth-based answers — no religion, just the Word.
              </p>
              {!loading && (
                <p className="text-sm text-muted-foreground mt-3">
                  <span className="text-gold-500 font-semibold">{answered}</span> answered ·{" "}
                  <span className="font-semibold">{questions.length}</span> total questions
                </p>
              )}
            </div>
            <Link href="/questions/ask" className="btn-primary whitespace-nowrap gap-2 self-start sm:self-auto">
              <Plus className="w-4 h-4" /> Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* ── Search + List ────────────────────────────────────────── */}
      <section className="py-16 pb-28">
      <div className="container-editorial max-w-4xl">
      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search questions — kingdom, prayer, grace, Jesus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400/40 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
        {(["Trending", "Newest", "Most Answered", "Unanswered"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f
                ? "bg-gold-500 text-black font-semibold"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-gold-300/50 dark:hover:border-gold-700/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <MessageCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            {search ? `No questions found for "${search}"` : "No questions yet."}
          </p>
          <Link href="/questions/ask" className="btn-primary text-sm mt-4 inline-flex gap-2">
            <Plus className="w-4 h-4" /> Ask the first question
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => {
            const officialAnswers = q.answers.filter((a) => a.isOfficial).length;
            const totalAnswers = q.answers.length;
            return (
              <div key={q.id} className="group flex gap-4 p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-all">
                {/* Vote */}
                <div className="flex flex-col items-center gap-1 min-w-[44px] text-center flex-shrink-0">
                  <button
                    onClick={(e) => handleVote(e, q)}
                    disabled={votedIds.has(q.id)}
                    className={`p-1 rounded-lg transition-colors ${votedIds.has(q.id) ? "text-gold-500" : "text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30"}`}
                    title="Upvote"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <span className={`text-sm font-bold ${votedIds.has(q.id) ? "text-gold-500" : ""}`}>{q.votes}</span>
                  <span className="text-xs text-muted-foreground">votes</span>
                </div>

                {/* Answer count */}
                <div className={`flex flex-col items-center justify-center gap-0.5 min-w-[44px] text-center px-2 py-1.5 rounded-xl self-start flex-shrink-0 ${
                  officialAnswers > 0
                    ? "bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400"
                    : totalAnswers > 0
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {officialAnswers > 0 && <CheckCircle className="w-3 h-3 mx-auto" />}
                  <span className="text-sm font-bold">{totalAnswers}</span>
                  <span className="text-xs leading-none">ans</span>
                </div>

                {/* Content */}
                <Link href={`/questions/${q.slug}`} className="flex-1 min-w-0 block">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {q.isFeatured && (
                      <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">Featured</span>
                    )}
                    {officialAnswers > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 text-xs font-semibold">✓ Official Answer</span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg font-bold mb-1.5 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                    {q.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{q.body}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {q.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">{tag}</span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </Link>

                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors self-center flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}
      </div>
      </section>
    </div>
  );
}
