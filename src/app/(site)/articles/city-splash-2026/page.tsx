import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Music, Ticket, ExternalLink, ArrowRight, Users } from 'lucide-react'
import CountdownTimer from '@/components/shared/CountdownTimer'
import VideoEmbed from '@/components/shared/VideoEmbed'
import ShareButtons from '@/components/shared/ShareButtons'
import StickyMobileCTA from '@/components/shared/StickyMobileCTA'

const TICKET_URL = 'https://go.kaboodle.co.uk/City-Splash-2026'
const ARTICLE_URL = 'https://londontodo.com/articles/city-splash-2026'
const ARTICLE_TITLE =
  "City Splash 2026: London's Biggest Celebration of Caribbean and African Music Returns to Brockwell Park"

export const metadata: Metadata = {
  title: "City Splash 2026: London's Leading Caribbean Music Festival | LondonTodo",
  description:
    'City Splash Festival returns to Brockwell Park in 2026. 60+ artists across 6 stages celebrating reggae, dancehall, afrobeats and amapiano, plus 60+ food vendors and carnival vibes. Book tickets now.',
  keywords: [
    'City Splash 2026',
    'City Splash Festival',
    'London reggae festival',
    'London dancehall festival',
    'afrobeats festival London',
    'Brockwell Park festival',
    'Caribbean music festival London',
    'London festivals 2026',
  ],
  openGraph: {
    title: "City Splash 2026: London's Biggest Celebration of Caribbean and African Music",
    description: 'Reggae, dancehall, afrobeats and amapiano in Brockwell Park. 60+ artists, 6 stages, 60+ food vendors.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://londontodo.com/images/cs-flyer.jpg', width: 1080, height: 1350, alt: 'City Splash Festival 2026' }],
  },
}

function TicketCTA({ children }: { children: string }) {
  return (
    <a
      href={TICKET_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="my-8 flex w-full items-center justify-center rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700 sm:inline-flex sm:w-auto"
    >
      {children} &rarr;
    </a>
  )
}

function Testimonial({ quote, attribution, href }: { quote: string; attribution: string; href?: string }) {
  return (
    <blockquote className="my-10 border-l-4 border-brand-600 py-2 pl-6">
      <p className="text-lg italic leading-relaxed text-ink-700 sm:text-xl">
        {quote}
      </p>
      <cite className="mt-3 block text-sm font-medium not-italic text-ink-400">
        &mdash;{' '}
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600">
            {attribution}
          </a>
        ) : attribution}
      </cite>
    </blockquote>
  )
}

function JsonLd() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ARTICLE_TITLE,
    description: 'City Splash Festival returns to Brockwell Park in 2026 with 60+ artists, 6 stages, and London\'s biggest celebration of Caribbean and African music.',
    image: '/images/cs-hero.jpg',
    datePublished: '2026-03-27T10:00:00+00:00',
    dateModified: '2026-03-27T10:00:00+00:00',
    author: { '@type': 'Organization', name: 'LondonTodo', url: 'https://londontodo.com' },
    publisher: { '@type': 'Organization', name: 'LondonTodo', url: 'https://londontodo.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: 'City Splash Festival 2026',
    startDate: '2026-05-25T12:00:00+01:00',
    endDate: '2026-05-25T23:00:00+01:00',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: 'Brockwell Park', address: { '@type': 'PostalAddress', addressLocality: 'London', addressRegion: 'SE24', addressCountry: 'GB' } },
    description: 'London\'s leading celebration of Caribbean and African music. 60+ artists, 6 stages, 60+ food vendors.',
    image: '/images/cs-hero.jpg',
    offers: { '@type': 'Offer', url: TICKET_URL, availability: 'https://schema.org/InStock' },
    organizer: { '@type': 'Organization', name: 'City Splash' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is City Splash?', acceptedAnswer: { '@type': 'Answer', text: 'City Splash is London\'s leading celebration of Caribbean and African music, held annually in Brockwell Park. It features 60+ artists across 6 stages, 60+ food vendors, and a carnival-like atmosphere.' } },
      { '@type': 'Question', name: 'Where is City Splash held?', acceptedAnswer: { '@type': 'Answer', text: 'Brockwell Park, London SE24. The nearest station is Herne Hill (Southern Rail).' } },
      { '@type': 'Question', name: 'What music genres does City Splash cover?', acceptedAnswer: { '@type': 'Answer', text: 'Reggae, dancehall, afrobeats, amapiano, jungle, garage, and more.' } },
      { '@type': 'Question', name: 'How many people attend City Splash?', acceptedAnswer: { '@type': 'Answer', text: 'Around 30,000 people attend City Splash each year.' } },
      { '@type': 'Question', name: 'Are tickets still available?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, tickets are on sale now but City Splash sells out fast. Book early.' } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

const FAQ_ITEMS = [
  { q: 'What is City Splash?', a: 'City Splash is London\'s leading celebration of Caribbean and African music, held annually in Brockwell Park. It brings together 60+ artists across 6 stages with 60+ food vendors and a carnival-like atmosphere.' },
  { q: 'Where is City Splash held?', a: 'Brockwell Park, London SE24. The nearest station is Herne Hill (Southern Rail), a 5-minute walk from the park entrance.' },
  { q: 'What music genres does City Splash cover?', a: 'Reggae, dancehall, afrobeats, amapiano, jungle, garage, soca, and more.' },
  { q: 'How many people attend?', a: 'Around 30,000 people attend City Splash each year, making it one of London\'s biggest single-day music festivals.' },
  { q: 'What about food and drink?', a: 'Over 60 food vendors serve Caribbean and international street food, from jerk chicken and ackee to plantain and ital stew. Plus bars, cocktails, and rum punch.' },
  { q: 'Are tickets still available?', a: 'Yes, tickets are on sale now but City Splash sells out. Book early to avoid disappointment.' },
]

const GALLERY_IMAGES = [
  '/images/cs-diverse-1.jpg',
  '/images/cs-diverse-2.jpg',
  '/images/cs-diverse-3.jpg',
  '/images/cs-diverse-4.jpg',
  '/images/cs-diverse-5.jpg',
  '/images/cs-diverse-6.jpg',
]

export default function CitySplashPage() {
  return (
    <>
      <JsonLd />

      <article>
        {/* Hero */}
        <header className="relative overflow-hidden bg-ink-900">
          <Image
            src="/images/cs-hero.jpg"
            alt="City Splash Festival live performance at Brockwell Park"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-ink-900/95" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                London Festival Pick
              </span>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                City Splash 2026: London&apos;s Biggest Celebration of Caribbean and African Music
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                30,000 people. 60+ artists. 6 stages. 60+ food vendors. Brockwell Park comes alive with reggae, dancehall, afrobeats, amapiano and pure carnival energy.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 25th May 2026</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Brockwell Park, London</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 30,000 attendees</span>
              </div>
              <div className="mt-4 flex justify-center">
                <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
              </div>
              <div className="mt-8">
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700">
                  Book Tickets Now <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Countdown mobile */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:hidden lg:px-8">
          <CountdownTimer />
        </div>

        {/* Two-column layout */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Main article */}
            <main className="lg:col-span-2">
              <div className="prose prose-lg mx-auto max-w-article">

                <p className="font-bold">
                  There is a moment at City Splash, usually somewhere around mid-afternoon, when you stop, look around, and realise you are in the middle of something genuinely special. The bass is shaking through your chest. The smell of jerk chicken is drifting across the park. Thousands of people are dancing, laughing, and living in a way that feels completely, beautifully unforced. This is not just a music festival. This is a cultural moment.
                </p>

                <h2>Why City Splash Is a London Institution in the Making</h2>

                <p>
                  Since launching in 2021, City Splash has become one of the capital&apos;s most anticipated annual events, drawing around 30,000 people to Brockwell Park each year. It delivers a level of energy, authenticity and cultural richness that you will not find anywhere else in the London festival calendar.
                </p>

                <Testimonial
                  quote="Unmatched in its authenticity."
                  attribution="Viper Magazine"
                />

                {/* Video 1: Tarrus Riley */}
                <VideoEmbed
                  url="https://www.youtube.com/embed/4OSWsbfFLn0"
                  caption="Tarrus Riley performs She's Royal live at City Splash 2025"
                />

                <TicketCTA>Book City Splash 2026 Tickets</TicketCTA>

                <h2>60+ Artists, 6 Stages, One Unforgettable Day</h2>

                <p>
                  Across six stages, you will find everything from legendary dancehall artists and reggae royalty to the hottest names in afrobeats, amapiano, jungle, garage and soca. You might catch a living legend of roots reggae on one stage, walk fifty metres and find yourself in the middle of a high-energy amapiano set, then round a corner and discover a sound system session that transports you straight to a Jamaican dance. The festival honours its Caribbean and African roots while embracing the full spectrum of Black British music culture.
                </p>

                <Testimonial
                  quote="A celebration of culture, music and pure unfiltered joy."
                  attribution="The Pit London"
                />

                {/* Video 2: 2026 Lineup */}
                <VideoEmbed
                  url="https://www.youtube.com/embed/7xNCfATaqi4"
                  caption="City Splash 2026 lineup announcement"
                />

                {/* Photo Gallery */}
                <div className="not-prose my-12">
                  <h3 className="mb-4 font-display text-xl font-extrabold text-ink-900">
                    The City Splash Experience
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                    {GALLERY_IMAGES.map((src, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={src}
                          alt={`City Splash festival photo ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <h2>More Than Music: Food, Culture and Community</h2>

                <p>
                  If the music is the heart of City Splash, the food is its soul. Over 60 street food vendors serve some of the best Caribbean and international food you will find anywhere in London. We are talking proper jerk chicken cooked low and slow over pimento wood, ackee and saltfish, curried goat, ital stew, plantain every way you can imagine, and plenty more besides. This is not festival food as an afterthought. This is festival food as a headline act.
                </p>

                <p>
                  Beyond the food, City Splash is a genuine celebration of Caribbean and African culture in its fullest sense. The atmosphere is warm, inclusive and intergenerational. You will see families, friend groups, couples and solo adventurers all sharing the same space with the same infectious energy. There are market stalls, rum bars, sound system sessions, and the kind of spontaneous, communal dancing that breaks out when the right tune drops at the right moment. It is the closest thing to Notting Hill Carnival in a one-day festival format.
                </p>

                <Testimonial
                  quote="A powerful celebration of Caribbean and African music, food, and heritage."
                  attribution="WorlMag"
                />

                <TicketCTA>Get Tickets Before They Sell Out</TicketCTA>

                <h2>Why You Should Book Now</h2>

                <p>
                  City Splash has sold out in previous years, and with the festival&apos;s reputation growing fast, 2026 is shaping up to be the biggest edition yet. 30,000 tickets across a single day means demand is high, and once word spreads about the lineup, they will go quickly.
                </p>

                <p>
                  For the price of a single ticket, you get a full day of world-class live music across six stages, access to 60+ food vendors, a carnival atmosphere that you simply cannot replicate anywhere else in London, and the kind of energy that stays with you long after the last tune fades. If you have been on the fence, this is your sign.
                </p>

                {/* FAQ */}
                <h2>Frequently Asked Questions</h2>

                <div className="not-prose my-8 divide-y divide-ink-100 rounded-xl border border-ink-100">
                  {FAQ_ITEMS.map(({ q, a }) => (
                    <div key={q} className="px-6 py-5">
                      <h3 className="font-display text-base font-bold text-ink-900">{q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{a}</p>
                    </div>
                  ))}
                </div>

                {/* Related links */}
                <h2>More London Festival Guides</h2>
                <div className="not-prose my-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { href: '/articles/cross-the-tracks-2026', title: 'Cross The Tracks 2026' },
                    { href: '/events/browse', title: 'Browse All London Events' },
                    { href: '/free-in-london', title: 'Free Things to Do in London' },
                  ].map(({ href, title }) => (
                    <Link key={href} href={href} className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                      <span className="flex-1">{title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition-colors group-hover:text-brand-600" />
                    </Link>
                  ))}
                </div>

                <h2>Our Recommendation</h2>

                <p>
                  City Splash is one of those festivals that transcends the usual formula. It is not just about who is on stage, although the lineup is always exceptional. It is about how it feels to be there, surrounded by 30,000 people who are genuinely, visibly having the time of their lives. It is warm, it is loud, it is joyful, and it is deeply rooted in the Caribbean and African culture that makes London one of the most exciting cities in the world.
                </p>

                <p>
                  If you love reggae, dancehall, afrobeats or amapiano, if you love great food and carnival energy, or if you just want one of the best days out London has to offer, get your City Splash tickets now. You will not regret it.
                </p>

                <TicketCTA>Get Tickets: City Splash 2026</TicketCTA>

                <div className="not-prose mt-10 flex items-center gap-3 border-t border-ink-100 pt-6">
                  <span className="text-sm font-medium text-ink-500">Share this article</span>
                  <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
                </div>
              </div>
            </main>

            {/* Right sidebar */}
            <aside>
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* Flyer */}
                <a href="https://www.city-splash.com/" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                  <Image
                    src="/images/cs-flyer.jpg"
                    alt="City Splash 2026 festival flyer"
                    width={540}
                    height={675}
                    className="h-auto w-full rounded-lg"
                  />
                </a>

                <div className="hidden lg:block">
                  <CountdownTimer />
                </div>

                <div className="rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">Quick Facts</h3>
                  <ul className="space-y-3 text-sm text-ink-600">
                    <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>25th May 2026</span></li>
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Brockwell Park, London SE24</span></li>
                    <li className="flex items-start gap-2"><Music className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Reggae, Dancehall, Afrobeats, Amapiano</span></li>
                    <li className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>30,000 attendees</span></li>
                    <li className="flex items-start gap-2"><Ticket className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Tickets on sale now</span></li>
                  </ul>
                  <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700">
                    Get Tickets <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="rounded-lg border-2 border-brand-100 bg-brand-50 p-5 text-center">
                  <p className="font-display text-base font-extrabold text-ink-900">Don&apos;t miss out</p>
                  <p className="mt-1 text-sm text-ink-500">City Splash sells out every year</p>
                  <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700">
                    Get Tickets Now <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <StickyMobileCTA ticketUrl={TICKET_URL} text="Get City Splash Tickets" />
    </>
  )
}
