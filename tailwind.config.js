/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          100: '#1e1e2e',
          200: '#181825',
          300: '#11111b',
          400: '#0a0a0f',
        },
        'accent': {
          primary: '#89b4fa',
          secondary: '#f5c2e7',
          success: '#a6e3a1',
          warning: '#f9e2af',
          danger: '#f38ba8',
        }
      }
    },
  },
  plugins: [],
}
