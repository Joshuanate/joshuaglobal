import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateTeaching, deleteTeaching, getTeachings } from "@/lib/teachings";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const teaching = await updateTeaching(id, body);
  if (!teaching) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/teachings");
  revalidatePath(`/teachings/${teaching.slug}`);
  revalidatePath("/");
  return NextResponse.json({ success: true, teaching });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const list = await getTeachings();
  const teaching = list.find((t) => t.id === id);
  await deleteTeaching(id);
  if (teaching) {
    revalidatePath(`/teachings/${teaching.slug}`);
    revalidatePath("/teachings");
    revalidatePath("/");
  }
  return NextResponse.json({ success: true });
}
