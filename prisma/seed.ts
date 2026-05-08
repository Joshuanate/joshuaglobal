import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Joshua Global database...");

  // Daily Verses
  const verses = [
    {
      slug: "john-8-32-truth-sets-you-free",
      verse: "The truth will set you free.",
      reference: "John 8:32",
      book: "John",
      chapter: 8,
      verseNumber: "32",
      translation: "NIV",
      context:
        "Jesus was speaking to Jews who had believed in him in the temple courts at Jerusalem.",
      originalMeaning:
        "The Greek word alētheia means ultimate reality. Eleutherōsei means liberation from bondage.",
      inspiration:
        "This verse is often misquoted — the 'truth' here is not information but a Person: Jesus himself (John 14:6).",
      prayer:
        "Lord, open my eyes to your truth. Free me from every deception I have accepted. Amen.",
      application:
        "Ask: Are there areas shaped by cultural assumptions rather than Jesus' actual words?",
      isPublished: true,
      isFeatured: true,
      scheduledFor: new Date("2026-05-06"),
    },
  ];

  for (const verse of verses) {
    await prisma.dailyVerse.upsert({
      where: { slug: verse.slug },
      create: verse,
      update: verse,
    });
  }

  // Truth entries
  const truths = [
    {
      slug: "repentance",
      term: "Repentance",
      category: "Core Doctrines",
      definition:
        "A complete transformation of mind and direction — not mere remorse, but a fundamental reorientation toward God.",
      biblicalContext:
        "The Greek metanoia means a change of mind. Jesus proclaimed it at the start of his ministry (Matt 4:17).",
      misconceptions:
        "Most confuse repentance with guilt or emotional sorrow. Biblical repentance is primarily cognitive and volitional.",
      application:
        "Examine which areas of your thinking contradict the Kingdom of God's values and turn them over.",
      isPublished: true,
    },
    {
      slug: "grace",
      term: "Grace",
      category: "Salvation & Grace",
      definition:
        "Unmerited divine favor — but more than pardon. Grace is enabling power that transforms and equips.",
      biblicalContext:
        "The Greek charis carries the sense of a gift that produces joyful response and transformation.",
      misconceptions:
        "Grace is not a license to sin. Paul explicitly rejects this in Romans 6:1-2.",
      application:
        "Receive grace not just as forgiveness, but as the power to actually live differently.",
      isPublished: true,
    },
  ];

  for (const truth of truths) {
    await prisma.truthEntry.upsert({
      where: { slug: truth.slug },
      create: truth,
      update: truth,
    });
  }

  console.log("✅ Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
