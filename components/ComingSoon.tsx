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
    <div className="mt-6">
      <p className="sr-only">Coming soon for border security, mine safety and critical sites.</p>
      <div aria-hidden="true">
        <p className="flex items-center gap-4 font-display text-[34px] font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-[56px]">
          <span className="text-gradient animate-gradient-x">Coming soon</span>
          <span className="relative mt-1 flex h-3.5 w-3.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-pink-400" />
          </span>
        </p>
        <p className="mt-4 flex items-baseline gap-2 text-xl text-white/85 sm:text-2xl">
          <span>for</span>
          <span className="relative inline-flex overflow-hidden">
            <span key={index} className="animate-word-in font-bold text-cyan-300">
              {PLACES[index]}
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}
