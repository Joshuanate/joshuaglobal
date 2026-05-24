import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateBlog, deleteBlog } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const post = await updateBlog(id, data);
  revalidatePath("/blog");
  if (post) revalidatePath(`/blog/${post.slug}`);
  return NextResponse.json({ success: true, post });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteBlog(id);
  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
