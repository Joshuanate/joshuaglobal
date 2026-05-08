import Link from "next/link";
import { BookOpen, Twitter, Youtube, Instagram, Mail } from "lucide-react";

const footerLinks = {
  Study: [
    { label: "Daily Verse", href: "/daily-verse" },
    { label: "Teachings", href: "/teachings" },
    { label: "Truth Dictionary", href: "/truth" },
    { label: "Scripture Search", href: "/search" },
  ],
  Explore: [
    { label: "Ask a Question", href: "/questions" },
    { label: "AI Truth Guide", href: "/ai-guide" },
    { label: "Categories", href: "/categories" },
    { label: "Community", href: "/community" },
  ],
  Platform: [
    { label: "About Us", href: "/about" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Donate", href: "/donate" },
    { label: "Courses", href: "/courses" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com/joshuaglobal", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@joshuaglobal", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/joshuaglobal", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@joshuaglobal.live", label: "Email" },
];

const verse = {
  text: "Your word is a lamp to my feet and a light to my path.",
  ref: "Psalm 119:105",
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      {/* Newsletter bar */}
      <div className="border-b border-border">
        <div className="container-editorial py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold">Daily Devotion in Your Inbox</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Receive scripture, study, and inspiration every morning.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-editorial py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-lg">
                Joshua<span className="text-gold-500">Global</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Helping people discover the original teachings of Jesus through scripture-based
              truth, study, and modern tools.
            </p>
            <blockquote className="text-xs italic text-muted-foreground/70 border-l border-gold-400 pl-3">
              "{verse.text}"
              <cite className="block not-italic font-medium text-gold-600 dark:text-gold-400 mt-1">
                — {verse.ref}
              </cite>
            </blockquote>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-editorial py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Joshua Global. Built for the glory of God.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
