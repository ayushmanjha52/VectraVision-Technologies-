import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-8xl font-bold">
          <span className="text-gradient">404</span>
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold text-white">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-lg text-haze">Spandan, on the other hand, is coming soon.</p>
        <Link href="/" className="btn-primary mt-9">
          Back to home
        </Link>
      </div>
    </section>
  )
}
