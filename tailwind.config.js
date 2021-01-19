/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

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
      teal: colors.teal,
      white: colors.white
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['dark'],
      outline: ['focus'],
      opacity: ['disabled'],
      scale: ['active'],
      textOpacity: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
