import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import NewsletterBox from '@/components/shared/NewsletterBox'
import PromoCallout from '@/components/shared/PromoCallout'
import type { SeedArticle, SeedEvent, SeedPromo } from '@/lib/seed-data'
import { TrendingUp, Calendar, Sparkles } from 'lucide-react'

interface ArticleSidebarProps {
  trending: SeedArticle[]
  events: SeedEvent[]
  sponsored?: SeedPromo[]
}

export default function ArticleSidebar({ trending, events, sponsored }: ArticleSidebarProps) {
  return (
    <aside className="w-full space-y-8 lg:sticky lg:top-28 lg:w-[340px] lg:flex-shrink-0 lg:self-start">
      {/* Popular this week */}
      {trending.length > 0 && (
        <div className="rounded-lg border border-ink-100 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-600" />
            <h3 className="font-display text-base font-semibold text-ink-900">
              Popular this week
            </h3>
          </div>
          <div className="space-y-4">
            {trending.map((article, i) => (
              <div key={article.slug} className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink-50 font-body text-xs font-bold text-ink-400">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <ArticleCard article={article} variant="compact" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured events */}
      {events.length > 0 && (
        <div className="rounded-lg border border-ink-100 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-600" />
            <h3 className="font-display text-base font-semibold text-ink-900">
              Featured events
            </h3>
          </div>
          <div className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <NewsletterBox variant="sidebar" />

      {/* Sponsored picks */}
      {sponsored && sponsored.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2 px-1">
            <Sparkles className="h-4 w-4 text-ink-400" />
            <h3 className="font-display text-sm font-semibold text-ink-500">
              Sponsored picks
            </h3>
          </div>
          {sponsored.map((promo, i) => (
            <PromoCallout
              key={i}
              title={promo.title}
              description={promo.description}
              ctaText={promo.ctaText}
              ctaUrl={promo.ctaUrl}
              image={promo.image}
              sponsored={promo.sponsored}
            />
          ))}
        </div>
      )}
    </aside>
  )
}
