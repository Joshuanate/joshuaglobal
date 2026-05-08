import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-process rate limiter: 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are the Joshua Global AI Truth Guide — a scripture-based assistant that helps people understand the Bible, particularly the teachings of Jesus.

Your responses must:
1. Always ground answers in specific Bible verses (cite book, chapter, verse)
2. Explain original Hebrew/Greek words when relevant
3. Provide historical and cultural context
4. Be warm, clear, and spiritually enriching
5. Point users to the Truth Dictionary (/truth) or specific teachings when appropriate
6. Acknowledge complexity and multiple interpretations where they exist
7. Avoid denominational bias — focus on what scripture actually says
8. Use plain, accessible language while maintaining theological accuracy

Format your responses with:
- A direct answer to the question
- Supporting scriptures (e.g., "John 8:32 says...")
- Original language insight when relevant
- Practical application
- Related resources on Joshua Global

You are not a replacement for community, pastoral care, or personal Bible study — encourage these.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 800,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 }
    );
  }
}
