import Image from 'next/image'
import Link from 'next/link'
import type { SeedArea } from '@/lib/seed-data'

interface AreaDiscoveryProps {
  areas: SeedArea[]
}

export default function AreaDiscovery({ areas }: AreaDiscoveryProps) {
  return (
    <section className="bg-ink-50/50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Explore London
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Discover the best of every neighbourhood
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={area.heroImage}
                alt={area.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                <h3 className="font-display text-base font-bold text-white sm:text-lg">
                  {area.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-xs text-white/70 hidden sm:block">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
