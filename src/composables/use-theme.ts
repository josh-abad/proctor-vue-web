import { Theme } from '@/types'
import { computed, ref, watchEffect } from 'vue'

const theme = ref<Theme>('dark')
const QUERY = '(prefers-color-scheme: dark)'

export default function useTheme () {

  function initTheme () { 
    const body = document.querySelector('body')
    if (body) {
      body.classList.add('bg-gray-200', 'dark:bg-gray-900')
    }

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme as Theme)
    }

    window
      .matchMedia(QUERY)
      .addEventListener('change', ({ matches }) => {
        if (!theme.value) {
          _setTheme(matches ? 'system-dark' : 'system-light')
        }
      })
  }

  watchEffect(() => {
    if (theme.value) {
      localStorage.setItem('theme', theme.value)
    } else {
      localStorage.removeItem('theme')
    }
  })

  watchEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      if (theme.value === 'dark' || (!theme.value && matchMedia(QUERY).matches)) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }   
  })

  function _setTheme (value: Theme | 'system-dark' | 'system-light') {
    if (value?.includes('system')) {
      theme.value = value.split('-')[1] as Theme
      theme.value = null
    } else {
      theme.value = value as Theme
    }
  }

  const isDarkTheme = computed(() => {
    return theme.value === 'dark' || (!theme.value && matchMedia(QUERY).matches)
  })

  /**
   * Set the application theme
   * @param value 'dark', 'light', or null
   */
  function setTheme (value: Theme) {
    _setTheme(value)
  }

  return {
    theme: computed(() => theme.value),
    setTheme,
    isDarkTheme,
    initTheme
  }
}
