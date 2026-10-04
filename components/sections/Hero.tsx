import { ComingSoon } from '@/components/ComingSoon'
import { ArrowIcon } from '@/components/icons'
import { PrototypeArt } from '@/components/PrototypeArt'
import { ScrollButton } from '@/components/ScrollButton'
import { product } from '@/content/site'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-cyan-500/25 blur-[140px]" />
        <div className="absolute -right-24 top-[8%] h-[640px] w-[640px] rounded-full bg-violet-600/35 blur-[150px]" />
        <div className="absolute -bottom-48 left-[28%] h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[150px]" />
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-20 pt-12 sm:px-6 lg:min-h-[calc(100vh-72px)] lg:grid-cols-2 lg:gap-4 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Indigenous radar for a safer India
          </p>
          <p className="mt-8 font-mono text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">VectraVision presents</p>
          <h1
            id="hero-title"
            className="text-gradient-soft mt-3 font-display text-[58px] font-bold leading-none tracking-tight sm:text-8xl lg:text-[108px]"
          >
            {product.name}
          </h1>
          <p className="mt-4 font-display text-lg font-medium text-white/90 sm:text-xl">{product.descriptor}</p>
          <ComingSoon />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-haze">
            <span className="font-bold text-white">{product.tagline}</span> A smart multistatic radar that tells a walking
            person from a crawling one, and a loaded drone from an empty one.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ScrollButton to="product" className="btn-primary">
              Explore Spandan <ArrowIcon className="h-4 w-4" />
            </ScrollButton>
            <ScrollButton to="founders" className="btn-secondary">
              Meet the founders
            </ScrollButton>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-violet-600/35 blur-[90px]" />
          <PrototypeArt idPrefix="hero" className="relative w-full lg:translate-x-6 lg:scale-[1.15]" />
          <p className="absolute bottom-0 right-2 rounded-full border border-white/10 bg-night/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur">
            Concept illustration
          </p>
        </div>
      </div>
    </section>
  )
}
