/**
 * Fetches real London events from SerpAPI Google Events
 * and seeds the database with them.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SERPAPI_KEY = process.env.SERPAPI_KEY || ''

interface SerpEvent {
  title: string
  date: { start_date: string; when: string }
  address: string[]
  link: string
  description: string
  ticket_info?: { source: string; link: string; link_type: string }[]
  venue?: { name: string; rating?: number; reviews?: number }
  thumbnail?: string
  image?: string
}

// Map event titles/descriptions to our categories
function categorize(title: string, desc: string): string {
  const t = (title + ' ' + desc).toLowerCase()
  if (t.includes('food') || t.includes('restaurant') || t.includes('dining') || t.includes('brunch') || t.includes('supper') || t.includes('tasting') || t.includes('market') && t.includes('food')) return 'food-drink'
  if (t.includes('concert') || t.includes('live music') || t.includes('gig') || t.includes('band')) return 'culture'
  if (t.includes('dance') || t.includes('ballet')) return 'culture'
  if (t.includes('workshop') || t.includes('class') || t.includes('course')) return 'culture'
  if (t.includes('pub') || t.includes('beer') || t.includes('ale') || t.includes('brewery')) return 'food-drink'
  if (t.includes('comedy') || t.includes('club') || t.includes('dj') || t.includes('nightclub') || t.includes('party') || t.includes('late night')) return 'nightlife'
  if (t.includes('kids') || t.includes('family') || t.includes('children') || t.includes('half term')) return 'family'
  if (t.includes('market') || t.includes('fair') || t.includes('flea') || t.includes('vintage')) return 'markets'
  if (t.includes('theatre') || t.includes('theater') || t.includes('musical') || t.includes('west end') || t.includes('play')) return 'theatre'
  if (t.includes('exhibition') || t.includes('gallery') || t.includes('museum') || t.includes('art')) return 'exhibitions'
  if (t.includes('free') || t.includes('no cost') || t.includes('complimentary')) return 'free'
  return 'culture'
}

// Extract area from address
function extractArea(address: string[]): string {
  const full = address.join(' ').toLowerCase()
  const areas: Record<string, string> = {
    'shoreditch': 'shoreditch', 'soho': 'soho', 'camden': 'camden',
    'peckham': 'peckham', 'brixton': 'brixton', 'greenwich': 'greenwich',
    'notting hill': 'notting-hill', 'south bank': 'south-bank', 'southbank': 'south-bank',
    'covent garden': 'covent-garden', 'kensington': 'south-kensington',
    'westminster': 'southwark', 'bankside': 'south-bank', 'hackney': 'shoreditch',
    'islington': 'camden', 'dalston': 'shoreditch', 'bermondsey': 'southwark',
    'waterloo': 'south-bank', 'king\'s cross': 'camden', 'stratford': 'shoreditch',
    'east london': 'shoreditch', 'west end': 'soho', 'mayfair': 'soho',
    'fitzrovia': 'soho', 'marylebone': 'soho', 'lambeth': 'south-bank',
  }
  for (const [key, slug] of Object.entries(areas)) {
    if (full.includes(key)) return slug
  }
  return 'soho' // default
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().slice(0, 80)
}

// Parse date from SerpAPI "when" field
function parseEventDate(when: string, startDate: string): { start: Date; end: Date | null } {
  const now = new Date()
  const year = now.getFullYear()

  // Try to parse the start_date like "Mar 28" or "Apr 5"
  const dateMatch = startDate.match(/([A-Z][a-z]+)\s+(\d+)/)
  if (dateMatch) {
    const monthStr = dateMatch[1]
    const day = parseInt(dateMatch[2])
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    }
    const month = months[monthStr] ?? now.getMonth()
    const start = new Date(year, month, day, 10, 0, 0)
    // If date is in the past, push to next year
    if (start < now) start.setFullYear(year + 1)
    return { start, end: null }
  }

  return { start: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), end: null }
}

// Determine if event is free
function isFree(event: SerpEvent): boolean {
  const text = (event.description + ' ' + event.title).toLowerCase()
  if (text.includes('free entry') || text.includes('free admission') || text.includes('free event') || text.includes('no cost')) return true
  const ticketText = event.ticket_info?.map(t => t.source).join(' ').toLowerCase() || ''
  if (ticketText.includes('free')) return true
  return false
}

async function fetchLondonEvents(query: string, chips?: string): Promise<SerpEvent[]> {
  const params = new URLSearchParams({
    engine: 'google_events',
    q: query,
    hl: 'en',
    gl: 'uk',
    api_key: SERPAPI_KEY,
  })
  if (chips) params.set('htichips', chips)

  console.log(`  Fetching: ${query}${chips ? ` (${chips})` : ''}`)
  const res = await fetch(`https://serpapi.com/search.json?${params}`)
  const data = await res.json()

  if (!data.events_results) {
    console.log(`  No results for: ${query}`)
    return []
  }

  return data.events_results as SerpEvent[]
}

async function main() {
  console.log('🔍 Fetching London events from Google Events via SerpAPI...\n')

  // Fetch different queries to get variety
  // Original queries (already fetched, skipping):
  // 'Events in London', 'Events in London this weekend', 'Free events in London',
  // 'Exhibitions in London', 'London food events', 'London theatre shows',
  // 'London comedy shows', 'Family events London', 'London markets this week',
  // 'New openings London'

  const queries = [
    { q: 'London concerts this week', chips: undefined },
    { q: 'London art exhibitions 2026', chips: undefined },
    { q: 'London west end shows', chips: undefined },
    { q: 'London outdoor events spring', chips: undefined },
    { q: 'London pub events', chips: undefined },
    { q: 'London dance shows', chips: undefined },
    { q: 'London live music this week', chips: undefined },
    { q: 'London workshops this week', chips: undefined },
  ]

  const allEvents: SerpEvent[] = []
  const seenTitles = new Set<string>()

  for (const { q, chips } of queries) {
    try {
      const events = await fetchLondonEvents(q, chips)
      for (const e of events) {
        if (!seenTitles.has(e.title.toLowerCase())) {
          seenTitles.add(e.title.toLowerCase())
          allEvents.push(e)
        }
      }
      // Small delay between requests
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.error(`  Error fetching "${q}":`, err)
    }
  }

  console.log(`\n📊 Found ${allEvents.length} unique events\n`)

  // Ensure categories exist
  const categoryMap: Record<string, string> = {}
  const cats = await prisma.category.findMany()
  for (const c of cats) categoryMap[c.slug] = c.id

  // Ensure areas exist
  const areaMap: Record<string, string> = {}
  const areas = await prisma.area.findMany()
  for (const a of areas) areaMap[a.slug] = a.id

  let created = 0
  let skipped = 0

  for (const event of allEvents) {
    const slug = slugify(event.title)

    // Skip if already exists
    const existing = await prisma.event.findUnique({ where: { slug } })
    if (existing) {
      skipped++
      continue
    }

    const catSlug = categorize(event.title, event.description || '')
    const areaSlug = extractArea(event.address || [])
    const { start, end } = parseEventDate(event.date?.when || '', event.date?.start_date || '')
    const free = isFree(event)

    // Find or skip venue
    let venueId: string | undefined
    if (event.venue?.name) {
      const venueSlug = slugify(event.venue.name)
      const existingVenue = await prisma.venue.findUnique({ where: { slug: venueSlug } })
      if (existingVenue) {
        venueId = existingVenue.id
      } else {
        const newVenue = await prisma.venue.create({
          data: {
            name: event.venue.name,
            slug: venueSlug,
            address: event.address?.[0],
            areaId: areaMap[areaSlug],
            websiteUrl: event.link,
          },
        })
        venueId = newVenue.id
      }
    }

    // Get ticket URL
    const ticketUrl = event.ticket_info?.find(t => t.link_type === 'tickets')?.link || event.link

    // Determine time info from the "when" string
    let startTime: string | undefined
    const timeMatch = event.date?.when?.match(/(\d{1,2}:\d{2})\s*(AM|PM|GMT)?/i)
    if (timeMatch) {
      startTime = timeMatch[1]
    }

    try {
      await prisma.event.create({
        data: {
          title: event.title,
          slug,
          description: event.description || 'Details coming soon.',
          shortSummary: event.description?.slice(0, 200) || null,
          featureImage: event.image || event.thumbnail || `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop`,
          categoryId: categoryMap[catSlug] || categoryMap['culture'],
          areaId: areaMap[areaSlug],
          venueId,
          startDate: start,
          endDate: end,
          startTime,
          priceType: free ? 'FREE' : 'PAID',
          ticketUrl,
          websiteUrl: event.link,
          status: 'PUBLISHED',
          publishedAt: new Date(),
          familyFriendly: catSlug === 'family',
          isDaytime: true,
          isNightlife: catSlug === 'nightlife',
        },
      })
      created++
      console.log(`  ✅ ${event.title}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ❌ ${event.title}: ${msg.slice(0, 100)}`)
    }
  }

  console.log(`\n🎉 Done! Created ${created} events, skipped ${skipped} duplicates`)

  // Print summary
  const totalEvents = await prisma.event.count({ where: { status: 'PUBLISHED' } })
  console.log(`📊 Total published events in database: ${totalEvents}`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
