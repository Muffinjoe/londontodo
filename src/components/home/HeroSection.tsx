import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { SeedArticle } from '@/lib/seed-data'

interface HeroSectionProps {
  article: SeedArticle
}

export default function HeroSection({ article }: HeroSectionProps) {
  const { slug, title, subtitle, featureImage, category, publishedAt, author } = article

  return (
    <section className="relative">
      <Link href={`/articles/${slug}`} className="group block">
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={featureImage}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
            <div className="mx-auto w-full max-w-7xl">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
              <h1 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base lg:text-lg">
                  {subtitle}
                </p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-white/60 sm:text-sm">
                <span>{author.name}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
                <span>{formatDate(publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
