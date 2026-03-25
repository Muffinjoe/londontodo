import type { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, MapPin, Music, Ticket, ExternalLink } from 'lucide-react'
import CountdownTimer from '@/components/shared/CountdownTimer'
import VideoEmbed from '@/components/shared/VideoEmbed'

const TICKET_URL = 'https://go.kaboodle.co.uk/CTT26P503'
const PROMO_IMAGE =
  'https://images.squarespace-cdn.com/content/v1/6318bd19c1f277037e7079dd/28c972ca-2de7-4519-a3ed-1221a02b31c5/4_5+PORTRAIT+%28Carousel+Post%29+%281%29.png'

export const metadata: Metadata = {
  title:
    "Cross The Tracks 2026: One of London's Best Day Festivals Returns | LondonTodo",
  description:
    'Cross The Tracks Festival returns to Brockwell Park on Sunday 24th May 2026. A genre-spanning celebration of jazz, funk, soul and hip-hop — plus street food, craft beer and one of the best day-festival vibes in London. Book tickets now.',
  keywords: [
    'Cross The Tracks 2026',
    'Cross The Tracks Festival',
    'London festivals May 2026',
    'jazz funk soul hip-hop festival London',
    'Brockwell Park festival',
    'London day festival 2026',
    'things to do in London May 2026',
  ],
  openGraph: {
    title: "Cross The Tracks 2026: One of London's Best Day Festivals Returns",
    description:
      'Jazz, funk, soul and hip-hop in Brockwell Park. Sunday 24th May 2026. Street food, craft beer, and one of London\'s best festival atmospheres.',
    url: 'https://londontodo.com/articles/cross-the-tracks-2026',
    type: 'article',
    images: [
      {
        url: PROMO_IMAGE,
        width: 1080,
        height: 1350,
        alt: 'Cross The Tracks 2026 festival promo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cross The Tracks 2026: One of London's Best Day Festivals Returns",
    description:
      'Jazz, funk, soul and hip-hop in Brockwell Park. Sunday 24th May 2026.',
    images: [PROMO_IMAGE],
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

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      "Cross The Tracks 2026 Is Bringing Jazz, Soul, Funk and Hip-Hop Back to Brockwell Park",
    description:
      'Cross The Tracks returns on Sunday 24th May 2026 with a genre-spanning celebration of jazz, funk, soul and hip-hop.',
    image: PROMO_IMAGE,
    datePublished: '2025-03-25T10:00:00+00:00',
    dateModified: '2025-03-25T10:00:00+00:00',
    author: {
      '@type': 'Organization',
      name: 'LondonTodo',
      url: 'https://londontodo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LondonTodo',
      url: 'https://londontodo.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://londontodo.com/articles/cross-the-tracks-2026',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function CrossTheTracksPage() {
  return (
    <>
      <JsonLd />

      <article>
        {/* ─── Hero ─── */}
        <header className="relative overflow-hidden bg-ink-900">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-900/60 to-ink-900" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                London Festival Pick
              </span>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Cross The Tracks 2026 Is Bringing Jazz, Soul, Funk and Hip-Hop
                Back to Brockwell Park
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                Cross The Tracks returns on Sunday 24th May 2026 with a
                genre-spanning celebration of jazz, funk, soul and hip-hop
                &mdash; plus street food, craft beer and one of the best
                day-festival atmospheres in London.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
                <Calendar className="h-4 w-4" />
                <span>Sunday 24th May 2026</span>
              </div>
              <div className="mt-8">
                <a
                  href={TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-700"
                >
                  Book Tickets Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Countdown (mobile only, shown inline) ─── */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:hidden lg:px-8">
          <CountdownTimer />
        </div>

        {/* ─── Three-column layout ─── */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* ─── Left sidebar ─── */}
            <aside className="order-2 lg:order-1 lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={PROMO_IMAGE}
                    alt="Cross The Tracks 2026 promo poster"
                    width={540}
                    height={675}
                    className="h-auto w-full rounded-lg"
                    unoptimized
                  />
                </div>
                <div className="mt-4 rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="font-display text-base font-extrabold text-ink-900">
                    Cross The Tracks 2026
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-600">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-600" />
                      Sunday 24th May 2026
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-600" />
                      Brockwell Park, London
                    </li>
                  </ul>
                  <a
                    href={TICKET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Book Tickets
                    <Ticket className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>

            {/* ─── Main article body ─── */}
            <main className="order-1 lg:order-2 lg:col-span-6">
              <div className="prose prose-lg mx-auto max-w-article">
                {/* Section 1 */}
                <h2>Why Cross The Tracks Is One of London&apos;s Best Day Festivals</h2>

                <p>
                  There are plenty of festivals in London. Huge ones with
                  headline slots auctioned off to the highest bidder, corporate
                  ones that feel more like branded experiences than music events,
                  and pocket-sized ones that never quite get the attention they
                  deserve. And then there is Cross The Tracks &mdash; a festival
                  that has quietly, confidently carved out its own lane as one of
                  the most genuinely enjoyable days out in the city&apos;s cultural
                  calendar.
                </p>

                <p>
                  Held each year in the stunning surrounds of Brockwell Park in
                  South London, Cross The Tracks feels like the festival
                  equivalent of a brilliantly curated house party. It is warm and
                  welcoming, musically adventurous without being alienating, and
                  deeply rooted in the communities that make South London one of
                  the most vibrant corners of the capital. From the moment you
                  walk through the gates, there is a sense that everyone is
                  genuinely glad to be here &mdash; artists, vendors and audience
                  alike.
                </p>

                <p>
                  What sets Cross The Tracks apart from much of the London
                  festival circuit is its commitment to curation over spectacle.
                  This is not a festival that books names for the sake of it. The
                  lineup is always a thoughtful blend of heritage artists who
                  have defined genres, current stars pushing the boundaries of
                  modern music, and exciting emerging talent that you will be
                  hearing a lot more from in the years to come. It is a festival
                  with taste, and that is something you can feel the moment the
                  first note rings out across the park.
                </p>

                <VideoEmbed
                  url="https://www.youtube.com/embed/ATUKhLrmQVw"
                  caption="Get a feel for Cross The Tracks before you go"
                />

                <TicketCTA>
                  Get Your Tickets for Cross The Tracks 2026
                </TicketCTA>

                {/* Section 2 */}
                <h2>A Lineup Built for Jazz, Funk, Soul and Hip-Hop Lovers</h2>

                <p>
                  Cross The Tracks has always been about the music first, and
                  that means a lineup shaped around four of the richest,
                  deepest and most interconnected genres in modern history: jazz,
                  funk, soul and hip-hop. These are not genres that exist in
                  isolation &mdash; they are a conversation stretching back
                  decades, and Cross The Tracks honours that conversation like
                  few other events in the UK.
                </p>

                <p>
                  Across multiple stages, you will find everything from
                  trailblazing pioneers whose records have soundtracked
                  generations to forward-thinking artists who are redefining what
                  these genres can sound like in 2026 and beyond. There are the
                  jazz musicians weaving electronic textures into improvisatory
                  structures. The soul singers whose voices could stop you in
                  your tracks from three fields away. The funk bands whose
                  grooves are so deep you feel them in your chest before you even
                  see the stage. And the hip-hop artists whose storytelling cuts
                  through the summer air with precision and power.
                </p>

                <p>
                  One of the great pleasures of Cross The Tracks is the space
                  between sets. You will wander from one stage to the next and
                  stumble upon something extraordinary you had never planned to
                  see &mdash; a seven-piece band from South East London
                  channelling Fela Kuti, a singer-songwriter quietly demolishing
                  a crowd with nothing but a guitar and the truth. It is that
                  element of discovery that keeps people coming back year after
                  year, and it is something that no amount of algorithmic
                  playlist curation can replicate.
                </p>

                {/* Section 3 */}
                <h2>More Than Music &mdash; Food, Drinks and Community</h2>

                <p>
                  Cross The Tracks is a full day out, not just a gig in a park.
                  Beyond the stages you will find over fifty of London&apos;s best
                  street food vendors, serving everything from jerk chicken and
                  wood-fired pizza to Ethiopian stews and Vietnamese bao buns. A
                  dedicated craft beer fair showcases some of the best
                  independent breweries in the city, with tasting sessions and
                  rare pours that will delight anyone who takes their hops
                  seriously. There are artisan market stalls, vinyl traders,
                  vintage clothing, and independent makers &mdash; the kind of
                  browsing that turns a quick look into an hour-long treasure
                  hunt.
                </p>

                <p>
                  But what really elevates Cross The Tracks beyond a music-plus-
                  food offering is the sense of community woven through the
                  whole event. There are workshops, talks and panel discussions
                  that tap into the cultural currents running through jazz, soul,
                  funk and hip-hop &mdash; from the history of sound system
                  culture to the future of independent music in London. Local
                  partners and community organisations are visibly present, and
                  there is a genuine warmth to the way the festival brings
                  together people of all ages, backgrounds and musical
                  persuasions. It is the kind of event that makes you feel proud
                  of London.
                </p>

                <TicketCTA>Book Now Before It Sells Out</TicketCTA>

                {/* Section 4 */}
                <h2>Why Now Is the Time to Book</h2>

                <p>
                  Cross The Tracks has earned a fierce and loyal following since
                  its launch, and demand for tickets grows each year. Previous
                  editions have sold out well in advance, and with the 2026
                  edition shaping up to be one of the strongest yet, there is
                  every reason to expect this year will be no different. Once
                  word spreads about the lineup &mdash; and it will &mdash;
                  tickets will move fast.
                </p>

                <p>
                  The value proposition is hard to argue with. For the price of a
                  single ticket you get an entire day of world-class live music
                  across multiple stages, access to one of the best street food
                  gatherings in London, a craft beer fair, market stalls and
                  cultural programming &mdash; all set in one of South London&apos;s
                  most beautiful parks. If you have ever been on the fence about
                  a festival and then kicked yourself when it sold out, consider
                  this your sign to commit early.
                </p>

                {/* Section 5 */}
                <h2>Our Recommendation</h2>

                <p>
                  If you are into jazz, funk, soul or hip-hop &mdash; or if you
                  just love a great day out in London &mdash; Cross The Tracks
                  should be at the top of your list this May. It is one of those
                  rare events that delivers on its promise every single time: a
                  beautiful setting, exceptional music, brilliant food and drink,
                  and an atmosphere that reminds you why live music in this city
                  is worth protecting and celebrating. Grab a group of friends,
                  book your tickets, and get ready for one of the highlights of
                  London&apos;s 2026 festival season. We will see you in Brockwell
                  Park.
                </p>

                <TicketCTA>Get Tickets &mdash; Cross The Tracks 2026</TicketCTA>
              </div>
            </main>

            {/* ─── Right sidebar ─── */}
            <aside className="order-3 lg:col-span-3">
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* Countdown (desktop) */}
                <div className="hidden lg:block">
                  <CountdownTimer />
                </div>

                {/* Quick Facts */}
                <div className="rounded-lg border border-ink-100 bg-white p-5">
                  <h3 className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">
                    Quick Facts
                  </h3>
                  <ul className="space-y-3 text-sm text-ink-600">
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>Sunday 24th May 2026</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>Brockwell Park, London</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Music className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>Jazz, Funk, Soul, Hip-Hop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>Tickets on sale now</span>
                    </li>
                  </ul>
                  <a
                    href={TICKET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Get Tickets
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                {/* Sticky ticket CTA */}
                <div className="rounded-lg border-2 border-brand-100 bg-brand-50 p-5 text-center">
                  <p className="font-display text-base font-extrabold text-ink-900">
                    Don&apos;t miss out
                  </p>
                  <p className="mt-1 text-sm text-ink-500">
                    Tickets are selling fast
                  </p>
                  <a
                    href={TICKET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Get Tickets Now
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
