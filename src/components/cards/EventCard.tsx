import Image from 'next/image'
import Link from 'next/link'
import { cn, formatEventDate, formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import CategoryChip from '@/components/shared/CategoryChip'
import Badge from '@/components/shared/Badge'
import { MapPin } from 'lucide-react'

interface EventCardEvent {
  slug: string
  title: string
  featureImage: string
  startDate: string | Date
  endDate?: string | Date | null
  venue: { name: string }
  area: { name: string }
  priceType?: string
  priceMin?: number | null
  priceMax?: number | null
  category: { name: string; slug: string; color: string }
  featured?: boolean
  sponsored?: boolean
}

interface EventCardProps {
  event: EventCardEvent
}

export default function EventCard({ event }: EventCardProps) {
  const {
    slug,
    title,
    featureImage,
    startDate,
    endDate,
    venue,
    area,
    priceType,
    priceMin,
    priceMax,
    category,
    featured,
    sponsored,
  } = event

  const start = new Date(startDate)
  const day = format(start, 'd')
  const month = format(start, 'MMM').toUpperCase()

  return (
    <Link
      href={`/events/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={featureImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Date badge overlay */}
        <div className="absolute left-3 top-3 flex h-14 w-12 flex-col items-center justify-center rounded-lg bg-white/95 shadow-sm backdrop-blur-sm">
          <span className="text-lg font-bold leading-none text-ink-900">{day}</span>
          <span className="mt-0.5 text-[10px] font-semibold leading-none text-brand-600">
            {month}
          </span>
        </div>

        {(featured || sponsored) && (
          <div className="absolute right-3 top-3">
            <Badge type={sponsored ? 'sponsored' : 'featured'} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <CategoryChip name={category.name} slug={category.slug} color={category.color} />
          <span className="flex-shrink-0 text-xs font-medium text-ink-500">
            {formatPrice(priceMin, priceMax, priceType)}
          </span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-ink-400">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            {venue.name} &middot; {area.name}
          </span>
        </div>

        <p className="mt-1.5 text-xs text-ink-400">
          {formatEventDate(startDate, endDate)}
        </p>
      </div>
    </Link>
  )
}
