export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { generateArticle, generateSeoMeta, type ArticleTemplate } from '@/lib/groq'
import { prisma } from '@/lib/prisma'
import { readingTime, slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { template, topic, area, category, extraContext } = body

    if (!template || !topic) {
      return NextResponse.json({ error: 'Template and topic are required' }, { status: 400 })
    }

    // Create a draft entry
    const draft = await prisma.aiDraft.create({
      data: {
        template,
        topic,
        inputs: { area, category, extraContext },
        status: 'GENERATING',
      },
    })

    // Generate the article
    const articleBody = await generateArticle({
      template: template as ArticleTemplate,
      topic,
      area,
      category,
      extraContext,
    })

    // Generate SEO metadata
    const seo = await generateSeoMeta(topic, articleBody)

    // Update the draft
    const updatedDraft = await prisma.aiDraft.update({
      where: { id: draft.id },
      data: {
        output: JSON.stringify({
          title: topic,
          slug: slugify(topic),
          body: articleBody,
          excerpt: seo.excerpt || '',
          metaTitle: seo.metaTitle || topic,
          metaDescription: seo.metaDescription || '',
          readingTime: readingTime(articleBody),
        }),
        status: 'READY',
      },
    })

    return NextResponse.json(updatedDraft)
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
