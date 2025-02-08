import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Auth Log:", body);
    return NextResponse.json({ message: "Log recorded" });
  } catch (error) {
    console.error("Failed to log event:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}
