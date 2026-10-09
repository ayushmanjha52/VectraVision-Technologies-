export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#FF5B22" />
      <path d="M9.5 11 16 23l6.5-12" fill="none" stroke="#0A0A09" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.6a8 8 0 0 1 8 0" fill="none" stroke="#0A0A09" strokeOpacity="0.75" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[18px] font-semibold tracking-tight text-paper">
        Vectra<span className="font-display text-[21px] font-normal italic tracking-normal">Vision</span>
      </span>
    </span>
  )
}
