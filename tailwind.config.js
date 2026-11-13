/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040A1C', 900: '#081430', 800: '#0F1F4D', 700: '#16296A', 600: '#1E3A8A',
        },
        royal: {
          50: '#EEF5FF', 100: '#DAE9FE', 200: '#B8D5FC', 300: '#86B7F8', 400: '#4C92F0',
          500: '#1F78E6', 600: '#0A66D6', 700: '#0852AE', 800: '#0B458C',
        },
        mist: { 50: '#F7F9FC', 100: '#EFF2F8', 200: '#E2E7F0', 300: '#CBD3E1', 400: '#94A0B8', 500: '#64718C', 600: '#475370', 700: '#323C55' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,22,56,.04), 0 8px 24px -8px rgba(10,22,56,.10)',
        lift: '0 2px 4px rgba(10,22,56,.04), 0 24px 48px -16px rgba(10,70,160,.22)',
        glow: '0 0 0 1px rgba(10,102,214,.15), 0 12px 40px -8px rgba(10,102,214,.45)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(4%,-6%) scale(1.08)' } },
        shimmer: { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(120%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        float: 'float 6s ease-in-out infinite',
        gradient: 'gradient 12s ease infinite',
      },
    },
  },
  plugins: [],
};
