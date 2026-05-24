import { kvGet, kvSet, kvDel } from "@/lib/kv";
export type { Question, QuestionAnswer } from "@/lib/question-types";
import type { Question, QuestionAnswer } from "@/lib/question-types";

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

const SEED_QUESTIONS: Question[] = [
  {
    id: "q-how-to-pray",
    slug: "how-to-pray",
    title: "How do I pray? Does God actually hear me?",
    body: "I want to pray but I don't know how to start or what to say. I feel like my prayers hit the ceiling and come back empty. Does God actually hear ordinary people when they pray? Is there a right way to do it?",
    tags: ["prayer", "faith", "beginners"],
    votes: 214,
    isAnswered: true,
    isApproved: true,
    isFeatured: true,
    askedBy: "Community",
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-01T00:00:00.000Z",
    answers: [
      {
        id: "a-how-to-pray-1",
        isOfficial: true,
        authorName: "Joshua — JoshuaGlobal",
        votes: 187,
        createdAt: "2026-05-01T01:00:00.000Z",
        body: `Yes. God hears you. And the fact that you are asking this question is already the beginning of prayer.

Let me tell you the truth about prayer — not the religious performance version, but what Jesus actually taught.

---

## 1. Prayer Is Conversation With Your Father

Jesus said: *"When you pray, say: Our Father…"* (Luke 11:2). The first word is everything. **Father.** Not "Supreme Being." Not "Cosmic Force." Father. This is a relational word — intimate, personal, safe. You are not approaching a judge hoping for mercy. You are talking to the God who formed you, knows your name, and is already leaning in to hear you.

The reason prayers feel like they hit the ceiling is usually one of two things: we have been taught to pray *at* God (performing words) rather than *to* God (having a conversation), or we have not yet understood our identity as His children.

---

## 2. Jesus Gave Us a Structure — The Lord's Prayer

In Matthew 6:9–13, Jesus gave His disciples a model for prayer. Not a script to repeat mindlessly, but a *structure* — six movements that align you with God's Kingdom:

**"Our Father in heaven, hallowed be your name"**
— Begin with worship. Acknowledge who He is before you say what you need. This shifts your heart from anxiety to trust.

**"Your Kingdom come, your will be done, on earth as it is in heaven"**
— This is the core petition. You are praying for God's government to be established in your life, your family, your circumstances. This is Kingdom prayer — aligning earth with heaven. Jesus said seek **first** the Kingdom (Matthew 6:33), and prayer is how we do that.

**"Give us today our daily bread"**
— Bring your real needs. God wants to hear them. He is not offended by your hunger, your rent, your sickness. He knows you need these things (Matthew 6:32) and He invites you to ask.

**"Forgive us our debts, as we also have forgiven our debtors"**
— Keep the relationship clean. Unforgiveness is the single greatest blockage to prayer. This is not earning forgiveness — it is maintaining the flow.

**"Lead us not into temptation, but deliver us from the evil one"**
— Ask for protection. Acknowledge you need guidance. Humility before God opens doors that pride keeps shut.

**"For yours is the Kingdom and the power and the glory forever"**
— End where you began: with Him. Not with your problem. With His greatness.

---

## 3. Praying "In Jesus' Name" Is Not a Magic Password

Most people say "in Jesus' name, Amen" like a closing ritual. But this phrase means something profound: you are praying with the **authority** that Jesus delegated to His followers (John 14:13–14). When you pray in His name, you are presenting His Kingdom credentials before the Father. This is why it works — not because of the words themselves, but because of the relationship and authority they represent.

---

## 4. The Holy Spirit Helps You When You Don't Know What to Say

Romans 8:26 says: *"The Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us."* So when you feel speechless, stuck, or empty — that is actually the perfect moment to be honest with God. "I don't know what to say, but you do." That is a prayer. The Spirit takes over from there.

---

## 5. Start Simple. Today.

You do not need a prayer closet, a special formula, or a long list. Start with this right now:

*"Father, I don't fully know how to pray, but I know you are real. I want to know you. Hear me. I am yours."*

That is enough. That is a prayer. He hears it. Every word.

---

**Key scriptures:** Matthew 6:5–13 (the Lord's Prayer), Luke 18:1–8 (persistence in prayer), John 14:13–14 (praying in Jesus' name), Romans 8:26–27 (the Holy Spirit intercedes), Philippians 4:6–7 (pray about everything).`,
      },
    ],
  },
  {
    id: "q-kingdom-of-god",
    slug: "what-is-the-kingdom-of-god",
    title: "What is the Kingdom of God and is it present or future?",
    body: "Jesus referred to the Kingdom of God over 100 times. Is it a future state — something we go to when we die — or is it a present reality available right now? I'm confused because some churches say it's all future, others say it's now. What does Scripture actually teach?",
    tags: ["kingdom", "eschatology", "jesus"],
    votes: 98,
    isAnswered: true,
    isApproved: true,
    isFeatured: true,
    askedBy: "Community",
    createdAt: "2026-04-28T00:00:00.000Z",
    updatedAt: "2026-04-28T00:00:00.000Z",
    answers: [
      {
        id: "a-kingdom-1",
        isOfficial: true,
        authorName: "Joshua — JoshuaGlobal",
        votes: 76,
        createdAt: "2026-04-28T02:00:00.000Z",
        body: `The answer is: **both** — but primarily present. And understanding this changes everything.

## The Kingdom Is God's Government, Not a Location

The Greek word Jesus used is *basileia* — it means **kingship, reign, rule, dominion**. The Kingdom of God is not primarily a place you go to when you die. It is the *rule and authority of God* breaking into human existence.

When Jesus said "the Kingdom of God is at hand" (Mark 1:15), the word *at hand* means it has arrived, it is accessible right now, it is within reach.

## Jesus Said It Clearly: The Kingdom Is Now

Luke 17:20–21 — *"The Kingdom of God does not come with observation... the Kingdom of God is in your midst"* (or "within you"). Jesus was standing right there. The Kingdom had arrived in the person of the King.

Luke 11:20 — *"If I drive out demons by the finger of God, then the Kingdom of God has come upon you."* Every healing, every deliverance, every miracle Jesus performed was the Kingdom invading the present age.

Matthew 12:28 — Same truth. The Kingdom *has come* (perfect tense — completed action with present results).

## But It Also Has a Future Dimension

Yes — there is a future consummation of the Kingdom. Revelation 11:15 — *"The Kingdom of the world has become the Kingdom of our Lord."* That is still coming. There will be a day when the Kingdom is fully manifest in all creation.

But here is what most churches get wrong: **the future aspect does not cancel the present reality**. The Kingdom is like a seed that has been planted (Matthew 13) — it is already here, growing, spreading, transforming. One day it will be fully grown. But you can live in it today.

## Practical Meaning for You

You are not waiting to enter the Kingdom when you die. You are called to live as a **citizen of the Kingdom right now** (Philippians 3:20). You carry Kingdom authority (Matthew 28:18–19). You pray Kingdom prayers (*"Your Kingdom come, on earth as it is in heaven"* — you wouldn't pray that if it were only future). You represent the King in every space you occupy.

The Kingdom is the greatest reality available to any human being alive today.`,
      },
    ],
  },
  {
    id: "q-repentance",
    slug: "what-did-jesus-mean-repentance",
    title: "What did Jesus mean by repentance?",
    body: "I've always been taught that repentance means feeling really sorry for your sins and vowing not to do them again. But recently I heard that the Greek word has a different meaning. Can someone explain what Jesus actually meant when he said 'Repent, for the kingdom of heaven is at hand'?",
    tags: ["repentance", "greek", "jesus"],
    votes: 142,
    isAnswered: true,
    isApproved: true,
    isFeatured: false,
    askedBy: "Community",
    createdAt: "2026-04-25T00:00:00.000Z",
    updatedAt: "2026-04-25T00:00:00.000Z",
    answers: [
      {
        id: "a-repentance-1",
        isOfficial: true,
        authorName: "Joshua — JoshuaGlobal",
        votes: 89,
        createdAt: "2026-04-25T02:00:00.000Z",
        body: `The Greek word Jesus used is **μετάνοια (metanoia)** — and it is far more powerful than "feeling sorry."

*Meta* = change, transformation. *Nous* = mind, perception, the way you see reality.

**Metanoia = a fundamental transformation of how you think and perceive everything.**

Jesus wasn't primarily calling for emotional guilt. He was calling for a complete paradigm shift — a new way of seeing God, yourself, your neighbor, and the world. This is why He immediately connects it to the Kingdom: *"Repent, for the Kingdom of God is at hand."* The Kingdom has arrived — repentance is the cognitive realignment that lets you perceive and participate in it.

The Hebrew equivalent שׁוּב (shuv) means "to turn" or "return" — emphasizing relational movement back toward God.

**Romans 2:4** confirms the motivation: it is God's *kindness* that leads to repentance — not guilt, not fear, not punishment. True metanoia is drawn by love.

**Romans 12:2** makes it ongoing: *"be transformed by the renewing of your mind"* — same root concept. Repentance is not a one-time tearful event. It is a daily posture of having your mind renewed to see as God sees.

So when Jesus said repent — He was saying: **change your whole framework. Stop seeing through the lens of this world. Start seeing through the lens of the Kingdom.** That is far bigger, and far more life-transforming, than feeling bad about mistakes.`,
      },
    ],
  },
  {
    id: "q-grace",
    slug: "what-is-grace",
    title: "What exactly is grace and how does it work?",
    body: "Is grace just unmerited favor — God overlooking our sins? Or does it have an enabling, transforming dimension? I feel like the way most churches teach grace makes people passive. What does the original Greek actually say?",
    tags: ["grace", "salvation", "greek"],
    votes: 65,
    isAnswered: true,
    isApproved: true,
    isFeatured: false,
    askedBy: "Community",
    createdAt: "2026-04-20T00:00:00.000Z",
    updatedAt: "2026-04-20T00:00:00.000Z",
    answers: [
      {
        id: "a-grace-1",
        isOfficial: true,
        authorName: "Joshua — JoshuaGlobal",
        votes: 52,
        createdAt: "2026-04-20T02:00:00.000Z",
        body: `You are right to question the "unmerited favor" definition alone — it captures only part of the truth.

The Greek word is **χάρις (charis)** — and in the classical world, long before Paul used it, it carried the meaning of **enabling power, transforming influence, empowering gift**.

Yes, grace includes unmerited favor — God's acceptance of you is not earned. But grace does far more than pardon the past.

**Titus 2:11–12** is one of the most important verses on grace: *"For the grace of God has appeared... **teaching us** to say 'No' to ungodliness and worldly passions, and to live self-controlled, upright, and godly lives."*

Notice: grace **teaches**. Grace **trains**. Grace is not passive pardon — it is active empowerment. It is God's enabling presence that works in you to produce what the law could never produce through command alone.

**2 Corinthians 12:9** — *"My grace is sufficient for you, for my power is made perfect in weakness."* Paul equates grace with power. The word *sufficient* in Greek (arkei) means "to be strong enough, to prevail." Grace is God's strength flowing into your weakness.

**Romans 5:17** — *"those who receive God's abundant provision of grace and the gift of righteousness **reign in life** through the one man, Jesus Christ."* Grace produces reigning — active, ruling, Kingdom living. Not passivity.

So grace is: **God's undeserved acceptance + His supernatural enabling power + His active training presence in your life.** All three together. It is what Paul meant when he said *"I can do all things through Christ who strengthens me"* — that strength is grace in action.`,
      },
    ],
  },
  {
    id: "q-holy-spirit",
    slug: "who-is-the-holy-spirit",
    title: "Who exactly is the Holy Spirit and what does He do?",
    body: "The Holy Spirit is the most confusing part of the Trinity to me. Some churches make it weird and emotional, others almost ignore Him. What did Jesus actually teach about the Holy Spirit and what is His real role?",
    tags: ["holy spirit", "trinity", "jesus"],
    votes: 54,
    isAnswered: false,
    isApproved: true,
    isFeatured: false,
    askedBy: "Community",
    createdAt: "2026-04-15T00:00:00.000Z",
    updatedAt: "2026-04-15T00:00:00.000Z",
    answers: [],
  },
  {
    id: "q-suffering",
    slug: "why-does-god-allow-suffering",
    title: "Why does God allow suffering if He is all-powerful and loving?",
    body: "This is the question that keeps me from fully trusting God. If He is all-powerful and He loves us, why does He allow cancer, abuse, and tragedy? I need an honest answer, not a religious cliché.",
    tags: ["suffering", "theodicy", "faith"],
    votes: 121,
    isAnswered: false,
    isApproved: true,
    isFeatured: false,
    askedBy: "Community",
    createdAt: "2026-04-10T00:00:00.000Z",
    updatedAt: "2026-04-10T00:00:00.000Z",
    answers: [],
  },
];

export async function getQuestions(): Promise<Question[]> {
  const list = await kvGet<Question[]>("questions:list");
  if (!list || list.length === 0) {
    await kvSet("questions:list", SEED_QUESTIONS);
    return SEED_QUESTIONS;
  }
  return list;
}

export async function getQuestion(slug: string): Promise<Question | null> {
  const list = await getQuestions();
  return list.find((q) => q.slug === slug) ?? null;
}

export async function createQuestion(data: {
  title: string;
  body: string;
  tags: string[];
  askedBy: string;
  isApproved?: boolean;
  isFeatured?: boolean;
  officialAnswer?: string;
}): Promise<Question> {
  const list = await getQuestions();
  const slug = slugify(data.title);
  const id = `q-${crypto.randomUUID().slice(0, 8)}`;

  const answers: QuestionAnswer[] = data.officialAnswer
    ? [{
        id: `a-${crypto.randomUUID().slice(0, 8)}`,
        body: data.officialAnswer,
        authorName: "Joshua — JoshuaGlobal",
        isOfficial: true,
        votes: 0,
        createdAt: new Date().toISOString(),
      }]
    : [];

  const question: Question = {
    id,
    slug,
    title: data.title,
    body: data.body,
    tags: data.tags,
    votes: 0,
    answers,
    isAnswered: answers.length > 0,
    isApproved: data.isApproved ?? false,
    isFeatured: data.isFeatured ?? false,
    askedBy: data.askedBy || "Anonymous",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  list.unshift(question);
  await kvSet("questions:list", list);
  return question;
}

export async function updateQuestion(id: string, data: Partial<Question>): Promise<Question | null> {
  const list = await getQuestions();
  const idx = list.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  const updated = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
  list[idx] = updated;
  await kvSet("questions:list", list);
  return updated;
}

export async function deleteQuestion(id: string): Promise<void> {
  const list = await getQuestions();
  await kvSet("questions:list", list.filter((q) => q.id !== id));
}

export async function voteQuestion(id: string): Promise<void> {
  const list = await getQuestions();
  const idx = list.findIndex((q) => q.id === id);
  if (idx === -1) return;
  list[idx].votes += 1;
  await kvSet("questions:list", list);
}

export async function addAnswer(questionId: string, answer: {
  body: string;
  authorName: string;
  isOfficial?: boolean;
}): Promise<QuestionAnswer | null> {
  const list = await getQuestions();
  const idx = list.findIndex((q) => q.id === questionId);
  if (idx === -1) return null;

  const newAnswer: QuestionAnswer = {
    id: `a-${crypto.randomUUID().slice(0, 8)}`,
    body: answer.body,
    authorName: answer.authorName || "Anonymous",
    isOfficial: answer.isOfficial ?? false,
    votes: 0,
    createdAt: new Date().toISOString(),
  };

  // Official answers go first
  if (newAnswer.isOfficial) {
    list[idx].answers.unshift(newAnswer);
  } else {
    list[idx].answers.push(newAnswer);
  }
  list[idx].isAnswered = list[idx].answers.some((a) => a.isOfficial) || list[idx].answers.length > 0;
  list[idx].updatedAt = new Date().toISOString();
  await kvSet("questions:list", list);
  return newAnswer;
}

export async function deleteAnswer(questionId: string, answerId: string): Promise<void> {
  const list = await getQuestions();
  const idx = list.findIndex((q) => q.id === questionId);
  if (idx === -1) return;
  list[idx].answers = list[idx].answers.filter((a) => a.id !== answerId);
  list[idx].isAnswered = list[idx].answers.some((a) => a.isOfficial) || list[idx].answers.length > 0;
  await kvSet("questions:list", list);
}
