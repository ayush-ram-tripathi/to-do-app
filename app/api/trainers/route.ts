import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trainers = await prisma.trainer.findMany({
      orderBy: { rating: 'desc' }
    });
    return NextResponse.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return NextResponse.json({ error: "Failed to fetch trainers" }, { status: 500 });
  }
}
