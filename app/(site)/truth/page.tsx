import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight, BookOpen } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Biblical Truth Dictionary — Search Bible Terms & Concepts",
  description:
    "Search 870+ biblical terms with original Hebrew/Greek meanings, context, scriptures, and FAQs. The definitive reference for serious Bible students.",
  url: "/truth",
});

const categories = [
  "Core Doctrines", "Salvation & Grace", "Kingdom of God", "Prayer & Worship",
  "Character of God", "Holy Spirit", "Prophecy", "Ethics & Morality",
];

const entries = [
  {
    slug: "repentance", term: "Repentance", category: "Core Doctrines",
    preview: "From Greek metanoia — a complete transformation of mind, not mere remorse.",
    scriptures: 24,
  },
  {
    slug: "grace", term: "Grace", category: "Salvation & Grace",
    preview: "Unmerited divine favor; the enabling power behind salvation and sanctification.",
    scriptures: 36,
  },
  {
    slug: "kingdom-of-god", term: "Kingdom of God", category: "Kingdom of God",
    preview: "God's active reign breaking into present reality — not merely a future place.",
    scriptures: 48,
  },
  {
    slug: "salvation", term: "Salvation", category: "Salvation & Grace",
    preview: "Hebrew yeshua / Greek sōtēria — wholeness, deliverance, and shalom restored.",
    scriptures: 42,
  },
  {
    slug: "faith", term: "Faith", category: "Core Doctrines",
    preview: "Greek pistis — active trust and allegiance, not merely mental assent.",
    scriptures: 31,
  },
  {
    slug: "atonement", term: "Atonement", category: "Salvation & Grace",
    preview: "The mechanism by which sin's penalty is satisfied and relationship with God restored.",
    scriptures: 28,
  },
  {
    slug: "covenant", term: "Covenant", category: "Core Doctrines",
    preview: "A binding commitment; the framework through which God relates to humanity.",
    scriptures: 52,
  },
  {
    slug: "sanctification", term: "Sanctification", category: "Ethics & Morality",
    preview: "The ongoing process of being set apart and transformed into Christlikeness.",
    scriptures: 19,
  },
  {
    slug: "idolatry", term: "Idolatry", category: "Ethics & Morality",
    preview: "Placing anything or anyone above God in priority — ancient and modern forms.",
    scriptures: 38,
  },
  {
    slug: "righteousness", term: "Righteousness", category: "Core Doctrines",
    preview: "Right standing before God; both imputed (given) and imparted (lived).",
    scriptures: 44,
  },
  {
    slug: "shalom", term: "Shalom", category: "Character of God",
    preview: "Hebrew for peace — wholeness, completeness, nothing broken, nothing missing.",
    scriptures: 17,
  },
  {
    slug: "holy-spirit", term: "Holy Spirit", category: "Holy Spirit",
    preview: "The third person of the Trinity; the indwelling presence and power of God.",
    scriptures: 63,
  },
];

export default function TruthDictionaryPage() {
  return (
    <div className="container-editorial py-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="badge-gold mb-4">
          <BookOpen className="w-3 h-3 mr-1" />
          870+ Biblical Terms
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Truth Dictionary</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Understand what the Bible actually says — in its original language, cultural context,
          and full theological depth.
        </p>
      </header>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search any biblical term — grace, covenant, atonement, shalom..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button className="px-4 py-2 rounded-xl bg-gold-500 text-white text-sm font-medium">
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-gold-300 transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Entries grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/truth/${entry.slug}`}
            className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 card-hover transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                  {entry.term}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">{entry.category}</p>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
                {entry.scriptures} verses
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {entry.preview}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-gold-600 dark:text-gold-400">
              Explore full entry <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      {/* Alphabet index */}
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-xl font-bold mb-4 text-center">Browse A–Z</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Link
              key={letter}
              href={`/truth?letter=${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-gold-300 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors"
            >
              {letter}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
