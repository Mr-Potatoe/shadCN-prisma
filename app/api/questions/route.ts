import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Get all questions for an exam
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const examId = searchParams.get("examId");

  if (!examId) {
    return NextResponse.json({ error: "Exam ID is required" }, { status: 400 });
  }

  try {
    const questions = await prisma.question.findMany({ where: { examId: Number(examId) } });
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

// ✅ Add a new question to an exam
export async function POST(req: Request) {
  try {
    const { examId, question, type, choices, correctAnswer } = await req.json();
    const newQuestion = await prisma.question.create({
      data: { examId, question, type, choices, correctAnswer },
    });
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("Failed to create a question:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
