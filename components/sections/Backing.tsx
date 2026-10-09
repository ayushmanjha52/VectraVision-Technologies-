import { SectionHeading } from '@/components/SectionHeading'
import { backing } from '@/content/site'

type Item = { name: string; detail: string; mark: string }

function Group({ title, items, size }: { title: string; items: Item[]; size: 'lg' | 'sm' }) {
  const large = size === 'lg'
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
      <p className="label pt-7 lg:col-span-3">{title}</p>
      <ul className="border-t border-line lg:col-span-9">
        {items.map((item) => (
          <li
            key={item.name}
            className={`group flex items-center justify-between gap-6 border-b border-line ${large ? 'py-7 sm:py-8' : 'py-5 sm:py-6'}`}
          >
            <span className="flex min-w-0 items-center gap-5">
              <span
                className={`flex shrink-0 items-center justify-center rounded-full border border-ember/50 font-mono font-medium text-ember transition-colors duration-300 group-hover:bg-ember group-hover:text-ink ${
                  large ? 'h-14 w-14 text-sm' : 'h-11 w-11 text-[10px]'
                }`}
              >
                {item.mark}
              </span>
              <span className="min-w-0 transition-transform duration-300 group-hover:translate-x-1.5">
                <span className={`block font-display leading-none text-paper ${large ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-4xl'}`}>
                  {item.name}
                </span>
                <span className="mt-2 block text-sm text-stone sm:hidden">{item.detail}</span>
              </span>
            </span>
            <span className="hidden shrink-0 text-right text-stone sm:block">{item.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Backing() {
  return (
    <section id="backing" aria-labelledby="backing-title" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="backing-title"
          index="03"
          eyebrow="Backed and recognised"
          title={
            <>
              Backed by <em className="italic text-ember">TEXMiN</em> and <em className="italic text-ember">BIT Sindri.</em>
            </>
          }
        />

        <div className="reveal mt-16 space-y-14">
          <Group title="Backed by" items={backing.backedBy} size="lg" />
          <Group title="Recognised by" items={backing.recognisedBy} size="sm" />
        </div>
      </div>
    </section>
  )
}
