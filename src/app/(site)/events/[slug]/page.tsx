import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import EventCard from '@/components/cards/EventCard'
import { events, getEventBySlug } from '@/lib/seed-data'
import { formatEventDate, formatPrice, SITE_NAME, SITE_URL } from '@/lib/utils'
import { Calendar, Clock, MapPin, Tag, Ticket, Users, ExternalLink } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug)
  if (!event) return { title: 'Event Not Found' }

  return {
    title: `${event.title} | ${SITE_NAME}`,
    description: event.shortSummary || event.description?.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.shortSummary || event.description?.slice(0, 160),
      images: [{ url: event.featureImage }],
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }))
}

export default function EventPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  const relatedByVenue = events
    .filter((e) => e.venue.slug === event.venue.slug && e.slug !== event.slug)
    .slice(0, 4)

  const relatedByArea = events
    .filter((e) => e.area.slug === event.area.slug && e.slug !== event.slug)
    .slice(0, 4)

  const relatedEvents = events
    .filter((e) => e.category.slug === event.category.slug && e.slug !== event.slug)
    .slice(0, 4)

  // Event schema.org JSON-LD
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: `${SITE_URL}${event.featureImage}`,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB',
      },
    },
    ...(event.priceType === 'FREE'
      ? { isAccessibleForFree: true }
      : event.priceMin
        ? {
            offers: {
              '@type': 'Offer',
              price: event.priceMin,
              priceCurrency: 'GBP',
              availability: 'https://schema.org/InStock',
              ...(event.ticketUrl ? { url: event.ticketUrl } : {}),
            },
          }
        : {}),
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Events', href: '/events/browse' },
            { label: event.category.name, href: `/events/browse?category=${event.category.slug}` },
            { label: event.title },
          ]}
        />
      </div>

      {/* Feature Image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl sm:aspect-[2.5/1]">
          <Image
            src={event.featureImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white sm:left-6 sm:top-6"
            style={{ backgroundColor: event.category.color }}
          >
            {event.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
              {event.title}
            </h1>

            {event.shortSummary && (
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                {event.shortSummary}
              </p>
            )}

            {/* Date / Time / Venue info row */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-600" />
                <span className="font-medium">{formatEventDate(event.startDate, event.endDate)}</span>
              </div>
              {event.startTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-600" />
                  <span>{event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600" />
                <span>
                  {event.venue.name},{' '}
                  <Link
                    href={`/areas/${event.area.slug}`}
                    className="underline decoration-ink-200 underline-offset-2 hover:text-brand-600 hover:decoration-brand-300"
                  >
                    {event.area.name}
                  </Link>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-brand-600" />
                <span className="font-medium">{formatPrice(event.priceMin, event.priceMax, event.priceType)}</span>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {event.familyFriendly && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <Users className="h-3.5 w-3.5" />
                Family-Friendly
              </div>
            )}

            {/* Description */}
            {event.description && (
              <div className="mt-8">
                <p className="text-base leading-relaxed text-ink-700">
                  {event.description}
                </p>
              </div>
            )}

            {/* Why Go */}
            {event.whyGo && (
              <div className="mt-8 rounded-lg border border-brand-100 bg-brand-50/50 p-6">
                <h2 className="font-display text-xl font-bold text-ink-900">Why go</h2>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  {event.whyGo}
                </p>
              </div>
            )}

            {/* Worth It If */}
            {event.worthItIf && (
              <div className="mt-6 rounded-lg border border-ink-100 bg-ink-50/50 p-6">
                <h2 className="font-display text-xl font-bold text-ink-900">Worth it if...</h2>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  {event.worthItIf}
                </p>
              </div>
            )}

            {/* Map placeholder */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink-900">Getting there</h2>
              <div className="mt-4 flex aspect-[16/9] items-center justify-center rounded-lg border border-ink-200 bg-ink-50">
                <div className="text-center text-ink-400">
                  <MapPin className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-sm">Map coming soon</p>
                  <p className="mt-1 text-xs">{event.venue.name}, {event.area.name}, London</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Book Tickets CTA */}
              {event.ticketUrl && (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Book Tickets
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {/* Price info box */}
              <div className="rounded-lg border border-ink-100 p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-400">
                  Price
                </h3>
                <p className="mt-1 text-2xl font-bold text-ink-900">
                  {formatPrice(event.priceMin, event.priceMax, event.priceType)}
                </p>
              </div>

              {/* Quick info */}
              <div className="rounded-lg border border-ink-100 p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-400">
                  Details
                </h3>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-ink-500">Date</dt>
                    <dd className="mt-0.5 text-ink-900">{formatEventDate(event.startDate, event.endDate)}</dd>
                  </div>
                  {event.startTime && (
                    <div>
                      <dt className="font-medium text-ink-500">Time</dt>
                      <dd className="mt-0.5 text-ink-900">{event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-medium text-ink-500">Venue</dt>
                    <dd className="mt-0.5 text-ink-900">{event.venue.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink-500">Area</dt>
                    <dd className="mt-0.5">
                      <Link href={`/areas/${event.area.slug}`} className="text-brand-600 hover:text-brand-700">
                        {event.area.name}
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* More events at this venue */}
        {relatedByVenue.length > 0 && (
          <section className="mt-16 border-t border-ink-100 pt-10">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              More events at {event.venue.name}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedByVenue.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </section>
        )}

        {/* More events in this area */}
        {relatedByArea.length > 0 && (
          <section className="mt-16 border-t border-ink-100 pt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                More events in {event.area.name}
              </h2>
              <Link
                href={`/areas/${event.area.slug}`}
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedByArea.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </section>
        )}

        {/* Related events (by category) */}
        {relatedEvents.length > 0 && (
          <section className="mt-16 border-t border-ink-100 pt-10">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Related events
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedEvents.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
