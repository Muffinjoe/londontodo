/**
 * Aggressively scrape images for all events still using Unsplash fallbacks.
 * Tries multiple sources: ticket URL, website URL, and Google search.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getOgImage(url: string): Promise<string | null> {
  try {
    // Skip URLs known to block/timeout
    if (url.includes('spotify.com') || url.includes('eventim.co.uk') || url.includes('google.com')) return null

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const html = await res.text()

    // og:image
    let match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
    if (match?.[1]) {
      let img = match[1]
      if (img.startsWith('//')) img = 'https:' + img
      if (!img.startsWith('http')) try { img = new URL(img, url).toString() } catch { return null }
      // Skip eventbrite _next/image URLs
      if (img.includes('_next/image')) {
        // Try to extract the actual image URL from the encoded parameter
        const innerMatch = img.match(/url=([^&]+)/)
        if (innerMatch) {
          const decoded = decodeURIComponent(decodeURIComponent(innerMatch[1]))
          if (decoded.startsWith('http')) return decoded
        }
        return null
      }
      return img
    }

    // twitter:image
    match = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)
    if (match?.[1]) {
      let img = match[1]
      if (img.startsWith('//')) img = 'https:' + img
      if (!img.startsWith('http')) try { img = new URL(img, url).toString() } catch { return null }
      return img
    }

    return null
  } catch {
    return null
  }
}

async function main() {
  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED', featureImage: { contains: 'unsplash.com' } },
    select: { id: true, title: true, slug: true, ticketUrl: true, websiteUrl: true },
  })

  console.log(`🖼️  Attempting to scrape images for ${events.length} events...\n`)

  let scraped = 0
  let failed = 0

  for (const event of events) {
    const urls = [event.ticketUrl, event.websiteUrl].filter(Boolean) as string[]
    if (!urls.length) { failed++; continue }

    let foundImage: string | null = null
    for (const url of urls) {
      foundImage = await getOgImage(url)
      if (foundImage) break
    }

    if (foundImage) {
      // Verify the image actually loads
      try {
        const check = await fetch(foundImage, { method: 'HEAD', redirect: 'follow' })
        if (check.ok) {
          await prisma.event.update({ where: { id: event.id }, data: { featureImage: foundImage } })
          scraped++
          console.log(`  ✅ ${event.title}`)
        } else {
          failed++
          console.log(`  ⬜ ${event.title} — image returned ${check.status}`)
        }
      } catch {
        failed++
        console.log(`  ⬜ ${event.title} — image check failed`)
      }
    } else {
      failed++
      console.log(`  ⬜ ${event.title}`)
    }

    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n🎉 Scraped ${scraped} real images, ${failed} still on fallbacks`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
