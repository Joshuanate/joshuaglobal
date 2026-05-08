import {
  BookOpen,
  BookMarked,
  MessageCircle,
  Users,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Teachings", value: "124", change: "+12 this month", icon: BookOpen },
  { label: "Daily Verses", value: "365", change: "All published", icon: BookMarked },
  { label: "Questions", value: "2,840", change: "+156 this week", icon: MessageCircle },
  { label: "Subscribers", value: "8,420", change: "+234 this week", icon: Users },
];

const recentActivity = [
  { type: "Teaching published", title: "What Jesus Truly Meant by Repentance", time: "2 hours ago" },
  { type: "New question", title: "What is the Kingdom of God?", time: "4 hours ago" },
  { type: "New subscriber", title: "amara@example.com signed up", time: "5 hours ago" },
  { type: "Daily verse scheduled", title: "John 8:32 for tomorrow", time: "1 day ago" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back. Here&apos;s what&apos;s happening at Joshua Global.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/teachings/new" className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" />
            New Teaching
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <s.icon className="w-4 h-4 text-gold-500" />
            </div>
            <p className="font-serif text-2xl font-bold mb-1">{s.value}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              {s.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="font-serif font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <Eye className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gold-600 dark:text-gold-400">{item.type}</p>
                  <p className="text-sm truncate">{item.title}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="font-serif font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Teaching", href: "/admin/teachings/new", icon: BookOpen },
              { label: "Schedule Verse", href: "/admin/verses/new", icon: BookMarked },
              { label: "Add Truth Entry", href: "/admin/truth/new", icon: BookOpen },
              { label: "View Questions", href: "/admin/questions", icon: MessageCircle },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/20 transition-all group"
              >
                <action.icon className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
