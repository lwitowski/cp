import { PrismaClient } from '@prisma/client';
import { stringify } from 'csv-stringify/sync';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, {
      status: 401,
    });
  }

  const investments = await prisma.investment.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const csv = stringify(investments, {
    header: true,
    columns: [
      { key: 'name', header: 'Stock name' },
      { key: 'quantity', header: 'Quantity' },
      { key: 'buyPrice', header: 'Buy Price' },
      { key: 'currentPrice', header: 'Current Price' },
      { key: 'createdAt', header: 'Created At' },
    ],
  });

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=investments.csv',
    },
  });
}