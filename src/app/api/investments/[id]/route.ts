import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
  const id = params.id;
  const updatedData = await req.json();

  try {
    const updatedInvestment = await prisma.investment.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    return NextResponse.json(updatedInvestment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, {
      status: 500,
    });
  }
}