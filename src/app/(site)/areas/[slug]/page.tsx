import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import ArticleCard from '@/components/cards/ArticleCard'
import EventCard from '@/components/cards/EventCard'
import { areas, homepageAreas, getAreaBySlug, getArticlesByArea, getEventsByArea } from '@/lib/seed-data'
import { SITE_NAME } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = getAreaBySlug(params.slug)
  if (!area) return { title: 'Area Not Found' }

  return {
    title: `Things to Do in ${area.name} | ${SITE_NAME}`,
    description: `Discover the best things to do in ${area.name}, London. Events, restaurants, bars, exhibitions, and local guides.`,
    openGraph: {
      title: `Things to Do in ${area.name} | ${SITE_NAME}`,
      description: `Discover the best things to do in ${area.name}, London.`,
      images: [{ url: area.heroImage }],
    },
  }
}

export function generateStaticParams() {
  const allAreas = [...homepageAreas, ...areas]
  const seen = new Set<string>()
  return allAreas.filter(a => { if (seen.has(a.slug)) return false; seen.add(a.slug); return true }).map((area) => ({ slug: area.slug }))
}

export default function AreaPage({ params }: PageProps) {
  const area = getAreaBySlug(params.slug)
  if (!area) notFound()

  const areaArticles = getArticlesByArea(area.slug, 6)
  const areaEvents = getEventsByArea(area.slug, 6)
  const allAreas = [...homepageAreas, ...areas]
  const seen = new Set<string>()
  const dedupedAreas = allAreas.filter(a => { if (seen.has(a.slug)) return false; seen.add(a.slug); return true })
  const nearbyAreas = dedupedAreas.filter((a) => a.slug !== area.slug).slice(0, 4)

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-64 w-full sm:h-80 md:h-96">
        <Image
          src={area.heroImage}
          alt={area.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12">
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {area.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Areas', href: '/areas' },
            { label: area.name },
          ]}
        />
      </div>

      {/* Area Description */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="max-w-3xl text-lg leading-relaxed text-ink-600">
          {area.description}
        </p>
      </div>

      {/* Things to Do in {Area} */}
      {areaArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Things to do in {area.name}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Events in {Area} */}
      {areaEvents.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Events in {area.name}
            </h2>
            <Link
              href={`/events/browse?area=${area.slug}`}
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all events
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {areaEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Nearby Areas */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-ink-900">
          Nearby areas
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nearbyAreas.map((nearby) => (
            <Link
              key={nearby.slug}
              href={`/areas/${nearby.slug}`}
              className="group relative h-40 overflow-hidden rounded-lg"
            >
              <Image
                src={nearby.heroImage}
                alt={nearby.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="font-display text-lg font-bold text-white">
                  {nearby.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
