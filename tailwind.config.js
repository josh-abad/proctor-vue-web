const colors = require('tailwindcss/colors')

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
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['dark'],
      outline: ['focus'],
      opacity: ['disabled'],
      scale: ['active']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
