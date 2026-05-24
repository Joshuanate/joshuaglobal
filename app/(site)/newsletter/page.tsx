import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  BookOpen,
  BookMarked,
  Crown,
  Video,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Join the Kingdom Community — Daily Devotion Newsletter",
  description:
    "Start every morning grounded in Scripture. Get the daily verse with context, weekly Kingdom teachings, devotionals, and new content delivered to your inbox. Free forever.",
  url: "/newsletter",
});

const included = [
  {
    icon: BookMarked,
    title: "Daily Bible Verse",
    desc: "Every morning — a scripture with historical context, original language meaning, and a prayer.",
  },
  {
    icon: Crown,
    title: "Kingdom Devotionals",
    desc: "Weekly deep-dive teachings on the Kingdom of God, Jesus&apos; core message preached 100+ times.",
  },
  {
    icon: BookOpen,
    title: "New Articles",
    desc: "First access to every new blog post, biblical study, and truth article published on the site.",
  },
  {
    icon: Video,
    title: "New Video Alerts",
    desc: "Be the first to know when new Kingdom teaching videos are published on YouTube.",
  },
];

const testimonials = [
  {
    name: "Emmanuel T.",
    location: "Accra, Ghana",
    text: "I&apos;ve been a Christian for 20 years but never understood the Kingdom of God. This newsletter changed everything — I open it every single morning.",
  },
  {
    name: "Rachel M.",
    location: "London, UK",
    text: "The daily verse with context is unlike anything I&apos;ve ever read. It&apos;s not just a quote — it&apos;s a whole teaching in one email. I&apos;ve been a subscriber for months.",
  },
  {
    name: "David O.",
    location: "Lagos, Nigeria",
    text: "Dr. Myles Munroe&apos;s Kingdom message changed my life. This newsletter carries that same fire. Every week I learn something new about who I am in the Kingdom.",
  },
];

export default function NewsletterPage() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-[#0e0b02] to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(212,153,26,0.10)_0%,_transparent_60%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-editorial py-28 md:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

            {/* Left — copy */}
            <div>
              <div className="badge-gold mb-7 w-fit">
                <Users className="w-3 h-3" />
                The Kingdom Community
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-5 tracking-tight">
                Start Every Morning<br />
                <span className="text-gold-400">in the Kingdom.</span>
              </h1>

              <p className="text-zinc-300 text-lg leading-relaxed mb-3 max-w-xl">
                A daily Bible verse with full context, Kingdom teachings, devotionals, and truth — delivered to your inbox every morning. Free forever.
              </p>
              <p className="text-gold-400/70 text-sm font-medium mb-10">
                Join thousands of believers from every nation.
              </p>

              {/* What's included */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {included.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/8"
                  >
                    <item.icon className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-xs font-semibold mb-0.5">{item.title}</p>
                      <p className="text-zinc-500 text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-6 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  100% Free
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  No spam, ever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Unsubscribe anytime
                </span>
              </div>
            </div>

            {/* Right — form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gold-400/5 rounded-3xl blur-2xl" />
              <div className="relative p-8 md:p-10 rounded-3xl border border-gold-400/20 bg-zinc-950">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold-500/20">
                    <Mail className="w-7 h-7 text-black" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    Join the Kingdom Community
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Your first email arrives tomorrow morning.
                  </p>
                </div>

                <form action="/api/newsletter" method="POST" className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your first name (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-gold-400/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-gold-400/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm transition-colors shadow-lg shadow-gold-500/20">
                    <Crown className="w-4 h-4" />
                    Subscribe Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-center text-xs text-zinc-600 mt-4">
                  By subscribing you agree to receive emails from Joshua Global.
                  Unsubscribe anytime.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL RECEIVE ──────────────────────────────────── */}
      <section className="py-28 border-b border-border/60">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <p className="section-label mb-3">What You Receive</p>
            <h2 className="section-heading">More Than a Newsletter.<br />A Daily Kingdom Encounter.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: BookMarked,
                label: "Daily Verse",
                desc: "A scripture with the historical context, original Hebrew or Greek meaning, and practical application — not just a quote.",
                freq: "Every morning",
              },
              {
                icon: Crown,
                label: "Kingdom Teachings",
                desc: "Deep-dive biblical teachings on the Kingdom of God, Apostle Paul's letters, and the truths Jesus preached most.",
                freq: "Every week",
              },
              {
                icon: BookOpen,
                label: "New Articles",
                desc: "Be the first to receive new blog posts, biblical studies, and truth-based answers to questions people search for daily.",
                freq: "When published",
              },
              {
                icon: Video,
                label: "Video Alerts",
                desc: "Never miss a new Kingdom teaching video. Get notified the moment a new YouTube teaching is live.",
                freq: "When published",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group p-7 rounded-2xl border border-border bg-card hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5 group-hover:bg-gold-500/25 transition-colors">
                  <item.icon className="w-5 h-5 text-gold-500" />
                </div>
                <h3 className="font-serif font-bold text-base mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.desc}</p>
                <span className="text-xs text-gold-500 font-semibold">{item.freq}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW WHAT IT LOOKS LIKE ───────────────────────────── */}
      <section className="py-24 border-b border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">

              {/* Explanation */}
              <div className="flex-1">
                <p className="section-label mb-4">Sample Devotion</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 tracking-tight leading-snug">
                  This is what lands<br />in your inbox.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every morning, before anything else, you receive the Word. Not a motivational quote — a scripture, its Kingdom meaning, its original language depth, and a prayer to carry through your day.
                </p>
                <div className="space-y-3">
                  {[
                    "The verse in full — translation + context",
                    "Historical background of when it was written",
                    "Original Greek or Hebrew word meanings",
                    "What it means for your Kingdom life today",
                    "A prayer rooted in the scripture",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock email preview */}
              <div className="flex-1 w-full">
                <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/20">
                  {/* Email header */}
                  <div className="bg-secondary/50 px-5 py-3 border-b border-border flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                      Daily Kingdom Devotion — Joshua Global
                    </div>
                  </div>
                  {/* Email body preview */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <Crown className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Joshua Global</p>
                        <p className="text-xs text-muted-foreground">devotion@joshuaglobal.live</p>
                      </div>
                    </div>
                    <div className="mb-4 pb-4 border-b border-border/60">
                      <p className="text-xs text-gold-500 font-semibold mb-1">Today&apos;s Verse — John 8:32</p>
                      <p className="font-serif italic text-base font-medium leading-relaxed">
                        &ldquo;The truth will set you free.&rdquo;
                      </p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2 bg-secondary rounded-full w-full" />
                      <div className="h-2 bg-secondary rounded-full w-5/6" />
                      <div className="h-2 bg-secondary rounded-full w-4/5" />
                    </div>
                    <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                      <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold mb-1">Kingdom Application</p>
                      <div className="space-y-1.5">
                        <div className="h-2 bg-gold-200/20 rounded-full w-full" />
                        <div className="h-2 bg-gold-200/20 rounded-full w-4/5" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-gold-500 rounded-lg opacity-80" />
                      <div className="flex-1 h-8 bg-secondary rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <p className="section-label mb-3">From the Community</p>
            <h2 className="section-heading">What Subscribers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl border border-border bg-card flex flex-col gap-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.text}&rdquo;` }}
                />
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="pb-28">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0e0b02] to-zinc-950 border border-gold-400/20 p-10 md:p-16 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                backgroundSize: "35px 35px",
              }}
            />

            <div className="relative max-w-xl mx-auto">
              <Crown className="w-10 h-10 text-gold-400 mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
                Join Thousands of<br />Kingdom Seekers
              </h2>
              <p className="text-zinc-400 mb-3">
                Start every morning grounded in the Word of God.
              </p>
              <p className="text-gold-400/70 text-sm mb-10">Free forever. No spam. Unsubscribe anytime.</p>

              <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-gold-400/60 transition-all"
                />
                <button type="submit" className="btn-primary whitespace-nowrap px-6 py-3">
                  Subscribe Free
                </button>
              </form>

              <p className="text-zinc-600 text-xs">
                Already subscribed?{" "}
                <Link href="/daily-verse" className="text-gold-500 hover:text-gold-400 transition-colors">
                  Read today&apos;s verse →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
