import { NextResponse } from "next/server";
import { getQuestion, addAnswer } from "@/lib/questions";
import { revalidatePath } from "next/cache";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question || !question.isApproved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await req.json();
  const { answerBody, authorName } = body;
  if (!answerBody?.trim()) {
    return NextResponse.json({ error: "Answer body is required" }, { status: 400 });
  }
  const answer = await addAnswer(question.id, {
    body: answerBody.trim(),
    authorName: authorName?.trim() || "Anonymous",
    isOfficial: false,
  });
  revalidatePath(`/questions/${slug}`);
  return NextResponse.json({ success: true, answer });
}
