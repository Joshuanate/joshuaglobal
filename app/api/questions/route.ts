import { NextResponse } from "next/server";
import { getQuestions, createQuestion } from "@/lib/questions";

export async function GET() {
  const questions = await getQuestions();
  return NextResponse.json(questions.filter((q) => q.isApproved));
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, body: qBody, tags, askedBy } = body;
  if (!title?.trim() || !qBody?.trim()) {
    return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
  }
  const question = await createQuestion({
    title: title.trim(),
    body: qBody.trim(),
    tags: Array.isArray(tags) ? tags : [],
    askedBy: askedBy?.trim() || "Anonymous",
    isApproved: false,
  });
  return NextResponse.json({ success: true, question });
}
