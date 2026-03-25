import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import NewsletterBox from '@/components/shared/NewsletterBox'
import { getWeekendEvents, getRecentArticles } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `This Weekend in London | ${SITE_NAME}`,
  description: 'The best things to do in London this weekend. Events, exhibitions, markets, food, and more — handpicked by our editors.',
  openGraph: {
    title: `This Weekend in London | ${SITE_NAME}`,
    description: 'The best things to do in London this weekend.',
  },
}

export default function ThisWeekendPage() {
  const weekendEvents = getWeekendEvents(8)
  const weekendArticles = getRecentArticles(6)

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
            Every weekend, curated
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            This Weekend in London
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Our editors pick the best events, exhibitions, and experiences worth your Saturday and Sunday.
          </p>
        </div>
      </div>

      {/* Weekend Events */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Weekend events
          </h2>
          <Link
            href="/events/browse?date=this-weekend"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weekendEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

      {/* Weekend Articles / Guides */}
      <section className="mx-auto max-w-7xl border-t border-ink-100 px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          Weekend guides
        </h2>
        <p className="mt-2 text-ink-500">
          Inspiration for your weekend — from neighbourhood walks to restaurant picks.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weekendArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <NewsletterBox
          variant="inline"
          headline="Get your weekend sorted"
          description="Every Thursday, we send out our editors' top weekend picks. Free, no spam, unsubscribe anytime."
        />
      </section>
    </div>
  )
}
