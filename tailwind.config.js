module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'codes-gray-1': '#24292e',
        'codes-gray-2': '#dadada47',
        'codes-gray-3': '#a0a0a047',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
