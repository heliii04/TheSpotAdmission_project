/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       // Tyrian purple (#4F0341) (#7a296bff   lite), white (#FFFFFF)
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#dfaad5ff',
          200: '#d782c8ff', // Your custom light blue
          300: '#93c5ea',
          400: '#60a5fa',
          500: '#4F0341', // Your custom dark blue-green
          600: '#7a296bff',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#dbe2dc', // Your custom light gray-green
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#7a296bff', // Your custom teal-green
          600: '#7a296bff',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef7ed',
          100: '#fef3e2',
          200: '#fde8c4',
          300: '#fbd89b',
          400: '#99825cff',
          500: '#7f543d', // Your custom brown
          600: '#ea580c',
          700: '#c2410c',
          800: '#335765',
          900: '#7c2d12',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#dbe2dc', // Your custom light gray-green
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },

      keyframes: {
        growShrink: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        growShrink: 'growShrink 1.5s ease-in-out infinite',
      },


    },
  },
  plugins: [],
};