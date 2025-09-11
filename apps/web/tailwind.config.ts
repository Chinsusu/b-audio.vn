import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      // Tech-Industrial Design Tokens from figma-tokens-overlay
      colors: {
        // Previous colors (keeping for compatibility)
        ivory: '#F8F6F1',
        beige: '#F5F1E8',
        gold: '#D4A574',
        espresso: '#3C2A1E',
        cloud: '#F9FAFB',
        
        // New Tech-Industrial tokens from docs/overlays/figma-tokens-overlay
        darkBg: '#0D0D0D',
        darkGrey: '#1A1A1A',
        goldAccent: '#C8A15A',
        neonTurquoise: '#00E0B8',
        textWhite: '#F5F5F5',
        textGrey: '#CCCCCC',
      },
      fontFamily: {
        // Tech-Industrial fonts from tokens
        heading: ['Orbitron', 'Oswald', 'Rajdhani', 'sans-serif'],
        body: ['Inter', 'Roboto', 'IBM Plex Sans', 'sans-serif'],
        microcopy: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Previous sizes (keeping for compatibility) 
        'heading-lg': '32px',
        'heading-md': '24px', 
        'heading-sm': '20px',
        'body': '16px',
        'small': '14px',
        
        // New tokens from figma-tokens-overlay
        'h1': '48px',
        'h2': '32px',
        'microcopy': '12px',
      },
      boxShadow: {
        // Glow effects from tokens
        'glowGold': '0 0 8px #C8A15A66',
        'glowNeon': '0 0 8px #00E0B866',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      spacing: {
        '4': '1rem',
        '8': '2rem', 
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
      },
      letterSpacing: {
        'widest': '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
