"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  MessageCircle,
  Users,
  Settings,
  BarChart3,
  Edit3,
  FileText,
  Search,
  PlayCircle,
  ImageIcon,
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  highlight?: boolean;
};

type NavSection = {
  label?: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: Edit3, label: "Live Content", href: "/admin/content", highlight: true },
      { icon: FileText, label: "Blog", href: "/admin/blog" },
      { icon: BookOpen, label: "Teachings", href: "/admin/teachings" },
      { icon: BookMarked, label: "Daily Verses", href: "/admin/verses" },
      { icon: PlayCircle, label: "Videos", href: "/admin/videos" },
      { icon: MessageCircle, label: "Questions", href: "/admin/questions" },
    ],
  },
  {
    label: "Tools",
    items: [
      { icon: ImageIcon, label: "Media Library", href: "/admin/media" },
      { icon: Search, label: "SEO", href: "/admin/seo" },
      { icon: Users, label: "Subscribers", href: "/admin/subscribers" },
      { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Settings, label: "Settings", href: "/admin/settings" },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <nav className="flex-1 p-3 overflow-y-auto">
      {sections.map((section, si) => (
        <div key={si} className={si > 0 ? "mt-5" : ""}>
          {section.label && (
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
              {section.label}
            </p>
          )}
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    active
                      ? "bg-gold-100 dark:bg-gold-950/60 text-gold-700 dark:text-gold-300 font-semibold"
                      : item.highlight
                      ? "text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/30 hover:bg-gold-100 dark:hover:bg-gold-950/50 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      active ? "text-gold-600 dark:text-gold-400" : ""
                    }`}
                  />
                  {item.label}
                  {item.highlight && !active && (
                    <span className="ml-auto text-[10px] bg-gold-500 text-white px-1.5 py-0.5 rounded-full font-bold tracking-wide">
                      LIVE
                    </span>
                  )}
                  {active && item.highlight && (
                    <span className="ml-auto text-[10px] bg-gold-500 text-white px-1.5 py-0.5 rounded-full font-bold tracking-wide">
                      LIVE
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
