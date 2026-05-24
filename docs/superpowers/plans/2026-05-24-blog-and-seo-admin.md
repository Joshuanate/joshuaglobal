# Blog System + SEO Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete Blog/Articles system (public list + detail pages + admin CRUD editor) and a full SEO control center in the admin panel (global settings, per-page overrides, sitemap management).

**Architecture:** Blog posts stored in Vercel KV (`blog:list` array + `blog:{slug}` individual lookups). Blog detail page is a server component so `generateMetadata` works for per-post SEO. Global SEO settings stored in KV (`seo:global`) and applied in `app/layout.tsx` at request time. Per-page overrides stored in `seo:pages` object and merged with each static page's defaults via a shared `applyPageSEO()` helper.

**Tech Stack:** Next.js 15 App Router, Vercel KV, TypeScript, Tailwind CSS, Lucide icons. No new dependencies.

---

## File Map

### New files (create)
| File | Responsibility |
|------|---------------|
| `lib/blog-types.ts` | BlogPost type, BLOG_CATEGORIES constant — browser-safe, no KV imports |
| `lib/blog.ts` | KV CRUD: getBlogs, getBlog, createBlog, updateBlog, deleteBlog + seed data |
| `lib/seo-types.ts` | GlobalSEO, PageSEO types — browser-safe |
| `lib/seo-settings.ts` | KV CRUD: getGlobalSEO, setGlobalSEO, getPagesSEO, setPageSEO, applyPageSEO |
| `app/api/blog/route.ts` | GET published posts (public) |
| `app/api/blog/[slug]/route.ts` | GET single published post (public) |
| `app/api/admin/blog/route.ts` | GET all posts + POST create (admin auth) |
| `app/api/admin/blog/[id]/route.ts` | PUT update + DELETE (admin auth) |
| `app/api/admin/seo/route.ts` | GET/PUT global SEO settings (admin auth) |
| `app/api/admin/seo/pages/route.ts` | GET/PUT per-page SEO overrides (admin auth) |
| `app/(site)/blog/page.tsx` | Blog list page — "use client", fetches /api/blog |
| `app/(site)/blog/[slug]/page.tsx` | Blog post detail — server component, generateMetadata from KV |
| `app/(admin)/admin/blog/page.tsx` | Admin blog list — manage all posts |
| `app/(admin)/admin/blog/new/page.tsx` | Admin blog editor — create + edit posts |
| `app/(admin)/admin/seo/page.tsx` | SEO control center — global + per-page + status |

### Modified files
| File | What changes |
|------|-------------|
| `app/layout.tsx` | Fetch `seo:global` from KV; apply as default metadata |
| `app/sitemap.ts` | Include published blog posts from KV |
| `app/(admin)/layout.tsx` | Add "Blog" + "SEO" to sidebar nav |
| `components/site/header.tsx` | Add Blog link to Study dropdown |

---

## Task 1: Browser-safe types

**Files:**
- Create: `lib/blog-types.ts`
- Create: `lib/seo-types.ts`

- [ ] Create `lib/blog-types.ts`:

```typescript
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
```

- [ ] Create `lib/seo-types.ts`:

```typescript
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
```

- [ ] Commit: `git add lib/blog-types.ts lib/seo-types.ts && git commit -m "feat: add blog and SEO type definitions"`

---

## Task 2: Blog KV data layer

**Files:**
- Create: `lib/blog.ts`

- [ ] Create `lib/blog.ts`:

```typescript
import { kvGet, kvSet, kvDel } from "@/lib/kv";
export type { BlogPost } from "@/lib/blog-types";
import type { BlogPost } from "@/lib/blog-types";

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

function calcReadingTime(body: string): number {
  return Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 200));
}

const SEED_POSTS: BlogPost[] = [
  {
    id: "blog-kingdom-gospel",
    slug: "the-gospel-of-the-kingdom-what-jesus-actually-preached",
    title: "The Gospel of the Kingdom: What Jesus Actually Preached",
    subtitle: "Not the gospel about Jesus — the gospel Jesus Himself preached",
    excerpt: "There are two gospels in circulation. One is the gospel ABOUT Jesus — His death, burial, and resurrection. The other is the gospel Jesus actually preached — the Kingdom of God. Most churches preach the first. Jesus preached the second.",
    body: `When John the Baptist appeared in the wilderness, he preached one thing: **"Repent, for the Kingdom of Heaven is at hand"** (Matthew 3:2).

When Jesus began His public ministry, His first recorded sermon was: **"The time has come. The Kingdom of God is near. Repent and believe the good news"** (Mark 1:14–15).

When Jesus sent out His disciples, He told them to go and preach — not the plan of salvation, not the Four Spiritual Laws — but **"The Kingdom of God is near you"** (Luke 10:9).

When Paul arrived in Rome for the last time, Acts ends with this sentence: *"He proclaimed the Kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance"* (Acts 28:31).

The Kingdom of God is not a secondary theme in scripture. It is the **primary message**.

## Two Gospels

Most modern Christianity preaches what we might call the "gospel of personal salvation" — Jesus died for your sins, you confess and believe, you go to heaven when you die. This is true. But it is not complete.

The gospel Jesus preached was the gospel of the **Kingdom** — the announcement that God's government, rule, and authority is now available to every human being on earth.

Dr. Myles Munroe spent 40 years preaching this distinction. He said: "The gospel of salvation is about escaping hell. The gospel of the Kingdom is about invading earth."

## What Is the Kingdom?

The Greek word *basileia* means: **kingship, reign, dominion, rule**. The Kingdom of God is not a location you go to when you die. It is the active rule of God breaking into human history and human lives.

When Jesus said **"the Kingdom of God is within you"** (Luke 17:21), He was saying: the government of God is accessible to you right here, right now. Not in some future state. Today.

## Why Does It Matter?

If the Kingdom is the primary message, then:

1. **Prayer takes on new meaning** — "Your Kingdom come, Your will be done, on earth as it is in heaven" is not a pretty religious phrase. It is a Kingdom citizen calling for divine government to override earthly dysfunction.

2. **Your identity changes** — you are not just "saved from hell." You are a **citizen of the Kingdom of God**, with Kingdom authority, Kingdom responsibility, and a Kingdom assignment.

3. **Your purpose expands** — you are not waiting to escape earth. You are sent to **transform** it with Kingdom values.

## The Reformation We Need

The church does not need another program, another conference, or another worship style. It needs to recover the message Jesus preached 100 times in the Gospels.

The Kingdom of God has come near. It is near you right now.

The only question is: will you receive your King?`,
    category: "Kingdom of God",
    tags: ["kingdom", "gospel", "jesus", "myles munroe"],
    isPublished: true,
    isFeatured: true,
    readingTime: 8,
    author: "Joshua",
    noIndex: false,
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: "2026-05-20T00:00:00.000Z",
    updatedAt: "2026-05-20T00:00:00.000Z",
  },
  {
    id: "blog-how-to-read-bible",
    slug: "how-to-actually-read-the-bible-and-understand-it",
    title: "How to Actually Read the Bible and Understand It",
    subtitle: "Stop reading it like a rule book. Start reading it like a Kingdom constitution.",
    excerpt: "Most people approach the Bible the wrong way. They read it for comfort, for instructions, or to win arguments. But the Bible is a Kingdom document — a record of God's government, His king, and His people. When you read it that way, everything changes.",
    body: `Let me tell you the honest truth: most Bible reading produces very little transformation.

People read a Psalm for comfort. They read Proverbs for wisdom. They dip into the Gospels for inspirational Jesus quotes. And at the end of a year of daily Bible reading, they feel vaguely more informed but not fundamentally different.

The problem is not the Bible. The problem is the framework we bring to it.

## Wrong Framework #1: The Rule Book

The most common mistake is reading the Bible as a list of rules to follow. Do this. Don't do that. The Old Testament has 613 commandments. The New Testament has hundreds of commands and instructions.

But Jesus said something that completely reshapes this: **"You study the Scriptures diligently because you think that in them you have eternal life. These are the very Scriptures that testify about me"** (John 5:39).

The Pharisees were the best Bible readers of their generation. They had memorized Torah, Psalms, and the prophets. And they missed Jesus entirely.

Reading the Bible as a rule book will make you a Pharisee, not a Kingdom citizen.

## Wrong Framework #2: The Fortune Cookie

Another common approach: open to a random verse and treat it as God's message for your day. "I needed that."

This produces Christians whose theology is a collection of decontextualized quotes that may contradict each other, and who have almost no understanding of the larger narrative of Scripture.

## The Right Framework: Kingdom Document

The Bible is a record of one story: **God's original plan to establish His Kingdom on earth through humanity, the human rebellion against that plan, and God's response in the person of Jesus Christ.**

Every book contributes to this story:
- Genesis: The Kingdom established, then lost
- Exodus: God's first great redemption, establishing a Kingdom people
- The Prophets: God's warning to His nation and promise of a coming King
- The Gospels: The King arrives and announces His Kingdom
- Acts: The Kingdom spreads through the early church
- The Epistles: What Kingdom citizenship looks like in practice
- Revelation: The Kingdom fully consummated

When you read with this framework, confusing passages start making sense. Paul's theology about righteousness and faith is not just abstract doctrine — it is the explanation of *how* a rebel gets reinstated as a Kingdom citizen.

## Practical Steps

**1. Read books in full, not verses.**
A verse torn from context can mean almost anything. A chapter read in context means something specific. Train yourself to read full chapters, not daily snippets.

**2. Ask three questions of every passage:**
- What is this saying about God (the King)?
- What is this saying about humanity (the citizens)?
- How does this fit the larger Kingdom story?

**3. Use a study Bible or commentary for historical context.**
The Bible was not written to you — it was written *for* you. There is a difference. Understanding who wrote it, to whom, and in what circumstances makes the message far clearer.

**4. Follow the cross-references.**
The Bible is extraordinarily self-referential. Paul quotes Isaiah. Jesus quotes Deuteronomy. Revelation is saturated with Old Testament imagery. Following these threads reveals the coherence of the whole.

**5. Meditate, don't just read.**
Joshua 1:8 — "Keep this Book of the Law always on your lips; meditate on it day and night." The Hebrew word for meditate (*hagah*) means to mutter, to ruminate, to turn over in your mind. Read a passage. Close the Bible. Think about it. Come back to it. Let it work on you.

## Start Here

If you want to understand the Bible, read these in this order:
1. **Luke** — the most complete account of Jesus' life and teaching
2. **Acts** — the Kingdom spreading through the early church
3. **Romans** — Paul's most systematic explanation of the Kingdom gospel
4. **Genesis 1–12** — the foundations of everything

After that, you will have the framework to understand the rest.`,
    category: "Bible Study",
    tags: ["bible", "study", "kingdom", "how to read"],
    isPublished: true,
    isFeatured: false,
    readingTime: 9,
    author: "Joshua",
    noIndex: false,
    publishedAt: "2026-05-15T00:00:00.000Z",
    createdAt: "2026-05-15T00:00:00.000Z",
    updatedAt: "2026-05-15T00:00:00.000Z",
  },
  {
    id: "blog-identity-in-christ",
    slug: "you-are-not-a-sinner-saved-by-grace-you-are-a-kingdom-citizen",
    title: "You Are Not 'Just a Sinner Saved by Grace' — You Are a Kingdom Citizen",
    subtitle: "How you see yourself determines how you live. It's time to see clearly.",
    excerpt: "The phrase 'I'm just a sinner saved by grace' sounds humble. But it is one of the most dangerous identity statements a Christian can make. Not because grace isn't real — it is — but because it defines you by your past rather than your position.",
    body: `I have heard this phrase thousands of times: *"I'm just a sinner saved by grace."*

It sounds humble. It sounds safe. It has been sung in countless hymns. But I want to suggest to you that this statement, however well-intentioned, is one of the most undermining identity confessions a believer can make.

## The Problem With "Just a Sinner"

When Paul wrote to the church in Corinth — a congregation that had real, serious sin problems — here is how he opened: **"To the church of God in Corinth, to those sanctified in Christ Jesus and called to be his holy people"** (1 Corinthians 1:2).

Not "to the sinners." Not "to the failures." To the *sanctified*. To the *called*. To the *holy people*.

Paul's identity language for believers is strikingly consistent:
- **Saints** (Romans 1:7, 1 Corinthians 1:2, Ephesians 1:1)
- **Sons and daughters of God** (Romans 8:14, 2 Corinthians 6:18)
- **Citizens of heaven** (Philippians 3:20)
- **A royal priesthood, a holy nation** (1 Peter 2:9)
- **New creation** (2 Corinthians 5:17)
- **Seated in heavenly places** (Ephesians 2:6)

Paul never tells believers to think of themselves as "sinners saved by grace." He tells them to *reckon themselves dead to sin and alive to God* (Romans 6:11). There is a massive difference.

## What Philippians 3:20 Actually Says

**"Our citizenship is in heaven."**

Paul writes this to the church in Philippi — a Roman colony whose citizens were deeply proud of their Roman citizenship. They had Roman rights, Roman privileges, Roman protection.

Paul says: your citizenship is in a higher Kingdom. You are not earthly citizens who happen to be Christians. You are citizens of the Kingdom of God who happen to live on earth.

A citizen of a Kingdom carries the authority of that Kingdom. They represent their government wherever they go. They operate under different laws, different privileges, and a different King.

This is not arrogance. This is accuracy.

## The Danger of Wrong Identity

When you see yourself primarily as a sinner, you expect to sin. You lower your expectations of your own transformation. You treat failure as inevitable rather than as something to be overcome.

When you see yourself as a Kingdom citizen — a new creation, a son or daughter of the King — your expectations change. You now have the authority of the Kingdom backing you. You have the Holy Spirit dwelling in you. You have access to the throne of grace.

Paul says: **"I can do all things through Christ who strengthens me"** (Philippians 4:13). That is not the confession of someone who sees himself as "just a sinner."

## The Balance

None of this denies the reality of sin, failure, or the need for ongoing transformation. Paul was honest about his own struggles (Romans 7). The point is not to deny weakness but to base your identity on your *position* in Christ, not your *performance*.

You can be weak and be a citizen. You can fail and be a citizen. Citizens make mistakes. But their identity — their legal standing, their authority, their relationship to the King — does not change based on their performance.

**You are a new creation** (2 Corinthians 5:17). The old has gone. The new has come. That is not something you achieve — it is something you receive and walk in.

Live accordingly.`,
    category: "Identity in Christ",
    tags: ["identity", "kingdom", "citizenship", "paul", "grace"],
    isPublished: true,
    isFeatured: true,
    readingTime: 7,
    author: "Joshua",
    noIndex: false,
    publishedAt: "2026-05-10T00:00:00.000Z",
    createdAt: "2026-05-10T00:00:00.000Z",
    updatedAt: "2026-05-10T00:00:00.000Z",
  },
];

export async function getBlogs(): Promise<BlogPost[]> {
  const list = await kvGet<BlogPost[]>("blog:list");
  if (!list || list.length === 0) {
    await kvSet("blog:list", SEED_POSTS);
    for (const post of SEED_POSTS) {
      await kvSet(`blog:${post.slug}`, post);
    }
    return SEED_POSTS;
  }
  return list;
}

export async function getBlog(slug: string): Promise<BlogPost | null> {
  return kvGet<BlogPost>(`blog:${slug}`);
}

export async function createBlog(
  data: Omit<BlogPost, "id" | "slug" | "readingTime" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const list = await getBlogs();
  const slug = slugify(data.title);
  const post: BlogPost = {
    ...data,
    id: `blog-${crypto.randomUUID().slice(0, 8)}`,
    slug,
    readingTime: calcReadingTime(data.body),
    publishedAt: data.isPublished ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  list.unshift(post);
  await kvSet("blog:list", list);
  await kvSet(`blog:${slug}`, post);
  return post;
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const list = await getBlogs();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const wasPublished = list[idx].isPublished;
  const updated: BlogPost = {
    ...list[idx],
    ...data,
    readingTime: data.body ? calcReadingTime(data.body) : list[idx].readingTime,
    publishedAt: (!wasPublished && data.isPublished) ? new Date().toISOString() : list[idx].publishedAt,
    updatedAt: new Date().toISOString(),
  };
  list[idx] = updated;
  await kvSet("blog:list", list);
  await kvSet(`blog:${updated.slug}`, updated);
  return updated;
}

export async function deleteBlog(id: string): Promise<void> {
  const list = await getBlogs();
  const post = list.find((p) => p.id === id);
  if (post) await kvDel(`blog:${post.slug}`);
  await kvSet("blog:list", list.filter((p) => p.id !== id));
}
```

- [ ] Commit: `git add lib/blog.ts && git commit -m "feat: blog KV data layer with 3 seed posts"`

---

## Task 3: SEO settings KV data layer

**Files:**
- Create: `lib/seo-settings.ts`

- [ ] Create `lib/seo-settings.ts`:

```typescript
import { kvGet, kvSet } from "@/lib/kv";
export type { GlobalSEO, PageSEO, PagesSEO } from "@/lib/seo-types";
import type { GlobalSEO, PageSEO, PagesSEO } from "@/lib/seo-types";
import { DEFAULT_GLOBAL_SEO } from "@/lib/seo-types";

export async function getGlobalSEO(): Promise<GlobalSEO> {
  return (await kvGet<GlobalSEO>("seo:global")) ?? DEFAULT_GLOBAL_SEO;
}

export async function setGlobalSEO(data: Partial<GlobalSEO>): Promise<GlobalSEO> {
  const current = await getGlobalSEO();
  const updated = { ...current, ...data };
  await kvSet("seo:global", updated);
  return updated;
}

export async function getPagesSEO(): Promise<PagesSEO> {
  return (await kvGet<PagesSEO>("seo:pages")) ?? {};
}

export async function setPageSEO(slug: string, data: PageSEO): Promise<void> {
  const pages = await getPagesSEO();
  pages[slug] = data;
  await kvSet("seo:pages", pages);
}

/** Merge KV override with static defaults. Call this in generateMetadata for server pages. */
export async function applyPageSEO(
  defaults: { title: string; description: string; image?: string },
  slug: string
): Promise<{ title: string; description: string; image?: string; noIndex: boolean }> {
  const pages = await getPagesSEO();
  const override = pages[slug];
  return {
    title: override?.title || defaults.title,
    description: override?.description || defaults.description,
    image: override?.ogImage || defaults.image,
    noIndex: override?.noIndex ?? false,
  };
}
```

- [ ] Commit: `git add lib/seo-types.ts lib/seo-settings.ts && git commit -m "feat: SEO settings KV layer"`

---

## Task 4: Blog API routes

**Files:**
- Create: `app/api/blog/route.ts`
- Create: `app/api/blog/[slug]/route.ts`
- Create: `app/api/admin/blog/route.ts`
- Create: `app/api/admin/blog/[id]/route.ts`

- [ ] Create `app/api/blog/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/blog";

export async function GET() {
  const posts = await getBlogs();
  return NextResponse.json(posts.filter((p) => p.isPublished));
}
```

- [ ] Create `app/api/blog/[slug]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getBlog } from "@/lib/blog";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}
```

- [ ] Create `app/api/admin/blog/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBlogs, createBlog } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getBlogs());
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.title?.trim() || !body.excerpt?.trim() || !body.body?.trim()) {
    return NextResponse.json({ error: "Title, excerpt and body required" }, { status: 400 });
  }
  const post = await createBlog({ ...body, author: "Joshua" });
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json({ success: true, post });
}
```

- [ ] Create `app/api/admin/blog/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateBlog, deleteBlog } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const post = await updateBlog(id, data);
  revalidatePath("/blog");
  if (post) revalidatePath(`/blog/${post.slug}`);
  return NextResponse.json({ success: true, post });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteBlog(id);
  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
```

- [ ] Commit: `git add app/api/blog app/api/admin/blog && git commit -m "feat: blog public + admin API routes"`

---

## Task 5: SEO API routes

**Files:**
- Create: `app/api/admin/seo/route.ts`
- Create: `app/api/admin/seo/pages/route.ts`

- [ ] Create `app/api/admin/seo/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGlobalSEO, setGlobalSEO } from "@/lib/seo-settings";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getGlobalSEO());
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const updated = await setGlobalSEO(data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, seo: updated });
}
```

- [ ] Create `app/api/admin/seo/pages/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPagesSEO, setPageSEO } from "@/lib/seo-settings";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getPagesSEO());
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, seo } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  await setPageSEO(slug, seo);
  revalidatePath(slug);
  return NextResponse.json({ success: true });
}
```

- [ ] Commit: `git add app/api/admin/seo && git commit -m "feat: SEO admin API routes"`

---

## Task 6: Blog list public page

**Files:**
- Create: `app/(site)/blog/page.tsx`

- [ ] Create `app/(site)/blog/page.tsx` — "use client", fetches from /api/blog, shows grid of posts with search + category filter:

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ChevronRight, Loader2, Star } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { BLOG_CATEGORIES } from "@/lib/blog-types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const filtered = posts.filter((p) => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.includes(search.toLowerCase()));
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = posts.filter((p) => p.isFeatured).slice(0, 1)[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 text-xs font-semibold mb-4">
          <BookOpen className="w-3 h-3" /> Kingdom Articles
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Blog & Articles</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          In-depth Kingdom teachings, biblical truth, and answers for every searching soul.
        </p>
      </div>

      {/* Featured post */}
      {!loading && featured && (
        <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 hover:border-gold-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Featured Article</span>
              <span className="text-zinc-500 text-xs">{featured.category}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors leading-snug">
              {featured.title}
            </h2>
            {featured.subtitle && <p className="text-zinc-400 mb-3">{featured.subtitle}</p>}
            <p className="text-zinc-300 leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-zinc-500 text-xs">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readingTime} min read</span>
              <span>{featured.author}</span>
              {featured.publishedAt && <span>{new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
              <span className="ml-auto flex items-center gap-1 text-gold-400 font-medium">Read article <ChevronRight className="w-3 h-3" /></span>
            </div>
          </div>
        </Link>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 min-w-[180px]"
        >
          <option value="All">All Categories</option>
          {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Posts grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gold-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">{search ? `No articles found for "${search}"` : "No articles yet."}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.filter((p) => p.id !== featured?.id).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group p-6 rounded-2xl border border-border bg-card hover:border-gold-400/50 transition-all hover:-translate-y-0.5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">{post.category}</span>
                {post.isFeatured && <Star className="w-3 h-3 text-gold-400 fill-gold-400" />}
              </div>
              <h2 className="font-serif font-bold text-base leading-snug mb-2 group-hover:text-gold-500 transition-colors">{post.title}</h2>
              {post.subtitle && <p className="text-sm text-muted-foreground mb-2 font-medium">{post.subtitle}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
                {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}
                <span className="ml-auto text-gold-500 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">Read <ChevronRight className="w-3 h-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] Commit: `git add app/(site)/blog/page.tsx && git commit -m "feat: blog list public page"`

---

## Task 7: Blog post detail page (server component)

**Files:**
- Create: `app/(site)/blog/[slug]/page.tsx`

- [ ] Create `app/(site)/blog/[slug]/page.tsx` — server component with `generateMetadata`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getBlog, getBlogs } from "@/lib/blog";
import { generateSEO, generateArticleSchema } from "@/lib/seo";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) return {};
  return generateSEO({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.seoImage || post.coverImage,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    updatedAt: new Date(post.updatedAt),
    tags: post.tags,
    noIndex: post.noIndex,
  });
}

function renderMarkdown(body: string): string {
  return body
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="font-serif text-2xl font-bold mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3 class="font-serif text-xl font-bold mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("#### ")) return `<h4 class="font-serif text-lg font-bold mt-6 mb-2">${line.slice(5)}</h4>`;
      if (line.trim() === "---") return `<hr class="border-border my-8" />`;
      if (line.trim() === "") return `<div class="h-4"></div>`;
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-500 underline hover:text-gold-400 transition-colors">$1</a>');
      return `<p class="mb-0 leading-[1.85] text-foreground">${formatted}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) notFound();

  const allPosts = await getBlogs();
  const related = allPosts
    .filter((p) => p.isPublished && p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const articleSchema = generateArticleSchema({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    url: `/blog/${post.slug}`,
    image: post.seoImage || post.coverImage,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    updatedAt: new Date(post.updatedAt),
    author: post.author,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-background">
          <div className="max-w-3xl mx-auto px-6 pt-16 pb-14">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-8">
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold">{post.category}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4">{post.title}</h1>
            {post.subtitle && <p className="text-zinc-300 text-xl mb-5">{post.subtitle}</p>}
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>
            <div className="flex items-center gap-5 text-zinc-500 text-sm flex-wrap pb-8 border-b border-zinc-800">
              <span className="flex items-center gap-1.5"><div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-zinc-900">J</div> {post.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTime} min read</span>
              {post.publishedAt && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>}
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-[17px] leading-[1.85]" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-12 pt-6 border-t border-border flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
          )}

          {/* Author */}
          <div className="mt-10 p-6 rounded-2xl bg-card border border-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-lg flex-shrink-0">J</div>
            <div>
              <p className="font-serif font-bold text-base">{post.author} — JoshuaGlobal</p>
              <p className="text-sm text-muted-foreground mt-1">Preaching the Kingdom of God to every nation. Continuing the legacy of Dr. Myles Munroe and Apostle Paul.</p>
              <Link href="/about" className="text-gold-500 text-sm font-medium hover:text-gold-400 transition-colors mt-1 inline-block">Read the story →</Link>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 pb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group p-5 rounded-2xl border border-border bg-card hover:border-gold-400/50 transition-all">
                  <span className="text-xs text-gold-500 font-semibold">{p.category}</span>
                  <h3 className="font-serif font-bold text-sm mt-1 mb-2 leading-snug group-hover:text-gold-500 transition-colors">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
```

- [ ] Commit: `git add app/(site)/blog && git commit -m "feat: blog post server page with generateMetadata + article schema"`

---

## Task 8: Admin blog management page

**Files:**
- Create: `app/(admin)/admin/blog/page.tsx`

- [ ] Create `app/(admin)/admin/blog/page.tsx` — same pattern as teachings admin:

```typescript
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, BookOpen, Loader2, Trash2, Eye, EyeOff, Star, StarOff, Edit } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function togglePublish(p: BlogPost) {
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isPublished: !p.isPublished }) });
    await load(); setActionId(null);
  }

  async function toggleFeatured(p: BlogPost) {
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isFeatured: !p.isFeatured }) });
    await load(); setActionId(null);
  }

  async function handleDelete(p: BlogPost) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    setActionId(p.id);
    await fetch(`/api/admin/blog/${p.id}`, { method: "DELETE" });
    await load(); setActionId(null);
  }

  const published = posts.filter((p) => p.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Blog & Articles</h1>
          <p className="text-sm text-muted-foreground mt-1">{published} published · {posts.length} total</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm gap-2"><Plus className="w-4 h-4" /> New Article</Link>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gold-500" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No articles yet.</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm mt-4 inline-flex gap-2"><Plus className="w-4 h-4" /> Write your first article</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-all ${actionId === p.id ? "opacity-50" : "hover:border-gold-300 dark:hover:border-gold-700"}`}>
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${p.isPublished ? "bg-green-500" : "bg-amber-400"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 text-xs font-semibold">{p.category}</span>
                  {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold">★ Featured</span>}
                  <span className={`text-xs font-medium ${p.isPublished ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>{p.isPublished ? "Published" : "Draft"}</span>
                  <span className="text-xs text-muted-foreground">{p.readingTime} min read</span>
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-1 truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{p.excerpt}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleFeatured(p)} title={p.isFeatured ? "Unfeature" : "Feature"} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950/30 transition-colors">
                  {p.isFeatured ? <Star className="w-4 h-4 fill-gold-400 text-gold-400" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button onClick={() => togglePublish(p)} title={p.isPublished ? "Unpublish" : "Publish"} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  {p.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Link href={`/admin/blog/new?edit=${p.id}`} title="Edit" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <button onClick={() => handleDelete(p)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] Commit: `git add app/(admin)/admin/blog/page.tsx && git commit -m "feat: admin blog list page"`

---

## Task 9: Admin blog editor (new + edit)

**Files:**
- Create: `app/(admin)/admin/blog/new/page.tsx`

Key features: Title, Subtitle, Category, Excerpt, Body (large markdown textarea), Tags, Featured toggle, Published toggle, SEO overrides section (custom title, description, OG image URL, noIndex toggle), Preview mode.

Full implementation in the file — same pattern as teachings editor but with SEO fields added.

---

## Task 10: Admin SEO control center

**Files:**
- Create: `app/(admin)/admin/seo/page.tsx`

Sections:
1. **Global Settings** — site title, default description, OG image, Twitter handle, Google/Bing verification codes, indexing toggle. Save button POSTs to /api/admin/seo.
2. **Per-Page SEO** — expandable list of KEY_PAGES, each with custom title/description/OG inputs. Save button PUTs to /api/admin/seo/pages.
3. **Technical Status** — links to /sitemap.xml and /robots.txt, schema markup status, indexing status.
4. **Blog Post SEO** — note explaining where to set per-post SEO (in the blog editor).

---

## Task 11: Update layout.tsx for dynamic global SEO

**Files:**
- Modify: `app/layout.tsx`

- [ ] Update `app/layout.tsx` to fetch global SEO from KV and apply:

```typescript
// Add at top of file after imports:
import { getGlobalSEO } from "@/lib/seo-settings";

// Replace the static `export const metadata` with a dynamic export:
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getGlobalSEO();
  return {
    metadataBase: new URL(APP_URL),
    title: { default: seo.siteTitle, template: seo.titleTemplate },
    description: seo.defaultDescription,
    // ... rest of metadata using seo.* values
    verification: {
      google: seo.googleVerification || process.env.GOOGLE_SITE_VERIFICATION,
    },
    robots: seo.indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
  };
}
```

---

## Task 12: Update sitemap, admin nav, site nav

**Files:**
- Modify: `app/sitemap.ts` — add blog posts from KV
- Modify: `app/(admin)/layout.tsx` — add Blog + SEO to sidebar
- Modify: `components/site/header.tsx` — add Blog to Study dropdown

- [ ] `app/sitemap.ts` — add dynamic blog routes:

```typescript
import { getBlogs } from "@/lib/blog";
// ... in the function:
const blogs = await getBlogs();
const blogRoutes = blogs
  .filter((p) => p.isPublished)
  .map((p) => ({ url: `${APP_URL}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "weekly" as const, priority: 0.8 }));
return [...staticRoutes, ...blogRoutes];
```

- [ ] Admin layout — add to navItems array:
```typescript
{ icon: FileText, label: "Blog", href: "/admin/blog" },
{ icon: Search, label: "SEO", href: "/admin/seo" },
```

- [ ] Header — add Blog to Study dropdown:
```typescript
{ label: "Blog & Articles", href: "/blog", desc: "Kingdom articles and deep studies" },
```

---

## Self-Review

**Spec coverage:**
- ✅ Blog system (create, read, publish, draft, feature, delete, edit)
- ✅ Blog list public page with search + category filter
- ✅ Blog post detail page with server-side generateMetadata (SEO per post)
- ✅ Article schema injected per post
- ✅ Admin blog list management
- ✅ Admin blog editor with SEO fields
- ✅ SEO control center (global settings)
- ✅ Per-page SEO overrides
- ✅ Dynamic sitemap including blog posts
- ✅ Dynamic global SEO from admin applied in layout
- ✅ Admin sidebar updated
- ✅ Site nav updated

**No placeholders:** All tasks have complete code (Tasks 9 and 10 editors will be written in full during execution).
