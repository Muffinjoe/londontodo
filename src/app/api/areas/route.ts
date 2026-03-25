export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const areas = await prisma.area.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { articles: true, events: true } } },
  })
  return NextResponse.json(areas)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const area = await prisma.area.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      heroImage: body.heroImage,
      latitude: body.latitude,
      longitude: body.longitude,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
    },
  })
  return NextResponse.json(area, { status: 201 })
}
