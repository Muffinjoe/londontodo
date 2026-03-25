'use client'

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react'

interface NewsletterBoxProps {
  variant?: 'inline' | 'sidebar'
  headline?: string
  description?: string
}

export default function NewsletterBox({
  variant = 'inline',
  headline = 'Get the best of London in your inbox',
  description = 'Weekly picks of events, openings, and hidden gems — curated by our editors.',
}: NewsletterBoxProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
      if (!res.ok) throw new Error('Subscription failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-lg bg-green-50 p-6 text-center',
          variant === 'inline' && 'my-8',
        )}
      >
        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
        <p className="font-display text-lg font-semibold text-green-900">
          You&apos;re in!
        </p>
        <p className="mt-1 text-sm text-green-700">
          Check your inbox to confirm your subscription.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-ink-100 bg-ink-50/50',
        variant === 'inline' && 'my-8 p-6 sm:p-8',
        variant === 'sidebar' && 'p-5',
      )}
    >
      <div className={cn(variant === 'inline' && 'mx-auto max-w-lg text-center')}>
        <div className="mb-3 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-brand-600" />
          <h3 className="font-display text-lg font-semibold text-ink-900">
            {headline}
          </h3>
        </div>
        <p
          className={cn(
            'mb-4 text-sm text-ink-500',
            variant === 'inline' && 'mx-auto max-w-md',
          )}
        >
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          className={cn(
            'flex gap-2',
            variant === 'inline' && 'mx-auto max-w-sm',
            variant === 'sidebar' && 'flex-col',
          )}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className={cn(
              'flex-1 rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900',
              'placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
            )}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white',
              'transition-colors hover:bg-brand-700 disabled:opacity-60',
              variant === 'sidebar' && 'w-full',
            )}
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
        )}
        <p className="mt-3 text-xs text-ink-400">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
