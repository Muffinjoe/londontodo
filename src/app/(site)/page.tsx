import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturedEvents from '@/components/home/FeaturedEvents'
import CategorySection from '@/components/home/CategorySection'
import AreaDiscovery from '@/components/home/AreaDiscovery'
import TrendingNow from '@/components/home/TrendingNow'
import EditorsPicksModule from '@/components/home/EditorsPicksModule'
import ArticleCard from '@/components/cards/ArticleCard'
import NewsletterBox from '@/components/shared/NewsletterBox'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils'
import {
  homepageArticles,
  homepageEvents,
  homepageAreas,
  categories,
} from '@/lib/seed-data'

export const metadata: Metadata = {
  title: `${SITE_NAME} — The Best Things to Do in London`,
  description: SITE_DESCRIPTION,
}

export default function HomePage() {
  // Derive content from seed data
  const heroArticle = homepageArticles[0]
  const latestArticles = homepageArticles.slice(1, 7)
  const trendingArticles = homepageArticles.slice(0, 5)
  const editorsPicks = [homepageArticles[2], homepageArticles[4], homepageArticles[9]]

  // Group articles by category for category sections
  const foodDrinkArticles = homepageArticles.filter(
    (a) => a.category.slug === 'food-drink'
  )
  const cultureArticles = homepageArticles.filter(
    (a) => a.category.slug === 'culture'
  )
  const nightlifeArticles = homepageArticles.filter(
    (a) => a.category.slug === 'nightlife'
  )

  const foodDrinkCategory = categories.find((c) => c.slug === 'food-drink')!
  const cultureCategory = categories.find((c) => c.slug === 'culture')!
  const nightlifeCategory = categories.find((c) => c.slug === 'nightlife')!

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection article={heroArticle} />

      {/* ── Featured Events ── */}
      <FeaturedEvents events={homepageEvents} />

      {/* ── Main content + sidebar ── */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left column (2/3) */}
          <div className="lg:col-span-2">
            {/* Latest articles */}
            <div className="mb-10">
              <h2 className="mb-5 border-b-2 border-brand-600 pb-3 font-display text-xl font-bold text-ink-900 sm:text-2xl">
                Latest
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>

            {/* Category sections */}
            <CategorySection
              category={foodDrinkCategory}
              articles={foodDrinkArticles}
            />
            <CategorySection
              category={cultureCategory}
              articles={cultureArticles}
            />
          </div>

          {/* Right column (1/3) */}
          <aside className="space-y-6">
            <TrendingNow articles={trendingArticles} />
            <EditorsPicksModule articles={editorsPicks} />
            <NewsletterBox variant="sidebar" />
          </aside>
        </div>
      </section>

      {/* ── Area Discovery (full width) ── */}
      <AreaDiscovery areas={homepageAreas} />

      {/* ── More categories (full width) ── */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <CategorySection
          category={nightlifeCategory}
          articles={nightlifeArticles}
        />
      </section>

      {/* ── Newsletter CTA (full width) ── */}
      <section className="bg-ink-900 py-12">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Never miss the best of London
          </h2>
          <p className="mt-2 text-sm text-ink-300 sm:text-base">
            Get our editors&apos; picks delivered to your inbox every Thursday morning.
          </p>
          <div className="mt-6">
            <NewsletterBox
              variant="inline"
              headline=""
              description=""
            />
          </div>
        </div>
      </section>
    </>
  )
}
