import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  MessageCircle,
  Users,
  Settings,
  BarChart3,
  Edit3,
  LogOut,
  Globe,
  FileText,
  Search,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Edit3, label: "Live Content", href: "/admin/content", highlight: true },
  { icon: FileText, label: "Blog", href: "/admin/blog" },
  { icon: BookOpen, label: "Teachings", href: "/admin/teachings" },
  { icon: BookMarked, label: "Daily Verses", href: "/admin/verses" },
  { icon: MessageCircle, label: "Questions", href: "/admin/questions" },
  { icon: Search, label: "SEO", href: "/admin/seo" },
  { icon: Users, label: "Subscribers", href: "/admin/subscribers" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col">
        <div className="p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-serif font-bold text-sm">
              Joshua<span className="text-gold-500">Global</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 px-1">
            <div className="w-6 h-6 rounded-full bg-gold-100 dark:bg-gold-900 flex items-center justify-center text-xs font-bold text-gold-700 dark:text-gold-300">
              {session.user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{session.user?.name ?? "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                item.highlight
                  ? "text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/30 hover:bg-gold-100 dark:hover:bg-gold-950/50 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.highlight && (
                <span className="ml-auto text-xs bg-gold-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                  Live
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4" />
            View Live Site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
