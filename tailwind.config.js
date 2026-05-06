/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '1200px', // Przesunięcie breakpointu, by tablety (nawet horyzontalnie) widziały wersję mobilną
      'lg': '1280px',
      'xl': '1536px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        obsidian: '#0E0E0E',
        accent: '#C6D300', // Lemon Lime
        ivory: '#FFFFFF', // White
        slate: '#27272A'  // Shadow Grey
      },
      fontFamily: {
        heading: ['"Satoshi"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Satoshi"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
