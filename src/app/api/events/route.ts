export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || 'PUBLISHED'
  const category = searchParams.get('category')
  const area = searchParams.get('area')
  const featured = searchParams.get('featured')
  const free = searchParams.get('free')
  const family = searchParams.get('family')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  const where: Record<string, unknown> = { status }
  if (category) where.category = { slug: category }
  if (area) where.area = { slug: area }
  if (featured === 'true') where.featured = true
  if (free === 'true') where.priceType = 'FREE'
  if (family === 'true') where.familyFriendly = true
  if (dateFrom || dateTo) {
    where.startDate = {}
    if (dateFrom) (where.startDate as Record<string, unknown>).gte = new Date(dateFrom)
    if (dateTo) (where.startDate as Record<string, unknown>).lte = new Date(dateTo)
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { category: true, area: true, venue: true, tags: { include: { tag: true } } },
      orderBy: { startDate: 'asc' },
      take: limit,
      skip: offset,
    }),
    prisma.event.count({ where }),
  ])

  return NextResponse.json({ events, total, limit, offset })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const event = await prisma.event.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      shortSummary: body.shortSummary,
      whyGo: body.whyGo,
      worthItIf: body.worthItIf,
      featureImage: body.featureImage,
      featureImageAlt: body.featureImageAlt,
      gallery: body.gallery || [],
      categoryId: body.categoryId,
      areaId: body.areaId,
      venueId: body.venueId,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      startTime: body.startTime,
      endTime: body.endTime,
      recurring: body.recurring || false,
      recurrenceRule: body.recurrenceRule,
      priceType: body.priceType || 'PAID',
      priceMin: body.priceMin,
      priceMax: body.priceMax,
      ticketUrl: body.ticketUrl,
      websiteUrl: body.websiteUrl,
      status: body.status || 'DRAFT',
      featured: body.featured || false,
      sponsored: body.sponsored || false,
      sponsorName: body.sponsorName,
      familyFriendly: body.familyFriendly || false,
      isDaytime: body.isDaytime ?? true,
      isNightlife: body.isNightlife || false,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
    },
  })

  return NextResponse.json(event, { status: 201 })
}
