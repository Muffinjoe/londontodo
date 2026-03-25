import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const UNSPLASH_IMAGES = [
  { id: '1513635269975-59663e0ac1ad', alt: 'London skyline at dusk' },
  { id: '1514933651103-005eec06c04b', alt: 'Rooftop bar with city views' },
  { id: '1545042746-ec9e50e7db86', alt: 'London gallery interior' },
  { id: '1517502884422-e8e5f25a7bff', alt: 'Shoreditch street art and culture' },
  { id: '1533929736562-87b04b5ba4ea', alt: 'Soho streets in London' },
  { id: '1555396273-367ea4eb4db5', alt: 'London market stalls' },
  { id: '1528809217021-151305b04551', alt: 'Camden Town London' },
  { id: '1582719471384-894fbb16564e', alt: 'Greenwich London' },
  { id: '1524492412937-b28074a5d7da', alt: 'Brixton neighbourhood London' },
  { id: '1533460004989-cef01064af7e', alt: 'Southbank London' },
];

interface ArticleConfig {
  title: string;
  categorySlug: string;
  areaSlug?: string;
  imageIndex: number;
  prompt: string;
  kicker: string;
  featured: boolean;
}

const ARTICLES: ArticleConfig[] = [
  {
    title: '15 Best Things to Do in London This Weekend',
    categorySlug: 'culture',
    imageIndex: 0,
    kicker: 'Weekend Picks',
    featured: true,
    prompt:
      'Write an article titled "15 Best Things to Do in London This Weekend". Cover a mix of events, exhibitions, markets, outdoor activities, and nightlife. Include specific venues, addresses where helpful, and price ranges. Make it feel current and seasonal for spring/summer 2026.',
  },
  {
    title: 'Best Rooftop Bars in London for Summer 2026',
    categorySlug: 'food-drink',
    imageIndex: 1,
    kicker: 'Drinks',
    featured: true,
    prompt:
      'Write an article titled "Best Rooftop Bars in London for Summer 2026". Cover at least 8-10 rooftop bars across different areas. Include signature cocktails, price ranges, booking tips, and what makes each one special. Mention views and atmosphere.',
  },
  {
    title: 'The Best Free Things to Do in London Right Now',
    categorySlug: 'free',
    imageIndex: 9,
    kicker: 'Free London',
    featured: false,
    prompt:
      'Write an article titled "The Best Free Things to Do in London Right Now". Cover free museums, galleries, parks, markets, street art, viewpoints, and hidden gems. Include at least 12 suggestions with practical details.',
  },
  {
    title: "A Local's Guide to Shoreditch",
    categorySlug: 'culture',
    areaSlug: 'shoreditch',
    imageIndex: 3,
    kicker: 'Area Guide',
    featured: false,
    prompt:
      'Write "A Local\'s Guide to Shoreditch". Cover the best cafes, restaurants, bars, vintage shops, street art spots, galleries, and nightlife. Write as if you live there. Include specific venue names and what makes this neighbourhood unique.',
  },
  {
    title: 'Where to Eat in Soho: The Definitive Guide',
    categorySlug: 'food-drink',
    areaSlug: 'soho',
    imageIndex: 4,
    kicker: 'Food',
    featured: true,
    prompt:
      'Write "Where to Eat in Soho: The Definitive Guide". Cover budget eats, mid-range, and fine dining. Include specific restaurants, signature dishes, price ranges, and booking tips. Cover diverse cuisines reflecting Soho\'s character.',
  },
  {
    title: 'Best Exhibitions in London This Month',
    categorySlug: 'exhibitions',
    imageIndex: 2,
    kicker: 'Art & Culture',
    featured: false,
    prompt:
      'Write "Best Exhibitions in London This Month". Cover current and upcoming exhibitions at major galleries and museums (Tate Modern, V&A, National Gallery, Barbican, Serpentine, Hayward, etc). Include ticket prices, dates, and what makes each exhibition worth visiting.',
  },
  {
    title: "London's Best Comedy Clubs: A Complete Guide",
    categorySlug: 'nightlife',
    imageIndex: 6,
    kicker: 'Nightlife',
    featured: false,
    prompt:
      'Write "London\'s Best Comedy Clubs: A Complete Guide". Cover venues like The Comedy Store, Angel Comedy, Top Secret Comedy Club, Backyard Comedy Club, and others. Include ticket prices, best nights to go, and tips for getting the most out of a comedy night in London.',
  },
  {
    title: '10 Hidden Gems in London Most Tourists Miss',
    categorySlug: 'culture',
    imageIndex: 7,
    kicker: 'Secret London',
    featured: true,
    prompt:
      'Write "10 Hidden Gems in London Most Tourists Miss". Cover lesser-known spots like Leadenhall Market, the Hunterian Museum, Postman\'s Park, Little Venice, Eltham Palace, the Hardy Tree, Dennis Severs\' House, etc. Be specific about why each place is special and how to visit.',
  },
  {
    title: "Best Markets in London: From Borough to Brick Lane",
    categorySlug: 'markets',
    imageIndex: 5,
    kicker: 'Markets',
    featured: false,
    prompt:
      'Write "Best Markets in London: From Borough to Brick Lane". Cover Borough Market, Brick Lane, Columbia Road, Portobello Road, Camden Market, Broadway Market, Maltby Street, and others. Include opening times, what to buy, and insider tips.',
  },
  {
    title: 'Family Days Out in London: The Ultimate Guide',
    categorySlug: 'family',
    imageIndex: 8,
    kicker: 'Family',
    featured: false,
    prompt:
      'Write "Family Days Out in London: The Ultimate Guide". Cover museums (Natural History, Science Museum), parks (Hyde Park, Diana Memorial Playground), attractions (London Zoo, SEA LIFE), and activities for different age groups. Include prices and practical tips for families.',
  },
];

async function main() {
  console.log('Fetching categories, areas, and author from database...\n');

  const [categories, areas, author] = await Promise.all([
    prisma.category.findMany(),
    prisma.area.findMany(),
    prisma.user.findFirst(),
  ]);

  console.log(`Found ${categories.length} categories: ${categories.map((c) => c.slug).join(', ')}`);
  console.log(`Found ${areas.length} areas: ${areas.map((a) => a.slug).join(', ')}`);
  console.log(`Author: ${author?.name || author?.email || 'none'}\n`);

  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));
  const areaMap = new Map(areas.map((a) => [a.slug, a.id]));

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < ARTICLES.length; i++) {
    const config = ARTICLES[i];
    const slug = slugify(config.title);

    console.log(`[${i + 1}/${ARTICLES.length}] "${config.title}"`);

    // Check if article already exists
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  -> SKIPPED (already exists)\n`);
      skipped++;
      continue;
    }

    const categoryId = categoryMap.get(config.categorySlug);
    if (!categoryId) {
      console.log(`  -> SKIPPED (category "${config.categorySlug}" not found)\n`);
      skipped++;
      continue;
    }

    const areaId = config.areaSlug ? areaMap.get(config.areaSlug) : undefined;

    // Call Groq AI
    console.log(`  -> Generating with Groq (compound-beta)...`);
    try {
      const completion = await groq.chat.completions.create({
        model: 'compound-beta',
        messages: [
          {
            role: 'system',
            content:
              "You are an editorial writer for LondonTodo.com, a London city guide. Write in a lively, informed, editorial tone. Be specific about real London places. Format in clean HTML with h2/h3 headings, paragraphs. Don't include the title in the body. Include specific venue names, prices where relevant, and practical tips. Write 800-1200 words.",
          },
          {
            role: 'user',
            content: config.prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 4000,
      });

      const body = completion.choices[0]?.message?.content;
      if (!body) {
        console.log(`  -> SKIPPED (empty response from Groq)\n`);
        skipped++;
        if (i < ARTICLES.length - 1) await delay(3000);
        continue;
      }

      // Calculate reading time
      const wordCount = body.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 230);

      // Generate excerpt (first ~155 chars of plain text)
      const plainText = body.replace(/<[^>]*>/g, '').trim();
      const excerpt = plainText.substring(0, 200).replace(/\s+\S*$/, '') + '...';

      // Meta fields
      const metaTitleBase = config.title;
      const metaTitle =
        metaTitleBase.length > 47
          ? metaTitleBase.substring(0, 47) + '... | LondonTodo'
          : metaTitleBase + ' | LondonTodo';
      const metaDescription = excerpt.length > 155 ? excerpt.substring(0, 152) + '...' : excerpt;

      // Stagger publishedAt over last 2 weeks
      const daysAgo = Math.floor((i / ARTICLES.length) * 14);
      const publishedAt = new Date();
      publishedAt.setDate(publishedAt.getDate() - (14 - daysAgo));
      publishedAt.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0);

      const image = UNSPLASH_IMAGES[config.imageIndex];
      const featureImage = `https://images.unsplash.com/photo-${image.id}?w=1200&h=630&fit=crop`;

      // Subtitle from first sentence of plain text
      const firstSentence = plainText.match(/^[^.!?]+[.!?]/)?.[0] || '';
      const subtitle = firstSentence.length > 10 ? firstSentence : undefined;

      await prisma.article.create({
        data: {
          title: config.title,
          slug,
          kicker: config.kicker,
          subtitle,
          excerpt,
          body,
          featureImage,
          featureImageAlt: image.alt,
          categoryId,
          areaId: areaId || null,
          authorId: author?.id || null,
          status: 'PUBLISHED',
          featured: config.featured,
          sponsored: false,
          metaTitle,
          metaDescription,
          readingTime,
          publishedAt,
          aiGenerated: true,
          aiTemplate: 'generate-articles',
        },
      });

      console.log(`  -> CREATED (${wordCount} words, ${readingTime} min read)`);
      created++;
    } catch (err: any) {
      console.error(`  -> ERROR: ${err.message}`);
      skipped++;
    }

    // Delay between calls
    if (i < ARTICLES.length - 1) {
      console.log(`  -> Waiting 3s...\n`);
      await delay(3000);
    }
  }

  console.log(`\n========== SUMMARY ==========`);
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total:   ${ARTICLES.length}`);
  console.log(`==============================\n`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  prisma.$disconnect();
  process.exit(1);
});
