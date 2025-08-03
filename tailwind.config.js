/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff0000',
          600: '#cc0000',
          700: '#a80000',
          800: '#8b0000',
          900: '#6b0000',
        },
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#282828',
          900: '#0f0f0f',
        }
      },
             fontFamily: {
         sans: ['Poppins', 'Montserrat', 'system-ui', 'sans-serif'],
       },
             spacing: {
         '28rem': '28rem',
       },
       animation: {
         'fade-in': 'fadeIn 0.5s ease-in-out',
         'slide-up': 'slideUp 0.3s ease-out',
       },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 