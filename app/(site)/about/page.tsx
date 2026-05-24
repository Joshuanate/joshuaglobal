"use client";

import Link from "next/link";
import {
  Crown,
  Globe,
  Flame,
  Shield,
  BookOpen,
  Eye,
  Heart,
  Sword,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    icon: Crown,
    title: "The Kingdom Is First",
    verse: "Matthew 6:33",
    desc: "Every teaching, every article, every verse begins with the Kingdom of God. This is what Jesus preached above everything. This is what we preach above everything. The church must recover this message.",
  },
  {
    icon: BookOpen,
    title: "Scripture Is Final Authority",
    verse: "2 Timothy 3:16",
    desc: "Not tradition. Not denomination. Not what a pastor said. Not what sounds comfortable. What the Word of God actually says — in its original context, original language, and original meaning — is truth.",
  },
  {
    icon: Flame,
    title: "No Compromise, No Apology",
    verse: "Romans 1:16",
    desc: "Paul said he was not ashamed of the gospel. Neither are we. We will not soften the message to grow a crowd. We will not trade truth for approval. The Kingdom of God is not a negotiation.",
  },
  {
    icon: Globe,
    title: "Every Nation, Every Person",
    verse: "Matthew 24:14",
    desc: "Jesus said this gospel of the Kingdom will be preached in the whole world as a testimony to all nations — and THEN the end will come. We are part of fulfilling that prophecy. YouTube. Instagram. TikTok. Every platform. Every nation.",
  },
  {
    icon: Eye,
    title: "Expose What Is False",
    verse: "Ephesians 5:11",
    desc: "The world is full of lies — religious lies, cultural lies, political lies, spiritual deception. Part of our assignment is to expose falsehood clearly and boldly so that people can see what is true.",
  },
  {
    icon: Heart,
    title: "Truth Delivered With Love",
    verse: "Ephesians 4:15",
    desc: "Bold does not mean harsh. Uncompromising does not mean cruel. We preach the truth the way Jesus preached it — with fire in our bones and love for every soul we speak to.",
  },
];

const assignment = [
  "Preach the Kingdom of God — Jesus' primary message — to every nation",
  "Continue the Kingdom legacy of Dr. Myles Munroe",
  "Teach the epistles of Apostle Paul as Kingdom declarations",
  "Answer the questions every searching soul is asking about God",
  "Expose deception and replace it with Kingdom truth",
  "Reach the nations through every digital platform available",
  "Declare daily that the King is alive and His Kingdom is here",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,153,26,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center mx-auto mb-8">
            <Crown className="w-8 h-8 text-zinc-900" />
          </div>
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Joshua Global Ministry
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
            This Is Not a Website.<br />
            <span className="text-gold-400">This Is an Assignment.</span>
          </h1>
          <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            God called one man to pick up the message Jesus preached 100 times —
            the message the church has nearly forgotten —
            and preach it to every nation on earth.
          </p>
          <p className="mt-4 text-zinc-400 font-serif italic text-lg">
            &ldquo;Mine is the Kingdom. Lord Jesus is my King.&rdquo;
          </p>
        </div>
      </section>

      {/* ── VISION ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">

            {/* Vision card */}
            <div className="p-10 rounded-3xl bg-gold-500 text-zinc-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-zinc-900/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-zinc-900" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-700">Vision</span>
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4 leading-snug">
                A world where every nation has heard the Kingdom of God — unfiltered.
              </h2>
              <p className="text-zinc-700 leading-relaxed">
                Jesus declared it: <em>&ldquo;This gospel of the Kingdom will be preached in the whole world as a testimony to all nations — and then the end will come.&rdquo;</em> (Matthew 24:14). That vision is not just a prophecy. It is our mandate.
              </p>
              <p className="mt-4 text-zinc-700 leading-relaxed">
                We see a generation that knows what the Kingdom of God actually is. A generation that knows their King, their citizenship, their authority, and their assignment on the earth. Not just saved — but Kingdom-minded, Kingdom-rooted, Kingdom-living.
              </p>
            </div>

            {/* Mission card */}
            <div className="p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-gold-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Mission</span>
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4 leading-snug text-white">
                To preach the Kingdom of God to every nation — with boldness, without hindrance.
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Acts 28:31. The last line of the book of Acts. Paul, in chains, in Rome, preaching the Kingdom of God with all boldness and without hindrance. That is our mission statement.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Through daily scripture, in-depth teachings, honest answers, and every digital platform available — we carry the Kingdom message to every corner of the earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ASSIGNMENT ──────────────────────────────────────── */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-10 h-10 text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">The Assignment</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              This is not a hobby ministry. This is a God-given mandate — specific, clear, and urgent.
            </p>
          </div>

          <div className="space-y-3">
            {assignment.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-gold-400/40 transition-colors">
                <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-center">
            <p className="font-serif text-xl italic text-foreground leading-relaxed mb-3">
              &ldquo;The time has come. The Kingdom of God has come near. Repent and believe the good news!&rdquo;
            </p>
            <p className="text-gold-500 font-semibold text-sm">— Jesus Christ, Mark 1:15 — His first sermon. Our first message.</p>
          </blockquote>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">What We Stand On</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These are not corporate talking points. These are convictions — forged in Scripture, sealed by calling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl bg-card border border-border hover:border-gold-400/40 transition-all hover:-translate-y-0.5 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center group-hover:bg-gold-500/25 transition-colors">
                      <Icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <span className="text-xs text-gold-500/60 font-mono">0{i + 1}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base mb-1 leading-snug group-hover:text-gold-500 transition-colors">{v.title}</h3>
                  <p className="text-xs text-gold-500 font-semibold mb-2">{v.verse}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEGACY ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Star className="w-10 h-10 text-gold-400 mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Standing on the Shoulders of Giants</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              This ministry walks in the footsteps of two men who gave their lives for the Kingdom message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Myles Munroe */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm">M</div>
                <div>
                  <p className="font-bold text-white">Dr. Myles Munroe</p>
                  <p className="text-zinc-500 text-xs">1954 – 2014 · Kingdom teacher</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                For 40 years, Dr. Munroe preached one message: the Kingdom of God. He wrote over 40 books. He stood on stages in 120 nations. He declared that the greatest tragedy in the church was abandoning the message Jesus preached most.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                On November 9, 2014, he died on a plane — still traveling to preach the Kingdom. He didn&apos;t finish. <strong className="text-white">We will.</strong>
              </p>
            </div>

            {/* Apostle Paul */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm">P</div>
                <div>
                  <p className="font-bold text-white">Apostle Paul</p>
                  <p className="text-zinc-500 text-xs">~5 AD – ~68 AD · Kingdom apostle</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Paul encountered Jesus on the road to Damascus and never recovered. He traveled 10,000 miles, was beaten five times, shipwrecked three times, imprisoned repeatedly — and never stopped preaching the Kingdom of God.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                &ldquo;He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!&rdquo; — Acts 28:31
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MAN ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">Behind This Ministry</span>
            <h2 className="font-serif text-3xl font-bold mt-2 mb-3">Joshua — The Messenger</h2>
          </div>

          <div className="p-10 rounded-3xl bg-card border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-zinc-900 font-serif font-bold text-xl">J</div>
              <div>
                <p className="font-serif font-bold text-xl">Joshua</p>
                <p className="text-muted-foreground text-sm">Founder · JoshuaGlobal Ministry</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Like the Joshua of the Old Testament — who was told to be <em>strong and very courageous</em> and given the assignment of leading a people into their inheritance — this ministry carries that same mandate in this generation.
              </p>
              <p>
                The name is not coincidence. The assignment is to lead people into their Kingdom inheritance. To preach what Jesus preached. To say what Paul said. To go where Myles Munroe was going when his plane went down.
              </p>
              <p className="text-foreground font-medium">
                The Kingdom of God has not changed. The King is still on the throne. The message has not expired. And the earth is still waiting to hear it — in full, without apology.
              </p>
            </div>

            <blockquote className="mt-8 pt-6 border-t border-border font-serif italic text-lg text-gold-500 text-center">
              &ldquo;Be strong and very courageous... the Lord your God will be with you wherever you go.&rdquo;
              <footer className="text-sm text-muted-foreground mt-2 font-sans not-italic">Joshua 1:7, 9</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <Sword className="w-10 h-10 text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            You Found This Ministry<br />
            <span className="text-gold-500">for a Reason</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            The Kingdom of God is not a denomination. It is not a church building. It is the government of the living God — available to every person who will receive their King. Start here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kingdom" className="btn-primary gap-2">
              <Crown className="w-4 h-4" /> Discover the Kingdom
            </Link>
            <Link href="/teachings" className="btn-secondary gap-2">
              <BookOpen className="w-4 h-4" /> Read the Teachings
            </Link>
            <Link href="/lords-prayer" className="btn-secondary gap-2">
              <Heart className="w-4 h-4" /> Pray With Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
