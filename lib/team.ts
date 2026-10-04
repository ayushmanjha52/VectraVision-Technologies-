import fs from 'node:fs'
import path from 'node:path'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

/** Public path of a founder photo dropped into public/team/<slug>.<ext>, or null if there isn't one yet. */
export function findTeamPhoto(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'team', `${slug}.${ext}`))) return `/team/${slug}.${ext}`
  }
  return null
}
