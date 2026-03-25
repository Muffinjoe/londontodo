/**
 * Enriches event descriptions using Groq AI
 * and fixes missing/broken images with Unsplash fallbacks
 */

import { PrismaClient } from '@prisma/client'
import Groq from 'groq-sdk'

const prisma = new PrismaClient()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const UNSPLASH_FALLBACKS = [
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1545042746-ec9e50e7db86?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517502884422-e8e5f25a7bff?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533929736562-87b04b5ba4ea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1528809217021-151305b04551?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
]

async function main() {
  // Fix images: replace Google encrypted thumbnails with Unsplash
  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true, area: true, venue: true },
  })

  console.log(`📸 Fixing images for ${events.length} events...\n`)

  let imgFixed = 0
  for (const event of events) {
    if (event.featureImage?.includes('encrypted-tbn') || event.featureImage?.includes('gstatic.com') || !event.featureImage) {
      const fallback = UNSPLASH_FALLBACKS[imgFixed % UNSPLASH_FALLBACKS.length]
      await prisma.event.update({
        where: { id: event.id },
        data: { featureImage: fallback },
      })
      imgFixed++
    }
  }
  console.log(`  Fixed ${imgFixed} broken images\n`)

  // Enrich short descriptions with Groq
  const shortEvents = events.filter(e => !e.shortSummary || e.description.length < 100)
  console.log(`✍️  Enriching ${Math.min(shortEvents.length, 20)} events with editorial descriptions...\n`)

  let enriched = 0
  for (const event of shortEvents.slice(0, 20)) {
    try {
      const completion = await groq.chat.completions.create({
        model: 'compound-beta',
        messages: [
          {
            role: 'system',
            content: 'You are an editorial writer for LondonTodo.com. Write concise, engaging event descriptions for a London city guide. Be specific and informative. Return JSON with: description (2-3 paragraphs, 100-200 words), shortSummary (1 sentence, max 150 chars), whyGo (1-2 sentences about why this event is worth attending), worthItIf (1 sentence: "Worth it if you..."). Only return valid JSON.',
          },
          {
            role: 'user',
            content: `Write editorial content for this London event:\nTitle: ${event.title}\nVenue: ${event.venue?.name || 'TBC'}\nArea: ${event.area?.name || 'London'}\nCategory: ${event.category?.name || 'Events'}\nOriginal description: ${event.description?.slice(0, 300) || 'No description available'}\nDate: ${event.startDate.toISOString().split('T')[0]}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })

      const content = completion.choices[0]?.message?.content || ''
      try {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0])
          await prisma.event.update({
            where: { id: event.id },
            data: {
              description: data.description || event.description,
              shortSummary: data.shortSummary || null,
              whyGo: data.whyGo || null,
              worthItIf: data.worthItIf || null,
            },
          })
          enriched++
          console.log(`  ✅ ${event.title}`)
        }
      } catch {
        console.log(`  ⚠️  Could not parse JSON for: ${event.title}`)
      }

      // Rate limit
      await new Promise(r => setTimeout(r, 2000))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ❌ ${event.title}: ${msg.slice(0, 100)}`)
    }
  }

  console.log(`\n🎉 Done! Enriched ${enriched} events`)
  const total = await prisma.event.count({ where: { status: 'PUBLISHED' } })
  console.log(`📊 Total published events: ${total}`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
