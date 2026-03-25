import Image from 'next/image'

interface AuthorBioProps {
  author: {
    name: string
    image?: string
    bio?: string
  }
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-ink-100 bg-ink-50/40 p-5 sm:gap-5 sm:p-6">
      {author.image && (
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
          <Image
            src={author.image}
            alt={author.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      {!author.image && (
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:h-20 sm:w-20">
          <span className="font-display text-xl font-bold text-brand-600">
            {author.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-400">
          Written by
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink-900">
          {author.name}
        </h3>
        {author.bio && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  )
}
