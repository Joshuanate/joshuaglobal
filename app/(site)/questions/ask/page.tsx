"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AskQuestionPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", body: "", tags: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError("Please enter your question."); return; }
    if (!form.body.trim()) { setError("Please add some detail to your question."); return; }

    setSubmitting(true);
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        body: form.body,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        askedBy: form.name || "Anonymous",
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.success) {
      setDone(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-3">Question Submitted!</h1>
        <p className="text-muted-foreground text-lg mb-2">
          Your question has been received and will appear once reviewed.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Joshua reviews every question personally and will answer as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/questions" className="btn-primary gap-2">Browse All Questions</Link>
          <button onClick={() => { setDone(false); setForm({ title: "", body: "", tags: "", name: "" }); }} className="btn-secondary">
            Ask Another Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/questions" className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold">Ask a Question</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Questions about God, scripture, and the Kingdom of God</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">Before you ask</p>
        <p className="text-sm text-muted-foreground">
          Search existing questions first — your question may already be answered. All questions are reviewed by Joshua personally before going live.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Your Question *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. What does Jesus mean by 'born again'?"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-base font-serif font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <p className="text-xs text-muted-foreground mt-1">Be specific. A clear question gets a better answer.</p>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Details *
          </label>
          <textarea
            rows={6}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            placeholder="Add context — what prompted this question? What have you heard before? What specifically are you trying to understand?"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Tags <span className="font-normal normal-case">(comma separated — optional)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="kingdom, prayer, salvation, paul"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Your Name <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Anonymous"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Reviewed before publishing · No account needed
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary gap-2 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? "Submitting..." : "Submit Question"}
          </button>
        </div>
      </form>
    </div>
  );
}
