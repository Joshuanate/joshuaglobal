import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    // TODO: Replace with actual DB query
    // const verses = await prisma.dailyVerse.findMany({
    //   where: { isPublished: true },
    //   orderBy: { scheduledFor: "desc" },
    //   take: limit,
    //   skip: offset,
    // });

    return NextResponse.json({
      data: [],
      meta: { limit, offset, total: 0 },
    });
  } catch (error) {
    console.error("Verses API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
