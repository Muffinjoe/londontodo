import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import NewsletterBox from '@/components/shared/NewsletterBox'
import VideoEmbed from '@/components/shared/VideoEmbed'

const ARTICLE_URL = 'https://londontodo.com/articles/best-things-to-do-in-london-2026'
const ARTICLE_TITLE = "The Best Things To Do in London Right Now (2026 Guide)"

export const metadata: Metadata = {
  title: 'The Best Things To Do in London Right Now (2026 Guide) | LondonTodo',
  description: 'The best things to do in London right now. Museums, markets, restaurants, shows, and skyline views for 2026.',
  keywords: 'things to do in London, London guide 2026, best London attractions, London activities'.split(', '),
  openGraph: {
    title: ARTICLE_TITLE,
    description: 'The best things to do in London right now. Museums, markets, restaurants, shows, and skyline views for 2026.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'London skyline' }],
  },
}

const BODY = '<h2>See London From Above</h2>\n<p>There is nothing quite like spotting the city’s iconic skyline from a lofty perch. The London Eye remains a must‑do, especially now that the 2026 “Sunset Capsule” experience adds a glass‑roofed pod that lets you watch the sky change colour while the Thames glitters below. Book online at least a week in advance to snag a good seat; tickets start at £27 for adults and £22 for children, with a discount for off‑peak slots after 5 pm.</p>\n<p>If you prefer a free high‑rise treat, head to the Sky Garden on the 35th floor of the Walkie‑Talkie building. The lush indoor garden, complete with exotic plants and a bar, offers 360‑degree views of St Paul’s, the City and beyond. Entry is complimentary, but you must reserve a 10‑minute window on the Sky Garden website – the slots fill up fast, especially on sunny weekends.</p>\n<p>For the ultimate vertical adventure, visit The Shard’s “View from The Shard”. The viewing platform on level 69 provides a glass‑floor experience that feels like you’re walking on air. Tickets are £25 for adults, £20 for seniors and students, and you can combine the visit with a drink at the nearby Aqua Shard for a stylish finish. Arrive early on weekdays to avoid the queues and bring a light jacket – the wind can be brisk at 310 metres.</p>\n\n<h2>Walk Through History</h2>\n<p>The Tower of London is a living museum of royal intrigue. Join a Yeoman Warder tour – the guides are storytellers who bring the stone walls to life with tales of beheadings and hidden treasures. Admission is £25 for adults, £12 for children, and you get a free audio guide that points out the Crown Jewels, the White Tower and the medieval palace. Arrive at opening time to beat the crowds and consider a late‑afternoon visit when the light is perfect for photos of the moat.</p>\n<p>Just a short walk away, Tower Bridge offers more than a photo‑op. The high‑level walkways feature glass floors that let you look straight down at the river traffic. The exhibition costs £9 for adults and £4.50 for children, and you can watch the bridge lift in real time – the schedule is posted on the visitor centre. Bring a compact umbrella; the bridge’s exposed walkways can get damp on a typical London drizzle.</p>\n<p>No historic tour of London is complete without a stroll through Westminster. The Houses of Parliament open for guided tours on Saturdays and during the summer recess, with tickets at £25 for adults and £12 for students. Don’t miss the chance to see the iconic Big Ben (now officially called the Elizabeth Tower) and the historic Westminster Abbey, where entry is £27 for adults and £10 for children. Book the Abbey’s “Early Morning” slot for a quieter experience and a chance to hear the organ before the crowds arrive.</p>\n\n<h2>Get Lost in a Museum For Free</h2>\n<p>The British Museum is a treasure trove that spans millennia. Its permanent collection – from the Rosetta Stone to the Egyptian mummies – is free, though special exhibitions may charge a modest fee of £15‑£20. Grab a free map at the entrance and follow the “Highlights” trail to make the most of a two‑hour visit. A tip: the museum’s reading room is a quiet spot for a coffee break, and the café offers a discount for students with a valid ID.</p>\n<p>Just a short tube ride away, the Natural History Museum dazzles with its dinosaur gallery and the awe‑inspiring Hintze Hall, where a blue whale skeleton hangs from the ceiling. Admission is free, but the interactive “Earth Hall” experience costs £5 for adults and £3 for children. Arrive early on a weekday to avoid the school groups, and don’t forget to pop into the museum’s “Investigate” zone for hands‑on science experiments.</p>\n<p>The Science Museum, Tate Modern and Victoria &amp; Albert Museum (V&amp;A) round out the free‑entry trio. At the Science Museum, the “Wonderlab” exhibit is a hit with families – tickets are £10 for adults and £7 for children, but the rest of the galleries are open without charge. Tate Modern’s Turbine Hall hosts large‑scale installations that change regularly; entry is free, though the on‑site restaurant offers a spectacular view of the Thames. The V&amp;A’s fashion and jewellery collections are a visual feast, and the museum’s “Explore” app provides audio commentary at no cost. Plan a half‑day itinerary that moves from one museum to the next, using an Oyster card for easy travel on the Tube.</p>\n\n<h2>Eat Your Way Around the City</h2>\n<p>Borough Market is a food lover’s playground, bustling with stalls that serve everything from freshly shucked oysters to Ethiopian injera. There’s no entry fee, but budgeting £15‑£20 per person will let you sample a few dishes and a glass of local cider. Arrive before 11 am to beat the lunch rush, and bring a reusable bag for any market‑bought goodies.</p>\n<p>Soho’s culinary scene is a kaleidoscope of flavors. For a classic British experience, try the historic pub The French House, where a pint of ale costs around £6 and the menu features locally sourced fish and chips. If you’re craving Asian street food, head to the vibrant streets of Chinatown, just a short walk away. Dim sum at Four Seasons is legendary – a basket of pork buns is about £4, and the restaurant operates on a first‑come, first‑served basis, so an early dinner is advisable.</p>\n<p>East London’s Shoreditch district offers a hip, ever‑changing street‑food landscape. Boxpark, a pop‑up mall made of shipping containers, houses vendors like Koya for Japanese ramen (£12 per bowl) and The Cheese Bar for artisanal grilled cheese (£9). For a truly local vibe, explore Brick Lane’s curry houses; a three‑course meal at Aladin is roughly £20, and the area stays lively well into the night. Remember to carry cash for smaller stalls, as some still prefer it over card payments.</p>\n\n<h2>End With a Show</h2>\n<p>London’s West End remains the gold standard for world‑class theatre. In 2026, the long‑running musical “The Phantom of the Opera” celebrates its 40th anniversary with a special “Golden Ticket” package that includes a backstage tour for £120. For a more budget‑friendly night, the “Today Tix” app offers same‑day tickets for popular shows like “Hamilton” and “Mamma Mia!” starting at £30, though availability is limited.</p>\n<p>The fringe theatre scene thrives in venues such as the Old Vic’s “Theatre Upstairs” and the intimate “The Vault” in Dalston. Tickets are typically £10‑£20, and you can often catch experimental productions that later move to the West End. Check the “Time Out London” website for weekly listings and consider booking a “pay‑what‑you‑can” slot for emerging playwrights – it’s a great way to support new talent while enjoying a fresh theatrical experience.</p>\n<p>If comedy is more your style, the Comedy Store in Soho offers nightly line‑ups of both established comedians and rising stars. Entry is £12 for a standard seat, with a drink included if you arrive before the show starts. For a truly unique night out, combine a late‑night show with a midnight snack at nearby “Pizza Pilgrims”, where a slice costs just £3.</p>\n\n<p>London is a city that never stops surprising, and this 2026 guide only scratches the surface of what’s on offer. For deeper dives, hidden gems and up‑to‑date recommendations, visit LondonTodo.com. Our team of locals and experts curates the latest guides to help you make the most of every London adventure, whether you’re a first‑time visitor or a seasoned resident.</p>'

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
        <Image src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=630&fit=crop" alt="London skyline" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              The Best Things To Do in London Right Now (2026 Guide)
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">From world-famous landmarks to hidden gems, here is where to start exploring London in 2026.</p>
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
                <>
                  <VideoEmbed url="https://www.youtube.com/embed/pscBeq1Vek8" caption="London from above" />
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop" alt="London skyline at sunset" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">London skyline at sunset</figcaption>
                  </figure>
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&h=500&fit=crop" alt="Westminster Bridge and Big Ben" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">Westminster Bridge and Big Ben</figcaption>
                  </figure>
                </>
              )}
              {i === 2 && (
                <>
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=500&fit=crop" alt="Big Ben with red London bus" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">Big Ben with a classic red London bus</figcaption>
                  </figure>
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=800&h=500&fit=crop" alt="River Thames" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">The River Thames winding through the city</figcaption>
                  </figure>
                </>
              )}
              {i === 3 && (
                <figure className="not-prose my-8">
                  <Image src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=500&fit=crop" alt="Regent Street with flags" width={800} height={500} className="w-full rounded-lg" />
                  <figcaption className="mt-2 text-center text-xs text-ink-400">Regent Street dressed in flags</figcaption>
                </figure>
              )}
              {i === 4 && (
                <>
                  <VideoEmbed url="https://www.youtube.com/embed/LyGO1ReaKPc" caption="London's food scene" />
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop" alt="London food market" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">A bustling London food market</figcaption>
                  </figure>
                </>
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
            {RELATED.filter(r => r.href !== '/articles/best-things-to-do-in-london-2026').slice(0, 4).map(({ href, title }) => (
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
