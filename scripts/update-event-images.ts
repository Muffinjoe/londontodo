/**
 * Re-fetches London events from SerpAPI and updates database events
 * with the real Google event images instead of Unsplash fallbacks.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SERPAPI_KEY = process.env.SERPAPI_KEY || ''

interface SerpEvent {
  title: string
  thumbnail?: string
  image?: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().slice(0, 80)
}

async function fetchEvents(query: string): Promise<SerpEvent[]> {
  const params = new URLSearchParams({
    engine: 'google_events',
    q: query,
    hl: 'en',
    gl: 'uk',
    api_key: SERPAPI_KEY,
  })

  console.log(`  Fetching: ${query}`)
  const res = await fetch(`https://serpapi.com/search.json?${params}`)
  const data = await res.json()
  return (data.events_results || []) as SerpEvent[]
}

async function main() {
  console.log('🖼️  Fetching real event images from Google Events...\n')

  // Use fewer queries to stay under API limit (we've used ~10 already)
  const queries = [
    'Events in London this week',
    'London theatre shows',
    'London comedy shows this week',
    'London exhibitions',
    'London food events this week',
    'Family events London',
  ]

  // Build a map of title -> image URL
  const imageMap = new Map<string, string>()

  for (const q of queries) {
    try {
      const events = await fetchEvents(q)
      for (const e of events) {
        const img = e.image || e.thumbnail
        if (img) {
          imageMap.set(slugify(e.title), img)
        }
      }
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.error(`  Error: ${err}`)
    }
  }

  console.log(`\n📊 Found images for ${imageMap.size} events\n`)

  // Update database events with real images
  const dbEvents = await prisma.event.findMany({ where: { status: 'PUBLISHED' } })
  let updated = 0

  for (const event of dbEvents) {
    const img = imageMap.get(event.slug)
    if (img) {
      await prisma.event.update({
        where: { id: event.id },
        data: { featureImage: img },
      })
      updated++
      console.log(`  ✅ ${event.title}`)
    }
  }

  console.log(`\n🎉 Updated ${updated} events with real images`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
