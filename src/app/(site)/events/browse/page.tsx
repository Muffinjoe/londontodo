'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import EventCard from '@/components/cards/EventCard'
import { events, areas, categories } from '@/lib/seed-data'
import { cn, SITE_NAME } from '@/lib/utils'

// Note: generateMetadata cannot be used with "use client" — metadata is set via head tag
// In production, this page would be a server component with a client filter wrapper

type DateFilter = 'all' | 'today' | 'tomorrow' | 'this-weekend' | 'this-week' | 'this-month'

export default function EventsBrowsePage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [areaFilter, setAreaFilter] = useState('all')
  const [freeOnly, setFreeOnly] = useState(false)
  const [familyOnly, setFamilyOnly] = useState(false)

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (categoryFilter !== 'all' && event.category.slug !== categoryFilter) return false
      if (areaFilter !== 'all' && event.area.slug !== areaFilter) return false
      if (freeOnly && event.priceType !== 'FREE') return false
      if (familyOnly && !event.familyFriendly) return false
      // Date filtering would use real date logic in production
      return true
    })
  }, [dateFilter, categoryFilter, areaFilter, freeOnly, familyOnly])

  const dateOptions: { value: DateFilter; label: string }[] = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-weekend', label: 'This Weekend' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
  ]

  return (
    <>
      <head>
        <title>{`What's On in London | ${SITE_NAME}`}</title>
        <meta name="description" content="Discover the best events happening in London right now. Exhibitions, theatre, music, markets, food festivals, and more." />
      </head>

      <div className="bg-white">
        {/* Hero */}
        <div className="border-b border-ink-100 bg-ink-50/50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
              What&apos;s On in London
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-500">
              Discover the best events, exhibitions, and experiences happening across the city right now.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 z-30 border-b border-ink-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 py-4">
              {/* Date pills */}
              <div className="flex flex-wrap gap-2">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDateFilter(opt.value)}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                      dateFilter === opt.value
                        ? 'bg-brand-600 text-white'
                        : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="hidden h-6 w-px bg-ink-200 sm:block" />

              {/* Category dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>

              {/* Area dropdown */}
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                <option value="all">All Areas</option>
                {areas.map((area) => (
                  <option key={area.slug} value={area.slug}>{area.name}</option>
                ))}
              </select>

              <div className="hidden h-6 w-px bg-ink-200 sm:block" />

              {/* Toggles */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                Free
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
                <input
                  type="checkbox"
                  checked={familyOnly}
                  onChange={(e) => setFamilyOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                Family-Friendly
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-ink-400">No events match your filters.</p>
              <button
                onClick={() => {
                  setDateFilter('all')
                  setCategoryFilter('all')
                  setAreaFilter('all')
                  setFreeOnly(false)
                  setFamilyOnly(false)
                }}
                className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-ink-400">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
