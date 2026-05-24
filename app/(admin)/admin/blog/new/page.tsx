"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Save, Loader2, CheckCircle, AlertCircle,
  Eye, EyeOff, Star, Globe, ChevronDown, ChevronUp,
  Bold, Italic, Heading2, Heading3, Quote, Minus, Link2, List,
} from "lucide-react";
import { BLOG_CATEGORIES } from "@/lib/blog-types";
import type { BlogPost } from "@/lib/blog-types";

const EMPTY_FORM = {
  title: "",
  subtitle: "",
  excerpt: "",
  body: "",
  category: "Kingdom of God",
  tags: "",
  isPublished: false,
  isFeatured: false,
  seoTitle: "",
  seoDescription: "",
  seoImage: "",
  noIndex: false,
};

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function AdminBlogEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [error, setError] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);
  const [loadingPost, setLoadingPost] = useState(!!editId);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!editId) return;
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data: BlogPost[]) => {
        const post = Array.isArray(data) ? data.find((p) => p.id === editId) : null;
        if (post) {
          setForm({
            title: post.title,
            subtitle: post.subtitle || "",
            excerpt: post.excerpt,
            body: post.body,
            category: post.category,
            tags: post.tags.join(", "),
            isPublished: post.isPublished,
            isFeatured: post.isFeatured,
            seoTitle: post.seoTitle || "",
            seoDescription: post.seoDescription || "",
            seoImage: post.seoImage || "",
            noIndex: post.noIndex,
          });
        }
        setLoadingPost(false);
      });
  }, [editId]);

  const update = useCallback((key: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value }));
    setError("");
    setSaved(false);
    // Auto-save indicator after 3s of inactivity on body/title/excerpt
    if (["body", "title", "excerpt"].includes(key) && editId) {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      setAutoSaved(false);
      autoSaveTimer.current = setTimeout(() => {
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 3000);
      }, 3000);
    }
  }, [editId]);

  // Markdown toolbar insert helper
  function insertMarkdown(prefix: string, suffix = "", placeholder = "text") {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.slice(start, end) || placeholder;
    const before = ta.value.slice(0, start);
    const after = ta.value.slice(end);
    const newVal = `${before}${prefix}${selected}${suffix}${after}`;
    update("body", newVal);
    // Re-focus and place cursor after insert
    setTimeout(() => {
      ta.focus();
      const newPos = start + prefix.length + selected.length + suffix.length;
      ta.setSelectionRange(newPos, newPos);
    }, 0);
  }

  function insertLinePrefix(prefix: string) {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
    const before = ta.value.slice(0, lineStart);
    const after = ta.value.slice(lineStart);
    update("body", `${before}${prefix}${after}`);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length);
    }, 0);
  }

  async function handleSave() {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.excerpt.trim()) { setError("Excerpt is required."); return; }
    if (!form.body.trim()) { setError("Article body is required."); return; }

    setSaving(true);
    const payload = {
      title: form.title,
      subtitle: form.subtitle || undefined,
      excerpt: form.excerpt,
      body: form.body,
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      seoTitle: form.seoTitle || undefined,
      seoDescription: form.seoDescription || undefined,
      seoImage: form.seoImage || undefined,
      noIndex: form.noIndex,
    };

    const res = editId
      ? await fetch(`/api/admin/blog/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

    const data = await res.json();
    setSaving(false);
    if (data.success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/blog"), 1200);
    } else {
      setError(data.error || "Failed to save. Please try again.");
    }
  }

  if (loadingPost) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/blog")} className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold">{editId ? "Edit Article" : "New Article"}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Write Kingdom truth for the nations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => update("isPublished", !form.isPublished)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
              form.isPublished
                ? "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {form.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {form.isPublished ? "Published" : "Draft"}
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
            {saved ? <CheckCircle className="w-4 h-4" /> : saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : editId ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" /> {form.isPublished ? "Published and live!" : "Saved as draft."}
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="The Gospel of the Kingdom..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-base font-serif font-bold focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Subtitle <span className="font-normal normal-case">(optional)</span></label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            placeholder="A brief subheading that draws the reader in..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        {/* Category + Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tags <span className="font-normal normal-case">(comma separated)</span></label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="kingdom, paul, salvation"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Excerpt * <span className="font-normal normal-case">(shown on blog list page)</span></label>
          <textarea
            rows={3}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="A compelling 2-3 sentence summary that makes people want to read more..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Article Body *
            </label>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {autoSaved && (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3 h-3" /> Auto-saved
                </span>
              )}
              <span>{countWords(form.body).toLocaleString()} words</span>
              <span>{form.body.length.toLocaleString()} chars</span>
            </div>
          </div>
          {/* Markdown toolbar */}
          <div className="flex items-center gap-0.5 p-1.5 rounded-t-xl border border-border border-b-0 bg-secondary/50 flex-wrap">
            {[
              { icon: Bold, title: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
              { icon: Italic, title: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
              { icon: Heading2, title: "Heading 2", action: () => insertLinePrefix("## ") },
              { icon: Heading3, title: "Heading 3", action: () => insertLinePrefix("### ") },
              { icon: Quote, title: "Blockquote", action: () => insertLinePrefix("> ") },
              { icon: List, title: "List item", action: () => insertLinePrefix("- ") },
              { icon: Link2, title: "Link", action: () => insertMarkdown("[", "](https://)", "link text") },
              { icon: Minus, title: "Divider", action: () => {
                const ta = bodyRef.current;
                if (!ta) return;
                const start = ta.selectionStart;
                const before = ta.value.slice(0, start);
                const after = ta.value.slice(start);
                update("body", `${before}\n\n---\n\n${after}`);
              }},
            ].map(({ icon: Icon, title, action }) => (
              <button
                key={title}
                type="button"
                title={title}
                onClick={action}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
            <span className="ml-2 text-xs text-muted-foreground/60">
              markdown: **bold**, *italic*, ## H2, ### H3
            </span>
          </div>
          <textarea
            ref={bodyRef}
            rows={28}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            placeholder={`Start writing here...\n\n## Section Heading\n\nYour content. Use **bold** for key phrases. Use *italics* for scripture quotes.\n\n---\n\nAnother section...`}
            className="w-full px-4 py-3 rounded-b-xl rounded-t-none border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y font-mono leading-relaxed"
          />
        </div>

        {/* Featured toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-secondary transition-colors w-fit">
            <div
              onClick={() => update("isFeatured", !form.isFeatured)}
              className={`relative w-10 h-6 rounded-full transition-colors ${form.isFeatured ? "bg-gold-500" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isFeatured ? "translate-x-4" : "translate-x-0"}`} />
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-medium">Feature this article</span>
              <span className="text-xs text-muted-foreground">(shown as hero on blog page)</span>
            </div>
          </label>
        </div>

        {/* SEO section — collapsible */}
        <div className="rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-500" />
              <span className="font-semibold text-sm">SEO Settings</span>
              <span className="text-xs text-muted-foreground">(optional — overrides defaults)</span>
            </div>
            {seoOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {seoOpen && (
            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">SEO Title <span className="font-normal normal-case">(defaults to article title)</span></label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(e) => update("seoTitle", e.target.value)}
                  placeholder="Custom title for search engines..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <p className="text-xs text-muted-foreground mt-1">{(form.seoTitle || form.title).length}/60 chars recommended</p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Meta Description <span className="font-normal normal-case">(defaults to excerpt)</span></label>
                <textarea
                  rows={2}
                  value={form.seoDescription}
                  onChange={(e) => update("seoDescription", e.target.value)}
                  placeholder="Custom description for search engines..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{(form.seoDescription || form.excerpt).length}/160 chars recommended</p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">OG Image URL <span className="font-normal normal-case">(social share image)</span></label>
                <input
                  type="url"
                  value={form.seoImage}
                  onChange={(e) => update("seoImage", e.target.value)}
                  placeholder="https://joshuaglobal.live/og-blog-post.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.noIndex}
                  onChange={(e) => update("noIndex", e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <div>
                  <span className="text-sm font-medium">No-index this post</span>
                  <p className="text-xs text-muted-foreground">Hides from Google search results</p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {form.isPublished ? "Will publish to joshuaglobal.live/blog" : "Saving as draft — not visible to visitors"}
          </p>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editId ? "Update Article" : "Save Article"}
          </button>
        </div>
      </div>
    </div>
  );
}
