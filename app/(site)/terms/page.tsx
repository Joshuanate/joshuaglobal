import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Terms of Use — Joshua Global",
  description: "Terms and conditions for using Joshua Global.",
  url: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-narrow py-20">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Terms of Use</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: January 2026
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">1. Acceptance</h2>
          <p>
            By accessing or using Joshua Global (<strong className="text-foreground">joshuaglobal.live</strong>),
            you agree to these Terms of Use. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">2. Purpose</h2>
          <p>
            Joshua Global exists to preach the Kingdom of God. All content — teachings, articles, videos,
            devotionals, and Q&amp;A — is provided for biblical education and spiritual growth.
            It is not a substitute for pastoral care, medical advice, or professional counseling.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">3. Content Use</h2>
          <p>All content on this site is the property of Joshua Global. You may:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1.5">
            <li>Read, share, and quote our content for personal, educational, or ministry purposes.</li>
            <li>Share links to our content freely.</li>
          </ul>
          <p className="mt-3">You may not:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1.5">
            <li>Reproduce entire articles or teachings for commercial use without permission.</li>
            <li>Misrepresent our content or present it out of context.</li>
            <li>Use our content to promote doctrines contrary to the Kingdom message we preach.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">4. User Submissions</h2>
          <p>
            When you submit a question or contact us, you grant Joshua Global the right to publish
            and respond to that question publicly on the site (anonymously if requested). We reserve
            the right to edit for length, clarity, or appropriateness.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">5. Giving</h2>
          <p>
            Donations to Joshua Global support the Kingdom mission and are voluntary. All giving is
            processed securely via third-party providers. We do not store payment card information.
            Donations are non-refundable unless there was a processing error.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">6. Disclaimers</h2>
          <p>
            All biblical teachings are offered in good faith. Joshua Global is not responsible for
            doctrinal disagreements — we encourage you to test all things against Scripture
            (1 Thessalonians 5:21). We are not liable for decisions made based on content on this site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">7. Changes</h2>
          <p>
            We reserve the right to update these terms. Continued use of the site after changes
            constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">8. Contact</h2>
          <p>
            For any questions about these terms, email{" "}
            <strong className="text-foreground">contact@joshuaglobal.live</strong>.
          </p>
        </section>

        <div className="pt-6 border-t border-border/60">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Joshua Global. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
