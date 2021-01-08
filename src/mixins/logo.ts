import { Theme } from '@/types'
import store from '@/store'

export default {
  computed: {
    logoFilename (): string {
      const theme: Theme = store.getters.theme

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'logo-white.png'
      }
      return 'logo.png'
    }
  }
}
