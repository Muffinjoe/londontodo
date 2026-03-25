/**
 * Scrapes og:image from each event's ticket/website URL
 * to get the real event promotional image.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)

    if (!res.ok) return null

    const html = await res.text()

    // Try og:image first
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
    if (ogMatch?.[1]) return ogMatch[1]

    // Try twitter:image
    const twitterMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)
    if (twitterMatch?.[1]) return twitterMatch[1]

    return null
  } catch {
    return null
  }
}

async function main() {
  console.log('🖼️  Scraping real event images from ticket/event URLs...\n')

  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, title: true, ticketUrl: true, websiteUrl: true, featureImage: true },
  })

  let updated = 0
  let failed = 0

  for (const event of events) {
    // Try ticket URL first, then website URL
    const urls = [event.ticketUrl, event.websiteUrl].filter(Boolean) as string[]

    if (urls.length === 0) {
      continue
    }

    let foundImage: string | null = null

    for (const url of urls) {
      // Skip Google search result URLs
      if (url.includes('google.com/search') || url.includes('google.com/maps')) continue

      console.log(`  Checking: ${event.title} → ${url.slice(0, 60)}...`)
      foundImage = await getOgImage(url)

      if (foundImage) {
        // Make sure it's an absolute URL
        if (foundImage.startsWith('//')) foundImage = 'https:' + foundImage
        if (!foundImage.startsWith('http')) {
          try {
            foundImage = new URL(foundImage, url).toString()
          } catch {
            foundImage = null
          }
        }
        if (foundImage) break
      }
    }

    if (foundImage) {
      await prisma.event.update({
        where: { id: event.id },
        data: { featureImage: foundImage },
      })
      updated++
      console.log(`  ✅ ${event.title}`)
    } else {
      failed++
      console.log(`  ⬜ ${event.title} — no og:image found`)
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n🎉 Done! Updated ${updated} events with real images, ${failed} had no og:image`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
