/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
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
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
      }
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(15px)'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['dark'],
      borderOpacity: ['dark'],
      outline: ['focus'],
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.carousel-1': {
          width: '100%'
        },
        '.carousel-2': {
          width: 'calc(50% - 0.5rem)'
        }
      }

      addUtilities(newUtilities, {
        variants: ['responsive']
      })
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
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
