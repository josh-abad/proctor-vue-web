import { Theme } from '@/types'
import { computed, ref, watch, watchEffect } from 'vue'

type SystemTheme = Exclude<Theme, 'system'>

const theme = ref<Theme>('system')
const systemTheme = ref<SystemTheme>('light')

const QUERY = '(prefers-color-scheme: dark)'

export default function useTheme () {

  const getTheme = computed(() => {
    return theme.value === 'system'
      ? systemTheme.value
      : theme.value
  })

  const isDarkTheme = computed(() => getTheme.value === 'dark')

  const isSystemTheme = computed(() => theme.value === 'system')

  /**
   * Sets the theme to saved theme setting in localStorage.
   * If no theme is saved, it defaults to the system theme.
   * Call this method only once, at the start of the application.
   */
  function initTheme () { 
    document.body.classList.add('bg-gray-200', 'dark:bg-gray-900')

    if (matchMedia(QUERY).matches) {
      systemTheme.value = 'dark'
    }

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
      setTheme(savedTheme as Theme)
    }

    window
      .matchMedia(QUERY)
      .addEventListener('change', ({ matches }) => {
        systemTheme.value = matches ? 'dark' : 'light'
      })
  }

  watch(theme, value => {
    localStorage.setItem('theme', value)
  })

  watchEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      if (isDarkTheme.value) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  })

  /**
   * Set the application theme
   * @param value 'dark', 'light', or 'system'
   */
  function setTheme (value: Theme) {
    theme.value = value
  }

  return {
    theme: getTheme,
    setTheme,
    isDarkTheme,
    isSystemTheme,
    initTheme
  }
}
