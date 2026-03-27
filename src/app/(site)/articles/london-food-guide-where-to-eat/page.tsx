import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import NewsletterBox from '@/components/shared/NewsletterBox'

const ARTICLE_URL = 'https://londontodo.com/articles/london-food-guide-where-to-eat'
const ARTICLE_TITLE = "Where To Eat in London: A No-Nonsense Food Guide"

export const metadata: Metadata = {
  title: 'Where To Eat in London: A No-Nonsense Food Guide | LondonTodo',
  description: 'Where to eat in London. Borough Market, Soho, Shoreditch, Brixton, and the best markets and late-night spots.',
  keywords: 'where to eat London, best restaurants London, London food guide, Borough Market, Soho restaurants, London street food'.split(', '),
  openGraph: {
    title: ARTICLE_TITLE,
    description: 'Where to eat in London. Borough Market, Soho, Shoreditch, Brixton, and the best markets and late-night spots.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'Borough Market London' }],
  },
}

const BODY = '<h2>Borough Market and Southwark</h2>\n\n<p>There’s no better place to feel the pulse of London’s food scene than the historic <strong>Borough Market</strong>. Nestled beside the Thames, this market has been feeding the city since the 13th century, and today it offers a dizzying array of fresh produce, artisanal cheeses, and street‑food stalls that can satisfy any craving.</p>\n\n<p><strong>What to eat</strong></p>\n\n<ul>\n  <li><strong>Cheese board at La Fromagerie</strong> – pick a creamy Saint‑Albray, a tangy Crottin de Chavignol, and a nutty Comté. The staff will slice and serve it with fresh grapes and a drizzle of honey.</li>\n  <li><strong>Spanish tapas at Brindisa</strong> – the jamón ibérico and the chorizo al vino are crowd‑pleasers, but the real star is the paella de marisco, a saffron‑infused rice dish brimming with mussels, prawns and calamari.</li>\n  <li><strong>Fresh oysters at Wright Brothers</strong> – shucked on the spot, served with a squeeze of lemon and a mignonette sauce. Pair them with a glass of crisp Muscadet.</li>\n  <li><strong>Vegan delight at The Grain Store</strong> – try the roasted cauliflower steak with tahini, pomegranate seeds and a side of spiced quinoa.</li>\n  <li><strong>Sweet finish at Bread Ahead</strong> – their cinnamon‑sugar cruffins (a croissant‑muffin hybrid) are perfect with a cup of specialty coffee from The Coffee Jar.</li>\n</ul>\n\n<p><strong>Best stalls to bookmark</strong></p>\n\n<ul>\n  <li><em>Rosa’s Thai Café</em> – the green curry with chicken is aromatic and just the right level of heat.</li>\n  <li><em>Gail’s Bakery</em> – grab a flaky almond croissant for a mid‑morning treat.</li>\n  <li><em>Monmouth Coffee Company</em> – a pour‑over of their single‑origin Ethiopian will keep you buzzing through the market.</li>\n</ul>\n\n<p>Just a short walk across the river, you’ll find <strong>Maltby Street Market</strong> in Bermondsey. It’s smaller than Borough but packed with quality. Highlights include:</p>\n\n<ul>\n  <li><em>Rosa’s Thai Café</em> (a sister stall to the one in Borough) – order the pad thai with prawns.</li>\n  <li><em>Four & Twenty Blackbirds</em> – their pork belly bao is juicy, topped with pickled cucumber and a drizzle of hoisin.</li>\n  <li><em>Barrafina’s pop‑up</em> – when they’re in town, the jamón ibérico and the tortilla española are must‑tries.</li>\n</ul>\n\n<h2>Soho</h2>\n\n<p>Soho is the beating heart of London’s nightlife and culinary experimentation. Its narrow streets hide everything from Michelin‑starred tapas to hidden dim sum parlors.</p>\n\n<p><strong>Barrafina</strong> – this no‑reservation, counter‑service Spanish tapas bar is a legend. Order the <em>tortilla española</em> (a silky potato‑egg cake) and the <em>gambas al ajillo</em> (garlic shrimp). Finish with a glass of Albariño.</p>\n\n<p><strong>BAO</strong> – a Taiwanese street‑food concept that has become a Soho staple. The <em>pork belly bao</em> (slow‑braised pork, pickled mustard greens, and a smear of hoisin) is the crowd‑pleaser, while the <em>fried chicken bao</em> offers a crunchy twist.</p>\n\n<p><strong>Koya</strong> – a minimalist Japanese izakaya where the focus is on perfectly cooked rice and delicate broth. The <em>Koya ramen</em> (pork‑bone broth, thin noodles, and a soft‑boiled egg) is the signature dish, and the <em>yakitori</em> skewers (especially the chicken thigh with shiso) are worth sharing.</p>\n\n<p>Soho’s <strong>Chinatown</strong> is a culinary maze of neon signs and sizzling woks. A few reliable stops:</p>\n\n<ul>\n  <li><em>Four Seasons</em> – the roast duck with honey‑glazed skin and pancakes is iconic.</li>\n  <li><em>Gold Mine</em> – try the <em>salt‑and‑pepper squid</em> and a bowl of <em>beef chow fun</em>.</li>\n  <li><em>Ping Pong</em> – a modern dim sum house; the pork shumai and shrimp har gow are consistently excellent.</li>\n</ul>\n\n<h2>Shoreditch and East London</h2>\n\n<p>East London is a playground for the adventurous eater, and Shoreditch sits at its centre. The area blends industrial chic with a buzzing food scene.</p>\n\n<p><strong>Dishoom Shoreditch</strong> – a love‑letter to Bombay’s Irani cafés. Start with the <em>house black daal</em> (slow‑cooked lentils) and the <em>spiced pork raan</em>. The <em>bacon‑wrapped naan</em> is a cheeky twist on a classic, and the <em>chicken ruby</em> (tomato‑based curry) is perfect with a side of buttered rice.</p>\n\n<p><strong>Smokestak</strong> – a meat‑lover’s haven offering American‑style barbecue in a reclaimed warehouse. The <em>smoked brisket</em> (served with pickles and mustard) melts in the mouth, while the <em>pork spare ribs</em> (dry‑rubbed, slow‑cooked, finished on the grill) are finger‑licking good. Don’t miss the <em>mac & cheese</em> with truffle oil.</p>\n\n<p><strong>Brick Lane</strong> – the historic curry corridor. Two stand‑out spots:</p>\n\n<ul>\n  <li><em>Tayyabs</em> – the <em>lamb chops</em> (marinated in yoghurt, garlic, and spices, then grilled) and the <em>chicken biryani</em> (fragrant basmati rice with saffron and fried onions) are legendary.</li>\n  <li><em>Aladin</em> – the <em>fish fry</em> (battered cod with a tangy mustard sauce) and the <em>goat curry</em> (rich, slow‑cooked) showcase Bangladeshi flavours.</li>\n</ul>\n\n<h2>Brixton and South London</h2>\n\n<p>Brixton pulses with Caribbean rhythm, Afro‑beat, and a thriving food scene that reflects its multicultural roots.</p>\n\n<p><strong>Brixton Village</strong> – a covered market of independent eateries. Top picks:</p>\n\n<ul>\n  <li><em>Franco Manca</em> – the birthplace of the sourdough pizza movement. Order the <em>Margherita</em> (slow‑fermented crust, San Marzano tomatoes, mozzarella) or the <em>Spicy Calabrese</em> (chorizo, chilli, and rocket).</li>\n  <li><em>The Blues Kitchen</em> – a soulful spot for Southern‑style comfort food. The <em>jerk chicken</em> (marinated in all‑spice, Scotch bonnet, and lime) and the <em>fried plantains</em> are a match made in heaven.</li>\n  <li><em>Honest Burgers</em> – their <em>classic beef burger</em> with cheddar, caramelised onion jam, and a side of rosemary chips is a reliable crowd‑pleaser.</li>\n</ul>\n\n<p>Caribbean flavours shine at:</p>\n\n<ul>\n  <li><em>Jerk Shack</em> – the <em>Jerk pork ribs</em> (smoky, spicy, with a mango‑chili glaze) and the <em>callaloo soup</em> (a leafy‑green broth with coconut milk) are authentic and hearty.</li>\n  <li><em>Rum Kitchen</em> – the <em>curried goat</em> (tender meat in a rich, spiced gravy) paired with a side of rice and peas.</li>\n</ul>\n\n<p>For a sweet finish, stop by <em>Milk &amp; Honey</em> for a slice of tropical fruit tart or a coconut‑lime panna cotta.</p>\n\n<h2>Markets Worth the Trip</h2>\n\n<p>London’s markets are more than just places to shop; they’re culinary destinations in their own right.</p>\n\n<p><strong>Broadway Market (Hackney)</strong> – a Saturday favourite. Must‑try stalls:</p>\n\n<ul>\n  <li><em>The Breakfast Club</em> – the full English breakfast (black pudding, baked beans, grilled tomatoes) is a comforting start to the day.</li>\n  <li><em>Purezza</em> – a vegan pizzeria serving a <em>truffle mushroom pizza</em> on a light sourdough base.</li>\n  <li><em>Gail’s</em> – grab a freshly baked sourdough roll with butter and jam.</li>\n</ul>\n\n<p><strong>Maltby Street Market (Bermondsey)</strong> – a compact market with a focus on quality over quantity. Highlights include:</p>\n\n<ul>\n  <li><em>Four &amp; Twenty Blackbirds</em> – the pork belly bao mentioned earlier.</li>\n  <li><em>Rosa’s Thai Café</em> – the green curry with chicken and bamboo shoots.</li>\n  <li><em>Vermicelli</em> – a noodle stall where the <em>spicy beef pho</em> (rich broth, rice noodles, fresh herbs) is a warming treat.</li>\n</ul>\n\n<p><strong>Columbia Road (East London)</strong> – famous for its flower market on Sundays, but the surrounding streets host a cluster of cafés and bakeries worth a detour:</p>\n\n<ul>\n  <li><em>Columbia Road Flower Market Café</em> – the <em>lemon ricotta pancakes</em> topped with fresh berries are a brunch highlight.</li>\n  <li><em>Rosa’s Bakery</em> – try the <em>cinnamon swirl</em> with a flat white.</li>\n  <li><em>Humble Pie</em> – the <em>steak &amp; ale pie</em> (tender beef, ale gravy, flaky pastry) is perfect for a rainy afternoon.</li>\n</ul>\n\n<h2>Late Night Eats</h2>\n\n<p>London never truly sleeps, and the city’s night‑owl eateries keep the culinary adventure going well past midnight.</p>\n\n<p><strong>Beigel Bake (Brick Lane)</strong> – open 24 hours. The classic <em>everything bagel</em> with a thick slab of cream cheese is simple but unbeatable. For a heartier bite, try the <em>salmon, cream cheese, and capers</em> bagel.</p>\n\n<p><strong>Duck &amp; Waffle (Liverpool Street)</strong> – open until 2 am. The signature <em>duck and waffle</em> (crispy confit duck leg, a golden waffle, mustard maple syrup, and a fried egg) is a sweet‑savory masterpiece. If you prefer something lighter, the <em>truffle fries</em> with parmesan and a poached egg are delicious.</p>\n\n<p><strong>Late‑night Chinatown (Soho)</strong> – many restaurants stay open until the early hours. Top picks:</p>\n\n<ul>\n  <li><em>Four Seasons</em> – the roast duck is still on the menu after midnight; order the duck with pancakes, cucumber, and hoisin.</li>\n  <li><em>Golden Dragon</em> – the <em>spicy Szechuan beef</em> (thin slices, fiery sauce, peanuts) and a bowl of <em>hot and sour soup</em> are perfect for a night‑time comfort fix.</li>\n  <li><em>Yauatcha</em> – a modern dim sum house; the <em>steamed pork buns</em> and <em>truffle mushroom dumplings</em> are still served late.</li>\n</ul>\n\n<p>Whether you’re a first‑time visitor or a seasoned Londoner, this guide gives you a roadmap to the city’s most reliable, flavour‑packed spots. From the bustling stalls of Borough Market to the midnight cravings of Chinatown, the capital offers a no‑nonsense food adventure that’s as diverse as its neighborhoods. Bon appétit!</p>'

const RELATED = [
  { href: '/articles/best-things-to-do-in-london-2026', title: 'Best Things To Do in London' },
  { href: '/articles/free-things-to-do-in-london-2026', title: 'Free Things To Do in London' },
  { href: '/articles/london-food-guide-where-to-eat', title: 'London Food Guide' },
  { href: '/articles/perfect-day-in-london-itinerary', title: 'A Perfect Day in London' },
  { href: '/events/browse', title: 'Browse All London Events' },
]

export default function Page() {
  return (
    <article>
      <header className="relative overflow-hidden bg-ink-900">
        <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=630&fit=crop" alt="Borough Market London" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Where To Eat in London: A No-Nonsense Food Guide
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">From Borough Market to late-night Brick Lane, here is where Londoners actually eat.</p>
            <div className="mt-4 flex justify-center"><ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} /></div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: BODY }} />

        <div className="mt-12">
          <NewsletterBox variant="inline" />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-extrabold text-ink-900">More London Guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RELATED.filter(r => r.href !== '/articles/london-food-guide-where-to-eat').slice(0, 4).map(({ href, title }) => (
              <Link key={href} href={href} className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                <span className="flex-1">{title}</span>
                <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 border-t border-ink-100 pt-6">
          <span className="text-sm font-medium text-ink-500">Share this article</span>
          <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
        </div>
      </div>
    </article>
  )
}
