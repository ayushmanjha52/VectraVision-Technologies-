import type { ReactNode } from 'react'

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
}: {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
      <p className="label flex gap-3 lg:col-span-3">
        <span className="text-ember">{index}</span>
        {eyebrow}
      </p>
      <div className="lg:col-span-9">
        <h2
          id={id}
          tabIndex={-1}
          data-section-heading
          className="font-display text-[44px] leading-[0.98] tracking-[-0.01em] text-paper focus:outline-none sm:text-6xl lg:text-[76px]"
        >
          {title}
        </h2>
        {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">{lead}</p> : null}
      </div>
    </div>
  )
}
