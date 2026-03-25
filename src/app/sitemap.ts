import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://londontodo.com'

// Strategic sitemap - trickle out content, don't bomb with everything at once
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Core pages - always present
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/events/browse`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/this-weekend`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/free-in-london`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/new-in-london`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ]

  // In production, dynamically fetch published articles and events from DB
  // For now, return static pages only
  // When content is added via CMS, articles and events with status PUBLISHED
  // will be added here with proper lastModified dates

  return staticPages
}
