export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  coverImage?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  readingTime: number;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  noIndex: boolean;
  createdAt: string;
  updatedAt: string;
};

export const BLOG_CATEGORIES = [
  "Kingdom of God",
  "Apostle Paul",
  "Prayer & Intercession",
  "Grace & Salvation",
  "Holy Spirit",
  "Identity in Christ",
  "Truth & Deception",
  "Kingdom Lifestyle",
  "Bible Study",
] as const;
