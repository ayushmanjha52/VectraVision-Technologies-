import type { ReactNode } from 'react'

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = 'dark',
  align = 'left',
}: {
  id: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
}) {
  const dark = tone === 'dark'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className={dark ? 'eyebrow-dark' : 'eyebrow-light'}>{eyebrow}</p>
      <h2
        id={id}
        tabIndex={-1}
        data-section-heading
        className={`mt-5 font-display text-[28px] font-semibold leading-[1.15] tracking-tight focus:outline-none sm:text-4xl lg:text-[44px] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-haze' : 'text-slate-600'}`}>{lead}</p>
      ) : null}
    </div>
  )
}
