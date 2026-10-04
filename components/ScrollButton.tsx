'use client'

import type { ReactNode } from 'react'

/** Scrolls to a section without putting a fragment in the address bar, then moves focus to its heading. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id)
  if (!section) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  section.querySelector<HTMLElement>('[data-section-heading]')?.focus({ preventScroll: true })
}

export function ScrollButton({
  to,
  className,
  children,
  onNavigate,
}: {
  to: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onNavigate?.()
        scrollToSection(to)
      }}
    >
      {children}
    </button>
  )
}
