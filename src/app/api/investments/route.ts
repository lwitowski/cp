import { auth } from '@/app/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authorized' }, {
        status: 401,
      });
    }

    const investments = await prisma.investment.findMany({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(investments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, quantity, buyPrice, currentPrice } = body;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authorized' }, {
        status: 401,
      });
    }

    const newInvestment = await prisma.investment.create({
      data: {
        name,
        quantity,
        buyPrice,
        currentPrice,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(newInvestment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create investment' }, {
      status: 500,
    });
  }
}