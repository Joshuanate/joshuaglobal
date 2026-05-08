import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscribed — Joshua Global",
  description: "You're subscribed to the Joshua Global daily devotion newsletter.",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <div className="container-editorial py-24 max-w-lg mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
      <h1 className="font-serif text-3xl font-bold mb-4">You're subscribed!</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Your first daily verse with context arrives tomorrow morning.
        Thank you for joining the Joshua Global community.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary gap-2">
          <BookOpen className="w-4 h-4" />
          Explore the Platform
        </Link>
        <Link href="/daily-verse" className="btn-secondary gap-2">
          Today's Verse
        </Link>
      </div>
    </div>
  );
}
