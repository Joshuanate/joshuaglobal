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
  featuredVerseText: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
  featuredVerseRef: "Matthew 6:33",
  featuredVerseContext:
    "Jesus did not say seek first the church, seek first religion, or seek first blessings. He said seek first the Kingdom. This was His priority — and it must be ours.",
  heroHeadline: "The Kingdom of God Has Come",
  heroSubheading:
    "Jesus preached the Kingdom of God over 100 times. It was His first message, His last message, and His only message. This platform exists to declare that truth — unfiltered, uncompromised, for every nation.",
};
