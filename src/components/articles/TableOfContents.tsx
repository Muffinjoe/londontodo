'use client'

import { useMemo } from 'react'
import { List } from 'lucide-react'

interface TableOfContentsProps {
  body: string
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const headings = useMemo(() => {
    const matches = body.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)
    return Array.from(matches).map((match, index) => {
      // Strip HTML tags from heading text
      const text = match[1].replace(/<[^>]*>/g, '')
      // Decode HTML entities
      const decoded = text
        .replace(/&amp;/g, '&')
        .replace(/&rsquo;/g, '\u2019')
        .replace(/&lsquo;/g, '\u2018')
        .replace(/&ldquo;/g, '\u201C')
        .replace(/&rdquo;/g, '\u201D')
        .replace(/&ndash;/g, '\u2013')
        .replace(/&mdash;/g, '\u2014')
        .replace(/&pound;/g, '\u00A3')
        .replace(/&#\d+;/g, (m) => String.fromCharCode(parseInt(m.slice(2, -1))))
      const id = decoded
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      return { id, text: decoded, index }
    })
  }, [body])

  if (headings.length < 3) return null

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav className="my-8 rounded-lg border border-ink-100 bg-ink-50/40 p-5">
      <div className="mb-3 flex items-center gap-2">
        <List className="h-4 w-4 text-brand-600" />
        <h3 className="font-display text-base font-semibold text-ink-900">
          In this guide
        </h3>
      </div>
      <ol className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="text-sm leading-snug text-ink-500 transition-colors hover:text-brand-600"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
