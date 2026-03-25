export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { articles: true, events: true } } },
  })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      color: body.color,
      icon: body.icon,
      sortOrder: body.sortOrder || 0,
    },
  })
  return NextResponse.json(category, { status: 201 })
}
