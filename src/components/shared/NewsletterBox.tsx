'use client'

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

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
    : 'Never miss the best of London'
  const defaultDesc = variant === 'sidebar'
    ? 'Free weekly picks, every Thursday.'
    : 'Our editors\' picks of events, openings, and hidden gems, delivered every Thursday.'

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

  if (status === 'success') {
    return (
      <div className={cn(
        'rounded-2xl border border-green-200 bg-green-50 p-6 text-center',
        variant === 'inline' && 'my-8',
      )}>
        <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
        <p className="mt-2 text-sm font-semibold text-green-900">You&apos;re in!</p>
        <p className="mt-0.5 text-xs text-green-600">See you Thursday.</p>
      </div>
    )
  }

  // Sidebar
  if (variant === 'sidebar') {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-5">
        <h3 className="font-display text-base font-extrabold text-ink-900">{h}</h3>
        {d && <p className="mt-1 text-xs leading-relaxed text-ink-400">{d}</p>}
        <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>Subscribe <Send className="h-3.5 w-3.5" /></>
            )}
          </button>
        </form>
        {status === 'error' && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            <span>Something went wrong. Try again.</span>
          </div>
        )}
        <p className="mt-3 text-center text-[10px] text-ink-300">No spam. Unsubscribe anytime.</p>
      </div>
    )
  }

  // Inline
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
      <div className="mx-auto max-w-lg text-center">
        {h && <h3 className="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">{h}</h3>}
        {d && <p className="mt-2 text-sm text-ink-500">{d}</p>}
        <form onSubmit={handleSubmit} className="mx-auto mt-5 flex max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>Subscribe <Send className="h-3.5 w-3.5" /></>
            )}
          </button>
        </form>
        {status === 'error' && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            <span>Something went wrong. Try again.</span>
          </div>
        )}
        <p className="mt-3 text-xs text-ink-300">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
