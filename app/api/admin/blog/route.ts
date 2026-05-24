import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBlogs, createBlog } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getBlogs());
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.title?.trim() || !body.excerpt?.trim() || !body.body?.trim()) {
    return NextResponse.json({ error: "Title, excerpt and body required" }, { status: 400 });
  }
  const post = await createBlog({ ...body, author: "Joshua" });
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json({ success: true, post });
}
