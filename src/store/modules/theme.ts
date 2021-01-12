import { RootState, Theme, ThemeState } from '@/types'
import { Module } from 'vuex'
import { SET_THEME } from '../mutation-types'

export default {
  state: () => ({
    theme: 'dark'
  }),
  mutations: {
    [SET_THEME] (state, theme: Theme | 'system-dark' | 'system-light'): void {
      // This is so the logo in NavBar will react to change in system theme
      if (theme?.includes('system')) {
        state.theme = theme.split('-')[1] as Theme
        state.theme = null
      } else {
        state.theme = theme as Theme
      }

      if (state.theme) {
        localStorage.setItem('theme', state.theme)
      } else {
        localStorage.removeItem('theme')
      }

      const html = document.querySelector('html')
      if (html) {
        if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }
    }
  },
  getters: {
    theme (state) {
      return state.theme
    }
  }
} as Module<ThemeState, RootState>
