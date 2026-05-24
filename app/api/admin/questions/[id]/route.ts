import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateQuestion, deleteQuestion } from "@/lib/questions";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const updated = await updateQuestion(id, data);
  revalidatePath("/questions");
  return NextResponse.json({ success: true, question: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteQuestion(id);
  revalidatePath("/questions");
  return NextResponse.json({ success: true });
}
