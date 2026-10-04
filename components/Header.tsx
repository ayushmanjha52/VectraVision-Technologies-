import Link from 'next/link'
import { Wordmark } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { ScrollButton } from '@/components/ScrollButton'

export const sections = [
  { to: 'product', label: 'Product' },
  { to: 'difference', label: 'Why Spandan' },
  { to: 'backing', label: 'Backed by' },
  { to: 'founders', label: 'Founders' },
  { to: 'contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="VectraVision, home">
          <Wordmark id="vv-mark-header" />
        </Link>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.to}>
                <ScrollButton
                  to={section.to}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {section.label}
                </ScrollButton>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ScrollButton to="contact" className="btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
            Contact us
          </ScrollButton>
          <MobileMenu items={sections} />
        </div>
      </div>
    </header>
  )
}
