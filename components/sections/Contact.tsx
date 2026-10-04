import Image from 'next/image'
import { MailIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { company, founders } from '@/content/site'
import { telHref } from '@/lib/format'
import { findTeamPhoto } from '@/lib/team'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0E1B4D] via-[#2A0F57] to-[#4A0D3A]" />
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          align="center"
          eyebrow="Contact"
          title={<span className="text-gradient animate-gradient-x">Let&apos;s talk.</span>}
          lead="Spandan is coming soon. For questions, partnerships or pilots, reach the founders directly."
        />

        <ul className="reveal mt-14 grid gap-6 md:grid-cols-2">
          {founders.map((founder) => {
            const photo = findTeamPhoto(founder.slug)
            return (
              <li key={founder.slug} className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/25">
                    {photo ? <Image src={photo} alt="" fill sizes="56px" className="object-cover" /> : null}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{founder.name}</h3>
                    <p className="text-sm font-semibold text-cyan-300">{founder.role}</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <dt>
                      <MailIcon className="h-5 w-5 text-pink-300" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd>
                      <a href={`mailto:${founder.email}`} className="break-all font-semibold text-white hover:text-cyan-300">
                        {founder.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt>
                      <PhoneIcon className="h-5 w-5 text-pink-300" />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a href={telHref(founder.phone)} className="font-semibold tabular-nums text-white hover:text-cyan-300">
                        {founder.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <a href={`mailto:${founder.email}`} className="btn-primary !px-4 !py-2.5">
                    <MailIcon className="h-4 w-4" /> Email
                  </a>
                  <a href={telHref(founder.phone)} className="btn-secondary !px-4 !py-2.5">
                    <PhoneIcon className="h-4 w-4" /> Call
                  </a>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-white/80">
          <PinIcon className="h-5 w-5 shrink-0 text-pink-300" />
          {company.location}
        </p>
      </div>
    </section>
  )
}
