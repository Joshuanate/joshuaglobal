"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, CheckCircle, Crown, AlertCircle, Star } from "lucide-react";

export default function NewQuestionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    questionBody: "",
    officialAnswer: "",
    tags: "",
    isFeatured: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
    setError("");
    setSaved(false);
  }

  async function handleSave() {
    if (!form.title.trim()) { setError("Question title is required."); return; }
    if (!form.questionBody.trim()) { setError("Question body is required."); return; }

    setSaving(true);
    const res = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/questions"), 1000);
    } else {
      setError("Failed to save. Please try again.");
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/questions")} className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">Add Question &amp; Answer</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Add a question from your research + write the official answer</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
          {saved ? <CheckCircle className="w-4 h-4" /> : saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
          {saved ? "Published!" : "Publish Q&A"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" /> Published and live on the website!
        </div>
      )}

      <div className="space-y-6">
        {/* Question title */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Question Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. What did Paul mean by 'in Christ'?"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-base font-serif font-bold focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Question body */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Question Detail *</label>
          <textarea
            rows={4}
            value={form.questionBody}
            onChange={(e) => update("questionBody", e.target.value)}
            placeholder="The full question as a seeker would ask it — with context and what they've heard before..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Official answer */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 text-gold-500" />
            Official Answer <span className="font-normal normal-case text-muted-foreground">(use **bold**, *italic*, ## Heading, ---)</span>
          </label>
          <textarea
            rows={20}
            value={form.officialAnswer}
            onChange={(e) => update("officialAnswer", e.target.value)}
            placeholder="Write the official Kingdom-truth answer here...

Use markdown:
## Section Heading
**Bold text**
*Italic text*
--- (horizontal rule)

Scripture quotes go in *italics*. Key phrases in **bold**."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y font-mono leading-relaxed"
          />
          <p className="text-xs text-muted-foreground mt-1">This will appear with the gold ✓ Official Answer badge on the public site.</p>
        </div>

        {/* Tags + featured */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tags <span className="font-normal normal-case">(comma separated)</span></label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="kingdom, prayer, salvation"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
              <div
                onClick={() => update("isFeatured", !form.isFeatured)}
                className={`relative w-10 h-6 rounded-full transition-colors ${form.isFeatured ? "bg-gold-500" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isFeatured ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">Feature this Q&amp;A</span>
              </div>
            </label>
          </div>
        </div>

        {/* Bottom save */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Publishes immediately to <strong>joshuaglobal.live/questions</strong></p>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Publish Q&amp;A
          </button>
        </div>
      </div>
    </div>
  );
}
