import type { Metadata } from "next";
import { Search } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Search — Find Teachings, Verses & Biblical Truth",
  description: "Search across all teachings, daily verses, truth definitions, and questions on Joshua Global.",
  url: "/search",
  noIndex: true,
});

export default function SearchPage() {
  return (
    <div className="container-editorial py-16 max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Search Joshua Global</h1>
        <p className="text-muted-foreground">
          Find teachings, daily verses, truth definitions, and answered questions.
        </p>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          autoFocus
          placeholder="Search scripture, topics, teachings..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {["Repentance", "Grace", "Kingdom of God", "Prayer", "Holy Spirit", "Faith", "Salvation"].map((term) => (
          <button
            key={term}
            className="px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:border-gold-300 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
