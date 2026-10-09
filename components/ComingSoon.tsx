'use client'

import { useEffect, useState } from 'react'

const PLACES = ['border security', 'mine safety', 'critical sites']

export function ComingSoon() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % PLACES.length), 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-8">
      <p className="sr-only">Coming soon for border security, mine safety and critical sites.</p>
      <div aria-hidden="true" className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="flex items-center gap-3 font-display text-[44px] italic leading-none text-ember sm:text-6xl lg:text-[68px]">
          Coming soon
          <span className="mt-2 h-3 w-3 shrink-0 animate-blink rounded-full bg-ember" />
        </p>
        <p className="flex items-baseline gap-2 text-lg text-stone sm:text-xl">
          <span>for</span>
          <span className="relative inline-flex overflow-hidden">
            <span key={index} className="animate-word-in font-display text-2xl italic text-paper sm:text-[28px]">
              {PLACES[index]}
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}
