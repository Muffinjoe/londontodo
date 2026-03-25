import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { toArticleCard, toEventCard } from '@/lib/adapters'
import { cn, formatDate, readingTime, stripHtml, SITE_NAME, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import ShareButtons from '@/components/shared/ShareButtons'
import ArticleBody from '@/components/articles/ArticleBody'
import ArticleSidebar from '@/components/articles/ArticleSidebar'
import RelatedArticles from '@/components/articles/RelatedArticles'
import AuthorBio from '@/components/articles/AuthorBio'
import TableOfContents from '@/components/articles/TableOfContents'
import NewsletterBox from '@/components/shared/NewsletterBox'
import { Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: { category: true, area: true, author: true, tags: { include: { tag: true } } },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article not found' }

  const desc = article.excerpt || stripHtml(article.body).slice(0, 155)
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || desc,
    openGraph: {
      type: 'article',
      title: article.title,
      description: desc,
      url: `${SITE_URL}/articles/${article.slug}`,
      siteName: SITE_NAME,
      images: article.featureImage ? [{ url: article.featureImage, width: 1200, height: 630, alt: article.title }] : [],
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author?.name || SITE_NAME],
    },
  }
}

function addHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '')
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    return `<h2${attrs} id="${id}">${content}</h2>`
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const fallbackImg = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=700&fit=crop'
  const featureImage = article.featureImage || fallbackImg
  const bodyWithIds = addHeadingIds(article.body)
  const readTime = article.readingTime || readingTime(stripHtml(article.body))
  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const catName = article.category?.name || 'London'
  const catSlug = article.category?.slug || 'culture'
  const catColor = article.category?.color || '#6366f1'
  const authorName = article.author?.name || 'LondonTodo Editorial'
  const tags = article.tags?.map(t => t.tag.name) || []

  // Related articles and events
  const relatedArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED', slug: { not: slug } },
    include: { category: true, area: true, author: true },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  })

  const trending = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true, area: true, author: true },
    take: 5,
    orderBy: { publishedAt: 'desc' },
  })

  const featuredEvents = await prisma.event.findMany({
    where: { status: 'PUBLISHED', startDate: { gte: new Date() } },
    include: { category: true, area: true, venue: true },
    take: 3,
    orderBy: { startDate: 'asc' },
  })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || stripHtml(article.body).slice(0, 155),
    image: featureImage,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className="container-editorial pb-6 pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: catName, href: `/categories/${catSlug}` }, { label: article.title }]} />

        <div className="mb-3 mt-4">
          <Link href={`/categories/${catSlug}`} className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ backgroundColor: catColor }}>
            {catName}
          </Link>
        </div>

        <h1 className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-500 sm:text-xl">{article.subtitle}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div>
            <p className="text-sm font-medium text-ink-900">{authorName}</p>
            <div className="flex items-center gap-2 text-xs text-ink-400">
              {article.publishedAt && <time dateTime={article.publishedAt.toISOString()}>{formatDate(article.publishedAt)}</time>}
              <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{readTime} min read</span>
            </div>
          </div>
          <div className="ml-auto">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </div>
      </header>

      <div className="container-editorial">
        <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-lg sm:aspect-[21/9]">
          <Image src={featureImage} alt={article.featureImageAlt || article.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" priority />
        </figure>
      </div>

      <div className="container-editorial mt-8 flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="min-w-0 flex-1">
          <TableOfContents body={article.body} />
          <div className="mx-auto max-w-article">
            <ArticleBody body={bodyWithIds} />
          </div>

          {tags.length > 0 && (
            <div className="mx-auto mt-10 max-w-article border-t border-ink-100 pt-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag} href={`/search?tag=${encodeURIComponent(tag)}`} className={cn('inline-block rounded-full bg-ink-50 px-3 py-1 text-sm text-ink-600', 'transition-colors hover:bg-brand-50 hover:text-brand-600')}>
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 max-w-article">
            <AuthorBio author={{ name: authorName, bio: 'Part of the LondonTodo editorial team, covering the best of London.' }} />
          </div>

          <div className="mx-auto mt-8 max-w-article">
            <NewsletterBox variant="inline" />
          </div>
        </div>

        <aside className="w-full space-y-8 lg:sticky lg:top-28 lg:w-[340px] lg:flex-shrink-0 lg:self-start">
          {trending.length > 0 && (
            <div className="rounded-lg border border-ink-100 bg-white p-5">
              <h3 className="font-display text-base font-semibold text-ink-900">Popular this week</h3>
              <div className="mt-4 space-y-3">
                {trending.map((a, i) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className="flex gap-3 group">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink-50 text-xs font-bold text-ink-400">{i + 1}</span>
                    <span className="text-sm font-medium text-ink-700 group-hover:text-brand-600 transition-colors leading-snug">{a.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {featuredEvents.length > 0 && (
            <div className="rounded-lg border border-ink-100 bg-white p-5">
              <h3 className="font-display text-base font-semibold text-ink-900">Upcoming events</h3>
              <div className="mt-4 space-y-3">
                {featuredEvents.map((e) => (
                  <Link key={e.slug} href={`/events/${e.slug}`} className="block group">
                    <p className="text-sm font-medium text-ink-700 group-hover:text-brand-600 transition-colors">{e.title}</p>
                    <p className="text-xs text-ink-400">{e.venue?.name} · {formatDate(e.startDate)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <NewsletterBox variant="sidebar" />
        </aside>
      </div>

      <div className="container-editorial mt-12 pb-12">
        <RelatedArticles articles={relatedArticles.map(toArticleCard)} />
      </div>
    </article>
  )
}
