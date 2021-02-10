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
      white: colors.white
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        transparent: 'rgba(0, 0, 0, 0)',
        'dark-00': '#121212',
        'dark-01': '#1e1e1e',
        'dark-02': '#232323',
        'dark-03': '#252525',
        'dark-04': '#272727',
        'dark-06': '#2c2c2c',
        'dark-08': '#2f2f2f',
        'dark-12': '#333333',
        'dark-16': '#353535',
        'dark-24': '#383838'
      }
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(10px)'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      outline: ['focus'],
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-filters')
  ]
}
