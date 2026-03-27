import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import NewsletterBox from '@/components/shared/NewsletterBox'
import VideoEmbed from '@/components/shared/VideoEmbed'

const ARTICLE_URL = 'https://londontodo.com/articles/free-things-to-do-in-london-2026'
const ARTICLE_TITLE = "Free Things To Do in London That Are Actually Worth It"

export const metadata: Metadata = {
  title: 'Free Things To Do in London That Are Actually Worth It | LondonTodo',
  description: 'The best free things to do in London. Free museums, parks, walks, events, and hidden gems that are genuinely worth your time.',
  keywords: 'free things London, free museums London, free events London, cheap London, budget London'.split(', '),
  openGraph: {
    title: ARTICLE_TITLE,
    description: 'The best free things to do in London. Free museums, parks, walks, events, and hidden gems that are genuinely worth your time.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'South Bank London' }],
  },
}

const BODY = '<h2>Museums That Rival Paid Attractions</h2>\n\n<p>London’s free museums are not just “nice to have” – they can easily out‑shine the most expensive ticketed attractions. The trick is to know where the hidden highlights are, so you can spend a few hours (or a whole day) without reaching for your wallet.</p>\n\n<h3>Natural History Museum – the dinosaur capital of the world</h3>\n<p>Start in the grand Central Hall, where a towering diplodocus skeleton arches over the marble floor. From there, head straight to the <strong>Hintze Hall</strong> to meet the iconic blue whale skeleton that dominates the space. The <strong>Earth Hall</strong> is a visual feast of giant rocks and glittering minerals, while the <strong>Investigate Centre</strong> lets kids (and curious adults) handle real fossils and try their hand at paleontology. Don’t miss the <strong>Butterfly House</strong> in the museum’s garden – a tropical enclosure where dozens of colourful butterflies flutter around you, perfect for a quick photo break.</p>\n\n<h3>British Museum – a world tour under one roof</h3>\n<p>The British Museum’s sheer size can be intimidating, so pick three must‑see rooms and make a plan. The <strong>Rosetta Stone</strong> in the Egyptian galleries is a quick stop, but linger in the <strong>Parthenon Sculptures</strong> to appreciate the marble detail. The <strong>Assyrian Lion Hunt reliefs</strong> are massive and dramatic, and the <strong>Mummy Room</strong> offers a cool, dimly lit glimpse of ancient funerary practices. For a practical tip, grab a free audio guide from the information desk – it adds context without the need for a paid tour.</p>\n\n<h3>Tate Modern – contemporary art with a view</h3>\n<p>Located in a former power station on the South Bank, Tate Modern’s free collection is a playground for the imagination. Begin on the ground floor with the <strong>Turbin Hall</strong>, where large‑scale installations change every few months – check the website ahead of time to see what’s on. Then drift up to the <strong>Level 2 galleries</strong> for works by Picasso, Warhol and Rothko. The <strong>Viewing Platform</strong> on the 10th floor offers a panoramic vista of the Thames, St Paul’s and the City skyline – a perfect spot for a selfie. If you’re visiting on a Friday evening, the museum stays open late and often hosts free performances in the Performance Room.</p>\n\n<h3>Victoria & Albert Museum – design lovers’ paradise</h3>\n<p>The V&amp;A’s collection spans fashion, furniture, photography and more. A practical route is to start in the <strong>Cast Court</strong>, where you can see plaster copies of Michelangelo’s David and other classical masterpieces. The <strong>Fashion Gallery</strong> showcases rotating exhibitions of historic and contemporary clothing – you’ll often find a striking 1920s flapper dress or a futuristic runway piece on display. Don’t miss the <strong>Jewellery Gallery</strong>, where glittering gems are displayed in intimate cases. The museum’s café, tucked in a former ballroom, offers a quiet place to rest with a view of the beautiful courtyard.</p>\n\n<h3>Science Museum – hands‑on wonder for all ages</h3>\n<p>The Science Museum is a playground of curiosity. Begin with the <strong>Exploring Space</strong> gallery, where you can sit in a replica of the International Space Station’s cupola and gaze at a digital Earth. The <strong>Information Age</strong> gallery houses the original Apple I and a working Enigma machine – perfect for tech enthusiasts. For families, the <strong>Wonderlab</strong> (free on the first Saturday of each month) offers interactive experiments, from giant Tesla coils to magnetic levitation displays. A practical tip: pick up a free “Science Pass” at the entrance to skip the ticket line for the temporary exhibitions that sometimes charge a fee.</p>\n\n<h2>Parks With Better Views Than Rooftop Bars</h2>\n\n<p>London’s green spaces are more than just places to stretch your legs – they offer some of the city’s most spectacular vistas, often with a picnic blanket and a thermos in hand.</p>\n\n<h3>Primrose Hill – the classic skyline</h3>\n<p>Just a short walk from Regent’s Park, Primrose Hill’s summit provides an unobstructed 360‑degree view of central London. On a clear day you can see the Shard, the Gherkin and St Paul’s dome all at once. Bring a blanket, a couple of sandwiches and a bottle of sparkling water, and you’ll have a sunset spot that rivals any rooftop bar. The hill is also dog‑friendly, so it’s a great option for pet owners.</p>\n\n<h3>Hyde Park – lakeside serenity with iconic backdrops</h3>\n<p>Hyde Park’s <strong>Serpentine Lake</strong> is perfect for a leisurely stroll or a paddle‑boat ride (the boats are free to use if you bring your own oars). For a view that feels cinematic, head to the <strong>Rose Garden</strong> near the Serpentine, where you can see the park’s famous bandstand framed by blooming roses. In the summer, the park hosts free open‑air concerts on the bandstand – bring a blanket and enjoy live music with the city’s skyline as a backdrop.</p>\n\n<h3>Regent’s Park – gardens and a bird’s‑eye look at the city</h3>\n<p>The <strong>Queen Mary’s Gardens</strong> are a riot of roses in summer, but the real secret is the <strong>Regent’s Canal towpath</strong> that runs along the park’s northern edge. From there you can see the London Zoo’s historic entrance and, further east, the rooftops of Camden. The park’s <strong>Boating Lake</strong> offers a quiet spot to watch swans while the city hums in the distance.</p>\n\n<h3>Greenwich Park – river views and historic charm</h3>\n<p>Climb the hill behind the Royal Observatory for a sweeping view of the Thames, the O2 Arena and the City’s skyscrapers. The park’s <strong>Queen’s House</strong> and the <strong>National Maritime Museum</strong> are free to enter, so you can combine culture with scenery. A practical tip: bring a portable charger – the hill’s incline can drain phone batteries quickly if you’re using GPS for photos.</p>\n\n<h3>Hampstead Heath – wild beauty with a city silhouette</h3>\n<p>The Heath’s highest point, <strong>Parliament Hill</strong>, offers a classic London panorama that includes the Shard, the Gherkin and the historic dome of St Paul’s. For a quieter alternative, wander to <strong>Kensington Gardens’ Kenwood House grounds</strong>, where you’ll find a small lake and mature trees that frame the skyline. The Heath also has several free swimming ponds in summer – a refreshing way to cool off after a hike.</p>\n\n<h2>Wander the Best Neighbourhoods</h2>\n\n<p>London’s districts each have a personality of their own, and the best way to soak them up is on foot. Below are four neighbourhoods where you can explore for free, with practical tips to make the most of your time.</p>\n\n<h3>Covent Garden – street performers and hidden courtyards</h3>\n<p>Start at the <strong>Apple Market</strong> and wander into the surrounding piazzas. Every afternoon, you’ll find a rotating lineup of musicians, magicians and mime artists. Look for the small <strong>St. Paul’s Church courtyard</strong>, a quiet oasis where you can sit and watch the world go by. For a free cultural fix, pop into the <strong>London Transport Museum’s free gallery</strong> on the ground floor – it’s a quick but fascinating look at the city’s iconic red buses and tube maps.</p>\n\n<h3>Borough Market – a feast for the senses</h3>\n<p>While many stalls charge for their delicacies, the market itself is free to explore. Follow the winding alleys and you’ll discover artisanal bakers, cheese makers and spice vendors offering free samples. The best time to visit is early on a Saturday, when the market is less crowded and the aromas are at their peak. Don’t miss the historic <strong>Southwark Cathedral</strong> just across the street – its quiet interior provides a perfect pause from the market buzz.</p>\n\n<h3>Shoreditch – street art and creative energy</h3>\n<p>Grab a map of the <strong>Shoreditch Street Art Trail</strong> (available at the Old Street tube station) and set off on a self‑guided walk. Highlights include the massive <strong>“The Tower”</strong> mural by Ben Eine on Brick Lane and the ever‑changing pieces on the side of the Old Truman Brewery. For a coffee break, head to <strong>Boxpark</strong>, a pop‑up mall made from shipping containers that often hosts free live music and art installations.</p>\n\n<h3>Notting Hill – pastel houses and market charm</h3>\n<p>The iconic pastel terraces along <strong>Portobello Road</strong> are perfect for a photo stroll. On Saturdays, the road transforms into a bustling market where you can browse antiques, vintage clothing and fresh produce – all without spending a penny unless you’re tempted by a unique find. Slip into the quiet side streets of <strong>St Luke’s Gardens</strong> for a hidden garden square that feels far removed from the tourist crowds.</p>\n\n<h2>Free Events and Exhibitions</h2>\n\n<p>London’s cultural calendar is packed with free happenings, from pop‑up installations to seasonal festivals. Here are some reliable sources and specific events you can slot into any itinerary.</p>\n\n<h3>Southbank Centre – year‑round programming</h3>\n<p>The Southbank’s <strong>Winter Festival</strong> (late November to early January) turns the riverside into a wonderland of free light installations, street performances and open‑air cinema. In summer, the <strong>Southbank Summer Festival</strong> offers daily music, dance and theatre shows on the promenade. Check the centre’s website for the weekly <strong>Free Friday</strong> schedule, which includes free entry to the Royal Festival Hall’s lunchtime concerts.</p>\n\n<h3>Free galleries – art without the price tag</h3>\n<p>Beyond the big names, London boasts a network of free galleries. The <strong>Whitechapel Gallery</strong> hosts rotating contemporary exhibitions, often with free opening nights. The <strong>Serpentine Galleries</strong> in Hyde Park showcase cutting‑edge installations, and the <strong>Photographers’ Gallery</strong> offers free entry on the first Thursday of each month. A practical tip: sign up for each venue’s newsletter to receive alerts about free preview evenings.</p>\n\n<h3>Seasonal pop‑ups – surprise delights</h3>\n<p>During the summer, the <strong>London Festival of Architecture</strong> places free installations and talks in parks and public squares. In autumn, the <strong>London Design Festival</strong> decorates the city with free design installations, especially around the Design Museum’s courtyard. Winter brings the <strong>Christmas Lights Trail</strong> in Covent Garden, where you can follow a free map to see the best illuminated displays.</p>\n\n<h2>Hidden Free Gems</h2>\n\n<p>Some of London’s most memorable experiences are tucked away, known only to locals who have stumbled upon them by chance.</p>\n\n<h3>Sky Garden – a rooftop oasis without a ticket</h3>\n<p>Located on the 35th floor of the “Walkie‑Talkie” building, the Sky Garden offers lush tropical plants, a waterfall and sweeping city views. Entry is free, but you must book a time slot online at least a week in advance – the slots fill up quickly, especially on weekends. Arrive a few minutes early, bring a light jacket (it can be breezy up there), and enjoy a coffee from the on‑site bar while you soak in the panorama.</p>\n\n<h3>Ceremony of the Keys – a historic night‑time ritual</h3>\n<p>The Tower of London’s nightly “Ceremony of the Keys” is a 700‑year‑old tradition that is open to the public for free, but only on a limited number of evenings. Tickets are released on the first Monday of each month via the Historic Royal Palaces website. The ceremony lasts about 15 minutes and offers a rare glimpse into the tower’s security routine, complete with the Chief Yeoman Warder’s booming voice and the clanking of ancient iron keys.</p>\n\n<h3>Lunchtime concerts at St Martin‑in‑the‑Fields</h3>\n<p>Every weekday at 12:30 pm, St Martin‑in‑the‑Fields in Trafalgar Square hosts a free classical concert. The programme ranges from solo piano recitals to full chamber ensembles, and the church’s acoustics make even a simple violin piece sound majestic. Arrive a few minutes early to claim a seat in the nave, and consider grabbing a takeaway sandwich from a nearby café to enjoy during the performance.</p>\n\n<p>With this guide in hand, you can explore London’s cultural riches without spending a penny. From world‑class museums and panoramic parks to vibrant neighbourhoods and hidden rituals, the city offers a wealth of free experiences that feel anything but ordinary. So lace up your walking shoes, pack a snack, and discover the capital’s best‑kept secrets – all on a budget.</p>'

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
        <Image src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=1200&h=630&fit=crop" alt="South Bank London" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Free Things To Do in London That Are Actually Worth It
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">London can be expensive, but some of the best experiences cost absolutely nothing.</p>
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
                  <VideoEmbed url="https://www.youtube.com/embed/kDTFtn6xNEk" caption="Free London experiences" />
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=500&fit=crop" alt="Regent Street with flags" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">Regent Street dressed in flags</figcaption>
                  </figure>
                </>
              )}
              {i === 2 && (
                <>
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=500&fit=crop" alt="Big Ben at sunset" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">Big Ben glowing at sunset</figcaption>
                  </figure>
                  <figure className="not-prose my-8">
                    <Image src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=800&h=500&fit=crop" alt="River Thames" width={800} height={500} className="w-full rounded-lg" />
                    <figcaption className="mt-2 text-center text-xs text-ink-400">The River Thames on a clear day</figcaption>
                  </figure>
                </>
              )}
              {i === 3 && (
                <figure className="not-prose my-8">
                  <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop" alt="London food market" width={800} height={500} className="w-full rounded-lg" />
                  <figcaption className="mt-2 text-center text-xs text-ink-400">Exploring a London food market</figcaption>
                </figure>
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
            {RELATED.filter(r => r.href !== '/articles/free-things-to-do-in-london-2026').slice(0, 4).map(({ href, title }) => (
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
