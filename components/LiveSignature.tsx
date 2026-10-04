'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { SignatureTarget } from '@/lib/captures'
import { formatDate } from '@/lib/format'

const W = 240 // time columns on screen; must match scripts/import-capture.mjs
const H = 96 // Doppler rows
const COLS_PER_SEC = 36
const AUTO_CYCLE_MS = 5200

// Colour scale; keep in sync with scripts/import-capture.mjs
const STOPS: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
  [0, [7, 11, 31]],
  [0.22, [30, 27, 107]],
  [0.45, [124, 58, 237]],
  [0.68, [236, 72, 153]],
  [0.88, [251, 191, 36]],
  [1, [254, 243, 199]],
]

function buildLut(): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 3)
  for (let i = 0; i < 256; i++) {
    const v = i / 255
    let k = 0
    while (k < STOPS.length - 2 && v > STOPS[k + 1][0]) k++
    const [p0, c0] = STOPS[k]
    const [p1, c1] = STOPS[k + 1]
    const t = (v - p0) / (p1 - p0)
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = c0[c] + (c1[c] - c0[c]) * t
  }
  return lut
}

function makeRandom(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Adds a soft line at normalised Doppler v (-1 to 1, positive at the top). */
function addLine(col: Float32Array, v: number, width: number, amp: number) {
  const centre = ((1 - v) / 2) * (H - 1)
  const lo = Math.max(0, Math.floor(centre - width * 4))
  const hi = Math.min(H - 1, Math.ceil(centre + width * 4))
  for (let y = lo; y <= hi; y++) {
    const d = (y - centre) / width
    col[y] += amp * Math.exp(-0.5 * d * d)
  }
}

// Illustrative models shaped after published micro-Doppler signatures. Not measured data.
function simulate(id: string, t: number, n: number, random: () => number, col: Float32Array) {
  const TAU = Math.PI * 2
  col.fill(0)
  if (id === 'person-walking') {
    addLine(col, 0.3 + 0.05 * Math.sin(TAU * 1.9 * t), 2.4, 1)
    addLine(col, 0.3 + 0.5 * Math.sin(TAU * 0.95 * t), 1.6, 0.55)
    addLine(col, 0.3 + 0.5 * Math.sin(TAU * 0.95 * t + Math.PI), 1.6, 0.45)
    addLine(col, 0.3 + 0.22 * Math.sin(TAU * 0.95 * t + Math.PI), 1.3, 0.3)
  } else if (id === 'person-crawling') {
    addLine(col, 0.1 + 0.03 * Math.sin(TAU * 0.7 * t), 2.2, 0.9)
    addLine(col, 0.1 + 0.17 * Math.sin(TAU * 0.7 * t), 1.5, 0.38)
    addLine(col, 0.1 + 0.13 * Math.sin(TAU * 0.7 * t + Math.PI), 1.4, 0.3)
  } else {
    const loaded = id === 'drone-payload'
    const body = 0.16 + 0.03 * Math.sin(TAU * 0.25 * t)
    addLine(col, body, 1.7, 1)
    addLine(col, body + 0.55, 1.2, 0.12)
    addLine(col, body - 0.55, 1.2, 0.12)
    if (n % (loaded ? 3 : 4) === 0) {
      const amp = loaded ? 0.42 : 0.32
      for (let y = 0; y < H; y++) col[y] += amp * (0.55 + 0.45 * random())
    }
    if (loaded) addLine(col, body - 0.1 + 0.07 * Math.sin(TAU * 0.9 * t), 1.4, 0.45)
  }
  for (let y = 0; y < H; y++) col[y] = Math.min(1, col[y] + 0.05 * random())
}

export function LiveSignature({ targets }: { targets: SignatureTarget[] }) {
  const [selected, setSelected] = useState(0)
  const [autoCycle, setAutoCycle] = useState(true)
  const [captures, setCaptures] = useState<Record<string, Uint8Array>>({})
  const lut = useMemo(buildLut, [])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef(selected)
  const capturesRef = useRef(captures)
  const refillRef = useRef<() => void>(() => {})
  selectedRef.current = selected
  capturesRef.current = captures

  // Real lab captures, when imported, replace the simulation for their target.
  useEffect(() => {
    let cancelled = false
    for (const target of targets) {
      if (!target.capture) continue
      fetch(`/captures/${target.id}.u8`)
        .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((buffer) => {
          const bytes = new Uint8Array(buffer)
          if (!cancelled && bytes.length === W * H) setCaptures((prev) => ({ ...prev, [target.id]: bytes }))
        })
        .catch(() => {})
    }
    return () => {
      cancelled = true
    }
  }, [targets])

  // A scrolling time-Doppler display: each new column enters on the right.
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !wrap || !ctx) return
    const buffer = document.createElement('canvas')
    buffer.width = W
    buffer.height = H
    const bctx = buffer.getContext('2d')
    if (!bctx) return
    const image = bctx.createImageData(W, H)
    const grid = new Float32Array(W * H)
    const col = new Float32Array(H)
    const random = makeRandom(7)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let last = performance.now()
    let carry = 0
    let t = 0
    let n = 0

    const push = () => {
      const target = targets[selectedRef.current]
      const real = capturesRef.current[target.id]
      if (real) {
        const x = n % W
        for (let y = 0; y < H; y++) col[y] = real[y * W + x] / 255
      } else {
        simulate(target.id, t, n, random, col)
      }
      for (let y = 0; y < H; y++) {
        const row = y * W
        grid.copyWithin(row, row + 1, row + W)
        grid[row + W - 1] = col[y]
      }
      n++
      t += 1 / COLS_PER_SEC
    }

    const paint = () => {
      for (let i = 0; i < grid.length; i++) {
        const v = Math.max(0, Math.min(255, Math.round(grid[i] * 255))) * 3
        image.data[i * 4] = lut[v]
        image.data[i * 4 + 1] = lut[v + 1]
        image.data[i * 4 + 2] = lut[v + 2]
        image.data[i * 4 + 3] = 255
      }
      bctx.putImageData(image, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height)
    }

    const refill = () => {
      for (let i = 0; i < W; i++) push()
      paint()
    }
    refillRef.current = reduce ? refill : () => {}

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      paint()
    }

    const loop = (now: number) => {
      carry += Math.min(0.1, (now - last) / 1000) * COLS_PER_SEC
      last = now
      while (carry >= 1) {
        push()
        carry -= 1
      }
      paint()
      frame = requestAnimationFrame(loop)
    }

    refill()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    if (reduce) return () => resizeObserver.disconnect()

    // Only animate while the panel is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    })
    visibility.observe(wrap)
    return () => {
      cancelAnimationFrame(frame)
      visibility.disconnect()
      resizeObserver.disconnect()
    }
  }, [lut, targets])

  // With reduced motion the view is a still frame, redrawn when the target changes.
  useEffect(() => {
    refillRef.current()
  }, [selected, captures])

  useEffect(() => {
    if (!autoCycle || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setSelected((i) => (i + 1) % targets.length), AUTO_CYCLE_MS)
    return () => clearInterval(timer)
  }, [autoCycle, targets.length])

  const current = targets[selected]
  const real = Boolean(captures[current.id]) && current.capture

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">Spandan view</p>
        <p className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/70">
          {real && current.capture ? `Lab capture, ${formatDate(current.capture.date)}` : 'Simulation'}
        </p>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-night sm:aspect-[2/1]"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${real ? 'Lab capture of the' : 'Simulated'} micro-Doppler signature of a ${current.label.toLowerCase()}`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-night/75 px-3 py-1.5 backdrop-blur">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: current.color, boxShadow: `0 0 12px ${current.color}` }}
          />
          <span className="text-sm font-bold text-white">{current.label}</span>
        </div>
        <span className="absolute bottom-2.5 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          Time
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {targets.map((target, i) => (
          <button
            key={target.id}
            type="button"
            aria-pressed={i === selected}
            onClick={() => {
              setSelected(i)
              setAutoCycle(false)
            }}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition ${
              i === selected
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: target.color }} />
            {target.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 min-h-[3.5rem] text-white/85">
        {current.caption}
      </p>
    </div>
  )
}
