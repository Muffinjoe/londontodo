/**
 * 1. Fix ALL broken Unsplash IDs in the database
 * 2. Re-scrape og:image from ticket URLs for events still using fallbacks
 * 3. Assign category-appropriate Unsplash images to anything still missing
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Broken Unsplash IDs mapped to working replacements
const BROKEN_IDS: Record<string, string> = {
  '1545042746-ec9e50e7db86': '1526129318478-62ed807ebdf9',
  '1517502884422-e8e5f25a7bff': '1520986606214-8b456906c813',
  '1533929736562-87b04b5ba4ea': '1517248135467-4c7edcad34c4',
  '1528809217021-151305b04551': '1526129318478-62ed807ebdf9',
  '1582719471384-894fbb16564e': '1529655683826-aba9b3e77383',
  '1414235077428-338989a2e8c0': '1506501139174-099022df5260',
}

// Category-specific working Unsplash images
const CATEGORY_IMAGES: Record<string, string> = {
  'nightlife':    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
  'food-drink':   'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'culture':      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
  'exhibitions':  'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop',
  'theatre':      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop',
  'family':       'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=600&fit=crop',
  'markets':      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'free':         'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=800&h=600&fit=crop',
}
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop'

async function getOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'Accept': 'text/html' },
      redirect: 'follow',
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const html = await res.text()
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
    if (ogMatch?.[1]) {
      let img = ogMatch[1]
      if (img.startsWith('//')) img = 'https:' + img
      if (!img.startsWith('http')) img = new URL(img, url).toString()
      return img
    }
    const twMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)
    if (twMatch?.[1]) {
      let img = twMatch[1]
      if (img.startsWith('//')) img = 'https:' + img
      if (!img.startsWith('http')) img = new URL(img, url).toString()
      return img
    }
    return null
  } catch {
    return null
  }
}

async function testUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return res.ok
  } catch {
    return false
  }
}

async function main() {
  console.log('🔧 Step 1: Fix broken Unsplash IDs...\n')

  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true },
  })

  let step1Fixed = 0
  for (const event of events) {
    if (!event.featureImage) continue
    let img = event.featureImage
    let changed = false
    for (const [broken, working] of Object.entries(BROKEN_IDS)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.event.update({ where: { id: event.id }, data: { featureImage: img } })
      step1Fixed++
    }
  }
  console.log(`  Fixed ${step1Fixed} broken Unsplash IDs\n`)

  // Reload events
  const updatedEvents = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true },
  })

  console.log('🔧 Step 2: Test all images and scrape replacements for broken ones...\n')

  let step2Fixed = 0
  let step2Fallback = 0
  for (const event of updatedEvents) {
    const img = event.featureImage || ''

    // Test if current image works
    const isUnsplash = img.includes('unsplash.com')
    let needsReplacement = !img

    if (isUnsplash) {
      // We already fixed known broken IDs, but let's verify
      const works = await testUrl(img)
      if (!works) needsReplacement = true
    }

    if (!needsReplacement) continue

    // Try scraping from ticket URL
    const urls = [event.ticketUrl, event.websiteUrl].filter(Boolean) as string[]
    let foundImage: string | null = null

    for (const url of urls) {
      if (url.includes('google.com')) continue
      foundImage = await getOgImage(url)
      if (foundImage) break
    }

    if (foundImage) {
      await prisma.event.update({ where: { id: event.id }, data: { featureImage: foundImage } })
      step2Fixed++
      console.log(`  ✅ ${event.title} (scraped)`)
    } else {
      // Use category-appropriate fallback
      const catSlug = event.category?.slug || 'culture'
      const fallback = CATEGORY_IMAGES[catSlug] || DEFAULT_IMAGE
      await prisma.event.update({ where: { id: event.id }, data: { featureImage: fallback } })
      step2Fallback++
      console.log(`  📷 ${event.title} (category fallback)`)
    }

    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\n🎉 Done!`)
  console.log(`  Step 1: ${step1Fixed} broken Unsplash IDs fixed`)
  console.log(`  Step 2: ${step2Fixed} images scraped, ${step2Fallback} category fallbacks`)

  // Also fix articles
  console.log('\n🔧 Step 3: Fix article images...\n')
  const articles = await prisma.article.findMany()
  let artFixed = 0
  for (const a of articles) {
    if (!a.featureImage) continue
    let img = a.featureImage
    let changed = false
    for (const [broken, working] of Object.entries(BROKEN_IDS)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.article.update({ where: { id: a.id }, data: { featureImage: img } })
      artFixed++
    }
  }
  console.log(`  Fixed ${artFixed} article images`)

  // Fix areas
  const areas = await prisma.area.findMany()
  let areaFixed = 0
  for (const a of areas) {
    if (!a.heroImage) continue
    let img = a.heroImage
    let changed = false
    for (const [broken, working] of Object.entries(BROKEN_IDS)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.area.update({ where: { id: a.id }, data: { heroImage: img } })
      areaFixed++
    }
  }
  console.log(`  Fixed ${areaFixed} area images`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
