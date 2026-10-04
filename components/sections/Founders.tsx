import Image from 'next/image'
import { MailIcon, PhoneIcon } from '@/components/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { founders } from '@/content/site'
import { telHref } from '@/lib/format'
import { findTeamPhoto } from '@/lib/team'

export function Founders() {
  return (
    <section id="founders" aria-labelledby="founders-title" className="relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-32 h-[480px] w-[480px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute -right-32 bottom-10 h-[480px] w-[480px] rounded-full bg-pink-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="founders-title"
          align="center"
          eyebrow="The founders"
          title={
            <>
              The people behind <span className="text-gradient">Spandan.</span>
            </>
          }
          lead="Founded in 2026 at BIT Sindri, Dhanbad. Our team works across signal processing, AI, electronics and mechanical design."
        />

        <ul className="reveal mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
          {founders.map((founder) => {
            const photo = findTeamPhoto(founder.slug)
            return (
              <li
                key={founder.slug}
                className="gradient-ring rounded-[28px] bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-deep">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={`${founder.name}, ${founder.role}`}
                      fill
                      sizes="(min-width: 640px) 430px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-display text-6xl font-bold text-white/25">
                      {founder.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                  )}
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/85 to-transparent" />
                </div>
                <div className="px-3 pb-3 pt-5">
                  <h3 className="font-display text-2xl font-semibold text-white">{founder.name}</h3>
                  <p className="mt-1 font-semibold text-cyan-300">{founder.role}</p>
                  <div className="mt-5 grid gap-2">
                    <a href={`mailto:${founder.email}`} className="contact-pill min-w-0 justify-start !rounded-xl">
                      <MailIcon className="h-4 w-4 shrink-0 text-pink-300" />
                      <span className="sr-only">Email </span>
                      <span className="break-all">{founder.email}</span>
                    </a>
                    <a href={telHref(founder.phone)} className="contact-pill justify-start !rounded-xl">
                      <PhoneIcon className="h-4 w-4 shrink-0 text-pink-300" />
                      <span className="sr-only">Phone </span>
                      <span className="tabular-nums">{founder.phone}</span>
                    </a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
