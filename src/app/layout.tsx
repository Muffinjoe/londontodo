import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Your Guide to the Best Things to Do in London`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'London events',
    'things to do in London',
    'London exhibitions',
    'London restaurants',
    'London bars',
    'London markets',
    'London weekend',
    'free London',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Your Guide to the Best Things to Do in London`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-body text-ink-900 antialiased">
        {children}
      </body>
    </html>
  )
}
