"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Save, Loader2, CheckCircle, ArrowLeft, Eye, EyeOff,
  Crown, Star, AlertCircle,
} from "lucide-react";
import { TEACHING_CATEGORIES } from "@/lib/teaching-types";
import type { Teaching } from "@/lib/teaching-types";

function TeachingEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "Kingdom of God",
    excerpt: "",
    body: "",
    tags: "",
    isPublished: false,
    isFeatured: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  useEffect(() => {
    if (!editId) return;
    fetch("/api/admin/teachings")
      .then((r) => r.json())
      .then((list: Teaching[]) => {
        const t = list.find((x) => x.id === editId);
        if (t) {
          setForm({
            title: t.title,
            subtitle: t.subtitle ?? "",
            category: t.category,
            excerpt: t.excerpt,
            body: t.body,
            tags: t.tags.join(", "),
            isPublished: t.isPublished,
            isFeatured: t.isFeatured,
          });
        }
        setLoading(false);
      });
  }, [editId]);

  function update(key: string, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
    setSaved(false);
    setError("");
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.excerpt.trim()) { setError("Excerpt / summary is required."); return; }
    if (!form.body.trim()) { setError("Content body is required."); return; }

    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isPublished: publish !== undefined ? publish : form.isPublished,
    };

    const url = editId ? `/api/admin/teachings/${editId}` : "/api/admin/teachings";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/teachings"), 1000);
    } else {
      setError("Failed to save. Please try again.");
    }
  }

  const wordCount = form.body.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/teachings")} className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">{editId ? "Edit Teaching" : "New Teaching"}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{wordCount} words · ~{readingTime} min read</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors"
          >
            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn-primary text-sm gap-2 disabled:opacity-50"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
            {saved ? "Published!" : "Publish Live"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" />
          {form.isPublished ? "Published and live on the website!" : "Saved as draft."}
        </div>
      )}

      {preview ? (
        /* ── Preview Mode ─────────────────────────────────── */
        <div className="p-8 rounded-2xl border border-border bg-card">
          <p className="text-xs font-semibold text-gold-500 mb-2">{form.category}</p>
          <h1 className="font-serif text-3xl font-bold mb-2">{form.title || "Untitled"}</h1>
          {form.subtitle && <p className="text-muted-foreground text-lg mb-4">{form.subtitle}</p>}
          <p className="text-muted-foreground italic mb-6 border-l-2 border-gold-400 pl-4">{form.excerpt}</p>
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
            {form.body || <span className="text-muted-foreground">No content yet...</span>}
          </div>
        </div>
      ) : (
        /* ── Edit Mode ────────────────────────────────────── */
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. The Kingdom of God: What Jesus Actually Meant"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-base font-serif font-bold focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Subtitle / Tagline
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
              placeholder="Optional — a short supporting line under the title"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Category + Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {TEACHING_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
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
                  <span className="text-sm font-medium">Feature this</span>
                </div>
              </label>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Excerpt / Summary * <span className="text-muted-foreground font-normal normal-case">(shown in article cards)</span>
            </label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="A short, compelling summary that makes people want to read the full article..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Content * <span className="font-normal normal-case">(write in plain text or use **bold**, *italic*, # Heading)</span>
              </label>
              <span className="text-xs text-muted-foreground">{wordCount} words</span>
            </div>
            <textarea
              rows={24}
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              placeholder="Write your full teaching here...

You can use basic markdown:
# Heading 1
## Heading 2
**bold text**
*italic text*

Start with the truth. Be bold. Preach the Kingdom."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y font-mono leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              Tags <span className="font-normal normal-case">(comma separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="kingdom, Jesus, truth, salvation"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Bottom save */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Saving publishes instantly to <strong>joshuaglobal.live/teachings</strong>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-sm hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="btn-primary text-sm gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                Publish Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewTeachingPage() {
  return (
    <Suspense fallback={<div className="p-8 flex items-center justify-center min-h-[400px]"><Loader2 className="w-6 h-6 animate-spin text-gold-500" /></div>}>
      <TeachingEditor />
    </Suspense>
  );
}
