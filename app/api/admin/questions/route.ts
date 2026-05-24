import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getQuestions, createQuestion } from "@/lib/questions";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const questions = await getQuestions();
  return NextResponse.json(questions);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, questionBody, tags, officialAnswer, isFeatured } = body;
  if (!title?.trim() || !questionBody?.trim()) {
    return NextResponse.json({ error: "Title and body required" }, { status: 400 });
  }
  const question = await createQuestion({
    title: title.trim(),
    body: questionBody.trim(),
    tags: tags?.split(",").map((t: string) => t.trim()).filter(Boolean) ?? [],
    askedBy: "Joshua Global",
    isApproved: true,
    isFeatured: isFeatured ?? false,
    officialAnswer: officialAnswer?.trim() || undefined,
  });
  revalidatePath("/questions");
  return NextResponse.json({ success: true, question });
}
