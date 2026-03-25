import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import { categories, getCategoryBySlug, getArticlesByCategory, getEventsByCategory } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.name} in London | ${SITE_NAME}`,
    description: `The best ${category.name.toLowerCase()} in London. Guides, reviews, and events curated by our editors.`,
    openGraph: {
      title: `${category.name} in London | ${SITE_NAME}`,
      description: `The best ${category.name.toLowerCase()} in London.`,
    },
  }
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const categoryArticles = getArticlesByCategory(category.slug, 9)
  const categoryEvents = getEventsByCategory(category.slug, 8)

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-ink-100 bg-ink-50/50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Categories' },
              { label: category.name },
            ]}
          />
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
              {category.name}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg text-ink-500">
            The best {category.name.toLowerCase()} in London. Guides, reviews, and events curated by our editors.
          </p>
        </div>
      </div>

      {/* Articles in this category */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900">
          Guides &amp; articles
        </h2>
        {categoryArticles.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-ink-400">No articles in this category yet.</p>
        )}
      </section>

      {/* Events in this category */}
      <section className="mx-auto max-w-7xl border-t border-ink-100 px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900">
          Upcoming events
        </h2>
        {categoryEvents.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-ink-400">No upcoming events in this category.</p>
        )}
      </section>
    </div>
  )
}
