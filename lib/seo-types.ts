export type GlobalSEO = {
  siteTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  twitterHandle: string;
  googleVerification: string;
  bingVerification: string;
  indexingEnabled: boolean;
};

export type PageSEO = {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex: boolean;
};

export type PagesSEO = Record<string, PageSEO>;

export const DEFAULT_GLOBAL_SEO: GlobalSEO = {
  siteTitle: "Joshua Global",
  titleTemplate: "%s | Joshua Global",
  defaultDescription:
    "Preaching the Kingdom of God to every nation. Daily verse, Kingdom teachings, biblical truth, and answers to every question about God.",
  defaultOgImage: "https://joshuaglobal.live/og-default.jpg",
  twitterHandle: "@joshuaglobal",
  googleVerification: "",
  bingVerification: "",
  indexingEnabled: true,
};

export const KEY_PAGES = [
  { slug: "/", label: "Homepage" },
  { slug: "/kingdom", label: "Kingdom of God" },
  { slug: "/apostle-paul", label: "Apostle Paul" },
  { slug: "/about", label: "About" },
  { slug: "/teachings", label: "Teachings" },
  { slug: "/blog", label: "Blog" },
  { slug: "/questions", label: "Questions" },
  { slug: "/daily-verse", label: "Daily Verse" },
  { slug: "/lords-prayer", label: "Lord's Prayer" },
  { slug: "/give", label: "Give" },
] as const;
