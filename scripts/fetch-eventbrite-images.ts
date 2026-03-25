/**
 * Uses WebFetch-style approach to get Eventbrite CDN image URLs.
 * Eventbrite blocks server-side og:image scraping but the raw CDN URLs work.
 * We extract the CDN image path from the encoded og:image URL.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fetchEventbriteImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    // Eventbrite sometimes works with specific headers
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'facebookexternalhit/1.1',  // FB bot gets og:image
        'Accept': 'text/html',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)
    if (!res.ok) return null

    const html = await res.text()

    // Look for CDN image URLs in the HTML
    const cdnMatch = html.match(/cdn\.evbuc\.com\/images\/(\d+\/\d+\/\d+\/original\.[^"'\s&]+)/i)
    if (cdnMatch) {
      return `https://cdn.evbuc.com/images/${cdnMatch[1]}`
    }

    // Try encoded version in og:image
    const ogMatch = html.match(/cdn\.evbuc\.com%2Fimages%2F(\d+)%2F(\d+)%2F(\d+)%2Foriginal\.([^"'\s&%]+)/i)
    if (ogMatch) {
      return `https://cdn.evbuc.com/images/${ogMatch[1]}/${ogMatch[2]}/${ogMatch[3]}/original.${ogMatch[4]}`
    }

    // Try any evbuc image reference
    const anyMatch = html.match(/img\.evbuc\.com[^"'\s]*images[^"'\s]*/i)
    if (anyMatch) {
      let decoded = decodeURIComponent(decodeURIComponent(anyMatch[0]))
      // Extract the raw CDN path
      const rawMatch = decoded.match(/cdn\.evbuc\.com\/images\/[^?&"'\s]+/)
      if (rawMatch) return 'https://' + rawMatch[0]
    }

    return null
  } catch {
    return null
  }
}

async function main() {
  const events = await prisma.event.findMany({
    where: {
      status: 'PUBLISHED',
      featureImage: { contains: 'unsplash.com' },
      ticketUrl: { contains: 'eventbrite' },
    },
    select: { id: true, title: true, ticketUrl: true },
  })

  console.log(`🎫 Fetching images for ${events.length} Eventbrite events...\n`)

  let fixed = 0
  for (const event of events) {
    if (!event.ticketUrl) continue

    console.log(`  Trying: ${event.title}`)
    const img = await fetchEventbriteImage(event.ticketUrl)

    if (img) {
      // Verify it loads
      try {
        const check = await fetch(img, { method: 'HEAD' })
        if (check.ok) {
          await prisma.event.update({ where: { id: event.id }, data: { featureImage: img } })
          fixed++
          console.log(`  ✅ ${event.title}`)
        } else {
          console.log(`  ⬜ Image returned ${check.status}`)
        }
      } catch {
        console.log(`  ⬜ Image check failed`)
      }
    } else {
      console.log(`  ⬜ No CDN image found`)
    }

    await new Promise(r => setTimeout(r, 500))
  }

  console.log(`\n🎉 Fixed ${fixed} Eventbrite events`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
