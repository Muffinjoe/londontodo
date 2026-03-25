export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { toEventCard } from '@/lib/adapters'
import FilterableEvents from '@/components/events/FilterableEvents'
import { SITE_NAME } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `What's On in London | ${SITE_NAME}`,
  description:
    'Discover the best events happening in London right now. Exhibitions, theatre, music, markets, food festivals, and more.',
}

export default async function EventsBrowsePage() {
  const [dbEvents, categories, areas] = await Promise.all([
    prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true, area: true, venue: true },
      orderBy: { startDate: 'asc' },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.area.findMany({ orderBy: { name: 'asc' } }),
  ])

  const events = dbEvents.map((e) => ({
    ...toEventCard(e),
    familyFriendly: e.familyFriendly,
  }))

  const categoryOptions = categories.map((c) => ({ name: c.name, slug: c.slug }))
  const areaOptions = areas.map((a) => ({ name: a.name, slug: a.slug }))

  return <FilterableEvents events={events} categories={categoryOptions} areas={areaOptions} />
}
