import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.6s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 5px currentColor)" },
          "100%": { filter: "drop-shadow(0 0 20px currentColor)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-industrial":
          "linear-gradient(135deg, #1A1A1A 0%, #4B3A2B 100%)",
        "texture-carbon":
          'url(\'data:image/svg+xml,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="%23000"/><circle cx="20" cy="20" r="1" fill="%23333"/></svg>\')',
        "texture-metal":
          'url(\'data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="%231A1A1A"/><path d="M0 30h60M30 0v60" stroke="%23333" stroke-width="0.5" opacity="0.3"/></svg>\')',
      },
      // B-Audio Brand Guidelines Color Palette
      colors: {
        // Brand Primary Colors
        primary: {
          DEFAULT: "#C8A15A", // Gold công nghiệp
          50: "#FBF8F2",
          100: "#F5EDE0",
          200: "#EDD9C0",
          300: "#E3C59F",
          400: "#D6AD7C",
          500: "#C8A15A", // Primary
          600: "#B8954E",
          700: "#A08441",
          800: "#7A6532",
          900: "#5D4E26",
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Đen than industrial
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#999999",
          400: "#666666",
          500: "#333333",
          600: "#2A2A2A",
          700: "#1A1A1A", // Secondary
          800: "#0F0F0F",
          900: "#000000",
        },
        accent: {
          DEFAULT: "#4B3A2B", // Espresso
          50: "#F8F6F3",
          100: "#F0EBE5",
          200: "#E0D5CA",
          300: "#CEBFAE",
          400: "#B8A391",
          500: "#9F8A74",
          600: "#7C6A58",
          700: "#5E5045",
          800: "#4B3A2B", // Accent
          900: "#3A2C20",
        },
        neutral: {
          DEFAULT: "#F8F5EF", // Ivory
          50: "#FFFFFF",
          100: "#FDFCFA",
          200: "#F8F5EF", // Neutral
          300: "#F0EBE3",
          400: "#E5DDD3",
          500: "#D7CFC2",
          600: "#C5BBB0",
          700: "#B0A499",
          800: "#948A7E",
          900: "#706761",
        },
        // Industrial Gray Scale
        gray: {
          100: "#F8F8F8",
          200: "#E8E8E8",
          300: "#D4D4D4",
          400: "#999999",
          500: "#666666",
          600: "#333333",
          700: "#2A2A2A",
          800: "#1A1A1A",
          900: "#0F0F0F",
        },

        // Legacy compatibility colors
        ivory: "#F8F5EF",
        beige: "#F0EBE3",
        gold: "#C8A15A",
        espresso: "#4B3A2B",
        cloud: "#F8F8F8",
        darkBg: "#0F0F0F",
        darkGrey: "#1A1A1A",
        goldAccent: "#C8A15A",
        textWhite: "#F8F5EF",
        textGrey: "#999999",
      },
      fontFamily: {
        // Brand Typography System mapped to active CSS variable (switchable)
        heading: [
          "var(--font-heading-active)",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      fontSize: {
        // Brand Typography Scales
        hero: ["4rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }], // 64px
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }], // 56px
        h1: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 48px
        h2: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }], // 32px
        h3: ["1.5rem", { lineHeight: "1.4", letterSpacing: "0" }], // 24px
        h4: ["1.25rem", { lineHeight: "1.4", letterSpacing: "0" }], // 20px
        h5: ["1.125rem", { lineHeight: "1.4", letterSpacing: "0" }], // 18px
        "body-lg": ["1.125rem", { lineHeight: "1.6" }], // 18px
        body: ["1rem", { lineHeight: "1.6" }], // 16px
        "body-sm": ["0.875rem", { lineHeight: "1.5" }], // 14px
        microcopy: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }], // 12px
        label: [
          "0.875rem",
          { lineHeight: "1.4", letterSpacing: "0.025em", fontWeight: "600" },
        ], // 14px
      },
      boxShadow: {
        // Industrial Shadow System
        industrial:
          "0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "industrial-lg":
          "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "gold-glow":
          "0 0 8px rgba(200, 161, 90, 0.4), 0 0 20px rgba(200, 161, 90, 0.2)",
        "gold-glow-intense":
          "0 0 15px rgba(200, 161, 90, 0.6), 0 0 30px rgba(200, 161, 90, 0.3)",
        "inset-industrial":
          "inset 0 2px 4px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        metal:
          "0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        deep: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      letterSpacing: {
        tight: "-0.025em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.15em",
        "ultra-wide": "0.25em",
      },
      backdropBlur: {
        xs: "2px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
