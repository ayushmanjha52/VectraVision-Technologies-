#!/usr/bin/env node
/**
 * Adds a real lab spectrogram to the signature comparison.
 *
 *   npm run capture:import -- --target person-walking --input walk.npy \
 *     --date 2026-09-12 --duration 4 --hardware "Single node"
 *
 * Required
 *   --target      person-walking | person-crawling | drone-no-payload | drone-payload
 *   --input       STFT magnitude as .npy (float or complex) or .csv. Rows are Doppler bins, columns are time.
 *   --date        capture date, YYYY-MM-DD
 *   --duration    seconds of data in the input
 *   --hardware    what recorded it, e.g. "Single node" or "Three-node system"
 * Optional
 *   --conditions  e.g. "Rotors spinning, airframe fixed"
 *   --time-rows   input has time on rows and Doppler on columns
 *   --fftshift    Doppler bins are in FFT order (zero first); centre them
 *   --flip        Doppler runs positive to negative (default assumes negative to positive)
 *   --power       input is power, not magnitude
 *   --range-db    dynamic range kept below the peak (default 40)
 *   --crop        central fraction of the Doppler axis to keep, 0 to 1 (default 1)
 *
 * Output is normalised, cropped and resampled to a fixed 240 x 96 grid, so the original Doppler scale,
 * FFT size and frame rate can't be recovered from what gets published. Writes:
 *   public/captures/<target>.u8   intensity grid for the interactive plot
 *   public/captures/<target>.png  colour preview image, handy for checking the import
 *   content/captures.json         date, duration, hardware and conditions
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const W = 240 // time; must match components/LiveSignature.tsx
const H = 96 // Doppler
const PNG_SCALE = 3
const TARGETS = ['person-walking', 'person-crawling', 'drone-no-payload', 'drone-payload']
// Keep in sync with components/LiveSignature.tsx
const STOPS = [
  [0, [10, 10, 9]],
  [0.2, [52, 14, 10]],
  [0.42, [150, 36, 14]],
  [0.62, [255, 91, 34]],
  [0.82, [255, 181, 71]],
  [1, [255, 244, 214]],
]

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function fail(message) {
  console.error(`import-capture: ${message}`)
  process.exit(1)
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue
    const key = argv[i].slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) args[key] = true
    else {
      args[key] = next
      i++
    }
  }
  return args
}

function readNpy(buf) {
  if (buf.toString('latin1', 1, 6) !== 'NUMPY') fail('Not a .npy file.')
  const headerStart = buf[6] === 1 ? 10 : 12
  const headerLength = buf[6] === 1 ? buf.readUInt16LE(8) : buf.readUInt32LE(8)
  const header = buf.toString('latin1', headerStart, headerStart + headerLength)
  const descr = /'descr':\s*'([^']+)'/.exec(header)?.[1]
  const fortran = /'fortran_order':\s*True/.test(header)
  const shape = (/'shape':\s*\(([^)]*)\)/.exec(header)?.[1] ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
  if (shape.length !== 2) fail(`Expected a 2-D array, got shape (${shape.join(', ')}).`)
  const readers = {
    '<f4': [4, (o) => buf.readFloatLE(o)],
    '<f8': [8, (o) => buf.readDoubleLE(o)],
    '<c8': [8, (o) => Math.hypot(buf.readFloatLE(o), buf.readFloatLE(o + 4))],
    '<c16': [16, (o) => Math.hypot(buf.readDoubleLE(o), buf.readDoubleLE(o + 8))],
    '<i2': [2, (o) => buf.readInt16LE(o)],
    '<i4': [4, (o) => buf.readInt32LE(o)],
    '<u2': [2, (o) => buf.readUInt16LE(o)],
    '|u1': [1, (o) => buf.readUInt8(o)],
  }
  if (!readers[descr]) fail(`Unsupported dtype ${descr}. Save as float32 or float64.`)
  const [size, read] = readers[descr]
  const [rows, cols] = shape
  const offset = headerStart + headerLength
  return Array.from({ length: rows }, (_, r) =>
    Float64Array.from({ length: cols }, (_, c) => read(offset + (fortran ? c * rows + r : r * cols + c) * size)),
  )
}

function readCsv(text) {
  const rows = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/[,;\s]+/).map(Number))
  const cols = rows[0]?.length ?? 0
  if (!cols || rows.some((r) => r.length !== cols || r.some((v) => !Number.isFinite(v)))) {
    fail('CSV must be a rectangular grid of numbers, with no header row.')
  }
  return rows.map((r) => Float64Array.from(r))
}

const transpose = (m) => Array.from({ length: m[0].length }, (_, c) => Float64Array.from(m, (row) => row[c]))

/** 1-D resample: area average when shrinking, linear when growing. */
function resample1d(src, outLength) {
  const inLength = src.length
  const out = new Float64Array(outLength)
  if (inLength > outLength) {
    const scale = inLength / outLength
    for (let i = 0; i < outLength; i++) {
      const a = i * scale
      const b = a + scale
      let sum = 0
      let weight = 0
      for (let j = Math.floor(a); j < Math.ceil(b) && j < inLength; j++) {
        const w = Math.min(b, j + 1) - Math.max(a, j)
        if (w > 0) {
          sum += src[j] * w
          weight += w
        }
      }
      out[i] = weight ? sum / weight : 0
    }
  } else {
    for (let i = 0; i < outLength; i++) {
      const f = outLength === 1 ? 0 : (i * (inLength - 1)) / (outLength - 1)
      const j = Math.floor(f)
      const k = Math.min(inLength - 1, j + 1)
      out[i] = src[j] * (1 - (f - j)) + src[k] * (f - j)
    }
  }
  return out
}

/** Rows in, flat row-major grid out. */
function resample2d(rows, outH, outW) {
  const wide = rows.map((row) => resample1d(row, outW))
  const out = new Float64Array(outH * outW)
  const column = new Float64Array(wide.length)
  for (let x = 0; x < outW; x++) {
    for (let y = 0; y < wide.length; y++) column[y] = wide[y][x]
    const resampled = resample1d(column, outH)
    for (let y = 0; y < outH; y++) out[y * outW + x] = resampled[y]
  }
  return out
}

function colour(v) {
  let k = 0
  while (k < STOPS.length - 2 && v > STOPS[k + 1][0]) k++
  const [p0, c0] = STOPS[k]
  const [p1, c1] = STOPS[k + 1]
  const t = (v - p0) / (p1 - p0)
  return c0.map((c, i) => Math.round(c + (c1[i] - c) * t))
}

const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

/** Minimal RGB PNG with no metadata chunks. */
function encodePng(width, height, rgb) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // bit depth
  header[9] = 2 // RGB
  const stride = width * 3 + 1
  const raw = Buffer.alloc(stride * height)
  for (let y = 0; y < height; y++) rgb.copy(raw, y * stride + 1, y * width * 3, (y + 1) * width * 3)
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const USAGE = `Usage: npm run capture:import -- --target <target> --input <file.npy|file.csv> --date YYYY-MM-DD --duration <s> --hardware "<what recorded it>"

  --target      ${TARGETS.join(' | ')}
  --input       STFT magnitude, rows = Doppler bins, columns = time
  --date        capture date
  --duration    seconds of data in the input
  --hardware    e.g. "Single node" or "Three-node system"
  --conditions  optional, e.g. "Rotors spinning, airframe fixed"
  --time-rows   input has time on rows
  --fftshift    Doppler bins are in FFT order; centre them
  --flip        Doppler runs positive to negative
  --power       input is power, not magnitude
  --range-db    dynamic range below the peak (default 40)
  --crop        central fraction of the Doppler axis to keep (default 1)`

const args = parseArgs(process.argv.slice(2))
if (!Object.keys(args).length || args.help) {
  console.log(USAGE)
  process.exit(0)
}
const target = args.target
const input = args.input
const date = args.date
const duration = Number(args.duration)
const hardware = typeof args.hardware === 'string' ? args.hardware.trim() : ''
const conditions = typeof args.conditions === 'string' ? args.conditions.trim() : ''
const rangeDb = args['range-db'] === undefined ? 40 : Number(args['range-db'])
const crop = args.crop === undefined ? 1 : Number(args.crop)

if (!TARGETS.includes(target)) fail(`--target must be one of: ${TARGETS.join(', ')}`)
if (typeof input !== 'string' || !fs.existsSync(input)) fail('--input must point to an existing .npy or .csv file.')
if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) fail('--date must be YYYY-MM-DD.')
if (!(duration > 0)) fail('--duration must be a positive number of seconds.')
if (!hardware) fail('--hardware is required, e.g. "Single node".')
if (!(rangeDb > 0)) fail('--range-db must be positive.')
if (!(crop > 0 && crop <= 1)) fail('--crop must be between 0 and 1.')

const ext = path.extname(input).toLowerCase()
let rows =
  ext === '.npy' ? readNpy(fs.readFileSync(input)) : ext === '.csv' ? readCsv(fs.readFileSync(input, 'utf8')) : fail('Use a .npy or .csv input.')
if (args['time-rows']) rows = transpose(rows)
rows = rows.map((row) => row.map(Math.abs))
if (args.fftshift) {
  const n = rows.length
  const half = Math.floor(n / 2)
  rows = Array.from({ length: n }, (_, i) => rows[(i - half + n) % n])
}
if (!args.flip) rows = rows.slice().reverse() // put positive Doppler at the top
if (crop < 1) {
  const keep = Math.max(2, Math.round(rows.length * crop))
  const start = Math.floor((rows.length - keep) / 2)
  rows = rows.slice(start, start + keep)
}

// Resample in linear units, then convert to dB and normalise against the peak.
const grid = resample2d(rows, H, W)
const factor = args.power ? 10 : 20
const db = grid.map((v) => factor * Math.log10(v + 1e-12))
const peak = db.reduce((a, b) => Math.max(a, b), -Infinity)
const normalised = db.map((v) => Math.min(1, Math.max(0, (v - (peak - rangeDb)) / rangeDb)))

const outDir = path.join(root, 'public', 'captures')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, `${target}.u8`), Uint8Array.from(normalised, (v) => Math.round(v * 255)))

const asRows = Array.from({ length: H }, (_, y) => normalised.subarray(y * W, (y + 1) * W))
const large = resample2d(asRows, H * PNG_SCALE, W * PNG_SCALE)
const rgb = Buffer.alloc(large.length * 3)
large.forEach((v, i) => {
  const [r, g, b] = colour(v)
  rgb[i * 3] = r
  rgb[i * 3 + 1] = g
  rgb[i * 3 + 2] = b
})
fs.writeFileSync(path.join(outDir, `${target}.png`), encodePng(W * PNG_SCALE, H * PNG_SCALE, rgb))

const manifestPath = path.join(root, 'content', 'captures.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
manifest[target] = { date, durationS: duration, hardware, ...(conditions ? { conditions } : {}), w: W, h: H }
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Imported ${target} (${rows.length} Doppler bins x ${rows[0].length} frames -> ${H} x ${W}).`)
console.log('Check the plot on the home page, then rewrite its caption in content/site.ts to match what it shows.')
