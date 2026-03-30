'use client'

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsletterBoxProps {
  variant?: 'inline' | 'sidebar'
  headline?: string
  description?: string
}

export default function NewsletterBox({
  variant = 'inline',
  headline,
  description,
}: NewsletterBoxProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const defaultHeadline = variant === 'sidebar'
    ? 'London in your inbox'
    : 'Get the best of London in your inbox'
  const defaultDesc = variant === 'sidebar'
    ? 'Our editors\' picks, every Thursday.'
    : 'Weekly picks of events, openings, and hidden gems — curated by our editors.'

  const h = headline ?? defaultHeadline
  const d = description ?? defaultDesc

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div className={cn(
        'flex items-center gap-3 rounded-xl bg-green-50 p-5',
        variant === 'inline' && 'my-8 justify-center',
      )}>
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
        <div>
          <p className="text-sm font-semibold text-green-900">You&apos;re subscribed!</p>
          <p className="text-xs text-green-700">See you Thursday.</p>
        </div>
      </div>
    )
  }

  // Sidebar variant — compact, clean
  if (variant === 'sidebar') {
    return (
      <div className="rounded-xl bg-ink-900 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-sm font-bold text-white">{h}</h3>
        </div>
        {d && <p className="mt-2 text-xs leading-relaxed text-ink-300">{d}</p>}
        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-ink-700 bg-ink-800 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {status === 'error' && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3" />
            <span>Something went wrong. Try again.</span>
          </div>
        )}
        <p className="mt-2.5 text-center text-[10px] text-ink-500">No spam, ever. Unsubscribe anytime.</p>
      </div>
    )
  }

  // Inline variant — wider, used in article bodies and footer
  return (
    <div className="my-8 rounded-xl bg-ink-900 p-6 sm:p-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600">
            <Mail className="h-4 w-4 text-white" />
          </div>
        </div>
        {h && <h3 className="mt-2 font-display text-lg font-extrabold text-white sm:text-xl">{h}</h3>}
        {d && <p className="mt-1.5 text-sm text-ink-300">{d}</p>}
        <form onSubmit={handleSubmit} className="mx-auto mt-4 flex max-w-sm gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 rounded-full border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {status === 'error' && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3" />
            <span>Something went wrong. Try again.</span>
          </div>
        )}
        <p className="mt-3 text-[11px] text-ink-500">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
