import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Submit an answer
export async function POST(req: Request) {
  try {
    const { userId, questionId, answer } = await req.json();

    // Get correct answer
    const question = await prisma.question.findUnique({ where: { id: questionId } });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const isCorrect = question.correctAnswer === answer;

    const newAnswer = await prisma.answer.create({
      data: { userId, questionId, answer, isCorrect },
    });

    return NextResponse.json(newAnswer, { status: 201 });
  } catch (error) {
    console.error("Error submitting answer:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}
