import { BarChart3, TrendingUp, Eye, Globe, ArrowUpRight, Zap, ExternalLink } from "lucide-react";

function MiniBarChart({ values, color = "#d4991a" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-80"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

const topContent = [
  { title: "What Is the Kingdom of God?", type: "Teaching", views: "12,400", trend: "+18%" },
  { title: "The Truth Will Set You Free — John 8:32", type: "Verse", views: "9,800", trend: "+12%" },
  { title: "Apostle Paul: The Kingdom Gospel", type: "Teaching", views: "7,200", trend: "+9%" },
  { title: "Five Things Religion Gets Wrong", type: "Blog", views: "6,100", trend: "+22%" },
  { title: "Prayer & the Kingdom — Matthew 6", type: "Teaching", views: "5,400", trend: "+7%" },
];

const monthData = [42, 55, 48, 60, 72, 68, 80, 90, 85, 96, 108, 124];
const weekData = [18, 24, 21, 30, 28, 36, 40];

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Traffic, reach, and Kingdom growth metrics.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Page Views (30d)", value: "—", sub: "Connect analytics", icon: Eye, color: "text-blue-500" },
          { label: "Unique Visitors", value: "—", sub: "Connect analytics", icon: Globe, color: "text-purple-500" },
          { label: "Top Country", value: "—", sub: "Connect analytics", icon: Globe, color: "text-green-500" },
          { label: "Growth (MoM)", value: "—", sub: "Connect analytics", icon: TrendingUp, color: "text-gold-500" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="font-serif text-2xl font-bold mb-1">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart preview + Top content */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* Monthly chart mock */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-serif font-bold text-sm">Monthly Traffic</h2>
            <span className="text-xs text-muted-foreground">Last 12 months</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Connect analytics to see live data</p>
          <div className="mb-1">
            <MiniBarChart values={monthData} />
          </div>
          <div className="flex justify-between mt-1">
            {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
              <span key={m} className="text-[10px] text-muted-foreground/60">{m}</span>
            ))}
          </div>
        </div>

        {/* Weekly chart mock */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-serif font-bold text-sm">This Week</h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
              <TrendingUp className="w-3 h-3" /> +18% vs last week
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Connect analytics to see live data</p>
          <div className="mb-1">
            <MiniBarChart values={weekData} color="#22c55e" />
          </div>
          <div className="flex justify-between mt-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="text-[10px] text-muted-foreground/60">{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Top content */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif font-bold">Top Content</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Sample data — connect analytics for real numbers</p>
        </div>
        <div className="divide-y divide-border">
          {topContent.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <span className="text-sm font-bold text-muted-foreground/50 w-5 flex-shrink-0">
                {i + 1}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-semibold flex-shrink-0 ${
                  item.type === "Teaching"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : item.type === "Blog"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                    : "bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400"
                }`}
              >
                {item.type}
              </span>
              <p className="flex-1 text-sm font-medium truncate">{item.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Eye className="w-3 h-3" />
                {item.views}
              </div>
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-0.5 flex-shrink-0">
                <ArrowUpRight className="w-3 h-3" />
                {item.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Connect analytics */}
      <div className="rounded-2xl border border-dashed border-gold-300 dark:border-gold-700/50 bg-gold-50 dark:bg-gold-950/20 p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif font-bold mb-1">Connect Real Analytics</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              See real-time traffic, top pages, geographic reach, and how Kingdom truth is
              spreading worldwide. Choose your analytics provider:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-sm">Vercel Analytics</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Built into Vercel. Zero config.</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
              </a>
              <a
                href="https://plausible.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-sm">Plausible Analytics</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Privacy-first. No cookies.</p>
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
