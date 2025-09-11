import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0D0D0D',
        darkGrey: '#1A1A1A',
        goldAccent: '#C8A15A',
        neonTurquoise: '#00E0B8',
        textWhite: '#F5F5F5',
        textGrey: '#CCCCCC',
      },
      fontFamily: {
        heading: ['Orbitron', 'Oswald', 'Rajdhani', 'sans-serif'],
        body: ['Inter', 'Roboto', 'IBM Plex Sans', 'sans-serif'],
        microcopy: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6' }],
        microcopy: ['12px', { letterSpacing: '0.1em', textTransform: 'uppercase' }],
      },
      boxShadow: {
        glowGold: '0 0 8px #C8A15A66',
        glowNeon: '0 0 8px #00E0B866',
      },
    },
  },
  plugins: [],
}
export default config
