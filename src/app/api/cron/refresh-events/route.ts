export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 minutes max for Vercel

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SERPAPI_KEY = process.env.SERPAPI_KEY || ''

interface SerpEvent {
  title: string
  date: { start_date: string; when: string }
  address: string[]
  link: string
  description: string
  ticket_info?: { source: string; link: string; link_type: string }[]
  venue?: { name: string }
  thumbnail?: string
  image?: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().slice(0, 80)
}

function categorize(title: string, desc: string): string {
  const t = (title + ' ' + desc).toLowerCase()
  if (t.includes('food') || t.includes('restaurant') || t.includes('brunch') || t.includes('tasting')) return 'food-drink'
  if (t.includes('comedy') || t.includes('club') || t.includes('dj') || t.includes('party') || t.includes('late night')) return 'nightlife'
  if (t.includes('kids') || t.includes('family') || t.includes('children')) return 'family'
  if (t.includes('market') || t.includes('fair') || t.includes('vintage')) return 'markets'
  if (t.includes('theatre') || t.includes('theater') || t.includes('musical') || t.includes('west end')) return 'theatre'
  if (t.includes('exhibition') || t.includes('gallery') || t.includes('museum') || t.includes('art')) return 'exhibitions'
  if (t.includes('concert') || t.includes('live music') || t.includes('gig')) return 'nightlife'
  if (t.includes('workshop') || t.includes('class') || t.includes('talk')) return 'culture'
  if (t.includes('dance') || t.includes('ballet')) return 'culture'
  return 'culture'
}

function extractArea(address: string[]): string {
  const full = address.join(' ').toLowerCase()
  const areas: Record<string, string> = {
    'shoreditch': 'shoreditch', 'soho': 'soho', 'camden': 'camden',
    'peckham': 'peckham', 'brixton': 'brixton', 'greenwich': 'greenwich',
    'notting hill': 'notting-hill', 'south bank': 'south-bank', 'southbank': 'south-bank',
    'covent garden': 'covent-garden', 'kensington': 'south-kensington',
    'hackney': 'shoreditch', 'islington': 'camden', 'dalston': 'shoreditch',
    'bermondsey': 'southwark', 'waterloo': 'south-bank', 'fitzrovia': 'soho',
    'marylebone': 'soho', 'west end': 'soho', 'mayfair': 'soho',
  }
  for (const [key, slug] of Object.entries(areas)) {
    if (full.includes(key)) return slug
  }
  return 'soho'
}

function parseEventDate(startDate: string): { start: Date; end: Date | null } {
  const now = new Date()
  const year = now.getFullYear()
  const dateMatch = startDate.match(/([A-Z][a-z]+)\s+(\d+)/)
  if (dateMatch) {
    const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
    const month = months[dateMatch[1]] ?? now.getMonth()
    const day = parseInt(dateMatch[2])
    const start = new Date(year, month, day, 10, 0, 0)
    if (start < now) start.setFullYear(year + 1)
    return { start, end: null }
  }
  return { start: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), end: null }
}

async function getOgImage(url: string): Promise<string | null> {
  if (url.includes('spotify.com') || url.includes('eventim.co.uk') || url.includes('google.com')) return null
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'facebookexternalhit/1.1', 'Accept': 'text/html' },
      redirect: 'follow',
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const html = await res.text()

    // Check for Eventbrite CDN
    const cdnMatch = html.match(/cdn\.evbuc\.com\/images\/(\d+\/\d+\/\d+\/original\.[^"'\s&]+)/i)
    if (cdnMatch) return `https://cdn.evbuc.com/images/${cdnMatch[1]}`

    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
    if (ogMatch?.[1]) {
      let img = ogMatch[1]
      if (img.startsWith('//')) img = 'https:' + img
      if (img.includes('_next/image')) return null
      if (img.startsWith('http')) return img
    }
    return null
  } catch { return null }
}

async function fetchEvents(query: string): Promise<SerpEvent[]> {
  const params = new URLSearchParams({ engine: 'google_events', q: query, hl: 'en', gl: 'uk', api_key: SERPAPI_KEY })
  const res = await fetch(`https://serpapi.com/search.json?${params}`)
  const data = await res.json()
  return (data.events_results || []) as SerpEvent[]
}

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Step 1: Archive past events
    const archiveResult = await prisma.event.updateMany({
      where: { status: 'PUBLISHED', startDate: { lt: new Date() } },
      data: { status: 'ARCHIVED' },
    })

    // Step 2: Fetch new events (8 queries = 8 SerpAPI searches)
    const queries = [
      'Events in London this week',
      'London concerts this week',
      'London exhibitions',
      'London theatre shows',
      'London comedy shows',
      'London food events',
      'Family events London',
      'London live music',
    ]

    const allEvents: SerpEvent[] = []
    const seenTitles = new Set<string>()

    for (const q of queries) {
      try {
        const events = await fetchEvents(q)
        for (const e of events) {
          if (!seenTitles.has(e.title.toLowerCase())) {
            seenTitles.add(e.title.toLowerCase())
            allEvents.push(e)
          }
        }
      } catch { /* skip failed queries */ }
    }

    // Step 3: Get category and area maps
    const cats = await prisma.category.findMany()
    const areas = await prisma.area.findMany()
    const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]))
    const areaMap = Object.fromEntries(areas.map(a => [a.slug, a.id]))

    // Step 4: Create new events
    let created = 0
    let skipped = 0

    for (const event of allEvents) {
      const slug = slugify(event.title)
      const existing = await prisma.event.findUnique({ where: { slug } })
      if (existing) { skipped++; continue }

      const catSlug = categorize(event.title, event.description || '')
      const areaSlug = extractArea(event.address || [])
      const { start, end } = parseEventDate(event.date?.start_date || '')
      const free = (event.description + ' ' + event.title).toLowerCase().includes('free')
      const ticketUrl = event.ticket_info?.find(t => t.link_type === 'tickets')?.link || event.link

      // Try to get a real image
      let featureImage = event.image || event.thumbnail || null
      if (!featureImage || featureImage.includes('encrypted-tbn')) {
        const scraped = ticketUrl ? await getOgImage(ticketUrl) : null
        featureImage = scraped || `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop`
      }

      // Get or create venue
      let venueId: string | undefined
      if (event.venue?.name) {
        const venueSlug = slugify(event.venue.name)
        const existingVenue = await prisma.venue.findUnique({ where: { slug: venueSlug } })
        if (existingVenue) {
          venueId = existingVenue.id
        } else {
          const newVenue = await prisma.venue.create({
            data: { name: event.venue.name, slug: venueSlug, address: event.address?.[0], areaId: areaMap[areaSlug] },
          })
          venueId = newVenue.id
        }
      }

      try {
        await prisma.event.create({
          data: {
            title: event.title,
            slug,
            description: event.description || 'Details coming soon.',
            shortSummary: event.description?.slice(0, 200) || null,
            featureImage,
            categoryId: catMap[catSlug] || catMap['culture'],
            areaId: areaMap[areaSlug],
            venueId,
            startDate: start,
            endDate: end,
            priceType: free ? 'FREE' : 'PAID',
            ticketUrl,
            websiteUrl: event.link,
            status: 'PUBLISHED',
            publishedAt: new Date(),
            isDaytime: true,
            isNightlife: catSlug === 'nightlife',
          },
        })
        created++
      } catch { /* skip duplicates or errors */ }
    }

    const totalPublished = await prisma.event.count({ where: { status: 'PUBLISHED' } })

    return NextResponse.json({
      success: true,
      archived: archiveResult.count,
      fetched: allEvents.length,
      created,
      skipped,
      totalPublished,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}
