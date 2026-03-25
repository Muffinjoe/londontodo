import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import Badge from './Badge'

interface PromoCalloutProps {
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  image?: string
  icon?: React.ReactNode
  sponsored?: boolean
  className?: string
}

export default function PromoCallout({
  title,
  description,
  ctaText,
  ctaUrl,
  image,
  icon,
  sponsored,
  className,
}: PromoCalloutProps) {
  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-lg border border-ink-100 bg-ink-50/40',
        'border-l-4 border-l-brand-600',
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5">
        {image && (
          <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
            <Image src={image} alt={title} fill className="object-cover" sizes="96px" />
          </div>
        )}
        {!image && icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="font-display text-base font-semibold text-ink-900">
              {title}
            </h4>
            {sponsored && <Badge type="sponsored" />}
          </div>
          <p className="text-sm leading-relaxed text-ink-500">{description}</p>
        </div>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5',
            'text-sm font-medium text-white transition-colors hover:bg-brand-700',
            'self-start sm:self-center',
          )}
        >
          {ctaText}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
