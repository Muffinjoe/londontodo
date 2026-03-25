import { prisma } from './prisma'

export async function getPublishedArticles(limit = 20) {
  return prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true, area: true, author: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: { category: true, area: true, author: true, tags: { include: { tag: true } } },
  })
}

export async function getPublishedEvents(limit = 20) {
  return prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true, area: true, venue: true },
    orderBy: { startDate: 'asc' },
    take: limit,
  })
}

export async function getFeaturedEvents(limit = 8) {
  return prisma.event.findMany({
    where: { status: 'PUBLISHED', startDate: { gte: new Date() } },
    include: { category: true, area: true, venue: true },
    orderBy: { startDate: 'asc' },
    take: limit,
  })
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { category: true, area: true, venue: true, tags: { include: { tag: true } } },
  })
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
}

export async function getAreas() {
  return prisma.area.findMany({ orderBy: { name: 'asc' } })
}

export async function getAreaBySlug(slug: string) {
  return prisma.area.findUnique({ where: { slug } })
}
