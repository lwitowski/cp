import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, {
      status: 400,
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return NextResponse.json({ message: 'User created successfully', user }, {
    status: 201,
  });
}