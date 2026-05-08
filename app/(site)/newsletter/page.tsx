import type { Metadata } from "next";
import { BookOpen, Mail, Check } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Daily Devotion Newsletter — Joshua Global",
  description:
    "Subscribe to receive daily Bible verses with deep context, weekly teachings, and scripture-based insights every morning.",
  url: "/newsletter",
});

const benefits = [
  "Daily verse with historical context & original meaning",
  "Weekly deep-dive teaching",
  "Exclusive biblical insights",
  "Prayer guide each morning",
  "100% free, cancel anytime",
];

export default function NewsletterPage() {
  return (
    <div className="container-editorial py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-4">Daily Truth in Your Inbox</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Start every morning grounded in scripture. Receive a daily verse with full context,
          original meaning, and a prayer — completely free.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-border bg-card mb-8">
        <ul className="space-y-3 mb-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <form action="/api/newsletter" method="POST" className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
            <BookOpen className="w-4 h-4" />
            Subscribe Free
          </button>
          <p className="text-center text-xs text-muted-foreground">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
