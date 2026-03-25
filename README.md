# LondonTodo.com

A content-led editorial city guide for London — events, attractions, restaurants, bars, markets, and neighbourhood guides. Built as a polished editorial publication with integrated CMS and AI-assisted content generation.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom editorial design system
- **PostgreSQL** + **Prisma** ORM
- **NextAuth.js** for admin authentication
- **Groq AI** for AI-assisted article generation
- Deployable on **Vercel**

## Getting Started

### 1. Clone and install

```bash
cd londontodo
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for auth sessions (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `GROQ_API_KEY` | Groq API key for AI content generation |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

### 3. Set up database

```bash
npx prisma db push    # Create tables
npm run db:seed       # Seed with sample content
```

### 4. Run dev server

```bash
npm run dev
```

Visit:
- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/dashboard

### Admin login

Default credentials (set in seed):
- Email: `editor@londontodo.com`
- Password: `londontodo2024`

## Project Structure

```
src/
├── app/
│   ├── (site)/              # Public-facing pages
│   │   ├── page.tsx         # Homepage
│   │   ├── articles/[slug]/ # Article pages
│   │   ├── events/          # Event browse + detail
│   │   ├── areas/[slug]/    # Area/neighbourhood pages
│   │   ├── categories/[slug]/ # Category pages
│   │   ├── this-weekend/    # Weekend guide
│   │   ├── free-in-london/  # Free activities
│   │   ├── new-in-london/   # New openings
│   │   └── search/          # Search
│   ├── (admin)/admin/       # CMS dashboard
│   │   ├── dashboard/       # Overview stats
│   │   ├── articles/        # Article CRUD + editor
│   │   ├── events/          # Event CRUD + editor
│   │   ├── categories/      # Category management
│   │   ├── areas/           # Area management
│   │   ├── ai-queue/        # AI content generation queue
│   │   └── media/           # Media library
│   └── api/                 # API routes
│       ├── articles/        # Article CRUD
│       ├── events/          # Event CRUD
│       ├── categories/      # Category CRUD
│       ├── areas/           # Area CRUD
│       ├── search/          # Search endpoint
│       ├── ai/              # AI generation + approval
│       ├── newsletter/      # Newsletter signup
│       └── auth/            # NextAuth
├── components/
│   ├── layout/              # Header, Footer
│   ├── home/                # Homepage sections
│   ├── articles/            # Article page components
│   ├── cards/               # ArticleCard, EventCard
│   ├── shared/              # Reusable UI components
│   └── admin/               # Admin-specific components
├── lib/
│   ├── prisma.ts            # Prisma client
│   ├── groq.ts              # Groq AI integration
│   ├── utils.ts             # Utilities + constants
│   ├── seed-data.ts         # Static seed data for dev
│   └── seed-article-bodies.ts # Full article content
└── types/                   # TypeScript types
```

## Content Types

### Articles
Editorial content — guides, roundups, reviews, area profiles. Supports:
- Rich HTML body with inline promotional callouts
- SEO metadata, Open Graph, article schema.org
- Categories, areas, tags
- Featured/sponsored flags
- AI-assisted generation via Groq

### Events
Event listings with full detail — dates, venues, pricing, ticket links. Supports:
- Recurring events
- Free/paid/donation pricing
- Family-friendly and daytime/nightlife flags
- Event schema.org markup
- Featured/sponsored placement

### Areas
Neighbourhood pages — Shoreditch, Soho, Camden, Peckham, etc.

### Categories
Content categories — Food & Drink, Culture, Nightlife, Family, Markets, Theatre, Free Things, Exhibitions.

## AI Content Generation

The site integrates Groq for AI-assisted editorial workflows:

1. **Generate**: Select a template (weekend roundup, area guide, best-of, etc.) and topic
2. **Review**: AI generates a draft with proper editorial structure and London-specific content
3. **Approve/Edit**: Review in admin, make edits, then approve to create an article
4. **Publish**: Set status to Published when ready

Templates: `weekend-roundup`, `best-of-category`, `area-guide`, `new-openings`, `free-things`, `seasonal-guide`, `event-preview`

## SEO Strategy

The site is built for SEO scale:
- Clean URL structure (`/articles/slug`, `/events/slug`, `/areas/slug`)
- Dynamic meta titles and descriptions
- Open Graph and Twitter Card tags
- Article and Event schema.org JSON-LD
- Breadcrumb navigation with schema
- Sitemap.xml (strategic — starts small, grows with content)
- Robots.txt (blocks /admin/ and /api/)
- Internal linking between related content
- Category and area pages as indexable landing pages

**Important**: Don't flood the sitemap. Trickle out published content strategically. The sitemap currently only includes core pages — as articles and events are published, they're added dynamically.

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo in Vercel
3. Set environment variables in Vercel dashboard
4. Add a PostgreSQL database (Vercel Postgres, Supabase, Neon, etc.)
5. Deploy

Build command: `prisma generate && next build`

## Key Design Decisions

- **Seed data for dev**: The frontend uses static seed data from `lib/seed-data.ts` so the site works without a database during development. API routes use Prisma for production.
- **Editorial-first design**: Commercial elements (promoted events, sponsored picks) are woven naturally into the editorial layout, not bolted on as ads.
- **Mobile-first**: All layouts stack cleanly on mobile with horizontal scroll for event carousels.
- **Typography**: DM Serif Display for headlines, Inter for body text. Strong editorial hierarchy.
