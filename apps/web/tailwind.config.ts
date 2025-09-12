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
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px currentColor)' },
          '100%': { filter: 'drop-shadow(0 0 20px currentColor)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
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
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.4' }],
        'microcopy': ['12px', { letterSpacing: '0.15em' }],
        
        // Hero sizes for better visual impact
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['64px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        // Glow effects from tokens
        'glowGold': '0 0 8px #C8A15A66, 0 0 20px #C8A15A33',
        'glowNeon': '0 0 8px #00E0B866, 0 0 20px #00E0B833',
        'glowGoldHover': '0 0 15px #C8A15A80, 0 0 30px #C8A15A40',
        'glowNeonHover': '0 0 15px #00E0B880, 0 0 30px #00E0B840',
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
        'ultra-wide': '0.25em',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config
