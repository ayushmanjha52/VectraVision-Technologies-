import manifest from '@/content/captures.json'
import { signatureTargets } from '@/content/site'

export type Capture = {
  date: string
  durationS: number
  hardware: string
  conditions?: string
  w: number
  h: number
}

export type SignatureTarget = {
  id: string
  label: string
  color: string
  caption: string
  capture: Capture | null
}

/** Targets in display order, each with its lab capture if one has been imported. */
export function getSignatureTargets(): SignatureTarget[] {
  const captures = manifest as unknown as Record<string, Capture | undefined>
  return signatureTargets.map((target) => ({ ...target, capture: captures[target.id] ?? null }))
}
