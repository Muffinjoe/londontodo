'use client'

import { useState } from 'react'
import { Twitter, Facebook, Link as LinkIcon, Check, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'hover:bg-[#1da1f2]/10 hover:text-[#1da1f2]',
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'hover:bg-[#1877f2]/10 hover:text-[#1877f2]',
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      className: 'hover:bg-[#25d366]/10 hover:text-[#25d366]',
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback silently
    }
  }

  return (
    <div className="flex items-center gap-1">
      {links.map(({ label, icon: Icon, href, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors',
            className,
          )}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
          copied
            ? 'bg-green-50 text-green-600'
            : 'text-ink-400 hover:bg-ink-100 hover:text-ink-600',
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  )
}
