import { ArrowIcon, ChipIcon, DroneIcon, MountainIcon, NodesIcon, ScanIcon, ShieldIcon } from '@/components/icons'
import { ScrollButton } from '@/components/ScrollButton'
import { SectionHeading } from '@/components/SectionHeading'

const features = [
  {
    Icon: ScanIcon,
    title: 'Classifies, not just detects',
    body: 'Person walking, person crawling or drone. Spandan tells them apart.',
  },
  {
    Icon: DroneIcon,
    title: 'Spots the payload',
    body: "Knows a drone carrying a load from one that isn't.",
  },
  {
    Icon: NodesIcon,
    title: 'Three nodes, one picture',
    body: 'Separate nodes watch from different angles, so less slips past.',
  },
  {
    Icon: ChipIcon,
    title: 'AI at the edge',
    body: 'Processing happens on site. No cloud, no network needed.',
  },
]

const useCases = [
  {
    Icon: ShieldIcon,
    title: 'Border security',
    body: 'Built to spot crawling intruders and payload drones, day or night.',
  },
  {
    Icon: MountainIcon,
    title: 'Mine safety',
    body: 'Built to warn when a person enters a danger zone, through dust and darkness.',
  },
]

/** Range rings radiating from one corner, drawn in the banner's ink colour. */
function Rings() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="#0A0A09">
        {[90, 170, 250, 330, 410, 490].map((r, i) => (
          <circle key={r} cx="600" cy="600" r={r} strokeOpacity={0.5 - i * 0.07} strokeDasharray={i % 2 ? '2 8' : undefined} />
        ))}
        <line x1="600" y1="600" x2="180" y2="260" strokeOpacity="0.35" />
        <line x1="600" y1="600" x2="330" y2="110" strokeOpacity="0.2" />
      </g>
      <circle cx="292" cy="350" r="7" fill="#0A0A09" />
      <circle cx="292" cy="350" r="18" fill="none" stroke="#0A0A09" strokeOpacity="0.5" />
    </svg>
  )
}

export function Product() {
  return (
    <section id="product" aria-labelledby="product-title" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="product-title"
          index="01"
          eyebrow="The product"
          title={
            <>
              Smarter than a <em className="italic text-ember">motion alarm.</em>
            </>
          }
          lead="Spandan watches a perimeter or a danger zone with three radar nodes and an on-site AI. It reads the tiny motions of a target, like swinging limbs or spinning rotors, and tells you what it is."
        />

        <ul className="reveal mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, body }, i) => (
            <li key={title} className="group bg-ink p-7 transition-colors duration-300 hover:bg-coal">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ash">{String(i + 1).padStart(2, '0')}</span>
                <Icon className="h-6 w-6 text-ember transition-transform duration-300 group-hover:-rotate-6" />
              </div>
              <h3 className="mt-12 font-display text-[28px] leading-[1.05] text-paper">{title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{body}</p>
            </li>
          ))}
        </ul>

        <ul className="reveal mt-6 grid gap-6 md:grid-cols-2">
          {useCases.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="relative rounded-2xl border border-line bg-coal p-7 transition-colors duration-300 hover:border-ember/50 sm:p-9"
            >
              <Icon className="absolute right-7 top-7 h-7 w-7 text-ember sm:right-9 sm:top-9" />
              <p className="label">Built for</p>
              <h3 className="mt-3 font-display text-4xl text-paper sm:text-5xl">{title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-stone">{body}</p>
            </li>
          ))}
        </ul>

        <div className="reveal relative mt-16 overflow-hidden rounded-[28px] bg-ember p-8 text-ink sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-[420px] w-[420px] sm:h-[560px] sm:w-[560px]">
            <Rings />
          </div>
          <div className="relative max-w-xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">Launch</p>
            <p className="mt-4 font-display text-[64px] italic leading-[0.9] sm:text-8xl">Coming soon.</p>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              <span className="font-semibold text-ink">Spandan</span>, our multistatic radar with micro-motion analysis, is
              being built and tested in Jharkhand. Want to know when it launches, or talk about a pilot? Reach the founders
              directly.
            </p>
            <ScrollButton
              to="contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-coal"
            >
              Contact the founders <ArrowIcon className="h-4 w-4" />
            </ScrollButton>
          </div>
        </div>
      </div>
    </section>
  )
}
