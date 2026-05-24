import { NextResponse } from "next/server";
import { getQuestion } from "@/lib/questions";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question || !question.isApproved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(question);
}
