import type { Metadata } from "next";
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
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About Joshua Global — Kingdom Ministry for Every Nation",
  description:
    "Joshua Global exists to preach the Kingdom of God to every nation — the message Jesus preached 100+ times. Our vision, mission, values, and the assignment God gave us.",
  url: "/about",
});

const values = [
  {
    icon: Crown,
    title: "The Kingdom Is First",
    verse: "Matthew 6:33",
    desc: "Every teaching, every article, every verse begins with the Kingdom of God. This is what Jesus preached above everything. This is what we preach above everything.",
  },
  {
    icon: BookOpen,
    title: "Scripture Is Final Authority",
    verse: "2 Timothy 3:16",
    desc: "Not tradition. Not denomination. Not what a pastor said. What the Word of God actually says — in its original context, original language, and original meaning — is truth.",
  },
  {
    icon: Flame,
    title: "No Compromise, No Apology",
    verse: "Romans 1:16",
    desc: "Paul said he was not ashamed of the gospel. Neither are we. We will not soften the message to grow a crowd. We will not trade truth for approval.",
  },
  {
    icon: Globe,
    title: "Every Nation, Every Person",
    verse: "Matthew 24:14",
    desc: "This gospel of the Kingdom will be preached in the whole world as a testimony to all nations. YouTube. Instagram. TikTok. Every platform. Every nation.",
  },
  {
    icon: Eye,
    title: "Expose What Is False",
    verse: "Ephesians 5:11",
    desc: "Part of our assignment is to expose falsehood clearly and boldly so that people can see what is true. Religious deception is the greatest enemy of the Kingdom.",
  },
  {
    icon: Heart,
    title: "Truth Delivered With Love",
    verse: "Ephesians 4:15",
    desc: "Bold does not mean harsh. We preach the truth the way Jesus preached it — with fire in our bones and love for every soul we speak to.",
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
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="section-label text-gold-600 dark:text-gold-400">Joshua Global Ministry</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
              This Is Not a Website.<br />
              <span className="text-gold-400">This Is an Assignment.</span>
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
              God called one man to pick up the message Jesus preached 100 times —
              the message the church has nearly forgotten —
              and preach it to every nation on earth.
            </p>
            <p className="font-serif italic text-gold-400/80 text-base">
              &ldquo;Mine is the Kingdom. Lord Jesus is my King.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── DECLARATION STRIP ────────────────────────────────────── */}
      <div className="bg-gold-500 py-5 border-b border-gold-600">
        <div className="container-editorial">
          <p className="text-zinc-900 font-serif text-lg md:text-xl font-bold italic text-center">
            &ldquo;The time has come. The Kingdom of God has come near. Repent and believe the good news.&rdquo;
            <span className="font-sans not-italic font-semibold text-zinc-700 text-sm ml-3">— Mark 1:15</span>
          </p>
        </div>
      </div>

      {/* ── VISION & MISSION ─────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <p className="section-label mb-3">The Foundation</p>
            <h2 className="section-heading">Vision &amp; Mission</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="relative overflow-hidden p-10 rounded-3xl bg-gold-500 text-zinc-900">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/15 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-zinc-900" />
                  </div>
                  <span className="section-label text-zinc-700">Vision</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 leading-snug">
                  A world where every nation has heard the Kingdom of God — unfiltered.
                </h3>
                <p className="text-zinc-700 leading-relaxed text-sm mb-3">
                  Jesus declared it: <em>&ldquo;This gospel of the Kingdom will be preached in the whole world as a testimony to all nations — and then the end will come.&rdquo;</em> (Matthew 24:14)
                </p>
                <p className="text-zinc-700 leading-relaxed text-sm">
                  We see a generation that knows what the Kingdom of God actually is — Kingdom-minded, Kingdom-rooted, Kingdom-living.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative overflow-hidden p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="section-label text-zinc-500">Mission</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 leading-snug text-white">
                  To preach the Kingdom of God to every nation — with boldness, without hindrance.
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm mb-3">
                  Acts 28:31. The last line of the book of Acts. Paul, in chains, in Rome, preaching the Kingdom of God with all boldness and without hindrance.
                </p>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Through teachings, articles, daily verses, honest answers, and every digital platform — we carry that same message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ASSIGNMENT ───────────────────────────────────────── */}
      <section className="py-24 border-y border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center mx-auto mb-5">
                <Shield className="w-6 h-6 text-gold-500" />
              </div>
              <h2 className="section-heading mb-3">The Assignment</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                This is not a hobby ministry. This is a God-given mandate — specific, clear, and urgent.
              </p>
            </div>

            <div className="space-y-2.5">
              {assignment.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-gold-400/40 transition-colors group"
                >
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium leading-relaxed text-sm">{item}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-[#0e0b02] to-zinc-950 border border-gold-400/20 text-center">
              <p className="font-serif text-xl italic text-white leading-relaxed mb-3">
                &ldquo;The time has come. The Kingdom of God has come near. Repent and believe the good news!&rdquo;
              </p>
              <cite className="text-gold-400 font-semibold text-sm not-italic">
                — Jesus Christ, Mark 1:15 — His first sermon. Our first message.
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand On</p>
            <h2 className="section-heading">Our Values</h2>
            <p className="text-muted-foreground max-w-md mx-auto mt-4">
              These are not corporate talking points. These are convictions — forged in Scripture, sealed by calling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center group-hover:bg-gold-500/25 transition-colors">
                    <v.icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <span className="text-xs text-gold-400/40 font-mono font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-serif font-bold text-base mb-1 leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-gold-500 font-semibold mb-3">{v.verse}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGACY ───────────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-950">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <div className="w-10 h-10 rounded-2xl bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
              <Star className="w-5 h-5 text-gold-400" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Standing on the Shoulders<br />of Giants
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              This ministry walks in the footsteps of two men who gave their lives for the Kingdom message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Myles Munroe */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-serif font-bold text-lg flex-shrink-0">M</div>
                <div>
                  <p className="font-bold text-white text-sm">Dr. Myles Munroe</p>
                  <p className="text-zinc-500 text-xs">1954 – 2014 · Kingdom teacher</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                For 40 years, Dr. Munroe preached one message: the Kingdom of God. He wrote over 40 books. He stood on stages in 120 nations. He declared that the greatest tragedy in the church was abandoning the message Jesus preached most.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                On November 9, 2014, he died on a plane — still traveling to preach the Kingdom. He didn&apos;t finish.{" "}
                <strong className="text-white">We will.</strong>
              </p>
            </div>

            {/* Apostle Paul */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-serif font-bold text-lg flex-shrink-0">P</div>
                <div>
                  <p className="font-bold text-white text-sm">Apostle Paul</p>
                  <p className="text-zinc-500 text-xs">~5 AD – ~68 AD · Kingdom apostle</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Paul encountered Jesus on the road to Damascus and never recovered. He traveled 10,000 miles, was beaten five times, shipwrecked three times, imprisoned repeatedly — and never stopped preaching the Kingdom of God.
              </p>
              <blockquote className="text-zinc-400 text-sm leading-relaxed italic border-l-2 border-gold-500/40 pl-4">
                &ldquo;He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!&rdquo;
                <cite className="block not-italic text-gold-500 text-xs mt-1">— Acts 28:31</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MESSENGER ────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3">Behind This Ministry</p>
              <h2 className="section-heading">Joshua — The Messenger</h2>
            </div>

            <div className="p-10 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-serif font-bold text-xl flex-shrink-0">
                  J
                </div>
                <div>
                  <p className="font-serif font-bold text-xl">Joshua</p>
                  <p className="text-muted-foreground text-sm">Founder · JoshuaGlobal Ministry</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
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

              <blockquote className="mt-8 pt-8 border-t border-border font-serif italic text-lg text-gold-500 text-center">
                &ldquo;Be strong and very courageous... the Lord your God will be with you wherever you go.&rdquo;
                <footer className="text-sm text-muted-foreground mt-2 font-sans not-italic">— Joshua 1:7, 9</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center mx-auto mb-6">
              <Sword className="w-6 h-6 text-gold-500" />
            </div>
            <h2 className="section-heading mb-4">
              You Found This Ministry<br />
              <span className="text-gold-500">for a Reason</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              The Kingdom of God is not a denomination. It is the government of the living God — available to every person who will receive their King.
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
        </div>
      </section>

    </div>
  );
}
