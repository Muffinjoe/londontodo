'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: "What's On", href: '/whats-on' },
  { name: 'This Weekend', href: '/this-weekend' },
  { name: 'Areas', href: '/areas' },
  { name: 'Food & Drink', href: '/food-drink' },
  { name: 'Culture', href: '/culture' },
  { name: 'Free', href: '/free' },
  { name: 'New in London', href: '/new-in-london' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ink-100">
      {/* Top bar with brand accent */}
      <div className="h-1 bg-brand-600" />

      <div className="container-editorial">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden -ml-2 p-2 text-ink-600 hover:text-ink-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-600">
              London
            </span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-900">
              Todo
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink-600 rounded-lg transition-colors hover:text-ink-900 hover:bg-ink-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <button
            type="button"
            className="p-2 text-ink-500 hover:text-ink-900 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-ink-100',
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        )}
      >
        <nav className="container-editorial py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2.5 text-base font-medium text-ink-700 rounded-lg transition-colors hover:text-brand-600 hover:bg-brand-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
