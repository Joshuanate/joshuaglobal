import { NextResponse } from "next/server";
import { getQuestion, voteQuestion } from "@/lib/questions";

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await voteQuestion(question.id);
  return NextResponse.json({ success: true });
}
