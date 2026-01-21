/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mine: {
          bg: '#FFFBF0',
          card: '#F9F5ED',
          primary: '#06B6D4',
          secondary: '#0EA5E9',
          accent: '#10B981',
          text: '#1F2937',
          'text-secondary': '#6B7280',
          border: '#E5DDD2',
          button: '#B4A5A0',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'sm': '4px',
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}

