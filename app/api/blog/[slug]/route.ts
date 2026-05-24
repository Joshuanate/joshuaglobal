import { NextResponse } from "next/server";
import { getBlog } from "@/lib/blog";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || !post.isPublished) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}
