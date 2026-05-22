import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateVerse, deleteVerse } from "@/lib/verses-admin";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const verse = await updateVerse(id, body);
  if (!verse) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/daily-verse");
  revalidatePath("/");
  return NextResponse.json({ success: true, verse });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteVerse(id);
  revalidatePath("/daily-verse");
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
