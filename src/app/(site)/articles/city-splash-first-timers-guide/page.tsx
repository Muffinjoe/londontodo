import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Music, Ticket, ExternalLink, ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import VideoEmbed from '@/components/shared/VideoEmbed'
import StickyMobileCTA from '@/components/shared/StickyMobileCTA'

const TICKET_URL = 'https://go.kaboodle.co.uk/City-Splash-2026'
const ARTICLE_URL = 'https://londontodo.com/articles/city-splash-2026'
const ARTICLE_TITLE = "Going to City Splash for the First Time? Here's Everything You Need to Know"

export const metadata: Metadata = {
  title: "City Splash 2026: London's Best Festival for Caribbean Food & Culture | LondonTodo",
  description: 'Everything you need to know before your first City Splash. Getting there, what to expect, the music, the food, and tips for making the most of the day.',
  keywords: ['City Splash food', 'City Splash guide', 'first time City Splash', 'City Splash tips', 'what to expect City Splash'],
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
  const BODY = '<h2>What is City Splash?</h2>\n<p>Every spring, Brockwell Park in South London transforms into a vibrant celebration of Caribbean and African culture, and the heartbeat of that transformation is City Splash.  It is a one‑day festival that brings together the best of reggae, dancehall, afrobeats, amapiano, jungle and garage under a canopy of sunshine and community spirit.  With a line‑up that reads like a love letter to the islands and the continent, the event draws more than 30,000 people who come to dance, eat, and share in a carnival‑like energy that feels both massive and intimately welcoming.  Whether you are a seasoned festival‑goer or a curious newcomer, City Splash promises a day that feels like a warm hug from the city itself.</p>\n\n<h2>Getting there</h2>\n<p>The easiest way to reach the festival is by train to Herne Hill station, served by Southern Rail on the routes from London Victoria, London Bridge and beyond.  From the station, it is a short, lively walk south along Norwood Road, past the iconic Brockwell Lido, and straight into the park’s main entrance.  If you prefer the bus, routes 68, 322 and 432 all stop nearby, and there are plenty of cycle‑friendly paths that lead straight to the festival grounds.  Arriving early gives you a chance to soak up the pre‑festival buzz, find a good spot near your favourite stage, and avoid the later rush of crowds.</p>\n\n<h2>What to expect</h2>\n<p>City Splash is laid out across six distinct stages, each with its own personality and musical focus.  The Main Stage anchors the festival with headline reggae and dancehall acts, while the Roots Stage offers deeper dub and conscious roots vibes.  The Afrobeats Arena pulses with the latest hits from West Africa, and the Amapiano Corner brings the smooth, piano‑driven sounds of South Africa to the London crowd.  The Jungle & Garage Tent keeps the energy high with break‑beats and UK garage classics, and the Chill‑Out Lounge provides a relaxed space for a quick breather and some soulful acoustic sets.</p>\n<p>Beyond the music, the festival boasts more than 60 Black‑owned food vendors, each offering a taste of home, heritage, and innovation.  From smoky jerk chicken and pepper‑pot stew to sweet plantain fritters and contemporary vegan twists on traditional dishes, the food court is a culinary adventure in its own right.  The atmosphere is deliberately inclusive: families, friends, solo explorers and couples all mingle on the grassy lawns, sharing smiles, stories, and spontaneous dance moves.</p>\n\n<h2>The music</h2>\n<p>The musical programme is the festival’s lifeblood.  Reggae lovers will hear legends and rising stars delivering those laid‑back rhythms and socially conscious lyrics that have defined the genre for decades.  Dancehall fans can expect high‑energy performances that keep the crowd moving from sunrise to sunset.  Afrobeats brings the fast‑paced, melodic hooks that dominate global charts, while Amapiano adds a soulful, jazzy flavour that has taken South Africa by storm.</p>\n<p>For those who crave the UK’s own electronic heritage, the Jungle & Garage Tent delivers rapid‑fire breakbeats, deep basslines, and the nostalgic melodies that defined the 90s rave scene.  Each stage is thoughtfully scheduled so you can wander from one soundscape to another without missing the highlights, creating a musical journey that feels both curated and spontaneous.</p>\n\n<h2>The food</h2>\n<p>Food at City Splash is more than a snack break; it is a celebration of culinary culture.  You’ll find classic Caribbean staples such as jerk chicken, curried goat, and rice & peas, alongside lesser‑known gems like Trinidadian doubles, Jamaican patties and Ghanaian jollof rice.  African vendors showcase dishes ranging from Nigerian suya skewers to Senegalese thieboudienne, while South African stalls serve up bobotie and bunny chow with a modern twist.</p>\n<p>Vegetarian, vegan and gluten‑free options are plentiful, ensuring that every palate is catered for.  Many vendors also offer sweet treats – think coconut rum cake, mango sorbet and spicy pineapple tarts – perfect for a quick energy boost between sets.  With over 60 stalls, the food court becomes a bustling marketplace where aromas mingle and conversations spark over shared plates.</p>\n\n<h2>Tips for first‑timers</h2>\n<ul>\n  <li><strong>Arrive early.</strong>  Gates open at noon, but the best spots near the stages fill up quickly.  Getting there by 11:30 am gives you a chance to claim a good viewing area and explore the food court before the crowds swell.</li>\n  <li><strong>Dress for comfort and colour.</strong>  Light, breathable fabrics are essential for a sunny day on the grass.  Add a splash of colour – a bright headband, a patterned shirt or a pair of funky sunglasses – to match the festival’s lively vibe.</li>\n  <li><strong>Stay hydrated.</strong>  Free water refill stations are scattered across the park, so bring a reusable bottle and keep sipping throughout the day.</li>\n  <li><strong>Plan your stage route.</strong>  Grab a printed map at the entrance or download the official City Splash app.  Knowing which stage hosts your favourite acts helps you avoid missing key performances.</li>\n  <li><strong>Protect yourself from the sun.</strong>  A wide‑brimmed hat, sunscreen and a light scarf can make a huge difference, especially if you plan to spend most of the day outdoors.</li>\n  <li><strong>Use cashless payment.</strong>  Most vendors accept contactless cards and mobile payments, which speeds up queues and reduces the need to carry large amounts of cash.</li>\n  <li><strong>Respect the inclusive spirit.</strong>  City Splash prides itself on being a safe, welcoming space for all ages, genders and backgrounds.  Keep an eye out for the volunteer “Safe Space” tents if you need assistance or a quiet moment.</li>\n</ul>\n\n<h2>What to wear</h2>\n<p>Think comfort first, style second – but with a dash of festival flair.  A loose‑fitting tee or tank top, paired with shorts or a breezy skirt, works well for the warm May weather.  Sneakers or sturdy sandals are ideal for navigating the grassy fields and occasional mud patches.  Many attendees love to showcase their heritage through clothing, so feel free to wear a dashiki, a Caribbean‑inspired print, or any vibrant accessory that makes you feel joyful.  A lightweight rain jacket can be handy, as London weather is famously unpredictable.</p>\n\n<h2>Closing</h2>\n<p>City Splash is more than a music festival; it is a living, breathing celebration of culture, community and the sheer joy of being together under the London sky.  With six stages delivering a kaleidoscope of sounds, over 60 food vendors serving up flavors from across the Caribbean and Africa, and a crowd of 30,000 friendly faces, the day feels like a giant, inclusive street party that you will remember long after the final encore.</p>\n<p>So pack your reusable water bottle, slip on those comfortable shoes, and head to Herne Hill for a day of rhythm, taste and togetherness.  Whether you are dancing to a classic reggae anthem, savoring a spicy suya skewer, or simply soaking up the carnival energy with new friends, City Splash offers a first‑timer experience that is both unforgettable and warmly familiar.  See you at Brockwell Park – the heart of London’s summer soundtrack.</p>'
  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-ink-900">
          <Image src="/images/cs-gallery-5.jpg" alt="City Splash Festival crowd in Brockwell Park" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-ink-900/95" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">London Festival Pick</span>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Going to City Splash for the First Time? Here&apos;s Everything You Need to Know
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
                Your complete first-timer's guide to City Splash. How to get there, what to expect, and how to make the most of London's biggest Caribbean music festival.
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

                      {/* After section 1: lineup video */}
                      {i === 1 && (
                        <VideoEmbed url="https://www.youtube.com/embed/7xNCfATaqi4" caption="City Splash 2026 lineup announcement" />
                      )}

                      {/* After section 2: first 3 gallery photos */}
                      {i === 2 && (
                        <div className="not-prose my-10">
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {[1,2,3].map((n) => (
                              <div key={n} className="relative aspect-square overflow-hidden rounded-lg">
                                <Image src={`/images/cs-gallery-${n}.jpg`} alt={`City Splash photo ${n}`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="33vw" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* After section 3: Tarrus Riley video + CTA */}
                      {i === 3 && (
                        <>
                          <VideoEmbed url="https://www.youtube.com/embed/4OSWsbfFLn0" caption="Tarrus Riley performs She's Royal live at City Splash 2025" />
                          <TicketCTA>Book City Splash 2026 Tickets</TicketCTA>
                        </>
                      )}

                      {/* After section 4: remaining gallery photos */}
                      {i === 4 && (
                        <div className="not-prose my-10">
                          <h3 className="mb-4 font-display text-xl font-extrabold text-ink-900">The City Splash Experience</h3>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {[4,5,6].map((n) => (
                              <div key={n} className="relative aspect-square overflow-hidden rounded-lg">
                                <Image src={`/images/cs-gallery-${n}.jpg`} alt={`City Splash photo ${n}`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="33vw" />
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
                  <span className="flex-1">City Splash 2026: Main Article</span>
                  <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-600" />
                </Link>
                <Link href="/articles/city-splash-2026" className="group flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50">
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
                <div className="rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">Quick Facts</h3>
                  <ul className="space-y-3 text-sm text-ink-600">
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
