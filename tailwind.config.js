/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      }
    },
  },
  plugins: [],
}
