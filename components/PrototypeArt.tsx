// Concept illustration of a Spandan node with two partner nodes watching one target. Not a drawing of real hardware.

const PATCHES = Array.from({ length: 15 }, (_, i) => ({ x: 214 + (i % 5) * 38, y: 130 + Math.floor(i / 5) * 38 }))
const PARTICLES: Array<[number, number]> = [
  [118, 118],
  [186, 58],
  [470, 300],
  [604, 252],
  [70, 250],
  [412, 452],
]

function arc(cx: number, cy: number, r: number) {
  const a = (50 * Math.PI) / 180
  const sx = cx + r * Math.cos(-a)
  const sy = cy + r * Math.sin(-a)
  const ex = cx + r * Math.cos(a)
  const ey = cy + r * Math.sin(a)
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`
}

function MiniNode({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.8">
      <line x1={x} y1={y + 6} x2={x - 18} y2={y + 34} stroke="#3B4A8F" strokeWidth="3" strokeLinecap="round" />
      <line x1={x} y1={y + 6} x2={x + 18} y2={y + 34} stroke="#3B4A8F" strokeWidth="3" strokeLinecap="round" />
      <rect x={x - 2.5} y={y - 26} width="5" height="34" rx="2" fill="#3B4A8F" />
      <rect
        x={x - 22}
        y={y - 50}
        width="44"
        height="28"
        rx="6"
        fill="#1E2A78"
        stroke="#22D3EE"
        strokeOpacity="0.7"
        transform={`rotate(-10 ${x} ${y - 36})`}
      />
      <circle cx={x} cy={y - 36} r="3" fill="#22D3EE" className="proto-led" />
    </g>
  )
}

export function PrototypeArt({ idPrefix = 'proto', className = '' }: { idPrefix?: string; className?: string }) {
  const id = (name: string) => `${idPrefix}-${name}`
  const url = (name: string) => `url(#${id(name)})`

  return (
    <svg
      viewBox="0 0 640 560"
      className={className}
      role="img"
      aria-label="Concept illustration of a Spandan radar node, with two partner nodes, picking out a drone carrying a payload"
    >
      <defs>
        <linearGradient id={id('panel')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E2A78" />
          <stop offset="1" stopColor="#3B1C7A" />
        </linearGradient>
        <linearGradient id={id('edge')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="0.6" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id={id('wave')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id={id('metal')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A3470" />
          <stop offset="0.5" stopColor="#5563B8" />
          <stop offset="1" stopColor="#2A3470" />
        </linearGradient>
        <radialGradient id={id('ground')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <filter id={id('glow')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <g fill="none" stroke="#8B9CFF" strokeOpacity="0.13">
        <circle cx="300" cy="200" r="150" />
        <circle cx="300" cy="200" r="230" />
        <circle cx="300" cy="200" r="310" strokeDasharray="3 9" />
      </g>

      <ellipse cx="300" cy="494" rx="240" ry="36" fill={url('ground')} />

      <g stroke="#22D3EE" strokeOpacity="0.45" strokeDasharray="4 7" strokeWidth="1.5">
        <line x1="96" y1="366" x2="548" y2="128" />
        <line x1="590" y1="384" x2="548" y2="128" />
      </g>
      <MiniNode x={96} y={402} />
      <MiniNode x={590} y={420} />

      <g className="proto-float">
        <g stroke={url('metal')} strokeWidth="7" strokeLinecap="round">
          <line x1="300" y1="410" x2="226" y2="488" />
          <line x1="300" y1="410" x2="374" y2="488" />
          <line x1="300" y1="410" x2="300" y2="474" />
        </g>
        <rect x="292" y="252" width="16" height="164" rx="4" fill={url('metal')} />
        <rect x="266" y="300" width="68" height="50" rx="10" fill="#141B45" stroke="#22D3EE" strokeOpacity="0.55" />
        <rect x="276" y="312" width="30" height="4" rx="2" fill="#4B57A8" />
        <rect x="276" y="322" width="22" height="4" rx="2" fill="#4B57A8" />
        <rect x="276" y="332" width="26" height="4" rx="2" fill="#4B57A8" />
        <circle cx="320" cy="314" r="4" fill="#34D399" className="proto-led" />

        <rect
          x="196"
          y="112"
          width="208"
          height="136"
          rx="18"
          fill="#8B5CF6"
          opacity="0.55"
          filter={url('glow')}
          transform="rotate(-10 300 180)"
        />
        <g transform="rotate(-10 300 180)">
          <rect x="196" y="112" width="208" height="136" rx="18" fill={url('panel')} stroke={url('edge')} strokeWidth="2.5" />
          {PATCHES.map((patch) => (
            <rect
              key={`${patch.x}-${patch.y}`}
              x={patch.x}
              y={patch.y}
              width="28"
              height="28"
              rx="6"
              fill="#22D3EE"
              fillOpacity="0.16"
              stroke="#67E8F9"
              strokeOpacity="0.6"
            />
          ))}
          <rect x="290" y="248" width="20" height="16" rx="3" fill="#2A3470" />
        </g>
      </g>

      <g fill="none" stroke={url('wave')} strokeWidth="3.5" strokeLinecap="round" transform="rotate(-18 414 172)">
        {[44, 80, 116, 152].map((r, i) => (
          <path key={r} d={arc(414, 172, r)} className="proto-wave" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </g>

      <circle cx="548" cy="128" r="20" fill="none" stroke="#F472B6" strokeWidth="2" className="proto-ping" />
      <circle
        cx="548"
        cy="128"
        r="20"
        fill="none"
        stroke="#F472B6"
        strokeWidth="2"
        className="proto-ping"
        style={{ animationDelay: '1.2s' }}
      />
      <circle cx="548" cy="128" r="7" fill="#F472B6" />

      <g transform="translate(430 60)">
        <rect width="178" height="36" rx="18" fill="#0C1230" fillOpacity="0.9" stroke="#F472B6" strokeOpacity="0.6" />
        <circle cx="19" cy="18" r="5" fill="#FBBF24" />
        <text x="33" y="23.5" fill="#F8FAFC" fontSize="14.5" fontWeight="700" className="font-sans">
          Drone with payload
        </text>
      </g>

      {PARTICLES.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.2"
          fill="#A5B4FC"
          className="proto-twinkle"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </svg>
  )
}
