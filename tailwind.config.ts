import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A09',
        coal: '#121210',
        char: '#1A1917',
        line: '#2A2824',
        paper: '#F1ECE3',
        stone: '#A39E94',
        ash: '#8A857B',
        ember: '#FF5B22',
        amber: '#FFB547',
      },
      fontFamily: {
        display: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'word-in': {
          '0%': { transform: 'translateY(60%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'word-in': 'word-in 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
