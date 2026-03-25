import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CategoryChipProps {
  name: string
  slug: string
  color?: string
  size?: 'sm' | 'md'
}

export default function CategoryChip({ name, slug, color, size = 'sm' }: CategoryChipProps) {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        'inline-block rounded-full font-body font-medium transition-opacity hover:opacity-80',
        size === 'sm' && 'px-2.5 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
      )}
      style={{
        backgroundColor: color ? `${color}18` : 'rgba(237, 17, 72, 0.08)',
        color: color || '#ed1148',
      }}
    >
      {name}
    </Link>
  )
}
