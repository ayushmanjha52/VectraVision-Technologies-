import { SectionHeading } from '@/components/SectionHeading'
import { backing } from '@/content/site'

function Badge({ name, detail, mark, size }: { name: string; detail: string; mark: string; size: 'lg' | 'sm' }) {
  const large = size === 'lg'
  const markText = mark.length > 3 ? 'text-[11px]' : large ? 'text-base' : 'text-sm'
  return (
    <li
      className={`flex items-center gap-4 rounded-3xl border border-violet-200/70 bg-white shadow-[0_24px_50px_-24px_rgba(91,33,182,0.45)] transition hover:-translate-y-1 ${
        large ? 'p-6 sm:p-7' : 'p-5'
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-violet-600 to-pink-500 font-display font-bold text-white ${
          large ? 'h-16 w-16' : 'h-12 w-12'
        } ${markText}`}
      >
        {mark}
      </span>
      <span className="min-w-0">
        <span
          className={`block whitespace-nowrap font-display font-semibold text-ink ${
            large ? 'text-xl lg:text-2xl' : 'text-[15px] xl:text-lg'
          }`}
        >
          {name}
        </span>
        <span className="mt-1 block text-slate-600">{detail}</span>
      </span>
    </li>
  )
}

export function Backing() {
  return (
    <section id="backing" aria-labelledby="backing-title" className="relative scroll-mt-16 overflow-hidden bg-mist py-24 text-ink sm:py-28">
      <div aria-hidden="true" className="dot-bg absolute inset-0" />
      <div aria-hidden="true" className="absolute -top-36 left-1/2 h-72 w-[760px] -translate-x-1/2 rounded-full bg-violet-400/30 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="backing-title"
          tone="light"
          align="center"
          eyebrow="Backed and recognised"
          title={
            <>
              Backed by{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                TEXMiN and BIT Sindri
              </span>
            </>
          }
        />

        <ul className="reveal mx-auto mt-12 grid max-w-md gap-5 md:max-w-4xl md:grid-cols-2">
          {backing.backedBy.map((item) => (
            <Badge key={item.name} {...item} size="lg" />
          ))}
        </ul>

        <p className="mt-14 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Recognised by
        </p>
        <ul className="reveal mx-auto mt-6 grid max-w-md gap-5 lg:max-w-6xl lg:grid-cols-3">
          {backing.recognisedBy.map((item) => (
            <Badge key={item.name} {...item} size="sm" />
          ))}
        </ul>
      </div>
    </section>
  )
}
