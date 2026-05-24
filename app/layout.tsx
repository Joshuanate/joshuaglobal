import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { getGlobalSEO } from "@/lib/seo-settings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://joshuaglobal.live";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getGlobalSEO();
  return {
    metadataBase: new URL(APP_URL),
    title: {
      default: seo.siteTitle,
      template: seo.titleTemplate,
    },
    description: seo.defaultDescription,
    keywords: [
      "Kingdom of God",
      "Bible study",
      "Christian teachings",
      "Jesus",
      "scripture",
      "biblical truth",
      "daily verse",
      "Apostle Paul",
      "Myles Munroe",
      "gospel",
    ],
    authors: [{ name: "Joshua Global", url: APP_URL }],
    creator: "Joshua Global",
    publisher: "Joshua Global",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: APP_URL,
      siteName: seo.siteTitle,
      title: seo.siteTitle,
      description: seo.defaultDescription,
      images: [
        {
          url: seo.defaultOgImage,
          width: 1200,
          height: 630,
          alt: seo.siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteTitle,
      description: seo.defaultDescription,
      images: [seo.defaultOgImage],
      creator: seo.twitterHandle,
    },
    robots: seo.indexingEnabled
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : { index: false, follow: false },
    verification: {
      google: seo.googleVerification || process.env.GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: APP_URL,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
