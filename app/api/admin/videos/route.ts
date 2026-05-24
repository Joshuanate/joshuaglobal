import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getVideos, createVideo } from "@/lib/videos";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getVideos());
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json({ error: "Title and description required" }, { status: 400 });
  }
  const video = await createVideo({
    title: body.title,
    description: body.description,
    youtubeId: body.youtubeId || undefined,
    youtubeUrl: body.youtubeUrl || undefined,
    category: body.category || "Kingdom of God",
    duration: body.duration || undefined,
    thumbnailUrl: body.thumbnailUrl || undefined,
    tags: Array.isArray(body.tags) ? body.tags : [],
    isPublished: body.isPublished ?? false,
    isFeatured: body.isFeatured ?? false,
    views: body.views || undefined,
  });
  revalidatePath("/videos");
  revalidatePath("/");
  return NextResponse.json({ success: true, video });
}
