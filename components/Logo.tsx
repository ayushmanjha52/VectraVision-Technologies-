export function LogoMark({ id = 'vv-mark', className = 'h-8 w-8' }: { id?: string; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path d="M9.5 11 16 23l6.5-12" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.6a8 8 0 0 1 8 0" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ id }: { id?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark id={id} />
      <span className="font-display text-[17px] font-semibold tracking-tight text-white">
        Vectra<span className="text-gradient">Vision</span>
      </span>
    </span>
  )
}
