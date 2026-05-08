import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string | null;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // TODO: Save to database and send confirmation via Resend
    // await prisma.newsletterSubscriber.upsert({ where: { email }, ... })
    // await resend.emails.send({ ... })

    return NextResponse.redirect(
      new URL("/newsletter/confirmed", req.url),
      303
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
