"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, CheckCircle, ArrowLeft, Crown, AlertCircle, Eye } from "lucide-react";

export default function NewVersePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    verse: "",
    reference: "",
    scheduledDate: new Date().toISOString().split("T")[0],
    context: "",
    originalMeaning: "",
    prayer: "",
    application: "",
    tags: "",
    isPublished: false,
    isFeatured: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  function update(key: string, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
    setSaved(false);
    setError("");
  }

  async function handleSave(publish?: boolean) {
    if (!form.verse.trim()) { setError("Verse text is required."); return; }
    if (!form.reference.trim()) { setError("Bible reference is required."); return; }
    if (!form.context.trim()) { setError("Context / explanation is required."); return; }
    if (!form.prayer.trim()) { setError("Prayer is required."); return; }

    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isPublished: publish !== undefined ? publish : form.isPublished,
    };
    const res = await fetch("/api/admin/verses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/verses"), 1000);
    } else {
      setError("Failed to save. Please try again.");
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/verses")} className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">Schedule Daily Verse</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Goes live on the Daily Verse page on the scheduled date</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreviewOpen(!previewOpen)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
            {saved ? <CheckCircle className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
            {saved ? "Published!" : "Publish Live"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4" />{error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" /> Verse saved! Redirecting...
        </div>
      )}

      {/* Preview */}
      {previewOpen && (
        <div className="mb-6 p-6 rounded-2xl border border-gold-400/30 bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black">
          <p className="text-xs text-gold-500 font-semibold mb-3 uppercase tracking-wider">{form.scheduledDate}</p>
          <blockquote className="font-serif text-xl italic text-white/90 mb-2">&ldquo;{form.verse || "Verse text..."}&rdquo;</blockquote>
          <cite className="text-gold-400 font-semibold not-italic text-sm">— {form.reference || "Reference"}</cite>
          {form.context && <p className="text-white/60 text-sm mt-3">{form.context}</p>}
          {form.prayer && <div className="mt-3 border-t border-gold-800/40 pt-3"><p className="text-xs text-gold-500 font-semibold uppercase tracking-wider mb-1">Prayer</p><p className="text-white/70 text-sm italic">{form.prayer}</p></div>}
        </div>
      )}

      <div className="space-y-5">
        {/* Verse + Reference */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Verse Text *</label>
            <textarea
              rows={3}
              value={form.verse}
              onChange={(e) => update("verse", e.target.value)}
              placeholder="The verse text exactly as it reads..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none font-serif italic"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Reference *</label>
            <input
              type="text"
              value={form.reference}
              onChange={(e) => update("reference", e.target.value)}
              placeholder="e.g. Matthew 6:33"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block mt-3">Scheduled Date *</label>
            <input
              type="date"
              value={form.scheduledDate}
              onChange={(e) => update("scheduledDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Context */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Context / Explanation * <span className="font-normal normal-case text-muted-foreground">(What this verse means — Kingdom teaching)</span>
          </label>
          <textarea
            rows={4}
            value={form.context}
            onChange={(e) => update("context", e.target.value)}
            placeholder="Explain the deeper meaning of this verse. What Kingdom truth does it carry? What did Jesus mean?"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Original Meaning */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Original Meaning <span className="font-normal normal-case text-muted-foreground">(Hebrew / Greek insights)</span>
          </label>
          <textarea
            rows={3}
            value={form.originalMeaning}
            onChange={(e) => update("originalMeaning", e.target.value)}
            placeholder="Optional — Hebrew or Greek word insights, cultural context..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Application */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Personal Application <span className="font-normal normal-case text-muted-foreground">(How to live this today)</span>
          </label>
          <textarea
            rows={3}
            value={form.application}
            onChange={(e) => update("application", e.target.value)}
            placeholder="How can a Kingdom citizen apply this verse today?"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Prayer */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            Prayer * <span className="font-normal normal-case text-muted-foreground">(A prayer based on this verse)</span>
          </label>
          <textarea
            rows={4}
            value={form.prayer}
            onChange={(e) => update("prayer", e.target.value)}
            placeholder="Father, in the name of Jesus..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Tags + Toggles */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="kingdom, prayer, faith"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
              <div onClick={() => update("isFeatured", !form.isFeatured)} className={`relative w-10 h-6 rounded-full transition-colors ${form.isFeatured ? "bg-gold-500" : "bg-muted"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isFeatured ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <span className="text-sm font-medium">Feature on homepage</span>
            </label>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Changes go live instantly on <strong>joshuaglobal.live/daily-verse</strong></p>
          <div className="flex gap-2">
            <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
              Publish Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
