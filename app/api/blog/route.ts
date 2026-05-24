import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/blog";

export async function GET() {
  const posts = await getBlogs();
  return NextResponse.json(posts.filter((p) => p.isPublished));
}
