const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      red: colors.red,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      brand: {
        50: '#edfdfe',
        100: '#d1f9fc',
        200: '#a9f2f8',
        300: '#6de7f3',
        400: '#2bd1e5',
        500: '#10c1d9',
        600: '#0f90ab',
        700: '#14748a',
        800: '#195e71',
        900: '#194e60',
        950: '#0b3341',
      },
    },
    extend: {},
  },
  plugins: [],
}
