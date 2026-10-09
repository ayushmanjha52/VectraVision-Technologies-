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
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="VectraVision, home">
          <Wordmark />
        </Link>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {sections.map((section, i) => (
              <li key={section.to}>
                <ScrollButton
                  to={section.to}
                  className="group flex items-baseline gap-1.5 text-sm font-medium text-stone transition-colors hover:text-paper"
                >
                  <span className="font-mono text-[10px] text-ash transition-colors group-hover:text-ember">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </ScrollButton>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ScrollButton to="contact" className="btn-primary hidden !px-5 !py-2 !text-sm sm:inline-flex">
            Get in touch
          </ScrollButton>
          <MobileMenu items={sections} />
        </div>
      </div>
    </header>
  )
}
