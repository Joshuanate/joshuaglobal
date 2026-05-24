import {
  Users,
  Mail,
  TrendingUp,
  Download,
  ArrowUpRight,
  Zap,
  ExternalLink,
  Globe,
  Calendar,
} from "lucide-react";

const sampleSubscribers = [
  { email: "amara.osei@example.com", country: "🇬🇭 Ghana", joined: "May 24, 2026", source: "Newsletter page" },
  { email: "david.c@example.com", country: "🇺🇸 USA", joined: "May 23, 2026", source: "Daily verse CTA" },
  { email: "grace.n@example.com", country: "🇳🇬 Nigeria", joined: "May 23, 2026", source: "Homepage" },
  { email: "samuel.k@example.com", country: "🇰🇪 Kenya", joined: "May 22, 2026", source: "Blog footer" },
  { email: "ruth.m@example.com", country: "🇿🇦 South Africa", joined: "May 21, 2026", source: "Newsletter page" },
];

export default function SubscribersPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Subscribers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Everyone who signed up for the Daily Kingdom Devotion.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors opacity-50 cursor-not-allowed">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Subscribers", value: "—", sub: "Connect email provider", icon: Users },
          { label: "New This Week", value: "—", sub: "Connect email provider", icon: TrendingUp },
          { label: "Avg Open Rate", value: "—", sub: "Connect email provider", icon: Mail },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <s.icon className="w-4 h-4 text-gold-500" />
            </div>
            <p className="font-serif text-2xl font-bold mb-1">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Sample subscriber table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-serif font-bold">Subscriber List</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Sample data — connect Resend to see real subscribers</p>
          </div>
        </div>
        <div className="divide-y divide-border opacity-60">
          {sampleSubscribers.map((sub, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/40 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400">
                  {sub.email[0].toUpperCase()}
                </span>
              </div>
              <p className="flex-1 text-sm font-medium truncate">{sub.email}</p>
              <span className="text-sm flex-shrink-0">{sub.country}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Calendar className="w-3 h-3" />
                {sub.joined}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Globe className="w-3 h-3" />
                {sub.source}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-secondary/30 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            This is sample data. Connect your email provider to manage real subscribers.
          </p>
        </div>
      </div>

      {/* Connect notice */}
      <div className="rounded-2xl border border-dashed border-gold-300 dark:border-gold-700/50 bg-gold-50 dark:bg-gold-950/20 p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif font-bold mb-1">Connect Your Email Provider</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Add <code className="text-gold-500 bg-gold-100 dark:bg-gold-900/50 px-1 py-0.5 rounded text-xs">RESEND_API_KEY</code> to your environment variables, then update{" "}
              <code className="text-gold-500 bg-gold-100 dark:bg-gold-900/50 px-1 py-0.5 rounded text-xs">app/api/newsletter/route.ts</code>{" "}
              to save subscribers to KV and send welcome emails. Resend has a generous free tier (3,000 emails/month).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="https://resend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-sm">Resend</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Modern email API. Free 3K/mo.</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
              </a>
              <a
                href="https://convertkit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-sm">ConvertKit</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Built for creators. Free up to 10K.</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
