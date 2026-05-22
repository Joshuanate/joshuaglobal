export type Teaching = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  excerpt: string;
  body: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
};

export const TEACHING_CATEGORIES = [
  "Kingdom of God",
  "Apostle Paul",
  "Identity in Christ",
  "Salvation & Grace",
  "Prayer & Intercession",
  "Holy Spirit",
  "Exposing Deception",
  "Dr. Myles Munroe",
  "End Times",
  "Daily Living",
  "Bible Study",
  "Truth",
];
