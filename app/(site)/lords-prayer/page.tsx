"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, BookOpen, ArrowRight, Heart } from "lucide-react";

const prayerLines = [
  {
    line: "Our Father in heaven,",
    meaning: "Jesus begins not with a request but with relationship. 'Our' — collective. 'Father' — intimacy. 'In heaven' — authority. You are praying to the King of the universe who is also your Father.",
    ref: "Matthew 6:9",
  },
  {
    line: "hallowed be your name.",
    meaning: "Before anything else — honor His name. 'Hallowed' means set apart, holy, revered above all else. The Kingdom begins when God's name is treated as supreme in your life.",
    ref: "Matthew 6:9",
  },
  {
    line: "Your kingdom come,",
    meaning: "This is the central cry of the prayer. We are asking Heaven's government to invade earth — in our lives, our families, our cities, our nations. Dr. Myles Munroe called this the most radical prayer a person can pray.",
    ref: "Matthew 6:10",
  },
  {
    line: "your will be done, on earth as it is in heaven.",
    meaning: "Not our will — His will. Not what religion says — what Heaven says. We are asking for earth to mirror Heaven: no sickness, no poverty, no bondage. As it is in Heaven, so let it be here.",
    ref: "Matthew 6:10",
  },
  {
    line: "Give us today our daily bread.",
    meaning: "God is our provider. Not our job, not our connections — God. This is a Kingdom citizen declaring dependence on the King for daily provision. It is also a corporate prayer — 'us', not 'me'.",
    ref: "Matthew 6:11",
  },
  {
    line: "And forgive us our debts,",
    meaning: "We come before the Father not with pride but with honesty. We owe a debt we cannot pay — but in Christ, that debt is cancelled. This is the heart of the Gospel: forgiveness through the King's grace.",
    ref: "Matthew 6:12",
  },
  {
    line: "as we also have forgiven our debtors.",
    meaning: "The condition. We receive the forgiveness we extend. This is Kingdom culture — a forgiven people who forgive. Unforgiveness is incompatible with Kingdom citizenship.",
    ref: "Matthew 6:12",
  },
  {
    line: "And lead us not into temptation,",
    meaning: "We are acknowledging that without God's guidance, we are vulnerable. We ask the Father to order our steps away from situations that would pull us from the Kingdom path.",
    ref: "Matthew 6:13",
  },
  {
    line: "but deliver us from the evil one.",
    meaning: "There is an adversary — the enemy of God and of humanity. This is not a spiritual cliché; it is a real request. Jesus taught us to boldly ask the Father for protection and deliverance every single day.",
    ref: "Matthew 6:13",
  },
  {
    line: "For yours is the kingdom and the power and the glory forever.",
    meaning: "The prayer ends where it began — with the King. Not our kingdom. Not our power. Not our glory. His. The Kingdom belongs to God, the power belongs to God, the glory belongs to God. Amen.",
    ref: "Matthew 6:13",
  },
];

export default function LordsPrayerPage() {
  const [amenPressed, setAmenPressed] = useState(false);
  const [amenCount, setAmenCount] = useState(4817);
  const [expandedLine, setExpandedLine] = useState<number | null>(null);

  function handleAmen() {
    if (!amenPressed) {
      setAmenPressed(true);
      setAmenCount((c) => c + 1);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-400/6 rounded-full blur-[120px]" />
        </div>
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-sm font-medium mb-8">
            <Crown className="w-3.5 h-3.5" />
            Taught by Jesus Himself
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            The <span className="gold-gradient">Lord&apos;s Prayer</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            When the disciples asked Jesus, &ldquo;Lord, teach us to pray,&rdquo; He gave them this.
            Not a formula to recite — a model for how Kingdom citizens approach their Father and King.
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-gold-500 font-semibold">Matthew 6:9–13</span> — tap each line to understand its Kingdom depth
          </p>
        </div>
      </section>

      {/* The Prayer — Full Text First */}
      <section className="py-16 bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-8">Matthew 6:9–13</p>
          <div className="space-y-3">
            {prayerLines.map((item) => (
              <p
                key={item.line}
                className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed italic"
              >
                {item.line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Line by Line Breakdown */}
      <section className="py-20">
        <div className="container-editorial max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Line by Line — Kingdom Meaning</h2>
            <p className="text-muted-foreground">
              Every sentence Jesus prayed carries the weight of the Kingdom. Tap each line to go deeper.
            </p>
          </div>

          <div className="space-y-3">
            {prayerLines.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expandedLine === i
                    ? "border-gold-400 dark:border-gold-600 bg-gradient-to-br from-gold-950/40 to-black"
                    : "border-border bg-card hover:border-gold-300 dark:hover:border-gold-700"
                }`}
              >
                <button
                  onClick={() => setExpandedLine(expandedLine === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-gold-100 dark:bg-gold-900/60 text-gold-700 dark:text-gold-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="font-serif text-lg font-medium italic text-foreground">
                      &ldquo;{item.line}&rdquo;
                    </p>
                  </div>
                  <span className={`text-gold-500 text-sm transition-transform flex-shrink-0 ${expandedLine === i ? "rotate-90" : ""}`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                {expandedLine === i && (
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-muted-foreground leading-relaxed mb-2">{item.meaning}</p>
                    <span className="text-xs text-gold-500 font-semibold">{item.ref}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pray It Together */}
      <section className="py-20 bg-secondary/30">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <Crown className="w-8 h-8 text-gold-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold mb-4">Pray It Now</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Don&apos;t just read it — pray it. Slowly. Line by line. As a Kingdom citizen speaking
            to your Father and King. When you&apos;ve finished, press Amen.
          </p>

          {/* Full Prayer to pray */}
          <div className="p-8 md:p-10 rounded-3xl border border-gold-200/30 dark:border-gold-800/30 bg-gradient-to-br from-[#0d0900] via-[#1a1100] to-black mb-10 text-left">
            <div className="space-y-3">
              {prayerLines.map((item) => (
                <p key={item.line} className="font-serif text-lg text-white/85 italic leading-relaxed">
                  {item.line}
                </p>
              ))}
            </div>
          </div>

          {/* Amen Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleAmen}
              disabled={amenPressed}
              className={`relative px-14 py-5 rounded-2xl font-serif text-2xl font-bold transition-all duration-500 ${
                amenPressed
                  ? "bg-gradient-to-br from-gold-400 to-gold-600 text-black shadow-2xl shadow-gold-500/50 scale-105 cursor-default"
                  : "bg-gradient-to-br from-gold-500 to-gold-700 text-black hover:from-gold-400 hover:to-gold-600 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-105 active:scale-95"
              }`}
            >
              {amenPressed ? "🙏 Amen — Hallelujah!" : "Amen"}
              {amenPressed && (
                <span className="absolute inset-0 rounded-2xl animate-ping bg-gold-400/20" />
              )}
            </button>

            {amenPressed && (
              <p className="text-gold-400 font-semibold animate-fade-in">
                Your prayer has been received by the Father. The Kingdom is yours.
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              <span className="text-gold-500 font-bold">{amenCount.toLocaleString()}</span> people have prayed this today
            </p>
          </div>
        </div>
      </section>

      {/* Kingdom Prayer Context */}
      <section className="py-16 border-t border-border">
        <div className="container-editorial max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <BookOpen className="w-5 h-5 text-gold-500 mb-3" />
              <h3 className="font-serif font-bold text-lg mb-2">Why This Prayer?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The disciples didn&apos;t ask Jesus <em>if</em> they should pray — they asked <em>how</em>.
                Jesus responded not with a ritual but with a Kingdom framework. Notice that &ldquo;Your kingdom come&rdquo;
                sits at the exact center of this prayer — because the Kingdom is the center of everything.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <Crown className="w-5 h-5 text-gold-500 mb-3" />
              <h3 className="font-serif font-bold text-lg mb-2">Prayer as Kingdom Declaration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dr. Myles Munroe taught that prayer is not begging God — it is a Kingdom citizen
                legislating Heaven&apos;s will on earth. When you pray &ldquo;Your kingdom come,&rdquo;
                you are not asking permission. You are enforcing Heaven&apos;s agenda on the earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border text-center">
        <div className="container-editorial max-w-xl mx-auto">
          <Heart className="w-8 h-8 text-gold-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-3">Go Deeper in Prayer</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Explore the Kingdom teachings, learn how to pray with power, and study the scriptures
            that transform your prayer life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/questions/how-to-pray" className="btn-primary text-sm px-6 py-3">
              <BookOpen className="w-4 h-4" />
              How to Pray — Full Guide
            </Link>
            <Link href="/kingdom" className="btn-secondary text-sm px-6 py-3">
              <Crown className="w-4 h-4" />
              Explore the Kingdom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
