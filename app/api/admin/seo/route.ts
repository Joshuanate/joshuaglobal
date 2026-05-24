import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGlobalSEO, setGlobalSEO } from "@/lib/seo-settings";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getGlobalSEO());
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const updated = await setGlobalSEO(data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, seo: updated });
}
