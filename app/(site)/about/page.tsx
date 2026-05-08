import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Heart, Users, Globe, Search } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About Joshua Global — Our Mission & Vision",
  description:
    "Joshua Global is a scripture-based platform helping people discover the original teachings of Jesus through truth-focused study, daily devotions, and community.",
  url: "/about",
});

const values = [
  {
    icon: BookOpen,
    title: "Scripture First",
    desc: "Every teaching, answer, and definition begins with what the text actually says — not tradition, denominationalism, or assumption.",
  },
  {
    icon: Heart,
    title: "Truth in Love",
    desc: "We pursue hard truths, but never without the warmth and grace that characterized Jesus himself.",
  },
  {
    icon: Globe,
    title: "Globally Accessible",
    desc: "The Gospel is for all nations. Our platform is built to serve believers and seekers worldwide, in every context.",
  },
  {
    icon: Search,
    title: "Deep Search, Clear Truth",
    desc: "Our Truth Dictionary, scripture search, and study tools make ancient wisdom accessible without compromising its depth.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-editorial py-16 max-w-4xl mx-auto">
      {/* Hero */}
      <header className="text-center mb-16">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
          Helping People Discover the{" "}
          <span className="gold-gradient">Original Teachings</span> of Jesus
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Joshua Global is a scripture-based platform built for serious seekers — people who want to
          know what Jesus actually taught, not just what tradition says he taught.
        </p>
      </header>

      {/* Mission */}
      <section className="mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gold-50 via-parchment-50 to-gold-50/50 dark:from-gold-950/20 dark:via-background dark:to-gold-950/10 border border-gold-200 dark:border-gold-800/50">
        <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          We believe the Bible has been buried under centuries of religious tradition, cultural
          assumptions, and translation decisions that have diluted its original power. Our mission
          is simple: dig back to the source.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Through scripture-based study, original language insight, honest community dialogue, and
          daily devotion, we help people encounter the living Word in its authentic form
          — and live differently because of it.
        </p>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-bold mb-8">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center flex-shrink-0">
                <v.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mb-16 text-center">
        <Users className="w-10 h-10 text-gold-500 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold mb-4">A Global Community</h2>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Joshua Global connects students of scripture from Lagos to London, Atlanta to Seoul. We
          are a community of seekers who believe that truth — encountered genuinely — transforms
          everything.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready to Go Deeper?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/daily-verse" className="btn-primary">
            <BookOpen className="w-4 h-4" />
            Start Daily Study
          </Link>
          <Link href="/questions" className="btn-secondary">
            <Users className="w-4 h-4" />
            Ask a Question
          </Link>
        </div>
      </section>
    </div>
  );
}
