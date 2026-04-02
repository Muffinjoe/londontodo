import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Music, Ticket, ExternalLink, ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import VideoEmbed from '@/components/shared/VideoEmbed'
import StickyMobileCTA from '@/components/shared/StickyMobileCTA'
import CountdownTimer from '@/components/shared/CountdownTimer'

const TICKET_URL = 'https://go.kaboodle.co.uk/City-Splash-2026'
const ARTICLE_URL = 'https://londontodo.com/articles/city-splash-food-culture'
const ARTICLE_TITLE = "City Splash 2026: Why This Is London's Best Festival for Caribbean Food, Music and Culture"

export const metadata: Metadata = {
  title: "City Splash 2026: London's Best Festival for Caribbean Food & Culture | LondonTodo",
  description: 'City Splash brings 60+ Caribbean food vendors, craft rum bars, artisan markets and sound system culture to Brockwell Park. Here is why the food and culture experience is unmissable.',
  keywords: ['City Splash food', 'Caribbean food festival London', 'jerk chicken festival', 'London Caribbean culture', 'Brockwell Park festival food'],
  openGraph: {
    title: ARTICLE_TITLE,
    description: '60+ Caribbean food vendors, craft rum bars, sound system culture. Why City Splash is London\'s best festival for Caribbean food and culture.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://londontodo.com/images/cs-flyer.jpg', width: 1080, height: 1350, alt: 'City Splash 2026' }],
  },
}

function TicketCTA({ children }: { children: string }) {
  return (
    <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="my-8 flex w-full items-center justify-center rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700 sm:inline-flex sm:w-auto">
      {children} &rarr;
    </a>
  )
}

export default function Page() {
  const BODY = '<h2>The Food Scene</h2>\n<p>City Splash 2026 (25th May, Brockwell Park) brings together more than sixty food traders serving everything from smoky <strong>jerk chicken</strong> and <strong>ackee and saltfish</strong> to richly spiced <strong>curried goat</strong> and sweet <strong>plantain</strong>. Veteran vendors serve recipes passed down through generations, while younger chefs experiment with fusion dishes – think jerk‑spiced tacos, plantain‑based desserts, and rum‑infused ice‑cream. Craft beer and rum bars round out the experience with aged Jamaican and Barbadian rums alongside tropical mixers.</p>\n\n<h2>Cultural Experience Beyond Stages</h2>\n<p>Artisan market stalls line the park’s pathways, offering hand‑woven baskets, vibrant prints, jewellery crafted from reclaimed wood, and paintings that capture the rhythm of island life. Workshops on Caribbean dance, storytelling circles, and panels on the legacy of Black British entrepreneurship are woven into the schedule. The atmosphere feels like a neighbourhood block party amplified for 30,000 enthusiastic festival‑goers.</p>\n\n<h2>Sound System Culture</h2>\n<p>At the core of City Splash’s identity is the reverence for sound system culture – a tradition that began on the streets of Kingston and found a second home in London’s Afro‑Caribbean neighbourhoods. Six stages are spread across the park, each one a tribute to a different facet of the Caribbean musical spectrum. The main stage pulses with classic <strong>reggae</strong> anthems and contemporary roots, while a dedicated dancehall arena keeps the energy high with the latest riddims.</p>\n\n<p>Beyond the familiar, the festival embraces the continent’s evolving soundscape. A vibrant <strong>afrobeats</strong> tent showcases the pan‑African rhythms that dominate today’s charts, and an <strong>amapiano</strong> corner introduces Londoners to the South African house style that has taken the world by storm. Headliners such as Beres Hammond, Gyptian, and Jada Kingdom sit alongside emerging talent, creating a dialogue between generations. The sound system set‑ups, complete with towering speaker stacks and charismatic MCs, recreate the authentic vibe of a Jamaican street party, reminding us that music is as much about community as it is about melody.</p>\n\n<h2>Why This Matters for London</h2>\n<p>London has long been a melting pot of cultures, and festivals are the most visible expressions of that diversity. Notting Hill Carnival, with its historic roots and massive crowds, has set a high bar for celebration. City Splash, however, offers a more intimate yet equally powerful experience. While Notting Hill spreads across several streets, City Splash concentrates its energy within the green expanse of Brockwell Park, allowing visitors to linger over a plate of curried goat, sip a rum cocktail, and then move seamlessly to a nearby stage for a reggae set.</p>\n\n<p>The festival’s focus on Caribbean and Black British culture fills a vital niche in the city’s cultural calendar. It provides a platform for Black entrepreneurs, musicians, and artists to showcase their work to a broad audience, fostering economic opportunities and cultural pride. By drawing 30,000 people together, City Splash demonstrates the appetite for authentic, community‑driven events that go beyond spectacle and instead nurture genuine connection.</p>\n\n<p>Moreover, the festival’s emphasis on sustainability – encouraging public transport, providing bike parking, and promoting reusable containers – aligns with London’s green ambitions. It proves that a large‑scale celebration can be both vibrant and responsible, setting a benchmark for future events across the capital.</p>\n\n<h2>Closing Recommendation</h2>\n<p>If you are looking for a festival that feeds the soul as much as it feeds the stomach, City Splash 2026 is the answer. The combination of over sixty food vendors serving everything from smoky jerk chicken to sweet plantain, a bustling artisan market, craft beer and rum bars, and a lineup that spans reggae, dancehall, afrobeats and amapiano creates an all‑encompassing cultural feast. Add to that the authentic sound system atmosphere and the sense of community that radiates through every corner of Brockwell Park, and you have a festival that not only rivals but, in many ways, surpasses the experience of Notting Hill Carnival.</p>\n\n<p>Mark your calendar for 25 May 2026, grab a ticket, and prepare to be swept away by the sights, sounds, and flavours that make City Splash London’s premier celebration of Caribbean food, music and culture. This is more than a day out – it is a vibrant reminder of the city’s rich multicultural tapestry, and an invitation to taste, hear, and feel it all in one unforgettable afternoon.</p>'
  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-ink-900">
          <Image src="/images/cs-diverse-9.jpg" alt="City Splash Festival carnival dancers" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-ink-900/95" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">London Festival Pick</span>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                City Splash 2026: Why This Is London&apos;s Best Festival for Caribbean Food, Music and Culture
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
                60+ food vendors. Craft rum bars. Artisan markets. Sound system culture. Here is why City Splash is about so much more than the music.
              </p>
              <div className="mt-4 flex justify-center"><ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} /></div>
              <div className="mt-8">
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700">
                  Book Tickets Now <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <main className="lg:col-span-2">
              <div className="mx-auto max-w-article">
                {(() => {
                  const sections = BODY.split(/(?=<h2)/i)
                  return sections.map((section, i) => (
                    <div key={i}>
                      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: section }} />

                      {/* After section 1: Tarrus Riley video */}
                      {i === 1 && (
                        <VideoEmbed url="https://www.youtube.com/embed/4OSWsbfFLn0" caption="Tarrus Riley performs She's Royal live at City Splash 2025" />
                      )}

                      {/* After section 2: first 3 gallery photos + CTA */}
                      {i === 2 && (
                        <>
                          <div className="not-prose my-10">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                              {['/images/cs-diverse-10.jpg', '/images/cs-diverse-11.jpg', '/images/cs-diverse-12.jpg', '/images/cs-diverse-5.jpg', '/images/cs-diverse-2.jpg', '/images/cs-diverse-16.jpg'].map((src, n) => (
                                <div key={n} className="relative aspect-square overflow-hidden rounded-lg">
                                  <Image src={src} alt={`City Splash photo ${n + 1}`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="33vw" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <TicketCTA>Book City Splash 2026 Tickets</TicketCTA>
                        </>
                      )}

                      {/* After section 3: lineup video */}
                      {i === 3 && (
                        <VideoEmbed url="https://www.youtube.com/embed/7xNCfATaqi4" caption="City Splash 2026 lineup announcement" />
                      )}

                      {/* After last section: remaining gallery */}
                      {i === sections.length - 1 && (
                        <div className="not-prose my-10">
                          <h3 className="mb-4 font-display text-xl font-extrabold text-ink-900">The City Splash Experience</h3>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {['/images/cs-diverse-18.jpg', '/images/cs-diverse-14.jpg', '/images/cs-diverse-17.jpg', '/images/cs-diverse-4.jpg', '/images/cs-diverse-8.jpg', '/images/cs-diverse-15.jpg'].map((src, n) => (
                              <div key={n} className="relative aspect-square overflow-hidden rounded-lg">
                                <Image src={src} alt={`City Splash photo ${n + 4}`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="33vw" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                })()}

                <TicketCTA>Get City Splash 2026 Tickets</TicketCTA>
              </div>
              <div className="mx-auto max-w-article mt-8 grid gap-4 sm:grid-cols-2">
                <Link href="/articles/city-splash-2026" className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                  <span className="flex-1">City Splash 2026: Full Guide</span>
                  <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
                </Link>
                <Link href="/articles/city-splash-first-timers-guide" className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
                  <span className="flex-1">First-Timer&apos;s Guide</span>
                  <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
                </Link>
              </div>
              <div className="mx-auto max-w-article mt-10 flex items-center gap-3 border-t border-ink-100 pt-6">
                <span className="text-sm font-medium text-ink-500">Share this article</span>
                <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
              </div>
            </main>
            <aside>
              <div className="space-y-6 lg:sticky lg:top-24">
                <a href="https://www.city-splash.com/" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                  <Image src="/images/cs-flyer.jpg" alt="City Splash 2026 flyer" width={540} height={675} className="h-auto w-full rounded-lg" />
                </a>
                <CountdownTimer />
                <div className="rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">Quick Facts</h3>
                  <ul className="space-y-3 text-sm text-ink-600">
                    <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>25th May 2026</span></li>
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Brockwell Park, London SE24</span></li>
                    <li className="flex items-start gap-2"><Music className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Reggae, Dancehall, Afrobeats, Amapiano</span></li>
                    <li className="flex items-start gap-2"><Ticket className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><span>Tickets on sale now</span></li>
                  </ul>
                  <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700">
                    Get Tickets <ExternalLink className="h-4 w-4" />
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
