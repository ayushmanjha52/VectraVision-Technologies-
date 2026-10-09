import { Wordmark } from '@/components/Logo'
import { ScrollButton } from '@/components/ScrollButton'
import { sections } from '@/components/Header'
import { company, product } from '@/content/site'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm leading-relaxed text-stone">
              {product.name} by {company.shortName}. Indigenous radar for border security and mine safety.{' '}
              <span className="font-display text-lg italic text-paper">Coming soon.</span>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-medium">
              {sections.map((section) => (
                <li key={section.to}>
                  <ScrollButton to={section.to} className="link-draw text-stone hover:text-paper">
                    {section.label}
                  </ScrollButton>
                </li>
              ))}
              {company.linkedin ? (
                <li>
                  <a href={company.linkedin} rel="noopener noreferrer" className="link-draw text-stone hover:text-paper">
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>

      <div aria-hidden="true" className="mt-10 overflow-hidden">
        <p className="pointer-events-none -mb-[0.06em] select-none text-center font-display text-[30vw] leading-[0.78] tracking-tight text-char lg:text-[360px]">
          {product.name}
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="label">
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <p className="label">Dhanbad, Jharkhand, India</p>
        </div>
      </div>
    </footer>
  )
}
