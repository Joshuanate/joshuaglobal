import type { Metadata } from "next";
import Link from "next/link";
import {
  Crown,
  BookOpen,
  ChevronRight,
  ArrowRight,
  Star,
  Shield,
  Globe,
  Flame,
  Heart,
  Users,
} from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "The Kingdom of God — What Jesus Actually Preached",
  description:
    "Jesus mentioned the Kingdom of God over 100 times. It was His first message, His last message, and the core of every parable. This is the message the church must recover.",
  url: "/kingdom",
  tags: ["Kingdom of God", "Jesus", "Dr Myles Munroe", "Kingdom message", "biblical truth"],
});

const kingdomScriptures = [
  {
    reference: "Mark 1:14–15",
    text: "The time has come. The Kingdom of God has come near. Repent and believe the good news!",
    note: "Jesus' very first recorded sermon",
  },
  {
    reference: "Matthew 6:33",
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    note: "The primary directive for every believer",
  },
  {
    reference: "Luke 4:43",
    text: "I must proclaim the good news of the Kingdom of God to the other towns also, because that is why I was sent.",
    note: "Jesus defines His own mission",
  },
  {
    reference: "Matthew 24:14",
    text: "And this gospel of the Kingdom will be preached in the whole world as a testimony to all nations, and then the end will come.",
    note: "The sign of the end: Kingdom preached globally",
  },
  {
    reference: "Acts 28:31",
    text: "He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!",
    note: "Paul's final recorded ministry — preaching Kingdom",
  },
  {
    reference: "Romans 14:17",
    text: "For the Kingdom of God is not a matter of eating and drinking, but of righteousness, peace and joy in the Holy Spirit.",
    note: "Paul defines the nature of the Kingdom",
  },
];

const kingdomPrinciples = [
  {
    icon: Crown,
    title: "God Is King — Not Just Lord",
    body: "The Kingdom of God is not a metaphor. It is a literal government with a King, citizens, laws, territory, and an economy. Jesus came to declare that the rightful King has returned — and His government is now available to you.",
  },
  {
    icon: Globe,
    title: "The Kingdom Is Here Now",
    body: "Jesus said 'the Kingdom of God is near' — not far away in the future. He said 'the Kingdom of God is within you' (Luke 17:21). The Kingdom is not something you go to when you die. It is a reality you live in right now.",
  },
  {
    icon: Shield,
    title: "Citizens, Not Just Believers",
    body: "Paul says 'our citizenship is in heaven' (Phil 3:20). A citizen has rights, responsibilities, and identity. Christianity is not simply a belief system — it is citizenship in the most powerful government in the universe.",
  },
  {
    icon: Flame,
    title: "Kingdom Authority Over All",
    body: "Jesus said 'All authority in heaven and on earth has been given to me' (Matt 28:18). That authority is delegated to Kingdom citizens. You have been given dominion. The question is: are you exercising it?",
  },
  {
    icon: Heart,
    title: "The King's Heart Is Righteousness",
    body: "The Kingdom of God is 'righteousness, peace, and joy in the Holy Spirit' (Rom 14:17). The King is not looking for perfect religious performance — He is looking for a transformed heart, aligned with His nature.",
  },
  {
    icon: Users,
    title: "The Church Serves the Kingdom",
    body: "The church is not the Kingdom — it is the embassy of the Kingdom. Its job is to represent the King and His government to the world. When the church forgets the Kingdom, it loses its purpose and authority.",
  },
];

const keyTeachings = [
  {
    slug: "kingdom-of-god-jesus-primary-message",
    title: "The Kingdom of God: Jesus' #1 Message — And Why the Church Stopped Preaching It",
    excerpt: "Jesus mentioned the Kingdom of God over 100 times in the Gospels. It was the first thing He preached and the last. So why is it almost absent from modern pulpits?",
    category: "Kingdom of God",
    readingTime: 12,
  },
  {
    slug: "what-is-kingdom-of-god-explained",
    title: "What Is the Kingdom of God? The Complete Biblical Answer",
    excerpt: "The Kingdom of God is not a place you go to when you die. It is not just the church. Understanding what it actually is will change how you read every word Jesus ever spoke.",
    category: "Kingdom of God",
    readingTime: 15,
  },
  {
    slug: "myles-munroe-kingdom-legacy",
    title: "Dr. Myles Munroe and the Kingdom Message He Gave His Life For",
    excerpt: "For 40 years, Dr. Munroe preached one message above all others: the Kingdom of God. He said it was the most important subject Jesus ever addressed. He was right.",
    category: "Kingdom of God",
    readingTime: 10,
  },
  {
    slug: "apostle-paul-kingdom-message",
    title: "Paul the Apostle: His Gospel Was Kingdom, Not Just Salvation",
    excerpt: "Most people reduce Paul to salvation theology. But read Acts 28:31 — Paul spent his final days preaching 'the Kingdom of God and teaching about the Lord Jesus Christ.'",
    category: "Apostle Paul",
    readingTime: 10,
  },
];

export default function KingdomPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,153,26,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Crown className="w-3.5 h-3.5" />
            The Core Message of Jesus Christ
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            The Kingdom
            <br />
            <span className="text-gold-400">of God</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4">
            Jesus mentioned the Kingdom of God over <strong className="text-white">100 times</strong> in the Gospels.
            It was His first message. It was His last message.
            It is the heartbeat of everything He said and did.
          </p>

          <p className="text-base text-zinc-400 max-w-xl mx-auto mb-10">
            This is that message — unfiltered, uncompromised, and yours to walk in.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/teachings?cat=kingdom" className="btn-primary text-base gap-2">
              <BookOpen className="w-4 h-4" /> Explore Kingdom Teachings
            </Link>
            <Link href="/questions/what-is-kingdom-of-god" className="btn-secondary text-base gap-2">
              What Is the Kingdom? <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero stat strip */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <p className="text-3xl font-bold text-gold-400 font-serif">100+</p>
              <p className="text-xs text-zinc-400 mt-1">Kingdom mentions<br />in the Gospels</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gold-400 font-serif">#1</p>
              <p className="text-xs text-zinc-400 mt-1">Topic Jesus<br />preached</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gold-400 font-serif">First &amp; Last</p>
              <p className="text-xs text-zinc-400 mt-1">His message from<br />start to finish</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Declaration ────────────────────────────────────────── */}
      <section className="bg-gold-500 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-zinc-900 font-serif text-xl sm:text-2xl font-bold italic">
            &ldquo;The time has come. The Kingdom of God has come near. Repent and believe the good news!&rdquo;
          </p>
          <p className="text-zinc-700 text-sm font-semibold mt-2">— Jesus Christ, Mark 1:15</p>
        </div>
      </section>

      {/* ── What Is the Kingdom ────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">What Is the Kingdom of God?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Most Christians have heard the phrase but never been taught what it means. This is the most important question you can ask.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-serif text-xl font-bold mb-4 text-gold-500">What it is NOT</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Not the church building or denomination",
                  "Not something that happens only after you die",
                  "Not a vague spiritual feeling",
                  "Not a replacement word for \"heaven\"",
                  "Not reserved for future generations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-destructive mt-0.5 font-bold">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30">
              <h3 className="font-serif text-xl font-bold mb-4 text-gold-500">What it IS</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "God's government, authority, and rule over all creation",
                  "A present reality — available to you right now",
                  "Your identity, citizenship, and inheritance",
                  "The transformation of society from the inside out",
                  "The original plan of God before religion began",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-foreground">
                    <span className="text-gold-500 mt-0.5 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Munroe quote */}
          <blockquote className="mt-10 p-8 rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 relative">
            <div className="absolute top-6 left-6 text-gold-500/20 font-serif text-8xl leading-none select-none">&ldquo;</div>
            <p className="relative font-serif text-xl sm:text-2xl text-zinc-100 italic leading-relaxed pl-4">
              The greatest tragedy in life is not death, but a life without purpose. And the purpose of man is to represent the Kingdom of God on earth — that is why Jesus came, and that is why He taught the Kingdom above everything else.
            </p>
            <footer className="mt-4 pl-4 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gold-500" />
              <div>
                <p className="text-gold-400 font-semibold text-sm">Dr. Myles Munroe</p>
                <p className="text-zinc-500 text-xs">Kingdom teacher · Bahamas Faith Ministries</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Key Kingdom Scriptures ─────────────────────────────── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">The Word of God</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-3">Kingdom Scriptures</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These are not obscure verses. They are the backbone of Jesus' entire ministry. Read them slowly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kingdomScriptures.map((s) => (
              <div key={s.reference} className="p-6 rounded-2xl bg-card border border-border flex flex-col gap-3 hover:border-gold-400/50 transition-colors">
                <p className="font-serif italic text-foreground leading-relaxed text-sm">
                  &ldquo;{s.text}&rdquo;
                </p>
                <div className="mt-auto pt-3 border-t border-border">
                  <p className="text-gold-500 font-semibold text-xs">{s.reference}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kingdom Principles ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">Kingdom Truth</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-3">6 Kingdom Principles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These are not opinions. These are the governing principles of the most powerful government in the universe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kingdomPrinciples.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-6 rounded-2xl bg-card border border-border hover:border-gold-400/40 transition-all hover:-translate-y-0.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center mb-4 group-hover:bg-gold-500/25 transition-colors">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <span className="text-xs text-gold-500/60 font-mono mb-1 block">0{i + 1}</span>
                  <h3 className="font-serif font-bold text-base mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Myles Munroe Legacy ────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-950 dark:bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">A Legacy We Continue</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 mb-4 text-white">
                Dr. Myles Munroe<br />
                <span className="text-gold-400">The Kingdom Champion</span>
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                For over 40 years, Dr. Myles Munroe preached one message above everything else: <strong className="text-white">the Kingdom of God</strong>. He wrote more than 40 books on Kingdom principles. He stood on stages worldwide and declared that the church had lost the most important subject Jesus ever addressed.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                He was right. And on November 9, 2014, he died on a plane — still traveling to preach the Kingdom. His life was a declaration. This platform continues that declaration.
              </p>
              <Link
                href="/teachings?cat=kingdom"
                className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm hover:text-gold-300 transition-colors"
              >
                Explore Kingdom Teachings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { quote: "The most important subject you can study is the Kingdom of God.", source: "Kingdom Principles, Chapter 1" },
                { quote: "Jesus never started a religion. He announced a government — and invited you to be a citizen.", source: "Rediscovering the Kingdom" },
                { quote: "Heaven is not your destination. Earth is your assignment. The Kingdom is your government.", source: "Kingdom Principles" },
              ].map((q) => (
                <div key={q.source} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900">
                  <p className="font-serif italic text-zinc-200 text-sm leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
                  <p className="text-zinc-500 text-xs mt-2">— Dr. Myles Munroe, <em>{q.source}</em></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Apostle Paul's Kingdom Gospel ─────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">The Apostle Paul</span>
            <h2 className="font-serif text-3xl font-bold mt-2 mb-3">Paul Never Stopped Preaching Kingdom</h2>
          </div>

          <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-8">
            <p className="font-serif text-xl sm:text-2xl italic text-foreground leading-relaxed mb-4">
              &ldquo;He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!&rdquo;
            </p>
            <p className="text-gold-500 font-semibold text-sm">Acts 28:31 — The very last words of the book of Acts</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-serif font-bold text-lg mb-3">Paul's First Visit to Any City</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every time Paul entered a new city — Antioch, Ephesus, Athens, Corinth, Rome — his first message was the Kingdom of God. He preached it to Jews from scripture (Acts 17:2–3) and to Gentiles from creation (Acts 17:24–31). Same King. Different approach. Same Kingdom.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-serif font-bold text-lg mb-3">Paul&apos;s Final Stand in Rome</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                In Rome, under house arrest, chained to a Roman soldier, Paul still gathered people daily to preach the Kingdom of God (Acts 28:23–31). He didn't preach church membership. He didn't preach a self-help gospel. He preached the Kingdom — boldly, without hindrance, until his last breath.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/teachings?cat=paul" className="btn-secondary gap-2">
              <BookOpen className="w-4 h-4" /> Paul's Kingdom Epistles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Kingdom Teachings List ─────────────────────────────── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">Deep Study</span>
              <h2 className="font-serif text-3xl font-bold mt-1">Kingdom Teachings</h2>
            </div>
            <Link
              href="/teachings?cat=kingdom"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gold-500 font-semibold hover:text-gold-400 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {keyTeachings.map((t) => (
              <Link
                key={t.slug}
                href={`/teachings/${t.slug}`}
                className="flex items-start gap-5 p-5 rounded-2xl bg-card border border-border hover:border-gold-400/50 transition-all hover:-translate-y-0.5 group block"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/25 transition-colors mt-0.5">
                  <BookOpen className="w-4 h-4 text-gold-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">
                      {t.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.readingTime} min read</span>
                  </div>
                  <h3 className="font-serif font-bold text-base leading-snug mb-1 group-hover:text-gold-500 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.excerpt}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 flex-shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link href="/teachings?cat=kingdom" className="btn-secondary text-sm gap-2">
              View All Kingdom Teachings <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Urgent Question ────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Crown className="w-12 h-12 text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            The Question Jesus Asked<br />
            <span className="text-gold-500">Is Still Being Asked</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-3">
            &ldquo;Who do you say I am?&rdquo; — Matthew 16:15
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Jesus is not just Savior. He is King. And the Kingdom He announced is not a church program — it is the most revolutionary government the world has ever known, available to every human being who will receive it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/teachings?cat=kingdom" className="btn-primary text-base gap-2">
              <Crown className="w-4 h-4" /> Start Your Kingdom Study
            </Link>
            <Link href="/lords-prayer" className="btn-secondary text-base gap-2">
              <Star className="w-4 h-4" /> Pray the Kingdom Prayer
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground italic font-serif">
            &ldquo;Mine is the Kingdom. Lord Jesus is my King.&rdquo;
          </p>
        </div>
      </section>

    </main>
  );
}
