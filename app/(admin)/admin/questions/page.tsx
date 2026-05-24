"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, MessageCircle, Loader2, Trash2, CheckCircle, XCircle, Star, StarOff, Crown, Eye } from "lucide-react";
import type { Question } from "@/lib/question-types";

type Tab = "all" | "pending" | "approved";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("all");
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [answerSaving, setAnswerSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/questions");
    const data = await res.json();
    setQuestions(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleApprove(q: Question) {
    setActionId(q.id);
    await fetch(`/api/admin/questions/${q.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: !q.isApproved }),
    });
    await load();
    setActionId(null);
  }

  async function toggleFeatured(q: Question) {
    setActionId(q.id);
    await fetch(`/api/admin/questions/${q.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !q.isFeatured }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(q: Question) {
    if (!confirm(`Delete question "${q.title}"?`)) return;
    setActionId(q.id);
    await fetch(`/api/admin/questions/${q.id}`, { method: "DELETE" });
    await load();
    setActionId(null);
  }

  async function submitAnswer(q: Question) {
    if (!answerText.trim()) return;
    setAnswerSaving(true);
    await fetch(`/api/admin/questions/${q.id}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: answerText }),
    });
    setAnswerSaving(false);
    setAnsweringId(null);
    setAnswerText("");
    await load();
  }

  const filtered = questions.filter((q) => {
    if (tab === "pending") return !q.isApproved;
    if (tab === "approved") return q.isApproved;
    return true;
  });

  const pending = questions.filter((q) => !q.isApproved).length;
  const approved = questions.filter((q) => q.isApproved).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Questions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pending} pending · {approved} approved · {questions.length} total
          </p>
        </div>
        <Link href="/admin/questions/new" className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> Add Q&amp;A
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-gold-500 text-white" : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {t} {t === "pending" && pending > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold">{pending}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <MessageCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No questions here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className={`rounded-2xl border bg-card transition-all ${actionId === q.id ? "opacity-50" : ""}`}>
              <div className="flex items-start gap-4 p-5">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${q.isApproved ? "bg-green-500" : "bg-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {q.isFeatured && <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">★ Featured</span>}
                    {q.answers.some((a) => a.isOfficial) && <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 text-xs font-semibold flex items-center gap-1"><Crown className="w-3 h-3" /> Official Answer</span>}
                    <span className={`text-xs font-medium ${q.isApproved ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                      {q.isApproved ? "Approved" : "Pending Review"}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.answers.length} answer{q.answers.length !== 1 ? "s" : ""}</span>
                    <span className="text-xs text-muted-foreground">{q.votes} votes</span>
                  </div>
                  <h3 className="font-serif font-bold text-base leading-snug mb-1">{q.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{q.body}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {q.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-secondary text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggleFeatured(q)} title={q.isFeatured ? "Unfeature" : "Feature"} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors">
                    {q.isFeatured ? <Star className="w-4 h-4 fill-gold-400 text-gold-400" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleApprove(q)} title={q.isApproved ? "Unapprove" : "Approve"} className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30">
                    {q.isApproved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setAnsweringId(answeringId === q.id ? null : q.id); setAnswerText(""); }}
                    title="Write official answer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors"
                  >
                    <Crown className="w-4 h-4" />
                  </button>
                  <Link href={`/questions/${q.slug}`} target="_blank" title="View on site" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(q)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inline answer editor */}
              {answeringId === q.id && (
                <div className="px-5 pb-5 pt-0 border-t border-border mt-1">
                  <p className="text-xs font-semibold text-gold-500 mb-2 flex items-center gap-1"><Crown className="w-3 h-3" /> Write Official Answer</p>
                  <textarea
                    rows={8}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write the official answer here. Use **bold**, *italic*, ## Heading. This will appear with the gold 'Official Answer' badge."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y font-mono"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => submitAnswer(q)}
                      disabled={answerSaving || !answerText.trim()}
                      className="btn-primary text-sm gap-2 disabled:opacity-50"
                    >
                      {answerSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                      Publish Official Answer
                    </button>
                    <button onClick={() => { setAnsweringId(null); setAnswerText(""); }} className="btn-secondary text-sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
