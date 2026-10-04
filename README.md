# VectraVision Technologies: website

A single-page "coming soon" site for Spandan, built with Next.js 14 (App Router, TypeScript, Tailwind).

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| Company facts, founders and contact details, backers, signature targets | `content/site.ts` |
| Page sections (hero, product, difference, backing, founders, contact) | `components/sections/` |
| Prototype artwork | `components/PrototypeArt.tsx` |
| Live signature view | `components/LiveSignature.tsx` |
| Founder photos | `public/team/` |
| Link preview image | `public/og.png` |

## Founder photos

Saved as `public/team/ayushman-jha.jpg` and `public/team/aastha-agarwal.jpg`. To change one, replace the file (`.png` and `.webp` also work) and rebuild.

## Real lab data in the signature view

Until real recordings are added, the "What makes us different" panel shows simulated signatures, labelled as such. To swap in a real recording, save the STFT magnitude from your pipeline (for example `np.save('walk.npy', np.abs(Zxx))`) and run:

```bash
npm run capture:import -- --target person-walking --input walk.npy --date 2026-09-12 --duration 4 --hardware "Single node"
```

Targets: `person-walking`, `person-crawling`, `drone-no-payload`, `drone-payload`. Run `npm run capture:import` with no arguments to see every option. The script normalises the Doppler axis and resamples to a fixed grid, so the published plot doesn't reveal the operating band. Imported targets switch from "Simulation" to "Lab capture" automatically.

## Deploy

Import the repo into Vercel, set `NEXT_PUBLIC_SITE_URL` to your domain, and deploy. Turn on Web Analytics in the Vercel project for visitor counts.
