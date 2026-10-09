import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-[140px] italic leading-none text-ember">404</p>
        <h1 className="mt-6 font-display text-4xl text-paper">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-lg text-stone">Spandan, on the other hand, is coming soon.</p>
        <Link href="/" className="btn-primary mt-9">
          Back to home
        </Link>
      </div>
    </section>
  )
}
