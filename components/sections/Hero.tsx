import { ComingSoon } from '@/components/ComingSoon'
import { ArrowIcon } from '@/components/icons'
import { PrototypeArt } from '@/components/PrototypeArt'
import { ScrollButton } from '@/components/ScrollButton'
import { backing, company, product } from '@/content/site'

const facts = [
  { label: 'Made in', value: 'India, indigenous design' },
  { label: 'Built for', value: 'Border security and mine safety' },
  { label: 'Backed by', value: backing.backedBy.map((item) => item.name).join(' and ') },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_65%)]" />
        <div className="absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full bg-ember/[0.13] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-line py-4">
          <p className="label">{company.shortName} presents</p>
          <p className="label">Est. 2026, Dhanbad</p>
        </div>

        <div className="grid items-center gap-6 pb-14 pt-10 lg:min-h-[calc(100vh-200px)] lg:grid-cols-12 lg:gap-4 lg:pb-16 lg:pt-6">
          <div className="relative z-10 lg:col-span-7">
            <h1
              id="hero-title"
              className="font-display text-[96px] leading-[0.82] tracking-[-0.02em] text-paper sm:text-[150px] lg:text-[184px]"
            >
              {product.name}
              <span aria-hidden="true" className="text-ember">
                .
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-stone sm:text-xl">{product.descriptor}</p>
            <ComingSoon />
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-stone">
              <span className="font-semibold text-paper">{product.tagline}</span> A smart multistatic radar that tells a
              walking person from a crawling one, and a loaded drone from an empty one.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ScrollButton to="product" className="btn-primary">
                Explore Spandan <ArrowIcon className="h-4 w-4" />
              </ScrollButton>
              <ScrollButton to="founders" className="btn-secondary">
                Meet the founders
              </ScrollButton>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <PrototypeArt idPrefix="hero" className="relative w-full lg:scale-[1.12]" />
            <p className="label absolute bottom-0 right-2 rounded-full border border-line bg-ink/80 px-3 py-1 !text-[10px]">
              Concept illustration
            </p>
          </div>
        </div>

        <dl className="grid border-t border-line sm:grid-cols-3">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`py-5 sm:py-6 ${i > 0 ? 'border-t border-line sm:border-l sm:border-t-0 sm:pl-6' : ''}`}
            >
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1.5 font-display text-2xl text-paper">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
