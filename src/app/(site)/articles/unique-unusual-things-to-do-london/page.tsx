import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import NewsletterBox from '@/components/shared/NewsletterBox'

const ARTICLE_URL = 'https://londontodo.com/articles/unique-unusual-things-to-do-london'
const ARTICLE_TITLE = "7 Unique and Unusual Things To Do in London"

export const metadata: Metadata = {
  title: '7 Unique and Unusual Things To Do in London | LondonTodo',
  description: '7 unique and unusual things to do in London. Hidden museums, immersive experiences, night walks, and off-the-beaten-path gems.',
  keywords: 'unusual things London, unique London experiences, hidden London, secret London, quirky London'.split(', '),
  openGraph: {
    title: ARTICLE_TITLE,
    description: '7 unique and unusual things to do in London. Hidden museums, immersive experiences, night walks, and off-the-beaten-path gems.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'Regent Street London' }],
  },
}

const BODY = '<h2>1. Discover Hidden London</h2>\n<p>London’s back‑streets hide a treasure trove of colour, history and atmosphere that most visitors never see. One of the most eye‑catching spots is Gods Own Junkyard in Walthamstow, a sprawling warehouse filled with neon signs, vintage arcade cabinets and kinetic sculptures that glow like a futuristic wonderland. The space feels like stepping into a living collage, perfect for a quick photo session or a leisurely wander while the lights pulse to an otherworldly rhythm.</p>\n<p>Just a short tube ride away, the Leighton House Museum offers a very different kind of hidden delight. This former Victorian townhouse is a masterpiece of art‑nouveau interiors, with an opulent Arab Hall lined with intricate tiles and a stunning collection of paintings by Frederic Leighton himself. A few minutes further on, Dennis Severs’ House invites you to walk through a candle‑lit, time‑traveling narrative that recreates the lives of a fictional Huguenot family from the 18th to the 20th century, letting you hear imagined whispers as you move from room to room.</p>\n\n<h2>2. Explore Camden Properly</h2>\n<p>Camden is famous for its market, but the neighbourhood’s true charm lies beyond the stalls. A gentle stroll along Regent’s Canal reveals a tranquil waterway lined with colourful houseboats, leafy trees and quiet cafés where locals sip coffee while watching narrowboats glide by. The canal path is perfect for a relaxed walk or a leisurely bike ride, offering a different perspective on the bustling district.</p>\n<p>When night falls, the Jazz Cafe on Parkway becomes the heartbeat of Camden’s music scene, hosting everything from soulful vocalists to cutting‑edge electronic acts. After a set, wander the surrounding streets to discover ever‑changing street‑art murals that turn ordinary walls into vibrant canvases, each piece reflecting the area’s rebellious spirit and ever‑evolving creative energy.</p>\n\n<h2>3. Try an Immersive Experience</h2>\n<p>London’s immersive theatre scene pushes the boundaries of storytelling, and Frameless is a perfect example. Using state‑of‑the‑art projection mapping and motion‑capture technology, the show transports you into a surreal digital landscape where you become part of the narrative. The experience feels like stepping inside a video game, with each decision shaping the visual and auditory flow around you.</p>\n<p>If you prefer a more tactile adventure, Punchdrunk’s productions invite you to wander through elaborately designed sets, becoming a character in a sprawling, interactive drama. There are no seats, no fixed stage – you choose where to go, what to touch, and which clues to follow, making each performance a unique, personal journey through mystery and wonder.</p>\n\n<h2>4. Ride the ArcelorMittal Orbit Slide</h2>\n<p>The ArcelorMittal Orbit, erected for the 2012 Olympics, towers 178 metres above the Greenwich Peninsula and offers panoramic views of the city’s skyline, the Thames and the distant hills of Kent. A glass‑enclosed observation deck lets you soak in the scenery at a leisurely pace, while the surrounding park provides a pleasant place for a picnic or a casual stroll.</p>\n<p>For adrenaline seekers, the Orbit’s 1,175‑foot slide is a must‑try. You climb to the top, strap into a sleek capsule and then whoosh down the spiralling tube at speeds that can reach 40 miles per hour. The rush of wind, the blur of the city below and the exhilaration of the descent combine for a truly unforgettable thrill.</p>\n\n<h2>5. Visit Weird Museums</h2>\n<p>The Wellcome Collection blends science, art and curiosity in a series of thought‑provoking exhibitions that explore the human condition. From historic medical instruments to contemporary installations about mental health, the museum encourages you to question what you know about the body and the mind, all within a beautifully designed space that feels both scholarly and playful.</p>\n<p>Just a short walk away, the Old Operating Theatre Museum offers a glimpse into 19th‑century surgery, complete with an authentic theatre, original tools and a preserved anatomical theatre that once hosted groundbreaking procedures. For a lighter, more nostalgic experience, the Museum of Brands showcases the evolution of consumer culture through a dazzling array of packaging, advertisements and everyday objects that tell the story of Britain’s commercial past.</p>\n\n<h2>6. Explore Culture Through Events</h2>\n<p>London’s calendar is packed with festivals, exhibitions and seasonal celebrations that cater to every taste. In the summer, the Notting Hill Carnival bursts onto the streets with Caribbean music, colourful costumes and a feast of street food, while the London Film Festival showcases the latest international cinema in iconic venues across the city. Autumn brings the London Design Festival, where pop‑up installations and talks transform public spaces into creative playgrounds.</p>\n<p>Winter lights up the capital with magical events such as the Southbank Centre’s Winter Market, where you can sip mulled wine beside a glittering river, and the festive ice‑skating rinks at Somerset House and the Natural History Museum. No matter the season, London’s cultural programme offers endless opportunities to discover new ideas, meet interesting people and experience the city’s ever‑changing artistic pulse.</p>\n\n<h2>7. Walk London at Night</h2>\n<p>When the sun sets, the Thames becomes a shimmering ribbon that guides you on a memorable night‑time walk from Westminster to Tower Bridge. The illuminated silhouettes of the Houses of Parliament, the London Eye and the Shard create a dramatic backdrop, while the gentle river breeze carries the distant hum of traffic and occasional ferry horns. Along the path, you’ll find quiet benches perfect for pausing and taking in the view.</p>\n<p>Continuing onto the Southbank, the promenade buzzes with late‑night cafés, street performers and pop‑up art installations that add a lively rhythm to the night. The lights of the city reflect off the water, casting a golden glow that makes even familiar landmarks feel fresh and exciting. Whether you’re a night owl or simply looking for a romantic stroll, this illuminated riverside route offers a magical way to experience London after dark.</p>'

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
        <Image src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=630&fit=crop" alt="Regent Street London" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              7 Unique and Unusual Things To Do in London
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">Done the usual stuff? Good. Here is where London gets really interesting.</p>
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
            {RELATED.filter(r => r.href !== '/articles/unique-unusual-things-to-do-london').slice(0, 4).map(({ href, title }) => (
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
