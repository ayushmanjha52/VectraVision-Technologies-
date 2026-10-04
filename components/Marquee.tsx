const ITEMS = [
  'Indigenous design',
  'Micro-Doppler AI',
  'Three-node multistatic radar',
  'Edge processing',
  'Border security',
  'Mine safety',
  'Works in dark, dust and fog',
]

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-cyan-500/15 via-violet-500/15 to-pink-500/15 py-5">
      <p className="sr-only">{ITEMS.join(', ')}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-10 pr-10 font-display text-base font-medium uppercase tracking-wide text-white/90 sm:text-lg">
                {item}
                <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-cyan-300 to-pink-400" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
