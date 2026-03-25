'use client'

import { useState, useMemo } from 'react'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import { articles, events } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'
import { Search as SearchIcon, X } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (q.length < 2) return { articles: [], events: [] }

    const matchedArticles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.name.toLowerCase().includes(q)
    )

    const matchedEvents = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        e.venue.name.toLowerCase().includes(q) ||
        e.area.name.toLowerCase().includes(q) ||
        e.category.name.toLowerCase().includes(q) ||
        (e.tags && e.tags.some((t) => t.toLowerCase().includes(q)))
    )

    return { articles: matchedArticles, events: matchedEvents }
  }, [query])

  const totalResults = results.articles.length + results.events.length
  const hasQuery = query.trim().length >= 2

  return (
    <>
      <head>
        <title>{`Search | ${SITE_NAME}`}</title>
        <meta name="description" content="Search for events, articles, and things to do in London." />
      </head>

      <div className="bg-white">
        {/* Search header */}
        <div className="border-b border-ink-100 bg-ink-50/50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Search
            </h1>
            <div className="relative mt-6 max-w-xl">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, articles, areas..."
                autoFocus
                className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-10 text-base text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {hasQuery && (
              <p className="mt-3 text-sm text-ink-400">
                {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          {!hasQuery ? (
            <div className="py-16 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-ink-200" />
              <p className="mt-4 text-lg text-ink-400">
                Start typing to search events, articles, and more.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-ink-400">
                No results found for &ldquo;{query}&rdquo;.
              </p>
              <p className="mt-2 text-sm text-ink-400">
                Try different keywords or browse our categories.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Event results */}
              {results.events.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-ink-900">
                    Events ({results.events.length})
                  </h2>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {results.events.map((event) => (
                      <EventCard key={event.slug} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {/* Article results */}
              {results.articles.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-ink-900">
                    Articles ({results.articles.length})
                  </h2>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {results.articles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
