import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// ✅ Create a new user
export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    const newUser = await prisma.user.create({
      data: { email, password, name, role },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}