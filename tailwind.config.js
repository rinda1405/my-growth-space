/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#1B1F2A',
          900: '#232835',
          DEFAULT: '#2E3444',
          800: '#2E3444',
          700: '#3D4559',
          600: '#4E5871',
          500: '#6A758E',
          400: '#8E98B0',
          300: '#BAC3D7',
          200: '#DBE2EF',
          100: '#EEF3F8',
          50: '#F7FAFC',
        },
        cyan: {
          50: '#F2FAFC',
          100: '#E4F4F9',
          200: '#CBEAF3',
          DEFAULT: '#B0DAE7',
          300: '#B0DAE7',
          400: '#91C8DA',
          500: '#6FAFC4',
          600: '#4B8FA7',
          700: '#376F83',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Newsreader',
          'Merriweather',
          'Georgia',
          'serif',
        ],
      },
    },
  },
  plugins: [],
}
