import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, Crown, ArrowRight } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "The Story of Apostle Paul — From Persecutor to Preacher of the Kingdom",
  description:
    "Saul of Tarsus hunted Christians to their death. Then Jesus appeared to him on the road to Damascus and everything changed. This is the most dramatic conversion story in history.",
  url: "/apostle-paul",
  tags: ["Apostle Paul", "Saul of Tarsus", "Damascus Road", "Paul conversion", "Paul epistles", "Kingdom of God"],
});

const epistles = [
  { book: "Romans", theme: "Righteousness by faith alone — the theological foundation of the Kingdom", verse: "Rom 1:16–17" },
  { book: "1 Corinthians", theme: "The Church as the body of Christ — unity, gifts, and resurrection", verse: "1 Cor 15:3–4" },
  { book: "2 Corinthians", theme: "Strength through weakness — the power of God in broken vessels", verse: "2 Cor 12:9" },
  { book: "Galatians", theme: "Freedom from the law — grace, not performance", verse: "Gal 2:20" },
  { book: "Ephesians", theme: "Seated in heavenly places — your identity and authority in Christ", verse: "Eph 2:6" },
  { book: "Philippians", theme: "Citizenship in heaven — Kingdom identity over earthly suffering", verse: "Phil 3:20" },
  { book: "Colossians", theme: "Christ above all — the supremacy of King Jesus", verse: "Col 1:15–18" },
  { book: "1 & 2 Thessalonians", theme: "The return of the King — hope in the midst of persecution", verse: "1 Thess 4:16" },
  { book: "1 & 2 Timothy", theme: "Raise up faithful leaders — pass the Kingdom torch", verse: "2 Tim 2:2" },
  { book: "Titus", theme: "The grace of God trains us — Kingdom character in everyday life", verse: "Titus 2:11–12" },
  { book: "Philemon", theme: "Reconciliation — the Kingdom breaks every social barrier", verse: "Philemon 1:16" },
];

export default function ApostlePaulPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-zinc-950 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,153,26,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

        {/* Decorative road line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-[0.3em] mb-6">Acts 9 · The Greatest Conversion in History</p>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
            The Man Who Tried<br />
            <span className="text-gold-400">to Destroy Christianity</span><br />
            <span className="text-2xl sm:text-3xl text-zinc-400 font-normal">became its greatest champion.</span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            He dragged Christians from their homes. He watched Stephen die and approved of every stone.
            He breathed murder like air. His name was <strong className="text-white">Saul of Tarsus</strong>.
          </p>

          <p className="text-zinc-400 text-base max-w-xl mx-auto mb-12">
            Then one road changed everything.
          </p>

          <div className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold animate-bounce">
            <span>Scroll to read the story</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </section>

      {/* ── CHAPTER 1: WHO WAS SAUL ─────────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-950 text-white">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">I</div>
            <div className="h-px flex-1 bg-zinc-800" />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Before Damascus</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            The Most Dangerous<br />Man in Jerusalem
          </h2>

          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
            <p>
              His résumé was flawless. Born in Tarsus — a prestigious Roman city — he was a <strong className="text-white">Hebrew of Hebrews</strong>. Of the tribe of Benjamin. Circumcised on the eighth day, exactly as the law required. He had studied at the feet of <strong className="text-white">Gamaliel</strong>, the most respected rabbi of his generation. He had memorized the Torah. He knew the prophets. He could debate any scholar in Jerusalem and win.
            </p>

            <p>
              He was, by every human measure, the last person you&apos;d expect Jesus to choose.
            </p>

            <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-8">
              <p className="font-serif italic text-xl text-zinc-100">
                &ldquo;I am a Jew, born in Tarsus of Cilicia, but brought up in this city, educated at the feet of Gamaliel according to the strict manner of the law of our fathers, being zealous for God as all of you are this day.&rdquo;
              </p>
              <p className="text-gold-400 text-sm mt-3 font-semibold">— Paul, Acts 22:3</p>
            </blockquote>

            <p>
              But Saul&apos;s zeal had a dark edge. When a movement called <em>The Way</em> began spreading through Jerusalem — followers of a crucified carpenter from Galilee claiming He had risen from the dead — Saul did not debate them. He <strong className="text-white">hunted them</strong>.
            </p>

            <p>
              He went house to house. He dragged men and women from their families. He had them bound and thrown into prison. He cast his vote for their death. And when they took a young deacon named <strong className="text-white">Stephen</strong> outside the city gates and began throwing stones, Saul stood there calmly and held the coats of the executioners — giving his silent, satisfied approval.
            </p>

            <p>
              Stephen&apos;s last words, while the stones were breaking his body, were: <em>&ldquo;Lord, do not hold this sin against them.&rdquo;</em> He forgave the very man who approved his murder.
            </p>

            <p>
              Saul didn&apos;t flinch. He went home and planned his next raid.
            </p>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong className="text-white">Acts 8:3 —</strong> <em>&ldquo;But Saul began to destroy the church. Going from house to house, he dragged off both men and women and put them in prison.&rdquo;</em>
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 2: THE ROAD ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,153,26,0.15)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">II</div>
            <div className="h-px flex-1 bg-zinc-800" />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">The Damascus Road</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            The Light That<br />
            <span className="text-gold-400">Knocked Him Flat</span>
          </h2>

          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
            <p>
              With written authority from the high priest, Saul set out for <strong className="text-white">Damascus</strong> — a journey of about 135 miles north of Jerusalem. His mission: find the followers of Jesus hiding in the synagogues there, bind them in chains, and drag them back to Jerusalem to stand trial.
            </p>

            <p>
              He rode with confidence. He had done this before. He knew exactly what he was doing, and he believed with his whole heart that he was doing God a favor.
            </p>

            <p>
              He was almost at the city gates. Damascus was in sight. And then —
            </p>

            {/* The moment */}
            <div className="my-12 p-10 rounded-3xl bg-gradient-to-br from-gold-950/40 to-gold-900/20 border border-gold-500/40 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gold-400/60 animate-ping" />
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl text-white italic leading-relaxed mb-6">
                &ldquo;Suddenly a light from heaven flashed around him. He fell to the ground and heard a voice say to him,
                <span className="text-gold-300 font-bold"> &lsquo;Saul, Saul, why do you persecute me?&rsquo;</span>&rdquo;
              </blockquote>
              <p className="text-gold-400 text-sm font-semibold">Acts 9:3–4</p>
            </div>

            <p>
              The light wasn&apos;t lightning. The text says it was <em>brighter than the midday sun</em> (Acts 26:13). It was so intense that Saul — a healthy, strong man on horseback — was thrown to the ground, blinded instantly.
            </p>

            <p>
              His companions heard the sound but saw no one. Saul alone heard the voice clearly.
            </p>

            <p className="font-serif italic text-zinc-200 text-xl border-l-4 border-gold-500 pl-6">
              &ldquo;Who are you, Lord?&rdquo; Saul asked.
            </p>

            <p>
              And then came the answer that shattered his entire world:
            </p>

            <div className="my-8 p-8 rounded-2xl bg-zinc-950 border border-gold-500/30">
              <p className="font-serif text-2xl sm:text-3xl text-gold-300 font-bold italic text-center leading-relaxed">
                &ldquo;I am Jesus, whom you are persecuting.&rdquo;
              </p>
            </div>

            <p>
              Think about what that sentence meant. Every Christian Saul had imprisoned, beaten, driven from their homes, and killed — <strong className="text-white">Jesus was taking it personally</strong>. Not &ldquo;you are persecuting my followers.&rdquo; <em>&ldquo;You are persecuting ME.&rdquo;</em>
            </p>

            <p>
              The man he thought was a dead impostor — the man he had built his entire crusade against — was <strong className="text-white">alive</strong>. Glorified. Radiantly, blindingly, undeniably alive. Speaking directly to him from heaven.
            </p>

            <p>
              Everything Saul thought he knew collapsed in an instant.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 3: THREE DAYS ───────────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">III</div>
            <div className="h-px flex-1 bg-zinc-800" />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Three Days of Darkness</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            Blind, Alone,<br />
            <span className="text-gold-400">and Completely Undone</span>
          </h2>

          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
            <p>
              They led him by the hand into Damascus. The great persecutor — the feared hunter of Christians — was now <strong className="text-white">helpless as a child</strong>. He couldn&apos;t see. He couldn&apos;t eat. He couldn&apos;t drink. For three days, he sat in darkness.
            </p>

            <p>
              Three days. The same number of days Jesus was in the tomb. And in those three days, Saul was being buried. The old man — the Pharisee, the persecutor, the self-righteous destroyer — was dying. Something entirely new was about to be born.
            </p>

            <p>
              We don&apos;t know what Saul thought in those three days. But imagine it. Every face of every Christian he had dragged away. Stephen&apos;s face — forgiving him as the stones fell. Every prayer he had crushed. Every family he had torn apart. And now he knew: Jesus was alive. He had been fighting <em>God Himself</em>. He had thought he was doing God&apos;s will, and he had been doing the exact opposite.
            </p>

            <p>
              The Bible says he was <em>praying</em>. Not performing. Not reciting. <strong className="text-white">Actually talking to the God he had just met face to face.</strong>
            </p>

            {/* Ananias */}
            <div className="my-10 p-7 rounded-2xl border border-zinc-700 bg-zinc-950">
              <h3 className="font-serif text-2xl font-bold mb-4 text-white">The Man God Sent to Him</h3>
              <p className="text-zinc-300 leading-relaxed">
                Meanwhile, across Damascus, a disciple named <strong className="text-white">Ananias</strong> was hearing from God in a vision — and he pushed back. <em>&ldquo;Lord, I have heard many reports about this man and all the harm he has done to your holy people in Jerusalem.&rdquo;</em> He knew exactly who Saul was. He was terrified. Every Christian in Damascus was hiding because of this man.
              </p>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                But God said: <em className="text-gold-300">&ldquo;Go! This man is my chosen instrument to proclaim my name to the Gentiles and their kings and to the people of Israel.&rdquo;</em> (Acts 9:15)
              </p>
              <p className="mt-4 text-zinc-400 text-sm italic">
                Ananias walked into that house. He put his hands on the man who had come to Damascus to arrest him. He called him <strong className="text-white">&ldquo;Brother Saul.&rdquo;</strong> And he prayed for him.
              </p>
            </div>

            <p>
              <em>Something like scales fell from Saul&apos;s eyes.</em> He could see again. He got up, was baptized, and ate a meal. And the Bible says simply: <strong className="text-white">&ldquo;And immediately he began to preach in the synagogues that Jesus is the Son of God.&rdquo;</strong>
            </p>

            <p>
              The very people who had expected him to arrive with chains were astounded. <em>&ldquo;Isn&apos;t he the man who caused havoc in Jerusalem among those who call on this name?&rdquo;</em> Yes. That was exactly who he was. And now he was preaching the name he once tried to erase.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 4: THE TRANSFORMATION ──────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-900 to-background">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">IV</div>
            <div className="h-px flex-1 bg-border" />
            <p className="text-muted-foreground text-xs uppercase tracking-widest">The New Man</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            Saul Became Paul.<br />
            <span className="text-gold-500">A New Name for a New Man.</span>
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              He didn&apos;t ease into his new life gradually. He plunged in. After time in Arabia — where he received direct revelation from Christ (Galatians 1:12) — Paul returned to Damascus and immediately began preaching with such power and clarity that the Jewish leaders in the city plotted to <strong className="text-foreground">kill him</strong>. He had to be lowered in a basket through a hole in the city wall at night to escape.
            </p>

            <p>
              This became the pattern of Paul&apos;s entire life. <strong className="text-foreground">Preach. Be opposed. Escape. Go somewhere new. Preach again.</strong>
            </p>

            <p>
              He went to Jerusalem. The disciples there were terrified of him — they didn&apos;t believe his conversion was real. It was Barnabas who vouched for him, brought him in, and introduced him as a brother.
            </p>

            <p>
              Over the next three decades, Paul would travel over <strong className="text-foreground">10,000 miles</strong> on foot, by ship, and through mountain passes. He planted churches in Antioch, Iconium, Lystra, Derbe, Philippi, Thessalonica, Berea, Athens, Corinth, Ephesus, and eventually Rome — the capital of the known world.
            </p>
          </div>

          {/* Cost cards */}
          <div className="my-12">
            <h3 className="font-serif text-2xl font-bold mb-6 text-center">What It Cost Him</h3>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <blockquote className="font-serif italic text-lg text-foreground leading-relaxed mb-6">
                &ldquo;Five times I received from the Jews the forty lashes minus one. Three times I was beaten with rods, once I was pelted with stones, three times I was shipwrecked... I have been in danger from rivers, in danger from bandits, in danger from my fellow Jews, in danger from Gentiles; in danger in the city, in danger in the country, in danger at sea... I have labored and toiled and have often gone without sleep; I have known hunger and thirst and have often gone without food; I have been cold and naked.&rdquo;
              </blockquote>
              <p className="text-gold-500 font-semibold text-sm">— Paul, 2 Corinthians 11:24–27</p>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              He wasn&apos;t doing this for fame. He wasn&apos;t doing it for money. He was doing it because he had <em>seen Jesus</em>. He had met the risen King face to face on that road. And once you have seen the King, you cannot stay silent.
            </p>

            <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-6">
              <p className="font-serif italic text-xl text-foreground">
                &ldquo;I consider everything a loss because of the surpassing worth of knowing Christ Jesus my Lord, for whose sake I have lost all things. I consider them garbage, that I may gain Christ.&rdquo;
              </p>
              <p className="text-gold-500 text-sm mt-3 font-semibold">— Philippians 3:8</p>
            </blockquote>

            <p>
              The man who once held coats at executions now counted his own life as worth nothing compared to finishing the race God had set before him.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: HIS MESSAGE ──────────────────────────────── */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">V</div>
            <div className="h-px flex-1 bg-border" />
            <p className="text-muted-foreground text-xs uppercase tracking-widest">What He Preached</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            He Never Stopped<br />
            <span className="text-gold-500">Preaching the Kingdom</span>
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              People often reduce Paul to a theologian of personal salvation. They read Romans and think: <em>Paul preached grace, forgiveness, justification by faith.</em> And he did. But that was not his whole message. Like Jesus, <strong className="text-foreground">Paul preached the Kingdom of God</strong>.
            </p>

            <p>
              Every time Paul arrived in a new city — every single time — his first message was the Kingdom. In Ephesus, he spent three months in the synagogue <em>&ldquo;arguing persuasively about the Kingdom of God&rdquo;</em> (Acts 19:8). When he gathered the Ephesian elders for the last time, he summarized his entire ministry as <em>&ldquo;preaching the Kingdom&rdquo;</em> (Acts 20:25).
            </p>

            <p>
              And when he arrived in Rome — chained to a Roman soldier, under house arrest, awaiting trial before Caesar — he still gathered people daily. And what did he preach? The book of Acts ends with this sentence:
            </p>

            <div className="my-8 p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-center">
              <p className="font-serif text-2xl sm:text-3xl italic text-foreground font-bold leading-relaxed mb-4">
                &ldquo;He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!&rdquo;
              </p>
              <p className="text-gold-500 font-semibold text-sm">Acts 28:31 — The final words of the book of Acts</p>
            </div>

            <p>
              That is how the story ends. Not with Paul free. Not with Paul victorious in court. Not with a revival sweeping Rome. With Paul, chained, preaching <em>the Kingdom of God</em>. <strong className="text-foreground">Without hindrance.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── EPISTLES ────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">His Letters Live On</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-3">Paul&apos;s 13 Letters</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Written from prison cells, from house arrest, from the road — they became the theological backbone of the New Testament. Each one is a Kingdom declaration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {epistles.map((e) => (
              <div key={e.book} className="p-5 rounded-xl bg-card border border-border hover:border-gold-400/50 transition-colors group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-base group-hover:text-gold-500 transition-colors">{e.book}</h3>
                  <span className="text-xs text-gold-500 font-mono flex-shrink-0">{e.verse}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{e.theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 6: HIS DEATH ────────────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-950 text-white">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">VI</div>
            <div className="h-px flex-1 bg-zinc-800" />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">The Final Chapter</p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            He Finished<br />
            <span className="text-gold-400">the Race</span>
          </h2>

          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
            <p>
              Around 64–68 AD, the Emperor Nero launched a brutal persecution of Christians in Rome, blaming them for the great fire that had destroyed much of the city. Paul was arrested — not for the first time — and brought to trial.
            </p>

            <p>
              This time, there was no escape. He was condemned. As a Roman citizen, he was shown the mercy of execution by sword rather than the cross. On a road outside Rome, in a place called <em>Tre Fontane</em>, the greatest preacher of the Kingdom of God was beheaded.
            </p>

            <p>
              He had written his own epitaph years earlier, from that same Roman prison, in a letter to his young apprentice Timothy — and the words read like a man who knew exactly what was coming:
            </p>

            <div className="my-10 p-10 rounded-2xl bg-gradient-to-br from-gold-950/40 to-zinc-900 border border-gold-500/30">
              <blockquote className="font-serif text-xl sm:text-2xl italic text-white leading-relaxed mb-6">
                &ldquo;For I am already being poured out like a drink offering, and the time for my departure is near.
                <strong className="text-gold-300"> I have fought the good fight, I have finished the race, I have kept the faith.</strong>
                Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day — and not only to me, but also to all who have longed for his appearing.&rdquo;
              </blockquote>
              <p className="text-gold-400 font-semibold text-sm">2 Timothy 4:6–8 — Paul&apos;s final letter, written days before his execution</p>
            </div>

            <p>
              He went to that sword the same way he had lived: <em>without hindrance</em>.
            </p>

            <p>
              The man who once held the coats of Stephen&apos;s killers was now joining Stephen in the presence of the King he had spent his life preaching. The persecutor had become the martyr. The destroyer had become the builder. Saul the murderer had become Paul the Apostle.
            </p>

            <p>
              And the letters he left behind changed the world.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS MEANS FOR YOU ─────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              If He Could Choose Paul,<br />
              <span className="text-gold-500">He Can Choose Anyone</span>
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Paul&apos;s story is not just history. It is a statement about the nature of grace. God did not choose Paul because he was qualified. He chose Paul because he was available — even in his rebellion. Even in his murderous rage. Even when he was the last person on earth who would have chosen himself.
            </p>

            <p>
              Paul later wrote: <em>&ldquo;Here is a trustworthy saying that deserves full acceptance: Christ Jesus came into the world to save sinners — of whom I am the worst.&rdquo;</em> (1 Timothy 1:15). He never got over what he had been. He never stopped being amazed that Jesus had chosen him.
            </p>

            <p>
              And in that amazement, he ran harder than anyone. He built more. He wrote more. He suffered more. He preached to kings and slaves, to philosophers in Athens and jailers in Philippi. He became all things to all people, so that by all possible means he might save some.
            </p>

            <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-8">
              <p className="font-serif italic text-xl text-foreground leading-relaxed">
                &ldquo;I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me.&rdquo;
              </p>
              <p className="text-gold-500 text-sm mt-3 font-semibold">— Galatians 2:20 — The testimony of every true Kingdom citizen</p>
            </blockquote>

            <p>
              That is the invitation of Paul&apos;s story. Not just to admire him. But to follow the same King. To be seized by the same grace. To run the same race.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gold-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Study What Paul Preached
          </h2>
          <p className="text-zinc-700 text-lg mb-8 max-w-xl mx-auto">
            His letters are not just ancient theology — they are Kingdom dispatches from a man who saw Jesus face to face and lived to tell about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/teachings?cat=paul" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-all">
              <BookOpen className="w-4 h-4" /> Paul&apos;s Kingdom Teachings
            </Link>
            <Link href="/kingdom" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-zinc-900 text-zinc-900 font-semibold hover:bg-zinc-900/10 transition-all">
              <Crown className="w-4 h-4" /> The Kingdom of God
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
