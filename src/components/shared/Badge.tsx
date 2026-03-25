import { cn } from '@/lib/utils'
import { Star, Megaphone } from 'lucide-react'

interface BadgeProps {
  type: 'featured' | 'sponsored'
  className?: string
}

export default function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        type === 'featured' && 'bg-amber-100 text-amber-800',
        type === 'sponsored' && 'bg-ink-100 text-ink-600',
        className,
      )}
    >
      {type === 'featured' ? (
        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
      ) : (
        <Megaphone className="h-3 w-3" />
      )}
      {type === 'featured' ? 'Featured' : 'Sponsored'}
    </span>
  )
}
