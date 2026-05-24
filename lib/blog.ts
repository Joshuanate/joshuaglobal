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
