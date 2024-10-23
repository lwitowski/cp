import { auth } from '@/app/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    const investments = await prisma.investment.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        quantity: true,
        buyPrice: true,
        currentPrice: true,
      },
    });

    const totalInvestment = investments.reduce((acc, inv) => acc + inv.quantity * inv.buyPrice, 0);
    const totalCurrentValue = investments.reduce((acc, inv) => acc + inv.quantity * inv.currentPrice, 0);
    const totalGainLoss = totalCurrentValue - totalInvestment;

    return NextResponse.json({
      totalInvestment,
      totalCurrentValue,
      totalGainLoss,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, {
      status: 500,
    });
  }
}