/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.vue'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      green: colors.emerald,
      red: colors.rose,
      white: colors.white
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.carousel-1': {
          width: '100%'
        },
        '.carousel-2': {
          width: 'calc(50% - 0.5rem)'
        },
        '.snap': {
          'scroll-snap-align': 'start'
        },
        '.snap-none': {
          'scroll-snap-align': 'none'
        }
      }

      addUtilities(newUtilities, {
        variants: ['responsive']
      })
    })
  ]
}
