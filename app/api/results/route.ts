import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Get user results
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const results = await prisma.result.findMany({ where: { userId: Number(userId) } });
    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
