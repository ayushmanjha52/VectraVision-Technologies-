import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { JetBrains_Mono, Manrope, Unbounded } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { company, founders, product } from '@/content/site'
import { siteUrl } from '@/lib/site-url'
import './globals.css'

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const title = `${product.name} by VectraVision Technologies | Coming soon`
const description = `${product.name} is an indigenous multistatic radar with micro-motion analysis by VectraVision Technologies. It tells a walking person from a crawling one, and a loaded drone from an empty one. Coming soon for border security and mine safety.`

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title,
  description,
  applicationName: 'VectraVision Technologies',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'VectraVision Technologies',
    locale: 'en_IN',
    url: '/',
    title,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${product.name} by VectraVision, coming soon` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
}

export const viewport: Viewport = {
  themeColor: '#070B1F',
  colorScheme: 'dark',
}

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.legalName,
  alternateName: company.shortName,
  url: siteUrl().toString(),
  foundingDate: company.foundedISO,
  founder: founders.map((founder) => ({ '@type': 'Person', name: founder.name })),
  address: { '@type': 'PostalAddress', addressLocality: 'Dhanbad', addressRegion: 'Jharkhand', addressCountry: 'IN' },
  ...(company.linkedin ? { sameAs: [company.linkedin] } : {}),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}>
      <body className="bg-night font-sans text-white antialiased">
        <div aria-hidden="true" className="h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
        <Analytics />
      </body>
    </html>
  )
}
