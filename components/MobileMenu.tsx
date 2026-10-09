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
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-paper/25 px-4 py-2 text-sm font-semibold text-paper [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
      </summary>
      <nav
        aria-label="Menu"
        className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-line bg-coal p-2 shadow-2xl shadow-black/60"
      >
        <ul>
          {items.map((item, i) => (
            <li key={item.to}>
              <ScrollButton
                to={item.to}
                onNavigate={close}
                className="flex w-full items-baseline gap-3 rounded-xl px-4 py-3 text-left font-medium text-paper/85 hover:bg-char hover:text-paper"
              >
                <span className="font-mono text-[10px] text-ember">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </ScrollButton>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}
