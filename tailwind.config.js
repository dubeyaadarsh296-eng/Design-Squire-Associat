/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#111111',
          850: '#161616',
          800: '#1a1a1a',
          700: '#222222',
          600: '#2a2a2a',
          500: '#333333',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d7',
          200: '#f5e0ad',
          300: '#edca7a',
          400: '#e4b04a',
          500: '#d4a049',
          600: '#b8843a',
          700: '#946830',
          800: '#6f4e26',
          900: '#4a341b',
        },
        cream: {
          50: '#fdfcf8',
          100: '#f8f5ee',
          200: '#f0ebe0',
          300: '#e5ddd0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'line-grow': 'lineGrow 1.2s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
