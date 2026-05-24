import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import { Youtube, Play, ArrowRight, Crown, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = generateSEO({
  title: "Video Teachings — Watch the Kingdom Being Preached",
  description: "Watch Kingdom of God teachings, Bible studies, and truth videos. Full teachings, shorts, and devotional content on YouTube and here.",
  url: "/videos",
});

const featuredVideo = {
  title: "What Is the Kingdom of God? — Complete Teaching",
  description: "The most important message Jesus ever preached — explained from first principles. No religion, no tradition. Just the Word.",
  duration: "38 min",
  category: "Kingdom of God",
};

const videos = [
  {
    title: "How to Actually Pray — The Lord's Prayer Explained",
    category: "Prayer",
    duration: "22 min",
    views: "8.2K views",
    href: "https://youtube.com/@joshuaglobal",
  },
  {
    title: "Apostle Paul: The Kingdom Gospel He Actually Preached",
    category: "Apostle Paul",
    duration: "44 min",
    views: "6.1K views",
    href: "https://youtube.com/@joshuaglobal",
  },
  {
    title: "You Are Not Just a Sinner — Kingdom Identity",
    category: "Identity in Christ",
    duration: "31 min",
    views: "5.4K views",
    href: "https://youtube.com/@joshuaglobal",
  },
  {
    title: "How to Read the Bible — Kingdom Framework",
    category: "Bible Study",
    duration: "27 min",
    views: "4.8K views",
    href: "https://youtube.com/@joshuaglobal",
  },
  {
    title: "The Holy Spirit: Who He Is and What He Does",
    category: "Holy Spirit",
    duration: "35 min",
    views: "4.2K views",
    href: "https://youtube.com/@joshuaglobal",
  },
  {
    title: "Exposing the Health & Wealth Gospel",
    category: "Truth & Deception",
    duration: "42 min",
    views: "7.3K views",
    href: "https://youtube.com/@joshuaglobal",
  },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 border-b border-border/60 bg-secondary/20">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="section-label text-gold-600 dark:text-gold-400">Video Teachings</span>
            </div>
            <h1 className="section-heading mb-4">
              Watch the Kingdom<br />Being Preached
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Full Kingdom teachings, Bible studies, devotionals, and truth drops — available on YouTube and here.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container-editorial">
          <p className="section-label mb-8">Featured Teaching</p>
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl">
            {/* Video thumbnail */}
            <a
              href={`https://youtube.com/@joshuaglobal`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-zinc-900 via-[#0d0b02] to-zinc-950 border border-border hover:border-gold-500/40 transition-all"
            >
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/8 rounded-full blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center shadow-xl shadow-gold-500/30 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-black ml-1 fill-black" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-medium">
                {featuredVideo.duration}
              </span>
              <span className="absolute top-3 left-3 bg-gold-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                {featuredVideo.category}
              </span>
            </a>

            {/* Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4 leading-snug">{featuredVideo.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featuredVideo.description}</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com/@joshuaglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Now
                </a>
                <a
                  href="https://youtube.com/@joshuaglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-red-500 font-semibold hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video grid */}
      <section className="py-10 pb-28">
        <div className="container-editorial">
          <div className="flex items-center justify-between mb-10">
            <p className="section-label">All Teachings</p>
            <a
              href="https://youtube.com/@joshuaglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors group"
            >
              <Youtube className="w-4 h-4" />
              View all on YouTube
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <a
                key={v.title}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card hover:border-gold-300/50 dark:hover:border-gold-700/40 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgb(212,153,26) 1px, transparent 0)`,
                      backgroundSize: "25px 25px",
                    }}
                  />
                  <div className="w-12 h-12 rounded-full bg-gold-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4.5 h-4.5 text-black ml-0.5 fill-black" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    {v.duration}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold mb-1.5">{v.category}</p>
                  <h3 className="font-serif font-bold text-sm leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors mb-2">
                    {v.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {v.duration} · {v.views}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="pb-28">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-950 to-[#0e0b02] border border-gold-400/20 p-10 md:p-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center mx-auto mb-6">
              <Youtube className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
              New Teachings Every Week
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Subscribe to Joshua Global on YouTube and never miss a Kingdom teaching.
            </p>
            <a
              href="https://youtube.com/@joshuaglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold transition-colors"
            >
              <Youtube className="w-4 h-4" />
              Subscribe on YouTube
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
