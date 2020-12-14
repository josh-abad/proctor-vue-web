const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.warmGray,
      green: colors.green,
      white: colors.white
    },
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      outline: ['focus'],
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
