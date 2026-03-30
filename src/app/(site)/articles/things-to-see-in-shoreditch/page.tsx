import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'
import VideoEmbed from '@/components/shared/VideoEmbed'
import NewsletterBox from '@/components/shared/NewsletterBox'

const ARTICLE_URL = 'https://www.londontodo.com/articles/things-to-see-in-shoreditch'
const ARTICLE_TITLE = "Things to See in Shoreditch: The Complete Local's Guide (2026)"

export const metadata: Metadata = {
  title: "Things to See in Shoreditch: The Complete Local's Guide | LondonTodo",
  description: 'The best things to see in Shoreditch, London. Street art, Brick Lane markets, restaurants, bars, galleries, vintage shopping, and local tips.',
  keywords: ['things to see in Shoreditch', 'Shoreditch guide', 'Brick Lane London', 'Shoreditch street art', 'Shoreditch restaurants', 'Shoreditch bars'],
  openGraph: {
    title: "Things to See in Shoreditch: The Complete Local's Guide",
    description: 'Street art, Brick Lane, incredible food, cocktail bars, galleries and more. Everything worth seeing in Shoreditch.',
    url: ARTICLE_URL,
    type: 'article',
    images: [{ url: 'https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2019/04/22162603/shoreditch-things-to-do-ttd.jpg', width: 1200, height: 630, alt: 'Shoreditch London' }],
  },
}

const BODY = '<h2>Why Shoreditch Should Be on Your London List</h2>\n\nIf you’ve ever wondered what makes East London pulse with creative energy, the answer is simple: Shoreditch. Once a gritty industrial hub, it has reinvented itself into a playground for artists, food lovers, shoppers and night‑owls alike. The neighbourhood’s narrow lanes are lined with ever‑changing murals, its markets overflow with vintage treasures, and its bars serve cocktails that could be works of art in their own right. Whether you’re a first‑time visitor or a seasoned Londoner, there are endless things to see in Shoreditch that will keep you wandering for hours. Grab a map, a good pair of walking shoes, and let a local guide lead you through the best of this eclectic quarter.\n\n<h2>The Street Art (It Changes Every Week)</h2>\n\nShoreditch’s street‑art scene is a living gallery that never sleeps. Start on Brick Lane, where you’ll still spot the ghost of a Banksy stencil tucked behind a newer piece, alongside bold works by ROA—his massive animal silhouettes dominate whole walls—and the whimsical figures of Stik, whose stick‑figure characters pop up on the side of a former warehouse at 101 Brick Lane (E1 6QL). Just a few minutes away, the Shoreditch High Street corridor (E1 6JQ) is a rotating exhibition space; every few weeks a fresh mural replaces the last, so a quick selfie today could be a completely different backdrop tomorrow.\n\nA short walk north brings you to the famous Cargo club courtyard (Unit 1, 1‑3 St John St, EC1V 4AB). The industrial arches are draped in large‑scale installations that blend graffiti with neon lighting, creating a backdrop that feels both gritty and glamorous. For a more curated cultural experience, head to Rich Mix on Bethnal Green Road (E2 0AA). This multi‑disciplinary centre hosts film nights, live music, and rotating street‑art exhibitions that showcase emerging talent from across the city. A self‑guided Shoreditch street‑art walking tour can be plotted on Google Maps, but the real magic is stumbling upon a hidden piece in an alleyway off Redchurch Street—just keep your eyes peeled.\n\n<h2>Brick Lane and the Markets</h2>\n\nNo visit to Shoreditch is complete without diving into its bustling markets. Brick Lane Market (Brick Lane, E1 6QL) comes alive every Sunday, spilling out of the covered market hall onto the street. Here you’ll find everything from vintage leather jackets to handmade jewellery, and a dizzying array of food stalls serving everything from falafel wraps to gourmet doughnuts. The market’s food court is a perfect spot for a quick bite; try the spicy chaat from “Bangla Bites” while you browse the stalls.\n\nJust a stone’s throw away, Old Spitalfields Market (10‑16 Horner St, E1 6EW) operates daily under a stunning Victorian glass roof. It’s a mix of high‑end designers, artisanal food vendors, and a permanent collection of independent boutiques. On weekends, the Backyard Market (Brick Lane, E1 6QL) pops up in a reclaimed warehouse, offering a more intimate vibe with pop‑up fashion, craft beer, and live acoustic sets.\n\nIf you love flowers, the Columbia Road Flower Market (Columbia Rd, E2 7RG) is a sensory overload on Sunday mornings. The street transforms into a kaleidoscope of blooms, and the scent of fresh roses lingers long after you’ve left. For a more upscale shopping experience, head to Upmarket at the Old Truman Brewery (Truman St, E1 8EU). Housed in a former brewery, this space hosts rotating designer pop‑ups, art installations, and a rooftop bar with views over the city’s skyline.\n\n<h2>Where to Eat in Shoreditch</h2>\n\nShoreditch’s food scene is as diverse as its street art. Start your day at Dishoom (7 Boundary St, E2 7JE), where the Bombay‑style breakfast menu includes the legendary bacon naan roll—crispy bacon tucked into a fluffy naan, drizzled with a tangy chutney. For meat lovers, Smokestak (1‑3 St John St, EC1V 4AB) serves up slow‑smoked brisket and pork belly that melt in your mouth; the industrial interior, complete with exposed brick and copper pipes, adds to the experience.\n\nA true Shoreditch institution is Beigel Bake (159 Brick Lane, E1 6SB). Open 24 hours, this no‑frills bakery serves a salt beef beigel for about five pounds. Expect a queue that often stretches to the door at 2 am, but the tender beef, tangy mustard, and fresh roll make the wait worthwhile. For a quirky breakfast, pop into Cereal Killer Café (20‑22 Brick Lane, E1 6QL), where you can choose from over 120 cereals, each served with fresh fruit and milk alternatives.\n\nBoxpark Shoreditch (2‑10 Boxpark St, E2 0AA) reimagines shipping containers as food stalls, offering everything from Korean BBQ tacos at “Kogi” to vegan doughnuts at “The Doughnut Project”. Finally, The Breakfast Club (12‑16 Artillery Ln, E1 7LS) is famous for its “Full English” and “Pancake Stack”. Yes, there’s a queue, especially on weekends, but the lively atmosphere and generous portions make it a beloved spot for locals and tourists alike.\n\n<h2>Bars and Nightlife Worth Knowing About</h2>\n\nWhen the sun sets, Shoreditch’s nightlife kicks into high gear. Happiness Forgets (1 Hoxton Square, N1 6NG) is a speakeasy‑style basement bar where mixologists craft inventive cocktails like the “Moscow Mule with a twist of rosemary”. The dim lighting and plush seating make it perfect for a low‑key evening.\n\nCargo (1‑3 St John St, EC1V 4AB) sits under the railway arches and transforms from a bar into a full‑blown club on weekends, with resident DJs spinning house, techno, and disco. The Book Club (100 Leonard St, EC2A 4AQ) offers a relaxed vibe during the day—think coffee and board games—but turns into a buzzing bar with live music and DJ sets after dark.\n\nFor rooftop views, Queen of Hoxton (20 Hoxton Square, N1 6NG) boasts a seasonal garden on its top floor, complete with hammocks and a bar serving craft beers and signature cocktails. Blues Kitchen (111 Curtain St, EC2A 3JH) brings a taste of the American South to London, with live blues bands, a menu of smoked ribs, and a whiskey selection that will satisfy any connoisseur.\n\n<h2>Galleries and Creative Spaces</h2>\n\nArt lovers will feel right at home in Shoreditch’s gallery circuit. The Whitechapel Gallery (77‑82 Whitechapel Rd, E1 7QX) offers free entry to world‑class exhibitions ranging from contemporary photography to large‑scale installations. Just a short walk away, the Geffrye Museum—now called the Museum of the Home (Whitechapel Rd, E2 9EB)—explores domestic interiors from the 1600s to the present, set within beautifully restored 18th‑century townhouses.\n\nRedchurch Street (E2 0AA) is a hotspot for pop‑up galleries, often housed in vacant warehouses or converted lofts. Keep an eye on the local listings; you might catch a one‑night show by an emerging photographer or a collaborative installation by street artists. These spaces change frequently, so each visit can feel like a fresh cultural discovery.\n\n<h2>Shopping in Shoreditch</h2>\n\nShoreditch’s shopping scene is a blend of high‑street chic and vintage treasure hunts. Redchurch Street itself is lined with independent boutiques—think “The Goodhood Store” for contemporary fashion and “Mason & Co.” for handcrafted leather goods. Vinyl enthusiasts will flock to Rough Trade East (184 Drury Ln, E1 6QL), a massive record store that also hosts live in‑store performances and DJ sets.\n\nBeyond Retro (453‑455 Hackney Rd, E8 1DY) is a warehouse‑style vintage clothing haven where you can spend hours digging through racks of 80s jackets, 90s denim, and retro accessories. For home‑decor lovers, Labour and Wait (1‑3 Redchurch St, E2 0AA) offers a curated selection of beautifully designed kitchenware, textiles, and lighting—perfect for adding a touch of Shoreditch style to your own space.\n\n<h2>How to Get There and Tips</h2>\n\nGetting to Shoreditch is straightforward. The London Underground’s Central, Overground and Hammersmith & City lines stop at Liverpool Street (E1 6AN), just a five‑minute walk to the heart of the neighbourhood. Shoreditch High Street Overground station (E1 6JQ) drops you right onto the bustling high street, while Bethnal Green (E2 0AA) is a short bus ride away. If you prefer cycling, the Santander Cycle docking stations are plentiful, and the Regents Canal towpath offers a scenic, traffic‑free route from Shoreditch to Camden—perfect for a leisurely weekend ride.\n\nA few practical tips: most markets close by early afternoon, so arrive early for the best stalls. Bring cash for smaller vendors, especially at Brick Lane Market, but most larger stalls accept cards. For food, be prepared for queues at popular spots like Beigel Bake and The Breakfast Club—arriving before peak times (10 am‑12 pm for breakfast, 2 am for late‑night snacks) can save you waiting. Finally, wear comfortable shoes; the cobbled streets and canal towpath are best explored on foot.\n\nFrom the ever‑shifting murals to the aromatic stalls of Columbia Road, from smoky BBQ to rooftop cocktails, Shoreditch offers an endless list of things to see in Shoreditch that will keep you coming back for more. So grab a map, follow the street‑art trail, and let this East London enclave reveal its many layers—one vibrant corner at a time.'

const RELATED = [
  { href: '/articles/best-things-to-do-in-london-2026', title: 'Best Things To Do in London' },
  { href: '/articles/london-food-guide-where-to-eat', title: 'London Food Guide' },
  { href: '/articles/unique-unusual-things-to-do-london', title: '7 Unique Things To Do in London' },
  { href: '/events/browse', title: 'Browse All London Events' },
]

export default function Page() {
  const sections = BODY.split(/(?=<h2)/i)

  return (
    <article>
      <header className="relative overflow-hidden bg-ink-900">
        <Image
          src="https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2019/04/22162603/shoreditch-things-to-do-ttd.jpg"
          alt="Shoreditch street art and colourful buildings"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-ink-900/95" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Neighbourhood Guide
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Things to See in Shoreditch: The Complete Local&apos;s Guide
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Street art, Brick Lane, incredible food, cocktail bars, galleries and vintage shopping. Everything worth seeing in Shoreditch right now.
            </p>
            <div className="mt-4 flex justify-center">
              <ShareButtons url={ARTICLE_URL} title={ARTICLE_TITLE} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {sections.map((section, i) => (
          <div key={i}>
            <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: section }} />

            {i === 1 && (
              <>
                <VideoEmbed url="https://www.youtube.com/embed/034hpqB2evM" caption="Shoreditch street art walking tour" />
                <figure className="not-prose my-8">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/62015f66f840ef671da14ae7/458edea8-0123-41eb-9365-64ef910800dd/Brick+Lane+Shoreditch+002.JPG"
                    alt="Brick Lane, Shoreditch"
                    width={800}
                    height={500}
                    className="w-full rounded-lg"
                    unoptimized
                  />
                  <figcaption className="mt-2 text-center text-xs text-ink-400">Brick Lane, the heart of Shoreditch</figcaption>
                </figure>
              </>
            )}

            {i === 3 && (
              <VideoEmbed url="https://www.youtube.com/embed/jyMgzW-WnnA" caption="Exploring Shoreditch and Brick Lane" />
            )}

            {i === 5 && (
              <VideoEmbed url="https://www.youtube.com/embed/zbXvWGKZ2IE" caption="The creative side of Shoreditch" />
            )}
          </div>
        ))}

        <div className="mt-12">
          <NewsletterBox variant="inline" />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-extrabold text-ink-900">More London Guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RELATED.map(({ href, title }) => (
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
