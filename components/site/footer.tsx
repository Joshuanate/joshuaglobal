import Link from "next/link";
import { Crown, Youtube, Instagram, Twitter, Globe, Flame, ArrowRight, Mail } from "lucide-react";

const footerLinks = {
  Kingdom: [
    { label: "Kingdom of God", href: "/kingdom" },
    { label: "Kingdom Teachings", href: "/teachings?cat=kingdom" },
    { label: "Apostle Paul", href: "/apostle-paul" },
    { label: "Exposing Deception", href: "/teachings?cat=deception" },
  ],
  Study: [
    { label: "Blog & Articles", href: "/blog" },
    { label: "All Teachings", href: "/teachings" },
    { label: "Daily Verse", href: "/daily-verse" },
    { label: "Truth Dictionary", href: "/truth" },
  ],
  Community: [
    { label: "Ask a Question", href: "/questions" },
    { label: "The Lord's Prayer", href: "/lords-prayer" },
    { label: "Videos", href: "/videos" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  Platform: [
    { label: "About", href: "/about" },
    { label: "Give", href: "/give" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socials = [
  { icon: Youtube, href: "https://youtube.com/@joshuaglobal", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/joshuaglobal", label: "Instagram" },
  { icon: Flame, href: "https://tiktok.com/@joshuaglobal", label: "TikTok" },
  { icon: Twitter, href: "https://twitter.com/joshuaglobal", label: "Twitter" },
  { icon: Globe, href: "https://pinterest.com/joshuaglobal", label: "Pinterest" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30 mt-0">

      {/* Newsletter bar */}
      <div className="border-b border-border/50 bg-secondary/20">
        <div className="container-editorial py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-1 rounded-full bg-gold-400" />
                <span className="section-label text-gold-600 dark:text-gold-500">Free Newsletter</span>
              </div>
              <h3 className="font-serif text-lg font-bold mb-1">Daily Kingdom Devotion</h3>
              <p className="text-sm text-muted-foreground">
                Verse, meaning, prayer, and truth — delivered every morning. Free forever.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto md:min-w-[360px]" action="/api/newsletter" method="POST">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-400/40 transition-all"
                />
              </div>
              <button type="submit" className="btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap">
                Join Free
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-editorial py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/20">
                <Crown className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-serif font-bold text-base tracking-[-0.01em]">
                Joshua<span className="text-gold-500">Global</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-[220px]">
              Preaching the Kingdom of God to every nation — unfiltered, uncompromised, for all people.
            </p>

            <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-6">
              Mine is the Kingdom. Lord Jesus is my King.
            </p>

            <blockquote className="text-xs italic text-muted-foreground/60 border-l-2 border-gold-400/40 pl-3">
              &ldquo;But seek first his kingdom and his righteousness.&rdquo;
              <cite className="block not-italic font-semibold text-gold-600 dark:text-gold-400 mt-1">
                — Matthew 6:33
              </cite>
            </blockquote>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="section-label mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-gold-600 dark:hover:text-gold-400"
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
      <div className="border-t border-border/50">
        <div className="container-editorial py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Joshua Global. Preaching the Kingdom of God to the nations.
          </p>
          <div className="flex items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-secondary/80 transition-colors"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
