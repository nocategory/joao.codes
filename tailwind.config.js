module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'codes-gray-1': '#24292e',
        'codes-gray-2': '#565a5d',
        'codes-gray-3': '#484B4E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
