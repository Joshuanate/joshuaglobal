import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPagesSEO, setPageSEO } from "@/lib/seo-settings";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getPagesSEO());
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, seo } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  await setPageSEO(slug, seo);
  revalidatePath(slug);
  return NextResponse.json({ success: true });
}
