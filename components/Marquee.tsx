const ITEMS = [
  'Indigenous design',
  'Micro-Doppler AI',
  'Three-node multistatic radar',
  'Edge processing',
  'Border security',
  'Mine safety',
  'Works in dark, dust and fog',
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-ember py-4 text-ink sm:py-5">
      <p className="sr-only">{ITEMS.join(', ')}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-8 pr-8 font-display text-2xl italic sm:text-[32px]">
                {item}
                <Star />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
