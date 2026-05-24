import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addAnswer, deleteAnswer, getQuestions } from "@/lib/questions";
import { revalidatePath } from "next/cache";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { body: answerBody } = await req.json();
  if (!answerBody?.trim()) return NextResponse.json({ error: "Body required" }, { status: 400 });
  const answer = await addAnswer(id, {
    body: answerBody.trim(),
    authorName: "Joshua — JoshuaGlobal",
    isOfficial: true,
  });
  const questions = await getQuestions();
  const q = questions.find((q) => q.id === id);
  if (q) revalidatePath(`/questions/${q.slug}`);
  revalidatePath("/questions");
  return NextResponse.json({ success: true, answer });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { answerId } = await req.json();
  await deleteAnswer(id, answerId);
  revalidatePath("/questions");
  return NextResponse.json({ success: true });
}
