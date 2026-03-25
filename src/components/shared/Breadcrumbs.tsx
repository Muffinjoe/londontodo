import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_URL } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
        {allItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />}
            {item.href && i < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-brand-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
