import Image from 'next/image'
import { MailIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { company, founders } from '@/content/site'
import { telHref } from '@/lib/format'
import { findTeamPhoto } from '@/lib/team'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-ember/[0.12] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          index="05"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s <em className="italic text-ember">talk.</em>
            </>
          }
          lead="Spandan is coming soon. For questions, partnerships or pilots, reach the founders directly."
        />

        <ul className="reveal mt-16 grid gap-6 md:grid-cols-2 lg:ml-[calc(25%+0.5rem)]">
          {founders.map((founder) => {
            const photo = findTeamPhoto(founder.slug)
            return (
              <li key={founder.slug} className="rounded-2xl border border-line bg-coal p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
                    {photo ? <Image src={photo} alt="" fill sizes="56px" className="object-cover" /> : null}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl leading-none text-paper">{founder.name}</h3>
                    <p className="label mt-2">{founder.role}</p>
                  </div>
                </div>
                <dl className="mt-7 space-y-3 border-t border-line pt-6">
                  <div className="flex items-center gap-3">
                    <dt>
                      <MailIcon className="h-[18px] w-[18px] text-ember" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd>
                      <a href={`mailto:${founder.email}`} className="link-draw break-all font-medium text-paper hover:text-ember">
                        {founder.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt>
                      <PhoneIcon className="h-[18px] w-[18px] text-ember" />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a href={telHref(founder.phone)} className="link-draw font-medium tabular-nums text-paper hover:text-ember">
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

        <p className="mt-10 flex items-center gap-2 text-stone lg:ml-[calc(25%+0.5rem)]">
          <PinIcon className="h-5 w-5 shrink-0 text-ember" />
          {company.location}
        </p>
      </div>
    </section>
  )
}
