export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ articles: [], events: [] })
  }

  const [articles, events] = await Promise.all([
    prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { excerpt: { contains: q, mode: 'insensitive' } },
          { body: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { category: true, area: true, author: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    }),
    prisma.event.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { category: true, area: true, venue: true },
      orderBy: { startDate: 'asc' },
      take: 10,
    }),
  ])

  return NextResponse.json({ articles, events })
}
