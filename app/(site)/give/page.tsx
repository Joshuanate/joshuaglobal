import type { Metadata } from "next";
import Link from "next/link";
import { Crown, Heart, Globe, BookOpen, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Give to the Kingdom — Support Joshua Global Ministry",
  description:
    "Support the Joshua Global ministry. Your giving helps preach the Kingdom of God to every nation — daily teachings, content creation, and reaching the lost worldwide.",
  url: "/give",
});

const impactItems = [
  {
    icon: Globe,
    title: "Reaching Every Nation",
    desc: "Your gift funds content creation — videos, articles, social media, and teachings that reach souls across every continent.",
  },
  {
    icon: BookOpen,
    title: "Kingdom Teachings",
    desc: "Producing deep, scripture-based Kingdom content that continues the legacy of Dr. Myles Munroe and Apostle Paul's message.",
  },
  {
    icon: Users,
    title: "Answering Questions",
    desc: "Helping millions of people who search for God every day find real, Kingdom-based answers — not religion, but truth.",
  },
  {
    icon: Zap,
    title: "Spreading Truth",
    desc: "Boldly exposing deception in the world and pointing people back to Jesus, the King of Kings — on every platform.",
  },
];

const givingTiers = [
  {
    label: "Seed",
    amount: "$10",
    desc: "A seed planted in Kingdom soil. Every seed matters to God.",
    verse: "Mark 4:26",
  },
  {
    label: "Supporter",
    amount: "$25",
    desc: "Help keep the daily verse, teachings, and answers free for everyone.",
    verse: "Luke 6:38",
    featured: true,
  },
  {
    label: "Partner",
    amount: "$50",
    desc: "Partner with this ministry as we take the Kingdom message to the nations.",
    verse: "Philippians 4:17",
  },
  {
    label: "Champion",
    amount: "$100+",
    desc: "Be a Kingdom champion — your investment reaches thousands of souls.",
    verse: "Malachi 3:10",
  },
];

const scriptures = [
  {
    text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    ref: "2 Corinthians 9:7",
  },
  {
    text: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven.",
    ref: "Malachi 3:10",
  },
  {
    text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",
    ref: "Luke 6:38",
  },
];

export default function GivePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-400/6 rounded-full blur-[140px]" />
        </div>
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-sm font-medium mb-8">
            <Crown className="w-3.5 h-3.5" />
            Kingdom Giving
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Give to the <span className="gold-gradient">Kingdom</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            This ministry exists for one purpose — to preach the Kingdom of God to every nation,
            answer every question about God with truth, and bring souls to Jesus Christ.
          </p>
          <p className="text-base text-gold-500 dark:text-gold-400 font-semibold">
            Your giving is not a transaction. It is a Kingdom investment.
          </p>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="py-12 bg-gradient-to-r from-gold-950/40 via-black/60 to-gold-950/40 border-b border-gold-800/30">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-xl md:text-2xl italic text-white/90 mb-3 leading-relaxed">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
            for God loves a cheerful giver.&rdquo;
          </blockquote>
          <cite className="text-gold-400 font-semibold not-italic text-sm">— 2 Corinthians 9:7</cite>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-20">
        <div className="container-editorial max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Choose Your Gift</h2>
            <p className="text-muted-foreground">
              Every amount is received with gratitude and used entirely for Kingdom work.
              Give what is in your heart — God sees it all.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {givingTiers.map((tier) => (
              <a
                key={tier.label}
                href="https://paypal.me/joshua2026795"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  tier.featured
                    ? "border-gold-400 dark:border-gold-600 bg-gradient-to-br from-gold-950/50 to-black relative"
                    : "border-border bg-card hover:border-gold-300 dark:hover:border-gold-700"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gold-500 text-black text-xs font-bold whitespace-nowrap">
                    Most Common
                  </span>
                )}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{tier.label}</p>
                  <p className={`font-serif text-3xl font-bold ${tier.featured ? "text-gold-400" : "text-foreground"}`}>
                    {tier.amount}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tier.desc}</p>
                <p className="text-xs text-gold-500 font-medium">{tier.verse}</p>
                <div className={`mt-1 py-2.5 rounded-xl text-sm font-semibold text-center transition-colors ${
                  tier.featured
                    ? "bg-gold-500 text-black group-hover:bg-gold-400"
                    : "bg-secondary text-foreground group-hover:bg-gold-500 group-hover:text-black"
                }`}>
                  Give {tier.amount} via PayPal
                </div>
              </a>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="relative overflow-hidden rounded-2xl border border-gold-400/30 bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black p-8 text-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/8 rounded-full blur-[80px]" />
            <div className="relative">
              <Heart className="w-7 h-7 text-gold-400 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Give Any Amount</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Don&apos;t worry about the amount. Give what God has placed in your heart.
                Whether it&apos;s $1 or $1,000 — every gift is a seed in Kingdom ground.
              </p>
              <a
                href="https://paypal.me/joshua2026795"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold transition-colors text-base"
              >
                <Heart className="w-5 h-5" />
                Give via PayPal — Any Amount
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-xs mt-4">
                Secure payment through PayPal. You will be redirected to PayPal&apos;s secure site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tithe Section */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container-editorial max-w-3xl mx-auto">
          <div className="flex gap-4 p-6 md:p-8 rounded-2xl border border-gold-300/30 dark:border-gold-700/30 bg-card">
            <div className="w-12 h-12 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">On Tithes & Offerings</h3>
              <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                The tithe — ten percent of your income — belongs to God. It is an act of trust,
                declaring that God is your source and provider, not your employer. Malachi 3:10
                is one of the only places in scripture where God says &ldquo;test me in this.&rdquo;
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                If you are led to bring your tithe or offering to this ministry, we receive it with
                gratitude, accountability, and the commitment that every dollar goes to advancing
                the Kingdom of God — not to building a name, but to reaching souls for the King.
              </p>
              <a
                href="https://paypal.me/joshua2026795"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-gold-600 dark:text-gold-400 hover:underline"
              >
                Send your tithe via PayPal <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20">
        <div className="container-editorial max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Where Your Gift Goes</h2>
            <p className="text-muted-foreground">
              100% of every gift supports Kingdom work — content, outreach, and preaching the truth worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {impactItems.map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
                <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Scriptures */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container-editorial max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-center mb-10">What God Says About Giving</h2>
          <div className="space-y-5">
            {scriptures.map((s) => (
              <div key={s.ref} className="p-6 rounded-2xl border border-border bg-card">
                <blockquote className="font-serif text-lg italic text-foreground leading-relaxed mb-3">
                  &ldquo;{s.text}&rdquo;
                </blockquote>
                <cite className="text-gold-600 dark:text-gold-400 font-semibold not-italic text-sm">
                  — {s.ref}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section className="py-16">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-gold-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-3">Our Commitment to You</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every gift received by Joshua Global is used entirely for the advancement of the Kingdom of God —
            creating content, reaching the lost, answering questions about God, and spreading the truth of
            Jesus Christ to every nation.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            We do not build empires. We do not chase celebrity. We preach the King and His Kingdom.
            Your trust means everything to us, and we honour it before God.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-border bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <Crown className="w-8 h-8 text-gold-400 mx-auto mb-5" />
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Be Part of the Kingdom Mission
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Together we preach the Kingdom of God to every nation, every tongue, every generation.
            Your seed matters. Your obedience matters. The King sees every gift.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://paypal.me/joshua2026795"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold transition-colors"
            >
              <Heart className="w-5 h-5" />
              Give Now via PayPal
            </a>
            <Link
              href="/kingdom"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-colors"
            >
              <Crown className="w-4 h-4" />
              Explore the Kingdom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
