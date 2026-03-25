import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 35vw, 420px)' }}>
        <Image
          src="/images/london-hero-banner.jpg"
          alt="Cross The Tracks festival crowd in London — Photo by Garry Jones"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-7xl">
            <h1 className="max-w-3xl font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Your guide to the best of London
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base lg:text-lg">
              Events, exhibitions, restaurants, bars, markets, and neighbourhood guides — updated daily.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/events/browse"
                className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                What&apos;s on
              </Link>
              <Link
                href="/this-weekend"
                className="inline-flex items-center rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                This weekend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
