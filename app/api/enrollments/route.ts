import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Enroll a user in an exam
export async function POST(req: Request) {
  try {
    const { userId, examId } = await req.json();
    const enrollment = await prisma.examEnrollment.create({
      data: { userId, examId },
    });
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error("Failed to enroll user:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to enroll user" }, { status: 500 });
  }
}
