/** What a typical motion sensor tells an operator: that something moved, and nothing more. */
export function MotionSensorMock() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-[#0E0E0C]">
      <div aria-hidden="true" className="hairline-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/10" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/10" />
      <span aria-hidden="true" className="absolute left-[60%] top-[40%] flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-amber" />
      </span>
      <p className="absolute left-4 top-4 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-amber">
        Alert: motion detected
      </p>
      <ul className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {['Wind?', 'Animal?', 'Intruder?'].map((guess) => (
          <li key={guess} className="rounded-full border border-line bg-char px-3 py-1 text-sm font-medium text-stone">
            {guess}
          </li>
        ))}
      </ul>
    </div>
  )
}
