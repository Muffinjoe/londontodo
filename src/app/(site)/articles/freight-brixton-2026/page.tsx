import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import VideoEmbed from '@/components/shared/VideoEmbed'
import CountdownTimer from '@/components/shared/CountdownTimer'
import StickyMobileCTA from '@/components/shared/StickyMobileCTA'
import NewsletterBox from '@/components/shared/NewsletterBox'

const TICKET_URL = 'https://www.freightbrixton.com/freightopening'
const SITE_URL = 'https://www.freightbrixton.com/'
const ARTICLE_URL = 'https://www.londontodo.com/articles/freight-brixton-2026'
const ARTICLE_TITLE = "Freight Brixton: London's Biggest Rooftop Venue Is Opening This May"

export const metadata: Metadata = {
  title: "Freight Brixton: London's Biggest Rooftop Venue Opens May 2026 | LondonTodo",
  description: "Freight Brixton opens 7th May 2026 in the heart of Brixton. London's biggest rooftop venue with live music, DJs, street food, cocktail bars, and big-screen sports.",
  keywords: ['Freight Brixton', 'Brixton rooftop venue', 'new venue Brixton', 'London rooftop bar', 'Brixton events 2026', 'London new openings 2026'],
  openGraph: {
    title: ARTICLE_TITLE,
    description: "London's biggest rooftop venue opens in Brixton. Live music, DJs, food, cocktails, and big-screen sports from May 7th.",
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://www.londontodo.com/images/freight-hero.jpg', width: 1200, height: 630, alt: 'Freight Brixton rooftop venue' }],
  },
}

function TicketCTA({ children }: { children: string }) {
  return (
    <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="my-8 flex w-full items-center justify-center rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700 sm:inline-flex sm:w-auto">
      {children} &rarr;
    </a>
  )
}

function JsonLd() {
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: ARTICLE_TITLE,
      image: '/images/freight-hero.jpg',
      datePublished: '2026-03-30T10:00:00+00:00',
      author: { '@type': 'Organization', name: 'LondonTodo' },
      publisher: { '@type': 'Organization', name: 'LondonTodo' },
    },
    {
      '@context': 'https://schema.org', '@type': 'Place',
      name: 'Freight Brixton',
      address: { '@type': 'PostalAddress', streetAddress: '33 Brixton Station Road', addressLocality: 'London', postalCode: 'SW9 8PB', addressCountry: 'GB' },
      url: SITE_URL,
    },
  ]
  return <>{schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}</>
}

const BODY = '<p><strong>Brixton is about to level up in a way that will make the whole of London sit up and take notice – a brand‑new rooftop destination is set to rise above the streets, promising unforgettable nights, mouth‑watering food and a front‑row seat to the biggest sporting moments.</strong></p>\n\n<h2>What Is Freight Brixton?</h2>\n\n<p>Freight Brixton is not just another bar perched on a roof; it is a cultural hub built on the idea that great food, great music and great sport belong together.  Situated at 33 Brixton Station Road, London SW9 8PB, the venue claims the title of “London’s biggest rooftop venue” and lives up to it with a sprawling open‑air deck that stretches out over the bustling heart of Brixton.  The design blends industrial chic with lush greenery, giving the space a relaxed yet sophisticated vibe that feels both local and world‑class.</p>\n\n<p>The concept is talent‑led from the ground up.  A rotating roster of acclaimed chefs runs pop‑up kitchens that showcase everything from Caribbean street fare to modern British tasting menus, while a collection of distinctive bars serves creative cocktails crafted by award‑winning mixologists.  Every element is curated to spark conversation, inspire movement and celebrate the diversity that makes Brixton a global hotspot.</p>\n\n<p>Opening its doors on 7 May 2026, Freight Brixton arrives at a moment when the neighbourhood’s energy is already humming.  By adding a roof that can host live bands, DJ sets, film screenings and massive sports events, the venue amplifies the area’s reputation as a place where culture is lived, not just observed.  It is a place where a night out can start with a tasting plate, evolve into a dance‑floor frenzy and end with a collective cheer as a team scores the winning goal on a giant screen.</p>\n\n<h2>The Lineup This Summer</h2>\n\n<p>From the moment the first beat drops on opening night, the summer calendar reads like a festival programme for the city’s most discerning night‑owls.  Here are the headline moments you won’t want to miss:</p>\n\n<ul>\n  <li><strong>May 7 – Blue Lab Beats</strong> – The inaugural night that will set the tone for everything that follows.</li>\n  <li><strong>May 9 – David Rodigan</strong> – Legendary reggae broadcaster brings his deep‑rooted love of the genre to the rooftop.</li>\n  <li><strong>May 10 – Caribbean Rocks</strong> – A sun‑soaked celebration of island rhythms, perfect for a warm evening.</li>\n  <li><strong>May 21 – IYAMAH</strong> – Cutting‑edge electronic beats that will keep the crowd moving till dawn.</li>\n  <li><strong>May 23 – Maggis Pon De Roof</strong> – A night of soulful house and vocal cuts that feel like a rooftop sunrise.</li>\n  <li><strong>May 24 – Soca On De Roof</strong> – High‑energy soca anthems that turn the deck into a carnival.</li>\n  <li><strong>May 30 – Ghosts of Garage w/ Kele Le Roc &amp; Sticky</strong> – A nostalgic dive into UK garage with two of its biggest architects.</li>\n  <li><strong>June 4 – Zenel</strong> – A blend of Afro‑beat and deep house that captures the spirit of Brixton’s multicultural roots.</li>\n  <li><strong>June 6 – Dimitri From Paris</strong> – The French maestro spins a seamless mix of disco, funk and house.</li>\n  <li><strong>June 11 – 9 Days</strong> – A collective of rising producers delivering fresh, genre‑bending sounds.</li>\n  <li><strong>June 18 – edbl</strong> – Dark, hypnotic techno that will make the rooftop pulse with intensity.</li>\n  <li><strong>June 20 – DJ Spen</strong> – House legend brings his signature groove to the London sky.</li>\n  <li><strong>June 25 – Sambroso All Stars</strong> – A celebration of Latin rhythms, salsa and tropical vibes.</li>\n  <li><strong>June 28 – London Reggae Festival</strong> – A full‑day immersion in roots, dub and modern reggae.</li>\n  <li><strong>July 11 – Greg Wilson</strong> – The pioneer of the UK club scene delivers a masterclass in disco‑infused sets.</li>\n  <li><strong>July 23 – Secret Night Gang</strong> – An underground party that promises surprise guests and secret locations within the venue.</li>\n  <li><strong>July 26 – Reggae Brunch</strong> – A laid‑back midday gathering with live reggae, brunch plates and bottomless mimosas.</li>\n</ul>\n\n<p>In addition to the music, Freight Brixton will host the FIFA Club World Cup 2025 screenings, featuring marquee match‑ups such as Senegal vs France, USA vs Australia and Germany vs Ivory Coast.  The massive screen ensures every goal, every save and every celebration is felt by the whole crowd.</p>\n\n<h2>Food, Drinks and the Rooftop Experience</h2>\n\n<p>Freight Brixton’s culinary programme is a feast for the senses.  The venue partners with a rotating lineup of food vendors, each chosen for their ability to tell a story through flavour.  One night you might be sampling Jamaican jerk chicken from a chef who grew up on the streets of Kingston, the next you could be tasting a modern British tasting menu that reinterprets classic dishes with a sustainable twist.  All dishes are served on sleek, communal tables that encourage strangers to become friends over shared plates.</p>\n\n<p>The bar scene is equally adventurous.  Three signature cocktail bars line the perimeter of the deck, each with its own personality.  The “Garden Bar” focuses on herb‑infused concoctions, the “Retro Lounge” revives classic London cocktails with a contemporary spin, and the “Skyline Bar” offers a curated list of natural wines and craft beers that pair perfectly with the city lights.  For those who prefer something non‑alcoholic, a selection of artisanal sodas, cold‑pressed juices and mocktails keeps the vibe inclusive.</p>\n\n<p>Beyond food and drink, the rooftop itself is designed to be an immersive playground.  Comfortable lounge pods, fire pits for cooler evenings, and a series of LED installations that change colour with the music create a dynamic backdrop.  The open‑air layout means the city’s skyline becomes part of the performance, with the iconic Brixton Academy and the London Eye visible on clear nights.</p>\n\n<h2>Sport on the Big Screen</h2>\n\n<p>When the roar of a crowd is needed, Freight Brixton turns its massive LED screen into a stadium for the city.  The venue’s state‑of‑the‑art projection system delivers crystal‑clear images of the FA Cup, Champions League and World Cup, making every match feel like a front‑row experience.  Thursday through Sunday programming ensures there’s always a game to catch, whether you’re a die‑hard football fan or just enjoy the communal buzz of a shared viewing.</p>\n\n<p>Match‑day at Freight Brixton is a sensory celebration.  The crowd gathers on the deck, drinks in hand, while the scent of sizzling street food fills the air.  Half‑time brings surprise performances from local musicians, and the post‑match atmosphere is alive with debate, laughter and the occasional impromptu chant.  It’s the perfect blend of sport, music and community – a true reflection of Brixton’s lively spirit.</p>\n\n<h2>Why You Should Get There Early</h2>\n\n<p>The buzz around Freight Brixton is already palpable, and the opening night with Blue Lab Beats is expected to sell out within hours of tickets going on sale.  Securing your spot early not only guarantees entry to the most talked‑about rooftop launch of the year, it also locks in access to a summer packed with world‑class events that are likely to fill up fast.</p>\n\n<p>Early birds will also benefit from exclusive perks: priority seating on the deck, complimentary welcome drinks, and a chance to meet the chefs and artists behind the night’s programme.  With a limited number of tickets for each event, waiting until the last minute could mean missing out on the very experiences that will define London’s summer cultural calendar.</p>\n\n<p>So mark your calendars, set your alarms and be ready to claim your place on the roof of Brixton.  Freight Brixton isn’t just a venue – it’s a destination where food, music, sport and community converge under the open sky.  This summer, the city’s most vibrant rooftop will be the place to be, and the only regret will be not arriving early enough to soak it all in.</p>'

const EVENTS = [
  { date: 'May 7', name: 'Blue Lab Beats', note: 'Opening Night' },
  { date: 'May 9', name: 'David Rodigan', note: '' },
  { date: 'May 10', name: 'Caribbean Rocks', note: '' },
  { date: 'May 21', name: 'IYAMAH', note: '' },
  { date: 'May 23', name: 'Maggis Pon De Roof', note: '' },
  { date: 'May 24', name: 'Soca On De Roof', note: '' },
  { date: 'May 30', name: 'Ghosts of Garage w/ Kele Le Roc & Sticky', note: '' },
  { date: 'Jun 6', name: 'Dimitri From Paris', note: '' },
  { date: 'Jun 11', name: '9 Days', note: '' },
  { date: 'Jun 18', name: 'edbl', note: '' },
  { date: 'Jun 20', name: 'DJ Spen', note: '' },
  { date: 'Jun 25', name: 'Sambroso All Stars', note: '' },
  { date: 'Jun 28', name: 'London Reggae Festival', note: '' },
  { date: 'Jul 11', name: 'Greg Wilson', note: '' },
  { date: 'Jul 23', name: 'Secret Night Gang', note: '' },
  { date: 'Jul 26', name: 'Reggae Brunch', note: '' },
]

export default function Page() {
  const sections = BODY.split(/(?=<h2)/i)

  return (
    <>
      <JsonLd />
      <article>
        <header className="relative overflow-hidden bg-ink-900">
          <Image src="/images/freight-venue-2.jpg" alt="Freight Brixton - London's Biggest Rooftop Venue" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-ink-900/95" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">New Opening</span>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Freight Brixton: London&apos;s Biggest Rooftop Venue Is Opening This May
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
                Live music, DJs, street food, cocktail bars, and big-screen sports. Brixton&apos;s most exciting new venue opens 7th May 2026.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Opens 7th May 2026</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> 33 Brixton Station Road, SW9</span>
              </div>
              <div className="mt-4 flex justify-center"><ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} /></div>
              <div className="mt-8">
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700">
                  See Upcoming Events <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <main className="lg:col-span-2">
              <div className="mx-auto max-w-article">
                {sections.map((section, i) => (
                  <div key={i}>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: section }} />

                    {i === 1 && (
                      <>
                        <a href="https://www.freightbrixton.com/" target="_blank" rel="noopener noreferrer" className="not-prose my-8 block">
                          <figure>
                            <Image src="/images/freight-hero.jpg" alt="Freight Brixton - London's Biggest Rooftop Venue" width={800} height={400} className="w-full rounded-lg transition-opacity hover:opacity-90" />
                            <figcaption className="mt-2 text-center text-xs text-ink-400">Freight Brixton — London&apos;s Biggest Rooftop Venue</figcaption>
                          </figure>
                        </a>
                        <TicketCTA>See All Upcoming Events</TicketCTA>
                      </>
                    )}

                    {i === 2 && (
                      <a href="https://www.freightbrixton.com/freightopening" target="_blank" rel="noopener noreferrer" className="not-prose my-8 block">
                        <figure>
                          <Image src="/images/freight-events.jpg" alt="Freight Brixton summer 2026 event lineup" width={800} height={400} className="w-full rounded-lg transition-opacity hover:opacity-90" />
                          <figcaption className="mt-2 text-center text-xs text-ink-400">Coming this summer at Freight Brixton</figcaption>
                        </figure>
                      </a>
                    )}

                    {i === 3 && (
                      <>
                        <a href="https://www.freightbrixton.com/" target="_blank" rel="noopener noreferrer" className="not-prose my-8 block">
                          <figure>
                            <Image src="/images/freight-venue-1.jpg" alt="Freight Brixton venue seating and screen" width={800} height={400} className="w-full rounded-lg transition-opacity hover:opacity-90" />
                            <figcaption className="mt-2 text-center text-xs text-ink-400">The main space at Freight Brixton</figcaption>
                          </figure>
                        </a>
                        <TicketCTA>Book Your Spot at Freight Brixton</TicketCTA>
                      </>
                    )}
                  </div>
                ))}

                {/* Upcoming Events List */}
                <div className="not-prose my-12">
                  <h2 className="font-display text-2xl font-extrabold text-ink-900">Upcoming Events at Freight Brixton</h2>
                  <div className="mt-6 divide-y divide-ink-100 rounded-xl border border-ink-100">
                    {EVENTS.map((ev) => (
                      <div key={ev.name} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-ink-900 text-white">
                          <span className="text-[10px] font-bold uppercase leading-none">{ev.date.split(' ')[0]}</span>
                          <span className="text-lg font-extrabold leading-none">{ev.date.split(' ')[1]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-sm font-bold text-ink-900">{ev.name}</p>
                          {ev.note && <p className="text-xs text-brand-600 font-semibold">{ev.note}</p>}
                        </div>
                        <a href="https://www.freightbrixton.com/freightopening" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-700">
                          Get Tickets
                        </a>
                      </div>
                    ))}
                  </div>
                  <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700">
                    See All Events & Book <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <TicketCTA>Visit Freight Brixton</TicketCTA>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Link href="/articles/city-splash-2026" className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                    <span className="flex-1">City Splash 2026</span>
                    <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
                  </Link>
                  <Link href="/articles/cross-the-tracks-2026" className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                    <span className="flex-1">Cross The Tracks 2026</span>
                    <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
                  </Link>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-ink-100 pt-6">
                  <span className="text-sm font-medium text-ink-500">Share this article</span>
                  <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
                </div>
              </div>
            </main>

            <aside>
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">Freight Brixton</h3>
                  <ul className="space-y-3 text-sm text-ink-600">
                    <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Opens 7th May 2026</span></li>
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>33 Brixton Station Road, SW9 8PB</span></li>
                  </ul>
                  <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700">
                    Upcoming Events <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-medium text-brand-600 hover:text-brand-700">
                  Visit freightbrixton.com &rarr;
                </a>

                <NewsletterBox variant="sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </article>
      <StickyMobileCTA ticketUrl={TICKET_URL} text="See Freight Events" />
    </>
  )
}
