'use client'

import { useState, useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

interface StickyMobileCTAProps {
  ticketUrl: string
  text?: string
}

export default function StickyMobileCTA({ ticketUrl, text = 'Get Tickets' }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      if (dismissed) return
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-white px-4 py-3 shadow-lg lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand-700"
        >
          {text}
          <ExternalLink className="h-4 w-4" />
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
