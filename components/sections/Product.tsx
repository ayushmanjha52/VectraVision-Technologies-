import { ArrowIcon, ChipIcon, DroneIcon, MountainIcon, NodesIcon, ScanIcon, ShieldIcon } from '@/components/icons'
import { PrototypeArt } from '@/components/PrototypeArt'
import { ScrollButton } from '@/components/ScrollButton'
import { SectionHeading } from '@/components/SectionHeading'

const features = [
  {
    Icon: ScanIcon,
    title: 'Classifies, not just detects',
    body: 'Person walking, person crawling or drone. Spandan tells them apart.',
    accent: 'from-cyan-300 to-sky-500',
  },
  {
    Icon: DroneIcon,
    title: 'Spots the payload',
    body: "Knows a drone carrying a load from one that isn't.",
    accent: 'from-violet-300 to-fuchsia-500',
  },
  {
    Icon: NodesIcon,
    title: 'Three nodes, one picture',
    body: 'Separate nodes watch from different angles, so less slips past.',
    accent: 'from-pink-300 to-rose-500',
  },
  {
    Icon: ChipIcon,
    title: 'AI at the edge',
    body: 'Processing happens on site. No cloud, no network needed.',
    accent: 'from-amber-200 to-orange-500',
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

export function Product() {
  return (
    <section id="product" aria-labelledby="product-title" className="relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-fuchsia-500/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="product-title"
          eyebrow="The product"
          title={
            <>
              Smarter than a <span className="text-gradient">motion alarm.</span>
            </>
          }
          lead="Spandan watches a perimeter or a danger zone with three radar nodes and an on-site AI. It reads the tiny motions of a target, like swinging limbs or spinning rotors, and tells you what it is."
        />

        <ul className="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, body, accent }) => (
            <li key={title} className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/25">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-night shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-white">{title}</h3>
              <p className="mt-2 leading-relaxed text-haze">{body}</p>
            </li>
          ))}
        </ul>

        <ul className="reveal mt-5 grid gap-5 md:grid-cols-2">
          {useCases.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="gradient-ring flex items-start gap-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 sm:p-7"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/55">Built for</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-haze">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1B1460] via-[#2A1259] to-[#0E2A4F] p-8 sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-6 w-[540px] opacity-60 sm:-right-16 lg:right-0 lg:w-[600px] lg:opacity-90">
            <PrototypeArt idPrefix="banner" className="w-full" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#160F4A] via-[#160F4A]/85 to-transparent" />
          <div className="relative max-w-xl">
            <p className="eyebrow-dark">Launch</p>
            <p className="mt-5 font-display text-[40px] font-extrabold uppercase leading-[1.02] tracking-tight sm:text-6xl">
              <span className="text-gradient animate-gradient-x">Coming soon</span>
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              <span className="font-bold text-white">Spandan</span>, our multistatic radar with micro-motion analysis, is
              being built and tested in Jharkhand. Want to know when it launches, or talk about a pilot? Reach the
              founders directly.
            </p>
            <ScrollButton to="contact" className="btn-primary mt-8">
              Contact the founders <ArrowIcon className="h-4 w-4" />
            </ScrollButton>
          </div>
        </div>
      </div>
    </section>
  )
}
