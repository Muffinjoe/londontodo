import type { Metadata } from 'next'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import { getRecentArticles, events } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `New in London | ${SITE_NAME}`,
  description: 'The latest openings, new events, and freshest things to do in London. Stay ahead of what\'s new in the city.',
  openGraph: {
    title: `New in London | ${SITE_NAME}`,
    description: 'The latest openings, new events, and freshest things to do in London.',
  },
}

export default function NewInLondonPage() {
  const recentArticles = getRecentArticles(6)
  // For seed data, treat all events as "new"
  const latestEvents = [...events]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 8)

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="border-b border-ink-100 bg-ink-50/50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
            New
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
            New in London
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-500">
            The latest openings, newest events, and freshest things to do in the city. Updated daily by our editors.
          </p>
        </div>
      </div>

      {/* New Events / Openings */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          Latest events
        </h2>
        <p className="mt-2 text-ink-500">
          Just announced or recently opened.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="mx-auto max-w-7xl border-t border-ink-100 px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          Recent articles
        </h2>
        <p className="mt-2 text-ink-500">
          Our latest guides, reviews, and neighbourhood stories.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
