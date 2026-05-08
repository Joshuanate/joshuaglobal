"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle, Eye, RefreshCw, Globe } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export default function ContentEditorPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false); });
  }, []);

  function update(key: keyof SiteContent, value: string | boolean) {
    setContent((prev) => prev ? { ...prev, [key]: value } : prev);
    setSaved(false);
  }

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Live Content Editor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Changes save instantly and appear live on the website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm gap-2 disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" />
          Changes are now live on the website!
        </div>
      )}

      <div className="space-y-8">

        {/* ── Announcement Banner ─────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg">Announcement Banner</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Appears at the top of the homepage when active.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium">Active</span>
              <div
                onClick={() => update("announcementActive", !content.announcementActive)}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  content.announcementActive ? "bg-gold-500" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    content.announcementActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
          <input
            type="text"
            value={content.announcement}
            onChange={(e) => update("announcement", e.target.value)}
            placeholder="e.g. 🎉 New teaching series starting Sunday!"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </section>

        {/* ── Featured Verse ──────────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="font-serif font-bold text-lg mb-1">Featured Daily Verse</h2>
          <p className="text-xs text-muted-foreground mb-4">
            The verse displayed prominently on the homepage.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Verse Text
              </label>
              <textarea
                rows={3}
                value={content.featuredVerseText}
                onChange={(e) => update("featuredVerseText", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none font-serif italic"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Bible Reference
              </label>
              <input
                type="text"
                value={content.featuredVerseRef}
                onChange={(e) => update("featuredVerseRef", e.target.value)}
                placeholder="e.g. John 8:32"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Context / Explanation
              </label>
              <textarea
                rows={3}
                value={content.featuredVerseContext}
                onChange={(e) => update("featuredVerseContext", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
              />
            </div>
          </div>

          {/* Live preview */}
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-gold-50/50 to-parchment-50 dark:from-gold-950/20 dark:to-background border border-gold-200 dark:border-gold-800/50">
            <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-2 flex items-center gap-1">
              <Eye className="w-3 h-3" /> Live Preview
            </p>
            <blockquote className="font-serif text-base italic mb-1">
              &ldquo;{content.featuredVerseText}&rdquo;
            </blockquote>
            <cite className="text-xs text-gold-600 dark:text-gold-400 font-semibold not-italic">
              — {content.featuredVerseRef}
            </cite>
            <p className="text-xs text-muted-foreground mt-1">{content.featuredVerseContext}</p>
          </div>
        </section>

        {/* ── Hero Section ────────────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="font-serif font-bold text-lg mb-1">Hero Section</h2>
          <p className="text-xs text-muted-foreground mb-4">
            The main headline and subheading visitors see first.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Main Headline
              </label>
              <input
                type="text"
                value={content.heroHeadline}
                onChange={(e) => update("heroHeadline", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Subheading
              </label>
              <textarea
                rows={3}
                value={content.heroSubheading}
                onChange={(e) => update("heroSubheading", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Save button (bottom) */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            The website updates within seconds of saving.
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm gap-2 disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle className="w-4 h-4" /> Saved & Live!</>
            ) : (
              <><Save className="w-4 h-4" /> Save & Go Live</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
