"use client";

import { useState } from "react";
import {
  Shield, Save, CheckCircle, Loader2, AlertCircle,
  Youtube, Instagram, Twitter, Globe, Mail, Crown, ExternalLink,
} from "lucide-react";

const SOCIAL_FIELDS = [
  { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@joshuaglobal" },
  { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/joshuaglobal" },
  { key: "tiktok", label: "TikTok", icon: Globe, placeholder: "https://tiktok.com/@joshuaglobal" },
  { key: "twitter", label: "Twitter / X", icon: Twitter, placeholder: "https://twitter.com/joshuaglobal" },
  { key: "pinterest", label: "Pinterest", icon: Globe, placeholder: "https://pinterest.com/joshuaglobal" },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  async function fakeSave(section: string) {
    setSaving(section);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(null);
    setSaved(section);
    setTimeout(() => setSaved(null), 3000);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage admin access, social links, and platform configuration.</p>
      </div>

      <div className="space-y-8">

        {/* ── Admin Credentials ──────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg">Admin Login Credentials</h2>
              <p className="text-xs text-muted-foreground">Controls who can access this admin panel</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-5">
            <p className="text-sm font-medium mb-1">Current credentials are stored in your <code className="text-gold-500">.env.local</code> file:</p>
            <div className="space-y-1 text-sm text-muted-foreground font-mono">
              <p>ADMIN_EMAIL=<span className="text-gold-500">admin@joshuaglobal.live</span></p>
              <p>ADMIN_PASSWORD=<span className="text-gold-500">••••••••••</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Admin Email</label>
              <input
                type="email"
                defaultValue="admin@joshuaglobal.live"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">New Password</label>
              <input
                type="password"
                placeholder="Enter new password..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-muted-foreground">
                To apply, update <code className="text-gold-500">ADMIN_EMAIL</code> and <code className="text-gold-500">ADMIN_PASSWORD</code> in your <code>.env.local</code> file and redeploy.
              </p>
              <button onClick={() => fakeSave("credentials")} disabled={saving === "credentials"} className="btn-primary text-sm gap-2">
                {saving === "credentials" ? <Loader2 className="w-4 h-4 animate-spin" /> : saved === "credentials" ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved === "credentials" ? "Saved!" : "Save"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Admin Access URL ───────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center">
              <Crown className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg">Admin Panel Access</h2>
              <p className="text-xs text-muted-foreground">Your admin panel is on a separate, protected path</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Live Website</p>
                <p className="text-sm font-medium">joshuaglobal.live</p>
              </div>
              <a href="/" target="_blank" className="flex items-center gap-1.5 text-xs text-gold-500 hover:underline font-medium">
                Open <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-950/30">
              <div>
                <p className="text-xs text-gold-600 dark:text-gold-400 uppercase tracking-wider font-semibold mb-0.5">Admin Panel (this page)</p>
                <p className="text-sm font-medium">joshuaglobal.live/admin</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-gold-500 text-black text-xs font-bold">Protected</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Optional: Custom Admin Domain</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                On Vercel, you can point <strong>admin.joshuaglobal.live</strong> to this deployment with a path rewrite
                to <code>/admin</code>. This gives you a clean separate address. Set it up in your Vercel dashboard under
                Domains → Redirects.
              </p>
            </div>
          </div>
        </section>

        {/* ── Social Media Links ─────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg">Social Media Links</h2>
              <p className="text-xs text-muted-foreground">Used in the footer and social media strip on the homepage</p>
            </div>
          </div>

          <div className="space-y-3">
            {SOCIAL_FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-border bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">{label}</label>
                  <input
                    type="url"
                    defaultValue={key === "youtube" ? "https://youtube.com/@joshuaglobal" :
                      key === "instagram" ? "https://instagram.com/joshuaglobal" :
                      key === "tiktok" ? "https://tiktok.com/@joshuaglobal" :
                      key === "twitter" ? "https://twitter.com/joshuaglobal" :
                      "https://pinterest.com/joshuaglobal"}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={() => fakeSave("social")} disabled={saving === "social"} className="btn-primary text-sm gap-2">
              {saving === "social" ? <Loader2 className="w-4 h-4 animate-spin" /> : saved === "social" ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "social" ? "Saved!" : "Save Links"}
            </button>
          </div>
        </section>

        {/* ── Contact Info ───────────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg">Contact & Email</h2>
              <p className="text-xs text-muted-foreground">Ministry contact email and newsletter sender</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Ministry Contact Email</label>
              <input
                type="email"
                defaultValue="joshua.j.nathaniel@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Newsletter From Email</label>
              <input
                type="email"
                defaultValue="hello@joshuaglobal.live"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={() => fakeSave("contact")} disabled={saving === "contact"} className="btn-primary text-sm gap-2">
                {saving === "contact" ? <Loader2 className="w-4 h-4 animate-spin" /> : saved === "contact" ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved === "contact" ? "Saved!" : "Save"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Danger Zone ────────────────────────────────────── */}
        <section className="p-6 rounded-2xl border border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h2 className="font-serif font-bold text-lg text-destructive">Danger Zone</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            These actions are irreversible. Only proceed if you are absolutely certain.
          </p>
          <button
            onClick={() => confirm("Are you sure you want to clear all cached content? This will reset the site to default content.") && fakeSave("clear")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-destructive/40 text-destructive text-sm hover:bg-destructive/10 transition-colors"
          >
            Clear All Cached Content
          </button>
        </section>
      </div>
    </div>
  );
}
