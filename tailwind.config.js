/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        script: ["'Great Vibes'", "cursive"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        gold: {
          100: '#fff7e6',
          300: '#ffe0a3',
          500: '#f5c86a',
          700: '#d5a437'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(245, 200, 106, 0.35)',
        'inner-glass': 'inset 0 1px 20px rgba(255,255,255,0.25)'
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #ffe6f1 0%, #ffd9ec 30%, #ffe7ba 60%, #fff1d6 100%)',
        'glass': 'linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.15))'
      },
      backdropBlur: {
        xl: '16px'
      }
    },
  },
  plugins: [],
}




