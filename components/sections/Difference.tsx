import { LiveSignature } from '@/components/LiveSignature'
import { MotionSensorMock } from '@/components/MotionSensorMock'
import { SectionHeading } from '@/components/SectionHeading'
import { getSignatureTargets } from '@/lib/captures'

export function Difference() {
  const targets = getSignatureTargets()
  const simulated = targets.some((target) => !target.capture)

  return (
    <section id="difference" aria-labelledby="difference-title" className="relative scroll-mt-16 bg-coal py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="difference-title"
          index="02"
          eyebrow="What makes us different"
          title={
            <>
              Other sensors see movement. <em className="italic text-ember">Spandan sees what is moving.</em>
            </>
          }
        />

        <div className="reveal mt-16 grid items-start gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-line bg-ink p-5 sm:p-6 lg:col-span-2">
            <p className="label">Typical motion sensor</p>
            <div className="mt-4">
              <MotionSensorMock />
            </div>
            <p className="mt-5 font-display text-2xl leading-snug text-stone">
              It knows something moved. <em className="italic text-paper">It can&apos;t tell you what.</em>
            </p>
          </div>
          <div className="rounded-2xl border border-ember/40 bg-ink p-5 sm:p-6 lg:col-span-3">
            <LiveSignature targets={targets} />
          </div>
        </div>

        {simulated ? (
          <p className="mt-6 text-sm text-ash">
            Signatures shown are simulated for illustration. Real lab data from our team is coming soon.
          </p>
        ) : null}
      </div>
    </section>
  )
}
