import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      select: { id: true, title: true, subject: true },
    });
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const { title, description, subject, duration, startTime, endTime } = await req.json();
  
      // Convert duration to an integer
      const parsedDuration = parseInt(duration, 10);
  
      if (!title || !subject || isNaN(parsedDuration) || !startTime || !endTime) {
        return NextResponse.json({ error: "All fields are required and must be valid" }, { status: 400 });
      }
  
      const newExam = await prisma.exam.create({
        data: {
          title,
          description,
          subject,
          duration: parsedDuration, // Ensure duration is an Int
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
  
      return NextResponse.json(newExam, { status: 201 });
    } catch (error) {
      console.error("Error creating exam:", error);
      return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
    }
  }