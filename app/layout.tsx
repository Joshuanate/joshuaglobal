import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
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

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Joshua Global — Discover the Original Teachings of Jesus",
    template: "%s | Joshua Global",
  },
  description:
    "Explore scripture-based studies, biblical truth, daily verses, and AI-powered spiritual guidance. Discover what Jesus truly taught.",
  keywords: [
    "Bible study",
    "Christian teachings",
    "Jesus",
    "scripture",
    "biblical truth",
    "daily verse",
    "Christian platform",
    "faith",
    "gospel",
    "biblical education",
  ],
  authors: [{ name: "Joshua Global", url: APP_URL }],
  creator: "Joshua Global",
  publisher: "Joshua Global",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "Joshua Global",
    title: "Joshua Global — Discover the Original Teachings of Jesus",
    description:
      "Explore scripture-based studies, biblical truth, and AI-powered spiritual guidance.",
    images: [
      {
        url: `${APP_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Joshua Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Global — Discover the Original Teachings of Jesus",
    description:
      "Explore scripture-based studies, biblical truth, and AI-powered spiritual guidance.",
    images: [`${APP_URL}/og-default.jpg`],
    creator: "@joshuaglobal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: APP_URL,
  },
};

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
