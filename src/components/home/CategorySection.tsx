import Link from 'next/link'
import ArticleCard from '@/components/cards/ArticleCard'
import type { SeedArticle, SeedCategory } from '@/lib/seed-data'
import { ChevronRight } from 'lucide-react'

interface CategorySectionProps {
  category: SeedCategory
  articles: SeedArticle[]
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="py-8">
      {/* Section header */}
      <div className="mb-5 flex items-end justify-between border-b-2 pb-3" style={{ borderColor: category.color }}>
        <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
          {category.name}
        </h2>
        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center gap-0.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600"
        >
          More {category.name}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Article grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
