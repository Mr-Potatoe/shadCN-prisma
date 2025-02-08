import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Get all exams
export async function GET() {
  try {
    const exams = await prisma.exam.findMany();
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Failed to fetch exams:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 });
  }
}

// ✅ Create a new exam
export async function POST(req: Request) {
  try {
    const { title, description, subject, duration, startTime, endTime } = await req.json();
    const newExam = await prisma.exam.create({
      data: { title, description, subject, duration, startTime, endTime },
    });
    return NextResponse.json(newExam, { status: 201 });
  } catch (error) {
    console.error("Failed to Create exam:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
  }
}
