export interface SiteContent {
  announcement: string;
  announcementActive: boolean;
  featuredVerseText: string;
  featuredVerseRef: string;
  featuredVerseContext: string;
  heroHeadline: string;
  heroSubheading: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  announcement: "",
  announcementActive: false,
  featuredVerseText: "The truth will set you free.",
  featuredVerseRef: "John 8:32",
  featuredVerseContext:
    "Jesus spoke these words to those who believed in him, promising that true discipleship leads to liberating knowledge.",
  heroHeadline: "Discover the Original Teachings of Jesus",
  heroSubheading:
    "Scripture-based studies, truth-focused teachings, daily Bible verses, and AI-powered exploration — all in one spiritually deep, modern platform.",
};
