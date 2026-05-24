import {
  BookOpen,
  BookMarked,
  MessageCircle,
  Users,
  ArrowUp,
  Plus,
  FileText,
  Search,
  Edit3,
  Zap,
  PlayCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";

function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  const color = positive ? "#22c55e" : "#ef4444";
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stats = [
  {
    label: "Total Teachings",
    value: "124",
    change: "+12",
    period: "this month",
    icon: BookOpen,
    sparkData: [80, 88, 95, 100, 108, 112, 118, 124],
  },
  {
    label: "Daily Verses",
    value: "365",
    change: "+31",
    period: "this month",
    icon: BookMarked,
    sparkData: [290, 304, 318, 328, 338, 349, 358, 365],
  },
  {
    label: "Community Q&A",
    value: "2,840",
    change: "+156",
    period: "this week",
    icon: MessageCircle,
    sparkData: [2200, 2380, 2450, 2540, 2620, 2700, 2780, 2840],
  },
  {
    label: "Subscribers",
    value: "8,420",
    change: "+234",
    period: "this week",
    icon: Users,
    sparkData: [7200, 7450, 7680, 7820, 7980, 8120, 8290, 8420],
  },
];

const recentContent = [
  { type: "Teaching", title: "What Jesus Truly Meant by Repentance", status: "published", views: "1,240", date: "2 hours ago" },
  { type: "Blog", title: "The Kingdom is Now: Understanding Present Reality", status: "published", views: "890", date: "Yesterday" },
  { type: "Verse", title: "John 8:32 — The Truth Will Set You Free", status: "scheduled", views: "—", date: "Tomorrow" },
  { type: "Teaching", title: "Paul's Revelation of Grace", status: "draft", views: "—", date: "Draft" },
  { type: "Blog", title: "Five Things Religion Gets Wrong About Salvation", status: "published", views: "2,100", date: "3 days ago" },
];

const recentActivity = [
  { type: "Teaching published", title: "What Jesus Truly Meant by Repentance", time: "2h ago", dot: "bg-green-500" },
  { type: "New question", title: "What is the Kingdom of God?", time: "4h ago", dot: "bg-blue-500" },
  { type: "New subscriber", title: "amara@example.com joined", time: "5h ago", dot: "bg-gold-500" },
  { type: "Verse scheduled", title: "John 8:32 for tomorrow", time: "1d ago", dot: "bg-purple-500" },
  { type: "Blog published", title: "Paul's Revelation of Grace (Part 2)", time: "2d ago", dot: "bg-green-500" },
];

const quickActions = [
  { label: "New Teaching", href: "/admin/teachings/new", icon: BookOpen },
  { label: "New Article", href: "/admin/blog/new", icon: FileText },
  { label: "Schedule Verse", href: "/admin/verses/new", icon: BookMarked },
  { label: "Add Video", href: "/admin/videos/new", icon: PlayCircle },
  { label: "SEO Settings", href: "/admin/seo", icon: Search },
  { label: "Live Content", href: "/admin/content", icon: Edit3 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-1">
            Command Center
          </p>
          <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kingdom content reaching the nations. Here&apos;s the pulse of the ministry.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
            <FileText className="w-4 h-4" />
            New Article
          </Link>
          <Link href="/admin/teachings/new" className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" />
            New Teaching
          </Link>
        </div>
      </div>

      {/* ── Stats with sparklines ───────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <s.icon className="w-4 h-4 text-gold-500" />
            </div>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-serif text-2xl font-bold mb-1">{s.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <span className="font-semibold">{s.change}</span>
                  <span className="text-muted-foreground">{s.period}</span>
                </p>
              </div>
              <Sparkline data={s.sparkData} positive />
            </div>
          </div>
        ))}
      </div>

      {/* ── Content Performance + Activity ─────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">

        {/* Content table — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif font-bold">Content Performance</h2>
            <Link
              href="/admin/analytics"
              className="text-xs text-gold-500 hover:text-gold-400 font-semibold"
            >
              Full Analytics →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentContent.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-secondary/30 transition-colors"
              >
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
                <span
                  className={`text-xs font-medium flex-shrink-0 ${
                    item.status === "published"
                      ? "text-green-600 dark:text-green-400"
                      : item.status === "scheduled"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {item.status}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                  <Eye className="w-3 h-3" />
                  {item.views}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 w-20 text-right">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity — 1 col */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-serif font-bold">Recent Activity</h2>
          </div>
          <div className="p-3 space-y-0.5">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gold-600 dark:text-gold-400">
                    {item.type}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold-500" />
            Quick Actions
          </h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/20 transition-all group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/40 flex items-center justify-center group-hover:bg-gold-200 dark:group-hover:bg-gold-900/70 transition-colors">
                <action.icon className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              </div>
              <span className="text-xs font-medium leading-tight text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
