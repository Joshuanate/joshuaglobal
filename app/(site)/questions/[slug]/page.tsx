"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ChevronUp, ArrowLeft, Crown, CheckCircle, Send,
  Loader2, AlertCircle, MessageCircle, User,
} from "lucide-react";
import type { Question } from "@/lib/question-types";

function renderBody(text: string) {
  const lines = text.split("\n");
  let html = "";
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      html += `<h2 class="font-serif text-xl font-bold mt-6 mb-3">${line.slice(3)}</h2>`;
    } else if (line.startsWith("### ")) {
      html += `<h3 class="font-serif text-lg font-bold mt-5 mb-2">${line.slice(4)}</h3>`;
    } else if (line.trim() === "---") {
      html += `<hr class="border-border my-5" />`;
    } else if (line.trim() === "") {
      html += `<br/>`;
    } else {
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-500 underline hover:text-gold-400">$1</a>');
      html += `<p class="mb-3 leading-relaxed">${formatted}</p>`;
    }
    i++;
  }
  return html;
}

export default function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [voted, setVoted] = useState(false);
  const [answerForm, setAnswerForm] = useState({ body: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [answerError, setAnswerError] = useState("");
  const [answerDone, setAnswerDone] = useState(false);

  useEffect(() => {
    fetch(`/api/questions/${slug}`)
      .then((r) => { if (!r.ok) { setNotFound(true); setLoading(false); return null; } return r.json(); })
      .then((data) => { if (data) setQuestion(data); setLoading(false); });
  }, [slug]);

  async function handleVote() {
    if (!question || voted) return;
    setVoted(true);
    setQuestion((prev) => prev ? { ...prev, votes: prev.votes + 1 } : prev);
    await fetch(`/api/questions/${slug}/vote`, { method: "POST" });
  }

  async function handleAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!question) return;
    if (!answerForm.body.trim()) { setAnswerError("Please write your answer."); return; }
    setSubmitting(true);
    const res = await fetch(`/api/questions/${slug}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerBody: answerForm.body, authorName: answerForm.name }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.success) {
      setAnswerDone(true);
      setQuestion((prev) =>
        prev ? { ...prev, answers: [...prev.answers, data.answer], isAnswered: true } : prev
      );
      setAnswerForm({ body: "", name: "" });
    } else {
      setAnswerError("Failed to submit. Please try again.");
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
    </div>
  );

  if (notFound || !question) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-muted-foreground text-lg mb-4">Question not found.</p>
      <Link href="/questions" className="btn-primary">Browse Questions</Link>
    </div>
  );

  const officialAnswers = question.answers.filter((a) => a.isOfficial);
  const communityAnswers = question.answers.filter((a) => !a.isOfficial);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/questions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> All Questions
      </Link>

      {/* Question */}
      <div className="flex gap-5 mb-10">
        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
          <button
            onClick={handleVote}
            disabled={voted}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors ${
              voted ? "border-gold-500 bg-gold-50 dark:bg-gold-950/30 text-gold-500" : "border-border hover:border-gold-400 hover:bg-gold-50 dark:hover:bg-gold-950/30 text-muted-foreground hover:text-gold-500"
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className={`text-base font-bold ${voted ? "text-gold-500" : ""}`}>{question.votes}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {question.isFeatured && <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">Featured</span>}
            {officialAnswers.length > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Official Answer
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-4 leading-snug">{question.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-4">{question.body}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {question.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">{tag}</span>
            ))}
            <span className="text-xs text-muted-foreground ml-auto">
              Asked by {question.askedBy} · {new Date(question.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-10">
        <h2 className="font-serif text-xl font-bold mb-6">
          {question.answers.length === 0 ? "No answers yet" : `${question.answers.length} Answer${question.answers.length !== 1 ? "s" : ""}`}
        </h2>

        {officialAnswers.map((a) => (
          <div key={a.id} className="rounded-2xl border-2 border-gold-400/50 bg-gold-500/5 overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-6 py-3 bg-gold-500/10 border-b border-gold-400/30">
              <Crown className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider">Official Answer by Joshua</span>
            </div>
            <div className="p-6">
              <div className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: renderBody(a.body) }} />
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm">J</div>
                <div>
                  <p className="text-sm font-semibold text-gold-600 dark:text-gold-400">{a.authorName}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {communityAnswers.length > 0 && (
          <div className="space-y-5">
            {communityAnswers.map((a) => (
              <div key={a.id} className="p-6 rounded-2xl border border-border bg-card">
                <div className="text-sm leading-relaxed text-foreground mb-5" dangerouslySetInnerHTML={{ __html: renderBody(a.body) }} />
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{a.authorName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {question.answers.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-2xl">
            <MessageCircle className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Be the first to answer this question.</p>
          </div>
        )}
      </div>

      {/* Submit Answer */}
      <div className="p-8 rounded-2xl bg-card border border-border">
        <h3 className="font-serif text-lg font-bold mb-1">Share Your Answer</h3>
        <p className="text-muted-foreground text-sm mb-5">Scripture-based, truth-grounded answers only. Use **bold** and *italic* for formatting.</p>

        {answerDone && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-4">
            <CheckCircle className="w-4 h-4" /> Your answer has been submitted. Thank you!
          </div>
        )}
        {answerError && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4">
            <AlertCircle className="w-4 h-4" /> {answerError}
          </div>
        )}

        <form onSubmit={handleAnswer} className="space-y-4">
          <textarea
            rows={6}
            value={answerForm.body}
            onChange={(e) => { setAnswerForm((p) => ({ ...p, body: e.target.value })); setAnswerError(""); }}
            placeholder="Write a clear, scripture-based answer..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <input
              type="text"
              value={answerForm.name}
              onChange={(e) => setAnswerForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your name (optional)"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button type="submit" disabled={submitting} className="btn-primary gap-2 disabled:opacity-50 whitespace-nowrap">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? "Submitting..." : "Post Answer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
