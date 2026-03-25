import Image from 'next/image'
import Link from 'next/link'
import { cn, formatDate, truncate } from '@/lib/utils'
import CategoryChip from '@/components/shared/CategoryChip'
import Badge from '@/components/shared/Badge'
import { Clock } from 'lucide-react'

interface ArticleCardArticle {
  slug: string
  title: string
  excerpt: string
  featureImage: string
  category: { name: string; slug: string; color: string }
  publishedAt: string | Date
  author: { name: string }
  featured?: boolean
  sponsored?: boolean
  readingTime?: number
}

interface ArticleCardProps {
  article: ArticleCardArticle
  variant?: 'default' | 'large' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const {
    slug,
    title,
    excerpt,
    featureImage,
    category,
    publishedAt,
    author,
    featured,
    sponsored,
    readingTime,
  } = article

  if (variant === 'compact') {
    return (
      <Link
        href={`/articles/${slug}`}
        className="group flex gap-3"
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={featureImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
            {truncate(title, 60)}
          </h3>
          <p className="mt-0.5 text-xs text-ink-400">{formatDate(publishedAt)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'large') {
    return (
      <Link
        href={`/articles/${slug}`}
        className="group flex flex-col gap-5 md:flex-row md:gap-6"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg md:aspect-[3/2] md:w-1/2">
          <Image
            src={featureImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {(featured || sponsored) && (
            <div className="absolute left-3 top-3">
              <Badge type={sponsored ? 'sponsored' : 'featured'} />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <CategoryChip name={category.name} slug={category.slug} color={category.color} />
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink-900 transition-colors group-hover:text-brand-600 md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500 md:text-base">
            {truncate(excerpt, 180)}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-ink-400">
            <span>{author.name}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
            <span>{formatDate(publishedAt)}</span>
            {readingTime && (
              <>
                <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {readingTime} min read
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Default vertical card
  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={featureImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {(featured || sponsored) && (
          <div className="absolute left-3 top-3">
            <Badge type={sponsored ? 'sponsored' : 'featured'} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <CategoryChip name={category.name} slug={category.slug} color={category.color} />
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
          {title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">
          {truncate(excerpt, 120)}
        </p>
        <div className="mt-3 flex items-center gap-3 border-t border-ink-50 pt-3 text-xs text-ink-400">
          <span>{author.name}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
          <span>{formatDate(publishedAt)}</span>
          {readingTime && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readingTime} min
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
