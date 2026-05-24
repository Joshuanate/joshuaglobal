import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy — Joshua Global",
  description: "How Joshua Global handles your data and protects your privacy.",
  url: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-narrow py-20">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: January 2026
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">1. Who We Are</h2>
          <p>
            Joshua Global (<strong className="text-foreground">joshuaglobal.live</strong>) is a Kingdom of God ministry
            platform providing biblical teachings, daily devotionals, articles, and video content.
            We are committed to protecting your privacy and handling your data with respect.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
          <p>We collect only the information necessary to serve you:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1.5">
            <li><strong className="text-foreground">Email address</strong> — when you subscribe to our newsletter or contact us.</li>
            <li><strong className="text-foreground">Questions</strong> — content you voluntarily submit through the Ask a Question form.</li>
            <li><strong className="text-foreground">Usage data</strong> — anonymous analytics (page views, device type) to improve the site.</li>
          </ul>
          <p className="mt-3">We do not collect payment information directly. All giving is processed via secure third-party providers.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>To send you the Daily Kingdom Devotion newsletter (only if you subscribed).</li>
            <li>To answer questions you submit.</li>
            <li>To improve the site and understand which content serves you best.</li>
            <li>We do not sell, rent, or trade your information to third parties. Ever.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">4. Newsletter</h2>
          <p>
            If you join our email list, you can unsubscribe at any time using the link in every email.
            We use a third-party email provider to send newsletters. Your email address is stored
            securely and used only for Kingdom content.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">5. Cookies</h2>
          <p>
            We use minimal cookies — only what is necessary for the site to function (session cookies,
            theme preference). We do not use tracking cookies or third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">6. Third-Party Links</h2>
          <p>
            Our site links to YouTube, Instagram, TikTok, and other platforms. We are not responsible
            for the privacy practices of those services. Please review their privacy policies separately.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
          <p>
            You may request to access, correct, or delete any personal information we hold about you.
            Contact us at <strong className="text-foreground">contact@joshuaglobal.live</strong> and
            we will respond promptly.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-foreground mb-3">8. Changes</h2>
          <p>
            We may update this policy occasionally. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <div className="pt-6 border-t border-border/60">
          <p className="text-xs text-muted-foreground/60">
            Questions? Email us at contact@joshuaglobal.live
          </p>
        </div>
      </div>
    </div>
  );
}
