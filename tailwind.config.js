const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',     // => @media (min-width: 640px) { ... }
      'md': '768px',     // => @media (min-width: 768px) { ... }
      'lg': '1024px',    // => @media (min-width: 1024px) { ... }
      'xl': '1280px',    // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',   // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'codes-gray-1': '#24292e',
        'codes-gray-2': '#565a5d',
        'codes-gray-3': '#484B4E',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '100%': {
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease 0s forwards',
        slideDown: 'slideDown 0.8s ease 2s forwards',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
