import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturedEvents from '@/components/home/FeaturedEvents'
import AreaDiscovery from '@/components/home/AreaDiscovery'
import TrendingNow from '@/components/home/TrendingNow'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import NewsletterBox from '@/components/shared/NewsletterBox'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils'
import { getPublishedArticles, getFeaturedEvents, getAreas } from '@/lib/data'
import { toArticleCard, toEventCard } from '@/lib/adapters'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `${SITE_NAME} — The Best Things to Do in London`,
  description: SITE_DESCRIPTION,
}

export default async function HomePage() {
  const [dbArticles, dbEvents, dbAreas] = await Promise.all([
    getPublishedArticles(12),
    getFeaturedEvents(8),
    getAreas(),
  ])

  const articles = dbArticles.map(toArticleCard)
  const events = dbEvents.map(toEventCard)
  const areas = dbAreas.filter(a => a.heroImage).map(a => ({
    name: a.name,
    slug: a.slug,
    heroImage: a.heroImage || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    description: a.description || '',
  }))

  const latestArticles = articles.slice(0, 6)
  const trendingArticles = articles.slice(0, 5)

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Featured Events ── */}
      {events.length > 0 && (
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
                  What&apos;s on in London
                </h2>
                <p className="mt-1 text-sm text-ink-500">
                  The best events happening in London right now
                </p>
              </div>
              <Link
                href="/events/browse"
                className="hidden items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 sm:flex"
              >
                See all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
              {events.slice(0, 8).map((event) => (
                <div key={event.slug} className="w-72 flex-shrink-0 md:w-auto">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Main content + sidebar ── */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left column (2/3) */}
          <div className="lg:col-span-2">
            {latestArticles.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-5 border-b-2 border-brand-600 pb-3 font-display text-xl font-extrabold text-ink-900 sm:text-2xl">
                  Latest
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {latestArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            )}

            {/* More events */}
            {events.length > 4 && (
              <div className="mb-10">
                <h2 className="mb-5 border-b-2 border-ink-200 pb-3 font-display text-xl font-extrabold text-ink-900 sm:text-2xl">
                  More events
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {events.slice(4, 8).map((event) => (
                    <EventCard key={event.slug} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column (1/3) */}
          <aside className="space-y-6">
            {trendingArticles.length > 0 && (
              <TrendingNow articles={trendingArticles} />
            )}
            <NewsletterBox variant="sidebar" />
          </aside>
        </div>
      </section>

      {/* ── Area Discovery (full width) ── */}
      {areas.length > 0 && (
        <AreaDiscovery areas={areas} />
      )}

      {/* ── Newsletter CTA (full width) ── */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-5">
          <NewsletterBox
            variant="inline"
            headline="Never miss the best of London"
            description="Get our editors' picks delivered to your inbox every Thursday morning."
          />
        </div>
      </section>
    </>
  )
}
