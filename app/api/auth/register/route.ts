import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { username, password, fname, lname, email, mobileNo, gender, birthDate, lrn } = await req.json();

    // Check if username or email already exists
    const existingUser = await prisma.userData.findUnique({ where: { username } });
    if (existingUser) return NextResponse.json({ error: 'Username already exists' }, { status: 400 });

    const existingEmail = await prisma.userData.findUnique({ where: { email } });
    if (existingEmail) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

    // Check if Student exists (using email or LRN)
    const existingStudent = await prisma.student.findUnique({ where: { email } });
    if (existingStudent) return NextResponse.json({ error: 'Student already exists' }, { status: 400 });

    const existingLRN = await prisma.student.findUnique({ where: { lrn } });
    if (existingLRN) return NextResponse.json({ error: 'LRN already exists' }, { status: 400 });

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create UserData entry
    const newUser = await prisma.userData.create({
      data: {
        username,
        password: hashedPassword,
        strPassword: password, // Storing plain password is NOT recommended
        fname,
        lname,
        email,
        mobileNo,
        level: 'student', // Default level, change if needed
      },
    });

    // Generate unique student ID (e.g., STU_1707400000)
    const studId = `STU_${Math.floor(Date.now() / 1000)}`;

    // Create Student entry linked to UserData
    await prisma.student.create({
      data: {
        studId,
        lrn,
        fname,
        lname,
        gender,
        mobileNo,
        email,
        birthDate: new Date(birthDate), // Convert string to Date
        userId: newUser.id, // Link to UserData
      },
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
