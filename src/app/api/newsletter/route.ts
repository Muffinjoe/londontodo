export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' })
    }

    await prisma.subscriber.create({
      data: { email, name },
    })

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
