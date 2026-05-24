export type Video = {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId?: string;
  youtubeUrl?: string;
  category: string;
  duration?: string;
  thumbnailUrl?: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const VIDEO_CATEGORIES = [
  "Kingdom of God",
  "Apostle Paul",
  "Identity in Christ",
  "Salvation & Grace",
  "Prayer & Intercession",
  "Holy Spirit",
  "Exposing Deception",
  "Dr. Myles Munroe",
  "Bible Study",
  "Truth & Deception",
  "Daily Living",
  "Short Teaching",
];
