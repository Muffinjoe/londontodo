import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import NewsletterBox from '@/components/shared/NewsletterBox'
import VideoEmbed from '@/components/shared/VideoEmbed'

const ARTICLE_URL = 'https://londontodo.com/articles/perfect-day-in-london-itinerary'
const ARTICLE_TITLE = "A Perfect Day in London: The Simple Itinerary"

export const metadata: Metadata = {
  title: 'A Perfect Day in London: The Simple Itinerary | LondonTodo',
  description: 'A simple one-day London itinerary. South Bank, St Pauls, Covent Garden, Soho, and a West End show.',
  keywords: 'one day London itinerary, perfect day London, London in a day, London day trip, what to do London one day'.split(', '),
  openGraph: {
    title: ARTICLE_TITLE,
    description: 'A simple one-day London itinerary. South Bank, St Pauls, Covent Garden, Soho, and a West End show.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'Westminster London' }],
  },
}

const BODY = '<h2>Morning: South Bank Start</h2>\n<p>There’s something magical about waking up in London and heading straight for the river. Grab a fresh coffee at one of the South Bank cafés – I love the buttery croissant and espresso at <a href="https://www.cafebreria.co.uk/">Cafe Brera</a>, but <a href="https://www.housecoffee.co.uk/">House Coffee</a> on the promenade is equally delightful. Sit for a minute, watch the early commuters and the river traffic glide by, and let the city’s rhythm ease you into the day.</p>\n\n<p>From your café, take a gentle stroll eastward along the Thames. The walk past the <a href="https://www.tate.org.uk/visit/tate-modern">Tate Modern</a> is a treat even if you’re not an art aficionado. The building itself – a converted power station with its massive brick façade and soaring turbine hall – feels like a piece of contemporary sculpture. If you have a spare ten minutes, pop inside for a quick look at the latest installation; the free entry to the main galleries makes it an easy, rewarding stop.</p>\n\n<p>When you’re ready for the next highlight, cross the sleek, pedestrian‑only Millennium Bridge. The glass‑floor walkway offers a thrilling view of the river below and a perfect photo op with St Paul’s Cathedral looming in the distance. As you step onto the north bank, take a moment to admire the cathedral’s dome – it’s a sight that never gets old, no matter how many times you’ve seen it.</p>\n\n<p>Once you’ve crossed, wander up the gentle incline to the entrance of <a href="https://www.stpauls.co.uk/">St Paul’s Cathedral</a>. If you’re feeling adventurous, buy a ticket to climb the Whispering Gallery, the Stone Gallery, and finally the Golden Gallery. The panoramic vista from the top, with the city spread out like a living map, is worth the few extra steps.</p>\n\n<h2>Midday: Culture Hit</h2>\n<p>After soaking in the grandeur of St Paul’s, it’s time to head west toward the political heart of the capital. A short walk down Ludgate Hill brings you to the historic streets of the City, and then you’ll find yourself on the banks of the Thames again, ready for a scenic river walk to Westminster.</p>\n\n<p>Follow the river’s edge past the elegant Victoria Embankment Gardens – a perfect spot for a quick rest or a selfie with the fountains – until you reach the iconic silhouette of the Elizabeth Tower, better known as Big Ben. Even if the clock’s hands are frozen for renovation, the tower’s presence is unmistakable and makes for a classic London postcard moment.</p>\n\n<p>Just a stone’s throw away, the Houses of Parliament rise in a blend of Gothic revival splendor and political gravitas. If you’re a history buff, consider joining a guided tour (book in advance) to peek inside the historic chambers and learn about the centuries‑old traditions that still shape British democracy.</p>\n\n<p>When hunger starts to call, the area offers a handful of excellent lunch options. For a quick yet tasty bite, try the <a href="https://www.patisserie-royal.co.uk/">Royal Patisserie</a> on Victoria Street – their smoked salmon bagel and fresh fruit salad are perfect for refueling. If you prefer a sit‑down meal with a view, the riverside restaurant <a href="https://www.gardensbythebay.co.uk/">The Ivy Westminster</a> serves classic British fare with a modern twist, and you can watch the boats drift by as you eat.</p>\n\n<h2>Afternoon: Explore and Eat</h2>\n<p>With your midday cravings satisfied, it’s time to dive into the bustling neighborhoods of Covent Garden and Soho. Both are a short tube ride away (or a pleasant 20‑minute walk if you’re feeling energetic), and each offers its own flavor of London life.</p>\n\n<p><strong>Covent Garden</strong> is a sensory feast. The historic market building houses a mix of artisan stalls, street performers, and quirky boutiques. Wander through the Apple Market for handmade jewellery, vintage prints, and unique homewares. For a snack, pop into <a href="https://www.boroughmarket.org.uk/">Borough Market’s pop‑up stall</a> (they often set up a mini‑kiosk in Covent Garden) and grab a freshly baked sausage roll or a fragrant cheese toastie.</p>\n\n<p>If you’re leaning toward a more eclectic vibe, head west to <strong>Soho</strong>. This neighbourhood is a labyrinth of independent shops, vintage record stores, and hidden cafés. Start at <a href="https://www.roughtrade.com/uk">Rough Trade</a> for a treasure hunt of vinyl gems, then drift down to <a href="https://www.londonbookshop.co.uk/">London Review Bookshop</a> for literary finds. When your stomach starts rumbling, you have a smorgasbord of options:</p>\n\n<ul>\n<li><strong>Dishoom Covent Garden</strong> – a stylish homage to Bombay cafés, famous for its silky chai, spiced cauliflower, and the legendary bacon naan roll (best enjoyed at brunch, but still brilliant for lunch).</li>\n<li><strong>Flat Iron Soho</strong> – a no‑frills steakhouse that serves perfectly cooked, buttery rib‑eye at a surprisingly modest price. Pair it with a side of creamed spinach and a glass of Malbec.</li>\n<li><strong>Palomar</strong> – for a taste of modern Jerusalem, offering dishes like smoked eggplant with tahini and a lively mezze platter. The open‑kitchen vibe makes the dining experience feel like a friendly dinner party.</li>\n</ul>\n\n<p>After you’ve eaten, take a leisurely wander through the side streets. In Soho, you’ll discover hidden courtyards such as <a href="https://www.soho.co.uk/">Soho Square</a>, where you can pause for a coffee at <a href="https://www.cafedeparis.co.uk/">Café de Paris</a> and watch the world go by. In Covent Garden, the <a href="https://www.nationaltheatre.org.uk/">National Theatre</a> often hosts free lunchtime talks and backstage tours – a great way to peek behind the curtain of London’s thriving theatre scene.</p>\n\n<h2>Evening: Theatre or Views</h2>\n<p>As the sun begins to dip, London’s energy shifts from bustling day‑time to glittering night‑time. You have two equally enticing ways to cap off your perfect day.</p>\n\n<p><strong>Option 1: West End Show</strong><br>\nIf you’re a fan of live performance, there’s nothing quite like the buzz of the West End. Book tickets in advance for a hit musical such as <em>Hamilton</em>, <em>The Lion King</em>, or the newer sensation <em>Six</em>. For a more intimate experience, check the schedule at the <a href="https://www.theoldvic.com/">Old Vic</a> or the <a href="https://www.nationaltheatre.org.uk/">National Theatre</a>. Arrive early to soak up the pre‑show atmosphere, grab a cocktail at the nearby <a href="https://www.thecrownandanchor.co.uk/">Crown & Anchor</a>, and settle into your seat for an unforgettable performance.</p>\n\n<p><strong>Option 2: Sunset Thames Walk</strong><br>\nIf you’d rather let the city’s skyline be your entertainment, head back to the river for a sunset stroll. Start at the London Eye pier and walk westward along the South Bank, passing the Royal Festival Hall, the historic Globe Theatre, and the illuminated towers of the O2. The water reflects the golden hues of the setting sun, creating a romantic backdrop that’s perfect for photos or quiet contemplation.</p>\n\n<p>When the night deepens, make your way to Soho for dinner. <a href="https://www.rossobrothers.co.uk/">Rosso Brothers</a> offers a lively Italian menu with wood‑fired pizzas and fresh pasta, while <a href="https://www.ricksteakhouse.co.uk/">Rick Stein’s Seafood Restaurant</a> serves up the finest catch of the day in a sleek, contemporary setting. Both venues stay open late, so you can enjoy a relaxed meal after the show or walk.</p>\n\n<p>Finish your evening with a nightcap at <a href="https://www.barrafina.co.uk/">Barrafina</a> for a classic Spanish vermouth, or head to the speakeasy‑style <a href="https://www.barbican.org.uk/">The Nightjar</a> for inventive cocktails and live jazz. The city’s nocturnal pulse will leave you feeling both satisfied and eager for your next London adventure.</p>\n\n<h2>Tips</h2>\n<ul>\n<li><strong>Oyster or contactless card</strong> – It’s the fastest way to hop on buses, tubes, and riverboats. Load enough credit for the day (around £15‑£20) and you’ll avoid queuing for tickets.</li>\n<li><strong>Comfortable shoes</strong> – London’s streets are mostly cobblestone or uneven pavement. A good pair of walking shoes will keep your feet happy from the South Bank to Soho.</li>\n<li><strong>Best times to visit attractions</strong> – Aim for early mornings (8 am‑9 am) at St Paul’s and the Tate Modern to beat the crowds. The Westminster area is quieter after 2 pm, and theatres often have a post‑matinee lull before the evening rush.</li>\n<li><strong>Plan for rain</strong> – London weather can be unpredictable. Carry a compact umbrella or a lightweight raincoat; you’ll thank yourself when a sudden drizzle hits.</li>\n<li><strong>Stay flexible</strong> – The city’s charm lies in its spontaneity. If you spot a street performer you love, or a pop‑up market you hadn’t planned for, give yourself a few extra minutes to explore. Those unexpected moments often become the best memories.</li>\n</ul>'

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
        <Image src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&h=630&fit=crop" alt="Westminster London" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              A Perfect Day in London: The Simple Itinerary
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">One day. No stress. Just the best of London from morning to night.</p>
            <div className="mt-4 flex justify-center"><ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} /></div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {(() => {
          const sections = BODY.split(/(?=<h2)/i)
          return sections.map((section, i) => (
            <div key={i}>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: section }} />
              {i === 1 && (
                <VideoEmbed url="https://www.youtube.com/embed/PgUlXIQJiX8" caption="A morning on London's South Bank" />
              )}
              {i === 3 && (
                <VideoEmbed url="https://www.youtube.com/embed/LyGO1ReaKPc" caption="London's food scene" />
              )}
            </div>
          ))
        })()}

        <div className="mt-12">
          <NewsletterBox variant="inline" />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-extrabold text-ink-900">More London Guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RELATED.filter(r => r.href !== '/articles/perfect-day-in-london-itinerary').slice(0, 4).map(({ href, title }) => (
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
