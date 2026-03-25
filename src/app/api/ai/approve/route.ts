export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { draftId, edits } = await req.json()

    if (!draftId) {
      return NextResponse.json({ error: 'Draft ID required' }, { status: 400 })
    }

    const draft = await prisma.aiDraft.findUnique({ where: { id: draftId } })
    if (!draft || draft.status !== 'READY') {
      return NextResponse.json({ error: 'Draft not found or not ready' }, { status: 404 })
    }

    const content = JSON.parse(draft.output || '{}')
    const merged = { ...content, ...edits }

    // Create article from approved draft
    const article = await prisma.article.create({
      data: {
        title: merged.title,
        slug: merged.slug,
        subtitle: merged.subtitle,
        excerpt: merged.excerpt,
        body: merged.body,
        featureImage: merged.featureImage,
        metaTitle: merged.metaTitle,
        metaDescription: merged.metaDescription,
        readingTime: merged.readingTime,
        categoryId: merged.categoryId,
        areaId: merged.areaId,
        status: 'REVIEW',
        aiGenerated: true,
        aiTemplate: draft.template,
      },
    })

    // Update draft status
    await prisma.aiDraft.update({
      where: { id: draftId },
      data: { status: 'APPROVED', articleId: article.id },
    })

    return NextResponse.json({ article, draft: { id: draftId, status: 'APPROVED' } })
  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json({ error: 'Failed to approve draft' }, { status: 500 })
  }
}
