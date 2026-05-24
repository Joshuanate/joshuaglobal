"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Crown,
  Play,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Kingdom",
    children: [
      { label: "Kingdom of God", href: "/kingdom", desc: "The primary message of Jesus — explained" },
      { label: "Apostle Paul", href: "/apostle-paul", desc: "His story, letters, and Kingdom message" },
      { label: "Kingdom Teachings", href: "/teachings?cat=kingdom", desc: "Deep studies on God's government" },
      { label: "Exposing Deception", href: "/teachings?cat=deception", desc: "Truth vs. false doctrine" },
    ],
  },
  {
    label: "Study",
    children: [
      { label: "Blog & Articles", href: "/blog", desc: "In-depth Kingdom articles" },
      { label: "All Teachings", href: "/teachings", desc: "Long-form biblical studies" },
      { label: "Daily Verse", href: "/daily-verse", desc: "Scripture with context and reflection" },
      { label: "Truth Dictionary", href: "/truth", desc: "Biblical terms & concepts defined" },
    ],
  },
  {
    label: "Videos",
    children: [
      { label: "All Teachings", href: "/videos", desc: "Full Kingdom teaching videos" },
      { label: "YouTube Channel", href: "https://youtube.com/@joshuaglobal", desc: "Subscribe on YouTube", external: true },
      { label: "Shorts & Reels", href: "/videos?type=shorts", desc: "Quick Kingdom truth drops" },
    ],
  },
  {
    label: "Answers",
    children: [
      { label: "Ask a Question", href: "/questions/ask", desc: "Submit your question" },
      { label: "Browse Q&A", href: "/questions", desc: "Questions about God, Jesus & the Bible" },
      { label: "The Lord's Prayer", href: "/lords-prayer", desc: "Pray it with understanding" },
      { label: "Newsletter", href: "/newsletter", desc: "Kingdom devotion in your inbox" },
    ],
  },
  { label: "Give", href: "/give" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/92 backdrop-blur-2xl border-b border-border/60 shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav className="container-editorial flex items-center justify-between h-[62px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/20">
            <Crown className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-serif font-bold text-[17px] tracking-[-0.01em]">
            Joshua<span className="text-gold-500">Global</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1 nav-link px-3.5 py-2 rounded-lg hover:bg-secondary/70 text-sm">
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform duration-200 opacity-50",
                      openMenu === item.label && "rotate-180 opacity-80"
                    )}
                  />
                </button>
                {/* Dropdown */}
                <div
                  className={cn(
                    "absolute top-full left-0 pt-1.5 w-[240px] transition-all duration-200",
                    openMenu === item.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  )}
                >
                  <div className="bg-card/98 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl shadow-black/12 p-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        target={"external" in child && child.external ? "_blank" : undefined}
                        rel={"external" in child && child.external ? "noopener noreferrer" : undefined}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-secondary/80 transition-colors group"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                          {child.label}
                        </span>
                        <span className="text-xs text-muted-foreground leading-relaxed">{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="nav-link px-3.5 py-2 rounded-lg hover:bg-secondary/70 text-sm"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>
          )}

          <Link
            href="/videos"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/70 text-sm font-medium transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            Watch
          </Link>

          <Link
            href="/kingdom"
            className="hidden sm:flex btn-primary !px-4 !py-2 !text-sm !gap-1.5"
          >
            <Crown className="w-3.5 h-3.5" />
            The Kingdom
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-2xl border-b border-border animate-[fadeDown_0.2s_ease-out]">
          <div className="container-editorial py-5 space-y-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="section-label px-3 pt-3 pb-1.5">{item.label}</p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 pt-4 pb-1">
              <Link
                href="/kingdom"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <Crown className="w-4 h-4" />
                The Kingdom
              </Link>
              <Link
                href="/videos"
                className="btn-secondary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <Video className="w-4 h-4" />
                Watch Teachings
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
