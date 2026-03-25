import Link from 'next/link'
import { SITE_NAME } from '@/lib/utils'

const footerNav = {
  explore: [
    { name: "What's On", href: '/whats-on' },
    { name: 'This Weekend', href: '/this-weekend' },
    { name: 'Food & Drink', href: '/food-drink' },
    { name: 'Culture', href: '/culture' },
    { name: 'Free', href: '/free' },
    { name: 'New in London', href: '/new-in-london' },
  ],
  areas: [
    { name: 'Soho', href: '/areas/soho' },
    { name: 'Shoreditch', href: '/areas/shoreditch' },
    { name: 'Camden', href: '/areas/camden' },
    { name: 'South Bank', href: '/areas/south-bank' },
    { name: 'Brixton', href: '/areas/brixton' },
    { name: 'All Areas', href: '/areas' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'TikTok', href: '#' },
  { name: 'Newsletter', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Newsletter band */}
      <div className="border-b border-ink-700">
        <div className="container-editorial py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl sm:text-3xl mb-3">
              Never miss the best of London
            </h3>
            <p className="text-ink-300 mb-6 text-sm sm:text-base">
              A weekly edit of the most exciting things to do, eat, and see in the city. Free, always.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full bg-ink-800 border border-ink-600 px-5 py-3 text-sm text-white placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-editorial py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-xl text-brand-600">London</span>
              <span className="font-display text-xl text-white">Todo</span>
            </Link>
            <p className="text-ink-400 text-sm leading-relaxed">
              Your independent guide to the best things happening in London. Events, exhibitions, food, culture, and neighbourhood guides.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-ink-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-ink-400 mb-4">
              Areas
            </h4>
            <ul className="space-y-2.5">
              {footerNav.areas.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-ink-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-ink-500 hover:text-white text-xs font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
