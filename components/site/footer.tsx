import Link from "next/link";
import { BookOpen, Twitter, Youtube, Instagram, Globe, Crown, Flame } from "lucide-react";

const footerLinks = {
  Kingdom: [
    { label: "Kingdom of God", href: "/kingdom" },
    { label: "Kingdom Teachings", href: "/teachings?cat=kingdom" },
    { label: "Apostle Paul", href: "/apostle-paul" },
    { label: "Exposing Deception", href: "/teachings?cat=deception" },
  ],
  Study: [
    { label: "Daily Verse", href: "/daily-verse" },
    { label: "All Teachings", href: "/teachings" },
    { label: "Truth Dictionary", href: "/truth" },
    { label: "Scripture Search", href: "/search" },
  ],
  Answers: [
    { label: "Ask a Question", href: "/questions" },
    { label: "The Lord's Prayer", href: "/lords-prayer" },
    { label: "How to Pray", href: "/questions/how-to-pray" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  Platform: [
    { label: "About Joshua Global", href: "/about" },
    { label: "Give / Donate", href: "/give" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Youtube, href: "https://youtube.com/@joshuaglobal", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/joshuaglobal", label: "Instagram" },
  { icon: Flame, href: "https://tiktok.com/@joshuaglobal", label: "TikTok" },
  { icon: Twitter, href: "https://twitter.com/joshuaglobal", label: "Twitter / X" },
  { icon: Globe, href: "https://pinterest.com/joshuaglobal", label: "Pinterest" },
];

const verse = {
  text: "But seek first his kingdom and his righteousness.",
  ref: "Matthew 6:33",
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      {/* Newsletter bar */}
      <div className="border-b border-border">
        <div className="container-editorial py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold">Daily Kingdom Devotion in Your Inbox</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Verse, meaning, prayer, and Kingdom truth delivered every morning. Free forever.
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
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-lg">
                Joshua<span className="text-gold-500">Global</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Preaching the Kingdom of God to every nation. The original message of Jesus Christ —
              unfiltered, uncompromised, for all people.
            </p>
            <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold mb-5">
              Mine is the Kingdom. Lord Jesus is my King.
            </p>
            <blockquote className="text-xs italic text-muted-foreground/70 border-l border-gold-400 pl-3">
              &ldquo;{verse.text}&rdquo;
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
            © {new Date().getFullYear()} Joshua Global. Preaching the Kingdom of God to the nations.
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
