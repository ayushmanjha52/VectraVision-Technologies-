import Image from 'next/image'
import { MailIcon, PhoneIcon } from '@/components/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { founders } from '@/content/site'
import { telHref } from '@/lib/format'
import { findTeamPhoto } from '@/lib/team'

export function Founders() {
  return (
    <section id="founders" aria-labelledby="founders-title" className="relative scroll-mt-16 bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="founders-title"
          index="04"
          eyebrow="The founders"
          title={
            <>
              The people behind <em className="italic text-ember">Spandan.</em>
            </>
          }
          lead="Founded in 2026 at BIT Sindri, Dhanbad. Our team works across signal processing, AI, electronics and mechanical design."
        />

        <ul className="reveal mt-16 grid gap-12 sm:grid-cols-2 lg:ml-[calc(25%+0.5rem)] lg:gap-10">
          {founders.map((founder, i) => {
            const photo = findTeamPhoto(founder.slug)
            return (
              <li key={founder.slug} className={`group ${i % 2 ? 'sm:mt-20' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-char">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={`${founder.name}, ${founder.role}`}
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-display text-7xl text-paper/25">
                      {founder.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h3 className="font-display text-4xl leading-none text-paper">{founder.name}</h3>
                  <span className="font-mono text-xs text-ash">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="label mt-4 !text-ember">{founder.role}</p>
                <div className="mt-5 grid gap-2.5 text-[15px]">
                  <a href={`mailto:${founder.email}`} className="flex min-w-0 items-center gap-3 text-stone hover:text-paper">
                    <MailIcon className="h-4 w-4 shrink-0 text-ember" />
                    <span className="sr-only">Email </span>
                    <span className="link-draw break-all">{founder.email}</span>
                  </a>
                  <a href={telHref(founder.phone)} className="flex items-center gap-3 text-stone hover:text-paper">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-ember" />
                    <span className="sr-only">Phone </span>
                    <span className="link-draw tabular-nums">{founder.phone}</span>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
