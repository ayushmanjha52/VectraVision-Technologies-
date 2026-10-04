import { Wordmark } from '@/components/Logo'
import { ScrollButton } from '@/components/ScrollButton'
import { sections } from '@/components/Header'
import { company, product } from '@/content/site'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050817]">
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-60" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark id="vv-mark-footer" />
            <p className="mt-4 max-w-sm text-haze">
              {product.name} by {company.shortName}. Indigenous radar for border security and mine safety.{' '}
              <span className="font-semibold text-white">Coming soon.</span>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-semibold">
              {sections.map((section) => (
                <li key={section.to}>
                  <ScrollButton to={section.to} className="text-white/70 hover:text-white">
                    {section.label}
                  </ScrollButton>
                </li>
              ))}
              {company.linkedin ? (
                <li>
                  <a href={company.linkedin} rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} {company.legalName}. Dhanbad, Jharkhand, India.
        </p>
      </div>
    </footer>
  )
}
