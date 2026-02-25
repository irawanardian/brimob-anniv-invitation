/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brimob-dark': '#0f172a', // Biru dongker gelap/hitam
        'brimob-gold': '#d4af37', // Emas
        'brimob-red': '#dc2626',  // Merah
      }
    },
  },
  plugins: [],
}