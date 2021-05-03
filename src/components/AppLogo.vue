<template>
  <img :src="logo" alt="Proctor Vue logo" class="h-7" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import logoWhite from '@/assets/logo-white.png'
import logo from '@/assets/logo.png'
import useTheme from '@/composables/use-theme'

export default defineComponent({
  name: 'AppLogo',
  setup () {
    const { isDarkTheme } = useTheme()

    const logoFilename = computed(() => {
      if (isDarkTheme.value) {
        return logoWhite
      }
      return logo
    })

    return {
      logo: logoFilename
    }
  }
})
</script>
