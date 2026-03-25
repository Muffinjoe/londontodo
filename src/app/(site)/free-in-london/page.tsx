import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import { getFreeEvents, articles } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Free Things to Do in London | ${SITE_NAME}`,
  description: 'The best free things to do in London right now. Free events, exhibitions, museums, markets, parks, and more.',
  openGraph: {
    title: `Free Things to Do in London | ${SITE_NAME}`,
    description: 'The best free things to do in London right now.',
  },
}

export default function FreeInLondonPage() {
  const freeEvents = getFreeEvents(8)
  // Filter articles that mention "free" in tags or title
  const freeArticles = articles.filter(
    (a) => a.tags.includes('free') || a.tags.includes('free things') || a.title.toLowerCase().includes('free')
  ).slice(0, 6)
  // Fallback if no free articles
  const displayArticles = freeArticles.length > 0 ? freeArticles : articles.slice(0, 3)

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="border-b border-ink-100 bg-ink-50/50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Free
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
            Free Things to Do in London
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-500">
            London is full of brilliant free experiences. From world-class museums to street markets and parks, here is the best of what the city offers for nothing.
          </p>
        </div>
      </div>

      {/* Free Events */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Free events
          </h2>
          <Link
            href="/events/browse?free=true"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all free events
          </Link>
        </div>
        {freeEvents.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freeEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-ink-400">No free events listed right now. Check back soon.</p>
        )}
      </section>

      {/* Free Activity Guides */}
      <section className="mx-auto max-w-7xl border-t border-ink-100 px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          Free activity guides
        </h2>
        <p className="mt-2 text-ink-500">
          In-depth guides to the best free things London has to offer.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Quick list of always-free things */}
      <section className="mx-auto max-w-7xl border-t border-ink-100 px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          Always free in London
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'British Museum', detail: 'Bloomsbury — world history under one roof' },
            { title: 'Tate Modern', detail: 'South Bank — modern and contemporary art' },
            { title: 'National Gallery', detail: 'Trafalgar Square — masterpieces from the 13th century onwards' },
            { title: 'V&A Museum', detail: 'South Kensington — art, design, and performance' },
            { title: 'Natural History Museum', detail: 'South Kensington — dinosaurs, minerals, and wildlife' },
            { title: 'Hyde Park & Kensington Gardens', detail: 'Central London — 625 acres of green space' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-ink-100 p-4 transition-colors hover:bg-ink-50/50"
            >
              <h3 className="font-display text-base font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
