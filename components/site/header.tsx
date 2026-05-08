"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Study",
    children: [
      { label: "Daily Verse", href: "/daily-verse", desc: "Today's scripture with deep context" },
      { label: "Teachings", href: "/teachings", desc: "Long-form biblical studies" },
      { label: "Truth Dictionary", href: "/truth", desc: "Search biblical terms & concepts" },
    ],
  },
  {
    label: "Explore",
    children: [
      { label: "Ask a Question", href: "/questions", desc: "Search or ask Bible questions" },
      { label: "AI Truth Guide", href: "/ai-guide", desc: "AI-powered scripture discovery" },
      { label: "Scripture Search", href: "/search", desc: "Full-text Bible search" },
    ],
  },
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-editorial flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/25 group-hover:shadow-gold-500/50 transition-shadow">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight">
            Joshua<span className="text-gold-500">Global</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1 nav-link px-3 py-2 rounded-lg hover:bg-secondary">
                  {item.label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", openMenu === item.label && "rotate-180")} />
                </button>
                {openMenu === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                            {child.label}
                          </span>
                          <span className="text-xs text-muted-foreground">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="nav-link px-3 py-2 rounded-lg hover:bg-secondary"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <Link
            href="/ai-guide"
            className="hidden sm:flex btn-primary !px-4 !py-2 text-sm gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Guide
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="container-editorial py-4 space-y-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2.5 rounded-lg text-sm hover:bg-secondary transition-colors"
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
                  className="block px-3 py-2.5 rounded-lg text-sm hover:bg-secondary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-2">
              <Link
                href="/ai-guide"
                className="btn-primary w-full justify-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Try AI Truth Guide
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
