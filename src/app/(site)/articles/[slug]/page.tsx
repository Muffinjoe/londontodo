import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getArticleBySlug,
  getRelatedArticles,
  getTrendingArticles,
  getFeaturedEvents,
  promos,
} from '@/lib/seed-data'
import { weekendArticleBody, shoreditchArticleBody } from '@/lib/seed-article-bodies'
import { cn, formatDate, readingTime, stripHtml, SITE_NAME, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import ShareButtons from '@/components/shared/ShareButtons'
import CategoryChip from '@/components/shared/CategoryChip'
import ArticleBody from '@/components/articles/ArticleBody'
import ArticleSidebar from '@/components/articles/ArticleSidebar'
import RelatedArticles from '@/components/articles/RelatedArticles'
import AuthorBio from '@/components/articles/AuthorBio'
import TableOfContents from '@/components/articles/TableOfContents'
import { Clock } from 'lucide-react'

// Map slug to article body
const bodyMap: Record<string, string> = {
  '15-best-things-to-do-in-london-this-weekend': weekendArticleBody,
  'locals-guide-to-shoreditch-right-now': shoreditchArticleBody,
}

function getArticleWithBody(slug: string) {
  const article = getArticleBySlug(slug)
  if (!article) return undefined
  return {
    ...article,
    body: bodyMap[slug] || article.body,
  }
}

// Add IDs to h2 headings so ToC links work
function addHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '')
    const decoded = text
      .replace(/&amp;/g, '&')
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&lsquo;/g, '\u2018')
      .replace(/&pound;/g, '\u00A3')
      .replace(/&#\d+;/g, (m: string) => String.fromCharCode(parseInt(m.slice(2, -1))))
    const id = decoded
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    return `<h2${attrs} id="${id}">${content}</h2>`
  })
}

// ─── Metadata ────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleWithBody(slug)
  if (!article) return { title: 'Article not found' }

  const plainExcerpt = stripHtml(article.excerpt)

  return {
    title: article.title,
    description: plainExcerpt,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: plainExcerpt,
      url: `${SITE_URL}/articles/${article.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: article.featureImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: plainExcerpt,
      images: [article.featureImage],
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleWithBody(slug)

  if (!article) {
    notFound()
  }

  const bodyWithIds = addHeadingIds(article.body)
  const readTime = readingTime(stripHtml(article.body))
  const articleUrl = `${SITE_URL}/articles/${article.slug}`

  const relatedArticles = getRelatedArticles(article.slug, 4)
  const trending = getTrendingArticles(5)
  const featuredEvents = getFeaturedEvents(4)

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: stripHtml(article.excerpt),
    image: `${SITE_URL}${article.featureImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: article.tags.join(', '),
    wordCount: stripHtml(article.body).split(/\s+/).length,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="container-editorial pb-6 pt-6 sm:pt-8">
        <Breadcrumbs
          items={[
            { label: article.category.name, href: `/${article.category.slug}` },
            { label: article.title },
          ]}
        />

        {/* Category kicker */}
        <div className="mb-3">
          <CategoryChip
            name={article.category.name}
            slug={article.category.slug}
            color={article.category.color}
            size="md"
          />
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight text-ink-900 text-balance sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        {/* Subtitle / dek */}
        {article.subtitle && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            {article.subtitle}
          </p>
        )}

        {/* Author row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-3">
            {article.author.image && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-ink-900">
                {article.author.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {readTime} min read
                </span>
                {article.updatedAt && (
                  <>
                    <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
                    <span>Updated {formatDate(article.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </div>
      </header>

      {/* ── Feature image ──────────────────────────────────── */}
      <div className="container-editorial">
        <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-lg sm:aspect-[21/9]">
          <Image
            src={article.featureImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </figure>
        {article.featureImageCaption && (
          <figcaption className="mt-2 text-center text-xs text-ink-400">
            {article.featureImageCaption}
          </figcaption>
        )}
      </div>

      {/* ── Two-column layout ──────────────────────────────── */}
      <div className="container-editorial mt-8 flex flex-col gap-10 lg:flex-row lg:gap-12">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          {/* Table of Contents for long articles */}
          <TableOfContents body={article.body} />

          {/* Article body */}
          <div className="mx-auto max-w-article">
            <ArticleBody body={bodyWithIds} promos={promos} />
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mx-auto mt-10 max-w-article border-t border-ink-100 pt-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?tag=${encodeURIComponent(tag)}`}
                    className={cn(
                      'inline-block rounded-full bg-ink-50 px-3 py-1 text-sm text-ink-600',
                      'transition-colors hover:bg-brand-50 hover:text-brand-600',
                    )}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author bio */}
          <div className="mx-auto mt-8 max-w-article">
            <AuthorBio author={article.author} />
          </div>
        </div>

        {/* Sidebar */}
        <ArticleSidebar
          trending={trending}
          events={featuredEvents}
          sponsored={promos}
        />
      </div>

      {/* ── Related articles ───────────────────────────────── */}
      <div className="container-editorial mt-12 pb-12">
        <RelatedArticles articles={relatedArticles} />
      </div>
    </article>
  )
}
