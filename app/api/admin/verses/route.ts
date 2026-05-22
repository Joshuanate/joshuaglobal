import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getVerses, createVerse } from "@/lib/verses-admin";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const verses = await getVerses();
  return NextResponse.json(verses);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const verse = await createVerse(body);
  revalidatePath("/daily-verse");
  revalidatePath("/");
  return NextResponse.json({ success: true, verse });
}
