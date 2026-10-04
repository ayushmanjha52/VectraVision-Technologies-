import { LiveSignature } from '@/components/LiveSignature'
import { MotionSensorMock } from '@/components/MotionSensorMock'
import { SectionHeading } from '@/components/SectionHeading'
import { getSignatureTargets } from '@/lib/captures'

export function Difference() {
  const targets = getSignatureTargets()
  const simulated = targets.some((target) => !target.capture)

  return (
    <section
      id="difference"
      aria-labelledby="difference-title"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-night via-[#120C3D] to-night py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="difference-title"
          align="center"
          eyebrow="What makes us different"
          title={
            <>
              Other sensors see movement. <span className="text-gradient">Spandan sees what is moving.</span>
            </>
          }
        />

        <div className="reveal mt-14 grid items-start gap-6 lg:grid-cols-5">
          <div className="glass rounded-3xl p-5 sm:p-6 lg:col-span-2">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/55">Typical motion sensor</p>
            <div className="mt-4">
              <MotionSensorMock />
            </div>
            <p className="mt-4 leading-relaxed text-white/70">It knows something moved. It can’t tell you what.</p>
          </div>
          <div className="gradient-ring rounded-3xl bg-white/[0.04] p-5 shadow-[0_0_70px_rgba(139,92,246,0.28)] sm:p-6 lg:col-span-3">
            <LiveSignature targets={targets} />
          </div>
        </div>

        {simulated ? (
          <p className="mt-6 text-center text-sm text-white/55">
            Signatures shown are simulated for illustration. Real lab data from our team is coming soon.
          </p>
        ) : null}
      </div>
    </section>
  )
}
