import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateVideo, deleteVideo } from "@/lib/videos";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const video = await updateVideo(id, data);
  revalidatePath("/videos");
  return NextResponse.json({ success: true, video });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteVideo(id);
  revalidatePath("/videos");
  return NextResponse.json({ success: true });
}
