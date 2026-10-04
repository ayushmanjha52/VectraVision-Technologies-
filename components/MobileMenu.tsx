'use client'

import { useRef } from 'react'
import { ScrollButton } from '@/components/ScrollButton'

export function MobileMenu({ items }: { items: { to: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const close = () => {
    if (ref.current) ref.current.open = false
  }

  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
      </summary>
      <nav
        aria-label="Menu"
        className="glass absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl bg-night/95 p-2 shadow-2xl shadow-violet-900/40"
      >
        <ul>
          {items.map((item) => (
            <li key={item.to}>
              <ScrollButton
                to={item.to}
                onNavigate={close}
                className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-white/85 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </ScrollButton>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}
