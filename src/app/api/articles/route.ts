export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || 'PUBLISHED'
  const category = searchParams.get('category')
  const area = searchParams.get('area')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  const where: Record<string, unknown> = { status }
  if (category) where.category = { slug: category }
  if (area) where.area = { slug: area }
  if (featured === 'true') where.featured = true

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { category: true, area: true, author: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.article.count({ where }),
  ])

  return NextResponse.json({ articles, total, limit, offset })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug: body.slug,
      kicker: body.kicker,
      subtitle: body.subtitle,
      excerpt: body.excerpt,
      body: body.body,
      featureImage: body.featureImage,
      featureImageAlt: body.featureImageAlt,
      categoryId: body.categoryId,
      areaId: body.areaId,
      authorId: body.authorId,
      status: body.status || 'DRAFT',
      featured: body.featured || false,
      sponsored: body.sponsored || false,
      sponsorName: body.sponsorName,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      ogImage: body.ogImage,
      canonicalUrl: body.canonicalUrl,
      readingTime: body.readingTime,
      aiGenerated: body.aiGenerated || false,
      aiTemplate: body.aiTemplate,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : body.publishedAt,
      scheduledAt: body.scheduledAt,
    },
  })

  // Handle tags
  if (body.tags?.length) {
    for (const tagName of body.tags) {
      const tag = await prisma.tag.upsert({
        where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
        create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, '-') },
        update: {},
      })
      await prisma.articleTag.create({
        data: { articleId: article.id, tagId: tag.id },
      })
    }
  }

  return NextResponse.json(article, { status: 201 })
}
