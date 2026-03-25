import Link from 'next/link'
import EventCard from '@/components/cards/EventCard'
import type { SeedEvent } from '@/lib/seed-data'
import { ChevronRight } from 'lucide-react'

interface FeaturedEventsProps {
  events: SeedEvent[]
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              What&apos;s on this week
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              The best events happening in London right now
            </p>
          </div>
          <Link
            href="/events"
            className="hidden items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 sm:flex"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {events.map((event) => (
            <div key={event.slug} className="w-72 flex-shrink-0 md:w-auto">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Mobile "See all" link */}
        <div className="mt-4 sm:hidden">
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm font-medium text-brand-600"
          >
            See all events
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
