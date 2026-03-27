import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.londontodo.com'

// Strategic sitemap - trickle pages out gradually
// Only include pages that were "published" at least N days ago
// This prevents Google from seeing a sudden dump of 50+ pages

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages - always present from day 1
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/events/browse`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/this-weekend`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/free-in-london`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/new-in-london`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]

  // Articles - release in batches based on a schedule
  // Each batch unlocks after a certain number of days from site launch (March 25, 2026)
  const launchDate = new Date('2026-03-25')
  const daysSinceLaunch = Math.floor((now.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))

  // Promoted articles - release immediately (these drive traffic)
  const immediate = [
    { slug: 'cross-the-tracks-2026', date: '2026-03-25', priority: 0.9 },
    { slug: 'city-splash-2026', date: '2026-03-27', priority: 0.9 },
    { slug: 'city-splash-food-culture', date: '2026-03-27', priority: 0.7 },
    { slug: 'city-splash-first-timers-guide', date: '2026-03-27', priority: 0.7 },
  ]

  // Batch 1: Day 3+ (March 28)
  const batch1 = [
    { slug: 'best-things-to-do-in-london-2026', date: '2026-03-28', priority: 0.8 },
    { slug: 'free-things-to-do-in-london-2026', date: '2026-03-28', priority: 0.8 },
  ]

  // Batch 2: Day 5+ (March 30)
  const batch2 = [
    { slug: 'london-food-guide-where-to-eat', date: '2026-03-30', priority: 0.8 },
    { slug: 'perfect-day-in-london-itinerary', date: '2026-03-30', priority: 0.8 },
  ]

  // Batch 3: Day 7+ (April 1)
  const batch3 = [
    { slug: 'unique-unusual-things-to-do-london', date: '2026-04-01', priority: 0.7 },
    { slug: '15-best-things-to-do-in-london-this-weekend', date: '2026-04-01', priority: 0.7 },
    { slug: 'best-rooftop-bars-in-london-for-summer-2026', date: '2026-04-01', priority: 0.7 },
  ]

  // Batch 4: Day 10+ (April 4)
  const batch4 = [
    { slug: 'the-best-free-things-to-do-in-london-right-now', date: '2026-04-04', priority: 0.7 },
    { slug: 'a-locals-guide-to-shoreditch', date: '2026-04-04', priority: 0.7 },
    { slug: 'where-to-eat-in-soho-the-definitive-guide', date: '2026-04-04', priority: 0.7 },
  ]

  // Batch 5: Day 14+ (April 8)
  const batch5 = [
    { slug: 'best-exhibitions-in-london-this-month', date: '2026-04-08', priority: 0.7 },
    { slug: 'londons-best-comedy-clubs-a-complete-guide', date: '2026-04-08', priority: 0.7 },
    { slug: '10-hidden-gems-in-london-most-tourists-miss', date: '2026-04-08', priority: 0.7 },
    { slug: 'best-markets-in-london-from-borough-to-brick-lane', date: '2026-04-08', priority: 0.7 },
    { slug: 'family-days-out-in-london-the-ultimate-guide', date: '2026-04-08', priority: 0.7 },
  ]

  const allBatches = [...immediate, ...batch1, ...batch2, ...batch3, ...batch4, ...batch5]

  for (const article of allBatches) {
    const releaseDate = new Date(article.date)
    if (now >= releaseDate) {
      pages.push({
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: releaseDate,
        changeFrequency: 'monthly',
        priority: article.priority,
      })
    }
  }

  // Category pages - release at day 7+
  if (daysSinceLaunch >= 7) {
    const categories = ['food-drink', 'culture', 'nightlife', 'exhibitions', 'markets', 'family', 'free', 'theatre']
    for (const cat of categories) {
      pages.push({
        url: `${SITE_URL}/categories/${cat}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  // Area pages - release at day 10+
  if (daysSinceLaunch >= 10) {
    const areas = ['shoreditch', 'soho', 'camden', 'peckham', 'brixton', 'greenwich', 'notting-hill', 'south-bank']
    for (const area of areas) {
      pages.push({
        url: `${SITE_URL}/areas/${area}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return pages
}
