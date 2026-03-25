// Adapters to convert Prisma models to component-friendly shapes

type DbArticle = {
  slug: string
  title: string
  subtitle: string | null
  excerpt: string | null
  body: string
  featureImage: string | null
  publishedAt: Date | null
  readingTime: number | null
  featured: boolean
  sponsored: boolean
  category: { name: string; slug: string; color: string | null } | null
  area: { name: string; slug: string } | null
  author: { name: string | null; image: string | null } | null
}

type DbEvent = {
  slug: string
  title: string
  featureImage: string | null
  startDate: Date
  endDate: Date | null
  priceType: string
  priceMin: number | null
  priceMax: number | null
  featured: boolean
  sponsored: boolean
  category: { name: string; slug: string; color: string | null } | null
  area: { name: string; slug: string } | null
  venue: { name: string; slug: string } | null
}

export function toArticleCard(a: DbArticle) {
  return {
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle || undefined,
    excerpt: a.excerpt || '',
    body: a.body,
    featureImage: a.featureImage || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    category: {
      name: a.category?.name || 'London',
      slug: a.category?.slug || 'culture',
      color: a.category?.color || '#6366f1',
    },
    publishedAt: a.publishedAt?.toISOString() || new Date().toISOString(),
    author: { name: a.author?.name || 'LondonTodo Editorial' },
    featured: a.featured,
    sponsored: a.sponsored,
    readingTime: a.readingTime || undefined,
    tags: [] as string[],
  }
}

export function toEventCard(e: DbEvent) {
  return {
    slug: e.slug,
    title: e.title,
    featureImage: e.featureImage || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    startDate: e.startDate.toISOString(),
    endDate: e.endDate?.toISOString() || undefined,
    venue: { name: e.venue?.name || 'TBC', slug: e.venue?.slug || 'tbc' },
    area: { name: e.area?.name || 'London', slug: e.area?.slug || 'london' },
    priceType: e.priceType,
    priceMin: e.priceMin,
    priceMax: e.priceMax,
    category: {
      name: e.category?.name || 'Events',
      slug: e.category?.slug || 'culture',
      color: e.category?.color || '#6366f1',
    },
    featured: e.featured,
    sponsored: e.sponsored,
  }
}
