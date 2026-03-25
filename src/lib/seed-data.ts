// Seed data for LondonTodo.com — used for development before DB is wired up

export interface SeedAuthor {
  name: string
  image?: string
  bio?: string
  slug: string
}

export interface SeedCategory {
  name: string
  slug: string
  color: string
}

export interface SeedArticle {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  body: string
  featureImage: string
  featureImageCaption?: string
  category: SeedCategory
  tags: string[]
  author: SeedAuthor
  publishedAt: string
  updatedAt?: string
  featured?: boolean
  sponsored?: boolean
}

export interface SeedArea {
  name: string
  slug: string
  heroImage: string
  description: string
}

export interface SeedEvent {
  slug: string
  title: string
  venue: { name: string; slug: string }
  area: { name: string; slug: string }
  featureImage: string
  category: SeedCategory
  startDate: string
  endDate?: string | null
  startTime?: string
  endTime?: string
  priceType?: string
  priceMin?: number | null
  priceMax?: number | null
  ticketUrl?: string | null
  description?: string
  shortSummary?: string
  whyGo?: string
  worthItIf?: string
  featured?: boolean
  sponsored?: boolean
  familyFriendly?: boolean
  isDaytime?: boolean
  isNightlife?: boolean
  tags?: string[]
}

export interface SeedPromo {
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  image?: string
  sponsored?: boolean
}

// ─── Authors ─────────────────────────────────────────────────────────

export const authors: SeedAuthor[] = [
  {
    name: 'Sophie Ellis',
    slug: 'sophie-ellis',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: 'Sophie is LondonTodo\'s senior editor. She has lived in London for 15 years and specialises in food, culture, and neighbourhood guides. When she isn\'t hunting down the city\'s best new openings, you\'ll find her walking the Thames Path.',
  },
  {
    name: 'Marcus Chen',
    slug: 'marcus-chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: 'Marcus covers nightlife, music, and east London culture for LondonTodo. A Hackney local since 2012, he knows every back-street bar and warehouse party worth visiting.',
  },
  {
    name: 'Priya Sharma',
    slug: 'priya-sharma',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    bio: 'Priya writes about exhibitions, theatre, and free things to do in London. She believes the city\'s best experiences don\'t have to cost a fortune.',
  },
]

// ─── Categories ──────────────────────────────────────────────────────

export const categories: SeedCategory[] = [
  { name: 'Things to Do', slug: 'things-to-do', color: '#ed1148' },
  { name: 'Food & Drink', slug: 'food-drink', color: '#f59e0b' },
  { name: 'Culture', slug: 'culture', color: '#6366f1' },
  { name: 'Neighbourhoods', slug: 'neighbourhoods', color: '#10b981' },
  { name: 'Free', slug: 'free', color: '#06b6d4' },
  { name: 'Nightlife', slug: 'nightlife', color: '#8b5cf6' },
]

// ─── Articles ────────────────────────────────────────────────────────

export const articles: SeedArticle[] = [
  {
    slug: '15-best-things-to-do-in-london-this-weekend',
    title: '15 Best Things to Do in London This Weekend',
    subtitle: 'From a blockbuster new exhibition at the V&A to a free jazz festival on the South Bank — your weekend sorted.',
    excerpt: 'Our editors pick the unmissable events, openings, and experiences happening across London this weekend.',
    body: '', // Loaded from seed-article-bodies.ts
    featureImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
    featureImageCaption: 'The South Bank at golden hour. Photo: LondonTodo / James Wright',
    category: { name: 'Things to Do', slug: 'things-to-do', color: '#ed1148' },
    tags: ['weekend', 'events', 'exhibitions', 'markets', 'free things'],
    author: authors[0],
    publishedAt: '2026-03-20T08:00:00Z',
    updatedAt: '2026-03-21T10:30:00Z',
    featured: true,
  },
  {
    slug: 'locals-guide-to-shoreditch-right-now',
    title: "A Local's Guide to Shoreditch Right Now",
    subtitle: 'Beyond the street art and vintage shops — where east Londoners actually eat, drink, and hang out in 2026.',
    excerpt: 'Shoreditch has changed a lot, but it\'s still one of London\'s most exciting neighbourhoods. Here\'s what the locals know.',
    body: '', // Loaded from seed-article-bodies.ts
    featureImage: 'https://images.unsplash.com/photo-1517502884422-e8e5f25a7bff?w=1200&h=800&fit=crop',
    featureImageCaption: 'Redchurch Street on a Saturday morning. Photo: LondonTodo / Amy Park',
    category: { name: 'Neighbourhoods', slug: 'neighbourhoods', color: '#10b981' },
    tags: ['shoreditch', 'east london', 'restaurants', 'bars', 'neighbourhood guide'],
    author: authors[1],
    publishedAt: '2026-03-18T09:00:00Z',
    featured: false,
  },
  {
    slug: 'best-free-exhibitions-london-spring-2026',
    title: 'The Best Free Exhibitions in London This Spring',
    subtitle: 'World-class art and photography you can see without spending a penny.',
    excerpt: 'London\'s galleries are packed with brilliant free exhibitions this spring. Here are the ones our editors loved most.',
    body: '<p>Placeholder body content.</p>',
    featureImage: 'https://images.unsplash.com/photo-1545042746-ec9e50e7db86?w=1200&h=800&fit=crop',
    featureImageCaption: 'Inside the Turbine Hall at Tate Modern. Photo: LondonTodo',
    category: { name: 'Free', slug: 'free', color: '#06b6d4' },
    tags: ['free', 'exhibitions', 'art', 'galleries', 'spring'],
    author: authors[2],
    publishedAt: '2026-03-15T07:30:00Z',
    featured: false,
  },
  {
    slug: 'best-new-restaurants-london-march-2026',
    title: 'The Best New Restaurants in London: March 2026',
    subtitle: 'Every big opening worth booking this month.',
    excerpt: 'From a new Fitzrovia Italian to a Brixton wine bar — our pick of the month\'s best restaurant openings.',
    body: '<p>Placeholder body content.</p>',
    featureImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
    category: { name: 'Food & Drink', slug: 'food-drink', color: '#f59e0b' },
    tags: ['restaurants', 'new openings', 'food', 'dining'],
    author: authors[0],
    publishedAt: '2026-03-12T08:00:00Z',
    featured: false,
  },
  {
    slug: 'south-bank-culture-walk',
    title: 'The Ultimate South Bank Culture Walk',
    subtitle: 'A mile of galleries, theatres, and street food — all in one afternoon.',
    excerpt: 'Walk from Westminster Bridge to Tower Bridge hitting every cultural highlight along the way.',
    body: '<p>Placeholder body content.</p>',
    featureImage: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=1200&h=800&fit=crop',
    category: { name: 'Culture', slug: 'culture', color: '#6366f1' },
    tags: ['south bank', 'walking', 'culture', 'free things', 'galleries'],
    author: authors[2],
    publishedAt: '2026-03-10T09:00:00Z',
    featured: false,
  },
  {
    slug: 'best-rooftop-bars-london',
    title: '12 Best Rooftop Bars in London for 2026',
    subtitle: 'Skyline views and cocktails — the city\'s finest elevated drinking spots.',
    excerpt: 'As the weather warms up, these are the rooftop bars where you\'ll want to be sipping sundowners.',
    body: '<p>Placeholder body content.</p>',
    featureImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=800&fit=crop',
    category: { name: 'Nightlife', slug: 'nightlife', color: '#8b5cf6' },
    tags: ['bars', 'rooftop', 'cocktails', 'nightlife', 'summer'],
    author: authors[1],
    publishedAt: '2026-03-08T08:00:00Z',
    featured: false,
  },
]

// ─── Areas ───────────────────────────────────────────────────────────

export const areas: SeedArea[] = [
  { name: 'South Kensington', slug: 'south-kensington', heroImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=1200&h=600&fit=crop', description: 'Home to the V&A, Natural History Museum, and Science Museum, South Kensington is London\'s cultural powerhouse. Beautiful garden squares, French patisseries, and world-class institutions make it essential.' },
  { name: 'Southwark', slug: 'southwark', heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop', description: 'From the towering Shard to Borough Market\'s food stalls, Southwark blends old London charm with modern energy. The riverside walk from Tate Modern to Tower Bridge is unmissable.' },
  { name: 'South Bank', slug: 'south-bank', heroImage: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=1200&h=600&fit=crop', description: 'The cultural corridor along the Thames. Home to the Southbank Centre, National Theatre, BFI, and some of the best street food in London.' },
  { name: 'Kew', slug: 'kew', heroImage: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=1200&h=600&fit=crop', description: 'A leafy corner of southwest London, home to the world-famous Royal Botanic Gardens. Village charm, riverside walks, and botanical beauty.' },
  { name: 'Shoreditch', slug: 'shoreditch', heroImage: 'https://images.unsplash.com/photo-1517502884422-e8e5f25a7bff?w=1200&h=600&fit=crop', description: 'East London\'s creative heartland. Street art, independent coffee shops, rooftop bars, and some of the city\'s best galleries.' },
  { name: 'Soho', slug: 'soho', heroImage: 'https://images.unsplash.com/photo-1533929736562-87b04b5ba4ea?w=1200&h=600&fit=crop', description: 'The beating heart of London\'s West End. World-class dining, legendary bars, independent cinemas, and nightlife in every direction.' },
  { name: 'Camden', slug: 'camden', heroImage: 'https://images.unsplash.com/photo-1528809217021-151305b04551?w=1200&h=600&fit=crop', description: 'Loud, proud, and unapologetically alternative. Camden\'s famous market, live music venues, and canal-side pubs make it unmissable.' },
  { name: 'Covent Garden', slug: 'covent-garden', heroImage: 'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?w=1200&h=600&fit=crop', description: 'London\'s theatrical heart. Street performers, boutique shopping, world-class restaurants, and the Royal Opera House.' },
]

// ─── Events ──────────────────────────────────────────────────────────

export const events: SeedEvent[] = [
  {
    slug: 'v-and-a-kimono-to-catwalk',
    title: 'Kimono: Kyoto to Catwalk',
    venue: { name: 'V&A Museum', slug: 'v-and-a-museum' },
    area: { name: 'South Kensington', slug: 'south-kensington' },
    featureImage: 'https://images.unsplash.com/photo-1545042746-ec9e50e7db86?w=1200&h=700&fit=crop',
    category: { name: 'Exhibition', slug: 'exhibitions', color: '#6366f1' },
    startDate: '2026-03-20',
    endDate: '2026-06-28',
    startTime: '10:00',
    endTime: '17:45',
    priceType: 'PAID',
    priceMin: 18,
    priceMax: 22,
    ticketUrl: 'https://www.vam.ac.uk/exhibitions/kimono',
    description: 'This landmark exhibition explores the kimono\'s journey from the streets of Edo-period Kyoto to the global fashion stage. Featuring over 300 garments, textiles, and accessories, it traces how this iconic garment has inspired designers from Chanel to Alexander McQueen.',
    shortSummary: 'A stunning journey through the global influence of the kimono.',
    whyGo: 'The V&A has pulled together an extraordinary collection here. The craftsmanship on display is breathtaking, and the exhibition traces a fascinating story of cultural exchange across centuries.',
    worthItIf: 'You love fashion, textile art, or Japanese culture — or if you appreciate a beautifully curated museum exhibition.',
    featured: true,
    sponsored: false,
    familyFriendly: true,
    isDaytime: true,
    isNightlife: false,
    tags: ['exhibition', 'fashion', 'art', 'japanese-culture'],
  },
  {
    slug: 'borough-market-spring-festival',
    title: 'Borough Market Spring Festival',
    venue: { name: 'Borough Market', slug: 'borough-market' },
    area: { name: 'Southwark', slug: 'southwark' },
    featureImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=700&fit=crop',
    category: { name: 'Food & Drink', slug: 'food-drink', color: '#f59e0b' },
    startDate: '2026-03-22',
    endDate: '2026-03-23',
    startTime: '10:00',
    endTime: '17:00',
    priceType: 'FREE',
    ticketUrl: null,
    description: 'Borough Market celebrates the arrival of spring with a weekend of special tastings, cooking demos from top chefs, and seasonal produce from the market\'s best traders.',
    shortSummary: 'A free weekend of food tastings and spring produce at London\'s most famous market.',
    whyGo: 'Borough Market at its best — the traders go all out for this one, and the cooking demos are genuinely worth watching.',
    worthItIf: 'You love good food and want a free, delicious weekend outing in central London.',
    featured: false,
    sponsored: false,
    familyFriendly: true,
    isDaytime: true,
    isNightlife: false,
    tags: ['food', 'market', 'free', 'family-friendly'],
  },
  {
    slug: 'south-bank-jazz-weekend',
    title: 'EFG London Jazz Weekend',
    venue: { name: 'Southbank Centre', slug: 'southbank-centre' },
    area: { name: 'South Bank', slug: 'south-bank' },
    featureImage: 'https://images.unsplash.com/photo-1533929736562-87b04b5ba4ea?w=1200&h=700&fit=crop',
    category: { name: 'Music', slug: 'music', color: '#8b5cf6' },
    startDate: '2026-03-21',
    endDate: '2026-03-23',
    startTime: '12:00',
    endTime: '23:00',
    priceType: 'PAID',
    priceMin: 0,
    priceMax: 35,
    ticketUrl: 'https://www.southbankcentre.co.uk/jazz',
    description: 'Three days of world-class jazz at the Southbank Centre, with performances across the Royal Festival Hall, Queen Elizabeth Hall, and free stages throughout the building.',
    shortSummary: 'Three days of world-class jazz on the South Bank — with free and ticketed performances.',
    whyGo: 'The mix of free and paid events means everyone can enjoy something. The atmosphere across the whole Southbank Centre is electric during this weekend.',
    worthItIf: 'You\'re a jazz fan, or even just jazz-curious. The free stages are a brilliant way to discover new artists.',
    featured: true,
    sponsored: false,
    familyFriendly: true,
    isDaytime: true,
    isNightlife: true,
    tags: ['jazz', 'music', 'festival', 'live-music'],
  },
  {
    slug: 'kew-orchid-festival',
    title: 'Kew Orchid Festival 2026',
    venue: { name: 'Kew Gardens', slug: 'kew-gardens' },
    area: { name: 'Kew', slug: 'kew' },
    featureImage: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=1200&h=700&fit=crop',
    category: { name: 'Exhibition', slug: 'exhibitions', color: '#6366f1' },
    startDate: '2026-02-08',
    endDate: '2026-03-30',
    startTime: '10:00',
    endTime: '16:30',
    priceType: 'PAID',
    priceMin: 15,
    priceMax: null,
    ticketUrl: 'https://www.kew.org/orchids',
    description: 'The Princess of Wales Conservatory is transformed into a tropical paradise filled with thousands of orchids. This year\'s theme celebrates the biodiversity of Costa Rica.',
    shortSummary: 'Thousands of orchids transform Kew\'s famous conservatory.',
    whyGo: 'It\'s one of the most Instagrammable exhibitions in London, and the colours are genuinely jaw-dropping. Combine it with a walk around the gardens.',
    worthItIf: 'You love flowers, photography, or just want a stunning day out that doesn\'t feel like a typical museum visit.',
    featured: false,
    sponsored: false,
    familyFriendly: true,
    isDaytime: true,
    isNightlife: false,
    tags: ['exhibition', 'flowers', 'nature', 'family-friendly'],
  },
  {
    slug: 'brick-lane-vintage-market',
    title: 'Brick Lane Vintage Market',
    venue: { name: 'The Old Truman Brewery', slug: 'old-truman-brewery' },
    area: { name: 'Shoreditch', slug: 'shoreditch' },
    featureImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=700&fit=crop',
    category: { name: 'Markets', slug: 'markets', color: '#10b981' },
    startDate: '2026-03-22',
    endDate: null,
    startTime: '11:00',
    endTime: '18:00',
    priceType: 'FREE',
    ticketUrl: null,
    description: 'London\'s biggest and best vintage market, housed inside the Old Truman Brewery on Brick Lane. Over 100 dealers selling vintage fashion, records, furniture, and collectibles.',
    shortSummary: 'Over 100 vintage dealers in Shoreditch\'s iconic Truman Brewery.',
    whyGo: 'The sheer variety is unbeatable — you\'ll find everything from 1960s dresses to rare jazz records. The surrounding Brick Lane food scene is a bonus.',
    worthItIf: 'You love vintage fashion, vinyl, or just browsing. It\'s also a great rainy-day activity.',
    featured: false,
    sponsored: false,
    familyFriendly: true,
    isDaytime: true,
    isNightlife: false,
    tags: ['vintage', 'market', 'shopping', 'free'],
  },
]

// ─── Promos ──────────────────────────────────────────────────────────

export const promos: SeedPromo[] = [
  {
    title: 'Get 2-for-1 on London exhibitions',
    description: 'Use code LONDONTODO at checkout for 2-for-1 entry to top exhibitions this month — including the V&A, Science Museum, and Design Museum.',
    ctaText: 'Claim offer',
    ctaUrl: 'https://example.com/promo',
    image: 'https://images.unsplash.com/photo-1545042746-ec9e50e7db86?w=400&h=300&fit=crop',
    sponsored: true,
  },
  {
    title: 'Citymapper — Plan your weekend',
    description: 'Get real-time transport updates and the fastest routes to every event in this guide.',
    ctaText: 'Download free',
    ctaUrl: 'https://example.com/citymapper',
    sponsored: true,
  },
]

// ─── Unified lookups (merge both data sources) ─────────────────────

function allArticles(): SeedArticle[] {
  const slugs = new Set<string>()
  const result: SeedArticle[] = []
  // Homepage articles take priority (they have Unsplash images)
  for (const a of [...homepageArticles, ...articles]) {
    if (!slugs.has(a.slug)) {
      slugs.add(a.slug)
      result.push(a)
    }
  }
  return result
}

function allEvents(): SeedEvent[] {
  const slugs = new Set<string>()
  const result: SeedEvent[] = []
  for (const e of [...homepageEvents, ...events]) {
    if (!slugs.has(e.slug)) {
      slugs.add(e.slug)
      result.push(e)
    }
  }
  return result
}

function allAreas(): SeedArea[] {
  const slugs = new Set<string>()
  const result: SeedArea[] = []
  for (const a of [...homepageAreas, ...areas]) {
    if (!slugs.has(a.slug)) {
      slugs.add(a.slug)
      result.push(a)
    }
  }
  return result
}

export function getArticleBySlug(slug: string): SeedArticle | undefined {
  return allArticles().find((a) => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, limit = 4): SeedArticle[] {
  return allArticles().filter((a) => a.slug !== currentSlug).slice(0, limit)
}

export function getTrendingArticles(limit = 5): SeedArticle[] {
  return allArticles().slice(0, limit)
}

export function getFeaturedEvents(limit = 4): SeedEvent[] {
  return allEvents().slice(0, limit)
}

export function getEventBySlug(slug: string): SeedEvent | undefined {
  return allEvents().find((e) => e.slug === slug)
}

export function getAreaBySlug(slug: string): SeedArea | undefined {
  return allAreas().find((a) => a.slug === slug)
}

export function getCategoryBySlug(slug: string): SeedCategory | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getArticlesByArea(areaSlug: string, limit = 6): SeedArticle[] {
  return allArticles().slice(0, limit)
}

export function getEventsByArea(areaSlug: string, limit = 6): SeedEvent[] {
  return allEvents().filter((e) => e.area.slug === areaSlug).slice(0, limit)
}

export function getArticlesByCategory(categorySlug: string, limit = 8): SeedArticle[] {
  return allArticles().filter((a) => a.category.slug === categorySlug).slice(0, limit)
}

export function getEventsByCategory(categorySlug: string, limit = 6): SeedEvent[] {
  return allEvents().filter((e) => e.category.slug === categorySlug).slice(0, limit)
}

export function getFreeEvents(limit = 8): SeedEvent[] {
  return allEvents().filter((e) => e.priceType === 'FREE').slice(0, limit)
}

export function getWeekendEvents(limit = 8): SeedEvent[] {
  return allEvents().slice(0, limit)
}

export function getRecentArticles(limit = 6): SeedArticle[] {
  return [...allArticles()].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit)
}

// ─── Unsplash image helper (for homepage seed) ──────────────────────

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop`

// ─── Homepage-specific seed data ────────────────────────────────────

const hpCats = {
  foodDrink:   { name: 'Food & Drink',       slug: 'food-drink',        color: '#f59e0b' },
  culture:     { name: 'Culture',             slug: 'culture',           color: '#6366f1' },
  nightlife:   { name: 'Nightlife',           slug: 'nightlife',         color: '#8b5cf6' },
  family:      { name: 'Family',              slug: 'family',            color: '#10b981' },
  markets:     { name: 'Markets',             slug: 'markets',           color: '#d35400' },
  theatre:     { name: 'Theatre',             slug: 'theatre',           color: '#c0392b' },
  free:        { name: 'Free Things To Do',   slug: 'free-things-to-do', color: '#06b6d4' },
  exhibitions: { name: 'Exhibitions',         slug: 'exhibitions',       color: '#2980b9' },
  areas:       { name: 'Neighbourhoods',      slug: 'neighbourhoods',    color: '#10b981' },
  film:        { name: 'Film',                slug: 'film',              color: '#7f8c8d' },
}

export const homepageArticles: SeedArticle[] = [
  {
    slug: '15-best-things-to-do-in-london-this-weekend',
    title: '15 Best Things to Do in London This Weekend',
    subtitle: 'From a blockbuster new exhibition at the V&A to a free jazz festival on the South Bank — your weekend sorted.',
    excerpt: 'Our editors pick the unmissable events, openings, and experiences happening across London this weekend.',
    body: '',
    featureImage: unsplash('1513635269975-59663e0ac1ad', 1200, 800),
    category: { name: 'Things to Do', slug: 'things-to-do', color: '#ed1148' },
    tags: ['weekend', 'events'],
    author: authors[0],
    publishedAt: '2026-03-24T09:00:00Z',
    featured: true,
  },
  {
    slug: 'best-rooftop-bars-london-summer',
    title: 'Best Rooftop Bars in London for Summer Evenings',
    subtitle: 'Sip cocktails above the skyline at London\'s finest rooftop bars.',
    excerpt: 'Sip cocktails above the skyline at London\'s finest rooftop bars, from Shoreditch to the South Bank.',
    body: '',
    featureImage: unsplash('1514933651103-005eec06c04b'),
    category: hpCats.foodDrink,
    tags: ['bars', 'rooftop', 'summer'],
    author: authors[1],
    publishedAt: '2026-03-23T10:30:00Z',
  },
  {
    slug: 'new-exhibitions-london-this-month',
    title: 'New Exhibitions Worth Seeing in London This Month',
    subtitle: 'The latest gallery openings and must-see shows across the capital.',
    excerpt: 'The latest gallery openings and must-see exhibitions across the capital, from the Tate to tiny independent spaces.',
    body: '',
    featureImage: unsplash('1545042746-ec9e50e7db86'),
    category: hpCats.culture,
    tags: ['exhibitions', 'art', 'galleries'],
    author: authors[2],
    publishedAt: '2026-03-22T08:00:00Z',
  },
  {
    slug: '12-free-things-to-do-in-london',
    title: '12 Free Things to Do in London When You Want a Cheap Day Out',
    subtitle: 'Proving you don\'t need to spend a fortune to have an amazing time.',
    excerpt: 'Proving you don\'t need to spend a fortune to have an amazing time in the capital.',
    body: '',
    featureImage: unsplash('1533460004989-cef01064af7e'),
    category: hpCats.free,
    tags: ['free', 'budget'],
    author: authors[0],
    publishedAt: '2026-03-21T12:00:00Z',
  },
  {
    slug: 'locals-guide-shoreditch',
    title: 'A Local\'s Guide to Shoreditch Right Now',
    subtitle: 'Skip the tourist traps. Here\'s what the locals actually love.',
    excerpt: 'Skip the tourist traps. Here\'s what the locals actually love about Shoreditch in 2026.',
    body: '',
    featureImage: unsplash('1517502884422-e8e5f25a7bff'),
    category: hpCats.areas,
    tags: ['shoreditch', 'neighbourhood guide'],
    author: authors[1],
    publishedAt: '2026-03-20T09:00:00Z',
  },
  {
    slug: 'best-markets-london-spring',
    title: 'The Best Markets in London This Spring',
    subtitle: 'Vintage finds, fresh flowers, and incredible street food.',
    excerpt: 'Whether you\'re after vintage finds, fresh flowers, or incredible street food, these are the London markets to hit this spring.',
    body: '',
    featureImage: unsplash('1555396273-367ea4eb4db5'),
    category: hpCats.markets,
    tags: ['markets', 'spring'],
    author: authors[2],
    publishedAt: '2026-03-19T11:00:00Z',
  },
  {
    slug: 'where-to-eat-soho',
    title: 'Where to Eat in Soho: A Neighbourhood Guide',
    subtitle: 'From legendary dim sum to late-night slices.',
    excerpt: 'From legendary dim sum to late-night slices, these are the best restaurants in Soho right now.',
    body: '',
    featureImage: unsplash('1533929736562-87b04b5ba4ea'),
    category: hpCats.foodDrink,
    tags: ['soho', 'restaurants', 'food'],
    author: authors[0],
    publishedAt: '2026-03-18T10:00:00Z',
  },
  {
    slug: 'best-family-activities-london-half-term',
    title: 'Best Family Activities in London This Half Term',
    subtitle: 'Keep the kids entertained with these brilliant family days out.',
    excerpt: 'Keep the kids entertained with these brilliant family days out across London.',
    body: '',
    featureImage: unsplash('1582719471384-894fbb16564e'),
    category: hpCats.family,
    tags: ['family', 'kids', 'half term'],
    author: authors[2],
    publishedAt: '2026-03-17T09:00:00Z',
  },
  {
    slug: 'london-best-comedy-clubs',
    title: 'London\'s Best Comedy Clubs and Where to Find Them',
    subtitle: 'Big-name headliners and intimate open mics.',
    excerpt: 'Whether you\'re after a big-name headliner or an intimate open mic, London has a comedy night for you.',
    body: '',
    featureImage: unsplash('1517248135467-4c7edcad34c4'),
    category: hpCats.nightlife,
    tags: ['comedy', 'nightlife'],
    author: authors[1],
    publishedAt: '2026-03-16T14:00:00Z',
  },
  {
    slug: 'hidden-gems-london-museums',
    title: 'Hidden Gems: 10 London Museums You Probably Haven\'t Visited',
    subtitle: 'Forget the V&A queue — these lesser-known museums are brilliant.',
    excerpt: 'Forget the V&A queue. These lesser-known museums are some of the best in the city.',
    body: '',
    featureImage: unsplash('1524492412937-b28074a5d7da'),
    category: hpCats.culture,
    tags: ['museums', 'culture', 'hidden gems'],
    author: authors[2],
    publishedAt: '2026-03-15T10:00:00Z',
  },
]

export const homepageEvents: SeedEvent[] = [
  {
    slug: 'immersive-van-gogh-experience',
    title: 'Immersive Van Gogh Experience',
    venue: { name: 'Frameless', slug: 'frameless' },
    area: { name: 'Marble Arch', slug: 'marble-arch' },
    featureImage: unsplash('1545042746-ec9e50e7db86'),
    category: hpCats.exhibitions,
    startDate: '2026-03-26T10:00:00Z',
    endDate: '2026-06-30T20:00:00Z',
    priceType: 'PAID',
    priceMin: 25,
    priceMax: 35,
  },
  {
    slug: 'borough-market-saturday-special',
    title: 'Borough Market Saturday Special',
    venue: { name: 'Borough Market', slug: 'borough-market' },
    area: { name: 'Southwark', slug: 'southwark' },
    featureImage: unsplash('1555396273-367ea4eb4db5'),
    category: hpCats.markets,
    startDate: '2026-03-28T08:00:00Z',
    priceType: 'FREE',
  },
  {
    slug: 'rooftop-cinema-club',
    title: 'Rooftop Cinema Club',
    venue: { name: 'Bussey Building', slug: 'bussey-building' },
    area: { name: 'Peckham', slug: 'peckham' },
    featureImage: unsplash('1517248135467-4c7edcad34c4'),
    category: hpCats.film,
    startDate: '2026-03-27T19:30:00Z',
    priceType: 'PAID',
    priceMin: 18,
    priceMax: 22,
  },
  {
    slug: 'camden-market-street-food-festival',
    title: 'Camden Market Street Food Festival',
    venue: { name: 'Camden Market', slug: 'camden-market' },
    area: { name: 'Camden', slug: 'camden' },
    featureImage: unsplash('1528809217021-151305b04551'),
    category: hpCats.foodDrink,
    startDate: '2026-03-28T11:00:00Z',
    endDate: '2026-03-29T18:00:00Z',
    priceType: 'FREE',
  },
  {
    slug: 'royal-observatory-stargazing-evening',
    title: 'Royal Observatory Stargazing Evening',
    venue: { name: 'Royal Observatory', slug: 'royal-observatory' },
    area: { name: 'Greenwich', slug: 'greenwich' },
    featureImage: unsplash('1582719471384-894fbb16564e'),
    category: hpCats.family,
    startDate: '2026-03-27T20:00:00Z',
    priceType: 'PAID',
    priceMin: 12,
    priceMax: 12,
  },
  {
    slug: 'soho-jazz-night',
    title: 'Soho Jazz Night',
    venue: { name: "Ronnie Scott's", slug: 'ronnie-scotts' },
    area: { name: 'Soho', slug: 'soho' },
    featureImage: unsplash('1533929736562-87b04b5ba4ea'),
    category: hpCats.nightlife,
    startDate: '2026-03-26T20:30:00Z',
    priceType: 'PAID',
    priceMin: 30,
    priceMax: 55,
  },
  {
    slug: 'tate-modern-late-contemporary-voices',
    title: 'Tate Modern Late: Contemporary Voices',
    venue: { name: 'Tate Modern', slug: 'tate-modern' },
    area: { name: 'Bankside', slug: 'bankside' },
    featureImage: unsplash('1545042746-ec9e50e7db86'),
    category: hpCats.culture,
    startDate: '2026-03-28T18:00:00Z',
    priceType: 'FREE',
  },
  {
    slug: 'columbia-road-flower-market',
    title: 'Columbia Road Flower Market',
    venue: { name: 'Columbia Road', slug: 'columbia-road' },
    area: { name: 'Shoreditch', slug: 'shoreditch' },
    featureImage: unsplash('1517502884422-e8e5f25a7bff'),
    category: hpCats.markets,
    startDate: '2026-03-29T08:00:00Z',
    priceType: 'FREE',
  },
]

export const homepageAreas: SeedArea[] = [
  { name: 'Shoreditch',   slug: 'shoreditch',    heroImage: unsplash('1517502884422-e8e5f25a7bff'), description: 'Street art, vintage shops, and some of London\'s best coffee.' },
  { name: 'Soho',         slug: 'soho',          heroImage: unsplash('1533929736562-87b04b5ba4ea'), description: 'Theatreland, legendary bars, and the best restaurants in the West End.' },
  { name: 'Camden',       slug: 'camden',        heroImage: unsplash('1528809217021-151305b04551'), description: 'Markets, live music, and an alternative spirit that never fades.' },
  { name: 'Peckham',      slug: 'peckham',       heroImage: unsplash('1517248135467-4c7edcad34c4'), description: 'South London\'s creative hub with rooftop bars and galleries.' },
  { name: 'Brixton',      slug: 'brixton',       heroImage: unsplash('1524492412937-b28074a5d7da'), description: 'Vibrant culture, incredible food, and a legendary music scene.' },
  { name: 'Greenwich',    slug: 'greenwich',     heroImage: unsplash('1582719471384-894fbb16564e'), description: 'Maritime history, parkland views, and a brilliant weekend market.' },
  { name: 'Notting Hill',  slug: 'notting-hill',  heroImage: unsplash('1516637090014-cb1ab78511f5'), description: 'Pastel houses, Portobello Road, and neighbourhood charm.' },
  { name: 'South Bank',   slug: 'south-bank',    heroImage: unsplash('1533460004989-cef01064af7e'), description: 'Riverside walks, world-class galleries, and street performers.' },
]
