import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://joshuaglobal.live";
const APP_NAME = "Joshua Global";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
  publishedAt,
  updatedAt,
  tags,
  noIndex = false,
}: SEOProps): Metadata {
  const ogImage = image || `${APP_URL}/og-default.jpg`;
  const canonicalUrl = url ? `${APP_URL}${url}` : APP_URL;

  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      type,
      title: `${title} | ${APP_NAME}`,
      description,
      url: canonicalUrl,
      siteName: APP_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt.toISOString() }),
      ...(updatedAt && { modifiedTime: updatedAt.toISOString() }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${APP_NAME}`,
      description,
      images: [ogImage],
    },
    alternates: { canonical: canonicalUrl },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
  author = "Joshua Global",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${APP_URL}${url}`,
    image: image || `${APP_URL}/og-default.jpg`,
    author: {
      "@type": "Organization",
      name: author,
      url: APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      logo: { "@type": "ImageObject", url: `${APP_URL}/logo.png` },
    },
    ...(publishedAt && { datePublished: publishedAt.toISOString() }),
    ...(updatedAt && { dateModified: updatedAt.toISOString() }),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${APP_URL}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/joshuaglobal",
      "https://www.youtube.com/@joshuaglobal",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@joshuaglobal.live",
    },
  };
}
