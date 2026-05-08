import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  MessageCircle,
  Users,
  Settings,
  BarChart3,
  Image,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Teachings", href: "/admin/teachings" },
  { icon: BookMarked, label: "Daily Verses", href: "/admin/verses" },
  { icon: BookMarked, label: "Truth Dictionary", href: "/admin/truth" },
  { icon: MessageCircle, label: "Questions", href: "/admin/questions" },
  { icon: Users, label: "Subscribers", href: "/admin/subscribers" },
  { icon: Image, label: "Media", href: "/admin/media" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-serif font-bold text-sm">
              Joshua<span className="text-gold-500">Global</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1 pl-9">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors group"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
