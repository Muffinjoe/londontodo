import Link from 'next/link'
interface TrendingArticle {
  slug: string
  title: string
  category: { name: string; color: string }
}

interface TrendingNowProps {
  articles: TrendingArticle[]
}

export default function TrendingNow({ articles }: TrendingNowProps) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <h3 className="font-display text-lg font-bold text-ink-900">
        Trending Now
      </h3>
      <div className="mt-4 space-y-4">
        {articles.slice(0, 5).map((article, idx) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex gap-3"
          >
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink-50 font-display text-sm font-bold text-ink-400 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              {idx + 1}
            </span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold leading-snug text-ink-800 transition-colors group-hover:text-brand-600">
                {article.title}
              </h4>
              <span
                className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
