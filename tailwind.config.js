const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      green: colors.emerald,
      red: colors.rose,
      white: colors.white
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
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
        },
        '.glow': {
          'box-shadow': '0px 0px 20px 0px rgb(16, 185, 129, 0.75)'
        }
      }

      addUtilities(newUtilities, {
        variants: ['responsive']
      })
    })
  ]
}
