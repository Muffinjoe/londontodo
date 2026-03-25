import ArticleCard from '@/components/cards/ArticleCard'

interface ArticleShape {
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

interface RelatedArticlesProps {
  articles: ArticleShape[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <section className="border-t border-ink-100 pt-10">
      <h2 className="mb-6 font-display text-2xl font-bold text-ink-900">
        You might also like
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
