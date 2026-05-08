import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { kvGet, kvSet } from "@/lib/kv";
import { revalidatePath } from "next/cache";
import { type SiteContent, DEFAULT_CONTENT } from "@/lib/content";

export async function GET() {
  const content = await kvGet<SiteContent>("site:content");
  return NextResponse.json(content ?? DEFAULT_CONTENT);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const existing = (await kvGet<SiteContent>("site:content")) ?? DEFAULT_CONTENT;
  const updated: SiteContent = { ...existing, ...body };
  await kvSet("site:content", updated);

  revalidatePath("/");
  revalidatePath("/daily-verse");

  return NextResponse.json({ success: true, content: updated });
}
