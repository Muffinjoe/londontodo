import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('londontodo2024', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'editor@londontodo.com' },
    update: {},
    create: {
      email: 'editor@londontodo.com',
      name: 'LondonTodo Editorial',
      hashedPassword,
      role: 'ADMIN',
    },
  })

  const author = await prisma.user.upsert({
    where: { email: 'sarah@londontodo.com' },
    update: {},
    create: {
      email: 'sarah@londontodo.com',
      name: 'Sarah Mitchell',
      hashedPassword,
      role: 'AUTHOR',
    },
  })

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'food-drink' }, update: {}, create: { name: 'Food & Drink', slug: 'food-drink', color: '#f59e0b', icon: 'UtensilsCrossed', sortOrder: 1, description: 'The best restaurants, bars, pubs, markets, and food experiences in London.' } }),
    prisma.category.upsert({ where: { slug: 'culture' }, update: {}, create: { name: 'Culture', slug: 'culture', color: '#8b5cf6', icon: 'Palette', sortOrder: 2, description: 'Exhibitions, galleries, museums, and cultural events across London.' } }),
    prisma.category.upsert({ where: { slug: 'nightlife' }, update: {}, create: { name: 'Nightlife', slug: 'nightlife', color: '#ec4899', icon: 'Music', sortOrder: 3, description: 'Clubs, live music, comedy, late-night bars, and after-dark London.' } }),
    prisma.category.upsert({ where: { slug: 'family' }, update: {}, create: { name: 'Family', slug: 'family', color: '#10b981', icon: 'Baby', sortOrder: 4, description: 'Family-friendly activities, kids events, and days out in London.' } }),
    prisma.category.upsert({ where: { slug: 'markets' }, update: {}, create: { name: 'Markets', slug: 'markets', color: '#f97316', icon: 'ShoppingBag', sortOrder: 5, description: 'Street markets, food markets, vintage markets, and artisan fairs.' } }),
    prisma.category.upsert({ where: { slug: 'theatre' }, update: {}, create: { name: 'Theatre', slug: 'theatre', color: '#ef4444', icon: 'Drama', sortOrder: 6, description: 'West End shows, fringe theatre, musicals, and live performance.' } }),
    prisma.category.upsert({ where: { slug: 'free' }, update: {}, create: { name: 'Free Things To Do', slug: 'free', color: '#06b6d4', icon: 'Gift', sortOrder: 7, description: 'The best free events, activities, and experiences in London.' } }),
    prisma.category.upsert({ where: { slug: 'exhibitions' }, update: {}, create: { name: 'Exhibitions', slug: 'exhibitions', color: '#6366f1', icon: 'Frame', sortOrder: 8, description: 'Must-see exhibitions, installations, and art shows in London.' } }),
  ])

  const [foodDrink, culture, nightlife, family, markets, theatre, free, exhibitions] = categories

  // Areas
  const areas = await Promise.all([
    prisma.area.upsert({ where: { slug: 'shoreditch' }, update: {}, create: { name: 'Shoreditch', slug: 'shoreditch', description: 'East London\'s creative heartland. Street art, independent boutiques, rooftop bars, and some of the city\'s most interesting restaurants.', heroImage: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=600&fit=crop', latitude: 51.5246, longitude: -0.0794 } }),
    prisma.area.upsert({ where: { slug: 'soho' }, update: {}, create: { name: 'Soho', slug: 'soho', description: 'The beating heart of London\'s West End. Restaurants, theatres, bars, and an energy that never really stops.', heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop', latitude: 51.5137, longitude: -0.1337 } }),
    prisma.area.upsert({ where: { slug: 'camden' }, update: {}, create: { name: 'Camden', slug: 'camden', description: 'Music venues, eclectic markets, canal-side pubs, and a spirit of independence that defines North London.', heroImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=600&fit=crop', latitude: 51.5392, longitude: -0.1426 } }),
    prisma.area.upsert({ where: { slug: 'peckham' }, update: {}, create: { name: 'Peckham', slug: 'peckham', description: 'South London\'s cultural hotspot. Rooftop bars, contemporary galleries, and some of the best jerk chicken in the city.', heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop', latitude: 51.4738, longitude: -0.0690 } }),
    prisma.area.upsert({ where: { slug: 'brixton' }, update: {}, create: { name: 'Brixton', slug: 'brixton', description: 'Vibrant, multicultural, and always interesting. Live music, street food, the famous market, and a strong community feel.', heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=600&fit=crop', latitude: 51.4613, longitude: -0.1156 } }),
    prisma.area.upsert({ where: { slug: 'greenwich' }, update: {}, create: { name: 'Greenwich', slug: 'greenwich', description: 'Maritime history, the Meridian Line, a beautiful park, and a thriving market. One of London\'s most rewarding day trips.', heroImage: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=600&fit=crop', latitude: 51.4769, longitude: -0.0005 } }),
    prisma.area.upsert({ where: { slug: 'notting-hill' }, update: {}, create: { name: 'Notting Hill', slug: 'notting-hill', description: 'Pastel houses, Portobello Road Market, independent cinemas, and a village feel in the middle of West London.', heroImage: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&h=600&fit=crop', latitude: 51.5093, longitude: -0.1963 } }),
    prisma.area.upsert({ where: { slug: 'southbank' }, update: {}, create: { name: 'Southbank', slug: 'southbank', description: 'The Thames path, the National Theatre, street performers, Tate Modern, and the best views of the London skyline.', heroImage: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=1200&h=600&fit=crop', latitude: 51.5055, longitude: -0.1146 } }),
  ])

  const [shoreditch, soho, camden, peckham, brixton, greenwich, nottingHill, southbank] = areas

  // Venues
  const venues = await Promise.all([
    prisma.venue.upsert({ where: { slug: 'frameless' }, update: {}, create: { name: 'Frameless', slug: 'frameless', address: 'Marble Arch, London W1H 7EJ', postcode: 'W1H 7EJ', websiteUrl: 'https://frameless.com', areaId: soho.id } }),
    prisma.venue.upsert({ where: { slug: 'borough-market' }, update: {}, create: { name: 'Borough Market', slug: 'borough-market', address: '8 Southwark St, London SE1 1TL', postcode: 'SE1 1TL', websiteUrl: 'https://boroughmarket.org.uk', areaId: southbank.id } }),
    prisma.venue.upsert({ where: { slug: 'bussey-building' }, update: {}, create: { name: 'Bussey Building', slug: 'bussey-building', address: '133 Rye Ln, London SE15 4ST', postcode: 'SE15 4ST', areaId: peckham.id } }),
    prisma.venue.upsert({ where: { slug: 'camden-market' }, update: {}, create: { name: 'Camden Market', slug: 'camden-market', address: 'Camden Lock Pl, London NW1 8AF', postcode: 'NW1 8AF', websiteUrl: 'https://camdenmarket.com', areaId: camden.id } }),
    prisma.venue.upsert({ where: { slug: 'royal-observatory' }, update: {}, create: { name: 'Royal Observatory', slug: 'royal-observatory', address: 'Blackheath Ave, London SE10 8XJ', postcode: 'SE10 8XJ', websiteUrl: 'https://rmg.co.uk', areaId: greenwich.id } }),
    prisma.venue.upsert({ where: { slug: 'ronnie-scotts' }, update: {}, create: { name: 'Ronnie Scott\'s', slug: 'ronnie-scotts', address: '47 Frith St, London W1D 4HT', postcode: 'W1D 4HT', websiteUrl: 'https://ronniescotts.co.uk', areaId: soho.id } }),
    prisma.venue.upsert({ where: { slug: 'tate-modern' }, update: {}, create: { name: 'Tate Modern', slug: 'tate-modern', address: 'Bankside, London SE1 9TG', postcode: 'SE1 9TG', websiteUrl: 'https://tate.org.uk/visit/tate-modern', areaId: southbank.id } }),
    prisma.venue.upsert({ where: { slug: 'columbia-road' }, update: {}, create: { name: 'Columbia Road', slug: 'columbia-road', address: 'Columbia Rd, London E2 7RG', postcode: 'E2 7RG', areaId: shoreditch.id } }),
  ])

  const [frameless, boroughMarket, busseyBuilding, camdenMarket, royalObservatory, ronnieScotts, tateModern, columbiaRoad] = venues

  // Tags
  const tagNames = ['weekend', 'free', 'family-friendly', 'rooftop', 'outdoor', 'indoor', 'date-night', 'budget', 'new-opening', 'seasonal', 'summer', 'market', 'exhibition', 'live-music', 'food', 'street-food']
  const tags = await Promise.all(
    tagNames.map(t => prisma.tag.upsert({ where: { slug: t }, update: {}, create: { name: t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), slug: t } }))
  )

  // Articles
  const articles = await Promise.all([
    prisma.article.upsert({
      where: { slug: '15-best-things-to-do-in-london-this-weekend' },
      update: {},
      create: {
        title: '15 Best Things to Do in London This Weekend',
        slug: '15-best-things-to-do-in-london-this-weekend',
        kicker: 'This Weekend',
        subtitle: 'From free exhibitions to rooftop cinema screenings, here\'s what\'s worth your time in London this weekend.',
        excerpt: 'Our editors\' pick of the very best things happening in London this weekend, from blockbuster exhibitions to hidden neighbourhood gems.',
        body: `<p>London never runs short of things to do on the weekend, but sorting the genuinely good from the merely advertised takes local knowledge. We've done the legwork so you don't have to.</p>

<h2>1. Catch the Yayoi Kusama Mirrors at Tate Modern</h2>
<p>The Tate's Kusama exhibition continues to draw crowds, and for good reason. The infinity mirror rooms are genuinely mesmerising — not just an Instagram opportunity, though they are that too. Book a timed slot to avoid the worst of the queues. Free entry to the main gallery, exhibition tickets from £18.</p>

<h2>2. Borough Market on Saturday Morning</h2>
<p>Skip the lie-in and get to Borough Market before 10am, when you can actually move between the stalls without being swept along by the crowd. The raclette stand is still the best value hot lunch in central London. Free entry.</p>

<h2>3. Rooftop Cinema at Bussey Building, Peckham</h2>
<p>Peckham's rooftop cinema is back for the season. This weekend they're showing a double bill of classic London films. Wrap up warm — even in summer, the wind up there is no joke. Tickets from £18.</p>

<h2>4. Walk the Regent's Canal from Camden to King's Cross</h2>
<p>One of London's best free walks. Start at Camden Lock, follow the towpath east past the houseboats, through the quiet stretch behind London Zoo, and end up at Granary Square for coffee. About 45 minutes at a comfortable pace.</p>

<h2>5. Columbia Road Flower Market, Sunday</h2>
<p>Get there early — by 9am ideally — and bring cash. The market runs along the full length of Columbia Road in Shoreditch, and by midday the crowds are shoulder-to-shoulder. The real deals come after 2pm when sellers start discounting, but the best selection is in the morning. The surrounding shops and cafes are excellent.</p>

<h2>6. Jazz Night at Ronnie Scott's</h2>
<p>Soho's legendary jazz club has a late-night session on Saturday that's looser, louder, and more affordable than the headline shows. The atmosphere in that basement room is hard to beat anywhere in London. Tickets from £30.</p>

<h2>7. Free Lunchtime Concert at St Martin-in-the-Fields</h2>
<p>One of London's best-kept free culture secrets. Every Monday, Tuesday, and Friday at 1pm, St Martin-in-the-Fields on Trafalgar Square hosts free classical concerts. No booking needed, just turn up. The acoustics are beautiful.</p>

<h2>8. Explore Shoreditch Street Art</h2>
<p>Take yourself on a self-guided street art walk around Shoreditch and Brick Lane. Start at the corner of Rivington Street and work your way south. The murals change regularly, so even if you've done this before, there'll be new things to see. Completely free.</p>

<h2>9. Greenwich Park and the Observatory</h2>
<p>The park is one of London's finest, and the view from the top of the hill — across the river to Canary Wharf and the City — is spectacular. If you've got kids, the observatory's stargazing evenings are brilliant (from £12). The park itself is free.</p>

<h2>10. Camden Market Street Food</h2>
<p>Camden Market's food stalls have levelled up significantly in recent years. The Thai, Ethiopian, and Argentinian stands are particularly good. Go hungry. Free entry, food from about £7.</p>

<h2>11. Tate Modern Late: Contemporary Voices</h2>
<p>Friday's Late at the Tate brings DJs, talks, and special access to the galleries after hours. It's free, it's social, and it's one of the most civilised ways to spend a Friday evening in London. Runs until 10pm.</p>

<h2>12. Nottinghill's Independent Bookshops</h2>
<p>Notting Hill has some excellent independent bookshops that are worth a browse. Start at Lutyens & Rubinstein on Kensington Park Road and work your way to the Travel Bookshop. Pair it with coffee at Farm Girl. Free to browse, dangerous for your wallet.</p>

<h2>13. Brixton Village and Market Row</h2>
<p>The covered arcades of Brixton Village are packed with small restaurants and independent shops. Franco Manca started here, and the pizza is still good. The whole area has a buzzy, community feel that's different from central London.</p>

<h2>14. Walk the Southbank</h2>
<p>From Westminster Bridge to Tower Bridge, the south bank of the Thames is one of the best walks in any city in the world. Street performers, the National Theatre, the BFI, Tate Modern, Borough Market — you'll pass them all. Completely free.</p>

<h2>15. Catch a Show at the Young Vic</h2>
<p>If you want theatre that's more interesting than the average West End show, the Young Vic in Waterloo consistently programmes bold, surprising work. They keep ticket prices accessible too, with some at £10.</p>`,
        featureImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=700&fit=crop',
        featureImageAlt: 'London skyline at sunset from the South Bank',
        authorId: author.id,
        categoryId: culture.id,
        areaId: southbank.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 7,
        metaTitle: '15 Best Things to Do in London This Weekend | LondonTodo',
        metaDescription: 'Our editors pick the best things to do in London this weekend — from free exhibitions and rooftop cinemas to street food markets and jazz clubs.',
        publishedAt: new Date('2026-03-24'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'best-rooftop-bars-london-summer' },
      update: {},
      create: {
        title: 'Best Rooftop Bars in London for Summer Evenings',
        slug: 'best-rooftop-bars-london-summer',
        kicker: 'Food & Drink',
        subtitle: 'Where to drink with a view this summer — from Peckham to the West End.',
        excerpt: 'London\'s rooftop bar scene has exploded in recent years. Here are the ones actually worth the lift ride.',
        body: `<p>There was a time when London's rooftop bars could be counted on one hand. Now they seem to appear on every other new-build. The good news: competition has raised the standard. The bad news: plenty still charge £16 for a mediocre Aperol Spritz with a view of an air conditioning unit.</p><p>We've separated the genuinely good from the merely elevated.</p><h2>Frank's Cafe, Peckham</h2><p>The original and still one of the best. Frank's is a summer-only bar on top of a multi-storey car park in Peckham. The drinks are simple, the food is good, and the sunset views across London are spectacular. No bookings — just turn up and hope for a clear evening. Open May to September.</p><h2>Madison, St Paul's</h2><p>If you want drama, Madison delivers. Floor-to-ceiling views of St Paul's Cathedral from what feels like touching distance. The cocktails are competent and the terrace is large enough that you'll usually find a spot. Smart casual dress code applies after 5pm.</p><h2>Netil360, London Fields</h2><p>A scrappy, unpretentious rooftop bar in Hackney with DJs at weekends and a genuine neighbourhood feel. Not the highest viewpoint in London but one of the most relaxed. Good for a lazy Saturday afternoon.</p>`,
        featureImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=700&fit=crop',
        featureImageAlt: 'Rooftop bar overlooking London skyline at sunset',
        authorId: author.id,
        categoryId: foodDrink.id,
        status: 'PUBLISHED',
        readingTime: 5,
        metaTitle: 'Best Rooftop Bars in London 2026 | LondonTodo',
        metaDescription: 'The best rooftop bars in London for summer drinking — from Peckham to the City, here\'s where to drink with a view.',
        publishedAt: new Date('2026-03-22'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'new-exhibitions-london-this-month' },
      update: {},
      create: {
        title: 'New Exhibitions Worth Seeing in London This Month',
        slug: 'new-exhibitions-london-this-month',
        kicker: 'Exhibitions',
        subtitle: 'The latest shows opening across London\'s galleries and museums.',
        excerpt: 'From blockbuster retrospectives to small gallery shows, here\'s what\'s new on London\'s exhibition scene this month.',
        body: '<p>London\'s gallery calendar never really slows down, but spring brings a particularly strong crop of new exhibitions.</p><h2>Yayoi Kusama: Infinity Mirrors at Tate Modern</h2><p>The Tate\'s major spring show is a retrospective of Kusama\'s mirror rooms spanning six decades of work. It\'s visually extraordinary and emotionally affecting in equal measure. Book ahead — timed slots sell out fast.</p><h2>David Hockney: New Drawings at the National Portrait Gallery</h2><p>A quieter, more intimate show than the usual Hockney blockbuster. These iPad drawings of friends and family have a warmth and directness that his larger works sometimes lack. Free entry.</p>',
        featureImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=700&fit=crop',
        featureImageAlt: 'Inside Tate Modern gallery',
        authorId: author.id,
        categoryId: exhibitions.id,
        areaId: southbank.id,
        status: 'PUBLISHED',
        readingTime: 4,
        metaTitle: 'Best New Exhibitions in London This Month | LondonTodo',
        metaDescription: 'The best new exhibitions opening in London this month — from Kusama at the Tate to Hockney at the NPG.',
        publishedAt: new Date('2026-03-21'),
      },
    }),
    prisma.article.upsert({
      where: { slug: '12-free-things-to-do-in-london' },
      update: {},
      create: {
        title: '12 Free Things to Do in London When You Want a Cheap Day Out',
        slug: '12-free-things-to-do-in-london',
        kicker: 'Free',
        subtitle: 'London doesn\'t have to cost a fortune. Here are the best free things to do.',
        excerpt: 'Proof that London\'s best experiences don\'t always cost money — from world-class galleries to hidden gardens.',
        body: '<p>London is expensive, but some of the best things in the city are completely free. Here are twelve of our favourites for when the bank balance needs a rest.</p><h2>The British Museum</h2><p>One of the greatest museums in the world, and it doesn\'t cost a penny to walk in. Skip the main galleries if you\'ve done them before and head for the enlightenment gallery or the Assyrian rooms — they\'re quieter and just as impressive.</p><h2>Walk from Little Venice to Camden along the Regent\'s Canal</h2><p>A beautiful walk that takes you past houseboats, through Regent\'s Park, and delivers you right to Camden Lock. About an hour at a gentle pace.</p><h2>Sky Garden</h2><p>Free entry to the garden at the top of the Walkie Talkie building on Fenchurch Street. You need to book online in advance but it\'s worth it for the views alone. The bar and restaurant are not free, but the garden and observation deck are.</p>',
        featureImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=700&fit=crop',
        featureImageAlt: 'London cityscape',
        authorId: admin.id,
        categoryId: free.id,
        status: 'PUBLISHED',
        readingTime: 5,
        metaTitle: '12 Best Free Things to Do in London | LondonTodo',
        metaDescription: 'The best free things to do in London — museums, walks, markets, gardens, and more that won\'t cost you a thing.',
        publishedAt: new Date('2026-03-20'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'locals-guide-to-shoreditch' },
      update: {},
      create: {
        title: 'A Local\'s Guide to Shoreditch Right Now',
        slug: 'locals-guide-to-shoreditch',
        kicker: 'Area Guide',
        subtitle: 'What\'s actually good in Shoreditch in 2026 — beyond the obvious.',
        excerpt: 'Shoreditch has changed a lot in the last decade, but it\'s still one of the most interesting neighbourhoods in London. Here\'s what\'s worth knowing.',
        body: '<p>Ask a certain type of Londoner about Shoreditch and they\'ll tell you it\'s over, gentrified beyond recognition, nothing like it used to be. They\'re partly right — the area has changed enormously. But writing it off completely means missing some genuinely excellent restaurants, bars, and cultural spaces.</p><h2>Where to Eat</h2><p>Brat, on Redchurch Street, is still one of the best restaurants in London. The whole turbot is legendary. For something more casual, Smoking Goat on Shoreditch High Street does extraordinary Thai barbecue. Rochelle Canteen, hidden behind a school wall, remains a perfect lunch spot.</p><h2>Where to Drink</h2><p>Happiness Forgets in a basement on Hoxton Square makes some of the best cocktails in the city without any of the pretension. For beer, The Chesham Arms on Mehetabel Road is a proper locals\' pub that somehow survived the gentrification wave.</p><h2>What to See</h2><p>The street art changes constantly. Start at the corner of Rivington Street and Curtain Road and just walk. The Whitechapel Gallery is a short walk south and always has something interesting on. The Geffrye Museum (now the Museum of the Home) is worth the detour to Kingsland Road.</p>',
        featureImage: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=700&fit=crop',
        featureImageAlt: 'Shoreditch street art and architecture',
        authorId: author.id,
        categoryId: culture.id,
        areaId: shoreditch.id,
        status: 'PUBLISHED',
        readingTime: 6,
        metaTitle: 'A Local\'s Guide to Shoreditch | LondonTodo',
        metaDescription: 'What\'s actually worth doing in Shoreditch right now — restaurants, bars, galleries, and street art from someone who lives there.',
        publishedAt: new Date('2026-03-19'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'best-markets-in-london-this-spring' },
      update: {},
      create: {
        title: 'The Best Markets in London This Spring',
        slug: 'best-markets-in-london-this-spring',
        kicker: 'Markets',
        subtitle: 'From food halls to vintage finds, London\'s markets are at their best when the sun comes out.',
        excerpt: 'Our pick of the best London markets to visit this spring — including a few you probably haven\'t tried yet.',
        body: '<p>Spring is the best time to explore London\'s markets. The weather makes outdoor browsing pleasant rather than endurance, and the seasonal produce stalls come alive.</p><h2>Borough Market</h2><p>The granddaddy of London food markets needs no introduction, but it deserves a mention because it\'s genuinely good. Go early on Saturday for the best experience. The cheese hall alone is worth the trip.</p><h2>Broadway Market, Hackney</h2><p>Saturday only, and absolutely rammed by midday, but the quality of the food stalls is consistently high. London Fields park is right there for a post-market lie-down.</p><h2>Maltby Street Market</h2><p>Smaller and less crowded than Borough, tucked under the railway arches near Bermondsey. The gins, the cheese toasties, and the general atmosphere make it one of our favourite Saturday morning outings.</p>',
        featureImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=700&fit=crop',
        featureImageAlt: 'Borough Market stalls',
        authorId: author.id,
        categoryId: markets.id,
        areaId: southbank.id,
        status: 'PUBLISHED',
        readingTime: 4,
        metaTitle: 'Best Markets in London Spring 2026 | LondonTodo',
        metaDescription: 'The best markets in London this spring — from Borough to Broadway to the ones you haven\'t found yet.',
        publishedAt: new Date('2026-03-18'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'where-to-eat-in-soho' },
      update: {},
      create: {
        title: 'Where to Eat in Soho: A Neighbourhood Food Guide',
        slug: 'where-to-eat-in-soho',
        kicker: 'Food & Drink',
        subtitle: 'The best restaurants, cafes, and cheap eats in Soho right now.',
        excerpt: 'Soho has more restaurants per square metre than almost anywhere in London. Here\'s how to navigate them.',
        body: '<p>Soho is overwhelming for food. Every street has a dozen restaurants competing for your attention. We\'ve narrowed it down to the places we actually go back to.</p><h2>For a Special Occasion</h2><p>Barrafina on Dean Street — the original and still the best. Sit at the bar and watch them work. The croquetas are perfect. No reservations, so expect to queue, but it moves fast.</p><h2>For a Quick Lunch</h2><p>Koya on Frith Street does extraordinary udon noodles. The cold udon with dipping broth is sublime. Or try BAO on Lexington Street for Taiwanese buns that are so good they spawned a small empire.</p>',
        featureImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=700&fit=crop',
        featureImageAlt: 'Soho street scene with restaurants',
        authorId: author.id,
        categoryId: foodDrink.id,
        areaId: soho.id,
        status: 'PUBLISHED',
        readingTime: 5,
        metaTitle: 'Where to Eat in Soho London | LondonTodo',
        metaDescription: 'The best restaurants in Soho — from Barrafina to BAO, here\'s where locals actually eat in London\'s West End.',
        publishedAt: new Date('2026-03-17'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'best-family-activities-london-half-term' },
      update: {},
      create: {
        title: 'Best Family Activities in London This Half Term',
        slug: 'best-family-activities-london-half-term',
        kicker: 'Family',
        subtitle: 'Keeping the kids entertained in London without losing your mind.',
        excerpt: 'Half term in London doesn\'t have to mean soft play. Here are the best family activities that adults will enjoy too.',
        body: '<p>Half term is approaching and you need ideas. Good news: London is one of the best cities in the world for keeping children entertained, and many of the best things are free or cheap.</p><h2>Natural History Museum</h2><p>Free, spectacular, and big enough to absorb hours of energy. The dinosaur gallery is the obvious draw, but the minerals room and the wildlife garden (if the weather holds) are just as good. Go early to avoid the worst of the queues.</p><h2>Science Museum</h2><p>Right next door to the Natural History Museum. The interactive galleries are brilliant for kids of all ages. The Wonderlab is worth the extra ticket — genuinely fun experiments that adults enjoy too.</p>',
        featureImage: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=700&fit=crop',
        featureImageAlt: 'Family visiting Greenwich Park',
        authorId: admin.id,
        categoryId: family.id,
        status: 'PUBLISHED',
        readingTime: 4,
        metaTitle: 'Best Family Activities London Half Term 2026 | LondonTodo',
        metaDescription: 'The best family activities in London this half term — museums, parks, shows, and days out that adults will enjoy too.',
        publishedAt: new Date('2026-03-16'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'london-comedy-clubs-guide' },
      update: {},
      create: {
        title: 'London\'s Best Comedy Clubs and Where to Find Them',
        slug: 'london-comedy-clubs-guide',
        kicker: 'Nightlife',
        subtitle: 'From intimate basement rooms to headline shows, London\'s comedy scene is thriving.',
        excerpt: 'The best comedy clubs in London — from Soho institutions to surprise gems in South London.',
        body: '<p>London has one of the best comedy scenes in the world, and unlike the West End, most of it is surprisingly affordable.</p><h2>The Comedy Store, Soho</h2><p>The most famous comedy club in London. Tuesday\'s "Cutting Edge" and Wednesday\'s "King Gong" are both excellent. The late show on Friday and Saturday draws bigger names. Tickets from £8.</p><h2>Angel Comedy, Islington</h2><p>Free entry, proper comedians, and a room above a pub. This is one of London\'s best-kept comedy secrets. The quality is remarkably high for something that costs literally nothing.</p>',
        featureImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
        featureImageAlt: 'Comedy club interior',
        authorId: author.id,
        categoryId: nightlife.id,
        areaId: soho.id,
        status: 'PUBLISHED',
        readingTime: 4,
        metaTitle: 'Best Comedy Clubs in London | LondonTodo',
        metaDescription: 'The best comedy clubs in London — from free nights in Islington to headliners in Soho.',
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.article.upsert({
      where: { slug: 'hidden-museums-london' },
      update: {},
      create: {
        title: 'Hidden Gems: 10 London Museums You Probably Haven\'t Visited',
        slug: 'hidden-museums-london',
        kicker: 'Culture',
        subtitle: 'Beyond the V&A and the British Museum — London\'s smaller museums are often the most rewarding.',
        excerpt: 'These lesser-known London museums are quieter, more personal, and often free. Time to explore.',
        body: '<p>Everyone knows the Natural History Museum, the British Museum, and the V&A. They\'re brilliant, but they\'re also crowded. London has dozens of smaller museums that are quieter, quirkier, and often completely free.</p><h2>Sir John Soane\'s Museum, Holborn</h2><p>An architect\'s townhouse stuffed floor-to-ceiling with antiquities, paintings, and architectural models. It\'s like stepping into a beautiful, slightly mad collection. Free entry. The Saturday evening candlelit openings are magical — book ahead.</p><h2>The Wellcome Collection, Euston</h2><p>Where medicine meets art. The permanent collection includes Napoleon\'s toothbrush and Florence Nightingale\'s moccasins. The temporary exhibitions are consistently thought-provoking. Free entry, excellent bookshop.</p>',
        featureImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=500&fit=crop',
        featureImageAlt: 'Museum gallery interior',
        authorId: author.id,
        categoryId: culture.id,
        status: 'PUBLISHED',
        readingTime: 5,
        metaTitle: '10 Hidden Museums in London | LondonTodo',
        metaDescription: 'London\'s best hidden museums — smaller, quieter, and often free alternatives to the big names.',
        publishedAt: new Date('2026-03-14'),
      },
    }),
  ])

  // Events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { slug: 'immersive-van-gogh-experience' },
      update: {},
      create: {
        title: 'Immersive Van Gogh Experience',
        slug: 'immersive-van-gogh-experience',
        description: 'Step inside the paintings of Vincent van Gogh in this spectacular immersive digital art experience. Over 300 of Van Gogh\'s works come to life through floor-to-ceiling projections that surround you in colour, light, and music. From the swirling skies of Starry Night to the golden warmth of Sunflowers, the experience transforms the gallery into a living canvas.',
        shortSummary: 'Walk through Van Gogh\'s masterpieces in a stunning immersive projection experience.',
        whyGo: 'Unlike traditional gallery visits, this puts you physically inside the artwork. The scale and the soundtrack make it genuinely moving, not just a gimmick.',
        worthItIf: 'You want an art experience that works for people who don\'t normally go to galleries. Also excellent for older kids and teenagers.',
        featureImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=700&fit=crop',
        featureImageAlt: 'Immersive Van Gogh projection room',
        categoryId: exhibitions.id,
        areaId: soho.id,
        venueId: frameless.id,
        startDate: new Date('2026-03-20'),
        endDate: new Date('2026-06-30'),
        startTime: '10:00',
        endTime: '21:00',
        priceType: 'PAID',
        priceMin: 25,
        priceMax: 35,
        ticketUrl: 'https://frameless.com',
        status: 'PUBLISHED',
        featured: true,
        familyFriendly: true,
        isDaytime: true,
        publishedAt: new Date('2026-03-15'),
        metaTitle: 'Immersive Van Gogh Experience London | LondonTodo',
        metaDescription: 'Step inside Van Gogh\'s paintings at Frameless, Marble Arch. Tickets from £25. An extraordinary immersive digital art experience.',
      },
    }),
    prisma.event.upsert({
      where: { slug: 'borough-market-saturday-special' },
      update: {},
      create: {
        title: 'Borough Market Saturday Special',
        slug: 'borough-market-saturday-special',
        description: 'Borough Market\'s Saturday is when the market is at its liveliest, with the full complement of traders, special guest producers, and seasonal highlights.',
        shortSummary: 'London\'s most famous food market at its bustling Saturday best.',
        whyGo: 'Saturday is when Borough Market comes alive with the full roster of traders and special events.',
        worthItIf: 'You love food, don\'t mind crowds, and want to taste your way through London\'s best market.',
        featureImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=700&fit=crop',
        categoryId: markets.id,
        areaId: southbank.id,
        venueId: boroughMarket.id,
        startDate: new Date('2026-03-28'),
        startTime: '08:00',
        endTime: '17:00',
        recurring: true,
        recurrenceRule: 'Every Saturday',
        priceType: 'FREE',
        status: 'PUBLISHED',
        featured: true,
        familyFriendly: true,
        isDaytime: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'rooftop-cinema-club-peckham' },
      update: {},
      create: {
        title: 'Rooftop Cinema Club',
        slug: 'rooftop-cinema-club-peckham',
        description: 'Watch classic and cult films under the stars on Peckham\'s most famous rooftop. Wireless headphones, blankets provided, and the London skyline as your backdrop.',
        shortSummary: 'Open-air cinema with London skyline views on a Peckham rooftop.',
        whyGo: 'The combination of the films, the view, and the atmosphere makes this one of the most memorable cinema experiences in London.',
        worthItIf: 'You want a date-night activity that\'s more interesting than a standard cinema trip.',
        featureImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=700&fit=crop',
        categoryId: culture.id,
        areaId: peckham.id,
        venueId: busseyBuilding.id,
        startDate: new Date('2026-04-01'),
        endDate: new Date('2026-09-30'),
        startTime: '19:30',
        endTime: '23:00',
        priceType: 'PAID',
        priceMin: 18,
        priceMax: 22,
        ticketUrl: 'https://rooftopcinemaclub.com',
        status: 'PUBLISHED',
        familyFriendly: false,
        isDaytime: false,
        isNightlife: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'camden-market-street-food-festival' },
      update: {},
      create: {
        title: 'Camden Market Street Food Festival',
        slug: 'camden-market-street-food-festival',
        description: 'A weekend celebration of London\'s best street food vendors, with live music, craft drinks, and a cooking demonstration stage.',
        shortSummary: 'Weekend street food festival at Camden Market with live music and demos.',
        whyGo: 'Camden Market\'s food scene has genuinely levelled up. This festival brings the best vendors together in one weekend.',
        worthItIf: 'You\'re a food adventurer who wants to try cuisines from around the world in one afternoon.',
        featureImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=700&fit=crop',
        categoryId: foodDrink.id,
        areaId: camden.id,
        venueId: camdenMarket.id,
        startDate: new Date('2026-04-05'),
        endDate: new Date('2026-04-06'),
        startTime: '10:00',
        endTime: '20:00',
        priceType: 'FREE',
        status: 'PUBLISHED',
        familyFriendly: true,
        isDaytime: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'royal-observatory-stargazing' },
      update: {},
      create: {
        title: 'Royal Observatory Stargazing Evening',
        slug: 'royal-observatory-stargazing',
        description: 'Join astronomers at the Royal Observatory for an evening of stargazing through historic telescopes, with expert talks on the night sky over London.',
        shortSummary: 'Stargazing through historic telescopes at the Royal Observatory.',
        whyGo: 'There\'s something magical about looking through the same telescopes that mapped the stars centuries ago, right on the Meridian Line.',
        worthItIf: 'You have kids who are curious about space, or you\'re the kind of adult who still looks up.',
        featureImage: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=700&fit=crop',
        categoryId: family.id,
        areaId: greenwich.id,
        venueId: royalObservatory.id,
        startDate: new Date('2026-04-12'),
        startTime: '19:00',
        endTime: '22:00',
        priceType: 'PAID',
        priceMin: 12,
        ticketUrl: 'https://rmg.co.uk',
        status: 'PUBLISHED',
        familyFriendly: true,
        isDaytime: false,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'soho-jazz-night-ronnie-scotts' },
      update: {},
      create: {
        title: 'Soho Jazz Night',
        slug: 'soho-jazz-night-ronnie-scotts',
        description: 'The legendary Ronnie Scott\'s hosts its famous Saturday late-night jazz session. A more relaxed, spontaneous affair than the headline shows, with world-class musicians playing in an intimate basement setting.',
        shortSummary: 'Late-night jazz at London\'s most famous jazz club.',
        whyGo: 'Ronnie Scott\'s atmosphere is unlike anywhere else in London. The late show is looser and more spontaneous than the main gigs.',
        worthItIf: 'You love jazz, or you just want one of the best night-out experiences in Soho.',
        featureImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
        categoryId: nightlife.id,
        areaId: soho.id,
        venueId: ronnieScotts.id,
        startDate: new Date('2026-03-29'),
        startTime: '23:00',
        endTime: '03:00',
        recurring: true,
        recurrenceRule: 'Every Saturday',
        priceType: 'PAID',
        priceMin: 30,
        priceMax: 55,
        ticketUrl: 'https://ronniescotts.co.uk',
        status: 'PUBLISHED',
        isDaytime: false,
        isNightlife: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'tate-modern-late-contemporary-voices' },
      update: {},
      create: {
        title: 'Tate Modern Late: Contemporary Voices',
        slug: 'tate-modern-late-contemporary-voices',
        description: 'The Tate stays open late for an evening of DJs, talks, workshops, and special gallery access. A social, cultural experience that turns the museum into a Friday night destination.',
        shortSummary: 'DJs, talks, and late gallery access at one of the world\'s great museums.',
        whyGo: 'It\'s free, it\'s social, and it turns the Tate into something between a gallery and a club night. One of the most civilised ways to start a Friday evening.',
        worthItIf: 'You want culture that doesn\'t feel stuffy and a Friday night that starts before the pub.',
        featureImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=700&fit=crop',
        categoryId: culture.id,
        areaId: southbank.id,
        venueId: tateModern.id,
        startDate: new Date('2026-04-04'),
        startTime: '18:00',
        endTime: '22:00',
        recurring: true,
        recurrenceRule: 'First Friday of each month',
        priceType: 'FREE',
        status: 'PUBLISHED',
        featured: true,
        isDaytime: false,
        isNightlife: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
    prisma.event.upsert({
      where: { slug: 'columbia-road-flower-market' },
      update: {},
      create: {
        title: 'Columbia Road Flower Market',
        slug: 'columbia-road-flower-market',
        description: 'Every Sunday, Columbia Road transforms into London\'s most colourful market. Flowers, plants, and bulbs from dozens of traders line the street, with independent shops and cafes open along the road.',
        shortSummary: 'London\'s favourite Sunday flower market in the heart of Shoreditch.',
        whyGo: 'There\'s nothing quite like it in London. The colours, the sellers shouting deals, the surrounding cafes — it\'s a perfect Sunday morning.',
        worthItIf: 'You\'re an early riser who loves flowers, good coffee, and a neighbourhood that feels like a village for a few hours.',
        featureImage: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=700&fit=crop',
        categoryId: markets.id,
        areaId: shoreditch.id,
        venueId: columbiaRoad.id,
        startDate: new Date('2026-03-30'),
        startTime: '08:00',
        endTime: '15:00',
        recurring: true,
        recurrenceRule: 'Every Sunday',
        priceType: 'FREE',
        status: 'PUBLISHED',
        familyFriendly: true,
        isDaytime: true,
        publishedAt: new Date('2026-03-15'),
      },
    }),
  ])

  console.log(`✅ Seeded: ${articles.length} articles, ${events.length} events, ${categories.length} categories, ${areas.length} areas, ${venues.length} venues, ${tags.length} tags`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
