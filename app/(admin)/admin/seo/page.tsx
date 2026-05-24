"use client";

import { useState, useEffect } from "react";
import {
  Globe, Save, Loader2, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, ExternalLink, Shield, Search,
} from "lucide-react";
import type { GlobalSEO, PageSEO, PagesSEO } from "@/lib/seo-types";
import { DEFAULT_GLOBAL_SEO, KEY_PAGES } from "@/lib/seo-types";

export default function AdminSEOPage() {
  const [global, setGlobal] = useState<GlobalSEO>(DEFAULT_GLOBAL_SEO);
  const [pages, setPages] = useState<PagesSEO>({});
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [savedGlobal, setSavedGlobal] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [savingPage, setSavingPage] = useState<string | null>(null);
  const [savedPage, setSavedPage] = useState<string | null>(null);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/seo").then((r) => r.json()),
      fetch("/api/admin/seo/pages").then((r) => r.json()),
    ]).then(([g, p]) => {
      if (g && !g.error) setGlobal(g);
      if (p && !p.error) setPages(p);
      setLoadingGlobal(false);
    });
  }, []);

  async function saveGlobal() {
    setSavingGlobal(true);
    setGlobalError("");
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(global),
    });
    const data = await res.json();
    setSavingGlobal(false);
    if (data.success) {
      setSavedGlobal(true);
      setTimeout(() => setSavedGlobal(false), 3000);
    } else {
      setGlobalError("Failed to save. Please try again.");
    }
  }

  async function savePage(slug: string) {
    setSavingPage(slug);
    const pageSeo = pages[slug] || { noIndex: false };
    await fetch("/api/admin/seo/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, seo: pageSeo }),
    });
    setSavingPage(null);
    setSavedPage(slug);
    setTimeout(() => setSavedPage(null), 2000);
  }

  function updatePageSEO(slug: string, key: keyof PageSEO, value: string | boolean) {
    setPages((prev) => {
      const existing: PageSEO = prev[slug] ?? { noIndex: false };
      return { ...prev, [slug]: { ...existing, [key]: value } };
    });
  }

  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Globe className="w-5 h-5 text-gold-500" />
          <h1 className="font-serif text-2xl font-bold">SEO Control Center</h1>
        </div>
        <p className="text-sm text-muted-foreground">Manage global SEO settings, per-page overrides, and technical status.</p>
      </div>

      {/* Global SEO Settings */}
      <section className="mb-8 p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-lg font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-500" /> Global Settings
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Applied site-wide as defaults. Per-page settings override these.</p>
          </div>
          <button onClick={saveGlobal} disabled={savingGlobal} className="btn-primary text-sm gap-2 disabled:opacity-50">
            {savedGlobal ? <CheckCircle className="w-4 h-4" /> : savingGlobal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {savedGlobal ? "Saved!" : "Save"}
          </button>
        </div>

        {globalError && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {globalError}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Site Title</label>
              <input
                type="text"
                value={global.siteTitle}
                onChange={(e) => setGlobal({ ...global, siteTitle: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Title Template</label>
              <input
                type="text"
                value={global.titleTemplate}
                onChange={(e) => setGlobal({ ...global, titleTemplate: e.target.value })}
                placeholder="%s | Joshua Global"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Use %s for page title</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Default Meta Description</label>
            <textarea
              rows={2}
              value={global.defaultDescription}
              onChange={(e) => setGlobal({ ...global, defaultDescription: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">{global.defaultDescription.length}/160 chars</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Default OG Image URL</label>
            <input
              type="url"
              value={global.defaultOgImage}
              onChange={(e) => setGlobal({ ...global, defaultOgImage: e.target.value })}
              placeholder="https://joshuaglobal.live/og-default.jpg"
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Twitter Handle</label>
              <input
                type="text"
                value={global.twitterHandle}
                onChange={(e) => setGlobal({ ...global, twitterHandle: e.target.value })}
                placeholder="@joshuaglobal"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Google Verification</label>
              <input
                type="text"
                value={global.googleVerification}
                onChange={(e) => setGlobal({ ...global, googleVerification: e.target.value })}
                placeholder="Google Search Console verification code"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Bing Verification</label>
            <input
              type="text"
              value={global.bingVerification}
              onChange={(e) => setGlobal({ ...global, bingVerification: e.target.value })}
              placeholder="Bing Webmaster Tools verification code"
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
            <div
              onClick={() => setGlobal({ ...global, indexingEnabled: !global.indexingEnabled })}
              className={`relative w-10 h-6 rounded-full transition-colors ${global.indexingEnabled ? "bg-green-500" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${global.indexingEnabled ? "translate-x-4" : "translate-x-0"}`} />
            </div>
            <div>
              <span className="text-sm font-medium">Search Engine Indexing {global.indexingEnabled ? "Enabled" : "Disabled"}</span>
              <p className="text-xs text-muted-foreground">When disabled, all pages get noindex,nofollow</p>
            </div>
          </label>
        </div>
      </section>

      {/* Per-Page SEO */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="font-serif text-lg font-bold flex items-center gap-2">
            <Search className="w-4 h-4 text-gold-500" /> Per-Page SEO Overrides
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Override title, description, and OG image for individual pages.</p>
        </div>
        <div className="space-y-2">
          {KEY_PAGES.map((page) => {
            const pageSeo = pages[page.slug] || {} as PageSEO;
            const isOpen = expandedPage === page.slug;
            return (
              <div key={page.slug} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setExpandedPage(isOpen ? null : page.slug)}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{page.label}</span>
                    <span className="text-xs text-muted-foreground font-mono">{page.slug}</span>
                    {(pageSeo.title || pageSeo.description || pageSeo.ogImage) && (
                      <span className="px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">Custom</span>
                    )}
                    {pageSeo.noIndex && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">No-index</span>
                    )}
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Custom Title <span className="font-normal normal-case">(leave blank to use global template)</span></label>
                      <input
                        type="text"
                        value={pageSeo.title || ""}
                        onChange={(e) => updatePageSEO(page.slug, "title", e.target.value)}
                        placeholder={`${page.label} | Joshua Global`}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Custom Description</label>
                      <textarea
                        rows={2}
                        value={pageSeo.description || ""}
                        onChange={(e) => updatePageSEO(page.slug, "description", e.target.value)}
                        placeholder="Custom meta description for this page..."
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">OG Image URL</label>
                      <input
                        type="url"
                        value={pageSeo.ogImage || ""}
                        onChange={(e) => updatePageSEO(page.slug, "ogImage", e.target.value)}
                        placeholder="https://joshuaglobal.live/og-page.jpg"
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pageSeo.noIndex || false}
                          onChange={(e) => updatePageSEO(page.slug, "noIndex", e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">No-index this page</span>
                      </label>
                      <button
                        onClick={() => savePage(page.slug)}
                        disabled={savingPage === page.slug}
                        className="btn-primary text-xs gap-1.5 disabled:opacity-50"
                      >
                        {savedPage === page.slug ? <CheckCircle className="w-3 h-3" /> : savingPage === page.slug ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        {savedPage === page.slug ? "Saved" : "Save Page"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Status */}
      <section className="mb-8 p-6 rounded-2xl border border-border bg-card">
        <h2 className="font-serif text-lg font-bold flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-gold-500" /> Technical Status
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium">Sitemap</p>
              <p className="text-xs text-muted-foreground">Auto-generated, includes all blog posts</p>
            </div>
            <a href="/sitemap.xml" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gold-500 text-xs font-medium hover:text-gold-400 transition-colors">
              View <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium">Robots.txt</p>
              <p className="text-xs text-muted-foreground">Controls which pages search engines crawl</p>
            </div>
            <a href="/robots.txt" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gold-500 text-xs font-medium hover:text-gold-400 transition-colors">
              View <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium">Indexing Status</p>
              <p className="text-xs text-muted-foreground">Global search engine indexing</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${global.indexingEnabled ? "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400" : "bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"}`}>
              {global.indexingEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Article Schema (JSON-LD)</p>
              <p className="text-xs text-muted-foreground">Auto-injected on all blog post pages</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">Active</span>
          </div>
        </div>
      </section>

      {/* Blog post SEO note */}
      <section className="p-5 rounded-2xl bg-gold-500/10 border border-gold-500/30">
        <p className="text-sm font-medium text-gold-600 dark:text-gold-400 mb-1">Blog Post SEO</p>
        <p className="text-sm text-muted-foreground">
          Each blog post has its own SEO settings (title, description, OG image, no-index). Edit them in the blog editor — click the <strong>SEO Settings</strong> section at the bottom of any post.
        </p>
      </section>
    </div>
  );
}
