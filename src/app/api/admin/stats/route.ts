export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    totalEvents,
    publishedEvents,
    aiDrafts,
    subscribers,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
    prisma.event.count(),
    prisma.event.count({ where: { status: 'PUBLISHED' } }),
    prisma.aiDraft.count({ where: { status: { in: ['PENDING', 'READY'] } } }),
    prisma.subscriber.count(),
  ])

  return NextResponse.json({
    totalArticles,
    publishedArticles,
    draftArticles,
    totalEvents,
    publishedEvents,
    aiDrafts,
    subscribers,
  })
}
