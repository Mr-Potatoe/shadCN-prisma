import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 📌 GET all users with pagination
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  
  const skip = (page - 1) * limit;
  const take = limit;

  try {
    // Fetch users with pagination
    const users = await prisma.user.findMany({
      skip,
      take,
    });

    // Get the total number of users to calculate total pages
    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limit);

    // If no users are found for the requested page, return empty users array
    if (users.length === 0 && page > totalPages) {
      return NextResponse.json({ users: [], totalPages });
    }

    return NextResponse.json({ users, totalPages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// 📌 CREATE a new user
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// 📌 DELETE all users (Optional)
export async function DELETE() {
  try {
    await prisma.user.deleteMany();
    return NextResponse.json({ message: "All users deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete users" }, { status: 500 });
  }
}
