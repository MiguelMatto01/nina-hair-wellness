/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        cream: '#faf8f6',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'expand-line': 'expandLine 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        expandLine: {
          '0%': { width: '0' },
          '100%': { width: '6rem' },
        },
      },
    },
  },
  plugins: [],
}
