import Image from 'next/image'
import Link from 'next/link'
import type { SeedArticle } from '@/lib/seed-data'

interface EditorsPicksModuleProps {
  articles: SeedArticle[]
}

export default function EditorsPicksModule({ articles }: EditorsPicksModuleProps) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <h3 className="font-display text-lg font-bold text-ink-900">
        Editor&apos;s Picks
      </h3>
      <div className="mt-4 space-y-4">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex gap-3"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={article.featureImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
              />
            </div>
            <div className="flex-1">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
              <h4 className="mt-1 text-sm font-semibold leading-snug text-ink-800 transition-colors group-hover:text-brand-600">
                {article.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
