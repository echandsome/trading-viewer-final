/** @type {import('tailwindcss').Config} */
/* favicon */ const icon=require('./public/.svn/logo');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        greenFlash: {
          '0%': { backgroundColor: 'rgb(22, 163, 74)' },
          '100%': { backgroundColor: 'transparent' },
        },
        redFlash: {
          '0%': { backgroundColor: 'rgb(185, 28, 28)' },
          '100%': { backgroundColor: 'transparent' },
        },
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        greenFlash: 'greenFlash 0.5s ease-out',
        redFlash: 'redFlash 0.5s ease-out',
        blink: 'blink 1s infinite'
      },
    },
  },
  plugins: [],
}
