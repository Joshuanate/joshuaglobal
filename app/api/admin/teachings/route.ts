import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTeachings, createTeaching } from "@/lib/teachings";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const teachings = await getTeachings();
  return NextResponse.json(teachings);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const teaching = await createTeaching(body);
  revalidatePath("/teachings");
  revalidatePath("/");
  return NextResponse.json({ success: true, teaching });
}
